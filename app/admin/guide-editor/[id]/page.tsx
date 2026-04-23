"use client";

import { use } from "react";
import FullPageGuideEditor from "@/components/admin/FullPageGuideEditor";

export default function EditGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <FullPageGuideEditor guideId={id} />;
}
