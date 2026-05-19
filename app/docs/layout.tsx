import { DocsLayout } from "@/components/docs/docs-layout"
import { getDocsList } from "@/lib/docs-config"

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const docs = getDocsList()
  return <DocsLayout docs={docs}>{children}</DocsLayout>
}
