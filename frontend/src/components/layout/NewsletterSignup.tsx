import { useState } from "react";
import { Mail } from "lucide-react";
import { useSubscribeToNewsletter } from "../../hooks/useQueries";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const subscribeMutation = useSubscribeToNewsletter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await subscribeMutation.mutateAsync(email);
      toast.success("You're subscribed! Welcome to Inside Pet Tech.");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="w-5 h-5 text-crimson-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-crimson-400">
              Newsletter
            </span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Stay Ahead of the Curve
          </h2>
          <p className="text-slate-400 mb-8">
            Get the latest pet tech news, funding announcements, and industry insights delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500"
            />
            <button
              type="submit"
              disabled={subscribeMutation.isPending}
              className="px-6 py-3 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
