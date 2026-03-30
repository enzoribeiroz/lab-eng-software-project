-- =============================================================================
-- FIX: Grant table-level access to authenticated role
-- RLS policies only apply AFTER the role has base table privileges.
-- Without these grants, "permission denied for table profiles" occurs.
-- =============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.member_institute_areas TO authenticated;
