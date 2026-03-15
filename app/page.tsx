import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { siteConfig } from "@/lib/site-config"
import { LandingHeader } from "@/components/landing-header"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy, GraduationCap, Briefcase, Accessibility, FileText } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--brand-secondary)" }}>
      <LandingHeader />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Plataforma Educacional Acessível
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Plataforma web white-label para educação e formação, com gestão de membros,
              ciclo de aprendizagem, ranking e oportunidades.
            </p>
            <p className="mt-2 text-white/60">
              Foco central em <strong className="text-primary">acessibilidade inclusiva</strong>{" "}
              para pessoas surdas e neurodivergentes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="text-black" style={{ backgroundColor: "var(--brand-primary)" }}>
                <Link href="/docs">Ver documentação</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link href="/auth/login">Entrar</Link>
              </Button>
            </div>
          </section>

          {/* Features */}
          <section className="mt-20">
            <h2 className="text-center text-2xl font-bold text-white">
              Recursos principais
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Calendar, title: "Eventos", desc: "Gestão de eventos e presenças" },
                { icon: Trophy, title: "Ranking", desc: "Gamificação e atividades" },
                { icon: GraduationCap, title: "Ciclo de Formação", desc: "Níveis e progressão" },
                { icon: Briefcase, title: "Oportunidades", desc: "Vagas, estágios, mentorias" },
                { icon: Accessibility, title: "Acessibilidade", desc: "VLibras e modo neurodivergente" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-primary/30 hover:bg-white/10"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-3 font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-white/70">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Docs */}
          <section className="mt-20 rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-semibold text-white">
              Documentação de planejamento
            </h3>
            <p className="mt-2 text-white/70">
              TAP, cronograma, escopo, EAP, requisitos e modelagem. Foco em acessibilidade inclusiva.
            </p>
            <Button asChild className="mt-6 text-black" style={{ backgroundColor: "var(--brand-primary)" }}>
              <Link href="/docs">Acessar documentos</Link>
            </Button>
          </section>

          {/* Footer */}
          <footer className="mt-20 border-t border-white/10 pt-8 text-center">
            <p className="text-sm text-white/50">
              {siteConfig.siteName} © {new Date().getFullYear()} | {siteConfig.copyright}
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
