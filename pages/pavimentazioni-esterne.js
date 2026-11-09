import { useState } from 'react';
import Link from 'next/link';
import SeoHead from '../components/SeoHead';
import { CONFIG, PAVING } from '../lib/config';

const GREEN = '#B8860B'; // accento del sito
const SIPREM = '#1E7A3C'; // solo per il marchio partner
const GOLD  = '#B8860B';
const INK   = '#2C2B28';

const Icon = ({ n, s = 26 }) => {
  const p = { width:s, height:s, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.8, strokeLinecap:'round', strokeLinejoin:'round' };
  const d = {
    home:   <svg {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>,
    format: <svg {...p}><rect x="4" y="4" width="16" height="16" strokeDasharray="3 2"/><path d="M14 4h6v6"/><path d="M20 4l-6 6"/></svg>,
    grid:   <svg {...p}><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>,
    layers: <svg {...p}><path d="M12 3 2 8l10 5 10-5z"/><path d="m2 13 10 5 10-5"/><path d="m2 17.5 10 5 10-5"/></svg>,
    leaf:   <svg {...p}><path d="M12 21V11"/><path d="M12 13c-5 0-8-3-8-8 5 0 8 3 8 8z"/><path d="M12 11c0-4 3-7 8-7 0 5-3 8-8 7z"/></svg>,
    check:  <svg {...p} strokeWidth={2.4}><polyline points="20 6 9 17 4 12"/></svg>,
    arrow:  <svg {...p} strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  };
  return d[n] || null;
};

// Texture "masselli" disegnata in CSS: nessuna foto di terzi da autorizzare
const paversBg = {
  backgroundColor:'#cfc6b4',
  backgroundImage:
    'linear-gradient(90deg, rgba(90,80,64,.35) 2px, transparent 2px),' +
    'linear-gradient(0deg, rgba(90,80,64,.35) 2px, transparent 2px),' +
    'linear-gradient(135deg, #d9d0bd 0%, #bfb49e 50%, #d2c8b3 100%)',
  backgroundSize:'120px 60px, 120px 60px, 100% 100%',
};

function QuoteForm() {
  const blank = { name:'', phone:'', email:'', comune:'', use:PAVING.uses[0], mq:'', message:'' };
  const [f, setF] = useState(blank);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));
  const lbl = { fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#7A7672', display:'block', marginBottom:5 };
  const inp = { width:'100%', padding:'11px 14px', border:'1.5px solid #d0cdc6', fontSize:14, fontFamily:'inherit', outline:'none', background:'#fff' };

  const send = () => {
    if (!f.name || (!f.email && !f.phone)) { setErr('Inserisci il nome e almeno un recapito (email o telefono).'); return; }
    const message = [
      `[Pavimentazioni esterne · ${PAVING.partner}]`,
      `Uso: ${f.use}`,
      f.mq && `Superficie: ${f.mq} m²`,
      f.comune && `Comune: ${f.comune}`,
      f.message,
    ].filter(Boolean).join('\n');
    try {
      const leads = JSON.parse(localStorage.getItem('cb_leads') || '[]');
      localStorage.setItem('cb_leads', JSON.stringify([{
        id:`LEAD-${Date.now()}`, name:f.name, company:'', phone:f.phone, email:f.email,
        type:'Pavimentazioni esterne', message, source:'pavimentazioni-esterne',
        status:'Nuovo', createdAt:new Date().toLocaleString('it-IT'),
      }, ...leads]));
    } catch (e) { /* storage non disponibile: la richiesta non viene salvata */ }
    setErr(''); setSent(true); setF(blank);
  };

  if (sent) return (
    <div style={{ background:'#fff', padding:40, textAlign:'center', border:`2px solid ${GREEN}` }}>
      <span style={{ color:GREEN }}><Icon n="check" s={34}/></span>
      <div style={{ fontFamily:'Georgia,serif', fontSize:22, fontWeight:900, marginTop:10 }}>Richiesta inviata</div>
      <p style={{ color:'#5a5652', marginTop:8, fontSize:14 }}>Ti ricontattiamo per un sopralluogo o un preventivo.</p>
      <button onClick={() => setSent(false)} style={{ marginTop:18, background:'none', border:'none', color:GREEN, fontWeight:700, cursor:'pointer', fontSize:12, letterSpacing:'.06em', textTransform:'uppercase' }}>Nuova richiesta</button>
    </div>
  );

  return (
    <div style={{ background:'#fff', padding:28, border:'1px solid #e0ddd6' }}>
      <div className="pg2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
        <div><label style={lbl} htmlFor="pv-name">Nome *</label><input id="pv-name" placeholder="Mario Rossi" value={f.name} onChange={e=>u('name',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="pv-comune">Comune del cantiere</label><input id="pv-comune" placeholder="Lamezia Terme" value={f.comune} onChange={e=>u('comune',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="pv-email">Email</label><input id="pv-email" type="email" placeholder="mario@email.it" value={f.email} onChange={e=>u('email',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="pv-phone">Telefono</label><input id="pv-phone" placeholder="+39 333 000 0000" value={f.phone} onChange={e=>u('phone',e.target.value)} style={inp}/></div>
        <div><label style={lbl} htmlFor="pv-use">Destinazione d&apos;uso</label><select id="pv-use" value={f.use} onChange={e=>u('use',e.target.value)} style={inp}>{PAVING.uses.map(o=><option key={o}>{o}</option>)}</select></div>
        <div><label style={lbl} htmlFor="pv-mq">Superficie (m²)</label><input id="pv-mq" inputMode="numeric" placeholder="es. 80" value={f.mq} onChange={e=>u('mq',e.target.value.replace(/[^\d.,]/g,''))} style={inp}/></div>
      </div>
      <div style={{ marginBottom:14 }}><label style={lbl} htmlFor="pv-msg">Note</label><textarea id="pv-msg" rows={3} placeholder="Stile, colore, tempi, foto disponibili..." value={f.message} onChange={e=>u('message',e.target.value)} style={{ ...inp, resize:'vertical' }}/></div>
      {err && <div role="alert" style={{ color:'#a33', fontSize:13, marginBottom:12 }}>{err}</div>}
      <button onClick={send} style={{ background:GREEN, color:'#fff', border:'none', cursor:'pointer', fontSize:12, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', padding:'14px 24px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        Richiedi preventivo gratuito <Icon n="arrow" s={15}/>
      </button>
      <p style={{ fontSize:11, color:'#7A7672', marginTop:10 }}>Prezzo su richiesta. Nessun impegno.</p>
    </div>
  );
}

export default function PavimentazioniEsterne() {
  return (
    <>
      <SeoHead
        title={PAVING.seo.title}
        description={PAVING.seo.desc}
        keywords={PAVING.seo.keywords}
        canonical={`${CONFIG.seo.canonical}/${PAVING.slug}`}
      />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:${INK};}a{color:inherit;text-decoration:none;}
        @media(max-width:860px){.pc4{grid-template-columns:1fr 1fr!important;}.pg2c{grid-template-columns:1fr!important;}.ph1{font-size:40px!important;}.pad{padding-left:16px!important;padding-right:16px!important;}}
        @media(max-width:520px){.pc4{grid-template-columns:1fr!important;}.pg2{grid-template-columns:1fr!important;}.ph1{font-size:32px!important;}}`}</style>

      <nav className="pad" style={{ position:'sticky', top:0, zIndex:200, background:INK, padding:'0 28px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link href="/" style={{ fontFamily:'Georgia,serif', fontWeight:900, fontSize:16, color:'#F0EDE6' }}>BELFIORE <span style={{ color:GOLD }}>·</span></Link>
        <div style={{ display:'flex', gap:18 }}>
          <Link href="/prodotti" style={{ fontSize:12, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#F0EDE6', opacity:.7 }}>Catalogo</Link>
          <a href="#preventivo" style={{ fontSize:12, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#F0EDE6' }}>Preventivo</a>
        </div>
      </nav>

      {/* HERO */}
      <header style={{ position:'relative', overflow:'hidden', ...paversBg }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(240,237,230,.97) 0%, rgba(240,237,230,.9) 48%, rgba(240,237,230,.35) 100%)' }}/>
        <div className="pad" style={{ position:'relative', maxWidth:1100, margin:'0 auto', padding:'64px 40px 72px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap', marginBottom:28 }}>
            <span style={{ background:SIPREM, color:'#fff', fontWeight:900, letterSpacing:'.12em', fontSize:13, padding:'6px 12px' }}>{PAVING.partner.toUpperCase()}</span>
            <span style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', textTransform:'uppercase', color:'#5a5652' }}>{PAVING.partnerSub}</span>
            <span style={{ flex:'1 1 40px', height:2, background:GREEN, opacity:.6, minWidth:40 }}/>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#5a5652' }}>{PAVING.claim}</span>
          </div>
          <h1 className="ph1" style={{ fontFamily:'Georgia,serif', fontSize:56, fontWeight:900, lineHeight:1.06 }}>
            Pavimentazioni<br/><span style={{ color:GREEN }}>esterne.</span>
          </h1>
          <p style={{ fontSize:20, color:'#3a3835', marginTop:14, maxWidth:520 }}>{PAVING.subtitle}</p>
          <div style={{ width:80, height:3, background:GREEN, margin:'22px 0' }}/>
          <p style={{ fontSize:15, color:'#5a5652', lineHeight:1.7, maxWidth:540 }}>{PAVING.intro}</p>
          <a href="#preventivo" style={{ marginTop:28, display:'inline-flex', alignItems:'center', gap:10, background:GREEN, color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'.07em', textTransform:'uppercase', padding:'14px 24px' }}>
            Richiedi un preventivo <Icon n="arrow" s={16}/>
          </a>
        </div>
      </header>

      {/* 4 CRITERI */}
      <section className="pad" style={{ maxWidth:1100, margin:'0 auto', padding:'64px 40px 24px' }}>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.18em', textTransform:'uppercase', color:GREEN, marginBottom:10 }}>Guida alla scelta</div>
        <h2 style={{ fontFamily:'Georgia,serif', fontSize:30, fontWeight:900, marginBottom:34 }}>Quattro criteri per scegliere bene</h2>
        <div className="pc4" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
          {PAVING.criteria.map(c => (
            <div key={c.title} style={{ background:'#fff', borderRadius:0, border:'1px solid #e0ddd6', padding:'40px 20px 24px', textAlign:'center', position:'relative', boxShadow:'0 2px 10px rgba(44,43,40,.06)', marginTop:28 }}>
              <div style={{ position:'absolute', top:-30, left:'50%', transform:'translateX(-50%)', width:60, height:60, borderRadius:'50%', background:INK, color:GOLD, display:'flex', alignItems:'center', justifyContent:'center', border:'4px solid #F0EDE6' }}>
                <Icon n={c.icon}/>
              </div>
              <h3 style={{ fontSize:14, fontWeight:900, letterSpacing:'.05em', textTransform:'uppercase' }}>{c.title}</h3>
              <div style={{ width:28, height:2, background:GOLD, margin:'12px auto' }}/>
              <p style={{ fontSize:13.5, color:'#5a5652', lineHeight:1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop:30, background:INK, color:'#F0EDE6', borderRadius:0, padding:'20px 26px', display:'flex', alignItems:'center', gap:20 }}>
          <span style={{ color:GOLD, display:'flex' }}><Icon n="leaf" s={38}/></span>
          <span style={{ width:2, alignSelf:'stretch', background:'rgba(255,255,255,.45)' }}/>
          <p style={{ fontSize:19, lineHeight:1.4 }}><strong>{PAVING.motto.strong}</strong>{PAVING.motto.rest}</p>
        </div>
      </section>

      {/* VANTAGGIO BELFIORE */}
      <section className="pad" style={{ maxWidth:1100, margin:'0 auto', padding:'28px 40px 8px' }}>
        <div style={{ borderLeft:`3px solid ${GOLD}`, background:'#F5EDD0', padding:'18px 22px', fontSize:14.5, color:'#3a3835', lineHeight:1.6 }}>
          <strong>Dalla cava al cortile.</strong> {PAVING.bundle}
        </div>
      </section>

      {/* PREVENTIVO */}
      <section id="preventivo" className="pad" style={{ maxWidth:1100, margin:'0 auto', padding:'56px 40px 64px' }}>
        <div className="pg2c" style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:44, alignItems:'start' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.18em', textTransform:'uppercase', color:GREEN, marginBottom:10 }}>Preventivo</div>
            <h2 style={{ fontFamily:'Georgia,serif', fontSize:30, fontWeight:900, marginBottom:14 }}>Raccontaci il tuo spazio</h2>
            <p style={{ fontSize:14, color:'#5a5652', lineHeight:1.7, marginBottom:20 }}>Indica uso e metri quadri: ti proponiamo formato, finitura e schema di posa adatti, con tutti i materiali.</p>
            <div style={{ fontSize:13, color:'#5a5652', lineHeight:1.9 }}>
              <div><strong>Telefono</strong> · {CONFIG.contacts.phone}</div>
              <div><strong>Email</strong> · {CONFIG.contacts.email}</div>
              <div><strong>Orari</strong> · {CONFIG.contacts.hours}</div>
            </div>
          </div>
          <QuoteForm/>
        </div>
      </section>

      {/* MARCHI */}
      <section style={{ background:INK, padding:'26px 16px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', gap:22, flexWrap:'wrap', justifyContent:'center' }}>
          <span style={{ fontSize:11, fontWeight:800, letterSpacing:'.16em', textTransform:'uppercase', color:GOLD }}>{PAVING.brandsTitle}</span>
          {PAVING.brands.map(b => (
            <span key={b} style={{ color:'#F0EDE6', fontWeight:800, fontSize:15, letterSpacing:'.04em', opacity:.85 }}>{b}</span>
          ))}
        </div>
      </section>

      <footer style={{ background:'#1f1e1c', padding:'18px 16px', textAlign:'center', color:'#7A7672', fontSize:11, letterSpacing:'.06em', textTransform:'uppercase' }}>
        © {CONFIG.company.year} · {CONFIG.company.name} · {CONFIG.company.vat}
      </footer>
    </>
  );
}
