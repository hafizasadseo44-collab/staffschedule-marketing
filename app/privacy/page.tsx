"use client";

import React from "react";
import Link from "next/link";
import PolicyLayout from "@/components/PolicyLayout";

export default function PrivacyPage() {
  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "collection", title: "2. Information We Collect" },
    { id: "usage", title: "3. How We Use Data" },
    { id: "sharing", title: "4. Data Sharing" },
    { id: "security", title: "5. Security Measures" },
    { id: "rights", title: "6. Your Rights" },
    { id: "cookies", title: "7. Cookies & Tracking" },
    { id: "contact", title: "8. Contact Us" },
  ];

  return (
    <PolicyLayout
      title="Privacy Policy"
      description="Trust is the foundation of StaffSchedule.io. We are committed to transparency in how we collect, process, and protect your enterprise data."
      lastUpdated="April 21, 2026"
    >
      <section id="introduction">
        <h2>1. Introduction</h2>
        <p>
          At <Link href="/">StaffSchedule.io</Link>, we recognize the sensitivity of workforce management data. This Privacy Policy describes how we handle the personal and business information collected through our platform, marketing site, and mobile applications. By using StaffSchedule.io, you agree to the practices described in this document.
        </p>
        <p>
          We operate as a **Data Processor** for the staff information provided by our business customers, and as a **Data Controller** for the information we collect directly from account owners for billing and administrative purposes. For more details on our user agreement, please see our <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>

      <section id="collection">
        <h2>2. Information We Collect</h2>
        <p>
          To provide a seamless <Link href="/features">workforce management</Link> experience, we collection information in the following categories:
        </p>
        <ul>
          <li><strong>Organization Data:</strong> Business name, address, tax identifiers, and administrative contact information.</li>
          <li><strong>Staff PII (Personally Identifiable Information):</strong> Names, email addresses, phone numbers, and employee ID numbers provided by your organization.</li>
          <li><strong>Operational Data:</strong> Work schedules, shift swap histories, availability preferences, and attendance logs.</li>
          <li><strong>Geolocation Data:</strong> If enabled by your organization, we may collect GPS-verified coordinates during clock-in and clock-out events to ensure compliance.</li>
          <li><strong>Usage & Device Data:</strong> IP addresses, browser types, and interaction logs with our platform to improve performance and security.</li>
        </ul>
      </section>

      <section id="usage">
        <h2>3. How We Use Data</h2>
        <p>
          We process your information to deliver the core value of our platform:
        </p>
        <ul>
          <li><strong>Automated Scheduling:</strong> Our <Link href="/features">AI Logic</Link> engine uses availability and historical data to suggest optimized shift rotations.</li>
          <li><strong>Payroll Integration:</strong> Consolidating attendance logs for export to third-party payroll systems.</li>
          <li><strong>Communication:</strong> Facilitating team chat, announcements, and shift-swap notifications.</li>
          <li><strong>Security & Compliance:</strong> Monitoring for unauthorized access and ensuring platform integrity.</li>
          <li><strong>Service Improvement:</strong> Aggregating de-identified data to benchmark workforce productivity metrics.</li>
        </ul>
      </section>

      <section id="sharing">
        <h2>4. Data Sharing & Disclosure</h2>
        <p>
          <strong>StaffSchedule.io does not sell your personal or business data.</strong> We only share information in limited circumstances:
        </p>
        <ul>
          <li><strong>Sub-processors:</strong> To provide our service, we use trusted infrastructure partners including cloud hosting providers (Azure/Google Cloud) and payment processors (Stripe).</li>
          <li><strong>Customer Integration:</strong> Data may be shared with third-party tools (e.g., HRIS, Payroll) that the organization administrator explicitly connects.</li>
          <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests by public authorities.</li>
        </ul>
      </section>

      <section id="security">
        <h2>5. Security Measures</h2>
        <p>
          We implement rigorous, enterprise-grade security protocols to safeguard your information:
        </p>
        <ul>
          <li><strong>Encryption:</strong> Data is encrypted at rest using AES-256 and in transit via TLS 1.3.</li>
          <li><strong>Access Controls:</strong> We enforce multi-factor authentication (MFA) and role-based access control (RBAC) throughout the system.</li>
          <li><strong>Vulnerability Management:</strong> Regular automated security scans and third-party penetration testing ensure our defenses remain robust.</li>
          <li><strong>Salted Hashing:</strong> All user credentials are protected using strong, salted cryptographic hashing.</li>
        </ul>
      </section>

      <section id="rights">
        <h2>6. Your Rights & Choices</h2>
        <p>
          Depending on your jurisdiction (such as GDPR or CCPA), you may have the following rights:
        </p>
        <ul>
          <li><strong>Access:</strong> The right to request a copy of the data we hold about you.</li>
          <li><strong>Rectification:</strong> The right to correct inaccurate or incomplete data.</li>
          <li><strong>Deletion:</strong> The right to request the deletion of your data under certain conditions.</li>
          <li><strong>Export:</strong> The right to receive your data in a portable, machine-readable format.</li>
        </ul>
        <p>
          Staff users should primary contact their employer (the Organization Administrator) for data access requests, as the employer is the primary Data Controller. Users can also manage basic profile settings within the <Link href="https://app.staffschedule.io">Staff Portal</Link>.
        </p>
      </section>

      <section id="cookies">
        <h2>7. Cookies & Tracking</h2>
        <p>
          We use strictly necessary cookies to maintain your login session and security tokens. We also use functional cookies to remember your display preferences (such as Dark Mode or Rota view settings).
        </p>
        <p>
          For marketing performance, we may use analytics cookies (e.g., Google Analytics) on our public marketing site. You can manage these preferences through our cookie consent banner.
        </p>
      </section>

      <section id="contact">
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact our Data Protection Officer:
        </p>
        <p className="font-bold text-slate-800">
          Email: <a href="mailto:legal@staffschedule.io">legal@staffschedule.io</a><br />
          Address: Legal Department, StaffSchedule.io HQ<br />
          Response Time: Within 24-48 hours. For technical support, please visit our <Link href="/contact">Help Center</Link>.
        </p>
      </section>
    </PolicyLayout>
  );
}
