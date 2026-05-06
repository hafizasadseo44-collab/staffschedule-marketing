"use client";

import * as React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

// --- 1. Typescript Interfaces (API) ---

export interface Feature {
  name: string;
  isIncluded: boolean;
  value?: string;
}

export interface PriceTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  isPopular: boolean;
  buttonLabel: string;
  features: Feature[];
  priceId?: string; // Stripe Price ID
}

interface PricingComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  plans: [PriceTier, PriceTier, PriceTier, PriceTier];
  onPlanSelect: (planId: string) => void;
  isLoading?: boolean;
}

// --- 2. Utility Components ---

const FeatureItem: React.FC<{ feature: Feature }> = ({ feature }) => {
  const Icon = feature.isIncluded ? Check : X;
  const iconColor = feature.isIncluded ? "text-[#6C5CE7]" : "text-slate-200";

  return (
    <li className="flex items-start space-x-3 py-2">
      <Icon className={cn("h-3.5 w-3.5 flex-shrink-0 mt-0.5", iconColor)} aria-hidden="true" />
      <span className={cn("text-[13px] font-semibold leading-snug", feature.isIncluded ? "text-slate-600" : "text-slate-300")}>
        {feature.value ? (
          <>
            <span className="text-slate-900 font-black mr-1">{feature.value}</span>
            {feature.name}
          </>
        ) : feature.name}
      </span>
    </li>
  );
};

// --- 3. Main Component: PricingComponent ---

export const PricingComponent: React.FC<PricingComponentProps> = ({
  plans,
  onPlanSelect,
  isLoading,
  className,
  ...props
}) => {
  if (plans.length !== 4) {
    console.error("PricingComponent requires exactly 4 pricing tiers.");
    return null;
  }

  // Extract all unique feature names across all plans for the comparison table header
  const allFeaturesSet = new Set<string>();
  plans.forEach(p => p.features.forEach(f => allFeaturesSet.add(f.name)));
  const allFeatures = Array.from(allFeaturesSet);
  
  const PricingCards = (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
      {plans.map((plan) => {
        const isFeatured = plan.isPopular;
        const currentPrice = plan.priceMonthly;
        const priceSuffix = '/mo';

        return (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col transition-all duration-500 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(108,92,231,0.15)] border-slate-100 bg-white relative overflow-hidden group",
              isFeatured && "ring-2 ring-[#6C5CE7] border-transparent shadow-[0_30px_60px_-15px_rgba(108,92,231,0.25)]"
            )}
          >
            {isFeatured && (
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]" />
            )}
            <CardHeader className="p-6 pb-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">{plan.name}</CardTitle>
                {isFeatured && (
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-[#6C5CE7] text-white rounded-lg shadow-sm">
                    Most Popular
                  </span>
                )}
              </div>
              <CardDescription className="text-xs font-bold text-slate-400 min-h-[32px] leading-relaxed line-clamp-2">
                {plan.description}
              </CardDescription>
              <div className="mt-6 mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    {currentPrice === 0 ? "Free" : `$${currentPrice}`}
                  </span>
                  {currentPrice > 0 && (
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{priceSuffix}</span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0">
              <div className="h-px w-full bg-slate-50 mb-6" />
              <ul className="list-none space-y-1">
                {plan.features.map((feature) => (
                  <FeatureItem key={feature.name} feature={feature} />
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button
                onClick={() => onPlanSelect(plan.id)}
                disabled={isLoading}
                className={cn(
                  "w-full transition-all duration-300 h-14 text-xs font-black uppercase tracking-widest rounded-xl",
                  isFeatured
                    ? "bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] hover:scale-[1.02] active:scale-[0.98] text-white shadow-xl shadow-[#6C5CE7]/30"
                    : (plan.priceMonthly === 0 
                        ? "bg-slate-900 text-white hover:bg-slate-800" 
                        : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm")
                )}
              >
                {isLoading ? "Processing..." : plan.buttonLabel}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );

  // --- 3.3. Comparison Table (Mobile hidden, Tablet/Desktop visible) ---
  const ComparisonTable = (
    <div className="mt-24 hidden md:block bg-white rounded-3xl border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xl font-black text-slate-900">Detailed Feature Comparison</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">Everything you get in each plan</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr>
              <th scope="col" className="px-8 py-5 text-left text-xs font-black uppercase tracking-widest text-slate-400 w-1/4">
                Feature Area
              </th>
              {plans.map((plan) => (
                <th
                  key={`th-${plan.id}`}
                  scope="col"
                  className={cn(
                    "px-6 py-5 text-center text-sm font-black text-slate-900 w-1/4",
                    plan.isPopular && "bg-indigo-50/50"
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {allFeatures.map((featureName, index) => (
              <tr key={featureName} className="transition-colors hover:bg-slate-50/50 group">
                <td className="px-8 py-4 text-left text-sm font-semibold text-slate-700">
                  {featureName}
                </td>
                {plans.map((plan) => {
                  const feature = plan.features.find(f => f.name === featureName);
                  const isIncluded = feature?.isIncluded ?? false;
                  const value = feature?.value;
                  const Icon = isIncluded ? Check : X;
                  const iconColor = isIncluded ? "text-[#6C5CE7]" : "text-slate-200";

                  return (
                    <td
                      key={`${plan.id}-${featureName}`}
                      className={cn(
                        "px-6 py-4 text-center transition-all duration-150",
                        plan.isPopular && "bg-indigo-50/30 group-hover:bg-indigo-50/60"
                      )}
                    >
                      {value ? (
                        <span className={cn("text-sm font-bold", isIncluded ? "text-slate-700" : "text-slate-400")}>
                          {value}
                        </span>
                      ) : (
                        <Icon className={cn("h-5 w-5 mx-auto", iconColor)} strokeWidth={3} aria-hidden="true" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- 3.4. Final Render ---
  return (
    <div className={cn("w-full py-20 lg:py-32 relative", className)} {...props}>
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6C5CE7]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8E7CFF]/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNlNmU4ZjAiLz48L3N2Zz4=')] opacity-50 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#6C5CE7] font-black text-[10px] uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
            Simple Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-[1.1]">
            Choose the right plan for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">your business</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed">
            Scale effortlessly with features designed for growth. Start free, upgrade when you need more power.
          </p>
        </header>
        
        <section aria-labelledby="pricing-plans">
          {PricingCards}
        </section>

        <section aria-label="Feature Comparison Table">
          {ComparisonTable}
        </section>
      </div>
    </div>
  );
};
