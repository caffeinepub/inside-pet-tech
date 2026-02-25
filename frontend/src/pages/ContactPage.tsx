import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.subject.trim()) errors.subject = 'Subject is required.';
  if (!form.message.trim()) errors.message = 'Message is required.';
  return errors;
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Editorial',
    value: 'editorial@insidepettech.com',
    href: 'mailto:editorial@insidepettech.com',
  },
  {
    icon: Mail,
    label: 'Press & Partnerships',
    value: 'partnerships@insidepettech.com',
    href: 'mailto:partnerships@insidepettech.com',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 2 business days',
    href: null,
  },
  {
    icon: MapPin,
    label: 'Coverage',
    value: 'Global pet technology industry',
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Client-side only — no backend persistence for contact form
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-foreground text-background py-20 px-4 relative overflow-hidden">
        <div className="brand-gradient absolute inset-0 opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-6 leading-tight">
            Contact Inside Pet Tech
          </h1>
          <p className="text-lg text-background/70 max-w-2xl mx-auto leading-relaxed">
            Whether you have a story tip, partnership inquiry, or want to learn more about our coverage — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left panel — contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Publication Contact</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Reach the right team directly. We cover the global pet technology industry and welcome story tips, press releases, and collaboration proposals.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card shadow-sm"
                >
                  <div className="mt-0.5 p-2 rounded-md bg-brand-crimson/10">
                    <Icon size={15} className="text-brand-crimson" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-foreground hover:text-brand-crimson transition-colors font-medium">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Advertising opportunities callout */}
            <div className="p-5 rounded-lg border border-brand-crimson/20 bg-brand-crimson/5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-md bg-brand-crimson/10 shrink-0">
                  <Megaphone size={15} className="text-brand-crimson" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Advertising Opportunities</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We offer a variety of advertising and sponsorship opportunities to help your brand reach founders, investors, executives, and operators across the pet technology industry — from sponsored content and newsletter placements to category sponsorships and display advertising.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    Get in touch at{' '}
                    <a
                      href="mailto:advertising@insidepettech.com"
                      className="text-brand-crimson hover:underline font-medium"
                    >
                      advertising@insidepettech.com
                    </a>{' '}
                    to discuss how we can work together.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — contact form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Message Sent</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm">
                  Thank you for reaching out. We'll review your message and get back to you within 2 business days.
                </p>
                <Button
                  variant="outline"
                  className="mt-8"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 bg-card border border-border rounded-xl p-8 shadow-sm">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-1">Send a Message</h2>
                  <p className="text-sm text-muted-foreground">Fill in the form below and we'll be in touch shortly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name <span className="text-brand-crimson">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address <span className="text-brand-crimson">*</span></Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject <span className="text-brand-crimson">*</span></Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Story tip, partnership, advertising enquiry…"
                    className={errors.subject ? 'border-destructive' : ''}
                  />
                  {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message <span className="text-brand-crimson">*</span></Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more…"
                    rows={6}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full brand-gradient text-white border-0 hover:opacity-90 transition-opacity">
                  <Send size={15} className="mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
