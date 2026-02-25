import { Link } from '@tanstack/react-router';
import { Article } from '@/backend';
import { formatDate, categoryLabel, categorySlug, contentTypeLabel } from '@/lib/utils';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const catLabel = categoryLabel(article.category);
  const catSlug = categorySlug(article.category);
  const ctLabel = contentTypeLabel(article.contentType);
  const thumbnail = article.thumbnailUrl || '/assets/generated/article-thumb-default.dim_600x400.png';

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-lg bg-slate-800 shadow-editorial-lg">
        <Link to="/article/$id" params={{ id: article.id }}>
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={thumbnail}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Link
                  to="/category/$slug"
                  params={{ slug: catSlug }}
                  className="px-2.5 py-1 bg-crimson-600 text-white text-xs font-semibold uppercase tracking-wider rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  {catLabel}
                </Link>
                <span className="px-2.5 py-1 bg-slate-700/80 text-slate-300 text-xs font-medium rounded">
                  {ctLabel}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-crimson-300 transition-colors">
                {article.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
                {article.summary}
              </p>
              <div className="flex items-center gap-4 text-slate-400 text-xs">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {article.author}
                </span>
                {article.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(article.publishedAt)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 py-4 border-b border-slate-200 last:border-0">
        <Link to="/article/$id" params={{ id: article.id }} className="flex-shrink-0">
          <div className="w-20 h-20 overflow-hidden rounded">
            <img
              src={thumbnail}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link
            to="/category/$slug"
            params={{ slug: catSlug }}
            className="text-crimson-600 text-xs font-semibold uppercase tracking-wider hover:text-crimson-700"
          >
            {catLabel}
          </Link>
          <Link to="/article/$id" params={{ id: article.id }}>
            <h3 className="font-display text-sm font-bold text-slate-900 leading-snug mt-1 group-hover:text-crimson-700 transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
          {article.publishedAt && (
            <p className="text-slate-500 text-xs mt-1">{formatDate(article.publishedAt)}</p>
          )}
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-editorial transition-shadow duration-300 border border-slate-100">
      <Link to="/article/$id" params={{ id: article.id }}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={thumbnail}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Link
            to="/category/$slug"
            params={{ slug: catSlug }}
            className="text-crimson-600 text-xs font-semibold uppercase tracking-wider hover:text-crimson-700"
          >
            {catLabel}
          </Link>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 text-xs">{ctLabel}</span>
        </div>
        <Link to="/article/$id" params={{ id: article.id }}>
          <h3 className="font-display text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-crimson-700 transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.summary}
        </p>
        <div className="flex items-center gap-3 text-slate-500 text-xs">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {article.author}
          </span>
          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
