"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function LandingHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in srgb, var(--brand-secondary) 60%, transparent)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo
          href="/"
          size="md"
          showText
          className="[&_span]:!text-white [&_span:last-child]:!text-white/80"
        />
        <nav className="flex items-center gap-4">
          <Link
            href="/docs"
            className="text-sm font-medium text-white/80 transition hover:text-white"
          >
            Documentação
          </Link>
          <Button
            asChild
            className="border-0 text-black hover:opacity-90"
            style={{ backgroundColor: "var(--brand-primary)", color: "#000" }}
          >
            <Link href="/auth/login">Entrar</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
