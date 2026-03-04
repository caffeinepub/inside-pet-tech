import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Globe,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const editorialPillars = [
  {
    icon: TrendingUp,
    title: "Startups & Funding",
    description:
      "We track every meaningful funding round, acquisition, and startup launch in the pet technology space — from seed rounds to Series C and beyond.",
  },
  {
    icon: Globe,
    title: "News & Views",
    description:
      "Timely reporting on the events, regulatory shifts, and market movements that matter most to pet industry professionals.",
  },
  {
    icon: Users,
    title: "Interviews",
    description:
      "In-depth conversations with the founders, executives, and innovators who are building the future of pet care.",
  },
  {
    icon: Zap,
    title: "Market Trends",
    description:
      "Data-driven analysis of consumer behavior, technology adoption, and emerging opportunities across the global pet market.",
  },
  {
    icon: BookOpen,
    title: "Feature Stories",
    description:
      "Long-form journalism that goes beyond the headlines to explore the forces reshaping how we care for our animals.",
  },
  {
    icon: Target,
    title: "Expert Perspectives",
    description:
      "Commentary and analysis from veterinarians, investors, and industry operators who bring deep domain expertise to every story.",
  },
];

const audienceSegments = [
  {
    title: "Founders & Entrepreneurs",
    description:
      "Building the next generation of pet technology companies and looking for market intelligence, funding news, and competitive insights.",
  },
  {
    title: "Executives & Operators",
    description:
      "Leading established pet industry businesses who need to stay ahead of technological disruption and emerging competitors.",
  },
  {
    title: "Veterinarians & Clinicians",
    description:
      "Healthcare professionals seeking to understand how new technologies are transforming diagnostics, treatment, and practice management.",
  },
  {
    title: "Investors & Analysts",
    description:
      "VCs, angels, and institutional investors tracking deal flow, valuations, and the most promising opportunities in pet tech.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="editorial-divider w-16 mb-6" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
              About Inside Pet Tech
            </h1>
            <p className="text-slate-300 font-sans text-lg leading-relaxed">
              Inside Pet Tech is the definitive editorial source for
              professionals at the intersection of technology and the pet
              industry. We cover the companies, innovations, and ideas reshaping
              how the world cares for its animals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="editorial-divider w-16 mb-4" />
              <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <p className="text-slate-600 font-sans text-base leading-relaxed mb-4">
                The pet industry is undergoing a profound transformation.
                Advances in biotechnology, connected devices, artificial
                intelligence, and veterinary science are creating entirely new
                categories of products and services — and attracting billions in
                investment capital.
              </p>
              <p className="text-slate-600 font-sans text-base leading-relaxed mb-4">
                Inside Pet Tech exists to make sense of this transformation. We
                provide the reporting, analysis, and context that industry
                professionals need to make informed decisions — whether they're
                building companies, allocating capital, or delivering care.
              </p>
              <p className="text-slate-600 font-sans text-base leading-relaxed">
                Our editorial standards are rigorous. We verify facts, seek
                multiple perspectives, and hold ourselves to the same standards
                as the best business journalism anywhere.
              </p>
            </div>
            <div className="bg-slate-50 rounded-sm p-8 border border-slate-200">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-crimson-600 mb-1">
                    $350B+
                  </div>
                  <div className="text-slate-600 font-sans text-sm">
                    Global pet industry market size
                  </div>
                </div>
                <div className="border-t border-slate-200" />
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-crimson-600 mb-1">
                    $5B+
                  </div>
                  <div className="text-slate-600 font-sans text-sm">
                    Annual pet tech investment
                  </div>
                </div>
                <div className="border-t border-slate-200" />
                <div className="text-center">
                  <div className="font-display text-5xl font-bold text-crimson-600 mb-1">
                    70%
                  </div>
                  <div className="text-slate-600 font-sans text-sm">
                    Of US households own a pet
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Pillars */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="text-center mb-12">
            <div className="editorial-divider w-16 mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              What We Cover
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-2xl mx-auto">
              Our editorial coverage spans every dimension of the pet technology
              ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorialPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-sm p-6 border border-slate-200 shadow-editorial hover:shadow-editorial-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-sm bg-crimson-50">
                      <Icon className="h-5 w-5 text-crimson-600" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mb-12">
            <div className="editorial-divider w-16 mb-4" />
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-slate-600 font-sans text-base max-w-2xl">
              Inside Pet Tech is written for the professionals shaping the
              future of the pet industry.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {audienceSegments.map((segment) => (
              <div
                key={segment.title}
                className="flex gap-4 p-6 bg-slate-50 rounded-sm border border-slate-200"
              >
                <div className="shrink-0 w-1 rounded-full bg-crimson-600 self-stretch" />
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {segment.title}
                  </h3>
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">
                    {segment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">
            Stay Ahead of the Industry
          </h2>
          <p className="text-slate-300 font-sans text-base mb-8 max-w-xl mx-auto">
            Join thousands of pet industry professionals who rely on Inside Pet
            Tech for the news and analysis that matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded-sm transition-colors font-sans"
            >
              Read the Latest
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold rounded-sm transition-colors font-sans"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
