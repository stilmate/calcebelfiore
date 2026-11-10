# Profilazione del pannello operatore — attivazione

Il pannello `/pannello` è protetto: si entra con email e password, e ognuno vede solo i processi del proprio profilo.
Finché i passaggi qui sotto non sono completati, il pannello mostra "accesso non ancora attivo".

## 1. Crea il progetto Supabase (5 minuti)
1. Vai su supabase.com e crea un account (va bene il piano gratuito).
2. **New project**: nome `calcebelfiore`, regione **Europe (Frankfurt)** o la più vicina, scegli una password del database e conservala.
3. Quando il progetto è pronto, apri **SQL Editor → New query**, incolla tutto il file `supabase/profilazione.sql` e premi **Run**.
   Crea profili, persone, regole di accesso e i quattro profili di partenza. Si può rieseguire senza danni.

## 2. Imposta gli indirizzi del sito
In **Authentication → URL Configuration**:
- **Site URL**: `https://calcebelfiore.netlify.app` (poi il dominio definitivo)
- **Redirect URLs**: aggiungi `https://calcebelfiore.netlify.app/reimposta-password`

In **Authentication → Sign In / Providers → Email**: disattiva **Allow new users to sign up**. Si entra solo su invito.

## 3. Collega Netlify
In Supabase, **Project Settings → API**, copia tre valori e inseriscili su Netlify in **Site configuration → Environment variables**:

| Variabile Netlify | Valore in Supabase |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | chiave `anon` / publishable |
| `SUPABASE_SERVICE_ROLE_KEY` | chiave `service_role` / secret — **segreta**: solo su Netlify, mai nel codice o in chat |

Poi su Netlify: **Deploys → Trigger deploy**.

## 4. Crea il primo Admin
1. In Supabase, **Authentication → Users → Add user → Create new user**: email e password del primo amministratore.
2. In **SQL Editor** esegui, con email e nome reali:
   ```sql
   insert into public.staff (user_id, full_name, email, role_id)
   select u.id, 'Nome Cognome', u.email, r.id
   from auth.users u, public.roles r
   where u.email = 'tua@email.it' and r.name = 'Admin'
   on conflict (user_id) do update set role_id = excluded.role_id, active = true;
   ```
3. Entra da `/accesso`. Da **Utenti e profili** inviti tutti gli altri: ricevono un'email e scelgono la password.

## Come si usa
- **Profili e permessi**: per ogni profilo e processo scegli *Nessun accesso*, *Vede* o *Modifica*, poi **Salva**.
- **Separare un profilo** (es. "Ordini e magazzino" → "Magazzino"): **Duplica**, togli i processi che non servono, salva, poi in **Persone** sposta chi deve cambiare.
- **Persone**: invita, cambia profilo, disattiva o riattiva. Nessuno può modificare il proprio profilo, e il profilo **Admin** è bloccato: così nessuno resta chiuso fuori.

## Cosa protegge, oggi
- Accesso al pannello, schede visibili e comandi di modifica dipendono dal profilo.
- Profili e persone sono protetti dal database: un utente non può alzarsi i permessi né vedere gli altri, anche aggirando l'interfaccia.
- **Ordini, lead, ticket e attività sono ancora salvati nel browser** di chi li usa. Quando passeranno su Supabase, ogni tabella riceverà le stesse regole: il modello è già in fondo a `profilazione.sql`.

## Aggiungere un processo
1. Aggiungilo in `lib/permissions.js` (chiave, nome, descrizione).
2. Compare da solo nella matrice dei profili, con *Nessun accesso* per tutti finché non lo assegni.
