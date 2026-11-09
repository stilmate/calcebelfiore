# Rivendita materiali — guida rapida

Tutta la sezione si gestisce da **un solo file: `lib/rivendita.js`**. Non serve toccare le pagine.

## Aggiungere una categoria
1. In fondo a `lib/rivendita.js` copia il blocco **MODELLO DA COPIARE**.
2. Incollalo dentro `categories: [ ... ]`.
3. Compila i campi. `slug` diventa l'indirizzo: `slug: "laterizi"` → `/rivendita/laterizi`.
4. Metti `enabled: true`.

Il sito crea da solo: pagina della categoria, tessera nella pagina Rivendita, tessera in home (prime 3), voce nella sitemap.

## Campi facoltativi
Se li lasci vuoti, la sezione corrispondente non compare:

| Campo | Cosa mostra |
|---|---|
| `partner` | Badge del marchio in alto (nome e colore) |
| `claim` | Frase a destra del badge |
| `criteria` | Guida alla scelta, da 2 a 4 riquadri con icona |
| `motto` | Fascia scura con frase in evidenza |
| `items` | Griglia dei prodotti o linee disponibili |
| `bundle` | Riquadro "vantaggio Belfiore" |
| `uses` | Opzioni "destinazione d'uso" nel form |
| `askArea` | `true` = il form chiede i m² |

Icone disponibili: `home`, `format`, `grid`, `layers`, `brick`, `sheet`, `mesh`, `box`.

## Altre impostazioni
- `RESALE.enabled: false` nasconde tutta la sezione (menu, home, pagine).
- `RESALE.brands`: elenco dei marchi trattati. Il campo `logo` va compilato solo con l'autorizzazione del marchio.
- I preventivi arrivano nel pannello come lead di tipo **"Rivendita materiali"**, con categoria, uso e metri quadri nel messaggio.

## Bozze già pronte
"Laterizi" (Wienerberger) e "Lamiere e coperture" sono impostate con `enabled: false` e testi da completare con la proprietà.
