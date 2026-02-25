import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Article {
    id: string;
    status: ArticleStatus;
    title: string;
    featured: boolean;
    thumbnailUrl: string;
    contentType: ContentType;
    body: string;
    slug: string;
    publishedAt?: bigint;
    author: string;
    summary: string;
    category: Category;
    videoUrl?: string;
}
export interface NewsletterSubscription {
    email: string;
    timestamp: bigint;
}
export interface UserProfile {
    bio: string;
    name: string;
}
export enum ArticleStatus {
    published = "published",
    draft = "draft",
    archived = "archived"
}
export enum Category {
    newsAndViews = "newsAndViews",
    marketTrends = "marketTrends",
    interviews = "interviews",
    startupsAndFunding = "startupsAndFunding"
}
export enum ContentType {
    video = "video",
    interview = "interview",
    article = "article",
    featureStory = "featureStory"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAdminPrincipal(user: Principal): Promise<void>;
    archiveArticle(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimInitialAdmin(): Promise<boolean>;
    createArticle(article: Article): Promise<void>;
    deleteArticle(id: string): Promise<void>;
    /**
     * / Returns ALL articles (including drafts/archived) — admin only.
     */
    getAllArticles(): Promise<Array<Article>>;
    getAllNewsletterSubscribers(): Promise<Array<NewsletterSubscription>>;
    /**
     * / Returns a single article by id.
     * / Admins can see any status; others only see published.
     */
    getArticleById(id: string): Promise<Article | null>;
    /**
     * / Returns published articles by a given author — public.
     */
    getArticlesByAuthor(author: string): Promise<Array<Article>>;
    /**
     * / Returns published articles in a given category — public.
     */
    getArticlesByCategory(category: Category): Promise<Array<Article>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Returns featured published articles — public.
     */
    getFeaturedArticles(): Promise<Array<Article>>;
    /**
     * / Returns only published articles — public.
     */
    getPublishedArticles(): Promise<Array<Article>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    publishArticle(id: string): Promise<void>;
    removeAdminPrincipal(user: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Full-text search on title among published articles — public.
     */
    searchArticlesByTitle(searchTerm: string): Promise<Array<Article>>;
    subscribeToNewsletter(email: string): Promise<void>;
    updateArticle(id: string, updatedArticle: Article): Promise<void>;
}
