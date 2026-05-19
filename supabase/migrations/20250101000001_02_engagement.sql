-- =============================================================================
-- DOMAIN: Engagement
-- Events, registrations, activities, activity submissions
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. EVENT STATUS (lookup)
-- -----------------------------------------------------------------------------
CREATE TABLE public.event_statuses (
  id TEXT PRIMARY KEY,
  label_pt TEXT NOT NULL
);

INSERT INTO public.event_statuses (id, label_pt) VALUES
  ('scheduled', 'Agendado'),
  ('ongoing', 'Em Andamento'),
  ('completed', 'Concluído'),
  ('cancelled', 'Cancelado');

ALTER TABLE public.event_statuses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "event_statuses_select" ON public.event_statuses FOR SELECT TO authenticated USING (true);

-- -----------------------------------------------------------------------------
-- 2. EVENTS
-- -----------------------------------------------------------------------------
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  points_value INT NOT NULL DEFAULT 0,
  max_participants INT,
  image_url TEXT,
  google_calendar_event_id TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_events_event_date ON public.events(event_date);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_events_created_by ON public.events(created_by);

COMMENT ON TABLE public.events IS 'Institute events';

-- -----------------------------------------------------------------------------
-- 3. EVENT ATTENDANCE (registrations + attendance tracking)
-- -----------------------------------------------------------------------------
CREATE TABLE public.event_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  attended BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  points_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, member_id)
);

ALTER TABLE public.event_attendance ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_event_attendance_event ON public.event_attendance(event_id);
CREATE INDEX idx_event_attendance_member ON public.event_attendance(member_id);

COMMENT ON TABLE public.event_attendance IS 'Event sign-ups and attendance';

-- -----------------------------------------------------------------------------
-- 4. ACTIVITIES
-- -----------------------------------------------------------------------------
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  activity_type TEXT NOT NULL,
  points_value INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_activities_created_at ON public.activities(created_at DESC);

COMMENT ON TABLE public.activities IS 'Engagement activities for points';

-- -----------------------------------------------------------------------------
-- 5. ACTIVITY PARTICIPATION (member submissions for approval)
-- -----------------------------------------------------------------------------
CREATE TABLE public.activity_participation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notes TEXT,
  image_url TEXT,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  points_earned INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activity_participation ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_activity_participation_activity ON public.activity_participation(activity_id);
CREATE INDEX idx_activity_participation_member ON public.activity_participation(member_id);

COMMENT ON TABLE public.activity_participation IS 'Activity submissions awaiting approval';

-- -----------------------------------------------------------------------------
-- 6. RLS POLICIES - EVENTS
-- -----------------------------------------------------------------------------
CREATE POLICY "events_select" ON public.events
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "events_admin" ON public.events
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

-- -----------------------------------------------------------------------------
-- 7. RLS POLICIES - EVENT ATTENDANCE
-- -----------------------------------------------------------------------------
CREATE POLICY "event_attendance_select" ON public.event_attendance
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "event_attendance_insert_own" ON public.event_attendance
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = member_id);

CREATE POLICY "event_attendance_delete_own" ON public.event_attendance
  FOR DELETE TO authenticated USING (auth.uid() = member_id);

CREATE POLICY "event_attendance_admin" ON public.event_attendance
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

-- -----------------------------------------------------------------------------
-- 8. RLS POLICIES - ACTIVITIES
-- -----------------------------------------------------------------------------
CREATE POLICY "activities_select" ON public.activities
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "activities_admin" ON public.activities
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

-- -----------------------------------------------------------------------------
-- 9. RLS POLICIES - ACTIVITY PARTICIPATION
-- -----------------------------------------------------------------------------
CREATE POLICY "activity_participation_select_own" ON public.activity_participation
  FOR SELECT TO authenticated USING (auth.uid() = member_id);

CREATE POLICY "activity_participation_select_admin" ON public.activity_participation
  FOR SELECT TO authenticated USING (public.is_board_member());

CREATE POLICY "activity_participation_insert_own" ON public.activity_participation
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = member_id);

CREATE POLICY "activity_participation_admin" ON public.activity_participation
  FOR UPDATE TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

CREATE POLICY "activity_participation_delete_admin" ON public.activity_participation
  FOR DELETE TO authenticated USING (public.is_board_member());
