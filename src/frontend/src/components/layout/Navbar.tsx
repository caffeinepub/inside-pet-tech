import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
const logoSrc = new URL("/assets/uploads/1000034567-1-1.jpg", import.meta.url)
  .href;

const categories = [
  { label: "Startups & Funding", slug: "startups-and-funding" },
  { label: "News & Views", slug: "news-and-views" },
  { label: "Interviews", slug: "interviews" },
  { label: "Market Trends", slug: "market-trends" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-editorial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoSrc}
              alt="Inside Pet Tech"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-crimson-400 transition-colors duration-150 whitespace-nowrap font-sans tracking-wide"
                activeProps={{ className: "text-crimson-400" }}
              >
                {cat.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-slate-700 mx-2" />
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-crimson-400 transition-colors duration-150 font-sans tracking-wide"
              activeProps={{ className: "text-crimson-400" }}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-crimson-400 transition-colors duration-150 font-sans tracking-wide"
              activeProps={{ className: "text-crimson-400" }}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-crimson-400 transition-colors font-sans"
              onClick={() => setMobileOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
          <div className="border-t border-slate-800 my-2" />
          <Link
            to="/about"
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-crimson-400 transition-colors font-sans"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-crimson-400 transition-colors font-sans"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
