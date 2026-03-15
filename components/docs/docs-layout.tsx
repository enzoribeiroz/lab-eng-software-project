"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DocsHeader } from "@/components/docs/docs-header"
import { DocsFooter } from "@/components/docs/docs-footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  FileText,
  Calendar,
  ClipboardList,
  FolderTree,
  Layers,
  BookOpen,
} from "lucide-react"
import { ExportPdfButton } from "./export-pdf-button"
import type { DocEntry } from "@/lib/docs-config"

const ICON_MAP = {
  FileText,
  Calendar,
  ClipboardList,
  FolderTree,
  Layers,
  BookOpen,
} as const

function getNavItems(docs: DocEntry[]) {
  return [
    { href: "/docs", label: "Índice", icon: FileText },
    ...docs.map((d) => ({
      href: `/docs/${d.slug}`,
      label: d.title,
      icon: ICON_MAP[d.icon as keyof typeof ICON_MAP] ?? FileText,
    })),
  ]
}

export function DocsLayout({
  children,
  docs,
}: {
  children: React.ReactNode
  docs: DocEntry[]
}) {
  const docNavItems = getNavItems(docs)
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--brand-secondary)" }}>
      <DocsHeader />
      <div className="pt-24 pb-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
          {/* Sidebar - mobile: horizontal scroll, desktop: sticky sidebar */}
          <aside className="shrink-0 lg:w-56">
            <div className="flex flex-col gap-3 lg:hidden">
              <div className="flex gap-2 overflow-x-auto [&>a]:shrink-0">
                {docNavItems.map((item) => (
                  <DocsNavLink key={item.href} href={item.href} icon={item.icon}>
                    {item.label}
                  </DocsNavLink>
                ))}
              </div>
              <ExportPdfButton className="shrink-0" />
            </div>
            <div className="hidden lg:block">
            <div className="sticky top-28 space-y-1 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
                Documentos
              </p>
              {docNavItems.map((item) => (
                <DocsNavLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </DocsNavLink>
              ))}
              <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                <ExportPdfButton className="w-full justify-center" />
                <Button asChild variant="ghost" size="sm" className="w-full justify-start text-white/70 hover:text-white">
                  <Link href="/auth/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Entrar
                  </Link>
                </Button>
              </div>
            </div>
            </div>
          </aside>
          <main id="doc-content" className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <DocsFooter />
    </div>
  )
}

function DocsNavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/docs" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
        isActive
          ? "bg-primary/20 text-primary"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {children}
    </Link>
  )
}
