"use client";

import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function PricingWithChart() {
  const handlePlanSelect = async (planName: string, priceId: string) => {
    if (planName === "Company") {
      window.location.href = "https://app.staffschedule.io/onboarding.php?start_trial=1";
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          priceId: priceId,
          planName: planName 
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout session failed:", data.error);
      }
    } catch (err) {
      console.error("Payment redirect error:", err);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4">
      {/* Heading */}
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#6C5CE7] font-black text-[10px] uppercase tracking-widest mb-6 border border-slate-200 shadow-sm">
          Simple Pricing
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900">
          Pricing that <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]">Scales with You</span>
        </h2>
        <p className="text-slate-500 mt-6 text-sm md:text-lg max-w-xl mx-auto font-medium">
          Choose the right plan to unlock powerful tools and insights.
          Transparent pricing built for modern teams.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] grid rounded-3xl border border-slate-100 lg:grid-cols-3 overflow-hidden">
        
        {/* 1. Team Plan */}
        <div className="flex flex-col justify-between border-b p-8 lg:border-r lg:border-b-0 hover:bg-slate-50/50 transition-colors">
          <div className="space-y-6">
            <div>
              <h2 className="inline rounded-[2px] text-xl font-bold text-slate-900">
                Team
              </h2>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Perfect for single locations
              </p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-black text-slate-900">
                  $29
                </span>
                <span className="text-sm font-bold text-slate-400 ml-1">/mo</span>
              </div>
            </div>

            <Button 
              onClick={() => handlePlanSelect("Team", process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY || "price_1T3jnOHtp8VMWVyUW7m27ulf")}
              variant="outline" 
              className="w-full py-6 font-bold border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              Start 15-Day Free Trial
            </Button>

            <div className="bg-slate-100 h-px w-full" />

            <ul className="text-slate-600 space-y-4 text-sm font-medium">
              {[
                'Up to 20 employees',
                '1 location & 5 departments',
                'Smart scheduling',
                'Mobile app access',
                'Direct messaging',
                'Basic reporting',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-[#6C5CE7] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Business Plan (With Chart) */}
        <div className="flex flex-col border-b p-8 lg:border-r lg:border-b-0 relative bg-indigo-50/30">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF]" />
          
          <div className="space-y-6 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Business</h2>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  For growing multi-unit teams
                </p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-[#6C5CE7]/10 text-[#6C5CE7] rounded-full">
                Most Popular
              </span>
            </div>
            
            <div className="flex items-baseline">
              <span className="text-5xl font-black text-slate-900">
                $50
              </span>
              <span className="text-sm font-bold text-slate-400 ml-1">/mo</span>
            </div>

            <div className="bg-white shadow-sm w-full rounded-xl border border-slate-100 p-3 my-6">
              <InterestChart />
            </div>
            
            <div className="text-sm font-bold text-slate-900 mt-6 mb-2">Everything in Team, plus:</div>
            <ul className="text-slate-600 space-y-4 text-sm font-medium">
              {[
                'Up to 50 employees',
                '10 locations & 25 departments',
                'Labor forecasting',
                'POS integration',
                'Premium support',
                'Team Chat & Swaps'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-[#6C5CE7] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <Button
              onClick={() => handlePlanSelect("Business", process.env.NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY || "price_1T3jnsHtp8VMWVyUvZ67Eif5")}
              className="w-full py-6 font-bold bg-gradient-to-r from-[#6C5CE7] to-[#8E7CFF] hover:opacity-90 text-white shadow-lg shadow-[#6C5CE7]/30"
            >
              Get Started with Business
            </Button>
          </div>
        </div>

        {/* 3. Company Plan */}
        <div className="flex flex-col justify-between p-8 hover:bg-slate-50/50 transition-colors">
          <div className="space-y-6">
            <div>
              <h2 className="inline rounded-[2px] text-xl font-bold text-slate-900">
                Company
              </h2>
              <p className="text-slate-500 text-sm font-medium mt-1">
                Unlimited scaling for large orgs
              </p>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-black text-slate-900">
                  $99
                </span>
                <span className="text-sm font-bold text-slate-400 ml-1">/mo</span>
              </div>
            </div>

            <Button 
              onClick={() => handlePlanSelect("Company", process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPANY_MONTHLY || "price_1T3joMHtp8VMWVyUdizcksql")}
              variant="outline" 
              className="w-full py-6 font-bold border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              Contact Sales
            </Button>

            <div className="bg-slate-100 h-px w-full" />

            <div className="text-sm font-bold text-slate-900 mt-6 mb-2">Everything in Business, plus:</div>
            <ul className="text-slate-600 space-y-4 text-sm font-medium">
              {[
                'Unlimited employees',
                '25 locations & 50 departments',
                'API access & Custom Webhooks',
                'SSO & SAML Security',
                'Custom onboarding',
                'Dedicated manager',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-slate-900 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

function InterestChart() {
  const chartData = [
    { month: 'Jan', interest: 120 },
    { month: 'Feb', interest: 180 },
    { month: 'Mar', interest: 150 },
    { month: 'Apr', interest: 210 },
    { month: 'May', interest: 250 },
    { month: 'Jun', interest: 300 },
    { month: 'Jul', interest: 280 },
    { month: 'Aug', interest: 320 },
    { month: 'Sep', interest: 340 },
    { month: 'Oct', interest: 390 },
    { month: 'Nov', interest: 420 },
    { month: 'Dec', interest: 500 },
  ];

  const chartConfig = {
    interest: {
      label: 'Signups',
      color: '#6C5CE7',
    },
  } satisfies ChartConfig;

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="space-y-0 p-2 pb-0">
        <CardTitle className="text-xs font-bold text-slate-700">Business Adoption</CardTitle>
        <CardDescription className="text-[10px] text-slate-500">
          Monthly trend of active business teams.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-4">
        <ChartContainer config={chartConfig} className="h-[120px] w-full">
          <LineChart data={chartData} margin={{ left: 5, right: 5, top: 5, bottom: 5 }}>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              fontSize={10}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="interest"
              type="monotone"
              stroke="#6C5CE7"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
