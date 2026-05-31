import { redirect } from "next/navigation";

// Re-route /unsubscribe?token=... to the API endpoint which renders the
// branded confirmation page. Keeps a clean app-router URL while reusing the
// HTML response so links from email clients work uniformly.
export const dynamic = "force-dynamic";

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { token?: string; email?: string; c?: string };
}) {
  const q = new URLSearchParams();
  if (searchParams.token) q.set("token", searchParams.token);
  if (searchParams.email) q.set("email", searchParams.email);
  if (searchParams.c) q.set("c", searchParams.c);
  redirect(`/api/unsubscribe?${q.toString()}`);
}
