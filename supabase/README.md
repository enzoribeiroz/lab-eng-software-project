# Supabase Integration

## New Project Setup

1. **Get credentials** from Supabase Dashboard → Project Settings → API
2. **Copy** `.env.example` → `.env` and fill in `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Link & push**: `supabase link --project-ref YOUR_PROJECT_REF` then `supabase db push`
4. **Auth URLs**: Dashboard → Authentication → URL Configuration → add redirect URLs
5. **First admin**: Sign up via app, then Configurações → Administração → "Criar primeiro administrador"

---

## Schema Overview (Domain-Based)

Migrations are organized by domain:

| Migration | Domain | Tables |
|-----------|--------|--------|
| `01_core_members` | Core | `profiles`, `member_institute_areas` |
| `02_engagement` | Engagement | `event_statuses`, `events`, `event_attendance`, `activities`, `activity_participation` |
| `03_content_training` | Content & Training | `opportunities`, `training_cycle_levels`, `training_cycle_tasks`, `member_training_progress` |
| `04_storage_rpcs` | Infra | Storage buckets, `promote_to_admin`, `create_first_admin` |

### Naming Conventions

- **member_id** (not user_id): All member references use `member_id` → `profiles(id)`
- **FKs** point to `profiles(id)` for domain consistency

### Storage Buckets

- `event-images` – Event and activity images (public)
- `profile-images` – Avatars (public)

### RLS & Admin

- Admins: `profiles.board_role IS NOT NULL`
- `is_board_member()` (SECURITY DEFINER) used in policies

### Applying Migrations

**New empty project:**
```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

**If remote has old migrations**, repair and push:
```bash
supabase migration repair --status reverted 20250102000000
supabase migration repair --status reverted 20250101000000
supabase db push
```
