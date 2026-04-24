import { Metadata } from "next";
import GuideDetailClient from "@/components/resources/GuideDetailClient";
import { db } from "@/lib/db";
 
export const dynamic = 'force-dynamic';


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sanitizedSlug = slug.replace(/%20/g, '-').replace(/\s+/g, '-');
  
  // Try to get guide for metadata
  const rawGuides = await db.$queryRawUnsafe(`SELECT * FROM Guide WHERE slug = ? OR slug = ? LIMIT 1`, slug, sanitizedSlug) as any[];
  const guide = rawGuides[0];

  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.seoTitle || guide.title} | StaffSchedule.io Knowledge Base`,
    description: guide.seoDescription || guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      images: guide.coverImage ? [guide.coverImage] : [],
    }
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuideDetailClient slug={slug} />;
}
