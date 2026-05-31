import * as React from "react";
import { Link } from "@react-email/components";
import { BRAND } from "./EmailLayout";

interface ButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export default function Button({ href, variant = "primary", children }: ButtonProps) {
  const styles = {
    primary: {
      background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.accent} 100%)`,
      color: "#FFFFFF",
      border: "none",
    },
    secondary: {
      background: "#FFFFFF",
      color: BRAND.primary,
      border: `1.5px solid ${BRAND.primary}`,
    },
    ghost: {
      background: "transparent",
      color: BRAND.primary,
      border: "none",
    },
  };

  const s = styles[variant];

  return (
    <table cellPadding={0} cellSpacing={0} role="presentation">
      <tr>
        <td
          style={{
            background: s.background,
            borderRadius: 12,
            border: s.border,
            boxShadow:
              variant === "primary" ? "0 4px 14px rgba(109, 93, 246, 0.3)" : "none",
          }}
        >
          <Link
            href={href}
            target="_blank"
            style={{
              display: "inline-block",
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 700,
              color: s.color,
              textDecoration: "none",
              letterSpacing: "-0.2px",
            }}
          >
            {children}
          </Link>
        </td>
      </tr>
    </table>
  );
}
