// ╔══════════════════════════════════════════════════════════════════╗
// ║  RIVENDITA — tutti i materiali di terzi, in un solo file          ║
// ║                                                                  ║
// ║  Per aggiungere una categoria: copia il blocco MODELLO in fondo,  ║
// ║  incollalo dentro "categories", compila i campi e metti           ║
// ║  enabled: true. Il sito crea da solo pagina, tessera, menu e      ║
// ║  sitemap. I campi facoltativi lasciati vuoti non vengono mostrati.║
// ║                                                                  ║
// ║  Loghi: inseriscili solo con autorizzazione del marchio.          ║
// ╚══════════════════════════════════════════════════════════════════╝

export const RESALE = {
  enabled: true,                      // false = nasconde tutta la sezione
  slug:    "rivendita",              // indirizzo: /rivendita
  menuLabel: "Rivendita",
  eyebrow: "Rivendita materiali",
  title:   "Tutto per il cantiere, da un solo fornitore",
  intro:   "Oltre ai nostri prodotti, selezioniamo materiali di marchi affidabili per completare il tuo cantiere: li ritiri o te li consegniamo insieme a calce, intonaci e sabbie.",
  promise: { strong: "Un solo interlocutore", rest: " dalla sabbia di cava ai materiali di finitura: un ordine, una consegna, un referente." },

  // Marchi trattati: mostrati in fascia scura. logo: null finché non c'è l'autorizzazione.
  brands: [
    { name: "Siprem",       logo: null },
    { name: "Wienerberger", logo: null },
    { name: "ITO",          logo: null },
    { name: "Olympus",      logo: null },
    { name: "Fibratec AR",  logo: null },
  ],

  // Destinazioni d'uso proposte nel form se la categoria non ne indica di proprie
  defaultUses: ["Nuova costruzione", "Ristrutturazione", "Manutenzione", "Altro"],

  categories: [
    // ─────────────────────────────────────────────── PAVIMENTAZIONI
    {
      enabled:  true,
      slug:     "pavimentazioni-esterne",      // /rivendita/pavimentazioni-esterne
      order:    1,                            // ordine di visualizzazione
      icon:     "layers",                     // home | format | grid | layers | brick | sheet | mesh | box
      name:     "Pavimentazioni esterne",     // nome breve (tessera, menu)
      short:    "Masselli, lastre e blocchi in calcestruzzo per cortili, vialetti e aree carrabili.",
      partner:  { name: "Siprem", sub: "Pavimentazioni & Murature", color: "#1E7A3C" },
      claim:    "Soluzioni in calcestruzzo per spazi che durano",
      title:    "Pavimentazioni esterne",
      subtitle: "Come valorizzare cortili, percorsi e spazi residenziali",
      intro:    "Masselli, lastre e blocchi in calcestruzzo Siprem per cortili, vialetti, ingressi e aree carrabili. Ti aiutiamo a scegliere il sistema giusto e lo forniamo insieme a sabbie e materiali di posa dalla nostra cava.",
      // Facoltativo: guida alla scelta (da 2 a 4 criteri consigliati)
      criteriaTitle: "Quattro criteri per scegliere bene",
      criteria: [
        { icon: "home",   title: "Destinazione d'uso", desc: "Cortile, ingresso, percorso o area carrabile: cambia il criterio di scelta." },
        { icon: "format", title: "Formato",            desc: "Dimensioni e modularità influenzano ritmo, percezione e praticità della posa." },
        { icon: "grid",   title: "Finitura",           desc: "Superficie, texture e colore devono dialogare con contesto e utilizzo." },
        { icon: "layers", title: "Geometria",          desc: "Schema di posa e combinazioni definiscono il carattere dello spazio." },
      ],
      motto:    { strong: "La scelta giusta", rest: " parte dall'uso dello spazio e dalla coerenza del progetto." },
      bundle:   { strong: "Dalla cava al cortile.", rest: " Sabbia per allettamento e sigillatura dei giunti dalla nostra cava: un solo fornitore per pavimento e materiali di posa." },
      // Facoltativo: elenco prodotti/linee (compare come griglia). Lascia [] finché non hai le schede.
      items: [],
      // Facoltativo: domande del form preventivo
      uses:     ["Cortile", "Ingresso / vialetto", "Percorso pedonale", "Area carrabile", "Bordo piscina", "Altro"],
      askArea:  true,                          // chiede i m²
      seo: {
        title:    "Pavimentazioni Esterne in Calcestruzzo Siprem | Calce Belfiore Calabria",
        desc:     "Masselli e lastre in calcestruzzo Siprem per cortili, vialetti e aree carrabili. Consulenza nella scelta, preventivo gratuito, consegna in Calabria.",
        keywords: "pavimentazioni esterne Calabria, autobloccanti Cosenza, masselli calcestruzzo, pavimenti cortile, Siprem, vialetti esterni Catanzaro",
      },
    },

    // ─────────────────────────────────────────────── BOZZE (enabled: false)
    // Esempi già impostati: completa i testi con la proprietà e attivali.
    {
      enabled:  false,
      slug:     "laterizi",
      order:    2,
      icon:     "brick",
      name:     "Laterizi",
      short:    "DA COMPLETARE — mattoni, blocchi e tegole.",
      partner:  { name: "Wienerberger", sub: "", color: "#B3282D" },
      title:    "Laterizi",
      subtitle: "DA COMPLETARE",
      intro:    "DA COMPLETARE con la proprietà: quali linee trattate e per quali lavori.",
      items:    [],
      askArea:  false,
      seo: { title: "Laterizi Wienerberger | Calce Belfiore Calabria", desc: "DA COMPLETARE", keywords: "laterizi Calabria, Wienerberger" },
    },
    {
      enabled:  false,
      slug:     "lamiere",
      order:    3,
      icon:     "sheet",
      name:     "Lamiere e coperture",
      short:    "DA COMPLETARE — lamiere per coperture e rivestimenti.",
      partner:  null,
      title:    "Lamiere e coperture",
      subtitle: "DA COMPLETARE",
      intro:    "DA COMPLETARE con la proprietà: tipi, spessori, formati.",
      items:    [],
      askArea:  true,
      seo: { title: "Lamiere per coperture | Calce Belfiore Calabria", desc: "DA COMPLETARE", keywords: "lamiere coperture Calabria" },
    },
  ],
};

