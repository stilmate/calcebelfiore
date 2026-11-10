import SeoHead from '../../components/SeoHead';
import { CONFIG, PRODUCTS } from '../../lib/config';
import Link from 'next/link';

export default function CatalogPage() {
  return (
    <>
      <SeoHead
        title={`Catalogo Prodotti | ${CONFIG.seo.titleSuffix}`}
        description="Scopri tutta la gamma di prodotti Belfiore: grassello di calce, intonaci premiscelati, sabbie selezionate e conglomerato bituminoso. Ordina online."
        keywords={CONFIG.seo.keywords}
      />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:#2C2B28;}`}</style>
      <nav style={{background:'#2C2B28',padding:'0 28px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:16,color:'#F0EDE6'}}>BELFIORE <span style={{color:'#B8860B'}}>·</span></Link>
        <Link href="/" style={{fontSize:12,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',color:'#F0EDE6',opacity:.7}}>← Home</Link>
      </nav>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:10}}>Catalogo completo</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:900,marginBottom:40}}>Tutti i prodotti</h1>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {PRODUCTS.map(p=>(
            <Link key={p.id} href={`/prodotti/${p.slug}`} style={{background:'#fff',border:'1px solid #e0ddd6',display:'flex',flexDirection:'column',overflow:'hidden',textDecoration:'none'}}>
              <div style={{height:160,overflow:'hidden',background:p.color,position:'relative'}}>
                <img src={p.img} alt={p.name} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.86)'}}/>
                <div style={{position:'absolute',bottom:10,left:12}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:900,color:'#F0EDE6',textShadow:'0 1px 4px rgba(0,0,0,.5)'}}>{p.name}</div>
                </div>
              </div>
              <div style={{padding:'14px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:11,color:'#7A7672',textTransform:'uppercase',letterSpacing:'.07em'}}>{p.cat}</div>
                <div style={{fontSize:11,fontWeight:700,color:'#B8860B',textTransform:'uppercase',letterSpacing:'.05em'}}>Su richiesta</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
