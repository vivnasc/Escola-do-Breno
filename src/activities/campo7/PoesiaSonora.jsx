import { useState, useCallback, useEffect } from 'react'
import ActivityShell from '../../components/ActivityShell'
import CompletionCelebration from '../../components/CompletionCelebration'
import { useTTS } from '../../hooks/useTTS'

const POEMS = [
  {
    id: 'rain',
    title: 'A Chuva Canta',
    lines: [
      { text: 'A chuva canta na janela,', pause: false },
      { text: 'pim, pim, pim, que som tão bom.', pause: false },
      { text: 'Cada gota é uma estrela', pause: false },
      { text: 'que dança ao som do trovão.', pause: true },
      { text: 'O vento sopra de mansinho,', pause: false },
      { text: 'as folhas rodopiam no chão.', pause: false },
      { text: 'E eu, quentinho no cantinho,', pause: false },
      { text: 'ouço a chuva a cantar a canção.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "janela"?',
      options: [
        { text: 'Estrela', correct: true },
        { text: 'Nuvem', correct: false },
        { text: 'Porta', correct: false },
      ],
    },
  },
  {
    id: 'sun',
    title: 'O Sol Acordou',
    lines: [
      { text: 'O sol acordou cedinho,', pause: false },
      { text: 'pintou o céu de amarelo.', pause: false },
      { text: 'Disse bom dia ao passarinho', pause: false },
      { text: 'e fez brilhar o castelo.', pause: true },
      { text: 'As flores abriram os olhos,', pause: false },
      { text: 'as abelhas saíram a voar.', pause: false },
      { text: 'O mundo encheu-se de orgulhos', pause: false },
      { text: 'e tudo começou a brilhar.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "cedinho"?',
      options: [
        { text: 'Passarinho', correct: true },
        { text: 'Gato', correct: false },
        { text: 'Árvore', correct: false },
      ],
    },
  },
  {
    id: 'sea',
    title: 'O Mar de Dentro',
    lines: [
      { text: 'Dentro de mim há um mar', pause: false },
      { text: 'com ondas de emoção.', pause: false },
      { text: 'Às vezes calmo a brilhar,', pause: false },
      { text: 'às vezes tempestade no coração.', pause: true },
      { text: 'Mas mesmo quando a onda é forte,', pause: false },
      { text: 'eu sei que vai passar.', pause: false },
      { text: 'Porque depois de qualquer sorte,', pause: false },
      { text: 'o mar volta a acalmar.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "mar"?',
      options: [
        { text: 'Acalmar', correct: true },
        { text: 'Nadar', correct: false },
        { text: 'Correr', correct: false },
      ],
    },
  },
  {
    id: 'cat',
    title: 'O Gato Misterioso',
    lines: [
      { text: 'Aparece um gatinho', pause: false },
      { text: 'quando a lua vem brilhar.', pause: false },
      { text: 'Caminha pelo caminho', pause: false },
      { text: 'sem pressa de chegar.', pause: true },
      { text: 'Os olhos como a lua,', pause: false },
      { text: 'dois faróis na escuridão.', pause: false },
      { text: 'Atravessa toda a rua', pause: false },
      { text: 'e entra no meu coração.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "gatinho"?',
      options: [
        { text: 'Caminho', correct: true },
        { text: 'Noite', correct: false },
        { text: 'Gato', correct: false },
      ],
    },
  },
  {
    id: 'colors',
    title: 'As Cores do Mundo',
    lines: [
      { text: 'O azul é calma no coração,', pause: false },
      { text: 'o vermelho é ser valente.', pause: false },
      { text: 'O verde é ter emoção', pause: false },
      { text: 'de esperança que se sente.', pause: true },
      { text: 'Amarelo é para sentir', pause: false },
      { text: 'a alegria de um novo dia.', pause: false },
      { text: 'Todas as cores fazem sorrir', pause: false },
      { text: 'e enchem a vida de magia.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "coração"?',
      options: [
        { text: 'Emoção', correct: true },
        { text: 'Azul', correct: false },
        { text: 'Pintura', correct: false },
      ],
    },
  },
  {
    id: 'wind',
    title: 'O Vento Brincalhão',
    lines: [
      { text: 'O vento levou o chapéu', pause: false },
      { text: 'e fez as folhas voar.', pause: false },
      { text: 'Soprou até lá no céu', pause: false },
      { text: 'e voltou para brincar.', pause: true },
      { text: 'Bagunçou todo o jardim,', pause: false },
      { text: 'fez a roupa rodopiar.', pause: false },
      { text: 'Disse adeus, mas no fim', pause: false },
      { text: 'prometeu sempre voltar.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "chapéu"?',
      options: [
        { text: 'Céu', correct: true },
        { text: 'Folha', correct: false },
        { text: 'Vento', correct: false },
      ],
    },
  },
  {
    id: 'stars',
    title: 'A Noite e as Estrelas',
    lines: [
      { text: 'A noite vem, tão escura,', pause: false },
      { text: 'mas não preciso ter medo.', pause: false },
      { text: 'Cada estrela é ternura,', pause: false },
      { text: 'um brilho que é segredo.', pause: true },
      { text: 'Mil estrelas a brilhar', pause: false },
      { text: 'como luzes no algodão.', pause: false },
      { text: 'Cada uma guarda um sonhar,', pause: false },
      { text: 'um desejo do coração.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "brilhar"?',
      options: [
        { text: 'Sonhar', correct: true },
        { text: 'Estrela', correct: false },
        { text: 'Noite', correct: false },
      ],
    },
  },
  {
    id: 'hug',
    title: 'O Abraço',
    lines: [
      { text: 'Um abraço é um espaço', pause: false },
      { text: 'onde tudo fica bem.', pause: false },
      { text: 'Não precisa de um laço,', pause: false },
      { text: 'só de alguém que nos tem.', pause: true },
      { text: 'Abraço é ter calor', pause: false },
      { text: 'quando o dia está a acabar.', pause: false },
      { text: 'Abraço é puro amor', pause: false },
      { text: 'que nos ensina a amar.', pause: true },
    ],
    rhymeChallenge: {
      prompt: 'Que palavra rima com "abraço"?',
      options: [
        { text: 'Espaço', correct: true },
        { text: 'Carinho', correct: false },
        { text: 'Forte', correct: false },
      ],
    },
  },
]

export default function PoesiaSonora({
  registerClick,
  registerSuccess,
  completeActivity,
  updateCampoProgress,
  adaptive,
}) {
  const { speak } = useTTS()
  const [poemIdx, setPoemIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(-1) // -1 = title screen
  const [showRhyme, setShowRhyme] = useState(false)
  const [rhymeAnswered, setRhymeAnswered] = useState(false)
  const [rhymeFeedback, setRhymeFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const poem = POEMS[poemIdx]
  const isLastPoem = poemIdx >= POEMS.length - 1
  const allLinesShown = lineIdx >= poem.lines.length - 1

  // Speak line when it appears
  useEffect(() => {
    if (lineIdx >= 0 && lineIdx < poem.lines.length) {
      speak(poem.lines[lineIdx].text, { auto: true })
    }
  }, [lineIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartPoem = useCallback(() => {
    registerClick()
    setLineIdx(0)
    speak(poem.title, { auto: true })
  }, [registerClick, poem.title, speak])

  const handleNextLine = useCallback(() => {
    registerClick()
    if (lineIdx + 1 < poem.lines.length) {
      setLineIdx(lineIdx + 1)
    } else {
      setShowRhyme(true)
      speak(poem.rhymeChallenge.prompt, { auto: true })
    }
  }, [lineIdx, poem, registerClick, speak])

  const handleRhymeAnswer = useCallback((option) => {
    registerClick()
    setRhymeAnswered(true)
    if (option.correct) {
      registerSuccess()
      setScore((s) => s + 1)
      setRhymeFeedback('Muito bem! Boa rima!')
      speak('Muito bem! Boa rima!', { auto: true })
    } else {
      const correct = poem.rhymeChallenge.options.find((o) => o.correct)
      setRhymeFeedback(`A rima certa era: ${correct.text}`)
      speak(`A rima certa era: ${correct.text}`, { auto: true })
    }
  }, [registerClick, registerSuccess, poem, speak])

  const handleNextPoem = useCallback(() => {
    updateCampoProgress('campo7', poemIdx + 1)
    if (isLastPoem) {
      const stars = score >= 3 ? 3 : score >= 2 ? 2 : 1
      completeActivity('poesia-sonora', stars)
      setIsComplete(true)
    } else {
      setPoemIdx(poemIdx + 1)
      setLineIdx(-1)
      setShowRhyme(false)
      setRhymeAnswered(false)
      setRhymeFeedback(null)
    }
  }, [poemIdx, isLastPoem, score, completeActivity, updateCampoProgress])

  if (isComplete) {
    return (
      <ActivityShell title="Poesia Sonora" backPath="/campo/7" color="var(--color-campo7)">
        <CompletionCelebration
          emoji="🎙️"
          title="Que poeta fantástico!"
          stars={score >= 3 ? 3 : score >= 2 ? 2 : 1}
          color="var(--color-campo7)"
        />
      </ActivityShell>
    )
  }

  return (
    <ActivityShell
      title="Poesia Sonora"
      instruction={lineIdx < 0 ? 'Ouve o poema, verso a verso.' : null}
      backPath="/campo/7"
      color="var(--color-campo7)"
      score={poemIdx + 1}
      total={POEMS.length}
      textLevel={adaptive?.textLevel}
    >
      {/* Title screen */}
      {lineIdx < 0 && (
        <div style={styles.titleCard}>
          <span style={styles.poemIcon}>🎙️</span>
          <h2 style={styles.poemTitle}>{poem.title}</h2>
          <p style={styles.poemHint}>Poema {poemIdx + 1} de {POEMS.length}</p>
          <button className="btn-press" style={styles.startBtn} onClick={handleStartPoem}>
            Ouvir o Poema
          </button>
        </div>
      )}

      {/* Lines */}
      {lineIdx >= 0 && !showRhyme && (
        <div style={styles.poemCard}>
          <h3 style={styles.poemCardTitle}>{poem.title}</h3>
          <div style={styles.linesContainer}>
            {poem.lines.slice(0, lineIdx + 1).map((line, i) => (
              <p
                key={i}
                style={{
                  ...styles.line,
                  opacity: i === lineIdx ? 1 : 0.6,
                  fontSize: i === lineIdx ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                }}
              >
                {line.text}
              </p>
            ))}
          </div>
          <button className="btn-press" style={styles.nextLineBtn} onClick={handleNextLine}>
            {allLinesShown ? 'Desafio da Rima →' : 'Próximo verso →'}
          </button>
        </div>
      )}

      {/* Rhyme challenge */}
      {showRhyme && (
        <div style={styles.rhymeCard} className="animate-fade-in">
          <p style={styles.rhymePrompt}>{poem.rhymeChallenge.prompt}</p>
          {!rhymeAnswered && (
            <div style={styles.rhymeOptions}>
              {poem.rhymeChallenge.options.map((opt, i) => (
                <button
                  key={i}
                  className="btn-press"
                  style={styles.rhymeBtn}
                  onClick={() => handleRhymeAnswer(opt)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          )}
          {rhymeFeedback && (
            <>
              <p style={styles.rhymeFeedback}>{rhymeFeedback}</p>
              <button className="btn-press" style={styles.nextPoemBtn} onClick={handleNextPoem}>
                {isLastPoem ? '🌟 Concluir' : 'Próximo poema →'}
              </button>
            </>
          )}
        </div>
      )}
    </ActivityShell>
  )
}

const styles = {
  titleCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
    padding: 'var(--space-2xl)',
    backgroundColor: '#EFEBE9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo7)',
  },
  poemIcon: { fontSize: '3rem' },
  poemTitle: { fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  poemHint: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' },
  startBtn: {
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-campo7)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontWeight: 700,
    fontSize: 'var(--font-size-lg)',
    cursor: 'pointer',
    minHeight: '48px',
  },
  poemCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid #FFD54F',
  },
  poemCardTitle: { fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  linesContainer: { display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)', padding: 'var(--space-md) 0' },
  line: {
    fontWeight: 600,
    color: 'var(--color-text)',
    lineHeight: 1.8,
    textAlign: 'center',
    fontStyle: 'italic',
    transition: 'all 0.4s ease',
  },
  nextLineBtn: {
    alignSelf: 'center',
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-campo7)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    cursor: 'pointer',
    minHeight: '44px',
  },
  rhymeCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-campo7)',
  },
  rhymePrompt: { fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-campo7)', textAlign: 'center' },
  rhymeOptions: { display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' },
  rhymeBtn: {
    padding: 'var(--space-md) var(--space-lg)',
    backgroundColor: 'var(--color-bg)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'center',
    minHeight: '48px',
  },
  rhymeFeedback: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    color: '#2E7D32',
    textAlign: 'center',
    padding: 'var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-sm)',
  },
  nextPoemBtn: {
    alignSelf: 'center',
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-campo7)',
    color: 'white',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    cursor: 'pointer',
    minHeight: '44px',
  },
}
