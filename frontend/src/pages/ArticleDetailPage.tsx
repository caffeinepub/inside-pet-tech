import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar, User, Play } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '../components/articles/ArticleCard';
import { useGetPublishedArticles, useGetArticlesByCategory } from '../hooks/useQueries';
import { ContentType } from '../backend';
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  CATEGORY_GRADIENT_CLASSES,
  CONTENT_TYPE_LABELS,
  formatDate,
} from '../lib/utils';

function ArticleDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Skeleton className="h-4 w-24 mb-6" />
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-6 w-1/2 mb-6" />
      <Skeleton className="aspect-video w-full rounded-lg mb-8" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
      </div>
    </div>
  );
}

export default function ArticleDetailPage() {
  const { slug } = useParams({ from: '/public-layout/article/$slug' });
  const { data: allArticles = [], isLoading } = useGetPublishedArticles();

  const article = allArticles.find(a => a.slug === slug) ?? null;
  const { data: relatedArticles = [] } = useGetArticlesByCategory(
    article?.category ?? 'startupsAndFunding' as any
  );

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (!article) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/"
          className="text-brand-crimson hover:text-brand-indigo transition-colors font-medium flex items-center gap-1 justify-center"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </main>
    );
  }

  const gradientClass = CATEGORY_GRADIENT_CLASSES[article.category];
  const related = relatedArticles
    .filter(a => a.id !== article.id)
    .sort((a, b) => Number(b.publishedAt ?? 0n) - Number(a.publishedAt ?? 0n))
    .slice(0, 3);

  const isVideo = article.contentType === ContentType.video;
  const thumbnail = article.thumbnailUrl || '/assets/generated/hero-placeholder.dim_1200x600.png';

  return (
    <main>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link */}
        <Link
          to="/category/$slug"
          params={{ slug: CATEGORY_SLUGS[article.category] }}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          {CATEGORY_LABELS[article.category]}
        </Link>

        {/* Category & Content Type badges */}
        <div className="flex items-center gap-2 mb-4">
          <Link
            to="/category/$slug"
            params={{ slug: CATEGORY_SLUGS[article.category] }}
            className={`inline-block text-xs font-semibold uppercase tracking-wider text-white px-2.5 py-1 rounded-sm bg-gradient-to-r ${gradientClass} hover:opacity-90 transition-opacity`}
          >
            {CATEGORY_LABELS[article.category]}
          </Link>
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 rounded-sm">
            {CONTENT_TYPE_LABELS[article.contentType]}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
          {article.title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-sans">
          {article.summary}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border py-4 mb-8">
          <span className="flex items-center gap-1.5">
            <User size={14} />
            <span className="font-medium text-foreground">{article.author}</span>
          </span>
          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>

        {/* Hero image or video */}
        {isVideo && article.videoUrl ? (
          <div className="mb-8 rounded-lg overflow-hidden editorial-shadow-lg">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <img
                src={thumbnail}
                alt={article.title}
                className="w-full h-full object-cover opacity-60"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/generated/hero-placeholder.dim_1200x600.png';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={article.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full brand-gradient flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                >
                  <Play size={24} className="text-white fill-white ml-1" />
                </a>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/70 text-sm text-center">Click to watch video</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 rounded-lg overflow-hidden editorial-shadow-lg">
            <img
              src={thumbnail}
              alt={article.title}
              className="w-full aspect-video object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/generated/hero-placeholder.dim_1200x600.png';
              }}
            />
          </div>
        )}

        {/* Body content */}
        <div
          className="prose prose-lg max-w-none font-sans
            prose-headings:font-serif prose-headings:text-foreground
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-a:text-brand-crimson prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:text-foreground/80 prose-ol:text-foreground/80
            prose-blockquote:border-l-brand-crimson prose-blockquote:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-border mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-xl font-serif font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
