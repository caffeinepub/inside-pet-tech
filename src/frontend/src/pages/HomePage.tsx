import { type Article, Category } from "@/backend";
import ArticleCard from "@/components/articles/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetFeaturedArticles,
  useGetPublishedArticles,
} from "@/hooks/useQueries";
import { categoryLabel, formatDate, slugFromCategory } from "@/lib/petUtils";
import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";

const CATEGORY_SECTIONS: { category: Category; label: string; slug: string }[] =
  [
    {
      category: Category.startupsAndFunding,
      label: "Startups & Funding",
      slug: "startups-and-funding",
    },
    {
      category: Category.newsAndViews,
      label: "News & Views",
      slug: "news-and-views",
    },
    { category: Category.interviews, label: "Interviews", slug: "interviews" },
    {
      category: Category.marketTrends,
      label: "Market Trends",
      slug: "market-trends",
    },
  ];

function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <Skeleton className="w-full aspect-[16/9] rounded-sm" />
      </div>
      <div className="lg:col-span-2 flex flex-col justify-center gap-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

function FeaturedHero({ article }: { article: Article }) {
  const slug = slugFromCategory(article.category);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      {/* Image */}
      <div className="lg:col-span-3">
        <Link
          to="/article/$id"
          params={{ id: article.id }}
          className="block group"
        >
          <div className="relative overflow-hidden rounded-sm aspect-[16/9] bg-slate-100">
            <img
              src={
                article.thumbnailUrl ||
                "/assets/generated/hero-placeholder.dim_1200x600.png"
              }
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/hero-placeholder.dim_1200x600.png";
              }}
            />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="lg:col-span-2 flex flex-col justify-center">
        <div className="mb-3">
          <Link
            to="/category/$slug"
            params={{ slug }}
            className="category-tag hover:opacity-80 transition-opacity"
          >
            {categoryLabel(article.category)}
          </Link>
          <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-crimson-600 font-sans">
            Featured
          </span>
        </div>
        <Link to="/article/$id" params={{ id: article.id }} className="group">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 group-hover:text-crimson-700 transition-colors leading-tight mb-4">
            {article.title}
          </h1>
        </Link>
        <p className="text-slate-600 font-sans text-base leading-relaxed mb-5">
          {article.summary}
        </p>
        <div className="flex items-center gap-2 text-sm text-slate-500 font-sans mb-5">
          <span className="font-semibold text-slate-800">{article.author}</span>
          <span>·</span>
          <span>
            {article.publishedAt ? formatDate(article.publishedAt) : ""}
          </span>
        </div>
        <Link
          to="/article/$id"
          params={{ id: article.id }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-crimson-600 hover:text-crimson-700 transition-colors font-sans group"
        >
          Read Full Story
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  label,
  slug,
  articles,
}: {
  category: Category;
  label: string;
  slug: string;
  articles: Article[];
}) {
  const filtered = articles
    .filter((a) => a.category === category)
    .sort((a, b) => {
      const ta = a.publishedAt ? Number(a.publishedAt) : 0;
      const tb = b.publishedAt ? Number(b.publishedAt) : 0;
      return tb - ta;
    })
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <section className="py-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="editorial-divider w-16 mb-2" />
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {label}
          </h2>
        </div>
        <Link
          to="/category/$slug"
          params={{ slug }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-crimson-600 hover:text-crimson-700 transition-colors font-sans group"
        >
          More
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} variant="default" />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { data: featuredArticles, isLoading: featuredLoading } =
    useGetFeaturedArticles();
  const { data: publishedArticles, isLoading: publishedLoading } =
    useGetPublishedArticles();

  const heroArticle =
    featuredArticles && featuredArticles.length > 0
      ? [...featuredArticles].sort((a, b) => {
          const ta = a.publishedAt ? Number(a.publishedAt) : 0;
          const tb = b.publishedAt ? Number(b.publishedAt) : 0;
          return tb - ta;
        })[0]
      : publishedArticles && publishedArticles.length > 0
        ? [...publishedArticles].sort((a, b) => {
            const ta = a.publishedAt ? Number(a.publishedAt) : 0;
            const tb = b.publishedAt ? Number(b.publishedAt) : 0;
            return tb - ta;
          })[0]
        : null;

  const latestArticles = publishedArticles
    ? [...publishedArticles]
        .sort((a, b) => {
          const ta = a.publishedAt ? Number(a.publishedAt) : 0;
          const tb = b.publishedAt ? Number(b.publishedAt) : 0;
          return tb - ta;
        })
        .slice(0, 6)
    : [];

  return (
    <main
      className="bg-off-white min-h-screen"
      style={{ backgroundColor: "oklch(0.97 0.005 85)" }}
    >
      {/* Hero / Featured Article */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {featuredLoading || publishedLoading ? (
            <HeroSkeleton />
          ) : heroArticle ? (
            <FeaturedHero article={heroArticle} />
          ) : (
            <div className="text-center py-16 text-slate-500 font-sans">
              No featured articles yet.
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="editorial-divider w-16 mb-2" />
              <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-crimson-600" />
                Latest News
              </h2>
            </div>
          </div>

          {publishedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {["n1", "n2", "n3", "n4", "n5", "n6"].map((k) => (
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
          ) : latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="default"
                />
              ))}
            </div>
          ) : (
            <p className="text-slate-500 font-sans text-center py-8">
              No articles published yet.
            </p>
          )}
        </div>
      </section>

      {/* Category Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {publishedLoading ? (
          <div className="py-10 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {["c1", "c2", "c3"].map((k) => (
                <Skeleton key={k} className="h-48 w-full rounded-sm" />
              ))}
            </div>
          </div>
        ) : (
          CATEGORY_SECTIONS.map(({ category, label, slug }) => (
            <CategorySection
              key={category}
              category={category}
              label={label}
              slug={slug}
              articles={publishedArticles || []}
            />
          ))
        )}
      </div>
    </main>
  );
}
