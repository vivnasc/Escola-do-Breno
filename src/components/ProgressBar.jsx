export default function ProgressBar({ value, max, color = 'var(--color-primary)', height = 8 }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0

  return (
    <div
      style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: '#ECEFF1',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width var(--transition-slow) ease-out',
        }}
        className={pct > 0 ? 'progress-animated' : undefined}
      />
    </div>
  )
}
