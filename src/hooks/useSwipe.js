import { useRef, useCallback } from 'react'

/**
 * useSwipe — detects swipe gestures on touch devices.
 *
 * Returns ref + handlers to attach to any element.
 * Supports horizontal and vertical swipes with configurable threshold.
 *
 * Usage:
 *   const swipe = useSwipe({ onSwipeLeft: () => goNext(), onSwipeRight: () => goBack() })
 *   <div {...swipe.handlers}>...</div>
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  maxVerticalDeviation = 100,
} = {}) {
  const touchStart = useRef(null)
  const touchEnd = useRef(null)

  const onTouchStart = useCallback((e) => {
    touchEnd.current = null
    const touch = e.targetTouches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
  }, [])

  const onTouchMove = useCallback((e) => {
    const touch = e.targetTouches[0]
    touchEnd.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return

    const dx = touchEnd.current.x - touchStart.current.x
    const dy = touchEnd.current.y - touchStart.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)
    const elapsed = Date.now() - touchStart.current.time

    // Must complete within 500ms to count as a swipe
    if (elapsed > 500) return

    // Horizontal swipe
    if (absDx > threshold && absDy < maxVerticalDeviation) {
      if (dx > 0) {
        onSwipeRight?.()
      } else {
        onSwipeLeft?.()
      }
    }

    // Vertical swipe
    if (absDy > threshold && absDx < maxVerticalDeviation) {
      if (dy > 0) {
        onSwipeDown?.()
      } else {
        onSwipeUp?.()
      }
    }

    touchStart.current = null
    touchEnd.current = null
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold, maxVerticalDeviation])

  return {
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  }
}
