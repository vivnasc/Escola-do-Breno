-- PITCH — Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- Enable Row Level Security on all tables
-- Each user can only access their own data

-- ============================================
-- User data: profiles + progress in one place
-- ============================================
create table if not exists user_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  profiles jsonb not null default '[]'::jsonb,
  active_profile_id text,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),

  -- One row per user
  unique(user_id)
);

-- Row Level Security: users can only access their own data
alter table user_data enable row level security;

create policy "Users can read own data"
  on user_data for select
  using (auth.uid() = user_id);

create policy "Users can insert own data"
  on user_data for insert
  with check (auth.uid() = user_id);

create policy "Users can update own data"
  on user_data for update
  using (auth.uid() = user_id);

create policy "Users can delete own data"
  on user_data for delete
  using (auth.uid() = user_id);

-- Auto-update the updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger user_data_updated_at
  before update on user_data
  for each row
  execute function update_updated_at();

-- ============================================
-- Index for fast lookups by user_id
-- ============================================
create index if not exists idx_user_data_user_id on user_data(user_id);
