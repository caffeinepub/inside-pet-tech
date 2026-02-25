import { Link } from '@tanstack/react-router';
import { ArrowRight, Target, Users, TrendingUp, Zap, Globe, Award } from 'lucide-react';

const editorialPillars = [
  {
    icon: Zap,
    title: 'Startups & Funding',
    description:
      'We track every funding round, acquisition, and emerging startup in the pet technology space — from seed to Series C and beyond.',
  },
  {
    icon: Globe,
    title: 'News & Views',
    description:
      'Breaking news and expert commentary on the developments shaping the future of pet care technology and the companies driving change.',
  },
  {
    icon: Users,
    title: 'Interviews',
    description:
      'In-depth conversations with founders, investors, veterinarians, and industry leaders who are building the future of pet tech.',
  },
  {
    icon: TrendingUp,
    title: 'Market Trends',
    description:
      'Data-driven analysis of market movements, consumer behavior shifts, and emerging opportunities across the global pet technology sector.',
  },
  {
    icon: Target,
    title: 'Product Reviews',
    description:
      'Hands-on evaluations of the latest pet technology products, from smart feeders and GPS trackers to telehealth platforms and diagnostic tools.',
  },
  {
    icon: Award,
    title: 'Industry Reports',
    description:
      'Comprehensive research reports and white papers covering the state of pet technology, investment trends, and market forecasts.',
  },
];

const audienceSegments = [
  {
    title: 'Pet Industry Professionals',
    description:
      'Veterinarians, pet retailers, groomers, and service providers looking to understand how technology is transforming their industry.',
  },
  {
    title: 'Investors & VCs',
    description:
      'Venture capitalists, angel investors, and family offices tracking deal flow and emerging opportunities in the pet technology sector.',
  },
  {
    title: 'Entrepreneurs & Founders',
    description:
      'Startup founders and product teams building the next generation of pet technology products and services.',
  },
  {
    title: 'Pet Enthusiasts',
    description:
      'Passionate pet owners who want to stay informed about the latest innovations improving the health, safety, and happiness of their animals.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-crimson-600 text-white text-xs font-semibold uppercase tracking-wider rounded mb-6">
            About Us
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            The Voice of the Pet Technology Industry
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed">
            Inside Pet Tech is the leading publication covering the intersection of technology and
            animal care — tracking the startups, innovations, and ideas reshaping how we care for
            our pets.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The global pet industry has crossed $150 billion and is growing rapidly, driven by
                an explosion of technology innovation. From AI-powered diagnostics to smart home
                devices for pets, the sector is attracting billions in venture capital and producing
                category-defining companies.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Inside Pet Tech exists to be the definitive source of news, analysis, and insight
                for everyone who cares about this space — whether you're building a company,
                investing in one, or simply passionate about the future of pet care.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We believe that better technology leads to better outcomes for pets and the people
                who love them. Our editorial mission is to accelerate that future by keeping our
                readers informed, inspired, and connected.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { stat: '$150B+', label: 'Global Pet Industry' },
                { stat: '67%', label: 'US Households with Pets' },
                { stat: '$5B+', label: 'Annual Pet Tech Investment' },
                { stat: '2,000+', label: 'Pet Tech Startups Globally' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100"
                >
                  <div className="font-display text-3xl font-bold text-crimson-600 mb-2">
                    {item.stat}
                  </div>
                  <div className="text-slate-600 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Pillars */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              What We Cover
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our editorial coverage spans the full spectrum of pet technology — from early-stage
              startups to public companies, from product launches to policy debates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorialPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-editorial transition-shadow"
              >
                <div className="p-2.5 bg-crimson-50 rounded-lg w-fit mb-4">
                  <pillar.icon className="h-5 w-5 text-crimson-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">Who We Serve</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Inside Pet Tech serves a diverse community of professionals, investors, and
              enthusiasts united by their interest in the future of pet care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audienceSegments.map((segment) => (
              <div
                key={segment.title}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100"
              >
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {segment.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{segment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-slate-300 mb-8">
            Get the latest pet tech news, funding announcements, and industry analysis delivered
            directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson-600 hover:bg-crimson-700 text-white font-medium rounded transition-colors"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded transition-colors"
            >
              Read Latest News
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
