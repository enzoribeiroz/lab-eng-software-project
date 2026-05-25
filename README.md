# Portal — Plataforma Educacional Acessível (White-Label)

Plataforma web white-label para educação e formação, com gestão de membros, ciclo de aprendizagem, ranking e oportunidades. **Foco central em acessibilidade inclusiva** para pessoas surdas (VLibras/LIBRAS) e neurodivergentes.

> Projeto acadêmico — Laboratório de Engenharia de Software — Universidade Presbiteriana Mackenzie  
> **Grupo ABE:** Arthur Silva Santana, Bruna Aguiar Muchiuti, Enzo Ribeiro, Thomas Pinheiro Grandin

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura e Stack](#arquitetura-e-stack)
- [Banco de Dados](#banco-de-dados)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração White-Label](#configuração-white-label)
- [Acessibilidade](#acessibilidade)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução Local](#instalação-e-execução-local)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Migrations do Banco de Dados](#migrations-do-banco-de-dados)
- [CI/CD](#cicd)
- [Documentação de Planejamento](#documentação-de-planejamento)
- [Licença](#licença)

---

## Visão Geral

O **Portal** é uma plataforma educacional customizável (white-label) voltada para institutos, associações e organizações de formação. Permite gerir membros, publicar eventos, acompanhar progresso formativo, divulgar oportunidades e gamificar o engajamento via ranking de pontos.

A acessibilidade não é um recurso secundário — é o **núcleo** da plataforma. A integração VLibras e o modo visual para autistas/neurodivergentes são entregas prioritárias, garantindo que qualquer instituição possa oferecer formação verdadeiramente inclusiva.

### Objetivos (SMART)

| # | Objetivo | Métrica de sucesso |
|---|----------|-------------------|
| 1 | Acessibilidade para surdos | VLibras integrado e funcional em todo o site |
| 2 | Acessibilidade para neurodivergentes | Modo visual (autistas/dautônicos) com previsibilidade e redução de estímulos |
| 3 | Conformidade WCAG | Lighthouse ≥ 90 em Acessibilidade |
| 4 | Gestão do ciclo de vida de membros | Cadastro, aprovação e participação automatizados |
| 5 | Ciclo de aprendizagem | Níveis, tarefas e progresso por membro |
| 6 | Ranking e oportunidades | Leaderboard e módulo de vagas em funcionamento |
| 7 | Implantação white-label | Plataforma customizável (logo, cores, textos) |

---

## Funcionalidades

### Autenticação e membros
- Cadastro com bio, telefone, LinkedIn, Instagram e avatar
- Fluxo de aprovação: novos membros aguardam aprovação do admin antes de acessar o dashboard
- Login, logout e recuperação/redefinição de senha
- Perfil editável pelo próprio membro

### Dashboard de membros
| Módulo | Descrição |
|--------|-----------|
| **Início** | Visão geral de atividades e próximos eventos |
| **Eventos** | Listagem, inscrição e integração com Google Calendar |
| **Ranking** | Leaderboard por pontos; submissão de atividades |
| **Ciclo de Formação** | Quatro níveis (Qualify → Associado Sênior) com tarefas e progresso |
| **Oportunidades** | Estágios, mentorias e cursos |
| **Membros** | Diretório do instituto |
| **Perfil** | Edição de dados pessoais |
| **Configurações** | Preferências de acessibilidade e tema |

### Painel administrativo (board members)
- CRUD completo de membros (aprovação, edição de cargo e nível)
- CRUD de eventos com controle de presença (check-in)
- CRUD de atividades com aprovação de submissões
- CRUD de ciclo de formação (níveis e tarefas)
- CRUD de oportunidades

### Integrações
- **Google Calendar** — adicionar eventos ao calendário pessoal
- **VLibras** — tradução automática Português → LIBRAS em todo o site (gov.br)

### Documentação integrada
- Seção `/docs` com renderização de markdown
- Exportação de documentos em PDF
- Cronograma Gantt, TAP, EAP, Personas, Requisitos e Arquitetura

---

## Arquitetura e Stack

```
┌─────────────────────────────────────────────┐
│              Next.js 15 (App Router)         │
│   React 19 · TypeScript · Tailwind CSS v4   │
├─────────────┬───────────────────────────────┤
│  shadcn/ui  │  Radix UI primitives           │
│  Recharts   │  Embla Carousel · Sonner       │
├─────────────┴───────────────────────────────┤
│            Supabase                          │
│  Auth (email/password) · PostgreSQL · RLS   │
│  Storage (avatars, imagens)                 │
├─────────────────────────────────────────────┤
│  Vercel (deploy) · GitHub Actions (CI/CD)   │
└─────────────────────────────────────────────┘
```

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15 (App Router, React Server Components) |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS v4 + tw-animate-css |
| Componentes UI | shadcn/ui · Radix UI · Lucide React |
| Formulários | React Hook Form + Zod |
| Gráficos | Recharts |
| Datas | date-fns |
| Markdown | react-markdown + remark-gfm |
| PDF | html2pdf.js |
| Backend/DB | Supabase (PostgreSQL + Auth + Storage) |
| Deploy | Vercel |
| CI | GitHub Actions |

---

## Banco de Dados

O schema é composto por 4 domínios aplicados via migrations:

### Domínio 1 — Core & Members
| Tabela | Descrição |
|--------|-----------|
| `profiles` | Estende `auth.users` com dados do membro (bio, cargo, pontos, aprovação) |
| `member_institute_areas` | Áreas do instituto nas quais o membro participa (many-to-many) |

### Domínio 2 — Engagement
| Tabela | Descrição |
|--------|-----------|
| `events` | Eventos do instituto com integração Google Calendar |
| `event_attendance` | Inscrições e check-in de presença em eventos |
| `activities` | Atividades para ganho de pontos |
| `activity_participation` | Submissões de membros aguardando aprovação |

### Domínio 3 — Content & Training
| Tabela | Descrição |
|--------|-----------|
| `opportunities` | Estágios, mentorias e cursos |
| `training_cycle_levels` | Níveis do ciclo: Qualify, Associado I, Associado II, Associado Sênior |
| `training_cycle_tasks` | Tarefas por nível (link, arquivo ou imagem) |
| `member_training_progress` | Progresso individual por tarefa |

### Domínio 4 — Storage & RPCs
Funções auxiliares RPC e configuração de Storage (avatars e imagens de eventos).

**Row Level Security (RLS)** está ativo em todas as tabelas. Membros comuns acessam apenas seus próprios dados; `board_role IS NOT NULL` concede permissões administrativas via função `is_board_member()`.

---

## Estrutura do Projeto

```
portal/
├── app/
│   ├── actions/            # Server Actions (Next.js)
│   ├── api/                # Route Handlers (Google Calendar)
│   ├── auth/               # Login, cadastro, recuperação de senha
│   ├── cronograma/         # Página pública do cronograma
│   ├── dashboard/          # Área privada do membro
│   │   ├── admin/          # Painel administrativo
│   │   ├── ciclo-formacao/ # Ciclo de aprendizagem
│   │   ├── events/         # Eventos
│   │   ├── members/        # Diretório de membros
│   │   ├── opportunities/  # Oportunidades
│   │   ├── profile/        # Perfil
│   │   ├── ranking/        # Ranking e atividades
│   │   └── settings/       # Configurações
│   ├── docs/               # Documentação renderizada em Markdown
│   └── public/             # Páginas públicas (eventos)
├── components/
│   ├── ui/                 # Componentes base (shadcn/ui)
│   ├── docs/               # Componentes do módulo de docs
│   └── landing/            # Componentes da landing page
├── lib/
│   ├── supabase/           # Cliente Supabase (server, client, middleware)
│   ├── site-config.ts      # Configuração white-label (nome, cores, logo, links)
│   ├── docs-config.ts      # Configuração do módulo de documentos
│   ├── google-calendar.ts  # Integração Google Calendar
│   └── ciclo-formacao/     # Tipos, dados e utilitários do ciclo
├── supabase/
│   └── migrations/         # SQL migrations (4 domínios)
├── docs/                   # Documentos de planejamento (Markdown)
├── hooks/                  # React hooks customizados
├── public/                 # Assets estáticos
└── .github/workflows/      # CI e CD (GitHub Actions)
```

---

## Configuração White-Label

Toda a identidade visual e textual da plataforma é centralizada em **`lib/site-config.ts`**:

```ts
export const siteConfig = {
  siteName: "Portal",                    // Nome exibido
  siteDescription: "...",               // Subtítulo / meta description
  organizationName: "",                  // Subtítulo do logo
  logoUrl: "",                           // Caminho em /public ou URL externa

  menuLinks: [...],                      // Links e ícones da sidebar

  colorSchemes: {
    default: { primary: "#FFD700", secondary: "#001f3f", ... },
    light:   { primary: "#10b981", secondary: "#064e3b", ... },
  },
  activeColorScheme: "default",          // Trocar esquema de cores aqui

  socialLinks: [...],                    // Instagram, LinkedIn, etc.
  contact: { address, phone, email },
  footerLinks: [...],
  copyright: "Todos os direitos reservados",
}
```

Para alterar a identidade visual, edite apenas esse arquivo — sem tocar nos componentes.

---

## Acessibilidade

### VLibras
Widget oficial do governo brasileiro para tradução automática de conteúdo em Português para LIBRAS (Língua Brasileira de Sinais). Ativo em todas as páginas do site via `VLibrasWidget` component.

### Modo Neurodivergente
Toggle global que reduz animações, simplifica o layout e aumenta a previsibilidade visual — projetado para usuários autistas e dautônicos. A preferência é persistida entre sessões.

### Metas de conformidade
- WCAG 2.1 nível AA
- Lighthouse Acessibilidade ≥ 90

---

## Pré-requisitos

- **Node.js** 22+
- **npm** (ou **pnpm**)
- Conta no [Supabase](https://supabase.com) (gratuita)
- Conta na [Vercel](https://vercel.com) (opcional — para deploy)

---

## Instalação e Execução Local

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd portal

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
# Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Execute o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`.

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção local |
| `npm run lint` | Verificação de lint (ESLint) |

---

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Obrigatório — Supabase
# Acesse: Dashboard → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Opcional — operações admin no servidor
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no frontend. Ela concede acesso total ao banco, bypassando RLS.

---

## Migrations do Banco de Dados

As migrations estão em `supabase/migrations/` e devem ser aplicadas em ordem:

```bash
# Via Supabase CLI (recomendado)
supabase db push

# Ou manualmente no SQL Editor do dashboard Supabase
# Aplicar na ordem numérica dos arquivos:
# 20250101000000_01_core_members.sql
# 20250101000001_02_engagement.sql
# 20250101000002_03_content_training.sql
# 20250101000003_04_storage_rpcs.sql
# 20250116000000_fix_profiles_grants.sql
```

Consulte `supabase/README.md` para instruções detalhadas de setup do banco.

---

## CI/CD

### CI (Integração Contínua)
`.github/workflows/ci.yml` — executa em todo push e pull request para `main`:
1. Checkout do código
2. Setup Node.js 22 com cache npm
3. `npm ci`
4. `npm run build` (com variáveis de ambiente de placeholder para validação)

### CD (Deploy Contínuo)
`.github/workflows/deploy.yml` — deploy manual via webhook da Vercel.

O projeto é hospedado na **Vercel** com deploy automático a partir da branch `main`.

---

## Documentação de Planejamento

A documentação acadêmica do projeto está em `docs/` e é acessível também pela rota `/docs` da aplicação:

| Documento | Descrição |
|-----------|-----------|
| `TAP-GDD1-Termo-de-Abertura.md` | Termo de Abertura do Projeto |
| `Declaracao-de-Escopo.md` | Declaração de Escopo |
| `EAP-WBS.md` | Estrutura Analítica do Projeto (EAP / WBS) |
| `Cronograma-Gantt.md` | Cronograma detalhado (Gantt) |
| `Requisitos-Modelagem-Arquitetura.md` | Requisitos, diagramas e arquitetura |
| `Personas.md` | Personas dos usuários |
| `vlibras_dev_guide.md` | Guia de desenvolvimento VLibras |

---

## Licença

Este projeto está licenciado sob a **MIT License** — consulte o arquivo [LICENSE](LICENSE) para detalhes.

---

*Portal — Plataforma Educacional Acessível · Grupo ABE · Mackenzie · 2025*
