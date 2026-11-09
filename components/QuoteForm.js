import { useState } from 'react';
import ResaleIcon from './ResaleIcon';
import { RESALE } from '../lib/rivendita';

const GOLD = '#B8860B';

// Form preventivo riutilizzabile. Salva il lead come gli altri form (pannello → Lead).
// category: la categoria di rivendita (facoltativa). Senza categoria chiede quale materiale interessa.
export default function QuoteForm({ category, categories = [] }) {
  const uses = (category && category.uses && category.uses.length) ? category.uses : RESALE.defaultUses;
  const blank = { name:'', phone:'', email:'', comune:'', cat: category ? category.name : (categories[0]?.name || 'Altro'), use:uses[0], mq:'', message:'' };
  const [f, setF] = useState(blank);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));
  const lbl = { fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#7A7672', display:'block', marginBottom:5 };
  const inp = { width:'100%', padding:'11px 14px', border:'1.5px solid #d0cdc6', fontSize:14, fontFamily:'inherit', outline:'none', background:'#fff' };
  const askArea = category ? !!category.askArea : true;

  const send = () => {
    if (!f.name || (!f.email && !f.phone)) { setErr('Inserisci il nome e almeno un recapito (email o telefono).'); return; }
    const message = [
      `[Rivendita · ${f.cat}${category?.partner ? ' · ' + category.partner.name : ''}]`,
      `Uso: ${f.use}`,
      askArea && f.mq && `Superficie: ${f.mq} m²`,
      f.comune && `Comune: ${f.comune}`,
      f.message,
    ].filter(Boolean).join('\n');
    try {
      const leads = JSON.parse(localStorage.getItem('cb_leads') || '[]');
      localStorage.setItem('cb_leads', JSON.stringify([{
        id:`LEAD-${Date.now()}`, name:f.name, company:'', phone:f.phone, email:f.email,
        type:'Rivendita materiali', message, source:`rivendita/${category?.slug || 'indice'}`,
        status:'Nuovo', createdAt:new Date().toLocaleString('it-IT'),
      }, ...leads]));
    } catch (e) { /* storage non disponibile */ }
    setErr(''); setSent(true); setF(blank);
  };

  if (sent) return (
    <div style={{ background:'#fff', padding:40, textAlign:'center', border:`2px solid ${GOLD}` }}>
      <span style={{ color:GOLD }}><ResaleIcon n="check" s={34}/></span>
      <div style={{ fontFamily:'Georgia,serif', fontSize:22, fontWeight:900, marginTop:10 }}>Richiesta inviata</div>
      <p style={{ color:'#5a5652', marginTop:8, fontSize:14 }}>Ti ricontattiamo per un preventivo.</p>
      <button onClick={() => setSent(false)} style={{ marginTop:18, background:'none', border:'none', color:GOLD, fontWeight:700, cursor:'pointer', fontSize:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Nuova richiesta</button>
    </div>
  );

  return (
    <div style={{ background:'#fff', padding:28, border:'1px solid #e0ddd6' }}>
      <div className="qf2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
        <div><label style={lbl} htmlFor="qf-name">Nome *</label><input id="qf-name" placeholder="Mario Rossi" value={f.name} onChange={e=>u('name',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="qf-comune">Comune del cantiere</label><input id="qf-comune" placeholder="Lamezia Terme" value={f.comune} onChange={e=>u('comune',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="qf-email">Email</label><input id="qf-email" type="email" placeholder="mario@email.it" value={f.email} onChange={e=>u('email',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="qf-phone">Telefono</label><input id="qf-phone" placeholder="+39 333 000 0000" value={f.phone} onChange={e=>u('phone',e.target.value)} style={inp}/></div>
        {!category && (
          <div><label style={lbl} htmlFor="qf-cat">Materiale</label><select id="qf-cat" value={f.cat} onChange={e=>u('cat',e.target.value)} style={inp}>{[...categories.map(c=>c.name),'Altro'].map(o=><option key={o}>{o}</option>)}</select></div>
        )}
        <div><label style={lbl} htmlFor="qf-use">Destinazione d&apos;uso</label><select id="qf-use" value={f.use} onChange={e=>u('use',e.target.value)} style={inp}>{uses.map(o=><option key={o}>{o}</option>)}</select></div>
        {askArea && (
          <div><label style={lbl} htmlFor="qf-mq">Superficie (m²)</label><input id="qf-mq" inputMode="numeric" placeholder="es. 80" value={f.mq} onChange={e=>u('mq',e.target.value.replace(/[^\d.,]/g,''))} style={inp}/></div>
        )}
      </div>
      <div style={{ marginBottom:14 }}><label style={lbl} htmlFor="qf-msg">Note</label><textarea id="qf-msg" rows={3} placeholder="Quantità, tempi, foto disponibili..." value={f.message} onChange={e=>u('message',e.target.value)} style={{ ...inp, resize:'vertical' }}/></div>
      {err && <div role="alert" style={{ color:'#a33', fontSize:13, marginBottom:12 }}>{err}</div>}
      <button onClick={send} style={{ background:GOLD, color:'#fff', border:'none', cursor:'pointer', fontSize:12, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', padding:'14px 24px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        Richiedi preventivo gratuito <ResaleIcon n="arrow" s={15}/>
      </button>
      <p style={{ fontSize:11, color:'#7A7672', marginTop:10 }}>Prezzo su richiesta. Nessun impegno.</p>
    </div>
  );
}
