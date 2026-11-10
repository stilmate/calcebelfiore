import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StaffShell, { fieldLabel, fieldInput, primaryBtn, linkBtn } from '../components/StaffShell';
import { supabase, supabaseConfigured } from '../lib/supabase';

const ERRORS = {
  'Invalid login credentials': 'Email o password non corrette.',
  'Email not confirmed': 'Account non ancora attivato: apri il link nell\'email di invito.',
};

export default function Accesso() {
  const router = useRouter();
  const [mode, setMode] = useState('login'); // login | reset
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'error' | 'ok', text }

  useEffect(() => {
    if (!supabaseConfigured) return;
    supabase.auth.getSession().then(({ data }) => { if (data.session) router.replace('/pannello'); });
  }, [router]);

  if (!supabaseConfigured) return (
    <StaffShell title="Accesso operatori">
      <p style={{ fontSize:14, color:'#5a5652', lineHeight:1.7 }}>L&apos;accesso non è ancora attivo: manca il collegamento al database degli utenti. Le istruzioni sono in <strong>supabase/PROFILAZIONE.md</strong>.</p>
    </StaffShell>
  );

  const login = async (e) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) { setMsg({ type:'error', text: ERRORS[error.message] || 'Accesso non riuscito. Riprova tra poco.' }); return; }
    router.replace('/pannello');
  };

  const reset = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setMsg({ type:'error', text:'Inserisci la tua email.' }); return; }
    setBusy(true); setMsg(null);
    await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reimposta-password` });
    setBusy(false);
    // Stesso messaggio in ogni caso: non rivela se l'email è registrata
    setMsg({ type:'ok', text:'Se l\'email è registrata, riceverai un link per scegliere una nuova password.' });
  };

  return (
    <StaffShell title={mode === 'login' ? 'Accesso operatori' : 'Password dimenticata'}>
      <form onSubmit={mode === 'login' ? login : reset} style={{ display:'flex', flexDirection:'column', gap:14 }}>
        <div>
          <label style={fieldLabel} htmlFor="acc-email">Email</label>
          <input id="acc-email" type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)} style={fieldInput}/>
        </div>
        {mode === 'login' && (
          <div>
            <label style={fieldLabel} htmlFor="acc-pass">Password</label>
            <input id="acc-pass" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} style={fieldInput}/>
          </div>
        )}
        {msg && <div role={msg.type === 'error' ? 'alert' : 'status'} style={{ fontSize:13, color: msg.type === 'error' ? '#a33' : '#3d6b4a', lineHeight:1.5 }}>{msg.text}</div>}
        <button type="submit" disabled={busy} style={{ ...primaryBtn, opacity: busy ? .6 : 1 }}>
          {busy ? 'Attendi…' : mode === 'login' ? 'Entra' : 'Invia link'}
        </button>
        <button type="button" onClick={() => { setMode(mode === 'login' ? 'reset' : 'login'); setMsg(null); }} style={{ ...linkBtn, alignSelf:'flex-start' }}>
          {mode === 'login' ? 'Password dimenticata?' : '← Torna all\'accesso'}
        </button>
      </form>
    </StaffShell>
  );
}
