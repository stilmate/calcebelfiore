import Link from 'next/link';
import SeoHead from '../../components/SeoHead';
import ResaleShell, { INK, GOLD, eyebrow, h2, paversBg, PartnerBadge } from '../../components/ResaleShell';
import ResaleIcon from '../../components/ResaleIcon';
import QuoteForm from '../../components/QuoteForm';
import { CONFIG } from '../../lib/config';
import { RESALE, activeCategories } from '../../lib/rivendita';

export default function ResaleIndex() {
  const cats = activeCategories();
  return (
    <ResaleShell>
      <SeoHead
        title={`Rivendita materiali edili ${CONFIG.seo.titleSuffix}`}
        description={`${RESALE.intro} ${cats.map(c => c.name).join(', ')}.`}
        keywords={`rivendita materiali edili Calabria, ${cats.map(c => c.name.toLowerCase()).join(', ')}, ${RESALE.brands.map(b => b.name).join(', ')}`}
        canonical={`${CONFIG.seo.canonical}/${RESALE.slug}`}
      />

      <header style={{ position:'relative', overflow:'hidden', ...paversBg(140) }}>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(100deg, rgba(240,237,230,.97) 0%, rgba(240,237,230,.9) 55%, rgba(240,237,230,.4) 100%)' }}/>
        <div className="rpad" style={{ position:'relative', maxWidth:1100, margin:'0 auto', padding:'64px 40px 64px' }}>
          <div style={eyebrow}>{RESALE.eyebrow}</div>
          <h1 className="rh1" style={{ fontFamily:'Georgia,serif', fontSize:52, fontWeight:900, lineHeight:1.08, maxWidth:720 }}>{RESALE.title}<span style={{ color:GOLD }}>.</span></h1>
          <div style={{ width:80, height:3, background:GOLD, margin:'22px 0' }}/>
          <p style={{ fontSize:15.5, color:'#5a5652', lineHeight:1.7, maxWidth:580 }}>{RESALE.intro}</p>
        </div>
      </header>

      <section className="rpad" style={{ maxWidth:1100, margin:'0 auto', padding:'56px 40px 24px' }}>
        <div style={eyebrow}>Categorie</div>
        <h2 style={{ ...h2, marginBottom:26 }}>Cosa rivendiamo</h2>
        <div className="rc3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
          {cats.map(c => (
            <Link key={c.slug} href={`/${RESALE.slug}/${c.slug}`} style={{ background:'#fff', border:'1px solid #e0ddd6', display:'flex', flexDirection:'column' }}>
              <div style={{ height:110, position:'relative', ...paversBg(70) }}>
                <div style={{ position:'absolute', left:18, bottom:-26, width:52, height:52, borderRadius:'50%', background:INK, color:GOLD, display:'flex', alignItems:'center', justifyContent:'center', border:'4px solid #fff' }}>
                  <ResaleIcon n={c.icon} s={22}/>
                </div>
                {c.partner && <div style={{ position:'absolute', top:12, right:12 }}><PartnerBadge partner={c.partner} size={10}/></div>}
              </div>
              <div style={{ padding:'36px 20px 20px', flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                <div style={{ fontFamily:'Georgia,serif', fontSize:20, fontWeight:900 }}>{c.name}</div>
                <p style={{ fontSize:13, color:'#5a5652', lineHeight:1.6, flex:1 }}>{c.short}</p>
                <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:GOLD, display:'inline-flex', alignItems:'center', gap:6, marginTop:6 }}>Scopri <ResaleIcon n="arrow" s={13}/></span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop:30, background:INK, color:'#F0EDE6', padding:'20px 26px', display:'flex', alignItems:'center', gap:20 }}>
          <span style={{ color:GOLD, display:'flex' }}><ResaleIcon n="box" s={36}/></span>
          <span style={{ width:2, alignSelf:'stretch', background:'rgba(255,255,255,.35)' }}/>
          <p style={{ fontSize:18, lineHeight:1.4 }}><strong>{RESALE.promise.strong}</strong>{RESALE.promise.rest}</p>
        </div>
      </section>

      <section id="preventivo" className="rpad" style={{ maxWidth:1100, margin:'0 auto', padding:'48px 40px 64px' }}>
        <div className="rg2c" style={{ display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:44, alignItems:'start' }}>
          <div>
            <div style={eyebrow}>Preventivo</div>
            <h2 style={{ ...h2, marginBottom:14 }}>Non trovi quello che cerchi?</h2>
            <p style={{ fontSize:14, color:'#5a5652', lineHeight:1.7, marginBottom:20 }}>Scrivici il materiale che ti serve: ti diciamo subito se possiamo fornirlo.</p>
            <div style={{ fontSize:13, color:'#5a5652', lineHeight:1.9 }}>
              <div><strong>Telefono</strong> · {CONFIG.contacts.phone}</div>
              <div><strong>Email</strong> · {CONFIG.contacts.email}</div>
            </div>
          </div>
          <QuoteForm categories={cats}/>
        </div>
      </section>
    </ResaleShell>
  );
}
