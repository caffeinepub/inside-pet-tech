import { Briefcase, CheckCircle, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Simulate submission
    await new Promise((res) => setTimeout(res, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm(initialForm);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 rounded-sm border font-sans text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-crimson-500 transition ${
      errors[field] ? "border-red-400" : "border-slate-300"
    }`;

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="editorial-divider w-16 mb-6" />
            <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-slate-300 font-sans text-lg leading-relaxed">
              We'd love to hear from you. Whether you have a story tip, a
              partnership inquiry, or just want to say hello — reach out and
              we'll get back to you promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <div className="editorial-divider w-16 mb-4" />
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-4">
                Contact Information
              </h2>
              <p className="text-slate-600 font-sans text-sm leading-relaxed">
                Inside Pet Tech is an independent editorial publication covering
                the pet technology industry. We welcome story tips, press
                releases, and partnership inquiries.
              </p>
            </div>

            {/* Editorial */}
            <div className="flex gap-4 p-5 bg-slate-50 rounded-sm border border-slate-200">
              <div className="shrink-0 p-2 bg-crimson-50 rounded-sm h-fit">
                <Mail className="h-5 w-5 text-crimson-600" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                  Editorial
                </h3>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  Story tips, press releases, and editorial inquiries.
                </p>
                <a
                  href="mailto:editorial@insidepettech.com"
                  className="text-crimson-600 hover:text-crimson-700 font-sans text-sm font-medium mt-1 inline-block transition-colors"
                >
                  editorial@insidepettech.com
                </a>
              </div>
            </div>

            {/* Advertising */}
            <div className="flex gap-4 p-5 bg-slate-50 rounded-sm border border-slate-200">
              <div className="shrink-0 p-2 bg-crimson-50 rounded-sm h-fit">
                <Briefcase className="h-5 w-5 text-crimson-600" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                  Advertising & Partnerships
                </h3>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  Reach thousands of pet industry professionals. Explore
                  advertising opportunities and sponsored content partnerships.
                </p>
                <a
                  href="mailto:advertising@insidepettech.com"
                  className="text-crimson-600 hover:text-crimson-700 font-sans text-sm font-medium mt-1 inline-block transition-colors"
                >
                  advertising@insidepettech.com
                </a>
              </div>
            </div>

            {/* General */}
            <div className="flex gap-4 p-5 bg-slate-50 rounded-sm border border-slate-200">
              <div className="shrink-0 p-2 bg-crimson-50 rounded-sm h-fit">
                <MessageSquare className="h-5 w-5 text-crimson-600" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 mb-1">
                  General Inquiries
                </h3>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  All other questions and feedback.
                </p>
                <a
                  href="mailto:hello@insidepettech.com"
                  className="text-crimson-600 hover:text-crimson-700 font-sans text-sm font-medium mt-1 inline-block transition-colors"
                >
                  hello@insidepettech.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="editorial-divider w-16 mb-4" />
            <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="h-14 w-14 text-crimson-600 mb-4" />
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-slate-600 font-sans text-base max-w-sm">
                  Thank you for reaching out. We'll get back to you as soon as
                  possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded-sm transition-colors font-sans text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 font-sans mb-1.5"
                    >
                      Name <span className="text-crimson-600">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 font-sans">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 font-sans mb-1.5"
                    >
                      Email <span className="text-crimson-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 font-sans">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 font-sans mb-1.5"
                  >
                    Subject <span className="text-crimson-600">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={inputClass("subject")}
                  >
                    <option value="">Select a subject…</option>
                    <option value="Story Tip">Story Tip</option>
                    <option value="Press Release">Press Release</option>
                    <option value="Advertising Inquiry">
                      Advertising Inquiry
                    </option>
                    <option value="Partnership">Partnership</option>
                    <option value="General Feedback">General Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500 font-sans">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 font-sans mb-1.5"
                  >
                    Message <span className="text-crimson-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what's on your mind…"
                    className={inputClass("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-sans">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3 bg-crimson-600 hover:bg-crimson-700 text-white font-semibold rounded-sm transition-colors font-sans text-sm disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
