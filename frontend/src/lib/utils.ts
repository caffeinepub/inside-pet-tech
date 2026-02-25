import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Category, ContentType, ArticleStatus } from '@/backend';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: bigint | number): string {
  const ms = typeof timestamp === 'bigint' ? Number(timestamp) / 1_000_000 : timestamp;
  return new Date(ms).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const ALL_CATEGORIES = [
  Category.startupsAndFunding,
  Category.newsAndViews,
  Category.interviews,
  Category.marketTrends,
];

export function categoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    [Category.startupsAndFunding]: 'Startups & Funding',
    [Category.newsAndViews]: 'News & Views',
    [Category.interviews]: 'Interviews',
    [Category.marketTrends]: 'Market Trends',
  };
  return labels[category] ?? category;
}

export function categorySlug(category: Category): string {
  const slugs: Record<Category, string> = {
    [Category.startupsAndFunding]: 'startups-and-funding',
    [Category.newsAndViews]: 'news-and-views',
    [Category.interviews]: 'interviews',
    [Category.marketTrends]: 'market-trends',
  };
  return slugs[category] ?? category;
}

export function slugToCategory(slug: string): Category {
  const map: Record<string, Category> = {
    'startups-and-funding': Category.startupsAndFunding,
    'news-and-views': Category.newsAndViews,
    interviews: Category.interviews,
    'market-trends': Category.marketTrends,
  };
  return map[slug] ?? Category.newsAndViews;
}

export function categoryDescriptor(category: Category): string {
  const descriptors: Record<Category, string> = {
    [Category.startupsAndFunding]: 'Venture capital, funding rounds, and emerging pet tech startups',
    [Category.newsAndViews]: 'Breaking news and expert commentary on pet technology',
    [Category.interviews]: 'In-depth conversations with industry leaders and innovators',
    [Category.marketTrends]: 'Data-driven analysis of the pet technology market',
  };
  return descriptors[category] ?? '';
}

export function contentTypeLabel(contentType: ContentType): string {
  const labels: Record<ContentType, string> = {
    [ContentType.article]: 'Article',
    [ContentType.featureStory]: 'Feature Story',
    [ContentType.interview]: 'Interview',
    [ContentType.video]: 'Video',
  };
  return labels[contentType] ?? contentType;
}

export function articleStatusLabel(status: ArticleStatus): string {
  const labels: Record<ArticleStatus, string> = {
    [ArticleStatus.published]: 'Published',
    [ArticleStatus.draft]: 'Draft',
    [ArticleStatus.archived]: 'Archived',
  };
  return labels[status] ?? status;
}
