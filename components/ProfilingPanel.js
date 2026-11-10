import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MODULES, LEVELS } from '../lib/permissions';

const INK = '#2C2B28', GOLD = '#B8860B', MUTED = '#7A7672', LINE = '#e0ddd6';
const LEVEL_STYLE = {
  none:  { background:'#F0EDE6', color:MUTED },
  read:  { background:'#F5EDD0', color:'#7a5a07' },
  write: { background:INK,       color:'#F0EDE6' },
};
const h3 = { fontFamily:'Georgia,serif', fontSize:20, fontWeight:900 };
const small = { fontSize:12, color:MUTED, lineHeight:1.6 };
const btn = { background:'transparent', color:INK, border:`1.5px solid ${INK}`, cursor:'pointer', fontSize:11, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', padding:'8px 14px' };
const btnSolid = { ...btn, background:INK, color:'#F0EDE6' };
const btnGold = { ...btn, background:GOLD, borderColor:GOLD, color:'#fff' };
const inp = { width:'100%', padding:'9px 12px', border:'1.5px solid #d0cdc6', fontSize:13, fontFamily:'inherit', outline:'none', background:'#fff' };
const lbl = { fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:MUTED, display:'block', marginBottom:5 };

const blankPerms = () => Object.fromEntries(MODULES.map(m => [m.key, 'none']));

export default function ProfilingPanel({ canEdit, currentUserId, onSelfChange }) {
  const [roles, setRoles] = useState([]);
  const [staff, setStaff] = useState([]);
  const [drafts, setDrafts] = useState({});        // role id → permessi modificati non salvati
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);      // { type, text }
  const [view, setView] = useState('profili');     // profili | utenti

  const say = (type, text) => { setNotice({ type, text }); setTimeout(() => setNotice(null), 4000); };

  const load = useCallback(async () => {
    setLoading(true);
    const [r, s] = await Promise.all([
      supabase.from('roles').select('*').order('is_system', { ascending:false }).order('name'),
      supabase.from('staff').select('user_id, full_name, email, active, role_id, created_at').order('full_name'),
    ]);
    if (r.error || s.error) say('error', 'Impossibile caricare profili e utenti. Ricarica la pagina.');
    setRoles(r.data || []); setStaff(s.data || []); setDrafts({}); setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const usersPerRole = useMemo(() => staff.reduce((acc, u) => ({ ...acc, [u.role_id]: (acc[u.role_id] || 0) + 1 }), {}), [staff]);
  const permsOf = (role) => drafts[role.id] || { ...blankPerms(), ...role.permissions };
  const editable = (role) => canEdit && !role.is_system;

  // ── Profili
  const setLevel = (role, mod, level) => setDrafts(d => ({ ...d, [role.id]: { ...permsOf(role), [mod]: level } }));
  const saveRole = async (role) => {
    const { error } = await supabase.from('roles').update({ permissions: drafts[role.id] }).eq('id', role.id);
    if (error) return say('error', `Modifiche a "${role.name}" non salvate: ${error.message}`);
    say('ok', `Profilo "${role.name}" aggiornato.`); load(); onSelfChange?.();
  };
  const createRole = async (name, fromRole) => {
    const clean = name.trim();
    if (!clean) return say('error', 'Dai un nome al nuovo profilo.');
    const permissions = fromRole ? { ...blankPerms(), ...fromRole.permissions, utenti: fromRole.is_system ? 'none' : (fromRole.permissions.utenti || 'none') } : blankPerms();
    const { error } = await supabase.from('roles').insert({ name: clean, description: fromRole ? `Creato da "${fromRole.name}"` : '', permissions });
    if (error) return say('error', error.code === '23505' ? 'Esiste già un profilo con questo nome.' : `Profilo non creato: ${error.message}`);
    say('ok', `Profilo "${clean}" creato.`); load();
  };
  const renameRole = async (role) => {
    const name = window.prompt('Nuovo nome del profilo', role.name);
    if (!name || name.trim() === role.name) return;
    const { error } = await supabase.from('roles').update({ name: name.trim() }).eq('id', role.id);
    if (error) return say('error', error.code === '23505' ? 'Esiste già un profilo con questo nome.' : error.message);
    say('ok', 'Profilo rinominato.'); load();
  };
  const deleteRole = async (role) => {
    if (usersPerRole[role.id]) return say('error', `"${role.name}" è assegnato a ${usersPerRole[role.id]} persona/e: spostale su un altro profilo prima di eliminarlo.`);
    if (!window.confirm(`Eliminare il profilo "${role.name}"?`)) return;
    const { error } = await supabase.from('roles').delete().eq('id', role.id);
    if (error) return say('error', error.message);
    say('ok', 'Profilo eliminato.'); load();
  };

  // ── Utenti
  const updateUser = async (u, patch, okText) => {
    const { error } = await supabase.from('staff').update(patch).eq('user_id', u.user_id);
    if (error) return say('error', error.message);
    say('ok', okText); load();
  };
  const invite = async ({ full_name, email, role_id }) => {
    const { data } = await supabase.auth.getSession();
    const res = await fetch('/api/staff/invite', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${data.session?.access_token}` },
      body: JSON.stringify({ full_name, email, role_id, redirectTo: `${window.location.origin}/reimposta-password` }),
    });
    const out = await res.json().catch(() => ({}));
    if (!res.ok) { say('error', out.error || 'Invito non inviato.'); return false; }
    say('ok', `Invito inviato a ${email}.`); load(); return true;
  };

  if (loading) return <div style={{ ...small, padding:30 }}>Caricamento profili…</div>;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
        {[['profili','Profili e permessi'],['utenti',`Persone (${staff.length})`]].map(([k,l]) => (
          <button key={k} onClick={() => setView(k)} style={view === k ? btnSolid : btn}>{l}</button>
        ))}
        {!canEdit && <span style={{ ...small, marginLeft:8 }}>Sola lettura: le modifiche le fa un Admin.</span>}
      </div>

      {notice && <div role={notice.type === 'error' ? 'alert' : 'status'} style={{ padding:'10px 14px', fontSize:13, background: notice.type === 'error' ? '#fbeaea' : '#e8f1ea', color: notice.type === 'error' ? '#8a2b2b' : '#2f5a3c', border:`1px solid ${notice.type === 'error' ? '#efc9c9' : '#c7dccd'}` }}>{notice.text}</div>}

      {view === 'profili' && (
        <>
          <div>
            <h2 style={h3}>Profili e permessi</h2>
            <p style={{ ...small, marginTop:6, maxWidth:720 }}>Ogni profilo dà a ciascun processo un livello: <strong>nessun accesso</strong>, <strong>vede</strong> o <strong>modifica</strong>. Per separare un profilo in futuro (es. Ordini e Magazzino), duplicalo, togli i processi che non servono e sposta le persone. L&apos;Admin non è modificabile, così nessuno resta chiuso fuori.</p>
          </div>

          <div style={{ overflowX:'auto', border:`1px solid ${LINE}`, background:'#fff' }}>
            <table style={{ borderCollapse:'collapse', width:'100%', minWidth: 220 + roles.length * 150, fontSize:13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign:'left', padding:'14px 16px', borderBottom:`2px solid ${LINE}`, position:'sticky', left:0, background:'#fff', minWidth:200 }}>Processo</th>
                  {roles.map(r => (
                    <th key={r.id} style={{ textAlign:'left', padding:'14px 12px', borderBottom:`2px solid ${LINE}`, verticalAlign:'top' }}>
                      <div style={{ fontWeight:800 }}>{r.name}{r.is_system && <span style={{ marginLeft:6, fontSize:10, color:GOLD, letterSpacing:'.06em' }}>BLOCCATO</span>}</div>
                      <div style={{ ...small, fontWeight:400 }}>{usersPerRole[r.id] === 1 ? '1 persona' : `${usersPerRole[r.id] || 0} persone`}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODULES.map(m => (
                  <tr key={m.key}>
                    <td style={{ padding:'10px 16px', borderBottom:`1px solid #f0ede6`, position:'sticky', left:0, background:'#fff' }}>
                      <div style={{ fontWeight:700 }}>{m.label}</div>
                      <div style={{ ...small, fontSize:11 }}>{m.desc}</div>
                    </td>
                    {roles.map(r => {
                      const lv = permsOf(r)[m.key] || 'none';
                      const id = `perm-${r.id}-${m.key}`;
                      return (
                        <td key={r.id} style={{ padding:'8px 12px', borderBottom:`1px solid #f0ede6` }}>
                          <label htmlFor={id} style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)' }}>{`${m.label} per ${r.name}`}</label>
                          <select id={id} disabled={!editable(r)} value={lv} onChange={e => setLevel(r, m.key, e.target.value)}
                            style={{ ...LEVEL_STYLE[lv], border:'none', padding:'6px 8px', fontSize:12, fontWeight:700, cursor: editable(r) ? 'pointer' : 'default', fontFamily:'inherit' }}>
                            {LEVELS.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
                          </select>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {canEdit && (
                  <tr>
                    <td style={{ padding:'12px 16px', position:'sticky', left:0, background:'#fff' }}/>
                    {roles.map(r => (
                      <td key={r.id} style={{ padding:'12px', verticalAlign:'top' }}>
                        <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'flex-start' }}>
                          {drafts[r.id] && <button onClick={() => saveRole(r)} style={btnGold}>Salva</button>}
                          {drafts[r.id] && <button onClick={() => setDrafts(d => { const n = { ...d }; delete n[r.id]; return n; })} style={{ ...btn, border:'none', padding:'4px 0' }}>Annulla</button>}
                          <button onClick={() => { const n = window.prompt('Nome del nuovo profilo', `${r.name} (copia)`); if (n) createRole(n, r); }} style={{ ...btn, border:'none', padding:'4px 0', color:GOLD }}>Duplica</button>
                          {!r.is_system && <button onClick={() => renameRole(r)} style={{ ...btn, border:'none', padding:'4px 0' }}>Rinomina</button>}
                          {!r.is_system && <button onClick={() => deleteRole(r)} style={{ ...btn, border:'none', padding:'4px 0', color:'#a33' }}>Elimina</button>}
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {canEdit && <NewRole onCreate={name => createRole(name, null)}/>}
        </>
      )}

      {view === 'utenti' && (
        <>
          <div>
            <h2 style={h3}>Persone</h2>
            <p style={{ ...small, marginTop:6 }}>Chi può entrare nel pannello. Si accede solo su invito: la persona riceve un&apos;email e sceglie la propria password.</p>
          </div>
          {canEdit && <InviteForm roles={roles} onInvite={invite}/>}
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {staff.map(u => {
              const self = u.user_id === currentUserId;
              const role = roles.find(r => r.id === u.role_id);
              return (
                <div key={u.user_id} style={{ background:'#fff', border:`1px solid ${LINE}`, padding:'14px 18px', display:'flex', alignItems:'center', gap:14, flexWrap:'wrap', opacity: u.active ? 1 : .6 }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:INK, color:'#F0EDE6', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, flexShrink:0 }}>{(u.full_name || '?')[0].toUpperCase()}</div>
                  <div style={{ flex:'1 1 200px', minWidth:0 }}>
                    <div style={{ fontWeight:800, fontSize:14 }}>{u.full_name}{self && <span style={{ ...small, marginLeft:6 }}>(tu)</span>}{!u.active && <span style={{ marginLeft:8, fontSize:10, fontWeight:800, color:'#a33' }}>DISATTIVATO</span>}</div>
                    <div style={{ ...small, overflowWrap:'anywhere' }}>{u.email}</div>
                  </div>
                  {canEdit && !self ? (
                    <>
                      <label htmlFor={`role-${u.user_id}`} style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)' }}>{`Profilo di ${u.full_name}`}</label>
                      <select id={`role-${u.user_id}`} value={u.role_id} onChange={e => updateUser(u, { role_id: e.target.value }, `Profilo di ${u.full_name} aggiornato.`)} style={{ ...inp, width:'auto', fontWeight:700 }}>
                        {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                      <button onClick={() => updateUser(u, { active: !u.active }, u.active ? `${u.full_name} disattivato.` : `${u.full_name} riattivato.`)} style={{ ...btn, color: u.active ? '#a33' : INK, borderColor: u.active ? '#a33' : INK }}>{u.active ? 'Disattiva' : 'Riattiva'}</button>
                    </>
                  ) : (
                    <span style={{ fontSize:12, fontWeight:700, background:'#F0EDE6', padding:'6px 10px' }}>{role?.name || '—'}</span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function NewRole({ onCreate }) {
  const [name, setName] = useState('');
  return (
    <form onSubmit={e => { e.preventDefault(); onCreate(name); setName(''); }} style={{ display:'flex', gap:10, alignItems:'flex-end', flexWrap:'wrap' }}>
      <div style={{ flex:'1 1 240px', maxWidth:360 }}>
        <label style={lbl} htmlFor="new-role">Nuovo profilo vuoto</label>
        <input id="new-role" placeholder="es. Magazzino" value={name} onChange={e => setName(e.target.value)} style={inp}/>
      </div>
      <button type="submit" style={btnSolid}>Crea profilo</button>
    </form>
  );
}

function InviteForm({ roles, onInvite }) {
  const assignable = roles.filter(r => !r.is_system).concat(roles.filter(r => r.is_system));
  const blank = { full_name:'', email:'', role_id: assignable.find(r => !r.is_system)?.id || assignable[0]?.id || '' };
  const [f, setF] = useState(blank);
  const [busy, setBusy] = useState(false);
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));
  const submit = async (e) => {
    e.preventDefault();
    if (!f.full_name.trim() || !f.email.trim() || !f.role_id) return;
    setBusy(true);
    const ok = await onInvite({ ...f, full_name: f.full_name.trim(), email: f.email.trim() });
    setBusy(false);
    if (ok) setF(blank);
  };
  return (
    <form onSubmit={submit} style={{ background:'#fff', border:`1px solid ${LINE}`, padding:18, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:12, alignItems:'end' }}>
      <div><label style={lbl} htmlFor="inv-name">Nome e cognome</label><input id="inv-name" required value={f.full_name} onChange={e => u('full_name', e.target.value)} style={inp}/></div>
      <div><label style={lbl} htmlFor="inv-email">Email</label><input id="inv-email" type="email" required value={f.email} onChange={e => u('email', e.target.value)} style={inp}/></div>
      <div><label style={lbl} htmlFor="inv-role">Profilo</label>
        <select id="inv-role" value={f.role_id} onChange={e => u('role_id', e.target.value)} style={inp}>{assignable.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
      </div>
      <button type="submit" disabled={busy} style={{ ...btnGold, padding:'11px 16px', opacity: busy ? .6 : 1 }}>{busy ? 'Invio…' : 'Invia invito'}</button>
    </form>
  );
}
