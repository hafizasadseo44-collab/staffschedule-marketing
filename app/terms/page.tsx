import Link from "next/link";
import PolicyLayout from "@/components/PolicyLayout";

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms of Service"
      description="These Terms of Service govern your access to and use of the StaffSchedule.io platform. By using our services, you agree to these legally binding terms."
      lastUpdated="April 21, 2026"
    >
      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the <Link href="/">StaffSchedule.io website</Link>, web application, mobile applications, and related services (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you represent an organization, you agree to these Terms on behalf of that organization and represent that you have the authority to do so.
        </p>
        <p>
          We may update these Terms from time to time. Your continued use of the Service after such changes signifies your acceptance of the updated Terms.
        </p>
      </section>

      <section id="accounts">
        <h2>2. Registration & Eligibility</h2>
        <p>
          To access certain features of the Service, you must <Link href="https://app.staffschedule.io/signup.php">register for an account</Link>. You agree to:
        </p>
        <ul>
          <li>Provide accurate, current, and complete information during the registration process.</li>
          <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
          <li>Promptly notify us if you discover or otherwise suspect any security breaches related to the Service.</li>
        </ul>
        <p>
          Organizations are responsible for managing the access levels and permissions of their staff members within the platform.
        </p>
      </section>

      <section id="billing">
        <h2>3. Subscriptions & Payments</h2>
        <p>
          StaffSchedule.io is a <Link href="/pricing">subscription-based SaaS platform</Link>.
        </p>
        <ul>
          <li><strong>Plans:</strong> Fees are based on the plan selected and the number of active staff profiles.</li>
          <li><strong>Billing:</strong> Fees are billed in advance on a monthly or annual basis and are non-refundable except as required by law.</li>
          <li><strong>Changes:</strong> You may upgrade or downgrade your plan at any time. Upgrades take effect immediately (pro-rated), while downgrades take effect at the end of the current billing cycle.</li>
          <li><strong>Non-payment:</strong> Failure to pay fees may result in the suspension or termination of your access to the Service.</li>
        </ul>
      </section>

      <section id="conduct">
        <h2>4. Use of Service & Restrictions</h2>
        <p>
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You shall not:
        </p>
        <ul>
          <li>Copy, modify, or create derivative works of the platform or its source code.</li>
          <li>Use the Service to transmit any "spam," "phishing," or other unauthorized advertisements.</li>
          <li>Attempt to interfere with or disrupt the integrity or performance of the Service.</li>
          <li>Harass or harm staff members through the integrated communication or shift-swapping features.</li>
          <li>Scrape or extract data from the Service for use in competing products.</li>
        </ul>
      </section>

      <section id="ip">
        <h2>5. Intellectual Property & Data Ownership</h2>
        <p>
          <strong>Your Data:</strong> You retain all rights and ownership of the data you upload or submit to the Service. You grant StaffSchedule.io a limited license to process this data solely for the purpose of providing and improving the Service. Detailed data handling information is available in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          <strong>Our Content:</strong> The Service, including its design, architecture, algorithms, and branding, is the exclusive property of StaffSchedule.io and its licensors and is protected by copyright, trademark, and other laws.
        </p>
      </section>

      <section id="ai">
        <h2>6. AI & Automated Scheduling</h2>
        <p>
          StaffSchedule.io utilizes automated algorithms and <Link href="/features">AI Logic</Link> to suggest shift rotations and workforce optimizations.
        </p>
        <ul>
          <li><strong>Suggestions:</strong> AI-generated schedules are suggestions only. Management retains final authority and responsibility for all staffing decisions.</li>
          <li><strong>Compliance:</strong> While our platform includes compliance tracking for fair work laws, you are responsible for ensuring that final schedules comply with your local labor regulations.</li>
        </ul>
      </section>

      <section id="liability">
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, StaffSchedule.io shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
        </p>
        <p>
          Our total liability for any claim arising out of these Terms or the use of the Service shall not exceed the amount paid by you to StaffSchedule.io during the twelve (12) months prior to the event giving rise to the claim.
        </p>
      </section>

      <section id="termination">
        <h2>8. Termination</h2>
        <p>
          <strong>By You:</strong> You may terminate your account at any time through your dashboard settings. Termination will take effect at the end of your current paid billing period.
        </p>
        <p>
          <strong>By Us:</strong> We may suspend or terminate your access to the Service at any time, without prior notice, if we believe you have breached these Terms or if your use poses a security risk to the platform.
        </p>
      </section>

      <section id="governing">
        <h2>9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which StaffSchedule.io is incorporated, without regard to its conflict of law principles.
        </p>
        <p>
          Any disputes arising out of these Terms or our data processing shall be resolved exclusively through the courts of that jurisdiction. For support or legal inquiries, please visit our <Link href="/contact">Contact Page</Link>.
        </p>
      </section>
    </PolicyLayout>
  );
}
