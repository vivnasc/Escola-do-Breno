import { useState, useCallback } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

/**
 * O Meu Conto — the child creates their own story.
 *
 * More guided than StoryBuilder (Campo 5): after choosing elements,
 * the app narrates a COMPLETE story with the child's choices woven in.
 * The child hears their story come alive.
 */

const STEPS = [
  {
    label: 'Herói',
    prompt: 'Quem é o herói da tua história?',
    options: [
      { text: 'Uma menina corajosa', emoji: '👧', key: 'heroine' },
      { text: 'Um menino curioso', emoji: '👦', key: 'hero' },
      { text: 'Um animal que fala', emoji: '🐻', key: 'animal' },
      { text: 'Um robot simpático', emoji: '🤖', key: 'robot' },
    ],
  },
  {
    label: 'Lugar',
    prompt: 'Onde se passa a tua história?',
    options: [
      { text: 'Numa floresta mágica', emoji: '🌲', key: 'forest' },
      { text: 'No fundo do mar', emoji: '🌊', key: 'sea' },
      { text: 'Num castelo antigo', emoji: '🏰', key: 'castle' },
      { text: 'No espaço', emoji: '🚀', key: 'space' },
    ],
  },
  {
    label: 'Amigo',
    prompt: 'Quem ajuda o herói?',
    options: [
      { text: 'Um pássaro sábio', emoji: '🦉', key: 'owl' },
      { text: 'Um gato brincalhão', emoji: '🐱', key: 'cat' },
      { text: 'Uma estrela brilhante', emoji: '⭐', key: 'star' },
      { text: 'Uma borboleta mágica', emoji: '🦋', key: 'butterfly' },
    ],
  },
  {
    label: 'Problema',
    prompt: 'O que acontece de difícil?',
    options: [
      { text: 'Perde-se no caminho', emoji: '🗺️', key: 'lost' },
      { text: 'Tem de atravessar um rio', emoji: '🌊', key: 'river' },
      { text: 'Encontra uma porta trancada', emoji: '🚪', key: 'door' },
      { text: 'Precisa de resolver um enigma', emoji: '🧩', key: 'riddle' },
    ],
  },
  {
    label: 'Final',
    prompt: 'Como termina a tua história?',
    options: [
      { text: 'Com uma grande festa', emoji: '🎉', key: 'party' },
      { text: 'Com uma amizade nova', emoji: '🤝', key: 'friend' },
      { text: 'Com um tesouro encontrado', emoji: '💎', key: 'treasure' },
      { text: 'Com uma lição aprendida', emoji: '💡', key: 'lesson' },
    ],
  },
]

// Build a narrated story from the child's choices
function buildNarration(choices) {
  const [hero, place, friend, problem, ending] = choices

  const heroName = {
    heroine: 'a Leonor', hero: 'o Martim', animal: 'o Urso Bruno', robot: 'o Robot Tito',
  }[hero.key]

  const heroPronouns = {
    heroine: ['Ela', 'A'], hero: ['Ele', 'O'], animal: ['Ele', 'O'], robot: ['Ele', 'O'],
  }[hero.key]

  const placeDesc = {
    forest: 'numa floresta onde as árvores sussurravam segredos',
    sea: 'no fundo do mar, onde os peixes brilhavam como joias',
    castle: 'num castelo antigo cheio de corredores misteriosos',
    space: 'no espaço, entre estrelas e planetas coloridos',
  }[place.key]

  const friendDesc = {
    owl: 'uma coruja sábia que sabia todos os caminhos',
    cat: 'um gato brincalhão que saltava de rocha em rocha',
    star: 'uma estrela brilhante que iluminava o caminho',
    butterfly: 'uma borboleta mágica que deixava um rasto de luz',
  }[friend.key]

  const problemDesc = {
    lost: `${heroPronouns[0]} perdeu-se. Olhou à volta e não reconheceu nada. Mas não entrou em pânico.`,
    river: `${heroPronouns[0]} chegou a um rio largo e rápido. Não havia ponte. Tinha de encontrar uma maneira de atravessar.`,
    door: `${heroPronouns[0]} encontrou uma porta enorme, trancada com um cadeado estranho. O que estaria do outro lado?`,
    riddle: `${heroPronouns[0]} encontrou uma pedra com um enigma gravado. Só quem o resolvesse podia continuar.`,
  }[problem.key]

  const endingDesc = {
    party: `E quando tudo terminou, houve uma grande festa! ${heroName} dançou, riu, e soube que tinha sido a aventura mais incrível da sua vida.`,
    friend: `No fim, ${heroName} tinha feito um amigo para sempre. Às vezes, as melhores aventuras dão-nos algo que nunca esperávamos: uma amizade.`,
    treasure: `${heroName} encontrou um tesouro escondido! Mas o maior tesouro não eram as joias — era a coragem que tinha descoberto dentro de si.`,
    lesson: `${heroName} aprendeu algo importante: que nunca estamos sozinhos quando temos coragem. E que pedir ajuda não é fraqueza — é sabedoria.`,
  }[ending.key]

  return [
    `Era uma vez ${heroName}, que vivia ${placeDesc}.`,
    `Um dia, ${heroName} decidiu partir numa grande aventura. ${heroPronouns[0]} queria descobrir algo que ninguém tinha visto antes.`,
    `Pelo caminho, encontrou ${friendDesc}. "Posso ir contigo?", perguntou. ${heroPronouns[1]} ${heroName.replace(/^[ao] /i, '')} sorriu: "Claro que sim!"`,
    problemDesc,
    `Mas com a ajuda do seu amigo, ${heroName} encontrou a solução. Juntos, conseguiram superar o desafio!`,
    endingDesc,
    `E assim acaba a história que tu criaste. Uma história só tua, que ninguém mais inventou. ${hero.emoji}`,
  ]
}

