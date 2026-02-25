import React from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticleEditor from './pages/admin/ArticleEditor';
import AdminLayout from './pages/admin/AdminLayout';

// ── Root layout (public) ────────────────────────────────────────────────────
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

// ── Routes ──────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute();

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/category/$slug',
  component: CategoryPage,
});

const articleRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/article/$slug',
  component: ArticleDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: ContactPage,
});

// Admin routes
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: AdminDashboard,
});

const adminNewArticleRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/articles/new',
  component: () => <ArticleEditor mode="create" />,
});

const adminEditArticleRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/articles/$id/edit',
  component: () => <ArticleEditor mode="edit" />,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    categoryRoute,
    articleRoute,
    aboutRoute,
    contactRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminNewArticleRoute,
    adminEditArticleRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