/* ───────────────────────────── MODELLO DA COPIARE ─────────────────────────────
    {
      enabled:  false,                       // true per pubblicarla
      slug:     "nome-categoria",            // solo minuscole e trattini
      order:    9,
      icon:     "box",                       // home | format | grid | layers | brick | sheet | mesh | box
      name:     "Nome breve",
      short:    "Una riga per la tessera.",
      partner:  { name: "Marchio", sub: "Sottotitolo marchio", color: "#333333" },   // oppure null
      claim:    "",                          // facoltativo
      title:    "Titolo pagina",
      subtitle: "Sottotitolo",
      intro:    "Paragrafo introduttivo.",
      criteriaTitle: "",                     // facoltativo
      criteria: [],                          // facoltativo: [{ icon, title, desc }]
      motto:    null,                        // facoltativo: { strong, rest }
      bundle:   null,                        // facoltativo: { strong, rest }
      items: [                               // facoltativo
        // { name: "Prodotto", brand: "Marchio", desc: "Descrizione", unit: "pallet", tags: ["Tag 1", "Tag 2"] },
      ],
      uses:     [],                          // facoltativo: altrimenti usa defaultUses
      askArea:  false,                       // true = chiede i m²
      seo: { title: "", desc: "", keywords: "" },
    },
──────────────────────────────────────────────────────────────────────────────── */

// Utilità: categorie pubblicate, in ordine
export const activeCategories = () =>
  RESALE.enabled
    ? RESALE.categories.filter(c => c.enabled).sort((a, b) => (a.order || 99) - (b.order || 99))
    : [];
