import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { HttpAgent } from "@icp-sdk/core/agent";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Eye, FileText, Loader2, Radio, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  type Article,
  ArticleStatus,
  Category,
  ContentType,
} from "../../backend";
import RichTextEditor from "../../components/editor/RichTextEditor";
import { loadConfig } from "../../config";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useCreateArticle,
  useGetAllArticles,
  useUpdateArticle,
} from "../../hooks/useQueries";
import {
  articleStatusLabel,
  categoryLabel,
  contentTypeLabel,
  generateId,
  generateSlug,
} from "../../lib/petUtils";
import { StorageClient } from "../../utils/StorageClient";

interface ArticleFormData {
  title: string;
  slug: string;
  summary: string;
  body: string;
  author: string;
  category: Category;
  contentType: ContentType;
  thumbnailUrl: string;
  videoUrl: string;
  featured: boolean;
  status: ArticleStatus;
}

const DEFAULT_FORM: ArticleFormData = {
  title: "",
  slug: "",
  summary: "",
  body: "",
  author: "",
  category: Category.newsAndViews,
  contentType: ContentType.article,
  thumbnailUrl: "",
  videoUrl: "",
  featured: false,
  status: ArticleStatus.draft,
};

export default function ArticleEditor() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const articleId = (params as Record<string, string>).id ?? null;
  const isEditing = !!articleId;
  const { identity } = useInternetIdentity();

  const { data: allArticles, isLoading: articlesLoading } = useGetAllArticles();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();

  const [form, setForm] = useState<ArticleFormData>(DEFAULT_FORM);
  const [initialForm, setInitialForm] = useState<ArticleFormData>(DEFAULT_FORM);
  const [autoSlug, setAutoSlug] = useState(true);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ArticleFormData, string>>
  >({});
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  // Load existing article for editing
  useEffect(() => {
    if (isEditing && allArticles) {
      const existing = allArticles.find((a) => a.id === articleId);
      if (existing) {
        const loaded: ArticleFormData = {
          title: existing.title,
          slug: existing.slug,
          summary: existing.summary,
          body: existing.body,
          author: existing.author,
          category: existing.category,
          contentType: existing.contentType,
          thumbnailUrl: existing.thumbnailUrl,
          videoUrl: existing.videoUrl ?? "",
          featured: existing.featured,
          status: existing.status,
        };
        setForm(loaded);
        setInitialForm(loaded);
        setAutoSlug(false);
      }
    }
  }, [isEditing, articleId, allArticles]);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: autoSlug ? generateSlug(value) : prev.slug,
    }));
  };

  const handleSlugChange = (value: string) => {
    setAutoSlug(false);
    setForm((prev) => ({ ...prev, slug: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ArticleFormData, string>> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    if (!form.summary.trim()) newErrors.summary = "Summary is required";
    const stripped = form.body.replace(/<[^>]*>/g, "").trim();
    if (!stripped) newErrors.body = "Body is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildArticle = (status: ArticleStatus): Article => ({
    id: isEditing ? articleId! : generateId(),
    title: form.title.trim(),
    slug: form.slug.trim(),
    summary: form.summary.trim(),
    body: form.body.trim(),
    author: form.author.trim(),
    category: form.category,
    contentType: form.contentType,
    thumbnailUrl: form.thumbnailUrl.trim(),
    videoUrl: form.videoUrl.trim() || undefined,
    publishedAt: isEditing
      ? allArticles?.find((a) => a.id === articleId)?.publishedAt
      : status === ArticleStatus.published
        ? BigInt(Date.now()) * BigInt(1_000_000)
        : undefined,
    status,
    featured: form.featured,
  });

  const handleSave = async (targetStatus: ArticleStatus) => {
    if (!validate()) return;
    const articleData = buildArticle(targetStatus);
    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: articleId!,
          article: articleData,
        });
        toast.success(
          targetStatus === ArticleStatus.published
            ? "Article published!"
            : "Draft saved.",
        );
      } else {
        await createMutation.mutateAsync(articleData);
        toast.success(
          targetStatus === ArticleStatus.published
            ? "Article published!"
            : "Draft saved.",
        );
      }
      navigate({ to: "/admin" });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to save: ${error.message}`);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const config = await loadConfig();
      const agent = new HttpAgent({
        identity: identity ?? undefined,
        host: config.backend_host,
      });
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct) =>
        setUploadProgress(pct),
      );
      const url = await storageClient.getDirectURL(hash);
      return url;
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await handleImageUpload(file);
      setForm((prev) => ({ ...prev, thumbnailUrl: url }));
      toast.success("Thumbnail uploaded!");
    } catch {
      toast.error("Failed to upload thumbnail");
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isEditing && articlesLoading) {
    return (
      <div className="space-y-6" data-ocid="editor.loading_state">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 rounded" />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {isEditing ? "Edit Article" : "New Article"}
              </h1>
              {isDirty && (
                <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
                  Unsaved changes
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">
              {isEditing
                ? `Editing: ${form.title || "Untitled"}`
                : "Create a new article for Inside Pet Tech"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing &&
            form.status === ArticleStatus.published &&
            articleId && (
              <Link to="/article/$id" params={{ id: articleId }}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" /> Preview
                </Button>
              </Link>
            )}
          <Button
            data-ocid="editor.secondary_button"
            variant="outline"
            onClick={() => handleSave(ArticleStatus.draft)}
            disabled={isSaving}
          >
            {isSaving && form.status !== ArticleStatus.published ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button
            data-ocid="editor.primary_button"
            onClick={() => handleSave(ArticleStatus.published)}
            disabled={isSaving}
            className="bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Radio className="w-4 h-4 mr-2" />
            )}
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              data-ocid="editor.input"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title..."
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p
                className="text-destructive text-sm"
                data-ocid="editor.error_state"
              >
                {errors.title}
              </p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="url-friendly-slug"
                className={`flex-1 font-mono text-sm ${
                  errors.slug ? "border-destructive" : ""
                }`}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoSlug(true);
                  setForm((prev) => ({
                    ...prev,
                    slug: generateSlug(prev.title),
                  }));
                }}
              >
                Auto
              </Button>
            </div>
            {errors.slug && (
              <p className="text-destructive text-sm">{errors.slug}</p>
            )}
            <p className="text-muted-foreground text-xs">
              /article/{form.slug || "your-slug"}
            </p>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Textarea
              id="summary"
              value={form.summary}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, summary: e.target.value }))
              }
              placeholder="Brief summary of the article..."
              rows={3}
              className={errors.summary ? "border-destructive" : ""}
            />
            {errors.summary && (
              <p className="text-destructive text-sm">{errors.summary}</p>
            )}
          </div>

          {/* Rich Text Body */}
          <div className="space-y-2">
            <Label>Body *</Label>
            <RichTextEditor
              value={form.body}
              onChange={(html) => setForm((prev) => ({ ...prev, body: html }))}
              onImageUpload={handleImageUpload}
            />
            {errors.body && (
              <p className="text-destructive text-sm">{errors.body}</p>
            )}
            {isUploading && uploadProgress !== null && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Uploading image... {uploadProgress}%
                </p>
                <Progress value={uploadProgress} className="h-1" />
              </div>
            )}
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail</Label>
            <div className="flex gap-2">
              <Input
                id="thumbnailUrl"
                value={form.thumbnailUrl}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))
                }
                placeholder="https://example.com/image.jpg or upload below"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-ocid="editor.upload_button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span className="ml-1.5 hidden sm:inline">Upload</span>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />
            </div>
            {isUploading && uploadProgress !== null && (
              <Progress value={uploadProgress} className="h-1" />
            )}
            {form.thumbnailUrl && (
              <div className="mt-2 rounded overflow-hidden border border-border">
                <img
                  src={form.thumbnailUrl}
                  alt="Thumbnail preview"
                  className="w-full max-h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Video URL */}
          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL (optional)</Label>
            <Input
              id="videoUrl"
              value={form.videoUrl}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, videoUrl: e.target.value }))
              }
              placeholder="https://example.com/video.mp4"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Publishing</h3>

            {/* Quick publish buttons in sidebar too */}
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
                onClick={() => handleSave(ArticleStatus.published)}
                disabled={isSaving}
                data-ocid="editor.primary_button"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Radio className="w-4 h-4 mr-2" />
                )}
                Publish Now
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSave(ArticleStatus.draft)}
                disabled={isSaving}
                data-ocid="editor.secondary_button"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                Save as Draft
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Current Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, status: v as ArticleStatus }))
                }
              >
                <SelectTrigger id="status" data-ocid="editor.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ArticleStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      {articleStatusLabel(s)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Article
              </Label>
              <Switch
                id="featured"
                data-ocid="editor.switch"
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, featured: checked }))
                }
              />
            </div>
          </div>

          {/* Category & Type */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Classification</h3>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, category: v as Category }))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((c) => (
                    <SelectItem key={c} value={c}>
                      {categoryLabel(c)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type</Label>
              <Select
                value={form.contentType}
                onValueChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    contentType: v as ContentType,
                  }))
                }
              >
                <SelectTrigger id="contentType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ContentType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {contentTypeLabel(t)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                value={form.author}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, author: e.target.value }))
                }
                placeholder="Author name"
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && (
                <p className="text-destructive text-sm">{errors.author}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
