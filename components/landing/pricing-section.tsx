"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Basic DJ profile",
        "Event listings",
        "Music library management",
        "Community access"
      ]
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Best for professional DJs",
      features: [
        "Everything in Basic",
        "Priority event listings",
        "Advanced analytics",
        "Custom branding",
        "24/7 priority support",
        "Equipment management"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "$99",
      period: "per month",
      description: "For agencies and teams",
      features: [
        "Everything in Pro",
        "Multiple DJ profiles",
        "Team collaboration",
        "API access",
        "Dedicated account manager",
        "Custom integrations"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative overflow-hidden border-t">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-foreground">
          Pricing Plans
        </h2>
        <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
          Choose the perfect plan for your needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-muted-foreground">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-card hover:bg-accent"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 