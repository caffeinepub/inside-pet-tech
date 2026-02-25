import React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { Category } from '../../backend';
import { CATEGORY_LABELS, CATEGORY_SLUGS } from '../../lib/utils';

const FOOTER_CATEGORIES = [
  Category.startupsAndFunding,
  Category.aiAndData,
  Category.veterinaryTech,
  Category.connectedDevices,
  Category.marketTrends,
  Category.interviews,
  Category.videos,
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'inside-pet-tech');

  return (
    <footer className="bg-foreground text-background/80 mt-16">
      {/* Brand bar */}
      <div className="brand-gradient h-1 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/assets/generated/inside-pet-tech-logo.dim_400x480.png"
                alt="Inside Pet Tech"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs">
              Covering the Companies, Technology, and Ideas Reshaping Pet Care.
            </p>
            <p className="text-xs text-background/40 mt-4">
              The definitive editorial home for the pet technology industry.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/40 mb-4">Topics</h4>
            <ul className="space-y-2">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: CATEGORY_SLUGS[cat] }}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-background/40 mb-4">About</h4>
            <p className="text-sm text-background/60 leading-relaxed">
              Inside Pet Tech exists to close the coverage gap in one of the fastest-evolving technology ecosystems in consumer and healthcare innovation.
            </p>
            <p className="text-sm text-background/60 mt-3 leading-relaxed">
              We serve founders, executives, veterinarians, investors, and operators navigating this rapidly emerging sector.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © {year} Inside Pet Tech. All rights reserved.
          </p>
          <p className="text-xs text-background/40 flex items-center gap-1">
            Built with{' '}
            <Heart size={11} className="text-brand-crimson-light fill-current" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
