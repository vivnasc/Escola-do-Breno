import { useCallback, useEffect, useRef } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

/**
 * Offline-first sync hook.
 *
 * Strategy:
 *   1. Local (localStorage/IndexedDB) is ALWAYS the primary store
 *   2. On login: pull from Supabase → merge with local (newer wins)
 *   3. On local change: push to Supabase in background
 *   4. On reconnect: push latest local state
 *
 * The app never blocks on network. If Supabase is down, everything
 * keeps working locally. Sync happens silently in background.
 */
export function useSync(user, profiles, progress, activeId) {
  const configured = isSupabaseConfigured()
  const syncingRef = useRef(false)
  const lastPushRef = useRef(0)

  // Pull from Supabase on login
  const pullFromCloud = useCallback(async () => {
    if (!configured || !user || syncingRef.current) return null
    syncingRef.current = true

    try {
      const { data, error } = await supabase
        .from('user_data')
        .select('profiles, active_profile_id, progress, updated_at')
        .eq('user_id', user.id)
        .single()

      syncingRef.current = false

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows found (new user), that's fine
        console.warn('Sync pull error:', error.message)
        return null
      }

      return data || null
    } catch {
      syncingRef.current = false
      return null
    }
  }, [configured, user])

  // Push local state to Supabase
  const pushToCloud = useCallback(async (localProfiles, localProgress, localActiveId) => {
    if (!configured || !user || syncingRef.current) return
    // Throttle: max one push every 3 seconds
    const now = Date.now()
    if (now - lastPushRef.current < 3000) return
    lastPushRef.current = now

    syncingRef.current = true

    try {
      const payload = {
        user_id: user.id,
        profiles: localProfiles || [],
        active_profile_id: localActiveId || null,
        progress: localProgress || {},
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('user_data')
        .upsert(payload, { onConflict: 'user_id' })

      if (error) {
        console.warn('Sync push error:', error.message)
      }
    } catch {
      // Silent fail — offline, will retry later
    }

    syncingRef.current = false
  }, [configured, user])

  // Auto-push when local data changes
  useEffect(() => {
    if (!configured || !user) return
    // Debounce push by 2 seconds after last change
    const timer = setTimeout(() => {
      pushToCloud(profiles, progress, activeId)
    }, 2000)
    return () => clearTimeout(timer)
  }, [configured, user, profiles, progress, activeId, pushToCloud])

  // Push on page visibility change (tab becomes visible = user returned)
  useEffect(() => {
    if (!configured || !user) return
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        pushToCloud(profiles, progress, activeId)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [configured, user, profiles, progress, activeId, pushToCloud])

  // Push on online event (device reconnects)
  useEffect(() => {
    if (!configured || !user) return
    const handleOnline = () => {
      pushToCloud(profiles, progress, activeId)
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [configured, user, profiles, progress, activeId, pushToCloud])

  return {
    pullFromCloud,
    pushToCloud,
    configured,
  }
}
