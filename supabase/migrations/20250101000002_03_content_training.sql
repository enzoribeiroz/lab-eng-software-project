-- =============================================================================
-- DOMAIN: Content & Training
-- Opportunities, Ciclo de Formação (training cycle)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. OPPORTUNITIES
-- -----------------------------------------------------------------------------
CREATE TABLE public.opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  link TEXT,
  opportunity_type TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_opportunities_active ON public.opportunities(is_active);
CREATE INDEX idx_opportunities_created_at ON public.opportunities(created_at DESC);

COMMENT ON TABLE public.opportunities IS 'Stages, mentorship, courses';

-- -----------------------------------------------------------------------------
-- 2. TRAINING CYCLE LEVELS
-- -----------------------------------------------------------------------------
CREATE TABLE public.training_cycle_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. TRAINING CYCLE TASKS
-- -----------------------------------------------------------------------------
CREATE TABLE public.training_cycle_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id UUID NOT NULL REFERENCES public.training_cycle_levels(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT NOT NULL CHECK (task_type IN ('link', 'file', 'image')),
  content_url TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. MEMBER TRAINING PROGRESS
-- -----------------------------------------------------------------------------
CREATE TABLE public.member_training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.training_cycle_tasks(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ,
  submitted_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, task_id)
);

ALTER TABLE public.training_cycle_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_cycle_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_training_progress ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_training_tasks_level ON public.training_cycle_tasks(level_id);
CREATE INDEX idx_member_progress_member ON public.member_training_progress(member_id);
CREATE INDEX idx_member_progress_task ON public.member_training_progress(task_id);

-- Seed default levels
INSERT INTO public.training_cycle_levels (name, slug, description, order_index) VALUES
  ('Qualify', 'qualify', 'Etapa inicial de formação - conhecendo o IFL e seus valores', 0),
  ('Associado I', 'associado_i', 'Desenvolvimento das competências básicas de liderança', 1),
  ('Associado II', 'associado_ii', 'Aprofundamento em gestão de times e projetos', 2),
  ('Associado Sênior', 'associado_senior', 'Mentoria, estratégia e desenvolvimento de líderes', 3)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 5. RLS POLICIES - OPPORTUNITIES
-- -----------------------------------------------------------------------------
CREATE POLICY "opportunities_select_active" ON public.opportunities
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "opportunities_select_admin" ON public.opportunities
  FOR SELECT TO authenticated USING (public.is_board_member());

CREATE POLICY "opportunities_admin" ON public.opportunities
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

-- -----------------------------------------------------------------------------
-- 6. RLS POLICIES - TRAINING CYCLE
-- -----------------------------------------------------------------------------
CREATE POLICY "training_levels_select" ON public.training_cycle_levels
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "training_levels_admin" ON public.training_cycle_levels
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

CREATE POLICY "training_tasks_select" ON public.training_cycle_tasks
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "training_tasks_admin" ON public.training_cycle_tasks
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

CREATE POLICY "member_progress_select_own" ON public.member_training_progress
  FOR SELECT TO authenticated USING (auth.uid() = member_id);

CREATE POLICY "member_progress_insert_own" ON public.member_training_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = member_id);

CREATE POLICY "member_progress_update_own" ON public.member_training_progress
  FOR UPDATE TO authenticated USING (auth.uid() = member_id);

CREATE POLICY "member_progress_admin" ON public.member_training_progress
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());
