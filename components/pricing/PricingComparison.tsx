"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = ["Team", "Business", "Company"];

const features = [
  {
    category: "Teams & Locations",
    items: [
      { name: "Team Members", team: "20 Users", business: "50 Users", company: "100 Users", tooltip: "The total number of staff members you can add to the system." },
      { name: "Global Locations", team: "1 Site", business: "10 Sites", company: "25 Sites", tooltip: "The number of individual physical branches or offices you can manage." },
      { name: "Departments per Site", team: "5", business: "25", company: "50", tooltip: "How many different departments or divisions you can create per location." },
      { name: "Manager Accounts", team: "1 Seat", business: "Unlimited", company: "Unlimited", tooltip: "How many users can have manager-level access and control." },
      { name: "Cloud Storage", team: "1GB", business: "5GB", company: "Unlimited", tooltip: "Secure space for saving team documents and media." },
    ]
  },
  {
    category: "Scheduling Tools",
    items: [
      { name: "Easy Schedule Builder", team: true, business: true, company: true, tooltip: "Our main tool for quickly creating and editing shift schedules." },
      { name: "Calendar & List Views", team: true, business: true, company: true, tooltip: "View your schedule by date or in a simple list format." },
      { name: "Save as Draft & Publish", team: true, business: true, company: true, tooltip: "Work on schedules in private and publish them when they're ready." },
      { name: "Monthly Schedule View", team: false, business: true, company: true, tooltip: "See a full month of shifts on a single screen." },
      { name: "Private Shift Notes", team: "5 / mo", business: "Unlimited", company: "Unlimited", tooltip: "Add special instructions or notes to any shift." },
    ]
  },
  {
    category: "Communication",
    items: [
      { name: "Mobile App (iOS/Android)", team: false, business: true, company: true, tooltip: "Allow your team to check shifts and swap on their phones." },
      { name: "Team Instant Messaging", team: false, business: true, company: true, tooltip: "Chat with your team directly inside the app." },
      { name: "Company Announcements", team: false, business: true, company: true, tooltip: "Post important news that your whole team can see." },
      { name: "Push Notifications", team: true, business: true, company: true, tooltip: "Alert team members instantly when their shifts change." },
      { name: "Email Reminders", team: true, business: true, company: true, tooltip: "Send automatic shift reminders to staff emails." },
    ]
  },
  {
    category: "Advanced Automation",
    items: [
      { name: "Available Shift Pool", team: false, business: false, company: true, tooltip: "Post open shifts that any qualified staff can claim." },
      { name: "Team Shift Trading", team: false, business: false, company: true, tooltip: "Staff can swap shifts with each other (requires manager approval)." },
      { name: "Bulk Team Import", team: false, business: false, company: true, tooltip: "Quickly add your entire team via a CSV file." },
      { name: "Business Reports", team: "Standard", business: "Detailed", company: "Professional", tooltip: "Get insights into your labor costs and team performance." },
      { name: "24/7 Priority Support", team: "Standard", business: "Fast", company: "Premium", tooltip: "Get faster help from our dedicated support team." },
    ]
  }
];

const PricingComparison = () => {
  const [activePlan, setActivePlan] = useState<"Team" | "Business" | "Company">("Business");

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-4">
              Find the right fit for you.
            </h2>
            <p className="text-lg text-slate-500">
              Compare features across our tiers to find the perfect solution for your organization's scale.
            </p>
          </div>

          {/* Desktop Plan Headers */}
          <div className="hidden lg:flex gap-6 min-w-[500px] justify-end">
            {plans.map((plan) => (
              <div 
                key={plan}
                className={`w-40 py-4 rounded-2xl border text-center transition-all ${
                  plan === 'Business' 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm" 
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <div className="text-lg font-bold">{plan}</div>
              </div>
            ))}
          </div>
          
          {/* Mobile Plan Selector */}
          <div className="lg:hidden w-full p-1.5 rounded-2xl bg-slate-100 border border-slate-200 flex gap-1">
            {plans.map((plan) => (
              <button
                key={plan}
                onClick={() => setActivePlan(plan as any)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  activePlan === plan 
                    ? "bg-white text-indigo-600 shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {plan}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Matrix Layout */}
        <div className="space-y-16">
          {features.map((section) => (
            <div key={section.category}>
              <div className="flex items-center gap-4 mb-8">
                 <h3 className="text-xl font-bold text-slate-900">
                   {section.category}
                 </h3>
                 <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="space-y-0 text-sm">
                {section.items.map((item, itemIdx) => (
                  <div key={item.name} className={`relative group border-b border-slate-100 ${itemIdx === 0 ? "border-t" : ""}`}>
                    
                    {/* PC/Laptop Grid View */}
                    <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr] items-center p-4 transition-colors hover:bg-slate-50">
                       <div className="flex items-center gap-2">
                         <span className="font-medium text-slate-700">{item.name}</span>
                         <div className="relative group/tip z-10 flex">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-slate-800 text-white text-xs opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity shadow-lg">
                              {item.tooltip}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                            </div>
                         </div>
                       </div>
                       
                       <div className="flex justify-center">{renderValue(item.team)}</div>
                       <div className="flex justify-center">{renderValue(item.business, true)}</div>
                       <div className="flex justify-center">{renderValue(item.company)}</div>
                    </div>

                    {/* Mobile Feature View */}
                    <div className="lg:hidden p-4">
                       <div className="flex items-center justify-between mb-3">
                         <span className="font-medium text-slate-700">{item.name}</span>
                         <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                       </div>
                       <div className="flex items-center justify-between py-2 px-4 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{activePlan}</span>
                          <div>
                            {renderValue((item as any)[activePlan.toLowerCase()], activePlan === "Business")}
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA Box (Clean version) */}
        <div className="mt-24 p-10 lg:p-12 rounded-3xl bg-slate-50 border border-slate-200">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  Built for the Top 1%.
                </h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
                  Operating a global workforce? We provide custom API development, 
                  dedicated account executives, and military-grade SSO layers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 <Link
                   href="/contact"
                   className="px-8 py-4 bg-indigo-600 text-white rounded-xl text-base font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
                 >
                   Tailored Proposal
                   <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const renderValue = (val: any, highlight: boolean = false) => {
  if (typeof val === "boolean") {
    return val ? (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highlight ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
        <Check className="w-4 h-4" strokeWidth={3} />
      </div>
    ) : (
      <div className="w-8 h-8 flex items-center justify-center">
        <Minus className="w-4 h-4 text-slate-300" strokeWidth={2} />
      </div>
    );
  }
  return (
    <span className={`font-semibold ${highlight ? "text-indigo-600" : "text-slate-700"}`}>
      {val}
    </span>
  );
};

export default PricingComparison;
