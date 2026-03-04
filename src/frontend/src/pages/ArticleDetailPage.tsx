import { Category } from "@/backend";
import ArticleCard from "@/components/articles/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetArticleById, useGetPublishedArticles } from "@/hooks/useQueries";
import {
  categoryLabel,
  contentTypeLabel,
  formatDate,
  slugFromCategory,
} from "@/lib/petUtils";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

export default function ArticleDetailPage() {
  const { id } = useParams({ from: "/public-layout/article/$id" });
  const { data: article, isLoading, error } = useGetArticleById(id);
  const { data: allArticles } = useGetPublishedArticles();

  const relatedArticles =
    article && allArticles
      ? allArticles
          .filter((a) => a.category === article.category && a.id !== article.id)
          .sort((a, b) => {
            const ta = a.publishedAt ? Number(a.publishedAt) : 0;
            const tb = b.publishedAt ? Number(b.publishedAt) : 0;
            return tb - ta;
          })
          .slice(0, 3)
      : [];

  if (isLoading) {
    return (
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Skeleton className="h-5 w-24 mb-8" />
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-3/4 mb-6" />
          <Skeleton className="h-4 w-48 mb-8" />
          <Skeleton className="w-full aspect-[16/9] rounded-sm mb-8" />
          <div className="space-y-3">
            {["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"].map((k) => (
              <Skeleton key={k} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 font-sans mb-6">
            The article you're looking for doesn't exist or has been removed.
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

  const categorySlug = slugFromCategory(article.category);

  return (
    <main className="bg-white min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-crimson-600 transition-colors font-sans"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Category & Content Type badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Link
            to="/category/$slug"
            params={{ slug: categorySlug }}
            className="category-tag hover:opacity-80 transition-opacity"
          >
            {categoryLabel(article.category)}
          </Link>
          <span className="category-tag-outline">
            {contentTypeLabel(article.contentType)}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-sans mb-8 pb-6 border-b border-slate-200">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-slate-700">
              {article.author}
            </span>
          </span>
          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-slate-400" />
              {formatDate(article.publishedAt)}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-slate-400" />
            {categoryLabel(article.category)}
          </span>
        </div>

        {/* Hero image or video */}
        {article.contentType === "video" && article.videoUrl ? (
          <div className="mb-8 rounded-sm overflow-hidden aspect-[16/9] bg-slate-100">
            <iframe
              src={article.videoUrl}
              title={article.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        ) : article.thumbnailUrl ? (
          <div className="mb-8 rounded-sm overflow-hidden aspect-[16/9] bg-slate-100">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/hero-placeholder.dim_1200x600.png";
              }}
            />
          </div>
        ) : null}

        {/* Summary */}
        <p className="text-slate-600 font-sans text-lg leading-relaxed mb-8 italic border-l-4 border-crimson-600 pl-4">
          {article.summary}
        </p>

        {/* Body */}
        <div
          className="prose prose-slate max-w-none font-sans"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Article body is admin-controlled content
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-200 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="editorial-divider w-16 mb-2" />
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  Related Articles
                </h2>
              </div>
              <Link
                to="/category/$slug"
                params={{ slug: categorySlug }}
                className="text-sm font-semibold text-crimson-600 hover:text-crimson-700 transition-colors font-sans"
              >
                More in {categoryLabel(article.category)}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard
                  key={related.id}
                  article={related}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
