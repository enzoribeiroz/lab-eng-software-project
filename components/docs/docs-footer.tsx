import Link from "next/link"
import { Logo } from "@/components/logo"
import { siteConfig } from "@/lib/site-config"

export function DocsFooter() {
  return (
    <footer
      className="border-t border-white/10 px-4 py-12"
      style={{ backgroundColor: "var(--brand-secondary)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Logo
            href="/"
            size="md"
            showText
            className="[&_span]:text-white [&_span:last-child]:text-white/70"
          />
          <div className="flex items-center gap-6">
            <Link
              href="/auth/login"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Acessar o portal
            </Link>
          </div>
        </div>
        <div className="mt-8 flex justify-center border-t border-white/10 pt-8">
          <p className="text-sm text-white/60">
            {siteConfig.siteName} © {new Date().getFullYear()} |{" "}
            {siteConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
