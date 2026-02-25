import React from 'react';
import { useParams } from '@tanstack/react-router';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from '../components/articles/ArticleCard';
import { useGetArticlesByCategory } from '../hooks/useQueries';
import { Category } from '../backend';
import {
  SLUG_TO_CATEGORY,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTORS,
  CATEGORY_GRADIENT_CLASSES,
} from '../lib/utils';

export default function CategoryPage() {
  const { slug } = useParams({ from: '/public-layout/category/$slug' });
  const category = SLUG_TO_CATEGORY[slug] as Category | undefined;

  const { data: articles = [], isLoading } = useGetArticlesByCategory(
    category ?? Category.startupsAndFunding
  );

  if (!category) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Category Not Found</h1>
        <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
      </main>
    );
  }

  const sortedArticles = [...articles].sort((a, b) => {
    const aTime = a.publishedAt ? Number(a.publishedAt) : 0;
    const bTime = b.publishedAt ? Number(b.publishedAt) : 0;
    return bTime - aTime;
  });

  const gradientClass = CATEGORY_GRADIENT_CLASSES[category];

  return (
    <main>
      {/* Category Header */}
      <div className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <span className={`inline-block text-xs font-semibold uppercase tracking-widest text-white px-3 py-1 rounded-sm bg-gradient-to-r ${gradientClass}`}>
              {CATEGORY_LABELS[category]}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-background mb-3">
            {CATEGORY_LABELS[category]}
          </h1>
          <p className="text-background/60 text-base max-w-2xl">
            {CATEGORY_DESCRIPTORS[category]}
          </p>
        </div>
      </div>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
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
        ) : sortedArticles.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {sortedArticles.length} article{sortedArticles.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className={`inline-flex w-16 h-16 rounded-full bg-gradient-to-br ${gradientClass} items-center justify-center mb-4`}>
              <span className="text-2xl">📰</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-foreground mb-2">No Articles Yet</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              We're working on coverage for {CATEGORY_LABELS[category]}. Check back soon.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
