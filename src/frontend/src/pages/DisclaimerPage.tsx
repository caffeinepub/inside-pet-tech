import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    id: "editorial-independence",
    title: "Editorial Independence",
    content: [
      "Inside Pet Tech maintains full editorial independence. Our editorial decisions — what we cover, how we cover it, and the conclusions we draw — are made solely by our editorial team and are not influenced by advertisers, sponsors, or commercial partners.",
      "When commercial relationships exist, such as sponsored content or advertising, they are clearly identified as such and are kept separate from our independent editorial coverage. Sponsored content does not reflect the views of Inside Pet Tech's editorial team.",
      "We are committed to fair, accurate, and impartial journalism. We welcome corrections and clarifications. If you believe we have made an error, please contact us at editorial@insidepettech.com.",
    ],
  },
  {
    id: "accuracy",
    title: "Accuracy of Information",
    content: [
      "Inside Pet Tech strives to provide accurate and up-to-date information. However, the pet technology industry is a rapidly evolving space, and information that was accurate at the time of publication may become outdated.",
      "We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the Site.",
      "Readers should independently verify information before making decisions based on it, particularly regarding investment decisions, company valuations, funding rounds, and scientific or clinical claims.",
    ],
  },
  {
    id: "financial-disclaimer",
    title: "Investment & Financial Disclaimer",
    content: [
      "Nothing published on Inside Pet Tech constitutes financial, investment, or legal advice. Coverage of funding rounds, valuations, market trends, and company performance is provided for informational and editorial purposes only.",
      "The mention or coverage of a company, product, or investment opportunity on Inside Pet Tech should not be construed as an endorsement, recommendation to invest, or guarantee of future performance.",
      "Any investment in the companies or sectors we cover involves risk, including the potential loss of principal. Readers should consult qualified financial advisors before making any investment decisions.",
    ],
  },
  {
    id: "no-professional-advice",
    title: "No Professional Advice",
    content: [
      "Content on Inside Pet Tech — including coverage of veterinary technology, animal health products, diagnostic tools, and treatment innovations — is provided for general informational purposes only and does not constitute veterinary, medical, or professional advice.",
      "Veterinary and animal health decisions should be made in consultation with qualified veterinary professionals who have examined your specific animal and are familiar with its health history.",
      "Inside Pet Tech makes no claims regarding the safety, efficacy, or regulatory status of any product, therapy, or technology discussed on the Site. Always consult appropriate professionals before acting on any information you obtain from us.",
    ],
  },
  {
    id: "external-links",
    title: "External Links",
    content: [
      "The Site contains links to external websites, research papers, press releases, and other third-party resources. These links are provided for convenience and informational purposes only.",
      "Inside Pet Tech has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them. The inclusion of any external link does not imply endorsement by Inside Pet Tech of the linked site or its content.",
      "We recommend that you review the terms of use and privacy policies of any external sites you visit through links on Inside Pet Tech.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="editorial-divider w-16 mb-6" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Disclaimer
            </h1>
            <p className="text-slate-300 font-sans text-lg leading-relaxed">
              Important disclosures about the nature of Inside Pet Tech's
              editorial coverage, the independence of our journalism, and the
              limitations of the information we provide.
            </p>
            <p className="text-slate-500 font-sans text-sm mt-4">
              Last updated: March 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 font-sans mb-4">
                On This Page
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm font-sans text-slate-500 hover:text-crimson-600 transition-colors py-0.5"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id}>
                {index > 0 && (
                  <div className="border-t border-slate-200 mb-12" />
                )}
                <div className="editorial-divider w-12 mb-4" />
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-5">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-slate-600 font-sans text-base leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Links Footer */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-slate-700 font-sans text-sm font-semibold mb-1">
                Other Legal Documents
              </p>
              <p className="text-slate-500 font-sans text-xs">
                Review our other policies that govern your use of Inside Pet
                Tech.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/terms"
                className="inline-flex items-center gap-1.5 text-sm font-sans text-crimson-600 hover:text-crimson-700 font-medium transition-colors"
                data-ocid="disclaimer.link"
              >
                Terms of Use <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/privacy"
                className="inline-flex items-center gap-1.5 text-sm font-sans text-crimson-600 hover:text-crimson-700 font-medium transition-colors"
                data-ocid="disclaimer.link"
              >
                Privacy Policy <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
