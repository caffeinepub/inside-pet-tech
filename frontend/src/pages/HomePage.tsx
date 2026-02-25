import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, TrendingUp, Zap, Play, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '../components/articles/ArticleCard';
import { useGetPublishedArticles, useGetFeaturedArticles } from '../hooks/useQueries';
import { Article, Category, ContentType } from '../backend';
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  CATEGORY_GRADIENT_CLASSES,
  CONTENT_TYPE_LABELS,
  formatDate,
  formatDateShort,
} from '../lib/utils';

function FeaturedHeroSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl editorial-shadow-lg">
      <Skeleton className="w-full aspect-[21/9] min-h-[340px]" />
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

function ArticleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-card rounded-lg overflow-hidden editorial-shadow">
          <Skeleton className="aspect-[16/10] w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

function CategorySpotlightSkeleton() {
  return (
    <div className="space-y-3 divide-y divide-border">
      {[1, 2, 3].map((i) => (
        <div key={i} className="pt-3 first:pt-0 flex gap-3">
          <Skeleton className="w-20 h-14 rounded shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface FeaturedHeroProps {
  article: Article;
}

function FeaturedHero({ article }: FeaturedHeroProps) {
  const gradientClass = CATEGORY_GRADIENT_CLASSES[article.category];
  const thumbnail =
    article.thumbnailUrl || '/assets/generated/hero-placeholder.dim_1200x600.png';

  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block relative overflow-hidden rounded-xl editorial-shadow-lg"
    >
      {/* Background image */}
      <div className="w-full aspect-[21/9] min-h-[340px] max-h-[520px] overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              '/assets/generated/hero-placeholder.dim_1200x600.png';
          }}
        />
      </div>

      {/* Gradient overlay — stronger at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Optional top-left "Featured" ribbon */}
      <div className="absolute top-5 left-5">
        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          <BookOpen size={11} />
          Featured
        </span>
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
        {/* Category + content type badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`inline-block text-[11px] font-bold uppercase tracking-wider text-white px-2.5 py-1 rounded-sm bg-gradient-to-r ${gradientClass}`}
          >
            {CATEGORY_LABELS[article.category]}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wider text-white/60">
            {CONTENT_TYPE_LABELS[article.contentType]}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white leading-tight mb-3 max-w-4xl group-hover:text-white/90 transition-colors">
          {article.title}
        </h1>

        {/* Summary */}
        <p className="text-sm sm:text-base text-white/75 line-clamp-2 mb-4 max-w-2xl leading-relaxed">
          {article.summary}
        </p>

        {/* Author + date + read more */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <div className="w-7 h-7 rounded-full brand-gradient flex items-center justify-center shrink-0">
              <span className="text-white text-[11px] font-bold uppercase">
                {article.author.charAt(0)}
              </span>
            </div>
            <span className="font-medium text-white/80">{article.author}</span>
            <span className="text-white/40">·</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
            Read article <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

const FEATURED_CATEGORIES = [
  Category.startupsAndFunding,
  Category.newsAndViews,
  Category.interviews,
  Category.marketTrends,
];

export default function HomePage() {
  const { data: publishedArticles = [], isLoading: loadingPublished } = useGetPublishedArticles();
  const { data: featuredArticles = [], isLoading: loadingFeatured } = useGetFeaturedArticles();

  const isLoading = loadingPublished || loadingFeatured;

  // Sort by publishedAt descending
  const sortedArticles = [...publishedArticles].sort((a, b) => {
    const aTime = a.publishedAt ? Number(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Number(b.publishedAt) : 0;
    return bTime - aTime;
  });

  // Pick the most recent featured article, fall back to most recent published
  const heroArticle =
    featuredArticles.length > 0
      ? [...featuredArticles].sort(
          (a, b) => Number(b.publishedAt ?? 0n) - Number(a.publishedAt ?? 0n)
        )[0]
      : sortedArticles[0];

  const latestArticles = sortedArticles.filter((a) => a.id !== heroArticle?.id).slice(0, 9);
  const videoArticles = publishedArticles.filter((a) => a.contentType === ContentType.video);
  const featureStories = publishedArticles.filter(
    (a) => a.contentType === ContentType.featureStory || a.featured
  );

  return (
    <main>
      {/* ── Featured Article Hero ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <FeaturedHeroSkeleton />
        ) : heroArticle ? (
          <FeaturedHero article={heroArticle} />
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-serif">No articles published yet.</p>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="brand-gradient h-0.5 w-full" />

      {/* ── Latest News Grid ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-crimson" />
            <h2 className="text-xl font-serif font-bold text-foreground">Latest News</h2>
          </div>
        </div>
        {isLoading ? (
          <ArticleGridSkeleton />
        ) : latestArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No articles available yet.</p>
        )}
      </section>

      {/* ── Feature Stories ───────────────────────────────────────────────── */}
      {!isLoading && featureStories.length > 0 && (
        <section className="bg-secondary/50 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={18} className="text-brand-indigo" />
              <h2 className="text-xl font-serif font-bold text-foreground">Feature Stories</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureStories.slice(0, 4).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Category Spotlights ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_CATEGORIES.map((cat) => {
            const catArticles = sortedArticles.filter((a) => a.category === cat).slice(0, 3);
            const gradientClass = CATEGORY_GRADIENT_CLASSES[cat];
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-5 rounded-sm bg-gradient-to-b ${gradientClass}`}
                    />
                    <h3 className="text-base font-serif font-bold text-foreground">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                  </div>
                  <Link
                    to="/category/$slug"
                    params={{ slug: CATEGORY_SLUGS[cat] }}
                    className="text-xs font-medium text-brand-crimson hover:text-brand-indigo transition-colors flex items-center gap-1"
                  >
                    More <ArrowRight size={12} />
                  </Link>
                </div>
                {isLoading ? (
                  <CategorySpotlightSkeleton />
                ) : catArticles.length > 0 ? (
                  <div className="space-y-3 divide-y divide-border">
                    {catArticles.map((article) => (
                      <div key={article.id} className="pt-3 first:pt-0">
                        <ArticleCard article={article} variant="compact" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 italic">
                    No articles in this category yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Videos Section ────────────────────────────────────────────────── */}
      {!isLoading && videoArticles.length > 0 && (
        <section className="bg-foreground py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Play size={18} className="text-white fill-white" />
              <h2 className="text-xl font-serif font-bold text-white">Videos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to="/article/$slug"
                  params={{ slug: article.slug }}
                  className="group block relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-video overflow-hidden bg-white/10">
                    <img
                      src={
                        article.thumbnailUrl ||
                        '/assets/generated/article-thumb-default.dim_600x400.png'
                      }
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          '/assets/generated/article-thumb-default.dim_600x400.png';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full brand-gradient flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play size={18} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-serif font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-white/50 mt-1">
                      {formatDateShort(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
