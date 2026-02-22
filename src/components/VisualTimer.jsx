import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * Visual Timer — hourglass/circle countdown for activity sessions.
 * Designed for children with attention needs who benefit from seeing time pass.
 * Shows a shrinking circle and optional time remaining.
 */
export default function VisualTimer({
  durationSeconds = 60,
  onTimeUp,
  showNumbers = true,
  size = 56,
  paused = false,
  color = 'var(--color-primary)',
}) {
  const [remaining, setRemaining] = useState(durationSeconds)
  const intervalRef = useRef(null)
  const startRef = useRef(Date.now())
  const pausedAtRef = useRef(null)

  useEffect(() => {
    setRemaining(durationSeconds)
    startRef.current = Date.now()
  }, [durationSeconds])

  useEffect(() => {
    if (paused) {
      pausedAtRef.current = remaining
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    startRef.current = Date.now() - (durationSeconds - remaining) * 1000

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startRef.current) / 1000
      const left = Math.max(0, durationSeconds - elapsed)
      setRemaining(left)

      if (left <= 0) {
        clearInterval(intervalRef.current)
        onTimeUp?.()
      }
    }, 100)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused, durationSeconds, onTimeUp, remaining])

  const pct = Math.max(0, remaining / durationSeconds)
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct)

  const minutes = Math.floor(remaining / 60)
  const seconds = Math.floor(remaining % 60)
  const timeStr = minutes > 0
    ? `${minutes}:${seconds.toString().padStart(2, '0')}`
    : `${seconds}`

  // Color transitions from green to yellow to red
  const timerColor = pct > 0.5
    ? color
    : pct > 0.2
      ? '#F57F17'
      : '#C62828'

  return (
    <div
      style={{ ...styles.container, width: size, height: size }}
      role="timer"
      aria-label={`${Math.ceil(remaining)} segundos restantes`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={timerColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease' }}
        />
      </svg>
      {showNumbers && (
        <span
          style={{
            ...styles.timeText,
            color: timerColor,
            fontSize: size < 48 ? '0.65rem' : 'var(--font-size-sm)',
          }}
        >
          {timeStr}
        </span>
      )}
    </div>
  )
}

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timeText: {
    position: 'absolute',
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
  },
}
