import Head from 'next/head';
import Link from 'next/link';
import { CONFIG } from '../lib/config';

const INK = '#2C2B28', GOLD = '#B8860B';

export const fieldLabel = { fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#7A7672', display:'block', marginBottom:5 };
export const fieldInput = { width:'100%', padding:'11px 14px', border:'1.5px solid #d0cdc6', fontSize:14, fontFamily:'inherit', outline:'none', background:'#fff' };
export const primaryBtn = { background:INK, color:'#F0EDE6', border:'none', cursor:'pointer', fontSize:12, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', padding:'13px 22px' };
export const linkBtn = { background:'none', border:'none', color:GOLD, cursor:'pointer', fontSize:12, fontWeight:700, letterSpacing:'.04em', padding:0 };

// Pagina centrata per accesso, reimpostazione password e messaggi di stato. Non indicizzata.
export default function StaffShell({ title, eyebrow = 'Area riservata', children }) {
  return (
    <>
      <Head>
        <title>{`${title} | ${CONFIG.company.name}`}</title>
        <meta name="robots" content="noindex, nofollow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:${INK};}a{color:inherit;text-decoration:none;}input:focus-visible,button:focus-visible{outline:2px solid ${GOLD};outline-offset:2px;}`}</style>
      <nav style={{ background:INK, height:56, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 max(16px, 28px)' }}>
        <Link href="/" style={{ fontFamily:'Georgia,serif', fontWeight:900, fontSize:16, color:'#F0EDE6' }}>BELFIORE <span style={{ color:GOLD }}>·</span></Link>
        <Link href="/" style={{ fontSize:11, fontWeight:700, letterSpacing:'.09em', textTransform:'uppercase', color:'#F0EDE6', opacity:.7 }}>← Sito pubblico</Link>
      </nav>
      <main style={{ maxWidth:440, margin:'0 auto', padding:'64px 16px' }}>
        <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.18em', textTransform:'uppercase', color:GOLD, marginBottom:10 }}>{eyebrow}</div>
        <h1 style={{ fontFamily:'Georgia,serif', fontSize:30, fontWeight:900, marginBottom:24 }}>{title}</h1>
        <div style={{ background:'#fff', border:'1px solid #e0ddd6', padding:28 }}>{children}</div>
      </main>
    </>
  );
}
