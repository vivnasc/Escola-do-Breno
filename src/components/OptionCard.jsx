import { useState, useCallback, useRef } from 'react'
import { useHaptics } from '../hooks/useHaptics'

/**
 * OptionCard — a touch-optimized button for activity options.
 *
 * Features:
 * - Touch ripple effect on press
 * - Haptic feedback on tap
 * - Spring-back animation
 * - Success/error visual states
 * - Accessible touch targets (min 48px)
 *
 * Usage:
 *   <OptionCard
 *     onClick={() => handleAnswer(opt)}
 *     state="correct" | "wrong" | null
 *     color="#1565C0"
 *     disabled={false}
 *   >
 *     <span>Option content</span>
 *   </OptionCard>
 */
export default function OptionCard({
  children,
  onClick,
  state = null,
  color,
  disabled = false,
  style: customStyle,
}) {
  const haptics = useHaptics()
  const [ripple, setRipple] = useState(null)
  const [pressed, setPressed] = useState(false)
  const btnRef = useRef(null)

  const handleClick = useCallback((e) => {
    if (disabled) return

    // Create ripple at touch/click point
    const rect = btnRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX || e.touches?.[0]?.clientX || rect.left + rect.width / 2) - rect.left
      const y = (e.clientY || e.touches?.[0]?.clientY || rect.top + rect.height / 2) - rect.top
      setRipple({ x, y, key: Date.now() })
      setTimeout(() => setRipple(null), 500)
    }

    haptics.tap()
    onClick?.(e)
  }, [disabled, onClick, haptics])

  const getStateStyles = () => {
    if (state === 'correct') {
      return {
        borderColor: 'var(--color-success)',
        backgroundColor: '#E8F5E9',
        transform: pressed ? 'scale(0.95)' : 'scale(1.02)',
      }
    }
    if (state === 'wrong') {
      return {
        borderColor: 'var(--color-error-soft)',
        backgroundColor: '#FFF3E0',
      }
    }
    return {}
  }

  return (
    <button
      ref={btnRef}
      className={`option-card ${state === 'wrong' ? 'option-card-wrong' : ''}`}
      style={{
        ...styles.card,
        ...getStateStyles(),
        ...(pressed && !state ? { transform: 'scale(0.95)' } : {}),
        ...(color && !state ? { borderColor: `${color}22` } : {}),
        opacity: disabled && !state ? 0.6 : 1,
        ...customStyle,
      }}
      onClick={handleClick}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      disabled={disabled && !state}
      aria-disabled={disabled}
    >
      {/* Ripple effect */}
      {ripple && (
        <span
          key={ripple.key}
          style={{
            ...styles.ripple,
            left: ripple.x,
            top: ripple.y,
            backgroundColor: state === 'correct'
              ? 'rgba(46, 125, 50, 0.2)'
              : color
                ? `${color}15`
                : 'rgba(0, 0, 0, 0.08)',
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, border-color 0.25s ease, background-color 0.25s ease',
    minHeight: '48px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
    width: '100%',
  },
  ripple: {
    position: 'absolute',
    width: 120,
    height: 120,
    marginLeft: -60,
    marginTop: -60,
    borderRadius: '50%',
    animation: 'rippleExpand 0.5s ease-out forwards',
    pointerEvents: 'none',
  },
}
