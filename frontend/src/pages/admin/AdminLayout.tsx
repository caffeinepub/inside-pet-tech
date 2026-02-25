import React from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { LayoutDashboard, FileText, LogOut, Home } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useIsCallerAdmin, useGetCallerUserProfile } from '../../hooks/useQueries';
import ProfileSetupModal from '../../components/auth/ProfileSetupModal';

export default function AdminLayout() {
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsCallerAdmin();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <img
            src="/assets/generated/inside-pet-tech-logo.dim_400x480.png"
            alt="Inside Pet Tech"
            className="h-20 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in with your Internet Identity to access the content dashboard.
          </p>
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full brand-gradient text-white font-medium py-2.5 px-6 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoggingIn ? 'Signing in...' : 'Sign In with Internet Identity'}
          </button>
          <Link to="/" className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to site
          </Link>
        </div>
      </div>
    );
  }

  // Checking admin status
  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-crimson border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-xl font-serif font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Your account doesn't have admin privileges. Contact an existing admin to grant access.
          </p>
          <p className="text-xs text-muted-foreground mb-4 font-mono bg-muted px-3 py-2 rounded">
            {identity?.getPrincipal().toString()}
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to site
            </Link>
            <button onClick={handleLogout} className="text-sm text-destructive hover:text-destructive/80 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileSetupModal open={showProfileSetup} onComplete={() => {}} />

      {/* Admin header */}
      <header className="bg-foreground text-background border-b border-background/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/generated/inside-pet-tech-logo.dim_400x480.png"
                alt="Inside Pet Tech"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <span className="text-background/30 text-sm">|</span>
            <span className="text-sm font-medium text-background/70">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-background/50 hidden sm:block">
              {userProfile?.name ?? identity?.getPrincipal().toString().slice(0, 12) + '...'}
            </span>
            <Link
              to="/"
              className="text-xs text-background/60 hover:text-background transition-colors flex items-center gap-1"
            >
              <Home size={12} /> Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-background/60 hover:text-background transition-colors flex items-center gap-1"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Admin nav */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 h-10">
          <Link
            to="/admin"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-sm transition-colors flex items-center gap-1.5"
          >
            <LayoutDashboard size={13} /> Dashboard
          </Link>
          <Link
            to="/admin/articles/new"
            className="px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-sm transition-colors flex items-center gap-1.5"
          >
            <FileText size={13} /> New Article
          </Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}
