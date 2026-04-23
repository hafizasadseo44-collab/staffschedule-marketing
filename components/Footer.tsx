import React from "react";
import Link from "next/link";
import { Rocket, Mail, Globe, Users, Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-brand-dark border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tight text-brand-dark dark:text-white">
                StaffSchedule<span className="text-brand-primary">.io</span>
              </span>
            </Link>
            <p className="text-brand-slate dark:text-slate-400 font-medium mb-6">
              The premium, all-in-one workforce management platform for modern
              businesses. Schedule faster, communicate better.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-brand-slate hover:text-brand-primary transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-brand-slate hover:text-brand-primary transition-colors">
                <Users className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-brand-slate hover:text-brand-primary transition-colors">
                <Info className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links: Product */}
          <div>
            <h4 className="text-brand-dark dark:text-white font-black uppercase text-xs tracking-widest mb-6">
              Product
            </h4>
            <ul className="space-y-4">
              {["Features", "Pricing", "Integrations", "Enterprise"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-brand-slate dark:text-slate-400 hover:text-brand-primary font-bold text-sm transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Support */}
          <div>
            <h4 className="text-brand-dark dark:text-white font-black uppercase text-xs tracking-widest mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              {["Documentation", "API Reference", "Status"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-brand-slate dark:text-slate-400 hover:text-brand-primary font-bold text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links: Legal */}
          <div>
            <h4 className="text-brand-dark dark:text-white font-black uppercase text-xs tracking-widest mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-brand-slate dark:text-slate-400 hover:text-brand-primary font-bold text-sm transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-brand-slate dark:text-slate-500 text-sm font-bold">
            © {new Date().getFullYear()} StaffSchedule.io. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-brand-slate dark:text-slate-500 text-sm font-bold">
            <Mail className="w-4 h-4 text-brand-primary" />
            <span>hello@staffschedule.io</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
