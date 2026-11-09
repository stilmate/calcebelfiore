import Link from 'next/link';
import { CONFIG } from '../lib/config';
import { RESALE } from '../lib/rivendita';

export const INK  = '#2C2B28';
export const GOLD = '#B8860B';

export const eyebrow = { fontSize:11, fontWeight:800, letterSpacing:'.18em', textTransform:'uppercase', color:GOLD, marginBottom:10 };
export const h2 = { fontFamily:'Georgia,serif', fontSize:30, fontWeight:900 };

// Texture "masselli" in CSS: nessuna foto di terzi da autorizzare
export const paversBg = (size = 120) => ({
  backgroundColor:'#cfc6b4',
  backgroundImage:
    'linear-gradient(90deg, rgba(90,80,64,.35) 2px, transparent 2px),' +
    'linear-gradient(0deg, rgba(90,80,64,.35) 2px, transparent 2px),' +
    'linear-gradient(135deg, #d9d0bd 0%, #bfb49e 50%, #d2c8b3 100%)',
  backgroundSize:`${size}px ${size/2}px, ${size}px ${size/2}px, 100% 100%`,
});

export function PartnerBadge({ partner, size = 13 }) {
  if (!partner) return null;
  return <span style={{ background:partner.color || INK, color:'#fff', fontWeight:900, letterSpacing:'.12em', fontSize:size, padding:'5px 11px' }}>{partner.name.toUpperCase()}</span>;
}

export function BrandsStrip() {
  if (!RESALE.brands?.length) return null;
  return (
    <section style={{ background:INK, padding:'26px 16px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', gap:22, flexWrap:'wrap', justifyContent:'center' }}>
        <span style={{ fontSize:11, fontWeight:800, letterSpacing:'.16em', textTransform:'uppercase', color:GOLD }}>Marchi trattati</span>
        {RESALE.brands.map(b => b.logo
          ? <img key={b.name} src={b.logo} alt={b.name} style={{ height:26, filter:'grayscale(1) brightness(2)' }}/>
          : <span key={b.name} style={{ color:'#F0EDE6', fontWeight:800, fontSize:15, letterSpacing:'.04em', opacity:.85 }}>{b.name}</span>)}
      </div>
    </section>
  );
}

export default function ResaleShell({ back, children }) {
  return (
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:${INK};}a{color:inherit;text-decoration:none;}
        @media(max-width:860px){.rc4{grid-template-columns:1fr 1fr!important;}.rc3{grid-template-columns:1fr 1fr!important;}.rg2c{grid-template-columns:1fr!important;}.rh1{font-size:40px!important;}.rpad{padding-left:16px!important;padding-right:16px!important;}}
        @media(max-width:520px){.rc4,.rc3,.qf2{grid-template-columns:1fr!important;}.rh1{font-size:32px!important;}}`}</style>
      <nav className="rpad" style={{ position:'sticky', top:0, zIndex:200, background:INK, padding:'0 28px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Link href="/" style={{ fontFamily:'Georgia,serif', fontWeight:900, fontSize:16, color:'#F0EDE6' }}>BELFIORE <span style={{ color:GOLD }}>·</span></Link>
        <div style={{ display:'flex', gap:18 }}>
          <Link href={back?.href || '/'} style={{ fontSize:12, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#F0EDE6', opacity:.7 }}>← {back?.label || 'Home'}</Link>
          <a href="#preventivo" style={{ fontSize:12, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#F0EDE6' }}>Preventivo</a>
        </div>
      </nav>
      {children}
      <BrandsStrip/>
      <footer style={{ background:'#1f1e1c', padding:'18px 16px', textAlign:'center', color:'#7A7672', fontSize:11, letterSpacing:'.06em', textTransform:'uppercase' }}>
        © {CONFIG.company.year} · {CONFIG.company.name} · {CONFIG.company.vat}
      </footer>
    </>
  );
}
