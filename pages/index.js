import { useState } from 'react';
import Link from 'next/link';
import SeoHead from '../components/SeoHead';
import { CONFIG, PRODUCTS } from '../lib/config';
import { RESALE, activeCategories } from '../lib/rivendita';

const CATS = ['Tutti', ...new Set(PRODUCTS.map(p => p.cat))];

const I = ({ n, s = 18 }) => {
  const d = {
    cart:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    arrow: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    crown: <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M3 17h18l-3-9-4.5 4.5L12 8l-1.5 4.5L6 8z"/></svg>,
    clock: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    phone: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    mail:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    check: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
    x:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    minus: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  };
  return d[n] || null;
};

const Grain = () => (
  <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.14,pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
    <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#g)"/>
  </svg>
);

function ProductCard({ p, onAdd }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <div style={{background:'#fff',border:'1px solid #e0ddd6',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <Link href={`/prodotti/${p.slug}`} style={{display:'block',textDecoration:'none'}}>
        <div style={{position:'relative',height:176,overflow:'hidden',background:p.color,flexShrink:0,cursor:'pointer'}}>
          {imgOk
            ? <img src={p.img} alt={`${p.name} — ${CONFIG.company.name}`} onError={()=>setImgOk(false)} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.86) saturate(.88)'}}/>
            : <div style={{width:'100%',height:'100%',background:`linear-gradient(135deg,${p.color} 0%,#c8c0a8 100%)`}}/>
          }
          <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(44,43,40,.6) 0%,transparent 55%)'}}/>
          <div style={{position:'absolute',top:10,left:10,background:'rgba(44,43,40,.8)',padding:'3px 9px'}}>
            <span style={{fontSize:10,fontWeight:800,letterSpacing:'.1em',textTransform:'uppercase',color:'#F0EDE6'}}>{p.cat}</span>
          </div>
          <div style={{position:'absolute',top:10,right:10,background:'#B8860B',padding:'3px 8px',display:'flex',alignItems:'center',gap:4}}>
            <I n="clock" s={10}/><span style={{fontSize:10,fontWeight:700,color:'#fff'}}>VIP {p.leadTime.vip}</span>
          </div>
          <div style={{position:'absolute',bottom:10,left:12,right:12}}>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:19,fontWeight:900,color:'#F0EDE6',lineHeight:1.15,textShadow:'0 1px 6px rgba(0,0,0,.4)',margin:0}}>{p.name}</h2>
          </div>
        </div>
      </Link>
      <div style={{padding:'15px 17px 12px',flex:1,display:'flex',flexDirection:'column'}}>
        <p style={{fontSize:12.5,color:'#5a5652',lineHeight:1.6,marginBottom:10,flex:1}}>{p.desc}</p>
        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
          {p.tag.split(' · ').map(t=>(
            <span key={t} style={{fontSize:10,fontWeight:700,letterSpacing:'.05em',textTransform:'uppercase',padding:'2px 7px',background:'#F0EDE6',color:'#7A7672',border:'1px solid #ddd9d0'}}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{height:1,background:'#d8d4cc'}}/>
      <div style={{padding:'12px 17px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',color:'#7A7672'}}>
          Prezzo su richiesta
        </div>
        <button onClick={()=>onAdd(p)} style={{background:'#2C2B28',color:'#F0EDE6',border:'none',cursor:'pointer',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',padding:'9px 15px',display:'flex',alignItems:'center',gap:6}}>
          <I n="cart" s={13}/> Aggiungi
        </button>
      </div>
    </div>
  );
}

function LeadForm() {
  const blank = {name:'',company:'',phone:'',email:'',message:'',type:CONFIG.leadTypes[0]};
  const [f, setF] = useState(blank);
  const [sent, setSent] = useState(false);
  const u = (k,v) => setF(p=>({...p,[k]:v}));
  const lbl = {fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7A7672',display:'block',marginBottom:5};
  const inp = {width:'100%',padding:'11px 14px',border:'1.5px solid #d0cdc6',fontSize:14,fontFamily:'inherit',outline:'none'};
  const send = () => {
    if (!f.name||!f.email) return;
    const leads = JSON.parse(localStorage.getItem('cb_leads')||'[]');
    localStorage.setItem('cb_leads',JSON.stringify([{id:`LEAD-${Date.now()}`,...f,status:'Nuovo',createdAt:new Date().toLocaleString('it-IT')},...leads]));
    setSent(true); setF(blank); setTimeout(()=>setSent(false),3200);
  };
  if (sent) return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:40,background:'#F5EDD0',textAlign:'center'}}>
      <span style={{color:'#4a7c59',marginBottom:12}}><I n="check" s={32}/></span>
      <div style={{fontFamily:'Georgia,serif',fontSize:20,fontWeight:900}}>Richiesta inviata</div>
      <p style={{color:'#7A7672',marginTop:8}}>Ti ricontatteremo entro oggi.</p>
    </div>
  );
  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
        <div><label style={lbl}>Nome *</label><input placeholder="Mario Rossi" value={f.name} onChange={e=>u('name',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Azienda</label><input placeholder="Impresa Edile Srl" value={f.company} onChange={e=>u('company',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Email *</label><input type="email" placeholder="mario@email.it" value={f.email} onChange={e=>u('email',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Telefono</label><input placeholder="+39 333 000 0000" value={f.phone} onChange={e=>u('phone',e.target.value)} style={inp}/></div>
      </div>
      <div style={{marginBottom:12}}><label style={lbl}>Tipo richiesta</label><select value={f.type} onChange={e=>u('type',e.target.value)} style={{...inp,background:'#fff'}}>{CONFIG.leadTypes.map(o=><option key={o}>{o}</option>)}</select></div>
      <div style={{marginBottom:16}}><label style={lbl}>Messaggio</label><textarea rows={3} placeholder="Descrivi la tua esigenza..." value={f.message} onChange={e=>u('message',e.target.value)} style={{...inp,resize:'vertical'}}/></div>
      <button onClick={send} style={{background:'#2C2B28',color:'#F0EDE6',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',padding:'13px 24px',width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
        Invia richiesta <I n="arrow" s={15}/>
      </button>
    </div>
  );
}

function CartDrawer({ cart, setCart, onClose }) {
  const [step, setStep] = useState('cart');
  const [f, setF] = useState({name:'',company:'',phone:'',email:'',note:'',delivery:'ritiro'});
  const u = (k,v) => setF(p=>({...p,[k]:v}));
  const inp = {width:'100%',padding:'11px 14px',border:'1.5px solid #d0cdc6',fontSize:14,fontFamily:'inherit',outline:'none'};
  const lbl = {fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7A7672',display:'block',marginBottom:5};
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const updQty = (id,d) => setCart(prev=>prev.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const rem = (id) => setCart(prev=>prev.filter(i=>i.id!==id));
  const togVip = (id) => setCart(prev=>prev.map(i=>i.id===id?{...i,isVip:!i.isVip}:i));
  const confirm = () => {
    if (!f.name||!f.phone) return;
    const orders = JSON.parse(localStorage.getItem('cb_orders')||'[]');
    localStorage.setItem('cb_orders',JSON.stringify([{id:`ORD-${Date.now()}`,...f,items:cart,total,isVip:cart.some(i=>i.isVip),status:'Ricevuto',createdAt:new Date().toLocaleString('it-IT')},...orders]));
    setCart([]); onClose(); alert('✓ Ordine ricevuto — ti contatteremo a breve!');
  };
  return (
    <div style={{position:'fixed',inset:0,zIndex:500,display:'flex'}}>
      <div style={{flex:1,background:'rgba(44,43,40,.5)'}} onClick={onClose}/>
      <div style={{width:420,background:'#F0EDE6',display:'flex',flexDirection:'column',height:'100%',overflowY:'auto',maxWidth:'100vw'}}>
        <div style={{padding:'16px 22px',background:'#2C2B28',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
          <span style={{fontFamily:'Georgia,serif',color:'#F0EDE6',fontWeight:900,fontSize:16}}>{step==='cart'?`Carrello (${cart.reduce((s,i)=>s+i.qty,0)})`:'Conferma ordine'}</span>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'#F0EDE6',display:'flex'}}><I n="x" s={20}/></button>
        </div>
        {step==='cart'?(
          <div style={{display:'flex',flexDirection:'column',flex:1}}>
            {cart.length===0?(
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',color:'#7A7672',gap:10}}><I n="cart" s={36}/><div>Il carrello è vuoto</div></div>
            ):(
              <div style={{flex:1,overflowY:'auto'}}>
                {cart.map(item=>(
                  <div key={item.id} style={{padding:'14px 18px',borderBottom:'1px solid #e0ddd6',display:'flex',gap:12}}>
                    <div style={{width:58,height:58,flexShrink:0,overflow:'hidden',background:item.color||'#e0ddd6'}}>
                      {item.img&&<img src={item.img} alt={item.name} style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(.88)'}}/>}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                        <div style={{fontWeight:700,fontSize:13,lineHeight:1.3}}>{item.name}</div>
                        <button onClick={()=>rem(item.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#7A7672',display:'flex'}}><I n="x" s={14}/></button>
                      </div>
                      <div style={{fontSize:11,color:'#7A7672',marginBottom:8}}>{item.unit} · prezzo da confermare</div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div style={{display:'flex',alignItems:'center',border:'1.5px solid #d0cdc6'}}>
                          <button onClick={()=>updQty(item.id,-1)} style={{padding:'4px 9px',background:'none',border:'none',cursor:'pointer',display:'flex'}}><I n="minus" s={12}/></button>
                          <span style={{padding:'4px 12px',fontWeight:700,fontSize:13,borderLeft:'1px solid #d0cdc6',borderRight:'1px solid #d0cdc6'}}>{item.qty}</span>
                          <button onClick={()=>updQty(item.id,1)} style={{padding:'4px 9px',background:'none',border:'none',cursor:'pointer',display:'flex'}}><I n="plus" s={12}/></button>
                        </div>
                        <span style={{fontSize:11,color:'#7A7672',fontWeight:600}}>{item.qty} {item.qty===1?'sacco':'sacchi'}</span>
                      </div>
                      <button onClick={()=>togVip(item.id)} style={{marginTop:8,display:'flex',alignItems:'center',gap:6,background:item.isVip?'#B8860B':'transparent',color:item.isVip?'#fff':'#7A7672',border:'1.5px solid',borderColor:item.isVip?'#B8860B':'#d0cdc6',padding:'3px 9px',cursor:'pointer',fontSize:10,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase'}}>
                        <I n="crown" s={11}/> {item.isVip?`VIP · ${item.leadTime.vip}`:`Attiva VIP · ${item.leadTime.vip}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cart.length>0&&(
              <div style={{padding:'16px 20px',borderTop:'1px solid #d0cdc6',background:'#fff',flexShrink:0}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                  <span style={{fontSize:13,color:'#7A7672'}}>Articoli nel carrello</span>
                  <span style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:18}}>{cart.reduce((s,i)=>s+i.qty,0)}</span>
                </div>
                <div style={{fontSize:11,color:'#7A7672',marginBottom:12}}>* Il prezzo verrà confermato dal nostro team in fase di trattativa</div>
                <button onClick={()=>setStep('checkout')} style={{background:'#B8860B',color:'#fff',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'13px 24px',width:'100%'}}>Procedi all&apos;ordine →</button>
              </div>
            )}
          </div>
        ):(
          <div style={{padding:22,display:'flex',flexDirection:'column',gap:13}}>
            <button onClick={()=>setStep('cart')} style={{background:'none',border:'none',cursor:'pointer',color:'#7A7672',fontSize:12,textAlign:'left'}}>← Torna al carrello</button>
            {[['name','Nome *','Mario Rossi'],['company','Azienda','Impresa Srl'],['phone','Telefono *','+39 333 000 0000'],['email','Email','mario@email.it']].map(([k,lb,ph])=>(
              <div key={k}><label style={lbl}>{lb}</label><input placeholder={ph} value={f[k]} onChange={e=>u(k,e.target.value)} style={inp}/></div>
            ))}
            <div><label style={lbl}>Modalità</label><select value={f.delivery} onChange={e=>u('delivery',e.target.value)} style={{...inp,background:'#fff'}}><option value="ritiro">Ritiro in sede</option><option value="consegna">Consegna a cantiere</option></select></div>
            <div><label style={lbl}>Note magazzino</label><textarea rows={3} placeholder="Orari, indicazioni..." value={f.note} onChange={e=>u('note',e.target.value)} style={{...inp,resize:'vertical'}}/></div>
            <div style={{background:'#F5EDD0',padding:'11px 14px',display:'flex',justifyContent:'space-between'}}>
              <span style={{fontSize:13}}>Articoli richiesti</span>
              <span style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:17}}>{cart.reduce((s,i)=>s+i.qty,0)}</span>
            </div>
            <div style={{fontSize:11,color:'#7A7672'}}>Ti contatteremo per confermare prezzo, disponibilità e modalità di consegna.</div>
            <button onClick={confirm} style={{background:'#B8860B',color:'#fff',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'13px 24px',width:'100%'}}>Conferma ordine</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [cat, setCat] = useState('Tutti');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const filtered = cat==='Tutti' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===cat);
  const addToCart = (p) => {
    setCart(prev=>{
      const ex=prev.find(i=>i.id===p.id);
      return ex?prev.map(i=>i.id===p.id?{...i,qty:i.qty+1}:i):[...prev,{...p,qty:1,isVip:false}];
    });
    setCartOpen(true);
  };
  const cartQty = cart.reduce((s,i)=>s+i.qty,0);

  return (
    <>
      <SeoHead/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:#2C2B28;}a{color:inherit;text-decoration:none;}@media(max-width:768px){.hm{display:none!important;}.g2{grid-template-columns:1fr!important;}.g3{grid-template-columns:1fr!important;}}`}</style>

      <nav style={{position:'sticky',top:0,zIndex:200,background:'#2C2B28',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',height:56}}>
        <div style={{display:'flex',alignItems:'center',gap:28}}>
          <Link href="/" style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:16,color:'#F0EDE6',letterSpacing:'.03em'}}>BELFIORE <span style={{color:'#B8860B'}}>·</span></Link>
          <div style={{display:'flex',gap:20}} className="hm">
            {['Prodotti','Ordina','Contatti'].map(s=>(
              <a key={s} href={`#${s.toLowerCase()}`} style={{fontSize:12,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',color:'#F0EDE6',opacity:.7}}>{s}</a>
            ))}
            {RESALE.enabled&&<Link href={`/${RESALE.slug}`} style={{fontSize:12,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',color:'#F0EDE6',opacity:.7}}>{RESALE.menuLabel}</Link>}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <Link href="/pannello" style={{fontSize:12,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',color:'#F0EDE6',opacity:.7}} className="hm">Pannello</Link>
          <button onClick={()=>setCartOpen(true)} style={{position:'relative',background:'none',border:'none',cursor:'pointer',color:'#F0EDE6',display:'flex'}}>
            <I n="cart" s={20}/>
            {cartQty>0&&<span style={{position:'absolute',top:-4,right:-8,background:'#B8860B',color:'#fff',borderRadius:'50%',width:17,height:17,fontSize:10,fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center'}}>{cartQty}</span>}
          </button>
        </div>
      </nav>

      <section id="hero" style={{position:'relative',minHeight:'88vh',display:'flex',alignItems:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,zIndex:0}}>
          <img src={CONFIG.images.hero} alt="Cantiere edile Belfiore Calabria" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(105deg,rgba(28,27,25,0.91) 0%,rgba(28,27,25,0.72) 55%,rgba(28,27,25,0.45) 100%)'}}/>
          <div style={{position:'absolute',right:0,top:0,width:'50%',height:'100%',background:'radial-gradient(ellipse at 80% 30%,rgba(184,134,11,0.18) 0%,transparent 65%)'}}/>
        </div>
        <Grain/>
        <div style={{position:'relative',zIndex:1,maxWidth:1100,margin:'0 auto',padding:'80px 40px'}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:22}}>{CONFIG.company.since} · Produzione propria</div>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:60,fontWeight:900,color:'#F0EDE6',lineHeight:1.08,marginBottom:24,maxWidth:640}}>
            Calce, intonaci<br/>e sabbie da<br/><span style={{color:'#B8860B'}}>cava a cantiere.</span>
          </h1>
          <p style={{fontSize:16,color:'#a09c96',maxWidth:440,lineHeight:1.68,marginBottom:34}}>{CONFIG.company.description}</p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
            <a href="#prodotti" style={{background:'#B8860B',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'13px 24px',display:'flex',alignItems:'center',gap:10}}>Sfoglia il catalogo <I n="arrow" s={16}/></a>
            <a href="#contatti" style={{background:'transparent',color:'#F0EDE6',border:'1.5px solid rgba(240,237,230,0.4)',fontSize:12,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',padding:'11px 22px'}}>Richiedi un preventivo</a>
          </div>
          <div style={{display:'flex',gap:44,marginTop:56,paddingTop:32,borderTop:'1px solid #3a3835',flexWrap:'wrap'}}>
            {CONFIG.stats.map(({value,label})=>(
              <div key={label}>
                <div style={{fontFamily:'Georgia,serif',fontSize:26,fontWeight:900,color:'#F0EDE6'}}>{value}</div>
                <div style={{fontSize:11,color:'#7A7672',letterSpacing:'.06em',textTransform:'uppercase',marginTop:2}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prodotti" style={{maxWidth:1100,margin:'0 auto',padding:'68px 40px'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32,flexWrap:'wrap',gap:16}}>
          <div>
            <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:10}}>Catalogo</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:32,fontWeight:900}}>I nostri prodotti</h2>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{padding:'7px 14px',fontSize:11,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',cursor:'pointer',border:'1.5px solid #2C2B28',background:cat===c?'#2C2B28':'transparent',color:cat===c?'#F0EDE6':'#2C2B28'}}>{c}</button>
            ))}
          </div>
        </div>
        <div className="g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {filtered.map(p=><ProductCard key={p.id} p={p} onAdd={addToCart}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:32}}>
          <Link href="/prodotti" style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#B8860B',borderBottom:'1px solid #B8860B',paddingBottom:2}}>Vedi tutti i prodotti →</Link>
        </div>
      </section>

      {activeCategories().length>0&&(
      <section id="rivendita" style={{maxWidth:1100,margin:'0 auto',padding:'0 40px 68px'}}>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:22,flexWrap:'wrap',gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:10}}>{RESALE.eyebrow}</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:28,fontWeight:900}}>{RESALE.title}</h2>
          </div>
          <Link href={`/${RESALE.slug}`} style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#B8860B',borderBottom:'1px solid #B8860B',paddingBottom:2}}>Tutta la rivendita →</Link>
        </div>
        <div className="g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {activeCategories().slice(0,3).map(c=>(
            <Link key={c.slug} href={`/${RESALE.slug}/${c.slug}`} style={{background:'#fff',border:'1px solid #e0ddd6',display:'flex',flexDirection:'column'}}>
              <div aria-hidden="true" style={{height:96,position:'relative',backgroundColor:'#cfc6b4',backgroundImage:'linear-gradient(90deg,rgba(90,80,64,.35) 2px,transparent 2px),linear-gradient(0deg,rgba(90,80,64,.35) 2px,transparent 2px),linear-gradient(135deg,#d9d0bd 0%,#bfb49e 50%,#d2c8b3 100%)',backgroundSize:'70px 35px,70px 35px,100% 100%'}}>
                {c.partner&&<span style={{position:'absolute',top:10,right:10,background:c.partner.color||'#2C2B28',color:'#fff',fontWeight:900,letterSpacing:'.12em',fontSize:10,padding:'4px 9px'}}>{c.partner.name.toUpperCase()}</span>}
              </div>
              <div style={{padding:'18px 20px 20px',display:'flex',flexDirection:'column',gap:8,flex:1}}>
                <div style={{fontFamily:'Georgia,serif',fontSize:19,fontWeight:900}}>{c.name}</div>
                <p style={{fontSize:13,color:'#5a5652',lineHeight:1.6,flex:1}}>{c.short}</p>
                <span style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#B8860B',display:'inline-flex',alignItems:'center',gap:6}}>Scopri <I n="arrow" s={13}/></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      )}

      <div style={{height:1,background:'#d8d4cc'}}/>

      <section id="ordina" style={{background:'#2C2B28',padding:'60px 40px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:10}}>Processo</div>
          <h2 style={{fontFamily:'Georgia,serif',fontSize:32,fontWeight:900,color:'#F0EDE6',marginBottom:40}}>Come ordinare</h2>
          <div className="g3" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:28}}>
            {CONFIG.steps.map(({title,desc})=>(
              <div key={title} style={{borderTop:'2px solid #B8860B',paddingTop:18}}>
                <div style={{fontSize:15,fontWeight:700,color:'#F0EDE6',marginBottom:7}}>{title}</div>
                <div style={{fontSize:13,color:'#7A7672',lineHeight:1.65}}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{height:1,background:'#d8d4cc'}}/>

      <section style={{background:'#F5EDD0',padding:'52px 40px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',alignItems:'center',gap:52,flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:260}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
              <span style={{color:'#B8860B'}}><I n="crown" s={20}/></span>
              <span style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B'}}>Clienti VIP</span>
            </div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:28,fontWeight:900,marginBottom:12}}>{CONFIG.vip.title}</h2>
            <p style={{fontSize:14,color:'#5a5652',lineHeight:1.7}}>{CONFIG.vip.description}</p>
          </div>
          <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
            {CONFIG.vip.badges.map(({value,label})=>(
              <div key={label} style={{background:'#fff',padding:'22px 26px',textAlign:'center',minWidth:110}}>
                <div style={{fontFamily:'Georgia,serif',fontSize:26,fontWeight:900,color:'#B8860B'}}>{value}</div>
                <div style={{fontSize:11,color:'#7A7672',textTransform:'uppercase',letterSpacing:'.07em',marginTop:4}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{height:1,background:'#d8d4cc'}}/>

      <section id="contatti" style={{maxWidth:1100,margin:'0 auto',padding:'68px 40px'}}>
        <div className="g2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:52}}>
          <div>
            <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:10}}>Contatti</div>
            <h2 style={{fontFamily:'Georgia,serif',fontSize:32,fontWeight:900,marginBottom:16}}>Parliamo</h2>
            <p style={{fontSize:14,color:'#5a5652',lineHeight:1.7,marginBottom:28}}>Per ordini su misura, preventivi, contratti VIP o assistenza tecnica.</p>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {[{n:'phone',t:'Commerciale',v:CONFIG.contacts.phone},{n:'mail',t:'Ordini',v:CONFIG.contacts.email},{n:'clock',t:'Orari',v:CONFIG.contacts.hours}].map(({n,t,v})=>(
                <div key={t} style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{color:'#B8860B'}}><I n={n}/></span>
                  <div><div style={{fontWeight:700,fontSize:13}}>{t}</div><div style={{color:'#7A7672',fontSize:12}}>{v}</div></div>
                </div>
              ))}
            </div>
          </div>
          <LeadForm/>
        </div>
      </section>

      <footer style={{background:'#2C2B28',padding:'24px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
        <div style={{fontFamily:'Georgia,serif',color:'#F0EDE6',fontWeight:900,fontSize:14}}>{CONFIG.company.name.toUpperCase()}</div>
        <div style={{color:'#5a5652',fontSize:11,letterSpacing:'.06em',textTransform:'uppercase'}}>© {CONFIG.company.year} · {CONFIG.company.vat}</div>
      </footer>

      {cartOpen&&<CartDrawer cart={cart} setCart={setCart} onClose={()=>setCartOpen(false)}/>}
    </>
  );
}
