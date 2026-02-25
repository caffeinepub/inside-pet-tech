import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Target, Users, Zap, Globe } from 'lucide-react';

const AUDIENCE = [
  { icon: Zap, label: 'Founders & Entrepreneurs', desc: 'Building the next generation of pet technology companies.' },
  { icon: Target, label: 'Executives & Operators', desc: 'Leading organizations at the intersection of pets and technology.' },
  { icon: Users, label: 'Veterinarians & Clinicians', desc: 'Adopting and evaluating new tools for animal healthcare.' },
  { icon: Globe, label: 'Investors & Analysts', desc: 'Tracking capital flows and market opportunities in pet tech.' },
];

const PILLARS = [
  { title: 'Startups & Funding', desc: 'We track every meaningful raise, acquisition, and exit in the pet tech ecosystem.' },
  { title: 'AI & Data', desc: 'From diagnostic algorithms to predictive health models, we cover the intelligence layer.' },
  { title: 'Veterinary Technology', desc: 'Clinical tools, telemedicine platforms, and practice management software.' },
  { title: 'Connected Devices', desc: 'Smart collars, GPS trackers, automated feeders, and the IoT of pet care.' },
  { title: 'Market Trends', desc: 'Data-driven analysis of where the industry is heading and why it matters.' },
  { title: 'Interviews', desc: 'In-depth conversations with the people shaping the future of pet care.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground text-background py-24 px-4">
        <div className="brand-gradient absolute inset-0 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
            About Inside Pet Tech
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-background leading-tight mb-6">
            The Definitive Editorial Home for the Pet Technology Industry
          </h1>
          <p className="text-lg text-background/70 leading-relaxed max-w-2xl mx-auto">
            Inside Pet Tech exists to close the coverage gap in one of the fastest-evolving technology ecosystems in consumer and healthcare innovation.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-crimson mb-3">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
                Serious Journalism for a Serious Industry
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The global pet care market is approaching $300 billion. Venture capital is pouring into pet health, nutrition, diagnostics, and connected devices at an unprecedented pace. Yet dedicated, high-quality editorial coverage of this sector has remained scarce.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Inside Pet Tech was founded to change that. We bring the same editorial rigor applied to fintech, healthtech, and enterprise software to the companies, technologies, and ideas reshaping how humans care for animals.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"
                  alt="Pet technology innovation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 brand-gradient rounded-xl opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Pillars */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-crimson mb-3">
              What We Cover
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
              Six Editorial Pillars
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-background rounded-xl p-6 border border-border shadow-editorial hover:shadow-editorial-lg transition-shadow"
              >
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-crimson mb-3">
              Who We Serve
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built for Industry Professionals
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our readers are the people building, funding, and operating the pet technology industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {AUDIENCE.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex gap-4 items-start p-6 rounded-xl border border-border bg-background hover:border-brand-crimson/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg brand-gradient flex items-center justify-center">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-background mb-4">
            Stay Ahead of the Industry
          </h2>
          <p className="text-background/70 mb-8 leading-relaxed">
            Explore our latest coverage across startups, AI, veterinary technology, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 brand-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Read Latest Articles
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-background/30 text-background font-semibold rounded-lg hover:bg-background/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
