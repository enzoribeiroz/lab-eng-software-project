-- =============================================================================
-- DOMAIN: Core & Members
-- Profiles, institute areas, auth trigger, helper functions
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. PROFILES (extends auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT,
  board_role TEXT,
  development_level TEXT DEFAULT 'qualify',
  director_title TEXT,
  bio TEXT,
  phone TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  description TEXT,
  avatar_url TEXT,
  approved BOOLEAN DEFAULT false,
  total_points INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_profiles_approved ON public.profiles(approved);
CREATE INDEX idx_profiles_board_role ON public.profiles(board_role);
CREATE INDEX idx_profiles_development_level ON public.profiles(development_level);
CREATE INDEX idx_profiles_total_points ON public.profiles(total_points DESC);
CREATE INDEX idx_profiles_full_name ON public.profiles(full_name);

COMMENT ON TABLE public.profiles IS 'Member profiles extending auth.users';

-- -----------------------------------------------------------------------------
-- 2. MEMBER → INSTITUTE AREAS (many-to-many)
-- -----------------------------------------------------------------------------
CREATE TABLE public.member_institute_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  area TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(member_id, area)
);

ALTER TABLE public.member_institute_areas ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_member_institute_areas_member ON public.member_institute_areas(member_id);
CREATE INDEX idx_member_institute_areas_area ON public.member_institute_areas(area);

COMMENT ON TABLE public.member_institute_areas IS 'Institute areas each member participates in';

-- -----------------------------------------------------------------------------
-- 3. AUTH TRIGGER
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, approved)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Novo Membro'),
    false
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 4. HELPER: is_board_member (used by RLS)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_board_member()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND board_role IS NOT NULL
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_board_member() TO authenticated;

-- -----------------------------------------------------------------------------
-- 5. RLS POLICIES - PROFILES
-- -----------------------------------------------------------------------------
CREATE POLICY "profiles_select" ON public.profiles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

CREATE POLICY "profiles_delete_admin" ON public.profiles
  FOR DELETE TO authenticated USING (public.is_board_member());

-- -----------------------------------------------------------------------------
-- 6. RLS POLICIES - MEMBER INSTITUTE AREAS
-- -----------------------------------------------------------------------------
CREATE POLICY "member_institute_areas_select" ON public.member_institute_areas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "member_institute_areas_admin" ON public.member_institute_areas
  FOR ALL TO authenticated
  USING (public.is_board_member()) WITH CHECK (public.is_board_member());

-- Note: member_institute_areas.member_id references profiles (not auth.users)