export default function MeuConto({
  registerClick,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [stepIdx, setStepIdx] = useState(0)
  const [choices, setChoices] = useState([])
  const [narrationIdx, setNarrationIdx] = useState(-1) // -1 = not narrating yet
  const [narration, setNarration] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  const isChoosing = stepIdx < STEPS.length
  const isNarrating = narration.length > 0 && narrationIdx >= 0
  const narratingDone = narrationIdx >= narration.length - 1

  const handleChoice = useCallback((option) => {
    registerClick()
    registerSuccess()
    const newChoices = [...choices, option]
    setChoices(newChoices)
    updateCampoProgress('campo7', stepIdx + 1)

    if (stepIdx + 1 >= STEPS.length) {
      // All choices made — build narration
      const lines = buildNarration(newChoices)
      setNarration(lines)
      setNarrationIdx(0)
      speak(lines[0], { auto: true })
    } else {
      setStepIdx(stepIdx + 1)
      speak(STEPS[stepIdx + 1].prompt, { auto: true })
    }
  }, [stepIdx, choices, registerClick, registerSuccess, updateCampoProgress, speak])

  const handleNextNarration = useCallback(() => {
    registerClick()
    if (narrationIdx + 1 < narration.length) {
      const next = narrationIdx + 1
      setNarrationIdx(next)
      speak(narration[next], { auto: true })
    }
  }, [narrationIdx, narration, registerClick, speak])

  const handleFinish = useCallback(() => {
    completeActivity('meu-conto', 3)
    setIsComplete(true)
  }, [completeActivity])

  const handleListenAgain = useCallback(() => {
    if (narration[narrationIdx]) speak(narration[narrationIdx])
  }, [narrationIdx, narration, speak])

  if (isComplete) {
    return (
      <ActivityShell title="O Meu Conto" backPath="/campo/7" color="var(--color-campo7)">
        <CompletionCelebration
          emoji="✍️"
          title="Criaste uma história fantástica!"
          stars={3}
          color="var(--color-campo7)"
        />
      </ActivityShell>
    )
  }

  // Choosing phase
  if (isChoosing) {
    const current = STEPS[stepIdx]
    return (
      <ActivityShell
        title="O Meu Conto"
        instruction={current.prompt}
        backPath="/campo/7"
        color="var(--color-campo7)"
        score={stepIdx + 1}
        total={STEPS.length}
        textLevel={adaptive?.textLevel}
      >
        <div style={styles.stepDots}>
          {STEPS.map((s, i) => (
            <span
              key={i}
              style={{
                ...styles.dot,
                backgroundColor: i <= stepIdx ? 'var(--color-campo7)' : 'var(--color-border)',
                opacity: i === stepIdx ? 1 : i < stepIdx ? 0.6 : 0.3,
              }}
            >
              {s.label}
            </span>
          ))}
        </div>

        <div style={styles.optionsList}>
          {current.options.map((opt, i) => (
            <button
              key={i}
              className="btn-press"
              style={styles.optionBtn}
              onClick={() => handleChoice(opt)}
            >
              <span style={styles.optionEmoji}>{opt.emoji}</span>
              <span style={styles.optionText}>{opt.text}</span>
            </button>
          ))}
        </div>

        {choices.length > 0 && (
          <div style={styles.choicesSoFar}>
            <p style={styles.choicesLabel}>A tua história até agora:</p>
            {choices.map((c, i) => (
              <span key={i} style={styles.choiceTag}>{c.emoji} {c.text}</span>
            ))}
          </div>
        )}
      </ActivityShell>
    )
  }

  // Narrating phase
  return (
    <ActivityShell
      title="O Meu Conto"
      backPath="/campo/7"
      color="var(--color-campo7)"
      textLevel={adaptive?.textLevel}
    >
      <div style={styles.narrationCard}>
        <div style={styles.narrationHeader}>
          <span style={styles.narrationEmoji}>📖</span>
          <h3 style={styles.narrationTitle}>A tua história:</h3>
        </div>

        <p style={styles.narrationText}>
          {narration[narrationIdx]}
        </p>

        <button style={styles.listenBtn} className="btn-press" onClick={handleListenAgain}>
          🔊 Ouvir outra vez
        </button>

        <div style={styles.narrationFooter}>
          <span style={styles.narrationCount}>
            {narrationIdx + 1} / {narration.length}
          </span>
          {!narratingDone ? (
            <button className="btn-press" style={styles.nextNarrationBtn} onClick={handleNextNarration}>
              Continuar →
            </button>
          ) : (
            <button className="btn-press" style={styles.finishBtn} onClick={handleFinish}>
              🌟 Fim da História
            </button>
          )}
        </div>
      </div>

      {/* Show choices summary */}
      <div style={styles.choicesSummary}>
        {choices.map((c, i) => (
          <span key={i} style={styles.summaryTag}>{c.emoji}</span>
        ))}
      </div>
    </ActivityShell>
  )
}

const styles = {
  stepDots: {
    display: 'flex', justifyContent: 'center', gap: 'var(--space-xs)', flexWrap: 'wrap',
  },
  dot: {
    padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'white',
    transition: 'all var(--transition-speed)',
  },
  optionsList: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' },
  optionBtn: {
    width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-md)',
    padding: 'var(--space-lg)', backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)', borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)', fontWeight: 600, cursor: 'pointer',
    textAlign: 'left', transition: 'all var(--transition-speed)', minHeight: '48px',
  },
  optionEmoji: { fontSize: '2rem', flexShrink: 0 },
  optionText: { flex: 1 },
  choicesSoFar: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)',
    padding: 'var(--space-md)', backgroundColor: '#EFEBE9', borderRadius: 'var(--radius-md)',
  },
  choicesLabel: { fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-secondary)' },
  choiceTag: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', padding: 'var(--space-xs) 0' },
  narrationCard: {
    display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)',
    padding: 'var(--space-xl)', backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-lg)', border: '2px solid #FFD54F',
  },
  narrationHeader: { display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', justifyContent: 'center' },
  narrationEmoji: { fontSize: '2rem' },
  narrationTitle: { fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-campo7)' },
  narrationText: {
    fontSize: 'var(--font-size-lg)', fontWeight: 600, lineHeight: 1.8,
    color: 'var(--color-text)', textAlign: 'center',
  },
  listenBtn: {
    alignSelf: 'center', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)',
    padding: 'var(--space-sm) var(--space-md)', backgroundColor: 'transparent',
    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-secondary)',
    cursor: 'pointer', minHeight: '44px',
  },
  narrationFooter: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  narrationCount: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', fontWeight: 600 },
  nextNarrationBtn: {
    padding: 'var(--space-sm) var(--space-lg)', backgroundColor: 'var(--color-campo7)',
    color: 'white', borderRadius: 'var(--radius-md)', border: 'none',
    fontWeight: 700, fontSize: 'var(--font-size-base)', cursor: 'pointer', minHeight: '44px',
  },
  finishBtn: {
    padding: 'var(--space-md) var(--space-xl)', backgroundColor: 'var(--color-campo7)',
    color: 'white', borderRadius: 'var(--radius-md)', border: 'none',
    fontWeight: 700, fontSize: 'var(--font-size-lg)', cursor: 'pointer', minHeight: '48px',
  },
  choicesSummary: {
    display: 'flex', justifyContent: 'center', gap: 'var(--space-md)',
  },
  summaryTag: { fontSize: '2rem' },
}
