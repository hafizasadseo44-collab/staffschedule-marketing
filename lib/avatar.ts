import { createHash } from "crypto";

/**
 * Returns a Gravatar URL for the given email (with a colorful default avatar
 * if the user hasn't registered with Gravatar). This works without any API
 * key and produces stable, professional-looking avatars.
 */
export function gravatarUrl(email: string, size = 120): string {
  const hash = createHash("md5")
    .update(email.toLowerCase().trim())
    .digest("hex");
  // d=retro gives a colorful pixel-art unique-per-email fallback
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
}

/**
 * Deterministically picks a gradient pair from a small premium palette based
 * on the email hash. Used as a fallback when we want CSS gradient initials.
 */
const GRADIENTS = [
  "from-indigo-500 to-purple-500",
  "from-violet-500 to-fuchsia-500",
  "from-pink-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
  "from-purple-500 to-pink-500",
];

export function avatarGradient(email: string): string {
  const hash = createHash("md5")
    .update(email.toLowerCase().trim())
    .digest("hex");
  const index = parseInt(hash.slice(0, 8), 16) % GRADIENTS.length;
  return GRADIENTS[index];
}

export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}
