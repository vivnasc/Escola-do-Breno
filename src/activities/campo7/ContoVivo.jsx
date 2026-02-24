import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'
import { getStory, getStoriesForUniverse, MOODS } from '../../data/stories'

// ── Ambient sound synthesis (zero audio files) ──────────────────

function playBirds(ctx) {
  const duration = 3
  const t = ctx.currentTime
  for (let i = 0; i < 8; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    const freq = 1200 + Math.random() * 800
    const start = t + i * 0.35
    osc.frequency.setValueAtTime(freq, start)
    osc.frequency.linearRampToValueAtTime(freq + 400, start + 0.08)
    osc.frequency.linearRampToValueAtTime(freq - 200, start + 0.15)
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(0.1, start + 0.02)
    gain.gain.linearRampToValueAtTime(0, start + 0.18)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(start)
    osc.stop(start + 0.2)
  }
  return duration
}

function playRain(ctx) {
  const duration = 4
  const size = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < size; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.12
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 3500
  const gain = ctx.createGain()
  const t = ctx.currentTime
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(0.3, t + 0.5)
  gain.gain.linearRampToValueAtTime(0.3, t + duration - 1)
  gain.gain.linearRampToValueAtTime(0, t + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start()
  source.stop(t + duration)
  return duration
}

function playWind(ctx) {
  const duration = 4
  const t = ctx.currentTime
  const size = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < size; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.25
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(300, t)
  filter.frequency.linearRampToValueAtTime(1000, t + 1.5)
  filter.frequency.linearRampToValueAtTime(400, t + 3)
  filter.frequency.linearRampToValueAtTime(700, t + duration)
  filter.Q.value = 2
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(0.35, t + 0.8)
  gain.gain.linearRampToValueAtTime(0.2, t + 2.5)
  gain.gain.linearRampToValueAtTime(0, t + duration)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(t)
  source.stop(t + duration)
  return duration
}

function playSea(ctx) {
  const duration = 4
  const t = ctx.currentTime
  const size = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < size; i++) {
    const phase = (i / ctx.sampleRate) * Math.PI * 2 * 0.25
    const envelope = (Math.sin(phase) + 1) / 2
    data[i] = (Math.random() * 2 - 1) * 0.15 * envelope
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 1200
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.4, t)
  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  source.start(t)
  source.stop(t + duration)
  return duration
}

const SOUND_PLAYERS = { birds: playBirds, rain: playRain, wind: playWind, sea: playSea }

// ── Component ────────────────────────────────────────────────────

