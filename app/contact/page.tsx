"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Mail, Send, Phone, MapPin, Clock, ArrowRight,
  Sparkles, Globe, Users, CheckCircle, Star, Building2, Headphones,
  CalendarRange, Zap, ShieldCheck, BarChart3, MessageSquare,
  Briefcase, Factory, Heart, Store, Stethoscope, Truck
} from "lucide-react";

/* ─── ANIMATION HELPERS ─── */
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

/* ─── INDUSTRY OPTIONS ─── */
const industries = [
  { value: "", label: "Select your industry" },
  { value: "healthcare", label: "🏥 Healthcare & Medical" },
  { value: "retail", label: "🛍️ Retail & E-commerce" },
  { value: "hospitality", label: "🏨 Hospitality & Hotels" },
  { value: "restaurant", label: "🍽️ Restaurants & F&B" },
  { value: "logistics", label: "🚛 Logistics & Warehousing" },
  { value: "manufacturing", label: "🏭 Manufacturing" },
  { value: "security", label: "🛡️ Security Services" },
  { value: "education", label: "🎓 Education" },
  { value: "other", label: "📋 Other" },
];

const teamSizes = [
  { value: "", label: "Select team size" },
  { value: "1-25", label: "1–25 employees" },
  { value: "26-100", label: "26–100 employees" },
  { value: "101-500", label: "101–500 employees" },
  { value: "501-2000", label: "501–2,000 employees" },
  { value: "2000+", label: "2,000+ employees" },
];

const schedulingMethods = [
  { value: "", label: "How do you schedule today?" },
  { value: "spreadsheets", label: "📊 Spreadsheets (Excel, Sheets)" },
  { value: "pen-paper", label: "📝 Pen & Paper / Whiteboards" },
  { value: "competitor", label: "💻 Another Scheduling Software" },
  { value: "custom", label: "⚙️ Custom / In-house Tool" },
  { value: "none", label: "🆕 No formal system yet" },
];

