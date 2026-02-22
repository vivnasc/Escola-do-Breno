-- PITCH — Profile Sharing Schema
-- Allows families to share a child's profile with therapists/educators.
-- Flow: family creates share code → therapist enters code → linked access.

-- ============================================
-- Profile shares: who shared what with whom
-- ============================================
create table if not exists profile_shares (
  id uuid primary key default gen_random_uuid(),

  -- The user who owns and shares the profile
  owner_id uuid references auth.users(id) on delete cascade not null,

  -- 6-character alphanumeric share code (human-friendly, case-insensitive)
  share_code text unique not null,

  -- The local profile ID from the owner's device
  profile_id text not null,

  -- Snapshot of the shared profile (kept in sync by the owner's app)
  profile_data jsonb not null default '{}'::jsonb,

  -- Snapshot of the shared progress (kept in sync by the owner's app)
  progress_data jsonb not null default '{}'::jsonb,

  -- The user who accepted the share (null until accepted)
  shared_with_id uuid references auth.users(id) on delete set null,

  -- Role of the recipient: 'therapist', 'family', 'teacher'
  role text not null default 'therapist',

  -- Status: 'pending' (code generated), 'accepted' (linked), 'revoked' (owner cancelled)
  status text not null default 'pending',

  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  updated_at timestamptz not null default now(),

  -- One share code per profile per owner (prevent duplicates)
  unique(owner_id, profile_id)
);

-- Row Level Security
alter table profile_shares enable row level security;

-- Owner can read their own shares
create policy "Owners can read own shares"
  on profile_shares for select
  using (auth.uid() = owner_id);

-- Recipients can read shares linked to them
create policy "Recipients can read accepted shares"
  on profile_shares for select
  using (auth.uid() = shared_with_id);

-- Anyone authenticated can read by share_code (to accept an invite)
create policy "Anyone can read by share code"
  on profile_shares for select
  using (status = 'pending');

-- Owner can create shares
create policy "Owners can create shares"
  on profile_shares for insert
  with check (auth.uid() = owner_id);

-- Owner can update their shares (push data, revoke)
create policy "Owners can update own shares"
  on profile_shares for update
  using (auth.uid() = owner_id);

-- Recipients can accept (update shared_with_id)
create policy "Recipients can accept shares"
  on profile_shares for update
  using (status = 'pending')
  with check (auth.uid() = shared_with_id);

-- Owner can delete their shares
create policy "Owners can delete own shares"
  on profile_shares for delete
  using (auth.uid() = owner_id);

-- Indexes
create index if not exists idx_profile_shares_owner on profile_shares(owner_id);
create index if not exists idx_profile_shares_recipient on profile_shares(shared_with_id);
create index if not exists idx_profile_shares_code on profile_shares(share_code);

-- Auto-update timestamp
create trigger profile_shares_updated_at
  before update on profile_shares
  for each row
  execute function update_updated_at();
