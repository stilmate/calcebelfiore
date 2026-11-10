import { useEffect, useState, useCallback } from 'react';
import { supabase, supabaseConfigured } from './supabase';

// Stato dell'operatore collegato.
// status: 'unconfigured' | 'loading' | 'signedOut' | 'noProfile' | 'inactive' | 'ready'
export function useStaff() {
  const [state, setState] = useState({ status: supabaseConfigured ? 'loading' : 'unconfigured', session: null, staff: null });

  const load = useCallback(async (session) => {
    if (!session) { setState({ status: 'signedOut', session: null, staff: null }); return; }
    const { data, error } = await supabase
      .from('staff')
      .select('user_id, full_name, email, active, role:roles(id, name, permissions, is_system)')
      .eq('user_id', session.user.id)
      .maybeSingle();
    if (error || !data) { setState({ status: 'noProfile', session, staff: null }); return; }
    if (!data.active) { setState({ status: 'inactive', session, staff: data }); return; }
    setState({ status: 'ready', session, staff: data });
  }, []);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let alive = true;
    supabase.auth.getSession().then(({ data }) => { if (alive) load(data.session); });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') return; // gestito da /reimposta-password
      if (alive) load(session);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, [load]);

  const signOut = useCallback(async () => { if (supabase) await supabase.auth.signOut(); }, []);
  const reload = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    await load(data.session);
  }, [load]);

  return { ...state, permissions: state.staff?.role?.permissions || {}, signOut, reload };
}
