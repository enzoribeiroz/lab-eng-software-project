import { readdirSync } from "fs"
import path from "path"

export const DOCS_DIR = path.join(process.cwd(), "docs")

export interface DocEntry {
  slug: string
  title: string
  /** Filename without .md */
  filename: string
  description?: string
  icon?: string
}

/** Map of filename (without .md) → doc entry */
const DOC_META: Record<string, Omit<DocEntry, "filename">> = {
  "TAP-GDD1-Termo-de-Abertura": {
    slug: "tap",
    title: "TAP / GDD1 – Termo de Abertura",
    description: "Objetivos, escopo e critérios de sucesso. Foco em acessibilidade.",
    icon: "FileText",
  },
  "Cronograma-Gantt": {
    slug: "cronograma",
    title: "Cronograma (Gantt)",
    description: "Cronograma inicial com marcos, diagrama de Gantt e detalhamento das atividades.",
    icon: "Calendar",
  },
  "Declaracao-de-Escopo": {
    slug: "escopo",
    title: "Declaração de Escopo",
    description: "Escopo do produto, critérios de aceitação, entregáveis e glossário.",
    icon: "ClipboardList",
  },
  "EAP-WBS": {
    slug: "eap",
    title: "EAP / WBS",
    description: "Estrutura Analítica do Projeto com breakdown completo das tarefas.",
    icon: "FolderTree",
  },
  "Requisitos-Modelagem-Arquitetura": {
    slug: "requisitos",
    title: "Requisitos, Modelagem e Arquitetura",
    description: "Requisitos funcionais e não funcionais, DCU, DCL, diagramas e justificativa da arquitetura.",
    icon: "Layers",
  },
  README: {
    slug: "readme",
    title: "Visão Geral",
    description: "Documentação de planejamento – índice e recursos de acessibilidade.",
    icon: "BookOpen",
  },
}

/** slug → filename for dynamic route lookup */
export const SLUG_TO_FILENAME: Record<string, string> = Object.fromEntries(
  Object.entries(DOC_META).map(([fn, m]) => [m.slug, fn])
)

export function getDocsList(): DocEntry[] {
  const files = readdirSync(DOCS_DIR).filter((f) => f.endsWith(".md"))
  return files
    .map((f) => {
      const filename = f.replace(/\.md$/, "")
      const meta = DOC_META[filename]
      if (!meta) return null
      return { ...meta, filename }
    })
    .filter((x): x is DocEntry => x !== null)
}

export function getDocBySlug(slug: string): DocEntry | null {
  const filename = SLUG_TO_FILENAME[slug]
  if (!filename) return null
  const meta = DOC_META[filename]
  if (!meta) return null
  return { ...meta, filename }
}
