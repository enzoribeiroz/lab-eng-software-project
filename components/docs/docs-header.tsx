"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function DocsHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in srgb, var(--brand-secondary) 60%, transparent)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo
          href="/docs"
          size="md"
          showText
          className="[&_span]:!text-white [&_span:last-child]:!text-white/80"
        />
        <Button
          asChild
          className="text-black"
          style={{ backgroundColor: "var(--brand-primary)" }}
        >
          <Link href="/auth/login">Entrar</Link>
        </Button>
      </div>
    </header>
  )
}
