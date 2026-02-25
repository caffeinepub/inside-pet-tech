import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useActor } from '../../hooks/useActor';
import { useIsCallerAdmin, useClaimInitialAdmin, useGetCallerUserProfile } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import ProfileSetupModal from '../../components/auth/ProfileSetupModal';
import { Button } from '@/components/ui/button';
import { Loader2, Shield, LogOut, LayoutDashboard, PenSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const CONNECTION_TIMEOUT_MS = 15_000;

export default function AdminLayout() {
  const { identity, clear, loginStatus, login } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const {
    data: isAdmin,
    isLoading: adminLoading,
    refetch: refetchAdmin,
  } = useIsCallerAdmin();

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched,
  } = useGetCallerUserProfile();

  const claimMutation = useClaimInitialAdmin();

  // Connection timeout state
  const [timedOut, setTimedOut] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Polling state after claim
  const [pollingAdmin, setPollingAdmin] = useState(false);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Determine if we're still connecting (actor not ready yet)
  const isConnecting = !actor && actorFetching;

  useEffect(() => {
    if (isConnecting && !timedOut) {
      timeoutRef.current = setTimeout(() => setTimedOut(true), CONNECTION_TIMEOUT_MS);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isConnecting, timedOut]);

  // Poll admin status after claim until it flips true
  useEffect(() => {
    if (pollingAdmin) {
      pollIntervalRef.current = setInterval(async () => {
        const result = await refetchAdmin();
        if (result.data === true) {
          setPollingAdmin(false);
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        }
      }, 1500);
    }
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [pollingAdmin, refetchAdmin]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const handleClaimAdmin = async () => {
    try {
      await claimMutation.mutateAsync();
      toast.success('Admin access claimed! Verifying...');
      setPollingAdmin(true);
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to claim admin: ${error.message}`);
    }
  };

  const showProfileSetup =
    isAuthenticated && !profileLoading && profileFetched && userProfile === null;

  // ── Render: Not authenticated ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-crimson-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-crimson-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Admin Access</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access the Inside Pet Tech admin dashboard.
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
      </div>
    );
  }

  // ── Render: Connecting (with timeout fallback) ─────────────────────────────
  if (isConnecting) {
    if (timedOut) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-8 text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Connection Timeout</h2>
            <p className="text-muted-foreground mb-6">
              Unable to connect to the backend. Please refresh the page and try again.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh Page
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-crimson-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Connecting to backend...</p>
        </div>
      </div>
    );
  }

  // ── Render: Checking admin status ──────────────────────────────────────────
  if (adminLoading || pollingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-crimson-600 mx-auto mb-4" />
          <p className="text-muted-foreground">
            {pollingAdmin ? 'Verifying admin access...' : 'Checking permissions...'}
          </p>
        </div>
      </div>
    );
  }

  // ── Render: Not admin — show claim button ──────────────────────────────────
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Claim Admin Access</h1>
          <p className="text-muted-foreground mb-8">
            No admin has been set up yet. Click below to claim initial admin access for this publication.
          </p>
          <Button
            onClick={handleClaimAdmin}
            disabled={claimMutation.isPending}
            className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {claimMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Claiming...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" /> Claim Admin Access
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full mt-3 text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </div>
    );
  }

  // ── Render: Admin dashboard layout ────────────────────────────────────────
  return (
    <>
      {showProfileSetup && (
        <ProfileSetupModal
          onComplete={() => {
            queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
          }}
        />
      )}
      <div className="min-h-screen bg-background">
        {/* Admin Header */}
        <header className="bg-slate-900 text-white border-b border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-display font-bold text-lg text-white hover:text-crimson-300 transition-colors">
                Inside Pet Tech
              </Link>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-sm font-medium">Admin</span>
            </div>
            <nav className="flex items-center gap-2">
              <Link to="/admin">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                </Button>
              </Link>
              <Link to="/admin/new">
                <Button size="sm" className="bg-crimson-600 hover:bg-crimson-700 text-white">
                  <PenSquare className="w-4 h-4 mr-2" /> New Article
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {userProfile?.name ?? 'Sign Out'}
              </Button>
            </nav>
          </div>
        </header>

        {/* Admin Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
