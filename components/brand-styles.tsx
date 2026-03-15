import { siteConfig } from "@/lib/site-config"

/**
 * Injects brand colors from site-config as CSS variables.
 * Applied to :root and .dark for both themes.
 */
export function BrandStyles() {
  const c = siteConfig.colors
  const css = `:root, .dark {
  --brand-primary: ${c.primary};
  --brand-secondary: ${c.secondary};
  --brand-tertiary: ${c.tertiary};
  --brand-gradient-end: ${c.gradientEnd};
  --brand-on-dark: ${c.onDark};
  --brand-primary-foreground: ${c.primaryForeground};
  --brand-card-border: ${c.cardBorder};
  --brand-avatar-bg: ${c.avatarBg};
}`

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}