export default function ContoVivo({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const audioCtxRef = useRef(null)
  const [storyId, setStoryId] = useState(null)
  const [sceneIdx, setSceneIdx] = useState(0)
  const [showInteraction, setShowInteraction] = useState(false)
  const [interactionResponse, setInteractionResponse] = useState(null)
  const [bestAnswers, setBestAnswers] = useState(0)
  const [totalInteractions, setTotalInteractions] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)

  const universeId = adaptive?.universe?.id || 'football'

  // Story selection or single story
  const stories = useMemo(() => getStoriesForUniverse(universeId), [universeId])
  const story = useMemo(
    () => storyId ? getStory(storyId, universeId) : null,
    [storyId, universeId]
  )

  const scene = story?.scenes?.[sceneIdx] || null
  const mood = scene ? (MOODS[scene.mood] || MOODS.warm) : MOODS.warm

  // Audio context for ambient sounds
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }, [])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Play ambient sound for current scene
  const playAmbient = useCallback(async (soundId) => {
    if (!soundId || !SOUND_PLAYERS[soundId]) return
    const ctx = getAudioCtx()
    if (ctx.state === 'suspended') await ctx.resume()
    SOUND_PLAYERS[soundId](ctx)
  }, [getAudioCtx])

  // When scene changes: narrate + play sound
  useEffect(() => {
    if (!scene) return
    setSceneReady(false)
    setShowInteraction(false)
    setInteractionResponse(null)

    // Small delay for visual transition
    const timer = setTimeout(() => {
      setSceneReady(true)
      speak(scene.text, { auto: true })
      if (scene.sound) playAmbient(scene.sound)
    }, 400)

    return () => clearTimeout(timer)
  }, [sceneIdx, story?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Show interaction after narration settles
  useEffect(() => {
    if (!sceneReady || !scene?.interaction || showInteraction) return
    const timer = setTimeout(() => setShowInteraction(true), 2000)
    return () => clearTimeout(timer)
  }, [sceneReady, scene, showInteraction])

  // Handle interaction answer
  const handleInteractionAnswer = useCallback((option, index) => {
    registerClick()
    setInteractionResponse(option.response)
    speak(option.response, { auto: true })
    setTotalInteractions((t) => t + 1)

    if (scene?.interaction?.bestIndex === index) {
      registerSuccess()
      setBestAnswers((b) => b + 1)
    }
  }, [registerClick, registerSuccess, scene, speak])

  // Advance to next scene
  const handleNext = useCallback(() => {
    if (!story) return
    const next = sceneIdx + 1
    updateCampoProgress('campo7', next)

    if (next >= story.scenes.length) {
      const stars = bestAnswers >= totalInteractions * 0.8 ? 3
        : bestAnswers >= totalInteractions * 0.5 ? 2 : 1
      completeActivity('contos-vivos', stars)
      setIsComplete(true)
    } else {
      setSceneIdx(next)
    }
  }, [sceneIdx, story, bestAnswers, totalInteractions, completeActivity, updateCampoProgress])

  // Listen again
  const handleListenAgain = useCallback(() => {
    if (scene) speak(scene.text)
  }, [scene, speak])

  // ── Story selection screen ──
  if (!storyId) {
    return (
      <ActivityShell
        title="Contos Vivos"
        instruction="Escolhe uma história para ouvir."
        backPath="/campo/7"
        color="var(--color-campo7)"
        textLevel={adaptive?.textLevel}
      >
        <div style={styles.storyList}>
          {stories.map((s) => (
            <button
              key={s.id}
              className="btn-press"
              style={styles.storyCard}
              onClick={() => {
                registerClick()
                setStoryId(s.id)
              }}
            >
              <span style={styles.storyCover}>{s.coverEmoji}</span>
              <span style={styles.storyTitle}>{s.title}</span>
            </button>
          ))}
        </div>
      </ActivityShell>
    )
  }

  // ── Completion ──
  if (isComplete) {
    return (
      <ActivityShell title="Contos Vivos" backPath="/campo/7" color="var(--color-campo7)">
        <CompletionCelebration
          emoji="📖"
          title={`Viveste "${story.title}" do início ao fim!`}
          stars={bestAnswers >= totalInteractions * 0.8 ? 3 : bestAnswers >= totalInteractions * 0.5 ? 2 : 1}
          color="var(--color-campo7)"
        />
      </ActivityShell>
    )
  }

  // ── Scene rendering ──
  const progress = story ? `${sceneIdx + 1} / ${story.scenes.length}` : ''
  const canAdvance = !scene?.interaction || interactionResponse !== null
  const isEnding = scene?.isEnding

  return (
    <ActivityShell
      title={story?.title || 'Contos Vivos'}
      backPath="/campo/7"
      color="var(--color-campo7)"
      textLevel={adaptive?.textLevel}
    >
      {/* Progress bar */}
      <div style={styles.progressContainer}>
        <div style={styles.progressTrack}>
          <div
            style={{
              ...styles.progressFill,
              width: story ? `${((sceneIdx + 1) / story.scenes.length) * 100}%` : '0%',
            }}
          />
        </div>
        <span style={styles.progressText}>{progress}</span>
      </div>

      {/* Scene card */}
      <div
        style={{
          ...styles.sceneCard,
          backgroundColor: mood.bg,
          borderColor: mood.border,
          opacity: sceneReady ? 1 : 0,
          transform: sceneReady ? 'translateY(0)' : 'translateY(12px)',
        }}
      >
        {/* Visual emoji */}
        <div style={styles.visualContainer}>
          <span style={styles.visual}>{scene?.visual || '📖'}</span>
        </div>

        {/* Narration text */}
        <p style={styles.narrationText}>{scene?.text || ''}</p>

        {/* Listen again button */}
        <button
          style={styles.listenBtn}
          className="btn-press"
          onClick={handleListenAgain}
          aria-label="Ouvir outra vez"
        >
          🔊 Ouvir outra vez
        </button>
      </div>

      {/* Interaction */}
      {showInteraction && scene?.interaction && !interactionResponse && (
        <div style={styles.interactionCard} className="animate-fade-in">
          <p style={styles.interactionPrompt}>{scene.interaction.prompt}</p>
          <div style={styles.interactionOptions}>
            {scene.interaction.options.map((opt, i) => (
              <button
                key={i}
                className="btn-press"
                style={styles.interactionBtn}
                onClick={() => handleInteractionAnswer(opt, i)}
              >
                <span style={styles.interactionEmoji}>{opt.emoji}</span>
                <span style={styles.interactionLabel}>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interaction feedback */}
      {interactionResponse && (
        <div style={styles.feedbackCard} className="animate-fade-in">
          <p style={styles.feedbackText}>{interactionResponse}</p>
        </div>
      )}

      {/* Next / Finish button */}
      {canAdvance && sceneReady && (
        <button
          className="btn-press"
          style={{
            ...styles.nextBtn,
            backgroundColor: isEnding ? 'var(--color-campo7)' : 'var(--color-campo7)',
          }}
          onClick={handleNext}
        >
          {isEnding ? '🌟 Fim da História' : 'Próximo →'}
        </button>
      )}
    </ActivityShell>
  )
}

// ── Styles ────────────────────────────────────────────────────────

const styles = {
  // Story selection
  storyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  storyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--transition-speed)',
  },
  storyCover: {
    fontSize: '3rem',
    flexShrink: 0,
  },
  storyTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-campo7)',
  },

  // Progress
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  progressTrack: {
    flex: 1,
    height: '6px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--color-campo7)',
    borderRadius: '3px',
    transition: 'width 0.5s ease',
  },
  progressText: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    whiteSpace: 'nowrap',
  },

  // Scene
  sceneCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-xl)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid',
    transition: 'all 0.6s ease',
  },
  visualContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  visual: {
    fontSize: '4rem',
    lineHeight: 1,
  },
  narrationText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    lineHeight: 1.8,
    color: 'var(--color-text)',
    textAlign: 'center',
  },
  listenBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    minHeight: '44px',
  },

  // Interaction
  interactionCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo7)',
  },
  interactionPrompt: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 700,
    color: 'var(--color-campo7)',
    textAlign: 'center',
  },
  interactionOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  interactionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-bg)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--transition-speed)',
    minHeight: '44px',
  },
  interactionEmoji: {
    fontSize: '1.8rem',
    flexShrink: 0,
  },
  interactionLabel: {
    flex: 1,
  },

  // Feedback
  feedbackCard: {
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #A5D6A7',
  },
  feedbackText: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: '#2E7D32',
    lineHeight: 1.6,
    textAlign: 'center',
  },

  // Navigation
  nextBtn: {
    alignSelf: 'center',
    padding: 'var(--space-md) var(--space-2xl)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    fontWeight: 700,
    fontSize: 'var(--font-size-lg)',
    border: 'none',
    cursor: 'pointer',
    minHeight: '48px',
    transition: 'all var(--transition-speed)',
  },
}
