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
    connectedDevices = "connectedDevices",
    marketTrends = "marketTrends",
    interviews = "interviews",
    aiAndData = "aiAndData",
    startupsAndFunding = "startupsAndFunding",
    veterinaryTech = "veterinaryTech",
    videos = "videos"
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
    /**
     * / Assign the #admin role to a principal.
     * / AccessControl.assignRole already enforces that only admins can call this.
     */
    addAdminPrincipal(user: Principal): Promise<void>;
    archiveArticle(id: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(article: Article): Promise<void>;
    deleteArticle(id: string): Promise<void>;
    /**
     * / Returns ALL articles (including drafts/archived) — admin only.
     */
    getAllArticles(): Promise<Array<Article>>;
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
    /**
     * / Demote a principal back to #guest.
     * / AccessControl.assignRole already enforces that only admins can call this.
     */
    removeAdminPrincipal(user: Principal): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Full-text search on title among published articles — public.
     */
    searchArticlesByTitle(searchTerm: string): Promise<Array<Article>>;
    updateArticle(id: string, updatedArticle: Article): Promise<void>;
}
