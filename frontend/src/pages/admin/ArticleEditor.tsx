import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { useGetAllArticles, useCreateArticle, useUpdateArticle } from '../../hooks/useQueries';
import { Article, Category, ContentType, ArticleStatus } from '../../backend';
import { categoryLabel, contentTypeLabel, articleStatusLabel, generateSlug, generateId } from '../../lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Save, Loader2, Eye } from 'lucide-react';
import { toast } from 'sonner';

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
  title: '',
  slug: '',
  summary: '',
  body: '',
  author: '',
  category: Category.newsAndViews,
  contentType: ContentType.article,
  thumbnailUrl: '',
  videoUrl: '',
  featured: false,
  status: ArticleStatus.draft,
};

export default function ArticleEditor() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const articleId = (params as Record<string, string>).id ?? null;
  const isEditing = !!articleId;

  const { data: allArticles, isLoading: articlesLoading } = useGetAllArticles();
  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();

  const [form, setForm] = useState<ArticleFormData>(DEFAULT_FORM);
  const [autoSlug, setAutoSlug] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof ArticleFormData, string>>>({});

  // Load existing article for editing
  useEffect(() => {
    if (isEditing && allArticles) {
      const existing = allArticles.find((a) => a.id === articleId);
      if (existing) {
        setForm({
          title: existing.title,
          slug: existing.slug,
          summary: existing.summary,
          body: existing.body,
          author: existing.author,
          category: existing.category,
          contentType: existing.contentType,
          thumbnailUrl: existing.thumbnailUrl,
          videoUrl: existing.videoUrl ?? '',
          featured: existing.featured,
          status: existing.status,
        });
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
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.slug.trim()) newErrors.slug = 'Slug is required';
    if (!form.summary.trim()) newErrors.summary = 'Summary is required';
    if (!form.body.trim()) newErrors.body = 'Body is required';
    if (!form.author.trim()) newErrors.author = 'Author is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const articleData: Article = {
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
        : undefined,
      status: form.status,
      featured: form.featured,
    };

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: articleId!, article: articleData });
        toast.success('Article updated successfully');
      } else {
        await createMutation.mutateAsync(articleData);
        toast.success('Article created successfully');
      }
      navigate({ to: '/admin' });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to save article: ${error.message}`);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  if (isEditing && articlesLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-12 rounded" />)}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 rounded" />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {isEditing ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {isEditing ? `Editing: ${form.title || 'Untitled'}` : 'Create a new article for Inside Pet Tech'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing && form.status === ArticleStatus.published && articleId && (
            <Link to="/article/$id" params={{ id: articleId }}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" /> Preview
              </Button>
            </Link>
          )}
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" /> {isEditing ? 'Update' : 'Save'}
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter article title..."
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
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
                className={`flex-1 font-mono text-sm ${errors.slug ? 'border-destructive' : ''}`}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setAutoSlug(true);
                  setForm((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
                }}
              >
                Auto
              </Button>
            </div>
            {errors.slug && <p className="text-destructive text-sm">{errors.slug}</p>}
            <p className="text-muted-foreground text-xs">/article/{form.slug || 'your-slug'}</p>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Summary *</Label>
            <Textarea
              id="summary"
              value={form.summary}
              onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief summary of the article..."
              rows={3}
              className={errors.summary ? 'border-destructive' : ''}
            />
            {errors.summary && <p className="text-destructive text-sm">{errors.summary}</p>}
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label htmlFor="body">Body (HTML) *</Label>
            <Textarea
              id="body"
              value={form.body}
              onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
              placeholder="<p>Article content in HTML...</p>"
              rows={16}
              className={`font-mono text-sm ${errors.body ? 'border-destructive' : ''}`}
            />
            {errors.body && <p className="text-destructive text-sm">{errors.body}</p>}
          </div>

          {/* Thumbnail URL */}
          <div className="space-y-2">
            <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
            <Input
              id="thumbnailUrl"
              value={form.thumbnailUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, thumbnailUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
            {form.thumbnailUrl && (
              <div className="mt-2 rounded overflow-hidden border border-border">
                <img
                  src={form.thumbnailUrl}
                  alt="Thumbnail preview"
                  className="w-full max-h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
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
              onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
              placeholder="https://example.com/video.mp4"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-foreground">Publishing</h3>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((prev) => ({ ...prev, status: v as ArticleStatus }))}
              >
                <SelectTrigger id="status">
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
              <Label htmlFor="featured" className="cursor-pointer">Featured Article</Label>
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) => setForm((prev) => ({ ...prev, featured: checked }))}
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
                onValueChange={(v) => setForm((prev) => ({ ...prev, category: v as Category }))}
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
                onValueChange={(v) => setForm((prev) => ({ ...prev, contentType: v as ContentType }))}
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
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                placeholder="Author name"
                className={errors.author ? 'border-destructive' : ''}
              />
              {errors.author && <p className="text-destructive text-sm">{errors.author}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
