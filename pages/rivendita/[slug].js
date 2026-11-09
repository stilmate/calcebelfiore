import SeoHead from '../../components/SeoHead';
import ResaleShell, { INK, GOLD, eyebrow, h2, paversBg, PartnerBadge } from '../../components/ResaleShell';
import ResaleIcon from '../../components/ResaleIcon';
import QuoteForm from '../../components/QuoteForm';
import { CONFIG } from '../../lib/config';
import { RESALE, activeCategories } from '../../lib/rivendita';

// Una pagina statica per ogni categoria attiva in lib/rivendita.js
export async function getStaticPaths() {
  return { paths: activeCategories().map(c => ({ params: { slug: c.slug } })), fallback: false };
}
export async function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

export default function ResaleCategoryPage({ slug }) {
  const c = activeCategories().find(x => x.slug === slug);
  if (!c) return null;
  const hasCriteria = c.criteria?.length > 0;
  const hasItems = c.items?.length > 0;

  return (
    <ResaleShell back={{ href:`/${RESALE.slug}`, label:RESALE.menuLabel }}>
      <SeoHead
        title={c.seo?.title || `${c.title} | ${CONFIG.company.name}`}
        description={c.seo?.desc || c.intro}
        keywords={c.seo?.keywords}
        canonical={`${CONFIG.seo.canonical}/${RESALE.slug}/${c.slug}`}
      />

      {/* HERO */}
      <header style={{ position:'relative', overflow:'hidden', ...paversBg(120) }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(240,237,230,.97) 0%, rgba(240,237,230,.9) 48%, rgba(240,237,230,.35) 100%)' }}/>
        <div className="rpad" style={{ position:'relative', maxWidth:1100, margin:'0 auto', padding:'64px 40px 72px' }}>
          {(c.partner || c.claim) && (
            <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap', marginBottom:28 }}>
              <PartnerBadge partner={c.partner}/>
              {c.partner?.sub && <span style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', textTransform:'uppercase', color:'#5a5652' }}>{c.partner.sub}</span>}
              {c.claim && <>
                <span style={{ flex:'1 1 40px', height:2, background:GOLD, opacity:.6, minWidth:40 }}/>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#5a5652' }}>{c.claim}</span>
              </>}
            </div>
          )}
          <div style={eyebrow}>{RESALE.eyebrow}</div>
          <h1 className="rh1" style={{ fontFamily:'Georgia,serif', fontSize:56, fontWeight:900, lineHeight:1.06, maxWidth:700 }}>{c.title}<span style={{ color:GOLD }}>.</span></h1>
          {c.subtitle && <p style={{ fontSize:20, color:'#3a3835', marginTop:14, maxWidth:560 }}>{c.subtitle}</p>}
          <div style={{ width:80, height:3, background:GOLD, margin:'22px 0' }}/>
          <p style={{ fontSize:15, color:'#5a5652', lineHeight:1.7, maxWidth:560 }}>{c.intro}</p>
          <a href="#preventivo" style={{ marginTop:28, display:'inline-flex', alignItems:'center', gap:10, background:GOLD, color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'.07em', textTransform:'uppercase', padding:'14px 24px' }}>
            Richiedi un preventivo <ResaleIcon n="arrow" s={16}/>
          </a>
        </div>
      </header>

      {/* GUIDA ALLA SCELTA (facoltativa) */}
      {(hasCriteria || c.motto) && (
        <section className="rpad" style={{ maxWidth:1100, margin:'0 auto', padding:'64px 40px 24px' }}>
          {hasCriteria && <>
            <div style={eyebrow}>Guida alla scelta</div>
            <h2 style={{ ...h2, marginBottom:34 }}>{c.criteriaTitle || 'Come scegliere'}</h2>
            <div className="rc4" style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(c.criteria.length, 4)},1fr)`, gap:18 }}>
              {c.criteria.map(k => (
                <div key={k.title} style={{ background:'#fff', border:'1px solid #e0ddd6', padding:'40px 20px 24px', textAlign:'center', position:'relative', boxShadow:'0 2px 10px rgba(44,43,40,.06)', marginTop:28 }}>
                  <div style={{ position:'absolute', top:-30, left:'50%', transform:'translateX(-50%)', width:60, height:60, borderRadius:'50%', background:INK, color:GOLD, display:'flex', alignItems:'center', justifyContent:'center', border:'4px solid #F0EDE6' }}>
                    <ResaleIcon n={k.icon}/>
                  </div>
                  <h3 style={{ fontSize:14, fontWeight:900, letterSpacing:'.05em', textTransform:'uppercase' }}>{k.title}</h3>
                  <div style={{ width:28, height:2, background:GOLD, margin:'12px auto' }}/>
                  <p style={{ fontSize:13.5, color:'#5a5652', lineHeight:1.6 }}>{k.desc}</p>
                </div>
              ))}
            </div>
          </>}
          {c.motto && (
            <div style={{ marginTop:30, background:INK, color:'#F0EDE6', padding:'20px 26px', display:'flex', alignItems:'center', gap:20 }}>
              <span style={{ color:GOLD, display:'flex' }}><ResaleIcon n="leaf" s={38}/></span>
              <span style={{ width:2, alignSelf:'stretch', background:'rgba(255,255,255,.35)' }}/>
              <p style={{ fontSize:19, lineHeight:1.4 }}><strong>{c.motto.strong}</strong>{c.motto.rest}</p>
            </div>
          )}
        </section>
      )}

      {/* PRODOTTI / LINEE (facoltativo) */}
      {hasItems && (
        <section className="rpad" style={{ maxWidth:1100, margin:'0 auto', padding:'48px 40px 8px' }}>
          <div style={eyebrow}>Linee disponibili</div>
          <h2 style={{ ...h2, marginBottom:26 }}>Cosa trovi da noi</h2>
          <div className="rc3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
            {c.items.map(it => (
              <div key={it.name} style={{ background:'#fff', border:'1px solid #e0ddd6', padding:'20px 20px 18px', display:'flex', flexDirection:'column', gap:8 }}>
                {it.brand && <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', color:GOLD }}>{it.brand}</div>}
                <div style={{ fontFamily:'Georgia,serif', fontSize:18, fontWeight:900 }}>{it.name}</div>
                {it.desc && <p style={{ fontSize:13, color:'#5a5652', lineHeight:1.6, flex:1 }}>{it.desc}</p>}
                {it.tags?.length > 0 && <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>{it.tags.map(t=>(
                  <span key={t} style={{ fontSize:10, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', padding:'2px 7px', background:'#F0EDE6', color:'#7A7672', border:'1px solid #ddd9d0' }}>{t}</span>
                ))}</div>}
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:'#7A7672', borderTop:'1px solid #ece9e2', paddingTop:10, marginTop:4 }}>
                  Prezzo su richiesta{it.unit ? ` · ${it.unit}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VANTAGGIO (facoltativo) */}
      {c.bundle && (
        <section className="rpad" style={{ maxWidth:1100, margin:'0 auto', padding:'28px 40px 8px' }}>
          <div style={{ borderLeft:`3px solid ${GOLD}`, background:'#F5EDD0', padding:'18px 22px', fontSize:14.5, color:'#3a3835', lineHeight:1.6 }}>
            <strong>{c.bundle.strong}</strong>{c.bundle.rest}
          </div>
        </section>
      )}

      {/* PREVENTIVO */}
      <section id="preventivo" className="rpad" style={{ maxWidth:1100, margin:'0 auto', padding:'56px 40px 64px' }}>
        <div className="rg2c" style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:44, alignItems:'start' }}>
          <div>
            <div style={eyebrow}>Preventivo</div>
            <h2 style={{ ...h2, marginBottom:14 }}>Raccontaci il tuo progetto</h2>
            <p style={{ fontSize:14, color:'#5a5652', lineHeight:1.7, marginBottom:20 }}>Indica uso e quantità: ti proponiamo la soluzione adatta, insieme ai nostri materiali.</p>
            <div style={{ fontSize:13, color:'#5a5652', lineHeight:1.9 }}>
              <div><strong>Telefono</strong> · {CONFIG.contacts.phone}</div>
              <div><strong>Email</strong> · {CONFIG.contacts.email}</div>
              <div><strong>Orari</strong> · {CONFIG.contacts.hours}</div>
            </div>
          </div>
          <QuoteForm category={c}/>
        </div>
      </section>
    </ResaleShell>
  );
}
