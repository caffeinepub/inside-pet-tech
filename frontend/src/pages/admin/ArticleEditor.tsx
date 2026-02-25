import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Loader2, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetArticleById, useCreateArticle, useUpdateArticle } from '../../hooks/useQueries';
import { Article, Category, ContentType, ArticleStatus } from '../../backend';
import { CATEGORY_LABELS, CONTENT_TYPE_LABELS, STATUS_LABELS, generateId, slugify } from '../../lib/utils';

const CATEGORIES = Object.values(Category);
const CONTENT_TYPES = Object.values(ContentType);
const STATUSES = Object.values(ArticleStatus);

interface ArticleEditorProps {
  mode: 'create' | 'edit';
}

const DEFAULT_ARTICLE: Omit<Article, 'id'> = {
  title: '',
  slug: '',
  summary: '',
  body: '',
  author: '',
  category: Category.startupsAndFunding,
  contentType: ContentType.article,
  thumbnailUrl: '',
  videoUrl: undefined,
  publishedAt: undefined,
  status: ArticleStatus.draft,
  featured: false,
};

export default function ArticleEditor({ mode }: ArticleEditorProps) {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const articleId = (params as Record<string, string>).id;

  const { data: existingArticle, isLoading: loadingArticle } = useGetArticleById(articleId ?? '');
  const { mutate: createArticle, isPending: creating } = useCreateArticle();
  const { mutate: updateArticle, isPending: updating } = useUpdateArticle();

  const [form, setForm] = useState<Omit<Article, 'id'>>(DEFAULT_ARTICLE);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && existingArticle) {
      const { id, videoUrl: vu, ...rest } = existingArticle;
      setForm(rest);
      setVideoUrl(vu ?? '');
    }
  }, [existingArticle, mode]);

  const handleTitleChange = (title: string) => {
    setForm(prev => ({
      ...prev,
      title,
      slug: mode === 'create' ? slugify(title) : prev.slug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.slug.trim() || !form.author.trim()) {
      setError('Title, slug, and author are required.');
      return;
    }

    const article: Article = {
      ...form,
      id: mode === 'edit' ? articleId! : generateId(),
      videoUrl: videoUrl.trim() || undefined,
    };

    if (mode === 'create') {
      createArticle(article, {
        onSuccess: () => navigate({ to: '/admin' }),
        onError: (err) => setError(err.message),
      });
    } else {
      updateArticle(
        { id: articleId!, article },
        {
          onSuccess: () => navigate({ to: '/admin' }),
          onError: (err) => setError(err.message),
        }
      );
    }
  };

  if (mode === 'edit' && loadingArticle) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isPending = creating || updating;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/admin' })}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            {mode === 'create' ? 'New Article' : 'Edit Article'}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {mode === 'create' ? 'Create a new article or content piece' : 'Update article details'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-card rounded-lg border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Content</h2>

              <div className="space-y-1.5">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Article headline..."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="article-url-slug"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="summary">Summary *</Label>
                <Textarea
                  id="summary"
                  value={form.summary}
                  onChange={(e) => setForm(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief summary of the article..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="body">Body (HTML) *</Label>
                <Textarea
                  id="body"
                  value={form.body}
                  onChange={(e) => setForm(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="<p>Article body content in HTML...</p>"
                  rows={12}
                  className="font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground">Supports HTML markup for rich formatting.</p>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Media</h2>

              <div className="space-y-1.5">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                  id="thumbnailUrl"
                  value={form.thumbnailUrl}
                  onChange={(e) => setForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="videoUrl">Video URL (optional)</Label>
                <Input
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  type="url"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-card rounded-lg border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Publishing</h2>

              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => setForm(prev => ({ ...prev, status: v as ArticleStatus }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
                  <p className="text-xs text-muted-foreground">Show in hero section</p>
                </div>
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={(checked) => setForm(prev => ({ ...prev, featured: checked }))}
                />
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Metadata</h2>

              <div className="space-y-1.5">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={form.author}
                  onChange={(e) => setForm(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Author name"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm(prev => ({ ...prev, category: v as Category }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Content Type</Label>
                <Select
                  value={form.contentType}
                  onValueChange={(v) => setForm(prev => ({ ...prev, contentType: v as ContentType }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((ct) => (
                      <SelectItem key={ct} value={ct}>{CONTENT_TYPE_LABELS[ct]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full brand-gradient text-white border-0 hover:opacity-90 gap-2"
            >
              {isPending ? (
                <><Loader2 size={16} className="animate-spin" /> Saving...</>
              ) : (
                <><Save size={16} /> {mode === 'create' ? 'Create Article' : 'Save Changes'}</>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
