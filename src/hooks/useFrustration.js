import { useState, useCallback, useRef } from 'react'

const RAPID_CLICK_THRESHOLD = 6
const RAPID_CLICK_WINDOW = 3000
const CONSECUTIVE_ERRORS = 3

/**
 * Frustration detection — triggers Banco da Calma when the child
 * shows signs of frustration (rapid clicking or consecutive errors).
 *
 * Inactivity is NOT treated as frustration — a child looking at the
 * screen, navigating, or thinking is not frustrated.
 */
export function useFrustration(onFrustrationDetected, { paused = false } = {}) {
  const [isCalm, setIsCalm] = useState(true)
  const clickTimestamps = useRef([])
  const errorCount = useRef(0)

  const registerClick = useCallback(() => {
    if (paused) return
    const now = Date.now()
    clickTimestamps.current.push(now)
    clickTimestamps.current = clickTimestamps.current.filter(
      (t) => now - t < RAPID_CLICK_WINDOW
    )

    if (clickTimestamps.current.length >= RAPID_CLICK_THRESHOLD) {
      setIsCalm(false)
      onFrustrationDetected?.('rapid-clicks')
      clickTimestamps.current = []
    }
  }, [onFrustrationDetected, paused])

  const registerError = useCallback(() => {
    if (paused) return
    errorCount.current++
    if (errorCount.current >= CONSECUTIVE_ERRORS) {
      setIsCalm(false)
      onFrustrationDetected?.('consecutive-errors')
      errorCount.current = 0
    }
  }, [onFrustrationDetected, paused])

  const registerSuccess = useCallback(() => {
    errorCount.current = 0
    clickTimestamps.current = []
  }, [])

  const calmDown = useCallback(() => {
    setIsCalm(true)
    errorCount.current = 0
    clickTimestamps.current = []
  }, [])

  return {
    isCalm,
    registerClick,
    registerError,
    registerSuccess,
    calmDown,
  }
}
