import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StaffShell, { fieldLabel, fieldInput, primaryBtn } from '../components/StaffShell';
import { supabase, supabaseConfigured } from '../lib/supabase';

// Qui arrivano sia il link di invito sia quello di "password dimenticata".
export default function ReimpostaPassword() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!supabaseConfigured) { setChecked(true); return; }
    // Il link contiene un token: supabase-js lo legge e apre una sessione temporanea
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) setReady(true);
      setChecked(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); setTimeout(() => setChecked(true), 1500); });
    return () => sub.subscription.unsubscribe();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (pw.length < 10) { setErr('Usa almeno 10 caratteri.'); return; }
    if (pw !== pw2) { setErr('Le due password non coincidono.'); return; }
    setBusy(true); setErr('');
    const { error } = await supabase.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) { setErr('Non è stato possibile salvare la password. Richiedi un nuovo link dalla pagina di accesso.'); return; }
    router.replace('/pannello');
  };

  if (!ready) return (
    <StaffShell title="Scegli la password">
      <p style={{ fontSize:14, color:'#5a5652', lineHeight:1.7 }}>
        {checked ? 'Il link non è valido o è scaduto. Richiedine uno nuovo da "Password dimenticata?" nella pagina di accesso.' : 'Verifica del link in corso…'}
      </p>
    </StaffShell>
  );

  return (
    <StaffShell title="Scegli la password">
      <form onSubmit={save} style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div>
          <label style={fieldLabel} htmlFor="rp-1">Nuova password</label>
          <input id="rp-1" type="password" autoComplete="new-password" required value={pw} onChange={e=>setPw(e.target.value)} style={fieldInput}/>
          <div style={{ fontSize:12, color:'#7A7672', marginTop:6 }}>Almeno 10 caratteri.</div>
        </div>
        <div>
          <label style={fieldLabel} htmlFor="rp-2">Ripeti la password</label>
          <input id="rp-2" type="password" autoComplete="new-password" required value={pw2} onChange={e=>setPw2(e.target.value)} style={fieldInput}/>
        </div>
        {err && <div role="alert" style={{ fontSize:13, color:'#a33' }}>{err}</div>}
        <button type="submit" disabled={busy} style={{ ...primaryBtn, opacity: busy ? .6 : 1 }}>{busy ? 'Salvataggio…' : 'Salva ed entra'}</button>
      </form>
    </StaffShell>
  );
}
