import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, LogIn, LogOut, Settings } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Category } from '../../backend';
import { CATEGORY_LABELS, CATEGORY_SLUGS } from '../../lib/utils';

const NAV_CATEGORIES = [
  Category.startupsAndFunding,
  Category.aiAndData,
  Category.veterinaryTech,
  Category.connectedDevices,
  Category.marketTrends,
  Category.interviews,
  Category.videos,
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 editorial-shadow">
      {/* Top bar */}
      <div className="border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <p className="text-xs text-muted-foreground font-sans">
            Covering the Companies, Technology, and Ideas Reshaping Pet Care
          </p>
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <Link
                to="/admin"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Settings size={11} />
                Admin
              </Link>
            )}
            <button
              onClick={handleAuth}
              disabled={isLoggingIn}
              className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              {isAuthenticated ? (
                <>
                  <LogOut size={11} />
                  Sign Out
                </>
              ) : (
                <>
                  <LogIn size={11} />
                  {isLoggingIn ? 'Signing in...' : 'Sign In'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/assets/generated/inside-pet-tech-logo.dim_400x480.png"
              alt="Inside Pet Tech"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/category/$slug"
                params={{ slug: CATEGORY_SLUGS[cat] }}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-sm hover:bg-accent whitespace-nowrap"
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/category/$slug"
                params={{ slug: CATEGORY_SLUGS[cat] }}
                className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              {isAuthenticated && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-sm transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => { handleAuth(); setMobileOpen(false); }}
                disabled={isLoggingIn}
                className="w-full text-left px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent rounded-sm transition-colors disabled:opacity-50"
              >
                {isAuthenticated ? 'Sign Out' : isLoggingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
