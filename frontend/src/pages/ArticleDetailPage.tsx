import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetArticleById, useGetArticlesByCategory } from '@/hooks/useQueries';
import { formatDate, categoryLabel, categorySlug, contentTypeLabel } from '@/lib/utils';

export default function ArticleDetailPage() {
  const { id } = useParams({ from: '/public-layout/article/$id' });
  const { data: article, isLoading, isError } = useGetArticleById(id);

  const catSlug = article ? categorySlug(article.category) : '';
  const { data: relatedArticles } = useGetArticlesByCategory(article?.category as any);
  const related = relatedArticles?.filter((a) => a.id !== id).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-5 w-1/2 mb-8" />
          <Skeleton className="aspect-video w-full rounded-xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !article) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-2xl text-slate-700 mb-3">Article not found</p>
          <p className="text-slate-500 text-sm mb-6">
            This article may have been removed or is no longer available.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-crimson-600 hover:text-crimson-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const catLabel = categoryLabel(article.category);
  const ctLabel = contentTypeLabel(article.contentType);
  const thumbnail = article.thumbnailUrl || '/assets/generated/article-thumb-default.dim_600x400.png';

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Back Navigation */}
      <div className="bg-slate-900 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/category/$slug"
            params={{ slug: catSlug }}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {catLabel}
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-slate-900 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Link
              to="/category/$slug"
              params={{ slug: catSlug }}
              className="px-3 py-1 bg-crimson-600 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-crimson-700 transition-colors"
            >
              {catLabel}
            </Link>
            <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs font-medium rounded">
              {ctLabel}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {article.title}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{article.summary}</p>
          <div className="flex flex-wrap items-center gap-5 text-slate-400 text-sm">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="text-slate-200">{article.author}</span>
            </span>
            {article.publishedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {catLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Image or Video */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {article.videoUrl ? (
          <div className="rounded-xl overflow-hidden shadow-editorial-lg aspect-video bg-slate-900">
            <iframe
              src={article.videoUrl}
              title={article.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden shadow-editorial-lg">
            <img
              src={thumbnail}
              alt={article.title}
              className="w-full aspect-video object-cover"
            />
          </div>
        )}
      </div>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="prose prose-slate prose-lg max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-a:text-crimson-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="border-t border-slate-200 bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ArticleCard key={rel.id} article={rel} variant="default" />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
