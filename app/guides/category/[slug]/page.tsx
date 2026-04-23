import { Metadata } from "next";
import CategoryGuidesClient from "@/components/resources/CategoryGuidesClient";
import { db } from "@/lib/db";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const rawCats = await db.$queryRawUnsafe(`SELECT * FROM GuideCategory WHERE slug = ? LIMIT 1`, slug) as any[];
  const category = rawCats[0];

  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Playbooks & Guides | StaffSchedule.io`,
    description: category.description || `Master ${category.name} with our professional playbooks and documentation.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CategoryGuidesClient slug={slug} />;
}
