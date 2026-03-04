import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      'By accessing or using the Inside Pet Tech website (the "Site"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, please do not use the Site.',
      "These Terms apply to all visitors, readers, subscribers, and any other users of the Site. Inside Pet Tech reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Site following any such changes constitutes your acceptance of the revised Terms.",
      "The date of the most recent revision will be noted at the top of this page. We encourage you to review these Terms periodically.",
    ],
  },
  {
    id: "use-of-content",
    title: "Use of Content",
    content: [
      "The content published on Inside Pet Tech — including articles, analyses, interviews, graphics, photography, and multimedia — is provided for informational and editorial purposes only.",
      "You may access and read content on the Site for personal, non-commercial use. You may share links to our articles and content provided you give proper attribution to Inside Pet Tech with a link to the original source.",
      "You may not reproduce, copy, republish, upload, post, transmit, or distribute any material from this Site for commercial purposes without express prior written permission from Inside Pet Tech. Unauthorized use of our content may constitute an infringement of copyright and other applicable laws.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "All content, trademarks, service marks, trade names, logos, and icons on this Site are proprietary to Inside Pet Tech or its content suppliers and are protected by applicable intellectual property laws.",
      'The "Inside Pet Tech" name and logo are trademarks of Inside Pet Tech. Nothing on this Site should be construed as granting, by implication or otherwise, any license or right to use any trademark without the prior written permission of Inside Pet Tech.',
      "Third-party trademarks, product names, and company names mentioned on the Site are the property of their respective owners.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer of Warranties",
    content: [
      'The Site and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      "Inside Pet Tech does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components. We make no warranty regarding the accuracy, completeness, or reliability of any information on the Site.",
      "Inside Pet Tech expressly disclaims any and all liability for the accuracy and completeness of information presented on the Site, or for any decisions made based on such information.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Inside Pet Tech, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses.",
      "This limitation applies regardless of whether such damages arise from the use of, or inability to use, the Site or its content, any errors or omissions in any content, unauthorized access to or alteration of your transmissions or data, or any other matter.",
      "In jurisdictions where limitation of liability for consequential or incidental damages is not permitted, our liability shall be limited to the maximum extent permitted by law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: [
      "Inside Pet Tech reserves the right to revise these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes indicates your acceptance of the new Terms.",
      "If you have questions about these Terms, please contact us at legal@insidepettech.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="editorial-divider w-16 mb-6" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Terms of Use
            </h1>
            <p className="text-slate-300 font-sans text-lg leading-relaxed">
              Please read these Terms of Use carefully before using the Inside
              Pet Tech website. By accessing the Site, you agree to be bound by
              these terms.
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
                to="/privacy"
                className="inline-flex items-center gap-1.5 text-sm font-sans text-crimson-600 hover:text-crimson-700 font-medium transition-colors"
                data-ocid="terms.link"
              >
                Privacy Policy <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/disclaimer"
                className="inline-flex items-center gap-1.5 text-sm font-sans text-crimson-600 hover:text-crimson-700 font-medium transition-colors"
                data-ocid="terms.link"
              >
                Disclaimer <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
