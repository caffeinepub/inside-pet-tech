import { useState } from 'react';
import { Mail, MessageSquare, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-crimson-600 text-white text-xs font-semibold uppercase tracking-wider rounded mb-6">
            Contact
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-300 text-lg">
            Have a story tip, editorial inquiry, or advertising opportunity? We'd love to hear from
            you.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <div className="p-2.5 bg-crimson-50 rounded-lg w-fit mb-4">
                <Mail className="h-5 w-5 text-crimson-600" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                Editorial Inquiries
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Have a story tip, press release, or editorial question? Reach out to our editorial
                team.
              </p>
              <a
                href="mailto:editorial@insidepettech.com"
                className="text-crimson-600 hover:text-crimson-700 text-sm font-medium"
              >
                editorial@insidepettech.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <div className="p-2.5 bg-crimson-50 rounded-lg w-fit mb-4">
                <MessageSquare className="h-5 w-5 text-crimson-600" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                Advertising Opportunities
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                Reach thousands of pet industry professionals, investors, and enthusiasts. We offer
                display advertising, sponsored content, newsletter placements, and custom
                partnerships.
              </p>
              <a
                href="mailto:advertising@insidepettech.com"
                className="text-crimson-600 hover:text-crimson-700 text-sm font-medium"
              >
                advertising@insidepettech.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-xl p-12 border border-slate-100 shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">
                  Message Sent!
                </h2>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-medium rounded transition-colors text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Name <span className="text-crimson-600">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 text-sm"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        Email <span className="text-crimson-600">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 text-sm"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Subject <span className="text-crimson-600">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 text-sm bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="editorial">Editorial Inquiry</option>
                      <option value="story-tip">Story Tip</option>
                      <option value="advertising">Advertising Opportunity</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-1.5"
                    >
                      Message <span className="text-crimson-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-crimson-500 focus:ring-1 focus:ring-crimson-500 text-sm resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full px-6 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:opacity-60 text-white font-medium rounded-lg transition-colors text-sm"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
