import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const GRID_SIZE = 6
const PALETTE = [
  { id: 'red', hex: '#E53935' },
  { id: 'blue', hex: '#1E88E5' },
  { id: 'green', hex: '#43A047' },
  { id: 'yellow', hex: '#FDD835' },
  { id: 'purple', hex: '#8E24AA' },
  { id: 'orange', hex: '#FF6D00' },
]

function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  )
}

export default function PatternArt({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [grid, setGrid] = useState(createEmptyGrid)
  const [selectedColor, setSelectedColor] = useState(PALETTE[0].hex)
  const [isComplete, setIsComplete] = useState(false)

  const handleCellTap = useCallback(
    (row, col) => {
      registerClick()
      setGrid((prev) => {
        const next = prev.map((r) => [...r])
        const mirrorCol = GRID_SIZE - 1 - col
        const mirrorRow = GRID_SIZE - 1 - row

        // Place on tapped cell + 3 mirror positions
        next[row][col] = selectedColor
        next[row][mirrorCol] = selectedColor
        next[mirrorRow][col] = selectedColor
        next[mirrorRow][mirrorCol] = selectedColor

        return next
      })
    },
    [selectedColor, registerClick]
  )

  const handleClear = useCallback(() => {
    registerClick()
    setGrid(createEmptyGrid())
  }, [registerClick])

  const handleFinish = useCallback(() => {
    registerClick()
    registerSuccess()
    updateCampoProgress('campo5', 4)
    completeActivity('pattern-art', 3)
    setIsComplete(true)
  }, [registerClick, registerSuccess, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Arte de Padrões" backPath="/campo/5" color="var(--color-campo5)">
        <CompletionCelebration
          emoji="🎭"
          title="Criaste um padrão lindo!"
          stars={3}
          color="var(--color-campo5)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Arte de Padrões"
      instruction="Toca numa célula para pintar. O padrão é espelhado automaticamente!"
      backPath="/campo/5"
      color="var(--color-campo5)"
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.palette}>
        {PALETTE.map((color) => (
          <button
            key={color.id}
            style={{
              ...styles.paletteBtn,
              backgroundColor: color.hex,
              border: selectedColor === color.hex
                ? '3px solid var(--color-campo5)'
                : '2px solid transparent',
              transform: selectedColor === color.hex ? 'scale(1.15)' : 'scale(1)',
            }}
            onClick={() => {
              registerClick()
              setSelectedColor(color.hex)
            }}
            aria-label={color.id}
          />
        ))}
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.grid}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} style={styles.gridRow}>
              {row.map((cellColor, colIdx) => (
                <button
                  key={colIdx}
                  style={{
                    ...styles.cell,
                    backgroundColor: cellColor || 'var(--color-surface)',
                    border: cellColor
                      ? `1px solid ${cellColor}`
                      : '1px solid var(--color-border)',
                  }}
                  className="btn-press"
                  onClick={() => handleCellTap(rowIdx, colIdx)}
                  aria-label={`Célula ${rowIdx + 1}, ${colIdx + 1}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mirror guide lines */}
        <div style={styles.mirrorLineH} aria-hidden="true" />
        <div style={styles.mirrorLineV} aria-hidden="true" />
      </div>

      <div style={styles.controls}>
        <button
          style={{ ...styles.controlBtn, backgroundColor: '#EF5350' }}
          className="btn-press"
          onClick={handleClear}
        >
          🗑️ Limpar
        </button>

        <button
          style={{ ...styles.controlBtn, backgroundColor: '#43A047' }}
          className="btn-press"
          onClick={handleFinish}
        >
          ✅ Concluir
        </button>
      </div>
    </ActivityShell>
  )
}

const styles = {
  palette: {
    display: 'flex',
    gap: 'var(--space-sm)',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  paletteBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    flexShrink: 0,
  },
  gridContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  gridRow: {
    display: 'flex',
    gap: '2px',
  },
  cell: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    flexShrink: 0,
  },
  mirrorLineH: {
    position: 'absolute',
    top: '50%',
    left: 'var(--space-md)',
    right: 'var(--space-md)',
    height: '2px',
    backgroundColor: 'var(--color-campo5)',
    opacity: 0.3,
    pointerEvents: 'none',
  },
  mirrorLineV: {
    position: 'absolute',
    left: '50%',
    top: 'var(--space-md)',
    bottom: 'var(--space-md)',
    width: '2px',
    backgroundColor: 'var(--color-campo5)',
    opacity: 0.3,
    pointerEvents: 'none',
  },
  controls: {
    display: 'flex',
    gap: 'var(--space-sm)',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  controlBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    border: 'none',
    cursor: 'pointer',
    minWidth: '120px',
  },
}
