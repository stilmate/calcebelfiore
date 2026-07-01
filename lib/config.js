// ╔══════════════════════════════════════════════════════════════╗
// ║  CONFIGURAZIONE — modifica qui senza toccare il codice      ║
// ╚══════════════════════════════════════════════════════════════╝

export const CONFIG = {
  company: {
    name:        "Calce Belfiore",
    tagline:     "Calce, intonaci e sabbie da cava a cantiere.",
    since:       "Dal 1985",
    description: "Produciamo calce tradizionale, intonaci premiscelati e sabbie selezionate per professionisti edili, imprese e rivenditori.",
    location:    "Martirano, Calabria",
    vat:         "P.IVA 00000000000",
    year:        "2025",
  },
  seo: {
    siteName:    "Calce Belfiore",
    titleSuffix: "| Calce Belfiore — Martirano, Calabria",
    defaultTitle:"Calce Belfiore | Calce, Intonaci e Sabbie — Martirano Calabria",
    description: "Produttori di calce tradizionale, intonaci premiscelati e sabbie selezionate dal 1985. Ordina online, consegna rapida in Calabria e nel Sud Italia.",
    keywords:    "calce Calabria, intonaco premiscelato, sabbia edilizia, grassello di calce, conglomerato bituminoso, Martirano, Cosenza, edilizia Calabria",
    ogImage:     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85",
    canonical:   "https://www.calcebelfiore.com",
    schema: {
      type:      "LocalBusiness",
      address:   "Via Example 1, 88040 Martirano CZ",
      telephone: "+39 000 000 0000",
      geo:       { lat: 39.0, lng: 16.3 },
    },
  },
  contacts: {
    phone:   "+39 000 000 0000",
    email:   "ordini@calcebelfiore.com",
    hours:   "Lun–Ven 07:30–17:00 · Sab 07:30–12:00",
    address: "Via Example 1, 88040 Martirano (CZ)",
  },
  images: {
    hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
  },
  stats: [
    { value: "6",      label: "linee prodotto" },
    { value: "25 kg",  label: "formato standard" },
    { value: "12/24h", label: "evasione VIP" },
    { value: "100%",   label: "made in Italy" },
  ],
  vip: {
    title:       "Priorità di evasione",
    description: "I clienti VIP ricevono la propria commessa entro le tempistiche garantite e hanno accesso diretto al referente commerciale. Assistenza post-vendita dedicata inclusa.",
    badges: [
      { value: "12h",      label: "sabbie VIP" },
      { value: "24h",      label: "intonaci VIP" },
      { value: "Dedicato", label: "post-vendita" },
    ],
  },
  steps: [
    { title: "Scegli i prodotti", desc: "Naviga il catalogo e aggiungi al carrello. Sacchi da 25 kg, disponibilità immediata." },
    { title: "Conferma l'ordine", desc: "Inserisci i tuoi dati. Attiva la priorità VIP per evasione garantita." },
    { title: "Noi prepariamo",    desc: "Ricevi conferma rapida. Il team prepara il prodotto e ti contatta per consegna o ritiro." },
  ],
  leadTypes:   ["Preventivo","Informazioni prodotto","Contratto VIP","Ordine su misura","Assistenza tecnica","Diventare rivenditore","Altro"],
  ticketTypes: ["Reso","Reclamo qualità","Consegna mancante","Assistenza tecnica","Richiesta documentazione","Richiesta sconti","Altro"],
  taskTypes:   ["Follow-up lead","Relazione cliente","Preparazione offerta","Assistenza post-vendita","Sollecito pagamento","Visita commerciale","Demo prodotto","Altro"],
  roadmap: {
    phase: "FASE 1",
    label: "SPOC & Digitalizzazione commerciale",
    erp:   "Danea Easyfatt → migrazione Odoo (Fase 2)",
    integration: {
      current: "localStorage (standalone)",
      phase2:  "API REST → Odoo CRM + Sales + Inventory",
      phase3:  "MES produzione + WMS magazzino",
    },
    // Fase 2: decommentare e inserire URL Odoo
    // endpoint: "https://erp.calcebelfiore.com/web/dataset/call_kw",
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║  PRODOTTI — slug = URL SEO della pagina prodotto            ║
// ╚══════════════════════════════════════════════════════════════╝
export const PRODUCTS = [
  {
    id:1, cat:"Calce Tradizionale", name:"Grassello di Calce",
    slug:"grassello-di-calce",
    desc:"Legante a presa aerea per malte traspiranti ed ecologiche. Granulometria < 1.5 mm.",
    longDesc:"Il grassello di calce è il legante per eccellenza della bioedilizia. Ideale per restauro di edifici storici e intonaci interni ed esterni. Migliora la traspirabilità delle pareti.",
    unit:"sacco 25 kg", price:12.5, tag:"Ecologico · Traspirante", color:"#e8e0cc",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    seo:{ title:"Grassello di Calce 25kg | Calce Belfiore Calabria", desc:"Acquista grassello di calce tradizionale in sacchi da 25kg. Produzione propria dal 1985. Consegna rapida Calabria.", keywords:"grassello di calce, calce aerea, calce tradizionale, bioedilizia Calabria" },
  },
  {
    id:2, cat:"Intonaci di Finitura", name:"IntoQuarz GB 25.11",
    slug:"intoquarz-gb-25-11",
    desc:"Intonaco a base di calce idrata, cemento e sabbie quarzifere. Granulometria 1.2 mm. Idrofugato.",
    longDesc:"Intonaco premiscelato di alta qualità per finiture esterne e interne. La componente idrofugante garantisce resistenza all'acqua e alle intemperie.",
    unit:"sacco 25 kg", price:18.0, tag:"Idrofugato · Esterno/Interno", color:"#d4cfc4",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    seo:{ title:"Intonaco Premiscelato IntoQuarz 25kg | Calce Belfiore", desc:"Intonaco di finitura idrofugato a base di calce e quarzo. Granulometria 1.2mm. Produzione Calabria. Ordina online.", keywords:"intonaco premiscelato, intonaco idrofugato, intonaco quarzo Calabria" },
  },
  {
    id:3, cat:"Intonaci di Finitura", name:"Rasante EB 7.2",
    slug:"rasante-eb-7-2",
    desc:"Rasante di finitura a base di calce idrata e sabbie classificate. Granulometria 0.5 mm.",
    longDesc:"Rasante superfine per la finitura finale di pareti interne ed esterne. Formula anti-cavillature per una superficie liscia e duratura.",
    unit:"sacco 25 kg", price:16.5, tag:"Anti-cavillature · Finitura", color:"#ccc8be",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
    seo:{ title:"Rasante EB 7.2 Finitura Pareti 25kg | Calce Belfiore", desc:"Rasante di finitura anti-cavillature per pareti. Granulometria 0.5mm. Produzione propria Martirano Calabria.", keywords:"rasante pareti, rasante finitura, intonachino Calabria" },
  },
  {
    id:4, cat:"Sabbie", name:"Sabbia Silicea Naturale",
    slug:"sabbia-silicea-naturale",
    desc:"Sabbia silicea naturale, lavata e vagliata. Granulometrie 0-6 mm e 0-1.5 mm.",
    longDesc:"Sabbia silicea di cava, selezionata, lavata e vagliata per costanza granulometrica. Adatta per malte, calcestruzzi e preparazioni edili.",
    unit:"sacco 25 kg", price:8.0, tag:"Lavata · Vagliata", color:"#e0d8c4",
    leadTime:{standard:"24h",vip:"12h"},
    img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    seo:{ title:"Sabbia Silicea Naturale Edilizia 25kg | Calce Belfiore", desc:"Sabbia silicea lavata e vagliata per edilizia. Granulometrie 0-6mm. Consegna 24h. Produzione Calabria.", keywords:"sabbia edilizia, sabbia silicea, sabbia lavata Calabria" },
  },
  {
    id:5, cat:"Sabbie", name:"Sabbia Extra Fine Quarzo",
    slug:"sabbia-extra-fine-quarzo",
    desc:"Sabbia silicea essiccata e selezionata. Granulometrie 0-0.5 mm, 0.5-1.2 mm, 0-1.2 mm.",
    longDesc:"Sabbia quarzifera essiccata di altissima purezza per intonaci di finitura, malte decorative e pavimentazioni speciali.",
    unit:"sacco 25 kg", price:10.0, tag:"Essiccata · Alta purezza", color:"#dcd4b8",
    leadTime:{standard:"24h",vip:"12h"},
    img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    seo:{ title:"Sabbia di Quarzo Extra Fine 25kg | Calce Belfiore", desc:"Sabbia quarzifera essiccata per intonaci, resine e finiture speciali. Alta purezza. Produzione propria.", keywords:"sabbia quarzo, sabbia fine, sabbia essiccata per intonaco" },
  },
  {
    id:6, cat:"Conglomerato Bituminoso", name:"PlastiCold",
    slug:"plasticold-bituminoso",
    desc:"Conglomerato bituminoso a freddo, pronto all'uso. Rimane plastico in tutte le stagioni.",
    longDesc:"Conglomerato bituminoso a freddo per riparazioni stradali, parcheggi e piazzali. Non richiede riscaldamento, applicabile in qualsiasi condizione climatica.",
    unit:"sacco 25 kg", price:22.0, tag:"Pronto all'uso · Tutto l'anno", color:"#c8c0b0",
    leadTime:{standard:"72h",vip:"48h"},
    img:"https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
    seo:{ title:"PlastiCold Bituminoso a Freddo 25kg | Calce Belfiore", desc:"Conglomerato bituminoso a freddo per riparazioni stradali. Pronto all'uso tutto l'anno. Produzione Calabria.", keywords:"bituminoso a freddo, asfalto freddo, riparazione buche strada Calabria" },
  },
];
