import { useCallback, useRef } from 'react'

/**
 * Synthesized sound effects using AudioContext.
 * Zero audio files — all generated programmatically.
 * Works offline, no dependencies, minimal CPU.
 *
 * Sounds:
 *   success  — ascending two-tone chime (C5 → E5)
 *   error    — low soft buzz (short, not punishing)
 *   click    — quick tick for button presses
 *   celebrate — ascending arpeggio (C5-E5-G5-C6)
 *   whoosh   — filtered noise sweep (transition)
 *   levelUp  — triumphant ascending fanfare
 */
export function useSoundEffects(enabled = true) {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch {
        return null
      }
    }
    // Resume suspended context (browsers require user gesture)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const playTone = useCallback((freq, duration, type = 'sine', volume = 0.3, startTime = 0) => {
    const ctx = getCtx()
    if (!ctx || !enabled) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(volume, ctx.currentTime + startTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + startTime)
    osc.stop(ctx.currentTime + startTime + duration)
  }, [getCtx, enabled])

  const success = useCallback(() => {
    // Ascending chime: C5 → E5
    playTone(523, 0.15, 'sine', 0.25, 0)
    playTone(659, 0.25, 'sine', 0.3, 0.12)
  }, [playTone])

  const error = useCallback(() => {
    // Soft low tone — not harsh, not punishing
    playTone(220, 0.2, 'triangle', 0.15, 0)
    playTone(196, 0.25, 'triangle', 0.12, 0.1)
  }, [playTone])

  const click = useCallback(() => {
    // Quick subtle tick
    playTone(800, 0.05, 'sine', 0.1, 0)
  }, [playTone])

  const celebrate = useCallback(() => {
    // Ascending arpeggio: C5-E5-G5-C6
    playTone(523, 0.15, 'sine', 0.2, 0)
    playTone(659, 0.15, 'sine', 0.25, 0.1)
    playTone(784, 0.15, 'sine', 0.25, 0.2)
    playTone(1047, 0.4, 'sine', 0.3, 0.3)
  }, [playTone])

  const levelUp = useCallback(() => {
    // Triumphant: C5-E5-G5-C6 with sustained top note
    playTone(523, 0.12, 'square', 0.12, 0)
    playTone(659, 0.12, 'square', 0.15, 0.1)
    playTone(784, 0.12, 'square', 0.15, 0.2)
    playTone(1047, 0.5, 'sine', 0.25, 0.3)
    playTone(1047, 0.5, 'triangle', 0.15, 0.35)
  }, [playTone])

  return { success, error, click, celebrate, levelUp }
}
