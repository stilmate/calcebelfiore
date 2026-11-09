// Icone della sezione Rivendita. Per aggiungerne una, inserisci un nuovo nome qui.
export default function ResaleIcon({ n, s = 26 }) {
  const p = { width:s, height:s, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', strokeWidth:1.8, strokeLinecap:'round', strokeLinejoin:'round', 'aria-hidden':true };
  const d = {
    home:   <svg {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></svg>,
    format: <svg {...p}><rect x="4" y="4" width="16" height="16" strokeDasharray="3 2"/><path d="M14 4h6v6"/><path d="M20 4l-6 6"/></svg>,
    grid:   <svg {...p}><rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/></svg>,
    layers: <svg {...p}><path d="M12 3 2 8l10 5 10-5z"/><path d="m2 13 10 5 10-5"/><path d="m2 17.5 10 5 10-5"/></svg>,
    brick:  <svg {...p}><rect x="3" y="5" width="18" height="14"/><path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 5v4.7M6 9.7v4.6M12 9.7v4.6M18 9.7v4.6M9 14.3V19M15 14.3V19"/></svg>,
    sheet:  <svg {...p}><path d="M3 8l3-3 3 3 3-3 3 3 3-3 3 3v11H3z"/><path d="M6 5v14M12 5v14M18 5v14"/></svg>,
    mesh:   <svg {...p}><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
    box:    <svg {...p}><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>,
    leaf:   <svg {...p}><path d="M12 21V11"/><path d="M12 13c-5 0-8-3-8-8 5 0 8 3 8 8z"/><path d="M12 11c0-4 3-7 8-7 0 5-3 8-8 7z"/></svg>,
    check:  <svg {...p} strokeWidth={2.4}><polyline points="20 6 9 17 4 12"/></svg>,
    arrow:  <svg {...p} strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  };
  return d[n] || d.box;
}
