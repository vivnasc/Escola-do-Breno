import { useState, useCallback, useMemo, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import FeedbackMessage from '../../components/FeedbackMessage'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'
import { useSTT } from '../../hooks/useSTT'
import { useSoundEffects } from '../../hooks/useSoundEffects'

/**
 * Letters ordered by phonics acquisition research:
 * - Phase 1 (level field 1): Letters and Sounds Phase 2 — s,a,t,p,i,n + vowels o,e
 *   These are the first sounds taught in systematic phonics (Jolly Phonics, Letters & Sounds UK).
 *   High frequency in English, needed for first CVC words (sat, pin, tap, ten).
 * - Phase 2 (level 2): Remaining high-frequency consonants — m,d,g,c,k,r,b,h
 *   Completes ability to decode most simple words.
 * - Phase 3 (level 3): All remaining letters — f,l,j,w,v,u,q,x,y,z
 *   Less frequent letters, completes the alphabet.
 *
 * Research: Johnston & Watson (2005) Clackmannanshire study; Rose Review (2006);
 * National Reading Panel (2000); Ehri et al. systematic phonics meta-analysis.
 */
const LETTERS = [
  { letter: 'S', sound: 'sss', words: ['sun', 'star'], wordsPt: ['sol', 'estrela'], emoji: '☀️', level: 1 },
  { letter: 'A', sound: 'ah', words: ['apple', 'ant'], wordsPt: ['maçã', 'formiga'], emoji: '🍎', level: 1 },
  { letter: 'T', sound: 'tuh', words: ['tree', 'train'], wordsPt: ['árvore', 'comboio'], emoji: '🌳', level: 1 },
  { letter: 'P', sound: 'puh', words: ['pen', 'pizza'], wordsPt: ['caneta', 'pizza'], emoji: '🖊️', level: 1 },
  { letter: 'I', sound: 'ih', words: ['ice', 'insect'], wordsPt: ['gelo', 'inseto'], emoji: '🧊', level: 1 },
  { letter: 'N', sound: 'nuh', words: ['nose', 'nest'], wordsPt: ['nariz', 'ninho'], emoji: '👃', level: 1 },
  { letter: 'O', sound: 'oh', words: ['orange', 'octopus'], wordsPt: ['laranja', 'polvo'], emoji: '🍊', level: 1 },
  { letter: 'E', sound: 'eh', words: ['egg', 'elephant'], wordsPt: ['ovo', 'elefante'], emoji: '🥚', level: 1 },
  { letter: 'M', sound: 'muh', words: ['moon', 'mouse'], wordsPt: ['lua', 'rato'], emoji: '🌙', level: 2 },
  { letter: 'D', sound: 'duh', words: ['dog', 'door'], wordsPt: ['cão', 'porta'], emoji: '🐕', level: 2 },
  { letter: 'G', sound: 'guh', words: ['goat', 'green'], wordsPt: ['cabra', 'verde'], emoji: '🐐', level: 2 },
  { letter: 'C', sound: 'kuh', words: ['cat', 'car'], wordsPt: ['gato', 'carro'], emoji: '🐱', level: 2 },
  { letter: 'K', sound: 'kuh', words: ['king', 'kite'], wordsPt: ['rei', 'papagaio'], emoji: '👑', level: 2 },
  { letter: 'R', sound: 'ruh', words: ['rain', 'rabbit'], wordsPt: ['chuva', 'coelho'], emoji: '🌧️', level: 2 },
  { letter: 'B', sound: 'buh', words: ['ball', 'bird'], wordsPt: ['bola', 'pássaro'], emoji: '⚽', level: 2 },
  { letter: 'H', sound: 'huh', words: ['hat', 'house'], wordsPt: ['chapéu', 'casa'], emoji: '🏠', level: 2 },
  { letter: 'F', sound: 'fuh', words: ['fish', 'flower'], wordsPt: ['peixe', 'flor'], emoji: '🐟', level: 3 },
  { letter: 'L', sound: 'luh', words: ['lion', 'leaf'], wordsPt: ['leão', 'folha'], emoji: '🦁', level: 3 },
  { letter: 'J', sound: 'juh', words: ['jump', 'juice'], wordsPt: ['saltar', 'sumo'], emoji: '🦘', level: 3 },
  { letter: 'W', sound: 'wuh', words: ['water', 'window'], wordsPt: ['água', 'janela'], emoji: '💧', level: 3 },
  { letter: 'V', sound: 'vuh', words: ['van', 'violin'], wordsPt: ['carrinha', 'violino'], emoji: '🎻', level: 3 },
  { letter: 'U', sound: 'uh', words: ['umbrella', 'under'], wordsPt: ['guarda-chuva', 'debaixo'], emoji: '☂️', level: 3 },
  { letter: 'Q', sound: 'kwuh', words: ['queen', 'question'], wordsPt: ['rainha', 'pergunta'], emoji: '👸', level: 3 },
  { letter: 'X', sound: 'ks', words: ['box', 'fox'], wordsPt: ['caixa', 'raposa'], emoji: '📦', level: 3 },
  { letter: 'Y', sound: 'yuh', words: ['yellow', 'yogurt'], wordsPt: ['amarelo', 'iogurte'], emoji: '🟡', level: 3 },
  { letter: 'Z', sound: 'zzz', words: ['zoo', 'zebra'], wordsPt: ['zoo', 'zebra'], emoji: '🦓', level: 3 },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Phonics({
  registerClick,
  registerError,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
  soundEnabled,
}) {
  const { speak, speakEn } = useTTS()
  const stt = useSTT('en-GB')
  const sfx = useSoundEffects(soundEnabled)
  const choiceCount = adaptive?.choiceCount || 3
  const campoLevel = adaptive?.campoLevel?.campo1 || 1

  // Filter letters by competency level (systematic phonics progression)
  // L1-2: phase 1 letters (s,a,t,p,i,n,o,e) — 8 letters
  // L3-4: + phase 2 (m,d,g,c,k,r,b,h) — 16 letters
  // L5+:  + phase 3 (all 26) — full alphabet
  const availableLetters = useMemo(() => {
    let maxLetterLevel
    if (campoLevel <= 2) maxLetterLevel = 1
    else if (campoLevel <= 4) maxLetterLevel = 2
    else maxLetterLevel = 3
    return LETTERS.filter(l => l.level <= maxLetterLevel)
  }, [campoLevel])

  // Rounds scale with level: fewer letters = fewer rounds, more letters = more practice
  const rounds = Math.min(availableLetters.length, campoLevel <= 2 ? 6 : campoLevel <= 5 ? 8 : 12)
  const items = useMemo(() => shuffle(availableLetters).slice(0, rounds), [availableLetters, rounds])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [phase, setPhase] = useState('sound') // 'sound' | 'word'
  const [sttResult, setSttResult] = useState(null)

  const current = items[idx]
  const isComplete = idx >= items.length

  useEffect(() => {
    if (!isComplete && current) {
      if (phase === 'sound') {
        speak(`Que letra faz o som "${current.sound}"?`, { auto: true })
        setTimeout(() => speakEn(current.sound, { auto: true }), 1200)
      } else {
        speakEn(`${current.words[0]}`, { auto: true })
        speak(`Que palavra começa com ${current.letter}?`, { auto: true })
      }
    }
  }, [idx, phase])

  const soundOptions = useMemo(() => {
    if (!current || phase !== 'sound') return []
    const others = availableLetters.filter((l) => l.letter !== current.letter)
    const distractors = shuffle(others).slice(0, choiceCount - 1)
    return shuffle([current, ...distractors])
  }, [current, phase, choiceCount, availableLetters])

  const wordOptions = useMemo(() => {
    if (!current || phase !== 'word') return []
    const others = availableLetters.filter((l) => l.letter !== current.letter)
    const distractors = shuffle(others)
      .slice(0, choiceCount - 1)
      .map((l) => ({ word: l.words[0], wordPt: l.wordsPt[0], emoji: l.emoji, letter: l.letter }))
    return shuffle([
      { word: current.words[0], wordPt: current.wordsPt[0], emoji: current.emoji, letter: current.letter },
      ...distractors,
    ])
  }, [current, phase, choiceCount, availableLetters])

  const handleSoundAnswer = useCallback(
    (letter) => {
      registerClick()
      if (letter.letter === current.letter) {
        registerSuccess()
        setFeedback('success')
        speak(`Muito bem! ${current.letter} faz "${current.sound}"`)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError, speak]
  )

  const handleWordAnswer = useCallback(
    (opt) => {
      registerClick()
      if (opt.letter === current.letter) {
        registerSuccess()
        setScore((s) => s + 1)
        setFeedback('success')
        speakEn(opt.word)
      } else {
        registerError()
        setFeedback('tryAgain')
      }
    },
    [current, registerClick, registerSuccess, registerError, speakEn]
  )

  // Speech recognition: say the word aloud
  const handleSpeakWord = useCallback(async () => {
    if (!stt.supported || !current) return
    setSttResult(null)
    sfx.click()
    speak('Diz a palavra em voz alta!')

    const expectedWords = current.words.map((w) => w.toLowerCase())
    const result = await stt.listenForWord(expectedWords, { lang: 'en-GB', timeout: 5000 })

    setSttResult(result)
    if (result.match) {
      sfx.celebrate()
      speak(`Perfeito! Disseste "${result.heard}" correctamente!`)
    } else if (result.heard) {
      speak(`Ouvimos "${result.heard}". Tenta dizer "${current.words[0]}"`)
    } else {
      speak('Não ouvimos nada. Tenta de novo!')
    }
  }, [stt, current, sfx, speak])

  const handleNext = useCallback(() => {
    setFeedback(null)
    setSttResult(null)
    if (phase === 'sound') {
      setPhase('word')
    } else {
      setPhase('sound')
      const next = idx + 1
      setIdx(next)
      updateCampoProgress('campo1', next + 20)
      if (next >= items.length) {
        sfx.celebrate()
        completeActivity('phonics', score >= items.length * 0.8 ? 3 : score >= items.length * 0.5 ? 2 : 1)
      }
    }
  }, [idx, phase, score, items.length, completeActivity, updateCampoProgress, sfx])

  const finalStars = score >= items.length * 0.8 ? 3 : score >= items.length * 0.5 ? 2 : 1

  if (isComplete) {
    return (
      <ActivityShell title="Sons e Letras" backPath="/campo/1" color="var(--color-campo1)">
        <CompletionCelebration
          emoji="🔤"
          title={`Aprendeste ${score} sons!`}
          score={score}
          total={items.length}
          stars={finalStars}
          color="var(--color-campo1)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Sons e Letras"
      instruction={phase === 'sound' ? `Que letra faz "${current.sound}"?` : `Que palavra começa com ${current.letter}?`}
      backPath="/campo/1"
      color="var(--color-campo1)"
      score={score}
      total={items.length}
      textLevel={adaptive?.textLevel}
    >
      {phase === 'sound' ? (
        <>
          <div style={styles.soundCard}>
            <button style={styles.soundBtn} onClick={() => speakEn(current.sound)}>
              🔊 "{current.sound}"
            </button>
          </div>
          <div style={styles.optionsGrid}>
            {soundOptions.map((opt) => (
              <button
                key={opt.letter}
                className="btn-press"
                style={styles.letterBtn}
                onClick={() => handleSoundAnswer(opt)}
                disabled={feedback !== null}
              >
                {opt.letter}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={styles.letterDisplay}>
            <span style={styles.bigLetter}>{current.letter}</span>
          </div>
          <div style={styles.optionsList}>
            {wordOptions.map((opt) => (
              <button
                key={opt.word}
                className="btn-press"
                style={styles.wordBtn}
                onClick={() => handleWordAnswer(opt)}
                disabled={feedback !== null}
              >
                <span style={styles.wordEmoji}>{opt.emoji}</span>
                <span>{opt.word}</span>
                <span style={styles.wordPt}>({opt.wordPt})</span>
              </button>
            ))}
          </div>
          {/* Speech recognition: say the word aloud */}
          {stt.supported && feedback === null && (
            <button
              style={{
                ...styles.micBtn,
                ...(stt.isListening ? styles.micBtnActive : {}),
              }}
              onClick={handleSpeakWord}
              disabled={stt.isListening}
            >
              {stt.isListening ? '🎙️ A ouvir...' : '🎤 Diz a palavra!'}
            </button>
          )}
          {sttResult && (
            <div style={{
              ...styles.sttResult,
              backgroundColor: sttResult.match ? '#E8F5E9' : '#FFF3E0',
              borderColor: sttResult.match ? '#4CAF50' : '#FF9800',
            }}>
              {sttResult.match
                ? `Disseste "${sttResult.heard}" — Correcto!`
                : sttResult.heard
                  ? `Ouvimos "${sttResult.heard}" — Tenta de novo`
                  : 'Não ouvimos nada'}
            </div>
          )}
        </>
      )}

      <FeedbackMessage
        type={feedback}
        visible={feedback !== null}
        onDismiss={feedback === 'success' ? handleNext : () => setFeedback(null)}
        universe={adaptive?.universe}
        soundEnabled={soundEnabled}
      />
    </ActivityShell>
  )
}

const styles = {
  soundCard: {
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--space-xl)',
  },
  soundBtn: {
    padding: 'var(--space-lg) var(--space-2xl)',
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 700,
    backgroundColor: '#E3F2FD',
    border: '3px solid var(--color-campo1)',
    borderRadius: 'var(--radius-lg)',
    cursor: 'pointer',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-md)',
  },
  letterBtn: {
    padding: 'var(--space-xl)',
    fontSize: '2.5rem',
    fontWeight: 700,
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    textAlign: 'center',
  },
  letterDisplay: {
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--space-lg)',
  },
  bigLetter: {
    fontSize: '5rem',
    fontWeight: 700,
    color: 'var(--color-campo1)',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  wordBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
  },
  wordEmoji: { fontSize: '1.8rem' },
  wordPt: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginLeft: 'auto',
  },
  micBtn: {
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    border: '2px solid var(--color-campo1)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    fontFamily: 'inherit',
    textAlign: 'center',
  },
  micBtnActive: {
    backgroundColor: '#FFCDD2',
    borderColor: '#E53935',
  },
  sttResult: {
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    textAlign: 'center',
  },
  complete: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)',
  },
  completeEmoji: { fontSize: '4rem' },
  completeText: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary)',
  },
}
