// ╔══════════════════════════════════════════════════════════════════╗
// ║  PROCESSI DEL PANNELLO — le chiavi devono coincidere con quelle   ║
// ║  usate in supabase/profilazione.sql                               ║
// ║  Per aggiungere un processo: aggiungilo qui e assegnagli un        ║
// ║  livello nei profili dal pannello di profilazione.                ║
// ╚══════════════════════════════════════════════════════════════════╝
export const MODULES = [
  { key: 'ordini',      label: 'Ordini',          desc: 'Ordini ricevuti dal sito e loro stato' },
  { key: 'magazzino',   label: 'Magazzino',       desc: 'Ordini da preparare, pronti e consegnati' },
  { key: 'lead',        label: 'Lead',            desc: 'Richieste di preventivo e contatti' },
  { key: 'clienti',     label: 'Clienti 360°',    desc: 'Scheda cliente con ordini, lead e ticket' },
  { key: 'assistenza',  label: 'Assistenza',      desc: 'Ticket post-vendita' },
  { key: 'attivita',    label: 'Attività',        desc: 'Promemoria e follow-up' },
  { key: 'provvigioni', label: 'Provvigioni',     desc: 'Rendiconto provvigioni (in arrivo)' },
  { key: 'utenti',      label: 'Utenti e profili', desc: 'Inviti, profili e permessi' },
];

export const LEVELS = [
  { key: 'none',  label: 'Nessun accesso', short: '—' },
  { key: 'read',  label: 'Vede',           short: 'Vede' },
  { key: 'write', label: 'Modifica',       short: 'Modifica' },
];

const RANK = { none: 0, read: 1, write: 2 };

// can(permissions, 'ordini', 'write') → true/false
export function can(permissions, module, level = 'read') {
  const have = RANK[(permissions || {})[module]] || 0;
  return have >= (RANK[level] || 1);
}
