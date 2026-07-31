create extension if not exists pgcrypto;

create table if not exists public.cvs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  titre text not null,
  data jsonb not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists cvs_user_id_updated_at_idx
  on public.cvs (user_id, updated_at desc);

alter table public.cvs enable row level security;

drop policy if exists "Users can read own cvs" on public.cvs;
create policy "Users can read own cvs"
  on public.cvs
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own cvs" on public.cvs;
create policy "Users can insert own cvs"
  on public.cvs
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own cvs" on public.cvs;
create policy "Users can update own cvs"
  on public.cvs
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own cvs" on public.cvs;
create policy "Users can delete own cvs"
  on public.cvs
  for delete
  using (auth.uid() = user_id);

create or replace function public.set_updated_at_cvs()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_updated_at_cvs on public.cvs;
create trigger set_updated_at_cvs
before update on public.cvs
for each row
execute procedure public.set_updated_at_cvs();
