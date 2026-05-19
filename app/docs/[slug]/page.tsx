import { readFile } from "fs/promises"
import { notFound } from "next/navigation"
import path from "path"
import { DOCS_DIR, getDocBySlug } from "@/lib/docs-config"
import { MarkdownContent } from "@/components/docs/markdown-content"

export async function generateStaticParams() {
  const { getDocsList } = await import("@/lib/docs-config")
  const docs = getDocsList()
  return docs
    .filter((d) => d.slug !== "cronograma")
    .map((d) => ({ slug: d.slug }))
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const filePath = path.join(DOCS_DIR, `${doc.filename}.md`)
  const content = await readFile(filePath, "utf-8")

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8">
      <MarkdownContent content={content} />
    </div>
  )
}
