import { createClient } from '@supabase/supabase-js';

// Invita una nuova persona nel pannello. Gira solo sul server: usa la chiave
// di servizio di Supabase, che non arriva mai al browser.
// Consentito solo a chi ha "Utenti e profili" a livello Modifica.
export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Metodo non consentito.' }); }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return res.status(503).json({ error: 'Inviti non attivi: manca la chiave di servizio Supabase su Netlify.' });

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Sessione scaduta: accedi di nuovo.' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

  // 1. Chi sta invitando?
  const { data: who, error: whoErr } = await admin.auth.getUser(token);
  if (whoErr || !who?.user) return res.status(401).json({ error: 'Sessione scaduta: accedi di nuovo.' });

  const { data: caller } = await admin
    .from('staff').select('active, role:roles(permissions)')
    .eq('user_id', who.user.id).maybeSingle();
  if (!caller?.active || caller.role?.permissions?.utenti !== 'write') {
    return res.status(403).json({ error: 'Il tuo profilo non può invitare persone.' });
  }

  // 2. Dati dell'invito
  const { full_name, email, role_id, redirectTo } = req.body || {};
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanName = String(full_name || '').trim();
  if (!cleanName || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail) || !role_id) {
    return res.status(400).json({ error: 'Servono nome, email valida e profilo.' });
  }
  const { data: role } = await admin.from('roles').select('id').eq('id', role_id).maybeSingle();
  if (!role) return res.status(400).json({ error: 'Profilo non trovato.' });

  // Il link dell'email può puntare solo a questo stesso sito
  let safeRedirect;
  try {
    const r = new URL(redirectTo);
    if (r.host === req.headers.host) safeRedirect = `${r.origin}/reimposta-password`;
  } catch { /* ignorato */ }

  // 3. Invito e scheda operatore
  const { data: invited, error: invErr } = await admin.auth.admin.inviteUserByEmail(cleanEmail, {
    redirectTo: safeRedirect,
    data: { full_name: cleanName },
  });
  if (invErr) {
    const already = /already|registered|exists/i.test(invErr.message);
    return res.status(already ? 409 : 500).json({ error: already ? 'Questa email ha già un account.' : `Invito non inviato: ${invErr.message}` });
  }

  const { error: staffErr } = await admin.from('staff').upsert({
    user_id: invited.user.id, full_name: cleanName, email: cleanEmail, role_id, active: true,
  });
  if (staffErr) return res.status(500).json({ error: `Invito inviato, ma profilo non salvato: ${staffErr.message}` });

  return res.status(200).json({ ok: true });
}
