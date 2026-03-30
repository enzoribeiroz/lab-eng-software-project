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

  // ─── Color schemas ───────────────────────────────────────────────────────
  /** Available color schemes. Set activeColorScheme to switch. */
  colorSchemes: {
    /** Gold/navy – corporate, premium */
    default: {
      primary: "#FFD700",
      secondary: "#001f3f",
      tertiary: "#003366",
      gradientEnd: "#000000",
      onDark: "#ffffff",
      primaryForeground: "#000000",
      cardBorder: "#FFD70033",
      avatarBg: "#FFD700",
    },
    /** Emerald/teal – fresh, natural */
    light: {
      primary: "#10b981",
      secondary: "#064e3b",
      tertiary: "#047857",
      gradientEnd: "#022c22",
      onDark: "#ecfdf5",
      primaryForeground: "#ffffff",
      cardBorder: "#10b98133",
      avatarBg: "#10b981",
    },
  },
  /** Active schema key: "default" | "light" */
  activeColorScheme: "default" as "default" | "light",
  /** Resolved colors (active schema) – used by BrandStyles */
  get colors() {
    return this.colorSchemes[this.activeColorScheme]
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
