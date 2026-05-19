-- =============================================================================
-- DOMAIN: Storage & RPCs
-- Storage buckets, admin RPCs
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. STORAGE BUCKETS
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('event-images', 'event-images', true),
  ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO NOTHING;

-- event-images: events and activity submission images
CREATE POLICY "event_images_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'event-images');

CREATE POLICY "event_images_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'event-images');

CREATE POLICY "event_images_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'event-images');

-- profile-images: avatars
CREATE POLICY "profile_images_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'profile-images');

CREATE POLICY "profile_images_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'profile-images');

CREATE POLICY "profile_images_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'profile-images');

-- -----------------------------------------------------------------------------
-- 2. ADMIN RPCs
-- -----------------------------------------------------------------------------

-- Promote a user to admin (callable only by existing board members)
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT, new_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_board_member() THEN
    RAISE EXCEPTION 'Apenas administradores podem promover usuários';
  END IF;

  UPDATE public.profiles
  SET board_role = new_role, updated_at = NOW()
  WHERE LOWER(email) = LOWER(user_email);

  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION public.promote_to_admin(TEXT, TEXT) TO authenticated;

-- Create first admin when no board members exist
CREATE OR REPLACE FUNCTION public.create_first_admin(user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_count INT;
BEGIN
  SELECT COUNT(*) INTO admin_count
  FROM public.profiles
  WHERE board_role IS NOT NULL;

  IF admin_count > 0 THEN
    RAISE EXCEPTION 'Já existem administradores. Use promover usuário.';
  END IF;

  UPDATE public.profiles
  SET board_role = 'Diretor', updated_at = NOW()
  WHERE LOWER(email) = LOWER(user_email);

  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_first_admin(TEXT) TO authenticated;
