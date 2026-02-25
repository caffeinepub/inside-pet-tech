import React from 'react';
import { Link } from '@tanstack/react-router';
import { Article } from '../../backend';
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  CATEGORY_GRADIENT_CLASSES,
  CONTENT_TYPE_LABELS,
  formatDateShort,
} from '../../lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const gradientClass = CATEGORY_GRADIENT_CLASSES[article.category];
  const thumbnail = article.thumbnailUrl || '/assets/generated/article-thumb-default.dim_600x400.png';

  if (variant === 'compact') {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group flex gap-3 items-start"
      >
        <div className="w-20 h-16 shrink-0 overflow-hidden rounded-sm bg-muted">
          <img
            src={thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/article-thumb-default.dim_600x400.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-sm bg-gradient-to-r ${gradientClass} mb-1`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          <h4 className="text-sm font-serif font-semibold text-foreground group-hover:text-brand-crimson transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">{formatDateShort(article.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        to="/article/$slug"
        params={{ slug: article.slug }}
        className="group block relative overflow-hidden rounded-lg editorial-shadow-lg"
      >
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/hero-placeholder.dim_1200x600.png';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider text-white px-2 py-0.5 rounded-sm bg-gradient-to-r ${gradientClass}`}>
              {CATEGORY_LABELS[article.category]}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
              {CONTENT_TYPE_LABELS[article.contentType]}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight mb-2">
            {article.title}
          </h2>
          <p className="text-sm text-white/80 line-clamp-2 mb-3">{article.summary}</p>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>{article.author}</span>
            <span>·</span>
            <span>{formatDateShort(article.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      to="/article/$slug"
      params={{ slug: article.slug }}
      className="group block bg-card rounded-lg overflow-hidden editorial-shadow hover:editorial-shadow-lg transition-shadow duration-200"
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/article-thumb-default.dim_600x400.png';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider text-white px-2 py-0.5 rounded-sm bg-gradient-to-r ${gradientClass}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          {article.contentType !== 'article' && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {CONTENT_TYPE_LABELS[article.contentType]}
            </span>
          )}
        </div>
        <h3 className="font-serif font-semibold text-foreground group-hover:text-brand-crimson transition-colors line-clamp-2 leading-snug mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{article.summary}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium">{article.author}</span>
          <span>·</span>
          <span>{formatDateShort(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
