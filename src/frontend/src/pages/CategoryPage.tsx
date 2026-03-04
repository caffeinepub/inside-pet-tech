import { Category } from "@/backend";
import ArticleCard from "@/components/articles/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetArticlesByCategory } from "@/hooks/useQueries";
import {
  categoryDescriptor,
  categoryFromSlug,
  categoryLabel,
} from "@/lib/petUtils";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams({ from: "/public-layout/category/$slug" });
  const category = categoryFromSlug(slug);

  // Always call the hook (rules of hooks), but fall back to a valid category.
  // If category is undefined we show the "not found" screen before rendering results.
  const {
    data: articles,
    isLoading,
    error,
  } = useGetArticlesByCategory(category ?? Category.newsAndViews);

  if (!category) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-slate-600 font-sans mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded-sm transition-colors font-sans text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const label = categoryLabel(category);
  const descriptor = categoryDescriptor(category);

  const sortedArticles = articles
    ? [...articles].sort((a, b) => {
        const ta = a.publishedAt ? Number(a.publishedAt) : 0;
        const tb = b.publishedAt ? Number(b.publishedAt) : 0;
        return tb - ta;
      })
    : [];

  return (
    <main className="bg-white min-h-screen">
      {/* Category Header */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-sans mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <div className="editorial-divider w-16 mb-4" />
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            {label}
          </h1>
          {descriptor && (
            <p className="text-slate-300 font-sans text-lg max-w-2xl">
              {descriptor}
            </p>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["s1", "s2", "s3", "s4", "s5", "s6"].map((k) => (
              <div
                key={k}
                className="bg-white rounded-sm shadow-editorial overflow-hidden"
              >
                <Skeleton className="w-full aspect-[16/9]" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-slate-500 font-sans">
              Failed to load articles. Please try again.
            </p>
          </div>
        ) : sortedArticles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 font-sans text-lg">
              No articles in this category yet. Check back soon.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-crimson-600 hover:text-crimson-700 transition-colors font-sans"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
