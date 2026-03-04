import { useSubscribeToNewsletter } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Heart, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
const logoSrc = new URL("/assets/1000034567.jpg", import.meta.url).href;

const categories = [
  { label: "Startups & Funding", slug: "startups-and-funding" },
  { label: "News & Views", slug: "news-and-views" },
  { label: "Interviews", slug: "interviews" },
  { label: "Market Trends", slug: "market-trends" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribeMutation = useSubscribeToNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await subscribeMutation.mutateAsync(email);
      toast.success("You're subscribed! Welcome to Inside Pet Tech.");
      setEmail("");
    } catch (err: any) {
      toast.error(err?.message || "Subscription failed. Please try again.");
    }
  };

  const appId = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "inside-pet-tech",
  );

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-crimson-600/20">
                <Mail className="h-6 w-6 text-crimson-400" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Stay Ahead of Pet Tech
            </h3>
            <p className="text-slate-400 mb-6 font-sans text-sm">
              Get the latest news, funding rounds, and industry insights
              delivered to your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-sm bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-crimson-500 font-sans text-sm"
                required
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-6 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded-sm transition-colors font-sans text-sm disabled:opacity-60 whitespace-nowrap"
              >
                {subscribeMutation.isPending ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src={logoSrc}
                alt="Inside Pet Tech"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm font-sans leading-relaxed mb-3">
              The definitive source for pet industry professionals.
            </p>
            <p className="text-slate-500 text-xs font-sans uppercase tracking-widest">
              Covering the Companies, Technology, and Ideas Reshaping Pet Care
            </p>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 font-sans">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: cat.slug }}
                    className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                    data-ocid="footer.link"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 font-sans">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                  data-ocid="footer.link"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                  data-ocid="footer.link"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                  data-ocid="footer.link"
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 font-sans">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                  data-ocid="footer.link"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                  data-ocid="footer.link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="text-slate-400 hover:text-crimson-400 text-sm font-sans transition-colors"
                  data-ocid="footer.link"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <p className="text-slate-500 text-xs font-sans">
              © {new Date().getFullYear()} Inside Pet Tech. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/terms"
                className="text-slate-600 hover:text-slate-400 text-xs font-sans transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-slate-600 hover:text-slate-400 text-xs font-sans transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/disclaimer"
                className="text-slate-600 hover:text-slate-400 text-xs font-sans transition-colors"
              >
                Disclaimer
              </Link>
            </div>
          </div>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-400 text-xs font-sans transition-colors"
          >
            Built with{" "}
            <Heart className="h-3 w-3 text-crimson-500 fill-crimson-500" />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
