import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import CaseStudyClientLayout from "@/components/success/CaseStudyClientLayout";

interface PageProps {
  // In Next.js 15+, params is inherently a Promise in dynamic routes
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = CASE_STUDIES.find((s) => s.slug === resolvedParams.slug);
  
  if (!study) return { title: "Success Story Not Found" };

  return {
    title: `${study.companyName} | ${study.industry} | StaffSchedule.io`,
    description: study.summary,
    openGraph: {
      title: `${study.companyName} Case Study`,
      description: study.summary,
      images: [{ url: study.heroImage }],
    }
  };
}

export default async function CaseStudyDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const study = CASE_STUDIES.find((s) => s.slug === resolvedParams.slug);

  if (!study) {
    notFound();
  }

  // Strip out React component functions (icons) from metrics before passing to Client Component
  const safeStudy = {
    ...study,
    metrics: study.metrics.map(({ icon, ...rest }) => rest)
  };

  return <CaseStudyClientLayout study={safeStudy as any} />;
}
