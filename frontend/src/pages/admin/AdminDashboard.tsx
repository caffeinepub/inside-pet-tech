import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Plus, Edit, Trash2, Eye, Archive, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useGetAllArticles, usePublishArticle, useArchiveArticle, useDeleteArticle } from '../../hooks/useQueries';
import { Article, ArticleStatus } from '../../backend';
import { CATEGORY_LABELS, CONTENT_TYPE_LABELS, STATUS_LABELS, formatDateShort } from '../../lib/utils';

function StatusBadge({ status }: { status: ArticleStatus }) {
  const variants: Record<ArticleStatus, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
    [ArticleStatus.published]: { variant: 'default', label: 'Published' },
    [ArticleStatus.draft]: { variant: 'secondary', label: 'Draft' },
    [ArticleStatus.archived]: { variant: 'outline', label: 'Archived' },
  };
  const { variant, label } = variants[status];
  return <Badge variant={variant}>{label}</Badge>;
}

function ArticleRow({ article }: { article: Article }) {
  const navigate = useNavigate();
  const { mutate: publish, isPending: publishing } = usePublishArticle();
  const { mutate: archive, isPending: archiving } = useArchiveArticle();
  const { mutate: deleteArt, isPending: deleting } = useDeleteArticle();

  return (
    <TableRow>
      <TableCell className="font-medium max-w-xs">
        <div>
          <p className="font-serif font-semibold text-sm line-clamp-1">{article.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{article.slug}</p>
        </div>
      </TableCell>
      <TableCell className="text-sm">{CATEGORY_LABELS[article.category]}</TableCell>
      <TableCell className="text-sm">{CONTENT_TYPE_LABELS[article.contentType]}</TableCell>
      <TableCell><StatusBadge status={article.status} /></TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {article.publishedAt ? formatDateShort(article.publishedAt) : '—'}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => navigate({ to: `/admin/articles/${article.id}/edit` })}
            title="Edit"
          >
            <Edit size={13} />
          </Button>

          {article.status !== ArticleStatus.published && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-green-600 hover:text-green-700"
              onClick={() => publish(article.id)}
              disabled={publishing}
              title="Publish"
            >
              {publishing ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
            </Button>
          )}

          {article.status !== ArticleStatus.archived && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-amber-600 hover:text-amber-700"
              onClick={() => archive(article.id)}
              disabled={archiving}
              title="Archive"
            >
              {archiving ? <Loader2 size={13} className="animate-spin" /> : <Archive size={13} />}
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive"
                title="Delete"
              >
                <Trash2 size={13} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Article</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{article.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteArt(article.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function AdminDashboard() {
  const { data: articles = [], isLoading, error } = useGetAllArticles();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ArticleStatus | 'all'>('all');

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(a => a.status === filter);

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const aTime = a.publishedAt ? Number(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Number(b.publishedAt) : 0;
    return bTime - aTime;
  });

  const counts = {
    all: articles.length,
    [ArticleStatus.published]: articles.filter(a => a.status === ArticleStatus.published).length,
    [ArticleStatus.draft]: articles.filter(a => a.status === ArticleStatus.draft).length,
    [ArticleStatus.archived]: articles.filter(a => a.status === ArticleStatus.archived).length,
  };

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <AlertCircle size={40} className="text-destructive mx-auto mb-3" />
          <h2 className="text-lg font-serif font-bold mb-1">Access Denied</h2>
          <p className="text-muted-foreground text-sm">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Content Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage all articles and content</p>
        </div>
        <Button
          onClick={() => navigate({ to: '/admin/articles/new' })}
          className="brand-gradient text-white border-0 hover:opacity-90 gap-2"
        >
          <Plus size={16} />
          New Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {(['all', ArticleStatus.published, ArticleStatus.draft, ArticleStatus.archived] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`p-4 rounded-lg border text-left transition-all ${
              filter === s
                ? 'border-brand-crimson bg-brand-crimson/5'
                : 'border-border bg-card hover:border-brand-crimson/50'
            }`}
          >
            <p className="text-2xl font-bold font-serif text-foreground">{counts[s]}</p>
            <p className="text-xs text-muted-foreground capitalize mt-0.5">
              {s === 'all' ? 'Total Articles' : STATUS_LABELS[s]}
            </p>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
          </div>
        ) : sortedArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No articles found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArticles.map((article) => (
                <ArticleRow key={article.id} article={article} />
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
