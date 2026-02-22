import { useState, useCallback, useRef, useEffect } from 'react'

const RAPID_CLICK_THRESHOLD = 5
const RAPID_CLICK_WINDOW = 3000
const CONSECUTIVE_ERRORS = 3
const INACTIVITY_TIMEOUT = 60000

export function useFrustration(onFrustrationDetected, { paused = false } = {}) {
  const [isCalm, setIsCalm] = useState(true)
  const clickTimestamps = useRef([])
  const errorCount = useRef(0)
  const inactivityTimer = useRef(null)

  // Clear timers and reset state when paused (e.g. during Intake)
  useEffect(() => {
    if (paused && inactivityTimer.current) {
      clearTimeout(inactivityTimer.current)
      inactivityTimer.current = null
    }
  }, [paused])

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    if (paused) return
    inactivityTimer.current = setTimeout(() => {
      setIsCalm(false)
      onFrustrationDetected?.('inactivity')
    }, INACTIVITY_TIMEOUT)
  }, [onFrustrationDetected, paused])

  const registerClick = useCallback(() => {
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

    resetInactivityTimer()
  }, [onFrustrationDetected, resetInactivityTimer])

  const registerError = useCallback(() => {
    errorCount.current++
    if (errorCount.current >= CONSECUTIVE_ERRORS) {
      setIsCalm(false)
      onFrustrationDetected?.('consecutive-errors')
      errorCount.current = 0
    }
    resetInactivityTimer()
  }, [onFrustrationDetected, resetInactivityTimer])

  const registerSuccess = useCallback(() => {
    errorCount.current = 0
    clickTimestamps.current = []
    resetInactivityTimer()
  }, [resetInactivityTimer])

  const calmDown = useCallback(() => {
    setIsCalm(true)
    errorCount.current = 0
    clickTimestamps.current = []
    resetInactivityTimer()
  }, [resetInactivityTimer])

  useEffect(() => {
    resetInactivityTimer()
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    }
  }, [resetInactivityTimer])

  return {
    isCalm,
    registerClick,
    registerError,
    registerSuccess,
    calmDown,
  }
}
