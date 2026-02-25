import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  useGetAllArticles,
  usePublishArticle,
  useArchiveArticle,
  useDeleteArticle,
} from '../../hooks/useQueries';
import { Article, ArticleStatus, Category } from '../../backend';
import { categoryLabel, articleStatusLabel, formatDate } from '../../lib/utils';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PenSquare,
  Trash2,
  Eye,
  Archive,
  Send,
  FileText,
  TrendingUp,
  Star,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

function StatusBadge({ status }: { status: ArticleStatus }) {
  const variants: Record<ArticleStatus, string> = {
    [ArticleStatus.published]: 'bg-green-100 text-green-800 border-green-200',
    [ArticleStatus.draft]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    [ArticleStatus.archived]: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variants[status]}`}>
      {articleStatusLabel(status)}
    </span>
  );
}

function StatsCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="font-display text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: articles, isLoading } = useGetAllArticles();
  const publishMutation = usePublishArticle();
  const archiveMutation = useArchiveArticle();
  const deleteMutation = useDeleteArticle();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const allArticles = articles ?? [];
  const publishedCount = allArticles.filter((a) => a.status === ArticleStatus.published).length;
  const draftCount = allArticles.filter((a) => a.status === ArticleStatus.draft).length;
  const featuredCount = allArticles.filter((a) => a.featured).length;

  const filteredArticles = activeTab === 'all'
    ? allArticles
    : allArticles.filter((a) => a.status === (activeTab as ArticleStatus));

  const handlePublish = async (id: string) => {
    setPendingAction(id);
    try {
      await publishMutation.mutateAsync(id);
      toast.success('Article published successfully');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to publish: ${error.message}`);
    } finally {
      setPendingAction(null);
    }
  };

  const handleArchive = async (id: string) => {
    setPendingAction(id);
    try {
      await archiveMutation.mutateAsync(id);
      toast.success('Article archived');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to archive: ${error.message}`);
    } finally {
      setPendingAction(null);
    }
  };

  const handleDelete = async (id: string) => {
    setPendingAction(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Article deleted');
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to delete: ${error.message}`);
    } finally {
      setPendingAction(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-lg" />)}
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your Inside Pet Tech content</p>
        </div>
        <Link to="/admin/new">
          <Button className="bg-crimson-600 hover:bg-crimson-700 text-white">
            <PenSquare className="w-4 h-4 mr-2" /> New Article
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={FileText} label="Total Articles" value={allArticles.length} color="bg-blue-100 text-blue-600" />
        <StatsCard icon={Send} label="Published" value={publishedCount} color="bg-green-100 text-green-600" />
        <StatsCard icon={TrendingUp} label="Drafts" value={draftCount} color="bg-yellow-100 text-yellow-600" />
        <StatsCard icon={Star} label="Featured" value={featuredCount} color="bg-crimson-100 text-crimson-600" />
      </div>

      {/* Articles Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b border-border px-4">
            <TabsList className="bg-transparent border-0 h-12">
              <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-crimson-600 rounded-none">
                All ({allArticles.length})
              </TabsTrigger>
              <TabsTrigger value={ArticleStatus.published} className="data-[state=active]:border-b-2 data-[state=active]:border-crimson-600 rounded-none">
                Published ({publishedCount})
              </TabsTrigger>
              <TabsTrigger value={ArticleStatus.draft} className="data-[state=active]:border-b-2 data-[state=active]:border-crimson-600 rounded-none">
                Drafts ({draftCount})
              </TabsTrigger>
              <TabsTrigger value={ArticleStatus.archived} className="data-[state=active]:border-b-2 data-[state=active]:border-crimson-600 rounded-none">
                Archived
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="m-0">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No articles found in this category.</p>
                <Link to="/admin/new">
                  <Button variant="outline" size="sm" className="mt-4">
                    Create your first article
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground line-clamp-1">{article.title}</p>
                          <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">{article.summary}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {categoryLabel(article.category)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={article.status} />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {article.publishedAt ? formatDate(article.publishedAt) : '—'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {article.status === ArticleStatus.published && (
                            <Link to="/article/$id" params={{ id: article.id }}>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                          )}
                          <Link to="/admin/edit/$id" params={{ id: article.id }}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <PenSquare className="w-4 h-4" />
                            </Button>
                          </Link>
                          {article.status !== ArticleStatus.published && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handlePublish(article.id)}
                              disabled={pendingAction === article.id}
                            >
                              {pendingAction === article.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </Button>
                          )}
                          {article.status !== ArticleStatus.archived && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                              onClick={() => handleArchive(article.id)}
                              disabled={pendingAction === article.id}
                            >
                              <Archive className="w-4 h-4" />
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                disabled={pendingAction === article.id}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Article</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{article.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(article.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
