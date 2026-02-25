import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Category, ContentType, ArticleStatus } from '../backend';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(publishedAt?: bigint): string {
  if (!publishedAt) return 'Unpublished';
  // Convert nanoseconds to milliseconds
  const ms = Number(publishedAt) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(publishedAt?: bigint): string {
  if (!publishedAt) return '';
  const ms = Number(publishedAt) / 1_000_000;
  return new Date(ms).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.startupsAndFunding]: 'Startups & Funding',
  [Category.aiAndData]: 'AI & Data',
  [Category.veterinaryTech]: 'Veterinary Tech',
  [Category.connectedDevices]: 'Connected Devices',
  [Category.marketTrends]: 'Market Trends',
  [Category.interviews]: 'Interviews',
  [Category.videos]: 'Videos',
};

export const CATEGORY_SLUGS: Record<Category, string> = {
  [Category.startupsAndFunding]: 'startups-funding',
  [Category.aiAndData]: 'ai-data',
  [Category.veterinaryTech]: 'veterinary-tech',
  [Category.connectedDevices]: 'connected-devices',
  [Category.marketTrends]: 'market-trends',
  [Category.interviews]: 'interviews',
  [Category.videos]: 'videos',
};

export const SLUG_TO_CATEGORY: Record<string, Category> = {
  'startups-funding': Category.startupsAndFunding,
  'ai-data': Category.aiAndData,
  'veterinary-tech': Category.veterinaryTech,
  'connected-devices': Category.connectedDevices,
  'market-trends': Category.marketTrends,
  'interviews': Category.interviews,
  'videos': Category.videos,
};

export const CATEGORY_DESCRIPTORS: Record<Category, string> = {
  [Category.startupsAndFunding]: 'Emerging companies and investment activity reshaping pet care',
  [Category.aiAndData]: 'Artificial intelligence and data platforms transforming animal health',
  [Category.veterinaryTech]: 'Technology and workflow innovation in veterinary practice',
  [Category.connectedDevices]: 'Smart collars, GPS trackers, and connected care platforms',
  [Category.marketTrends]: 'Market analysis, operators, and category shifts in pet tech',
  [Category.interviews]: 'Executive conversations and industry perspectives',
  [Category.videos]: 'Video features, tours, and multimedia coverage',
};

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  [ContentType.article]: 'Article',
  [ContentType.featureStory]: 'Feature Story',
  [ContentType.interview]: 'Interview',
  [ContentType.video]: 'Video',
};

export const STATUS_LABELS: Record<ArticleStatus, string> = {
  [ArticleStatus.published]: 'Published',
  [ArticleStatus.draft]: 'Draft',
  [ArticleStatus.archived]: 'Archived',
};

export const CATEGORY_GRADIENT_CLASSES: Record<Category, string> = {
  [Category.startupsAndFunding]: 'from-rose-600 to-pink-700',
  [Category.aiAndData]: 'from-violet-600 to-indigo-700',
  [Category.veterinaryTech]: 'from-teal-600 to-cyan-700',
  [Category.connectedDevices]: 'from-blue-600 to-indigo-700',
  [Category.marketTrends]: 'from-amber-600 to-orange-700',
  [Category.interviews]: 'from-purple-600 to-violet-700',
  [Category.videos]: 'from-red-600 to-rose-700',
};

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