/* ─── FORM INPUT COMPONENT ─── */
function FormInput({ label, required = false, ...props }: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group">
      <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-focus-within:text-indigo-500 mb-2 transition-colors">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium outline-none text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}

function FormSelect({ label, options, required = false }: { label: string; options: { value: string; label: string }[]; required?: boolean }) {
  return (
    <div className="group">
      <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-focus-within:text-indigo-500 mb-2 transition-colors">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        required={required}
        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium outline-none text-slate-900 appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2394a3b8' viewBox='0 0 16 16'%3E%3Cpath d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1.25rem center" }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<"demo" | "sales" | "support">("demo");

  const formTypes = [
    { id: "demo" as const, label: "Request a Demo", icon: CalendarRange, description: "See StaffSchedule.io in action" },
    { id: "sales" as const, label: "Talk to Sales", icon: Building2, description: "Get custom enterprise pricing" },
    { id: "support" as const, label: "Get Support", icon: Headphones, description: "Technical help & questions" },
  ];

  return (
    <div className="bg-white">
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[10%] left-[20%] w-[500px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <motion.div animate={{ x: [0, -20, 30, 0], y: [0, 20, -20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-[10%] right-[15%] w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-indigo-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] mb-6 sm:mb-8">
            <MessageSquare className="w-3.5 h-3.5" />
            Contact Us
          </motion.div>

          <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] sm:leading-[1.05] mb-6 text-balance px-2">
            Let's transform your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400">
              workforce scheduling.
            </span>
          </motion.h1>

          <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-4">
            Schedule a personalized demo, get enterprise pricing, or reach our 24/7 support team —
            we respond within 2 hours.
          </motion.p>
        </div>


        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      {/* ═══ QUICK CONTACT CARDS ═══ */}
      <section className="relative -mt-8 z-30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[
              { icon: Mail, title: "Email Us", value: "hello@staffschedule.io", sub: "General & billing inquiries", href: "mailto:hello@staffschedule.io", color: "from-indigo-500 to-blue-500" },
              { icon: Phone, title: "Call Sales", value: "+1 (800) 555-0199", sub: "Mon–Fri, 9am–6pm EST", href: "tel:+18005550199", color: "from-emerald-500 to-teal-500" },
              { icon: CalendarRange, title: "Book Demo", value: "30-min live walkthrough", sub: "See AI scheduling in action", href: "#contact-form", color: "from-purple-500 to-pink-500" },
            ].map((card, i) => (
              <motion.a key={card.title} href={card.href} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className="group bg-white rounded-3xl p-7 border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-0.5">{card.title}</h3>
                <p className="text-sm font-bold text-indigo-600 mb-1">{card.value}</p>
                <p className="text-xs text-slate-400">{card.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAIN FORM SECTION ═══ */}
      <section id="contact-form" className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* ─── LEFT: FORM (3 cols) ─── */}
            <motion.div {...fadeUp} className="lg:col-span-3">
              {/* Form Type Selector */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {formTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormType(type.id)}
                    className={`relative rounded-2xl p-5 text-left transition-all duration-300 border ${
                      formType === type.id
                        ? "bg-indigo-50 border-indigo-200 shadow-md"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <type.icon size={20} className={formType === type.id ? "text-indigo-600 mb-2" : "text-slate-400 mb-2"} />
                    <p className={`text-sm font-black ${formType === type.id ? "text-indigo-700" : "text-slate-700"}`}>{type.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">{type.description}</p>
                    {formType === type.id && (
                      <motion.div
                        layoutId="activeFormTab"
                        className="absolute inset-0 rounded-2xl border-2 border-indigo-500 pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/[0.04] to-transparent rounded-full -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/[0.03] to-transparent rounded-full -ml-24 -mb-24" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center relative z-10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.1 }}
                        className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="w-10 h-10" />
                      </motion.div>
                      <h2 className="text-3xl font-black text-slate-900 mb-3">
                        {formType === "demo" ? "Demo Requested!" : formType === "sales" ? "Message Received!" : "Ticket Created!"}
                      </h2>
                      <p className="text-slate-500 font-medium mb-2 max-w-sm mx-auto">
                        {formType === "demo"
                          ? "A product specialist will reach out within 2 hours to schedule your personalized demo."
                          : formType === "sales"
                          ? "Our enterprise team will prepare a custom quote and get back to you within 1 business day."
                          : "Your support ticket has been created. Our team typically resolves issues within 30 minutes."}
                      </p>
                      <p className="text-xs text-slate-400 mb-8">Check your inbox for a confirmation email.</p>
                      <button onClick={() => setSubmitted(false)} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-colors text-sm">
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key={formType}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                      className="space-y-5 relative z-10"
                    >
                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormInput label="Full Name" placeholder="John Doe" required type="text" />
                        <FormInput label="Work Email" placeholder="john@company.com" required type="email" />
                      </div>

                      {/* Row 2: Company + Phone */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormInput label="Company Name" placeholder="Acme Healthcare Inc." type="text" required />
                        <FormInput label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
                      </div>

                      {/* Row 3: Industry + Team Size (for demo/sales) */}
                      {formType !== "support" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <FormSelect label="Industry" options={industries} required />
                          <FormSelect label="Team Size" options={teamSizes} required />
                        </div>
                      )}

                      {/* Row 4: Current scheduling method (for demo only) */}
                      {formType === "demo" && (
                        <FormSelect label="Current Scheduling Method" options={schedulingMethods} />
                      )}

                      {/* Row 4b: Job title (for sales) */}
                      {formType === "sales" && (
                        <FormInput label="Job Title" placeholder="VP of Operations" type="text" />
                      )}

                      {/* Row 4c: Ticket category (for support) */}
                      {formType === "support" && (
                        <FormSelect label="Issue Category" options={[
                          { value: "", label: "Select an issue category" },
                          { value: "login", label: "🔑 Login / Account Access" },
                          { value: "scheduling", label: "📅 Scheduling & Shifts" },
                          { value: "billing", label: "💳 Billing & Payments" },
                          { value: "integration", label: "🔗 Integrations & API" },
                          { value: "mobile", label: "📱 Mobile App Issues" },
                          { value: "other", label: "📋 Other" },
                        ]} required />
                      )}

                      {/* Message */}
                      <div className="group">
                        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 group-focus-within:text-indigo-500 mb-2 transition-colors">
                          {formType === "demo" ? "What scheduling challenges are you facing?" : formType === "support" ? "Describe your issue" : "Tell us about your needs"}
                          <span className="text-red-400"> *</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium outline-none resize-none text-slate-900 placeholder:text-slate-400"
                          placeholder={
                            formType === "demo"
                              ? "E.g., We manage 200+ nurses across 3 hospital locations and currently use spreadsheets..."
                              : formType === "support"
                              ? "Please describe the issue with as much detail as possible..."
                              : "E.g., We're looking for enterprise pricing for 500+ employees across 12 retail locations..."
                          }
                        />
                      </div>

                      {/* Checkboxes for demo */}
                      {formType === "demo" && (
                        <div className="bg-slate-50 rounded-2xl p-5 space-y-3">
                          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 mb-1">I'd like to see:</p>
                          {[
                            "AI-powered auto-scheduling",
                            "Shift swaps & open shifts",
                            "GPS attendance tracking",
                            "Labor cost analytics",
                            "Multi-location management",
                          ].map((item) => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer group/check">
                              <input type="checkbox" className="w-4.5 h-4.5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500/20" />
                              <span className="text-sm text-slate-600 group-hover/check:text-slate-900 transition-colors font-medium">{item}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 group"
                      >
                        {formType === "demo" ? "Request My Demo" : formType === "sales" ? "Get Enterprise Quote" : "Submit Support Ticket"}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-center text-[11px] text-slate-400">
                        By submitting, you agree to our{" "}
                        <Link href="/privacy" className="text-indigo-500 hover:underline">Privacy Policy</Link>.
                        We'll never share your data.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ─── RIGHT: SIDEBAR (2 cols) ─── */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="lg:col-span-2 space-y-6">

              {/* Response Time Card */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Zap size={18} />
                  </div>
                  <h3 className="text-base font-black text-slate-900">Response Time</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Demo Requests", time: "< 2 hours", color: "bg-emerald-50 text-emerald-600" },
                    { label: "Sales Inquiries", time: "Same day", color: "bg-blue-50 text-blue-600" },
                    { label: "Technical Support", time: "< 30 min", color: "bg-amber-50 text-amber-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-600 font-medium">{item.label}</span>
                      <span className={`text-xs font-black px-3 py-1.5 rounded-full ${item.color}`}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Get Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-7 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <h3 className="text-base font-black mb-5 relative z-10 flex items-center gap-2">
                  <Sparkles size={16} /> What You Get in a Demo
                </h3>
                <div className="space-y-4 relative z-10">
                  {[
                    { icon: CalendarRange, text: "Live AI schedule generation for your team" },
                    { icon: BarChart3, text: "Labor cost savings estimate for your org" },
                    { icon: Globe, text: "Multi-location setup walkthrough" },
                    { icon: ShieldCheck, text: "Compliance & security deep-dive" },
                    { icon: Briefcase, text: "Custom pricing for your team size" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={14} />
                      </div>
                      <span className="text-sm font-medium text-white/90 leading-snug">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* Trust Badges */}
              <div className="bg-slate-50 rounded-3xl p-7 border border-slate-100">
                <h3 className="text-base font-black text-slate-900 mb-4">Trusted by</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Users, val: "10,000+", label: "Teams" },
                    { icon: Globe, val: "50+", label: "Countries" },
                    { icon: Star, val: "4.9/5", label: "Rating" },
                    { icon: ShieldCheck, val: "99.99%", label: "Uptime" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-slate-100">
                      <s.icon size={16} className="text-indigo-500 mx-auto mb-2" />
                      <p className="text-lg font-black text-slate-900">{s.val}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
              Common <span className="text-indigo-600">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: "How long does a demo take?", a: "Our live demos are typically 30 minutes. We'll show you AI scheduling in action using your real team size and requirements, and you'll leave with a clear ROI estimate." },
              { q: "Do you offer custom enterprise pricing?", a: "Yes! For teams of 200+ employees, we offer volume discounts, dedicated success managers, custom SLAs, SSO, and advanced compliance features. Use the 'Talk to Sales' form above." },
              { q: "What's included in the free trial?", a: "Full access to every feature for 14 days — AI scheduling, shift swaps, attendance tracking, analytics, and unlimited team members. No credit card required." },
              { q: "Can StaffSchedule.io integrate with our payroll?", a: "We integrate with 40+ tools including ADP, Gusto, QuickBooks, Xero, and all major payroll providers. Custom API integrations are available on Enterprise plans." },
              { q: "Is my data secure?", a: "Absolutely. We use AES-256 encryption, are SOC 2 Type II certified, GDPR compliant, and maintain 99.99% uptime with automated backups every 6 hours." },
            ].map((faq, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }} className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <h3 className="text-sm font-black text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] left-[15%] w-[500px] h-[300px] bg-indigo-600/25 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 text-balance">
              Not ready to talk?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Try it free.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto">No credit card. No commitment. Full access for 14 days.</p>
            <Link href="https://app.staffschedule.io/signup.php" className="inline-flex h-16 px-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-base uppercase tracking-widest items-center gap-3 hover:shadow-[0_0_50px_-10px_rgba(124,58,237,0.6)] transition-all hover:scale-[1.02] active:scale-95 group">
              Start Free Trial <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
