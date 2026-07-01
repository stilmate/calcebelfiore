import { useState } from 'react';
import Link from 'next/link';
import SeoHead from '../components/SeoHead';
import { CONFIG } from '../lib/config';

const I = ({ n, s = 18 }) => {
  const d = {
    cart:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
    ticket:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6v12M2 12h3M19 12h3"/></svg>,
    task:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    user:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    star:    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    crown:   <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M3 17h18l-3-9-4.5 4.5L12 8l-1.5 4.5L6 8z"/></svg>,
    eye:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    x:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    warning: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    check:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>,
  };
  return d[n] || null;
};

const useStorage = (key, initial) => {
  const [val, setVal] = useState(() => {
    if (typeof window === 'undefined') return initial;
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; } catch { return initial; }
  });
  const set = (v) => {
    const next = typeof v === 'function' ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return [val, set];
};

function Empty({ n, t }) {
  return <div style={{textAlign:'center',padding:'52px 20px',color:'#7A7672'}}><I n={n} s={34}/><div style={{marginTop:12}}>{t}</div></div>;
}

function AddNote({ onAdd }) {
  const [txt, setTxt] = useState('');
  return (
    <div style={{display:'flex',gap:8,marginTop:8}}>
      <input placeholder="Aggiungi nota..." value={txt} onChange={e=>setTxt(e.target.value)} style={{flex:1,padding:'10px 14px',border:'1.5px solid #d0cdc6',fontSize:13,fontFamily:'inherit',outline:'none'}}/>
      <button onClick={()=>{if(!txt.trim())return;onAdd(txt);setTxt('');}} style={{background:'#2C2B28',color:'#F0EDE6',border:'none',cursor:'pointer',padding:'10px 16px',fontSize:11,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase'}}>Aggiungi</button>
    </div>
  );
}

export default function Pannello() {
  const [tab, setTab] = useState('orders');
  const [sel, setSel] = useState(null);
  const [orders, setOrders] = useStorage('cb_orders', []);
  const [leads, setLeads] = useStorage('cb_leads', []);
  const [tickets, setTickets] = useStorage('cb_tickets', []);
  const [tasks, setTasks] = useStorage('cb_tasks', []);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const patchOrder = (id, p) => setOrders(prev => prev.map(o => o.id === id ? {...o,...p} : o));
  const patchLead = (id, p) => setLeads(prev => prev.map(l => l.id === id ? {...l,...p} : l));
  const patchTicket = (id, p) => setTickets(prev => prev.map(t => t.id === id ? {...t,...p} : t));
  const patchTask = (id, p) => setTasks(prev => prev.map(t => t.id === id ? {...t,...p} : t));
  const delTask = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  const openTix = tickets.filter(t => t.status !== 'Risolto').length;
  const pendTasks = tasks.filter(t => !t.done).length;
  const overdue = tasks.filter(t => !t.done && t.dueDate && new Date(t.dueDate) < new Date()).length;

  const OC = {Ricevuto:'#2C2B28','In preparazione':'#c47c1a',Pronto:'#4a7c59',Consegnato:'#7A7672'};
  const TC = {Aperto:'#c0392b','In lavorazione':'#c47c1a','In attesa cliente':'#2C2B28',Risolto:'#4a7c59'};
  const LC = {Nuovo:'#2C2B28',Contattato:'#B8860B',Chiuso:'#4a7c59'};

  // Client 360
  const cm = {};
  const ac = (e, type) => {
    const k = e.company || e.name; if (!k) return;
    if (!cm[k]) cm[k] = {name:k,phone:e.phone,email:e.email,orders:[],leads:[],tickets:[]};
    cm[k][type].push(e);
  };
  orders.forEach(o => ac(o,'orders')); leads.forEach(l => ac(l,'leads')); tickets.forEach(t => ac(t,'tickets'));
  const clients = Object.values(cm);

  const tabs = [
    {id:'orders',  label:`Ordini (${orders.length})`},
    {id:'tickets', label:`Assistenza (${openTix > 0 ? openTix+' aperti' : tickets.length})`, dot: openTix > 0},
    {id:'tasks',   label:`Attività (${pendTasks})`, dot: overdue > 0},
    {id:'leads',   label:`Lead (${leads.length})`},
    {id:'clients', label:`Clienti 360° (${clients.length})`},
  ];

  const lbl = {fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7A7672',display:'block',marginBottom:5};
  const inp = {width:'100%',padding:'10px 14px',border:'1.5px solid #d0cdc6',fontSize:13,fontFamily:'inherit',outline:'none',background:'#fff'};
  const ss = {width:'auto',padding:'6px 10px',fontWeight:700,fontSize:11,letterSpacing:'.05em',color:'#fff',border:'none',cursor:'pointer'};

  return (
    <>
      <SeoHead title={`Pannello Operatore | ${CONFIG.company.name}`} description="Pannello operatore interno"/>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{font-family:system-ui,-apple-system,sans-serif;background:#F0EDE6;color:#2C2B28;}a{color:inherit;text-decoration:none;}`}</style>

      <nav style={{position:'sticky',top:0,zIndex:200,background:'#2C2B28',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 28px',height:56}}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <Link href="/" style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:15,color:'#F0EDE6'}}>BELFIORE <span style={{color:'#B8860B'}}>·</span></Link>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#B8860B'}}>Pannello operatore</span>
        </div>
        <Link href="/" style={{fontSize:11,fontWeight:700,letterSpacing:'.09em',textTransform:'uppercase',color:'#F0EDE6',opacity:.7}}>← Sito pubblico</Link>
      </nav>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'40px 28px'}}>
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:'.18em',textTransform:'uppercase',color:'#B8860B',marginBottom:8}}>Pannello operatore</div>
          <h1 style={{fontFamily:'Georgia,serif',fontSize:30,fontWeight:900}}>Gestione centralizzata</h1>
        </div>

        {/* KPI */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:32}}>
          {[
            {l:'Ordini attivi', v:orders.filter(o=>o.status!=='Consegnato').length, n:'cart', c:'#2C2B28'},
            {l:'Ticket aperti', v:openTix, n:'ticket', c:openTix>0?'#c0392b':'#4a7c59'},
            {l:'Attività scadute', v:overdue, n:'warning', c:overdue>0?'#c47c1a':'#7A7672'},
            {l:'Lead nuovi', v:leads.filter(l=>l.status==='Nuovo').length, n:'user', c:'#B8860B'},
            {l:'Clienti', v:clients.length, n:'star', c:'#2C2B28'},
          ].map(({l,v,n,c})=>(
            <div key={l} style={{background:'#fff',border:'1px solid #e0ddd6',padding:'14px 18px',display:'flex',alignItems:'center',gap:12}}>
              <span style={{color:c}}><I n={n} s={22}/></span>
              <div>
                <div style={{fontFamily:'Georgia,serif',fontSize:24,fontWeight:900,color:c}}>{v}</div>
                <div style={{fontSize:10,color:'#7A7672',textTransform:'uppercase',letterSpacing:'.07em'}}>{l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',borderBottom:'2px solid #d8d4cc',marginBottom:22,flexWrap:'wrap'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>{setTab(t.id);setSel(null);}} style={{padding:'10px 22px',border:'none',background:'none',cursor:'pointer',fontWeight:700,fontSize:12,letterSpacing:'.08em',textTransform:'uppercase',color:tab===t.id?'#2C2B28':'#7A7672',borderBottom:tab===t.id?'2px solid #2C2B28':'2px solid transparent',marginBottom:-2}}>
              {t.label}
              {t.dot && <span style={{display:'inline-block',width:7,height:7,borderRadius:'50%',background:'#c0392b',marginLeft:6,verticalAlign:'middle'}}/>}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        {tab==='orders' && (
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {orders.length===0 ? <Empty n="cart" t="Nessun ordine ricevuto"/> : orders.map(o=>(
              <div key={o.id} style={{background:'#fff',border:'1px solid #e0ddd6',padding:'16px 20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:14}}>{o.name}{o.company?` · ${o.company}`:''}</div>
                    <div style={{fontSize:11,color:'#7A7672',marginTop:2}}>{o.id} · {o.createdAt}</div>
                    {o.phone && <div style={{fontSize:12,color:'#5a5652',marginTop:2}}>{o.phone}</div>}
                    {o.isVip && <span style={{background:'#B8860B',color:'#fff',padding:'2px 8px',fontSize:10,fontWeight:800,display:'inline-flex',alignItems:'center',gap:4,marginTop:6}}><I n="crown" s={11}/>VIP</span>}
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                    <select style={{...ss,background:OC[o.status]||'#2C2B28'}} value={o.status} onChange={e=>patchOrder(o.id,{status:e.target.value})}>
                      {['Ricevuto','In preparazione','Pronto','Consegnato'].map(s=><option key={s}>{s}</option>)}
                    </select>
                    <button onClick={()=>setSel(sel===o.id?null:o.id)} style={{background:'none',border:'1.5px solid #d0cdc6',cursor:'pointer',padding:'6px 10px',display:'flex',alignItems:'center',color:'#2C2B28'}}><I n="eye" s={16}/></button>
                    <button onClick={()=>{setTickets(prev=>[{id:`TKT-${Date.now()}`,orderId:o.id,name:o.name,company:o.company,phone:o.phone,type:'Generico',desc:'',priority:'Normale',status:'Aperto',createdAt:new Date().toLocaleString('it-IT'),notes:[]},...prev]);setTab('tickets');showToast('Ticket creato');}} style={{background:'none',border:'1.5px solid #d0cdc6',cursor:'pointer',padding:'6px 10px',display:'flex',alignItems:'center',color:'#2C2B28'}}><I n="ticket" s={16}/></button>
                  </div>
                </div>
                {sel===o.id && (
                  <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid #e0ddd6'}}>
                    {o.items?.map(it=>(
                      <div key={it.id} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:'1px solid #f0ede6',fontSize:12}}>
                        <div>{it.name}{it.isVip&&<span style={{color:'#B8860B',fontSize:10,fontWeight:700,marginLeft:5}}>VIP</span>}</div>
                        <div>{it.qty} {it.unit}</div>
                      </div>
                    ))}
                    {o.delivery && <div style={{marginTop:8,fontSize:12,color:'#5a5652'}}>Modalità: <strong>{o.delivery==='ritiro'?'Ritiro':'Consegna a cantiere'}</strong></div>}
                    {o.note && <div style={{marginTop:5,fontSize:12,color:'#5a5652'}}>Note: {o.note}</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TICKETS */}
        {tab==='tickets' && (
          <div>
            <NewTicket onAdd={t=>{setTickets(prev=>[t,...prev]);showToast('Ticket aperto');}} config={CONFIG}/>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:18}}>
              {tickets.length===0 ? <Empty n="ticket" t="Nessun ticket di assistenza"/> : tickets.map(t=>(
                <div key={t.id} style={{background:'#fff',border:'1px solid #e0ddd6',padding:'16px 20px',borderLeft:`3px solid ${TC[t.status]||'#ccc'}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                        <span style={{fontWeight:800,fontSize:13}}>{t.name}{t.company?` · ${t.company}`:''}</span>
                        <span style={{background:'#F0EDE6',color:'#5a5652',border:'1px solid #d0cdc6',padding:'2px 8px',fontSize:10,fontWeight:700}}>{t.type}</span>
                        {t.priority==='Urgente'&&<span style={{background:'#c0392b',color:'#fff',padding:'2px 8px',fontSize:10,fontWeight:700}}>Urgente</span>}
                      </div>
                      <div style={{fontSize:11,color:'#7A7672',marginTop:3}}>{t.id} · {t.createdAt}</div>
                      {t.desc&&<div style={{fontSize:12,color:'#5a5652',marginTop:5,fontStyle:'italic'}}>"{t.desc}"</div>}
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <select style={{...ss,background:TC[t.status]||'#2C2B28'}} value={t.status} onChange={e=>patchTicket(t.id,{status:e.target.value})}>
                        {['Aperto','In lavorazione','In attesa cliente','Risolto'].map(s=><option key={s}>{s}</option>)}
                      </select>
                      <button onClick={()=>setSel(sel===t.id?null:t.id)} style={{background:'none',border:'1.5px solid #d0cdc6',cursor:'pointer',padding:'6px 10px',display:'flex',color:'#2C2B28'}}><I n="eye" s={16}/></button>
                    </div>
                  </div>
                  {sel===t.id&&(
                    <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid #e0ddd6'}}>
                      {(t.notes||[]).map((note,i)=>(
                        <div key={i} style={{background:'#F5EDD0',padding:'7px 11px',marginBottom:7,fontSize:12}}>
                          <div style={{fontWeight:700,fontSize:10,color:'#B8860B',marginBottom:2}}>{note.author} · {note.date}</div>
                          {note.text}
                        </div>
                      ))}
                      <AddNote onAdd={txt=>patchTicket(t.id,{notes:[...(t.notes||[]),{text:txt,author:'Operatore',date:new Date().toLocaleString('it-IT')}]})}/>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TASKS */}
        {tab==='tasks' && (
          <div>
            <NewTask onAdd={t=>{setTasks(prev=>[t,...prev]);showToast('Attività aggiunta');}} config={CONFIG}/>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:18}}>
              {tasks.length===0 ? <Empty n="task" t="Nessuna attività"/> :
                [...tasks].sort((a,b)=>{if(a.done!==b.done)return a.done?1:-1;if(a.dueDate&&b.dueDate)return new Date(a.dueDate)-new Date(b.dueDate);return 0;}).map(t=>{
                  const ov = !t.done&&t.dueDate&&new Date(t.dueDate)<new Date();
                  return (
                    <div key={t.id} style={{background:'#fff',border:'1px solid #e0ddd6',padding:'12px 18px',display:'flex',alignItems:'center',gap:12,opacity:t.done?.6:1,borderLeft:`3px solid ${ov?'#c0392b':t.done?'#4a7c59':'#d0cdc6'}`}}>
                      <input type="checkbox" checked={t.done||false} onChange={e=>patchTask(t.id,{done:e.target.checked})} style={{width:17,height:17,accentColor:'#B8860B',cursor:'pointer',flexShrink:0}}/>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:t.done?400:700,textDecoration:t.done?'line-through':'none',color:t.done?'#7A7672':'#2C2B28'}}>{t.title}</div>
                        <div style={{display:'flex',gap:14,marginTop:3,flexWrap:'wrap'}}>
                          {t.client&&<span style={{fontSize:11,color:'#7A7672'}}>{t.client}</span>}
                          {t.dueDate&&<span style={{fontSize:11,color:ov?'#c0392b':'#7A7672',fontWeight:ov?700:400}}>{ov?'SCADUTA':'Scade'} {new Date(t.dueDate).toLocaleDateString('it-IT')}</span>}
                          {t.type&&<span style={{fontSize:11,background:'#F0EDE6',padding:'1px 7px',color:'#7A7672'}}>{t.type}</span>}
                        </div>
                      </div>
                      <button onClick={()=>delTask(t.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#7A7672',display:'flex'}}><I n="x" s={15}/></button>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        {/* LEADS */}
        {tab==='leads' && (
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {leads.length===0 ? <Empty n="user" t="Nessun lead ricevuto"/> : leads.map(l=>(
              <div key={l.id} style={{background:'#fff',border:'1px solid #e0ddd6',padding:'16px 20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13}}>{l.name}{l.company?` · ${l.company}`:''}</div>
                    <div style={{fontSize:11,color:'#7A7672',marginTop:2}}>{l.id} · {l.createdAt}</div>
                    <div style={{display:'flex',gap:12,marginTop:4}}>{l.phone&&<span style={{fontSize:12,color:'#5a5652'}}>{l.phone}</span>}{l.email&&<span style={{fontSize:12,color:'#5a5652'}}>{l.email}</span>}</div>
                    <div style={{marginTop:6,fontSize:12,color:'#5a5652',fontStyle:'italic'}}>"{l.type}"{l.message?` — ${l.message}`:''}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'flex-start',gap:8}}>
                    <select style={{...ss,background:LC[l.status]||'#2C2B28'}} value={l.status} onChange={e=>patchLead(l.id,{status:e.target.value})}>
                      {['Nuovo','Contattato','Chiuso'].map(s=><option key={s}>{s}</option>)}
                    </select>
                    <button onClick={()=>{const d=new Date();d.setDate(d.getDate()+1);setTasks(prev=>[{id:`TSK-${Date.now()}`,title:`Follow-up ${l.name}`,client:l.company||l.name,type:'Follow-up lead',dueDate:d.toISOString().split('T')[0],done:false},...prev]);setTab('tasks');showToast('Attività follow-up creata');}} style={{background:'none',border:'1.5px solid #d0cdc6',cursor:'pointer',padding:'6px 10px',display:'flex',color:'#2C2B28'}}><I n="task" s={16}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CLIENTS 360 */}
        {tab==='clients' && (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {clients.length===0 ? <Empty n="user" t="Nessun cliente ancora"/> : clients.map(c=>{
              const exp = sel===c.name;
              const spent = c.orders.reduce((s,o)=>s+o.total,0);
              const isVip = c.orders.some(o=>o.isVip);
              const hasOpenTix = c.tickets.some(t=>t.status!=='Risolto');
              return (
                <div key={c.name} style={{background:'#fff',border:'1px solid #e0ddd6',padding:'16px 20px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                    <div style={{display:'flex',alignItems:'center',gap:12}}>
                      <div style={{width:38,height:38,borderRadius:'50%',background:'#2C2B28',display:'flex',alignItems:'center',justifyContent:'center',color:'#F0EDE6',fontWeight:900,fontSize:15,flexShrink:0}}>{c.name[0].toUpperCase()}</div>
                      <div>
                        <div style={{display:'flex',alignItems:'center',gap:7}}>
                          <span style={{fontWeight:800,fontSize:14}}>{c.name}</span>
                          {isVip&&<span style={{background:'#B8860B',color:'#fff',padding:'2px 7px',fontSize:10,fontWeight:800,display:'inline-flex',alignItems:'center',gap:3}}><I n="crown" s={10}/>VIP</span>}
                          {hasOpenTix&&<span style={{background:'#c0392b',color:'#fff',padding:'2px 7px',fontSize:10,fontWeight:800}}>Ticket aperto</span>}
                        </div>
                        <div style={{display:'flex',gap:12,marginTop:3}}>{c.phone&&<span style={{fontSize:11,color:'#7A7672'}}>{c.phone}</span>}{c.email&&<span style={{fontSize:11,color:'#7A7672'}}>{c.email}</span>}</div>
                      </div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:16,flexWrap:'wrap'}}>
                      {[['cart',c.orders.length,'ordini'],['ticket',c.tickets.length,'ticket'],['user',c.leads.length,'lead']].map(([ic,n,lb])=>(
                        <div key={lb} style={{textAlign:'center'}}><div style={{fontWeight:900,fontSize:15}}>{n}</div><div style={{fontSize:10,color:'#7A7672',textTransform:'uppercase'}}>{lb}</div></div>
                      ))}
                      <button onClick={()=>setSel(exp?null:c.name)} style={{background:'none',border:'1.5px solid #d0cdc6',cursor:'pointer',padding:'6px 10px',display:'flex',color:'#2C2B28'}}><I n={exp?'x':'eye'} s={16}/></button>
                    </div>
                  </div>
                  {exp&&(
                    <div style={{marginTop:16,paddingTop:16,borderTop:'1px solid #e0ddd6'}}>
                      <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7A7672',marginBottom:12}}>Timeline attività</div>
                      {[...c.orders.map(o=>({date:o.createdAt,n:'cart',col:'#2C2B28',text:`Ordine ${o.id} — ${o.status}`})),...c.tickets.map(t=>({date:t.createdAt,n:'ticket',col:'#c0392b',text:`Ticket ${t.id} — ${t.status}`})),...c.leads.map(l=>({date:l.createdAt,n:'user',col:'#B8860B',text:`Lead ${l.id} — ${l.status}`}))].map((ev,i)=>(
                        <div key={i} style={{display:'flex',gap:12,marginBottom:9,alignItems:'flex-start'}}>
                          <div style={{width:26,height:26,borderRadius:'50%',background:ev.col+'22',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><span style={{color:ev.col}}><I n={ev.n} s={13}/></span></div>
                          <div style={{fontSize:12,paddingTop:4}}><div style={{fontWeight:600}}>{ev.text}</div><div style={{fontSize:10,color:'#7A7672',marginTop:1}}>{ev.date}</div></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:9999,background:'#4a7c59',color:'#fff',padding:'13px 20px',fontWeight:700,fontSize:13,display:'flex',alignItems:'center',gap:10,boxShadow:'0 8px 28px rgba(0,0,0,.2)'}}><I n="check" s={18}/>{toast}</div>}
    </>
  );
}

function NewTicket({ onAdd, config }) {
  const [open, setOpen] = useState(false);
  const blank = {name:'',company:'',phone:'',type:'Reso',priority:'Normale',desc:''};
  const [f, setF] = useState(blank);
  const u = (k,v) => setF(p=>({...p,[k]:v}));
  const lbl = {fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7A7672',display:'block',marginBottom:5};
  const inp = {width:'100%',padding:'10px 14px',border:'1.5px solid #d0cdc6',fontSize:13,fontFamily:'inherit',outline:'none'};
  if (!open) return <button onClick={()=>setOpen(true)} style={{background:'transparent',color:'#2C2B28',border:'1.5px solid #2C2B28',cursor:'pointer',fontSize:12,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',padding:'10px 20px',display:'flex',alignItems:'center',gap:7}}><I n="plus" s={14}/>Apri nuovo ticket</button>;
  return (
    <div style={{background:'#fff',border:'1px solid #e0ddd6',padding:20,marginBottom:4}}>
      <div style={{fontWeight:800,fontSize:14,marginBottom:14}}>Nuovo ticket assistenza</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11,marginBottom:11}}>
        <div><label style={lbl}>Cliente *</label><input placeholder="Nome cliente" value={f.name} onChange={e=>u('name',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Azienda</label><input placeholder="Ragione sociale" value={f.company} onChange={e=>u('company',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Telefono</label><input placeholder="+39..." value={f.phone} onChange={e=>u('phone',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Tipo</label><select value={f.type} onChange={e=>u('type',e.target.value)} style={{...inp,background:'#fff'}}>{config.ticketTypes.map(o=><option key={o}>{o}</option>)}</select></div>
      </div>
      <div style={{marginBottom:11}}><label style={lbl}>Priorità</label><div style={{display:'flex',gap:7}}>{['Normale','Alta','Urgente'].map(p=>(<button key={p} onClick={()=>u('priority',p)} style={{padding:'6px 14px',border:'1.5px solid',background:f.priority===p?'#2C2B28':'transparent',color:f.priority===p?'#fff':'#2C2B28',borderColor:'#2C2B28',cursor:'pointer',fontSize:11,fontWeight:700}}>{p}</button>))}</div></div>
      <div style={{marginBottom:13}}><label style={lbl}>Descrizione</label><textarea rows={2} placeholder="Descrivi il problema..." value={f.desc} onChange={e=>u('desc',e.target.value)} style={{...inp,resize:'vertical'}}/></div>
      <div style={{display:'flex',gap:9}}>
        <button onClick={()=>{if(!f.name)return;onAdd({id:`TKT-${Date.now()}`,...f,status:'Aperto',createdAt:new Date().toLocaleString('it-IT'),notes:[]});setOpen(false);setF(blank);}} style={{background:'#B8860B',color:'#fff',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'11px 22px'}}>Apri ticket</button>
        <button onClick={()=>setOpen(false)} style={{background:'transparent',color:'#2C2B28',border:'1.5px solid #2C2B28',cursor:'pointer',fontSize:12,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',padding:'10px 20px'}}>Annulla</button>
      </div>
    </div>
  );
}

function NewTask({ onAdd, config }) {
  const [open, setOpen] = useState(false);
  const blank = {title:'',client:'',type:'Follow-up lead',dueDate:''};
  const [f, setF] = useState(blank);
  const u = (k,v) => setF(p=>({...p,[k]:v}));
  const lbl = {fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'#7A7672',display:'block',marginBottom:5};
  const inp = {width:'100%',padding:'10px 14px',border:'1.5px solid #d0cdc6',fontSize:13,fontFamily:'inherit',outline:'none'};
  if (!open) return <button onClick={()=>setOpen(true)} style={{background:'transparent',color:'#2C2B28',border:'1.5px solid #2C2B28',cursor:'pointer',fontSize:12,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',padding:'10px 20px',display:'flex',alignItems:'center',gap:7}}><I n="plus" s={14}/>Nuova attività</button>;
  return (
    <div style={{background:'#fff',border:'1px solid #e0ddd6',padding:18,marginBottom:4}}>
      <div style={{fontWeight:800,fontSize:14,marginBottom:13}}>Nuova attività</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:11,marginBottom:11}}>
        <div style={{gridColumn:'span 2'}}><label style={lbl}>Descrizione *</label><input placeholder="es. Richiama cliente Rossi" value={f.title} onChange={e=>u('title',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Cliente</label><input placeholder="Azienda o contatto" value={f.client} onChange={e=>u('client',e.target.value)} style={inp}/></div>
        <div><label style={lbl}>Tipo</label><select value={f.type} onChange={e=>u('type',e.target.value)} style={{...inp,background:'#fff'}}>{config.taskTypes.map(o=><option key={o}>{o}</option>)}</select></div>
        <div><label style={lbl}>Scadenza</label><input type="date" value={f.dueDate} onChange={e=>u('dueDate',e.target.value)} style={inp}/></div>
      </div>
      <div style={{display:'flex',gap:9}}>
        <button onClick={()=>{if(!f.title)return;onAdd({id:`TSK-${Date.now()}`,...f,done:false});setOpen(false);setF(blank);}} style={{background:'#B8860B',color:'#fff',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase',padding:'11px 22px'}}>Aggiungi</button>
        <button onClick={()=>setOpen(false)} style={{background:'transparent',color:'#2C2B28',border:'1.5px solid #2C2B28',cursor:'pointer',fontSize:12,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',padding:'10px 20px'}}>Annulla</button>
      </div>
    </div>
  );
}
