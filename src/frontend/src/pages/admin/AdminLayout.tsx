import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  LayoutDashboard,
  Loader2,
  LogOut,
  PenSquare,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ProfileSetupModal from "../../components/auth/ProfileSetupModal";
import { useActor } from "../../hooks/useActor";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useClaimInitialAdmin,
  useGetCallerUserProfile,
  useIsCallerAdmin,
} from "../../hooks/useQueries";

const ACTOR_TIMEOUT_MS = 8_000;

export default function AdminLayout() {
  const { identity, clear, loginStatus, login } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

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

  // Local claiming state — controls the "Verifying..." spinner after claim
  const [claiming, setClaiming] = useState(false);
  const [claimFailed, setClaimFailed] = useState(false);

  // Actor timeout: if authenticated but actor never arrives within ACTOR_TIMEOUT_MS, show refresh
  const [actorTimedOut, setActorTimedOut] = useState(false);
  const actorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAuthenticated && !actor && !actorTimedOut) {
      actorTimeoutRef.current = setTimeout(
        () => setActorTimedOut(true),
        ACTOR_TIMEOUT_MS,
      );
    } else if (actor) {
      if (actorTimeoutRef.current) {
        clearTimeout(actorTimeoutRef.current);
        actorTimeoutRef.current = null;
      }
      setActorTimedOut(false);
    }
    return () => {
      if (actorTimeoutRef.current) clearTimeout(actorTimeoutRef.current);
    };
  }, [isAuthenticated, actor, actorTimedOut]);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: "/" });
  };

  const handleClaimAdmin = async () => {
    setClaiming(true);
    setClaimFailed(false);
    try {
      await claimMutation.mutateAsync();
      toast.success("Admin access claimed! Verifying…");
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(`Failed to claim admin: ${error.message}`);
      setClaiming(false);
      return;
    }

    // Retry refetchAdmin up to 10 times with 2s delays (20s total max)
    let verified = false;
    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise((res) => setTimeout(res, 2000));
      try {
        await queryClient.invalidateQueries({ queryKey: ["isCallerAdmin"] });
        const result = await refetchAdmin();
        if (result.data === true) {
          verified = true;
          break;
        }
      } catch {
        // continue retrying
      }
    }

    setClaiming(false);
    if (!verified) {
      setClaimFailed(true);
    }
  };

  const showProfileSetup =
    isAuthenticated &&
    !profileLoading &&
    profileFetched &&
    userProfile === null;

  // ── Render: Not authenticated ──────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-crimson-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-crimson-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Admin Access
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to access the Inside Pet Tech admin dashboard.
          </p>
          <Button
            data-ocid="admin.submit_button"
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>
      </div>
    );
  }

  // ── Render: Actor loading / timed out ─────────────────────────────────────
  if (isAuthenticated && !actor) {
    if (actorTimedOut) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full mx-auto p-8 text-center">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Connection Timeout
            </h2>
            <p className="text-muted-foreground mb-6">
              Unable to connect to the backend. Please refresh the page and try
              again.
            </p>
            <Button
              data-ocid="admin.secondary_button"
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh Page
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center" data-ocid="admin.loading_state">
          <Loader2 className="w-8 h-8 animate-spin text-crimson-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Connecting to backend…</p>
        </div>
      </div>
    );
  }

  // ── Render: Checking admin status ──────────────────────────────────────────
  if (adminLoading || actorFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center" data-ocid="admin.loading_state">
          <Loader2 className="w-8 h-8 animate-spin text-crimson-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Checking permissions…</p>
        </div>
      </div>
    );
  }

  // ── Render: Claiming in progress ───────────────────────────────────────────
  if (claiming) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center" data-ocid="admin.loading_state">
          <Loader2 className="w-8 h-8 animate-spin text-crimson-600 mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying admin access…</p>
        </div>
      </div>
    );
  }

  // ── Render: Claim succeeded but verification timed out — prompt refresh ────
  if (claimFailed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Access Granted
          </h1>
          <p className="text-muted-foreground mb-6">
            Admin access was claimed successfully. Please refresh the page to
            complete sign-in.
          </p>
          <div
            className="mb-6 p-4 rounded-sm bg-green-50 border border-green-200 text-green-700 text-sm font-sans"
            data-ocid="admin.success_state"
          >
            Your admin account has been set up. A quick page refresh will log
            you in to the dashboard.
          </div>
          <Button
            data-ocid="admin.primary_button"
            onClick={() => window.location.reload()}
            className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh Page
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

  // ── Render: Not admin — show claim button ──────────────────────────────────
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full mx-auto p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Claim Admin Access
          </h1>
          <p className="text-muted-foreground mb-8">
            No admin has been set up yet. Click below to claim initial admin
            access for this publication.
          </p>

          <Button
            data-ocid="admin.primary_button"
            onClick={handleClaimAdmin}
            disabled={claimMutation.isPending || claiming}
            className="w-full bg-crimson-600 hover:bg-crimson-700 text-white"
          >
            {claimMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Claiming…
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
            queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
          }}
        />
      )}
      <div className="min-h-screen bg-background">
        {/* Admin Header */}
        <header className="bg-slate-900 text-white border-b border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="font-display font-bold text-lg text-white hover:text-crimson-300 transition-colors"
              >
                Inside Pet Tech
              </Link>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-sm font-medium">Admin</span>
            </div>
            <nav className="flex items-center gap-2">
              <Link to="/admin" data-ocid="admin.link">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                </Button>
              </Link>
              <Link to="/admin/articles/new" data-ocid="admin.primary_button">
                <Button
                  size="sm"
                  className="bg-crimson-600 hover:bg-crimson-700 text-white"
                >
                  <PenSquare className="w-4 h-4 mr-2" /> New Article
                </Button>
              </Link>
              <Button
                data-ocid="admin.secondary_button"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {userProfile?.name ?? "Sign Out"}
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
