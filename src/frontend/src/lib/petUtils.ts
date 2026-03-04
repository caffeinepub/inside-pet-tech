import { ArticleStatus, Category, ContentType } from "@/backend";

// ── Date formatting ───────────────────────────────────────────────────────────

/**
 * Format a BigInt nanosecond timestamp (ICP standard) or a millisecond timestamp number to a readable date.
 */
export function formatDate(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint"
      ? Number(timestamp / 1_000_000n) // nanoseconds → milliseconds
      : timestamp;
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── Category helpers ──────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.startupsAndFunding]: "Startups & Funding",
  [Category.newsAndViews]: "News & Views",
  [Category.interviews]: "Interviews",
  [Category.marketTrends]: "Market Trends",
};

const CATEGORY_SLUGS: Record<Category, string> = {
  [Category.startupsAndFunding]: "startups-and-funding",
  [Category.newsAndViews]: "news-and-views",
  [Category.interviews]: "interviews",
  [Category.marketTrends]: "market-trends",
};

const SLUG_TO_CATEGORY: Record<string, Category> = {
  "startups-and-funding": Category.startupsAndFunding,
  "news-and-views": Category.newsAndViews,
  interviews: Category.interviews,
  "market-trends": Category.marketTrends,
};

const CATEGORY_DESCRIPTORS: Record<Category, string> = {
  [Category.startupsAndFunding]:
    "Tracking every meaningful funding round, acquisition, and startup launch in the pet technology space.",
  [Category.newsAndViews]:
    "Timely reporting on events, regulatory shifts, and market movements that matter most to pet industry professionals.",
  [Category.interviews]:
    "In-depth conversations with the founders, executives, and innovators building the future of pet care.",
  [Category.marketTrends]:
    "Data-driven analysis of consumer behavior, technology adoption, and emerging opportunities across the global pet market.",
};

export function categoryLabel(category: Category): string {
  return CATEGORY_LABELS[category] ?? String(category);
}

export function slugFromCategory(category: Category): string {
  return CATEGORY_SLUGS[category] ?? String(category);
}

export function categoryFromSlug(slug: string): Category | undefined {
  return SLUG_TO_CATEGORY[slug];
}

export function categoryDescriptor(category: Category): string {
  return CATEGORY_DESCRIPTORS[category] ?? "";
}

// ── Content type helpers ──────────────────────────────────────────────────────

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  [ContentType.article]: "Article",
  [ContentType.featureStory]: "Feature Story",
  [ContentType.interview]: "Interview",
  [ContentType.video]: "Video",
};

export function contentTypeLabel(type: ContentType): string {
  return CONTENT_TYPE_LABELS[type] ?? String(type);
}

// ── Article status helpers ────────────────────────────────────────────────────

const STATUS_LABELS: Record<ArticleStatus, string> = {
  [ArticleStatus.draft]: "Draft",
  [ArticleStatus.published]: "Published",
  [ArticleStatus.archived]: "Archived",
};

export function articleStatusLabel(status: ArticleStatus): string {
  return STATUS_LABELS[status] ?? String(status);
}

// ── ID and slug generators ────────────────────────────────────────────────────

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
