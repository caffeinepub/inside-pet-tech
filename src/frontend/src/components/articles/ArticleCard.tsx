import type { Article } from "@/backend";
import { categoryLabel, formatDate, slugFromCategory } from "@/lib/petUtils";
import { Link } from "@tanstack/react-router";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured";
}

function CategoryTag({ category }: { category: Article["category"] }) {
  return <span className="category-tag">{categoryLabel(category)}</span>;
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const slug = slugFromCategory(article.category);

  if (variant === "featured") {
    return (
      <article className="group">
        <Link to="/article/$id" params={{ id: article.id }} className="block">
          <div className="relative overflow-hidden rounded-sm aspect-[16/9] mb-4 bg-slate-100">
            <img
              src={
                article.thumbnailUrl ||
                "/assets/generated/hero-placeholder.dim_1200x600.png"
              }
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/hero-placeholder.dim_1200x600.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <CategoryTag category={article.category} />
            </div>
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 group-hover:text-crimson-600 transition-colors leading-tight mb-2">
            {article.title}
          </h2>
          <p className="text-slate-600 font-sans text-sm leading-relaxed mb-3 line-clamp-2">
            {article.summary}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <span className="font-medium text-slate-700">{article.author}</span>
            <span>·</span>
            <span>
              {article.publishedAt ? formatDate(article.publishedAt) : ""}
            </span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex gap-3 py-3 border-b border-slate-100 last:border-0">
        <Link
          to="/article/$id"
          params={{ id: article.id }}
          className="flex gap-3 w-full"
        >
          <div className="shrink-0 w-20 h-16 overflow-hidden rounded-sm bg-slate-100">
            <img
              src={
                article.thumbnailUrl ||
                "/assets/generated/article-thumb-default.dim_600x400.png"
              }
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/generated/article-thumb-default.dim_600x400.png";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-crimson-600 font-sans">
                {categoryLabel(article.category)}
              </span>
            </div>
            <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-crimson-600 transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-slate-500 font-sans mt-1">
              {article.publishedAt ? formatDate(article.publishedAt) : ""}
            </p>
          </div>
        </Link>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group bg-white rounded-sm shadow-editorial hover:shadow-editorial-md transition-shadow duration-200 overflow-hidden">
      <Link to="/article/$id" params={{ id: article.id }} className="block">
        <div className="relative overflow-hidden aspect-[16/9] bg-slate-100">
          <img
            src={
              article.thumbnailUrl ||
              "/assets/generated/article-thumb-default.dim_600x400.png"
            }
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/generated/article-thumb-default.dim_600x400.png";
            }}
          />
        </div>
        <div className="p-4">
          <div className="mb-2">
            <Link
              to="/category/$slug"
              params={{ slug: slug }}
              className="category-tag hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {categoryLabel(article.category)}
            </Link>
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-crimson-600 transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-slate-600 font-sans text-sm leading-relaxed mb-3 line-clamp-2">
            {article.summary}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
            <span className="font-medium text-slate-700">{article.author}</span>
            <span>·</span>
            <span>
              {article.publishedAt ? formatDate(article.publishedAt) : ""}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
