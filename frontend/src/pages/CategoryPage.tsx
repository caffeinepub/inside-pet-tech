import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import ArticleCard from '@/components/articles/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetArticlesByCategory } from '@/hooks/useQueries';
import { Category } from '@/backend';
import { slugToCategory, categoryLabel } from '@/lib/utils';

export default function CategoryPage() {
  const { slug } = useParams({ from: '/public-layout/category/$slug' });
  const category = slugToCategory(slug) as Category;
  const catLabel = categoryLabel(category);

  const { data: articles, isLoading, isError } = useGetArticlesByCategory(category);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-crimson-600 text-white text-xs font-semibold uppercase tracking-wider rounded">
              {catLabel}
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold text-white">{catLabel}</h1>
          <p className="text-slate-400 mt-2 text-lg">
            The latest coverage on {catLabel.toLowerCase()} in the pet technology industry.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
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
        ) : isError ? (
          <div className="text-center py-16">
            <p className="text-slate-500 font-display text-xl">Failed to load articles.</p>
            <p className="text-slate-400 text-sm mt-2">Please try again later.</p>
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="default" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-slate-700 mb-3">No articles yet</p>
            <p className="text-slate-500 text-sm">
              We're working on bringing you the latest {catLabel} coverage. Check back soon.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-6 text-crimson-600 hover:text-crimson-700 font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
