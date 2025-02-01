'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PricingCard } from './pricing-card';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const pricingTiers = [
  {
    name: 'Basic',
    price: 9.99,
    interval: 'month' as const,
    description: 'Perfect for listeners who want to support their favorite DJs',
    features: [
      { text: 'Ad-free listening', included: true },
      { text: 'High-quality audio', included: true },
      { text: 'Offline mode', included: false },
      { text: 'Exclusive content', included: false },
    ],
    priceId: 'price_basic_monthly',
  },
  {
    name: 'Pro',
    price: 19.99,
    interval: 'month' as const,
    description: 'For DJs who want to share their music with the world',
    features: [
      { text: 'All Basic features', included: true },
      { text: 'Unlimited uploads', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom profile', included: true },
    ],
    highlighted: true,
    priceId: 'price_pro_monthly',
  },
  {
    name: 'Business',
    price: 49.99,
    interval: 'month' as const,
    description: 'For venues and event organizers',
    features: [
      { text: 'All Pro features', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
      { text: 'Custom branding', included: true },
    ],
    priceId: 'price_business_monthly',
  },
];

export function SubscriptionForm() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectTier = async (priceId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedTier(priceId);

      const response = await fetch('/api/subscriptions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
      setSelectedTier(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="mt-2 text-gray-500">
          Select the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <PricingCard
            key={tier.priceId}
            tier={tier}
            onSelectTier={handleSelectTier}
            isLoading={isLoading && selectedTier === tier.priceId}
          />
        ))}
      </div>

      {error && (
        <div className="mx-auto max-w-md rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="mx-auto max-w-md text-center text-sm text-gray-500">
        <p>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          You can cancel your subscription at any time.
        </p>
      </div>
    </div>
  );
} 