# Personas
## Plataforma Educacional Acessível (White-Label)

| Versão | Data | Grupo ABE |
|--------|------|-----------|
| 1.0 | 23/03/2025 | Arthur Silva Santana, Bruna Aguiar Muchiuti, Enzo Ribeiro, Thomas Pinheiro Grandin |

---

## Visão Geral

As personas abaixo representam os principais perfis de usuário da plataforma, com foco especial em **acessibilidade inclusiva**. Elas norteiam decisões de DCU (Design Centrado no Usuário) e garantem que o produto atenda pessoas surdas, neurodivergentes, membros comuns e administradores.

---

## Personas

### 1. Maria – Persona Surda (Usuária de LIBRAS)

| Campo | Descrição |
|-------|-----------|
| **Nome** | Maria |
| **Idade** | 28 anos |
| **Perfil** | Surda, usuária de LIBRAS como primeira língua |
| **Contexto** | Estudante ou profissional em formação. Usa o computador e o celular com frequência. Prefere conteúdos visuais e em LIBRAS. |
| **Necessidades** | Acesso a todas as informações da plataforma em LIBRAS. O texto em português escrito pode ser difícil; a tradução visual (LIBRAS) é essencial. |
| **Objetivos na plataforma** | Participar de eventos, acompanhar o ciclo de formação, ver oportunidades e manter-se integrada à comunidade. |
| **Frustrações** | Sites sem suporte a LIBRAS, vídeos sem legendas ou interpretação, fluxos que dependem apenas de texto. |
| **Soluções na plataforma** | Integração do **VLibras** (widget gov.br) em todo o site para tradução de textos em LIBRAS. |

---

### 2. João – Persona Neurodivergente (Autista/Dautônico)

| Campo | Descrição |
|-------|-----------|
| **Nome** | João |
| **Idade** | 22 anos |
| **Perfil** | Autista/dautônico, sensível a estímulos visuais e sonoros excessivos |
| **Contexto** | Membro ativo, mas evita interfaces com muitas animações, cores fortes e mudanças bruscas. Prefere layouts previsíveis e calmos. |
| **Necessidades** | Interface com menos animações, transições suaves (ou desativadas), contraste adequado e navegação previsível. |
| **Objetivos na plataforma** | Acessar o dashboard, ver eventos, ranking e oportunidades sem sobrecarga sensorial. |
| **Frustrações** | Animações excessivas, elementos que aparecem/somem inesperadamente, layout instável. |
| **Soluções na plataforma** | **Modo visual acessível** (toggle global) que reduz animações, simplifica o layout e prioriza previsibilidade. Preferência persistente entre sessões (RNF02). |

---

### 3. Ana – Persona Membro

| Campo | Descrição |
|-------|-----------|
| **Nome** | Ana |
| **Idade** | 25 anos |
| **Perfil** | Membro aprovada da plataforma; participa de eventos, atividades e ciclo de formação |
| **Contexto** | Busca crescimento profissional, networking e aproveitar oportunidades (estágios, mentorias, cursos). |
| **Necessidades** | Acesso fácil a eventos, ranking, ciclo de formação e oportunidades. Gerenciar perfil (bio, redes, avatar) e acompanhar seu progresso. |
| **Objetivos na plataforma** | Inscrever-se em eventos, submeter atividades para o ranking, acompanhar o ciclo de aprendizagem e encontrar estágios/mentorias. |
| **Frustrações** | Fluxos confusos, falta de feedback sobre aprovação, dificuldade em encontrar informações. |
| **Jornada típica** | Cadastro → Aguarda aprovação → Acessa dashboard → Eventos e atividades → Ranking → Oportunidades |

---

### 4. Carlos – Persona Administrador

| Campo | Descrição |
|-------|-----------|
| **Nome** | Carlos |
| **Idade** | 35 anos |
| **Perfil** | Administrador da plataforma; responsável por gestão de membros, eventos e conteúdo |
| **Contexto** | Coordenador ou gestor da organização. Precisa de eficiência para aprovar membros, criar eventos, registrar presenças e gerenciar o ciclo de formação. |
| **Necessidades** | Painel administrativo completo: aprovar membros, criar/editar eventos, gerenciar presenças, atividades, ciclo e oportunidades. |
| **Objetivos na plataforma** | Manter a comunidade organizada, garantir qualidade dos eventos e do conteúdo, e ter visão geral do engajamento. |
| **Frustrações** | Ferramentas fragmentadas, falta de visão consolidada, processos manuais demorados. |

---

## Resumo das Personas por Função

| Persona | Função | Acessibilidade prioritária |
|---------|--------|----------------------------|
| Maria | Visitante / Membro | VLibras (LIBRAS) |
| João | Visitante / Membro | Modo visual acessível |
| Ana | Membro | Usabilidade geral, jornada clara |
| Carlos | Admin | Eficiência no painel administrativo |

---

## Uso no Design

Essas personas orientam:

- **Requisitos funcionais**: RF01 (VLibras), RF02 (Modo acessível), RF05 (Aprovação), RF07–RF12 (Funcionalidades por perfil)
- **Casos de uso**: Visitante (Maria, João), Membro (Ana), Admin (Carlos)
- **Testes de usabilidade**: Cenários específicos por persona
- **Priorização**: Features que impactam Maria e João têm alta prioridade (acessibilidade inclusiva)
