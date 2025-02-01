'use client';

import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  priceId: string;
}

interface PricingCardProps {
  tier: PricingTier;
  onSelectTier: (priceId: string) => void;
  isLoading?: boolean;
}

export function PricingCard({ tier, onSelectTier, isLoading }: PricingCardProps) {
  return (
    <Card className={`relative flex flex-col ${
      tier.highlighted ? 'border-red-500 shadow-lg' : ''
    }`}>
      {tier.highlighted && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-red-500 px-4 py-1 text-sm font-medium text-white">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">${tier.price}</span>
          <span className="text-gray-500">/{tier.interval}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{tier.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Check className={`h-5 w-5 ${
                feature.included ? 'text-green-500' : 'text-gray-300'
              }`} />
              <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onSelectTier(tier.priceId)}
          className="w-full"
          variant={tier.highlighted ? 'default' : 'outline'}
          isLoading={isLoading}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
} 