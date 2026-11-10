-- ╔══════════════════════════════════════════════════════════════════╗
-- ║  PROFILAZIONE PANNELLO OPERATORE — Calce Belfiore                 ║
-- ║  Da eseguire una volta in Supabase → SQL Editor → New query.      ║
-- ║  Si può rieseguire: non duplica né cancella dati esistenti.       ║
-- ╚══════════════════════════════════════════════════════════════════╝
--
-- Modello:
--   • roles  = profili (es. "Commerciale"). Per ogni processo un livello:
--              "none" (nessun accesso) · "read" (vede) · "write" (modifica)
--   • staff  = persone che accedono al pannello, ognuna con un profilo
--
-- Processi (chiavi usate anche in lib/permissions.js):
--   ordini · magazzino · lead · clienti · assistenza · attivita · provvigioni · utenti


-- ─────────────────────────────────────────────── TABELLE
create table if not exists public.roles (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  description text,
  permissions jsonb not null default '{}'::jsonb,
  is_system   boolean not null default false,   -- true = profilo Admin, non modificabile
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.staff (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  full_name  text not null,
  email      text not null,
  role_id    uuid not null references public.roles (id) on delete restrict,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────── FUNZIONI DI CONTROLLO
-- Livello dell'utente collegato su un processo: 0 nessuno, 1 vede, 2 modifica.
-- Un utente disattivato o senza profilo ha sempre 0.
create or replace function public.access_level(module text)
returns int
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select case r.permissions ->> module when 'write' then 2 when 'read' then 1 else 0 end
    from public.staff s
    join public.roles r on r.id = s.role_id
    where s.user_id = auth.uid() and s.active
  ), 0);
$$;

-- Da usare nelle regole di accesso: can('ordini', 'write'), can('lead', 'read')
create or replace function public.can(module text, level text default 'read')
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.access_level(module) >= case level when 'write' then 2 else 1 end;
$$;

grant execute on function public.access_level(text) to authenticated;
grant execute on function public.can(text, text) to authenticated;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists roles_touch on public.roles;
create trigger roles_touch before update on public.roles
  for each row execute function public.touch_updated_at();

-- ─────────────────────────────────────────────── REGOLE DI ACCESSO (RLS)
alter table public.roles enable row level security;
alter table public.staff enable row level security;

-- Profili: ognuno legge il proprio; chi gestisce gli utenti li legge e modifica tutti.
-- Il profilo Admin (is_system) non si modifica né si cancella: evita di chiudersi fuori.
drop policy if exists roles_select on public.roles;
create policy roles_select on public.roles for select to authenticated
  using (public.can('utenti', 'read')
         or id = (select role_id from public.staff where user_id = auth.uid() and active));

drop policy if exists roles_insert on public.roles;
create policy roles_insert on public.roles for insert to authenticated
  with check (public.can('utenti', 'write') and not is_system);

drop policy if exists roles_update on public.roles;
create policy roles_update on public.roles for update to authenticated
  using (public.can('utenti', 'write') and not is_system)
  with check (public.can('utenti', 'write') and not is_system);

drop policy if exists roles_delete on public.roles;
create policy roles_delete on public.roles for delete to authenticated
  using (public.can('utenti', 'write') and not is_system);

-- Persone: ognuno legge la propria scheda; chi gestisce gli utenti le vede tutte
-- e ne cambia profilo o stato, ma non può modificare la propria (niente auto-blocco).
-- I nuovi utenti si creano solo dall'invito (pages/api/staff/invite.js).
drop policy if exists staff_select on public.staff;
create policy staff_select on public.staff for select to authenticated
  using (user_id = auth.uid() or public.can('utenti', 'read'));

drop policy if exists staff_update on public.staff;
create policy staff_update on public.staff for update to authenticated
  using (public.can('utenti', 'write') and user_id <> auth.uid())
  with check (public.can('utenti', 'write') and user_id <> auth.uid());

-- ─────────────────────────────────────────────── PROFILI DI PARTENZA
insert into public.roles (name, description, is_system, permissions) values
  ('Admin', 'Titolari: accesso completo e gestione di utenti e profili', true,
   '{"ordini":"write","magazzino":"write","lead":"write","clienti":"write","assistenza":"write","attivita":"write","provvigioni":"write","utenti":"write"}'),
  ('Commerciale', 'Lead, ordini, clienti, assistenza e attività', false,
   '{"ordini":"write","magazzino":"read","lead":"write","clienti":"write","assistenza":"write","attivita":"write","provvigioni":"none","utenti":"none"}'),
  ('Ordini e magazzino', 'Gestione ordini e preparazione: in futuro separabile in due profili', false,
   '{"ordini":"write","magazzino":"write","lead":"none","clienti":"read","assistenza":"read","attivita":"write","provvigioni":"none","utenti":"none"}'),
  ('Consulente', 'Rendiconto provvigioni e lead generati dal sito, in sola lettura', false,
   '{"ordini":"read","magazzino":"none","lead":"read","clienti":"none","assistenza":"none","attivita":"none","provvigioni":"read","utenti":"none"}')
on conflict (name) do nothing;

-- ─────────────────────────────────────────────── MODELLO PER I DATI FUTURI
-- Quando ordini, lead, ticket e attività passeranno da questo browser a Supabase,
-- ogni tabella riceve le regole con lo stesso schema. Esempio per gli ordini:
--
--   alter table public.orders enable row level security;
--   create policy orders_read  on public.orders for select to authenticated using (public.can('ordini','read') or public.can('magazzino','read'));
--   create policy orders_write on public.orders for update to authenticated using (public.can('ordini','write') or public.can('magazzino','write'));
--
-- ─────────────────────────────────────────────── PRIMO AMMINISTRATORE
-- Dopo aver creato il tuo utente in Authentication → Users, esegui (sostituisci email e nome):
--
--   insert into public.staff (user_id, full_name, email, role_id)
--   select u.id, 'Nome Cognome', u.email, r.id
--   from auth.users u, public.roles r
--   where u.email = 'tua@email.it' and r.name = 'Admin'
--   on conflict (user_id) do update set role_id = excluded.role_id, active = true;
