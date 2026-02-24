import { useState, useCallback, useRef, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const COLORS = [
  { id: 'red', hex: '#E53935', label: 'Vermelho' },
  { id: 'blue', hex: '#1E88E5', label: 'Azul' },
  { id: 'green', hex: '#43A047', label: 'Verde' },
  { id: 'yellow', hex: '#FDD835', label: 'Amarelo' },
  { id: 'orange', hex: '#FF6D00', label: 'Laranja' },
  { id: 'purple', hex: '#8E24AA', label: 'Roxo' },
  { id: 'black', hex: '#212121', label: 'Preto' },
  { id: 'white', hex: '#FFFFFF', label: 'Branco' },
]

const BRUSH_SIZES = [
  { id: 'small', size: 4, label: 'Fino' },
  { id: 'medium', size: 8, label: 'Médio' },
  { id: 'large', size: 16, label: 'Grosso' },
]

export default function ColorCanvas({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex)
  const [brushSize, setBrushSize] = useState(BRUSH_SIZES[1].size)
  const [isComplete, setIsComplete] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.parentElement.getBoundingClientRect()
    const width = Math.min(rect.width, 500)
    const height = Math.round(width * 0.75)
    canvas.width = width
    canvas.height = height
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)
  }, [])

  const getCanvasPos = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }, [])

  const startDrawing = useCallback(
    (e) => {
      e.preventDefault()
      isDrawingRef.current = true
      const pos = getCanvasPos(e)
      lastPosRef.current = pos
      setHasDrawn(true)
    },
    [getCanvasPos]
  )

  const draw = useCallback(
    (e) => {
      if (!isDrawingRef.current) return
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      const pos = getCanvasPos(e)

      ctx.beginPath()
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = selectedColor
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()

      lastPosRef.current = pos
    },
    [getCanvasPos, selectedColor, brushSize]
  )

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false
  }, [])

  const handleClear = useCallback(() => {
    registerClick()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }, [registerClick])

  const handleFinish = useCallback(() => {
    registerClick()
    registerSuccess()
    updateCampoProgress('campo5', 3)
    completeActivity('color-canvas', 3)
    setIsComplete(true)
  }, [registerClick, registerSuccess, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Tela de Cores" backPath="/campo/5" color="var(--color-campo5)">
        <CompletionCelebration
          emoji="🎨"
          title="Criaste uma obra de arte!"
          stars={3}
          color="var(--color-campo5)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Tela de Cores"
      instruction="Desenha livremente na tela! Escolhe cores e tamanhos de pincel."
      backPath="/campo/5"
      color="var(--color-campo5)"
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          style={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
        />
      </div>

      <div style={styles.toolbar}>
        <div style={styles.toolSection}>
          <p style={styles.toolLabel}>Cor:</p>
          <div style={styles.colorPalette}>
            {COLORS.map((color) => (
              <button
                key={color.id}
                style={{
                  ...styles.colorBtn,
                  backgroundColor: color.hex,
                  border: selectedColor === color.hex
                    ? '3px solid var(--color-campo5)'
                    : color.id === 'white'
                      ? '2px solid var(--color-border)'
                      : '2px solid transparent',
                  transform: selectedColor === color.hex ? 'scale(1.15)' : 'scale(1)',
                }}
                onClick={() => {
                  registerClick()
                  setSelectedColor(color.hex)
                }}
                aria-label={color.label}
              />
            ))}
          </div>
        </div>

        <div style={styles.toolSection}>
          <p style={styles.toolLabel}>Pincel:</p>
          <div style={styles.brushSizes}>
            {BRUSH_SIZES.map((b) => (
              <button
                key={b.id}
                style={{
                  ...styles.brushBtn,
                  border: brushSize === b.size
                    ? '2px solid var(--color-campo5)'
                    : '2px solid var(--color-border)',
                  backgroundColor: brushSize === b.size ? '#E0F7FA' : 'var(--color-surface)',
                }}
                className="btn-press"
                onClick={() => {
                  registerClick()
                  setBrushSize(b.size)
                }}
              >
                <span
                  style={{
                    width: b.size * 2,
                    height: b.size * 2,
                    borderRadius: '50%',
                    backgroundColor: selectedColor,
                    display: 'inline-block',
                  }}
                />
                <span style={styles.brushLabel}>{b.label}</span>
              </button>
            ))}
          </div>
        </div>
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
  canvasWrapper: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-sm)',
    border: '2px solid var(--color-border)',
  },
  canvas: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: 'var(--radius-md)',
    touchAction: 'none',
    cursor: 'crosshair',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  toolSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  toolLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text-secondary)',
  },
  colorPalette: {
    display: 'flex',
    gap: 'var(--space-sm)',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  colorBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    flexShrink: 0,
  },
  brushSizes: {
    display: 'flex',
    gap: 'var(--space-sm)',
    justifyContent: 'center',
  },
  brushBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    minWidth: '70px',
    transition: 'all var(--transition-speed)',
  },
  brushLabel: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
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
