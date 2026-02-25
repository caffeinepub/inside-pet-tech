import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { useSubscribeToNewsletter } from '@/hooks/useQueries';
import { Heart } from 'lucide-react';

const categories = [
  { label: 'Startups & Funding', slug: 'startups-and-funding' },
  { label: 'News & Views', slug: 'news-and-views' },
  { label: 'Interviews', slug: 'interviews' },
  { label: 'Market Trends', slug: 'market-trends' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const subscribeMutation = useSubscribeToNewsletter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      await subscribeMutation.mutateAsync(email.trim());
      toast.success('You\'re subscribed! Welcome to Inside Pet Tech.');
      setEmail('');
    } catch (err: any) {
      toast.error(err?.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-slate-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-crimson-900/40 to-indigo-900/40 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Stay Ahead of Pet Tech
            </h2>
            <p className="text-slate-400 mb-6">
              Get the latest news, funding rounds, and industry insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 text-sm"
                required
              />
              <button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="px-6 py-2.5 bg-crimson-600 hover:bg-crimson-700 disabled:opacity-60 text-white font-medium rounded transition-colors text-sm whitespace-nowrap"
              >
                {subscribeMutation.isPending ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/assets/generated/inside-pet-tech-logo.dim_400x480.png"
                alt="Inside Pet Tech"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              Covering the Companies, Technology, and Ideas Reshaping Pet Care
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              Inside Pet Tech is the leading publication for pet industry professionals, investors, and enthusiasts tracking the intersection of technology and animal care.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: cat.slug }}
                    className="text-slate-400 hover:text-crimson-400 text-sm transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-crimson-400 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-crimson-400 text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-crimson-400 text-sm transition-colors">
                  Advertise
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Inside Pet Tech. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'inside-pet-tech')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs transition-colors"
          >
            Built with <Heart className="h-3 w-3 text-crimson-500 fill-crimson-500" /> using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
