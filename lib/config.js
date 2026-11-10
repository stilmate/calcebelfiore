// ╔══════════════════════════════════════════════════════════════╗
// ║  CONFIGURAZIONE — modifica qui senza toccare il codice      ║
// ╚══════════════════════════════════════════════════════════════╝

export const CONFIG = {
  company: {
    name:        "Belfiore",
    tagline:     "Calce, intonaci e sabbie da cava a cantiere.",
    since:       "Dal 1978",
    description: "Tre generazioni della famiglia Belfiore: calce tradizionale, intonaci di finitura, sabbie selezionate e conglomerato bituminoso a freddo, dalla nostra cava di Martirano.",
    location:    "Martirano, Calabria",
    vat:         "P.IVA 00575960794",
    year:        "2026",
  },
  seo: {
    siteName:    "Belfiore",
    titleSuffix: "| Belfiore — Martirano, Calabria",
    defaultTitle:"Belfiore | Calce, Intonaci e Sabbie — Martirano Calabria",
    description: "Produttori di calce tradizionale, intonaci premiscelati e sabbie selezionate dal 1978. Ordina online, consegna rapida in Calabria e nel Sud Italia.",
    keywords:    "calce Calabria, intonaco premiscelato, sabbia edilizia, grassello di calce, conglomerato bituminoso, Martirano, Cosenza, edilizia Calabria",
    ogImage:     "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85",
    canonical:   "https://www.calcebelfiore.com",
    schema: {
      type:      "LocalBusiness",
      address:   "Contrada Savuto, 88040 Martirano CZ",
      telephone: "+39 0968 99784",
      geo:       { lat: 39.0, lng: 16.3 },
    },
  },
  contacts: {
    phone:   "+39 0968 99784 · +39 338 9240748",
    email:   "ordini@calcebelfiore.com",
    hours:   "Lun–Ven 07:30–17:00 · Sab 07:30–12:00",
    address: "Contrada Savuto, 88040 Martirano (CZ)",
  },
  images: {
    hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85",
  },
  stats: [
    { value: "11",     label: "prodotti" },
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
  leadTypes:   ["Preventivo","Rivendita materiali","Informazioni prodotto","Contratto VIP","Ordine su misura","Assistenza tecnica","Diventare rivenditore","Altro"],
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

// Rivendita materiali di terzi: vedi lib/rivendita.js

// ╔══════════════════════════════════════════════════════════════╗
// ║  PRODOTTI — slug = URL SEO della pagina prodotto            ║
// ╚══════════════════════════════════════════════════════════════╝
// Testi allineati al sito live calcebelfiore.it (nov 2026). price = uso interno, 0 = da definire.
export const PRODUCTS = [
  {
    id:1, cat:"Calce Tradizionale", name:"Grassello di Calce",
    slug:"grassello-di-calce",
    desc:"Legante a presa aerea per malte traspiranti ed ecologiche, interne ed esterne.",
    longDesc:"Il grassello di calce è il legante della tradizione e della bioedilizia: ideale per malte traspiranti, restauro di edifici storici e intonaci interni ed esterni.",
    unit:"sacco 25 kg", price:12.5, tag:"Ecologico · Traspirante", color:"#e8e0cc",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    seo:{ title:"Grassello di Calce 25kg | Belfiore Calabria", desc:"Grassello di calce tradizionale a presa aerea per malte traspiranti. Produzione propria dal 1978 a Martirano (CZ).", keywords:"grassello di calce, calce aerea, calce tradizionale, bioedilizia Calabria" },
  },
  {
    id:7, cat:"Calce Tradizionale", name:"Tonachina",
    slug:"tonachina",
    desc:"Intonaco di finitura a presa aerea tradizionale, per esterno e interno, naturale e traspirante. Granulometria < 1,5 mm.",
    longDesc:"Intonaco di finitura tradizionale a presa aerea, naturale e traspirante, per esterni e interni. Granulometria inferiore a 1,5 mm.",
    unit:"sacco 25 kg", price:0, tag:"Naturale · Traspirante", color:"#e4dcc8",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    seo:{ title:"Tonachina Intonaco a Calce 25kg | Belfiore Calabria", desc:"Tonachina: intonaco di finitura a calce aerea, naturale e traspirante, granulometria < 1,5 mm. Produzione Martirano (CZ).", keywords:"tonachina, intonaco a calce, intonaco traspirante, finitura calce Calabria" },
  },
  {
    id:8, cat:"Intonaci di Finitura", name:"GE 47.16",
    slug:"ge-47-16",
    desc:"Intonaco di finitura a base di calce idrata, cemento e sabbie classificate a struttura quarzifera. Granulometria 1,2 mm.",
    longDesc:"Intonaco di finitura a base di calce idrata, cemento, sabbie classificate con struttura quarzifera e additivi specifici per migliorarne lavorabilità e adesione.",
    unit:"sacco 25 kg", price:0, tag:"Quarzifero · Finitura", color:"#d6d0c4",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    seo:{ title:"Intonaco di Finitura GE 47.16 25kg | Belfiore", desc:"Intonaco di finitura GE 47.16 a base di calce idrata e sabbie quarzifere, granulometria 1,2 mm. Produzione Calabria.", keywords:"intonaco di finitura, intonaco premiscelato, GE 47.16, intonaco Calabria" },
  },
  {
    id:2, cat:"Intonaci di Finitura", name:"IntoQuarz GB 25.11",
    slug:"intoquarz-gb-25-11",
    desc:"Intonaco di finitura a base di calce idrata, cemento e sabbie selezionate a struttura quarzifera. Granulometria 1,2 mm.",
    longDesc:"IntoQuarz GB 25.11 è un intonaco di finitura a base di calce idrata, cemento, sabbie selezionate con struttura quarzifera (granulometria 1,2 mm) e additivi specifici per migliorare lavorabilità e adesione.",
    unit:"sacco 25 kg", price:18.0, tag:"Quarzifero · Esterno/Interno", color:"#d4cfc4",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    seo:{ title:"Intonaco IntoQuarz GB 25.11 25kg | Belfiore", desc:"Intonaco di finitura IntoQuarz GB 25.11 a base di calce idrata e sabbie quarzifere, granulometria 1,2 mm. Produzione Calabria.", keywords:"intonaco premiscelato, intonaco quarzo, IntoQuarz, intonaco Calabria" },
  },
  {
    id:3, cat:"Intonaci di Finitura", name:"Rasante di Finitura EB 7.2",
    slug:"rasante-eb-7-2",
    desc:"Rasante di finitura a base di calce idrata, cemento e sabbie classificate. Granulometria 0,5 mm.",
    longDesc:"Rasante di finitura a base di calce idrata, cemento, sabbie classificate e additivi specifici per migliorare lavorabilità e adesione. Granulometria 0,5 mm.",
    unit:"sacco 25 kg", price:16.5, tag:"Finitura fine · 0,5 mm", color:"#ccc8be",
    leadTime:{standard:"48h",vip:"24h"},
    img:"https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80",
    seo:{ title:"Rasante di Finitura EB 7.2 25kg | Belfiore", desc:"Rasante di finitura EB 7.2 a base di calce idrata, granulometria 0,5 mm. Produzione propria Martirano (CZ).", keywords:"rasante pareti, rasante finitura, rasante calce Calabria" },
  },
  {
    id:4, cat:"Sabbie", name:"Sabbia",
    slug:"sabbia-silicea-naturale",
    desc:"Sabbia silicea naturale, lavata e vagliata. Granulometria 0–6 mm.",
    longDesc:"Sabbia silicea naturale di cava, lavata e vagliata. Granulometria 0–6 mm, per malte, calcestruzzi e preparazioni edili.",
    unit:"sacco 25 kg", price:8.0, tag:"Lavata · Vagliata", color:"#e0d8c4",
    leadTime:{standard:"24h",vip:"12h"},
    img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    seo:{ title:"Sabbia Silicea Lavata 0-6 mm 25kg | Belfiore", desc:"Sabbia silicea naturale lavata e vagliata, granulometria 0-6 mm. Dalla nostra cava di Martirano (CZ).", keywords:"sabbia edilizia, sabbia silicea, sabbia lavata Calabria" },
  },
  {
    id:9, cat:"Sabbie", name:"Sabbia Essiccata",
    slug:"sabbia-essiccata",
    desc:"Sabbia silicea lavata, accuratamente selezionata ed essiccata. Disponibile in diverse granulometrie.",
    longDesc:"Sabbia silicea lavata, selezionata accuratamente ed essiccata. Disponibile in diverse granulometrie.",
    unit:"sacco 25 kg", price:0, tag:"Essiccata · Selezionata", color:"#ddd5c0",
    leadTime:{standard:"24h",vip:"12h"},
    img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
    seo:{ title:"Sabbia Essiccata 25kg | Belfiore Calabria", desc:"Sabbia silicea lavata, selezionata ed essiccata, in diverse granulometrie. Produzione propria Calabria.", keywords:"sabbia essiccata, sabbia asciutta, sabbia silicea Calabria" },
  },
  {
    id:10, cat:"Sabbie", name:"Sabbia Fine Essiccata al Quarzo",
    slug:"sabbia-fine-essiccata-quarzo",
    desc:"Sabbia lavata, vagliata ed essiccata, ottima resistenza. Granulometrie 0–0,5 mm, 0,5–1,2 mm, 0–1,2 mm.",
    longDesc:"La sabbia viene lavata, vagliata e infine essiccata. Ottima resistenza. Granulometrie 0–0,5 mm, 0,5–1,2 mm e 0–1,2 mm.",
    unit:"sacco 25 kg", price:0, tag:"Essiccata · Quarzo", color:"#dcd4b8",
    leadTime:{standard:"24h",vip:"12h"},
    img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    seo:{ title:"Sabbia Fine Essiccata al Quarzo 25kg | Belfiore", desc:"Sabbia fine essiccata al quarzo, granulometrie 0-0,5, 0,5-1,2 e 0-1,2 mm. Produzione Calabria.", keywords:"sabbia quarzo, sabbia fine essiccata, sabbia per intonaco" },
  },
  {
    id:5, cat:"Sabbie", name:"Sabbia Extra Fine al Quarzo",
    slug:"sabbia-extra-fine-quarzo",
    desc:"Sabbia di cava lavata e vagliata, ad alto contenuto di quarzo. Granulometria 0–1,5 mm.",
    longDesc:"Sabbia di cava lavata e vagliata con un attento controllo della curva granulometrica, ad alto contenuto di quarzo. Granulometria 0–1,5 mm.",
    unit:"sacco 25 kg", price:10.0, tag:"Alto quarzo · Curva controllata", color:"#d8d0b4",
    leadTime:{standard:"24h",vip:"12h"},
    img:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
    seo:{ title:"Sabbia Extra Fine al Quarzo 25kg | Belfiore", desc:"Sabbia extra fine ad alto contenuto di quarzo, granulometria 0-1,5 mm, curva controllata. Produzione Calabria.", keywords:"sabbia extra fine, sabbia quarzo, sabbia per finiture" },
  },
  {
    id:6, cat:"Conglomerato Bituminoso", name:"Plastic Cold",
    slug:"plasticold-bituminoso",
    desc:"Conglomerato bituminoso a freddo, pronto all'uso, in sacchi.",
    longDesc:"Conglomerato bituminoso a freddo per riparazioni di strade, parcheggi e piazzali. Pronto all'uso, non richiede riscaldamento.",
    unit:"sacco 25 kg", price:22.0, tag:"Pronto all'uso · A freddo", color:"#c8c0b0",
    leadTime:{standard:"72h",vip:"48h"},
    img:"https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
    seo:{ title:"Plastic Cold Conglomerato Bituminoso a Freddo | Belfiore", desc:"Plastic Cold: conglomerato bituminoso a freddo pronto all'uso per riparare buche. Produzione Calabria.", keywords:"conglomerato bituminoso a freddo, asfalto a freddo, Plastic Cold, buche strada Calabria" },
  },
  {
    id:11, cat:"Conglomerato Bituminoso", name:"Plastic Cold in Secchi",
    slug:"plastic-cold-secchi",
    desc:"Conglomerato bituminoso a freddo, pronto all'uso, in secchi.",
    longDesc:"Plastic Cold in secchi: conglomerato bituminoso a freddo pronto all'uso, nel formato secchio per piccoli interventi e stoccaggio.",
    unit:"secchio", price:0, tag:"Pronto all'uso · Secchio", color:"#c4bcac",
    leadTime:{standard:"72h",vip:"48h"},
    img:"https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80",
    seo:{ title:"Plastic Cold in Secchi | Belfiore", desc:"Conglomerato bituminoso a freddo Plastic Cold in secchi, pronto all'uso. Produzione Calabria.", keywords:"asfalto a freddo secchio, conglomerato bituminoso secchio, Plastic Cold" },
  },
];
