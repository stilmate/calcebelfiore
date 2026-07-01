import SeoHead from '../../components/SeoHead';
import { CONFIG, PRODUCTS } from '../../lib/config';
import Link from 'next/link';

// Genera una pagina statica per ogni prodotto — Google le indicizza tutte
export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const product = PRODUCTS.find(p => p.slug === params.slug) || null;
  return { props: { product } };
}

export default function ProductPage({ product }) {
  if (!product) return null;
  return (
    <>
      <SeoHead
        title={product.seo.title}
        description={product.seo.desc}
        keywords={product.seo.keywords}
        ogImage={product.img}
        canonical={`${CONFIG.seo.canonical}/prodotti/${product.slug}`}
        product={product}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:#2C2B28;}
      `}</style>
      <nav style={{background:'#2C2B28',padding:'0 28px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/" style={{fontFamily:"'Playfair Display',serif",fontWeight:900,fontSize:16,color:'#F0EDE6'}}>
          BELFIORE <span style={{color:'#B8860B'}}>·</span>
        </Link>
        <Link href="/#prodotti" style={{fontSize:12,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',color:'#F0EDE6',opacity:.7}}>← Catalogo</Link>
      </nav>
      <div style={{maxWidth:900,margin:'0 auto',padding:'60px 40px'}}>
        <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:8}}>{product.cat}</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:42,fontWeight:900,marginBottom:16,lineHeight:1.1}}>{product.name}</h1>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,marginTop:32,flexWrap:'wrap'}}>
          <div>
            <div style={{height:320,overflow:'hidden',background:product.color}}>
              <img src={product.img} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.88) saturate(.88)'}}/>
            </div>
          </div>
          <div>
            <p style={{fontSize:16,color:'#5a5652',lineHeight:1.75,marginBottom:24}}>{product.longDesc}</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24}}>
              {product.tag.split(' · ').map(t=>(
                <span key={t} style={{fontSize:11,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase',padding:'3px 10px',background:'#F0EDE6',color:'#7A7672',border:'1px solid #ddd9d0'}}>{t}</span>
              ))}
            </div>
            <div style={{background:'#fff',padding:'20px 24px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'#B8860B',textTransform:'uppercase',letterSpacing:'.05em'}}>Prezzo su richiesta</div>
                <div style={{fontSize:12,color:'#7A7672',marginTop:3}}>{product.unit} · contattaci per un preventivo</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontSize:12,color:'#7A7672',marginBottom:2}}>Standard: {product.leadTime.standard}</div>
                <div style={{fontSize:12,fontWeight:700,color:'#B8860B'}}>VIP: {product.leadTime.vip}</div>
              </div>
            </div>
            <Link href="/#prodotti" style={{background:'#2C2B28',color:'#F0EDE6',padding:'13px 24px',fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',display:'inline-block'}}>
              Aggiungi al carrello →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
