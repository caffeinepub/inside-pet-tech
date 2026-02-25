import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Article, Category, UserProfile } from '@/backend';

// ── Admin ────────────────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor,
    staleTime: 0,
  });
}

export function useClaimInitialAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.claimInitialAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
      queryClient.refetchQueries({ queryKey: ['isCallerAdmin'] });
    },
  });
}

// ── User Profile ─────────────────────────────────────────────────────────────

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ── Articles (Public) ─────────────────────────────────────────────────────────

export function useGetPublishedArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ['publishedArticles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublishedArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ['featuredArticles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetArticlesByCategory(category: Category) {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ['articlesByCategory', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticlesByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useGetArticleById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Article | null>({
    queryKey: ['article', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getArticleById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useSearchArticles(searchTerm: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ['searchArticles', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      return actor.searchArticlesByTitle(searchTerm);
    },
    enabled: !!actor && !isFetching && !!searchTerm.trim(),
  });
}

// ── Articles (Admin) ──────────────────────────────────────────────────────────

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ['allArticles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (article: Article) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createArticle(article);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['featuredArticles'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByCategory'] });
    },
  });
}

export function useUpdateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, article }: { id: string; article: Article }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateArticle(id, article);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['featuredArticles'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByCategory'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
    },
  });
}

export function useDeleteArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteArticle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['featuredArticles'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByCategory'] });
    },
  });
}

export function usePublishArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.publishArticle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['featuredArticles'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByCategory'] });
    },
  });
}

export function useArchiveArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.archiveArticle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allArticles'] });
      queryClient.invalidateQueries({ queryKey: ['publishedArticles'] });
      queryClient.invalidateQueries({ queryKey: ['featuredArticles'] });
      queryClient.invalidateQueries({ queryKey: ['articlesByCategory'] });
    },
  });
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export function useSubscribeToNewsletter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.subscribeToNewsletter(email);
    },
  });
}
