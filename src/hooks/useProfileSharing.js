import { useState, useCallback, useEffect, useRef } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

/**
 * Profile sharing hook — lets families share a child's profile with therapists.
 *
 * Flow:
 *   1. Family clicks "Partilhar" on a profile → generates a 6-char code
 *   2. Family gives the code to the therapist (WhatsApp, email, etc.)
 *   3. Therapist enters the code → profile appears in their app
 *   4. Owner's app pushes updates → therapist sees latest data
 *
 * Requires Supabase. If not configured, all functions are no-ops.
 */

function generateShareCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no I/O/0/1 (ambiguous)
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export function useProfileSharing(user, profiles, progress) {
  const configured = isSupabaseConfigured()
  const [myShares, setMyShares] = useState([])       // shares I created (as owner)
  const [sharedWithMe, setSharedWithMe] = useState([]) // profiles shared with me
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const loadedRef = useRef(false)

  // Load shares on login
  useEffect(() => {
    if (!configured || !user || loadedRef.current) return
    loadedRef.current = true
    loadShares()
    loadSharedWithMe()
  }, [configured, user])

  // Reset on logout
  useEffect(() => {
    if (!user) {
      loadedRef.current = false
      setMyShares([])
      setSharedWithMe([])
    }
  }, [user])

  const loadShares = useCallback(async () => {
    if (!configured || !user) return
    try {
      const { data, error: err } = await supabase
        .from('profile_shares')
        .select('*')
        .eq('owner_id', user.id)
        .neq('status', 'revoked')

      if (err) {
        console.warn('Load shares error:', err.message)
        return
      }
      setMyShares(data || [])
    } catch {
      // Silent fail
    }
  }, [configured, user])

  const loadSharedWithMe = useCallback(async () => {
    if (!configured || !user) return
    try {
      const { data, error: err } = await supabase
        .from('profile_shares')
        .select('*')
        .eq('shared_with_id', user.id)
        .eq('status', 'accepted')

      if (err) {
        console.warn('Load shared-with-me error:', err.message)
        return
      }
      setSharedWithMe(data || [])
    } catch {
      // Silent fail
    }
  }, [configured, user])

  /**
   * Share a profile — generates a code and uploads the profile data.
   * Returns the share code on success, or null on failure.
   */
  const shareProfile = useCallback(async (profileId, role = 'therapist') => {
    if (!configured || !user) {
      setError('Precisa de estar autenticado para partilhar.')
      return null
    }

    const profile = profiles?.find(p => p.id === profileId)
    if (!profile) {
      setError('Perfil nao encontrado.')
      return null
    }

    setLoading(true)
    setError(null)

    // Check if already shared
    const existing = myShares.find(s => s.profile_id === profileId)
    if (existing) {
      setLoading(false)
      return existing.share_code
    }

    const code = generateShareCode()

    try {
      const { data, error: err } = await supabase
        .from('profile_shares')
        .insert({
          owner_id: user.id,
          share_code: code,
          profile_id: profileId,
          profile_data: profile,
          progress_data: progress || {},
          role,
          status: 'pending',
        })
        .select()
        .single()

      if (err) {
        // Code collision — retry once with new code
        if (err.code === '23505') {
          const retryCode = generateShareCode()
          const { data: d2, error: e2 } = await supabase
            .from('profile_shares')
            .insert({
              owner_id: user.id,
              share_code: retryCode,
              profile_id: profileId,
              profile_data: profile,
              progress_data: progress || {},
              role,
              status: 'pending',
            })
            .select()
            .single()

          if (e2) {
            setError('Erro ao criar codigo. Tente novamente.')
            setLoading(false)
            return null
          }
          setMyShares(prev => [...prev, d2])
          setLoading(false)
          return retryCode
        }

        setError('Erro ao partilhar: ' + err.message)
        setLoading(false)
        return null
      }

      setMyShares(prev => [...prev, data])
      setLoading(false)
      return code
    } catch {
      setError('Erro de rede. Tente novamente.')
      setLoading(false)
      return null
    }
  }, [configured, user, profiles, progress, myShares])

  /**
   * Accept a share code — links the shared profile to the current user.
   * Returns the shared profile on success, or null on failure.
   */
  const acceptShareCode = useCallback(async (code) => {
    if (!configured || !user) {
      setError('Precisa de estar autenticado.')
      return null
    }

    const normalizedCode = code.trim().toUpperCase()
    if (normalizedCode.length !== 6) {
      setError('O codigo deve ter 6 caracteres.')
      return null
    }

    setLoading(true)
    setError(null)

    try {
      // Find the share by code
      const { data: share, error: findErr } = await supabase
        .from('profile_shares')
        .select('*')
        .eq('share_code', normalizedCode)
        .eq('status', 'pending')
        .single()

      if (findErr || !share) {
        setError('Codigo invalido ou ja utilizado.')
        setLoading(false)
        return null
      }

      // Can't accept your own share
      if (share.owner_id === user.id) {
        setError('Nao pode aceitar o seu proprio codigo.')
        setLoading(false)
        return null
      }

      // Accept the share
      const { data: updated, error: updateErr } = await supabase
        .from('profile_shares')
        .update({
          shared_with_id: user.id,
          status: 'accepted',
          accepted_at: new Date().toISOString(),
        })
        .eq('id', share.id)
        .select()
        .single()

      if (updateErr) {
        setError('Erro ao aceitar: ' + updateErr.message)
        setLoading(false)
        return null
      }

      setSharedWithMe(prev => [...prev, updated])
      setLoading(false)
      return updated
    } catch {
      setError('Erro de rede. Tente novamente.')
      setLoading(false)
      return null
    }
  }, [configured, user])

  /**
   * Push updated profile data to the shared entry (called by owner).
   */
  const pushSharedData = useCallback(async (profileId) => {
    if (!configured || !user) return

    const profile = profiles?.find(p => p.id === profileId)
    if (!profile) return

    const share = myShares.find(s => s.profile_id === profileId && s.status === 'accepted')
    if (!share) return

    try {
      await supabase
        .from('profile_shares')
        .update({
          profile_data: profile,
          progress_data: progress || {},
        })
        .eq('id', share.id)
    } catch {
      // Silent fail
    }
  }, [configured, user, profiles, progress, myShares])

  /**
   * Refresh shared-with-me profiles (pull latest data from owners).
   */
  const refreshSharedProfiles = useCallback(async () => {
    if (!configured || !user) return
    await loadSharedWithMe()
  }, [configured, user, loadSharedWithMe])

  /**
   * Revoke a share (owner cancels access).
   */
  const revokeShare = useCallback(async (shareId) => {
    if (!configured || !user) return

    try {
      await supabase
        .from('profile_shares')
        .update({ status: 'revoked' })
        .eq('id', shareId)
        .eq('owner_id', user.id)

      setMyShares(prev => prev.filter(s => s.id !== shareId))
    } catch {
      // Silent fail
    }
  }, [configured, user])

  /**
   * Get share info for a profile (if it's been shared).
   */
  const getShareForProfile = useCallback((profileId) => {
    return myShares.find(s => s.profile_id === profileId) || null
  }, [myShares])

  // Auto-push shared data when profiles or progress change
  useEffect(() => {
    if (!configured || !user || myShares.length === 0) return

    const acceptedShares = myShares.filter(s => s.status === 'accepted')
    if (acceptedShares.length === 0) return

    const timer = setTimeout(() => {
      acceptedShares.forEach(share => {
        pushSharedData(share.profile_id)
      })
    }, 5000) // 5s debounce (less aggressive than main sync)

    return () => clearTimeout(timer)
  }, [configured, user, profiles, progress, myShares, pushSharedData])

  return {
    configured,
    myShares,
    sharedWithMe,
    loading,
    error,
    shareProfile,
    acceptShareCode,
    pushSharedData,
    refreshSharedProfiles,
    revokeShare,
    getShareForProfile,
    clearError: () => setError(null),
  }
}
