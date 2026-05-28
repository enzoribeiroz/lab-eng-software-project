# Roteiro de Gravação — Portal (Grupo ABE · Mackenzie 2026)

> **Duração:** 6 minutos  
> **Ferramentas:** OBS Studio ou Loom · 1080p · microfone externo

---

## Checklist pré-gravação

- [ ] `npm run dev` rodando em `http://localhost:3000`
- [ ] Conta de membro comum aprovada e conta de administrador prontas
- [ ] Eventos, atividades e oportunidades de exemplo já cadastrados
- [ ] Navegador maximizado, zoom 100%, barra de favoritos oculta
- [ ] Notificações do sistema silenciadas

---

## Parte 1 — Abertura `0:00–0:20`

**Tela:** slide com logo, nome do projeto e integrantes

> "Apresentamos o **Portal** — uma plataforma educacional white-label desenvolvida pelo Grupo ABE no Laboratório de Engenharia de Software da Mackenzie. O sistema foca em gestão de membros, ciclo de formação, ranking e, acima de tudo, **acessibilidade inclusiva** para pessoas surdas e neurodivergentes."

---

## Parte 2 — Landing Page `0:20–0:50`

**URL:** `http://localhost:3000`

> "Esta é a página pública. Ela apresenta os recursos da plataforma e oferece dois caminhos: a documentação ou o login."

**Ações:** rolar a página mostrando o hero, os cards de recursos (Eventos, Ranking, Ciclo de Formação, Oportunidades, Acessibilidade) e o CTA de documentação.

---

## Parte 3 — Autenticação `0:50–1:30`

**URL:** `/auth/register` → `/auth/login` → `/dashboard`

> "O cadastro coleta bio, telefone, redes sociais e avatar. A conta fica pendente até a aprovação de um administrador. Com a conta aprovada, o login redireciona direto para o dashboard."

**Ações:**
1. Mostrar o formulário de cadastro brevemente, destacando os campos
2. Fazer login com a conta de membro comum e aguardar o redirecionamento

---

## Parte 4 — Dashboard do Membro `1:30–3:30`

> "O dashboard reúne todos os módulos na sidebar. Vamos percorrê-los rapidamente."

### Início `/dashboard` `~10s`
Mostrar a sidebar e a visão geral da página inicial.

### Eventos `/dashboard/events` `~20s`
> "No módulo de Eventos, o membro se inscreve e adiciona o evento diretamente ao Google Calendar com um clique."

Abrir um evento, mostrar o botão de inscrição e a integração com Google Calendar.

### Ranking `/dashboard/ranking` `~20s`
> "O Ranking gamifica o engajamento. Membros acumulam pontos submetendo atividades; o leaderboard exibe os mais pontuados."

Mostrar o leaderboard e o formulário de submissão em `/dashboard/ranking/activities`.

### Ciclo de Formação `/dashboard/ciclo-formacao` `~25s`
> "O Ciclo de Formação estrutura o aprendizado em quatro níveis: Qualify, Associado I, Associado II e Associado Sênior — cada um com tarefas de link, arquivo ou imagem."

Mostrar os níveis, o progresso do membro e a visão de roadmap.

### Oportunidades `/dashboard/opportunities` `~15s`
> "As Oportunidades listam estágios, mentorias e cursos com link direto para inscrição."

Passar pelos cards rapidamente.

### Membros e Perfil `~10s`
Mostrar o diretório de membros e abrir o formulário de edição de perfil.

---

## Parte 5 — Painel Administrativo `3:30–4:20`

> Fazer logout → login com a conta de administrador

**URL:** `/dashboard/admin`

> "Board members têm acesso ao painel administrativo com controle total da plataforma."

**Ações — varredura rápida pelas sub-rotas:**

| Sub-rota | Destaque |
|----------|----------|
| `/admin/approve-members` | Aprovar ou rejeitar membros pendentes |
| `/admin/members` | Editar cargo, nível e pontos |
| `/admin/events` | Criar e editar eventos; controle de presença |
| `/admin/activities` | Criar atividades e aprovar submissões |
| `/admin/ciclo-formacao` | Gerenciar níveis e tarefas do ciclo |
| `/admin/opportunities` | Publicar oportunidades |

---

## Parte 6 — Acessibilidade `4:20–5:10`

> "A acessibilidade é o núcleo do Portal, não um recurso opcional."

### VLibras `~20s`
> "O widget VLibras — integração oficial do governo federal — traduz automaticamente o conteúdo em Português para LIBRAS em todas as páginas."

Ativar o widget e mostrar a tradução em funcionamento.

### Modo Neurodivergente `/dashboard/settings` `~20s`
> "O modo neurodivergente reduz animações, simplifica o layout e aumenta a previsibilidade visual para usuários autistas. A preferência persiste entre sessões."

Ativar o toggle e mostrar a diferença visual.

### Tema claro/escuro `~10s`
Usar o toggle da sidebar para alternar entre dark e light mode.

---

## Parte 7 — Documentação e Stack `5:10–5:45`

### Docs `/docs` `~20s`
> "A rota /docs renderiza a documentação acadêmica do projeto — TAP, Escopo, EAP, Cronograma, Requisitos e Personas — com exportação em PDF."

Abrir um documento e clicar em **Exportar PDF**.

### White-label e Stack `~15s`
> "Toda a identidade visual está centralizada em `lib/site-config.ts` — nome, logo e cores trocam sem tocar em componentes. O backend roda em Supabase com PostgreSQL e RLS; o deploy é contínuo na Vercel via GitHub Actions."

Mostrar rapidamente `lib/site-config.ts` no VS Code.

---

## Parte 8 — Encerramento `5:45–6:00`

**Tela:** slide final com nome do grupo, integrantes, link do repositório e link do deploy

> "O Portal entrega uma plataforma educacional completa, customizável e verdadeiramente acessível. Obrigado — Grupo ABE, Mackenzie 2025."

---

## Cola de ordem (referência rápida)

```
0:00  Abertura (slide)
0:20  Landing page
0:50  Cadastro → Login
1:30  Dashboard: Início → Eventos → Ranking → Ciclo → Oportunidades → Membros/Perfil
3:30  Logout → Login admin → Painel admin (approve, members, events, activities, ciclo, oportunidades)
4:20  Acessibilidade: VLibras → Modo neurodivergente → Tema
5:10  /docs + Exportar PDF → site-config.ts
5:45  Encerramento (slide)
```

---

*Portal — Plataforma Educacional Acessível · Grupo ABE · Mackenzie · 2025*
