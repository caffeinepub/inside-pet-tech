import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSubscribeToNewsletter } from '../../hooks/useQueries';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { mutate: subscribe, isPending } = useSubscribeToNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    subscribe(email, {
      onSuccess: () => {
        toast.success('You\'re subscribed!', {
          description: 'Welcome to Inside Pet Tech. You\'ll receive our latest coverage in your inbox.',
        });
        setEmail('');
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        if (message.toLowerCase().includes('already')) {
          toast.info('Already subscribed', {
            description: 'This email is already on our list. Thank you!',
          });
        } else {
          toast.error('Subscription failed', {
            description: 'Something went wrong. Please try again.',
          });
        }
      },
    });
  };

  return (
    <div className="brand-gradient py-14 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-5">
          <Mail size={22} className="text-white" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
          Stay Ahead of Pet Tech
        </h2>
        <p className="text-white/80 text-sm sm:text-base mb-8 leading-relaxed">
          Get the latest news on startups, AI, veterinary technology, and market trends delivered to your inbox. No spam, ever.
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
              placeholder="Enter your email address"
              disabled={isPending}
              className="w-full px-4 py-3 rounded-lg bg-white/15 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent disabled:opacity-60 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-brand-crimson font-semibold rounded-lg hover:bg-white/90 transition-colors disabled:opacity-60 text-sm whitespace-nowrap"
          >
            {isPending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ArrowRight size={15} />
            )}
            {isPending ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>

        {emailError && (
          <p className="mt-2 text-white/90 text-xs">{emailError}</p>
        )}

        <p className="mt-4 text-white/50 text-xs">
          Join thousands of pet tech professionals. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
