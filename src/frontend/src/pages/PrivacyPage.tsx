import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    id: "information-collected",
    title: "Information We Collect",
    content: [
      "Inside Pet Tech collects information you provide directly to us, such as when you subscribe to our newsletter, submit a contact form, or otherwise communicate with us. This may include your name, email address, and any other information you choose to provide.",
      "We also automatically collect certain information about your device and how you interact with our Site, including your IP address, browser type, operating system, referring URLs, pages visited, and time spent on the Site. This information is collected through cookies and similar tracking technologies.",
      "We do not collect sensitive personal information such as financial data, government identification numbers, or health records.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: [
      "We use the information we collect to operate and improve the Site, send newsletters and editorial content you have requested, respond to your inquiries and comments, and analyze how users interact with our content.",
      "We may also use your information to send you information about advertising opportunities, sponsored content, and other offerings we believe may be of interest to you, based on your interaction with the Site. You may opt out of such communications at any time.",
      "We do not sell, trade, or rent your personal information to third parties for their marketing purposes.",
    ],
  },
  {
    id: "newsletter",
    title: "Newsletter Subscriptions",
    content: [
      "When you subscribe to the Inside Pet Tech newsletter, we collect your email address to send you our editorial updates. Each newsletter includes an unsubscribe link, and you may opt out at any time.",
      "We use your email address solely to send editorial content, industry news, and occasional announcements. We will not share your subscription email with advertisers or third parties without your consent.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    content: [
      "Inside Pet Tech uses cookies — small data files stored on your device — to improve your browsing experience, understand how you use the Site, and deliver relevant content.",
      "We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period). You can control cookie settings through your browser preferences; however, disabling cookies may affect certain Site functionality.",
      "We may also use web analytics services such as page view tracking to help us understand usage patterns. These services may use cookies and similar technologies to collect information about your use of the Site.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    content: [
      "The Site may contain links to third-party websites, including news sources, company sites, and research publications referenced in our editorial content. These sites have their own privacy policies, and we are not responsible for their content or practices.",
      "We encourage you to review the privacy policies of any third-party site you visit. The inclusion of a link to a third-party site does not imply our endorsement of that site or its privacy practices.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage method is 100% secure, and we cannot guarantee absolute security.",
      "If you have reason to believe that your interaction with us is no longer secure, please notify us immediately at privacy@insidepettech.com.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@insidepettech.com.",
      "We will respond to your inquiry within a reasonable time. This Privacy Policy was last updated in March 2026.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="editorial-divider w-16 mb-6" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-slate-300 font-sans text-lg leading-relaxed">
              Inside Pet Tech is committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your
              information when you visit our Site.
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
                data-ocid="privacy.link"
              >
                Terms of Use <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/disclaimer"
                className="inline-flex items-center gap-1.5 text-sm font-sans text-crimson-600 hover:text-crimson-700 font-medium transition-colors"
                data-ocid="privacy.link"
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
