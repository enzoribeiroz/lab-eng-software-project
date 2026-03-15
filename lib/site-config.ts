/**
 * White-label setup – customize branding for your organization.
 * Edit this file to change colors, organization name, logo, and social links.
 */

export const siteConfig = {
  // ─── Organization ─────────────────────────────────────────────────────
  /** Display name of the platform */
  siteName: "Portal",
  /** Short tagline (used in metadata, auth pages) */
  siteDescription: "Plataforma de membros e gestão",
  /** Organization name (shown as logo subtitle when set) */
  organizationName: "",

  // ─── Logo ───────────────────────────────────────────────────────────────
  /** Logo URL – image path in /public or external URL. Empty = use icon only */
  logoUrl: "",

  // ─── Menu / Navigation ──────────────────────────────────────────────────
  /** Main sidebar/header links. Icon: Home, Calendar, Trophy, Users, GraduationCap, Briefcase, Settings */
  menuLinks: [
    { href: "/dashboard", label: "Início", icon: "Home" },
    { href: "/dashboard/events", label: "Eventos", icon: "Calendar" },
    { href: "/dashboard/ranking", label: "Ranking", icon: "Trophy" },
    { href: "/dashboard/ciclo-formacao", label: "Ciclo de Formação", icon: "GraduationCap" },
    { href: "/dashboard/opportunities", label: "Oportunidades", icon: "Briefcase" },
    { href: "/dashboard/members", label: "Membros", icon: "Users" },
  ] as { href: string; label: string; icon: string }[],

  // ─── Color schema ────────────────────────────────────────────────────────
  /** All frontend colors – customize here; injected as CSS variables */
  colors: {
    /** Primary accent (buttons, highlights, icons) */
    primary: "#FFD700",
    /** Secondary / background (header, footer, sidebar, nav) */
    secondary: "#001f3f",
    /** Tertiary (gradient middle) */
    tertiary: "#003366",
    /** Gradient end (auth/dashboard backgrounds) */
    gradientEnd: "#000000",
    /** Text on dark backgrounds (nav, docs) */
    onDark: "#ffffff",
    /** Primary foreground (text on primary buttons) */
    primaryForeground: "#000000",
    /** Card border in dark mode */
    cardBorder: "#FFD70033",
    /** Avatar fallback background */
    avatarBg: "#FFD700",
  },

  // ─── Social media ──────────────────────────────────────────────────────
  socialLinks: [
    // { href: "https://instagram.com/yourorg", label: "Instagram" },
    // { href: "https://facebook.com/yourorg", label: "Facebook" },
    // { href: "https://linkedin.com/company/yourorg", label: "LinkedIn" },
    // { href: "https://youtube.com/@yourorg", label: "YouTube" },
  ] as { href: string; label: string }[],

  // ─── Contact ────────────────────────────────────────────────────────────
  contact: {
    address: "",
    phone: "",
    email: "",
  },

  // ─── Footer ─────────────────────────────────────────────────────────────
  /** Custom footer links */
  footerLinks: [] as { href: string; label: string; external?: boolean }[],
  /** Copyright line */
  copyright: "Todos os direitos reservados",
}
