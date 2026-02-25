import { Link } from '@tanstack/react-router';
import { ArrowRight, TrendingUp, Mic, Newspaper, Rocket } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetFeaturedArticles, useGetPublishedArticles, useGetArticlesByCategory } from '@/hooks/useQueries';
import { Category } from '@/backend';

function CategorySection({
  title,
  category,
  icon: Icon,
  slug,
}: {
  title: string;
  category: Category;
  icon: React.ElementType;
  slug: string;
}) {
  const { data: articles, isLoading } = useGetArticlesByCategory(category);
  const displayed = articles?.slice(0, 3) ?? [];

  return (
    <section className="py-12 border-t border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-crimson-50 rounded-lg">
            <Icon className="h-5 w-5 text-crimson-600" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900">{title}</h2>
        </div>
        <Link
          to="/category/$slug"
          params={{ slug }}
          className="flex items-center gap-1.5 text-crimson-600 hover:text-crimson-700 text-sm font-medium transition-colors"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : displayed.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.map((article) => (
            <ArticleCard key={article.id} article={article} variant="default" />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400">
          <p>No articles yet in this category.</p>
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  const { data: featuredArticles, isLoading: featuredLoading } = useGetFeaturedArticles();
  const { data: publishedArticles, isLoading: publishedLoading } = useGetPublishedArticles();

  const heroArticle = featuredArticles?.[0] ?? publishedArticles?.[0];
  const latestArticles = publishedArticles?.slice(0, 6) ?? [];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredLoading || publishedLoading ? (
            <div className="relative rounded-xl overflow-hidden">
              <Skeleton className="w-full aspect-[16/7] bg-slate-700" />
            </div>
          ) : heroArticle ? (
            <ArticleCard article={heroArticle} variant="featured" />
          ) : (
            <div className="relative rounded-xl overflow-hidden bg-slate-800 aspect-[16/7] flex items-center justify-center">
              <div className="text-center text-slate-400">
                <p className="font-display text-2xl font-bold mb-2">Welcome to Inside Pet Tech</p>
                <p className="text-sm">Covering the Companies, Technology, and Ideas Reshaping Pet Care</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-slate-900">Latest News</h2>
            <div className="h-0.5 flex-1 mx-6 bg-gradient-to-r from-crimson-500 to-transparent" />
          </div>

          {publishedLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : latestArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="default" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <p className="font-display text-xl">No articles published yet.</p>
              <p className="text-sm mt-2">Check back soon for the latest pet tech news.</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Spotlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategorySection
          title="Startups & Funding"
          category={Category.startupsAndFunding}
          icon={Rocket}
          slug="startups-and-funding"
        />
        <CategorySection
          title="News & Views"
          category={Category.newsAndViews}
          icon={Newspaper}
          slug="news-and-views"
        />
        <CategorySection
          title="Interviews"
          category={Category.interviews}
          icon={Mic}
          slug="interviews"
        />
        <CategorySection
          title="Market Trends"
          category={Category.marketTrends}
          icon={TrendingUp}
          slug="market-trends"
        />
      </div>
    </main>
  );
}
