import { useCallback } from 'react'

/**
 * useHaptics — provides haptic feedback via navigator.vibrate().
 *
 * Patterns are gentle and brief to avoid sensory overload.
 * Falls back silently when vibration is not supported.
 *
 * Usage:
 *   const haptics = useHaptics(enabled)
 *   haptics.tap()       // light tap on button press
 *   haptics.success()   // double pulse on correct answer
 *   haptics.error()     // single soft buzz on wrong answer
 *   haptics.celebrate() // celebratory pattern on completion
 */
export function useHaptics(enabled = true) {
  const canVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator

  const vibrate = useCallback((pattern) => {
    if (!enabled || !canVibrate) return
    try {
      navigator.vibrate(pattern)
    } catch {
      // Silently fail if vibration is blocked
    }
  }, [enabled, canVibrate])

  const tap = useCallback(() => {
    vibrate(10)
  }, [vibrate])

  const success = useCallback(() => {
    // Gentle double pulse
    vibrate([15, 50, 15])
  }, [vibrate])

  const error = useCallback(() => {
    // Single soft buzz
    vibrate(25)
  }, [vibrate])

  const celebrate = useCallback(() => {
    // Ascending celebration: tap-tap-tap-long
    vibrate([10, 30, 10, 30, 10, 30, 40])
  }, [vibrate])

  const select = useCallback(() => {
    // Micro tap for selections
    vibrate(5)
  }, [vibrate])

  return { tap, success, error, celebrate, select, vibrate }
}
