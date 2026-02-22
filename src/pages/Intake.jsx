import { useState, useMemo } from 'react'
import { AVATARS } from '../hooks/useProfile'
import { UNIVERSES } from '../data/universes'
import { TEAMS, PLAYERS } from '../data/vocabulary'
import { DIAGNOSTIC_QUESTIONS, calculateStartingLevels, MASTERY_LEVELS, levelToId } from '../data/competencies'
import { BRENO_PROFILE } from '../data/brenoProfile'

const LEARNING_AREAS = [
  { id: 'reading', emoji: '📖', label: 'Leitura' },
  { id: 'writing', emoji: '✏️', label: 'Escrita' },
  { id: 'math', emoji: '🔢', label: 'Matemática' },
  { id: 'attention', emoji: '🎯', label: 'Atenção / Concentração' },
  { id: 'social', emoji: '🤝', label: 'Competências sociais' },
  { id: 'emotional-regulation', emoji: '🧘', label: 'Regulação emocional' },
  { id: 'speech', emoji: '💬', label: 'Fala / Linguagem' },
  { id: 'comprehension', emoji: '🧠', label: 'Compreensão' },
  { id: 'motor-fine', emoji: '✍️', label: 'Motricidade fina' },
  { id: 'motor-gross', emoji: '🏃', label: 'Motricidade grossa' },
]

const GOALS = [
  { id: 'language-pt', emoji: '🇵🇹', label: 'Português (leitura e escrita)' },
  { id: 'language-en', emoji: '🇬🇧', label: 'Inglês (vocabulário)' },
  { id: 'math', emoji: '🔢', label: 'Matemática' },
  { id: 'social-skills', emoji: '🤝', label: 'Competências sociais' },
  { id: 'emotional-regulation', emoji: '🧘', label: 'Regulação emocional' },
  { id: 'daily-living', emoji: '🏠', label: 'Autonomia / Vida diária' },
  { id: 'reading', emoji: '📖', label: 'Leitura' },
  { id: 'writing', emoji: '✏️', label: 'Escrita' },
  { id: 'attention-focus', emoji: '🎯', label: 'Atenção e foco' },
  { id: 'communication', emoji: '💬', label: 'Comunicação' },
]

export default function Intake({ onComplete }) {
  const [step, setStep] = useState(0)

  // Identity
  const [filledBy, setFilledBy] = useState(null)
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [avatar, setAvatar] = useState('star')

  // Founder profile — silently pre-fill via ?fundador URL param
  const [founderLoaded, setFounderLoaded] = useState(false)
  const [subscriptionTier, setSubscriptionTier] = useState('free')

  // Universe (not just football!)
  const [universe, setUniverse] = useState(null)
  const [team, setTeam] = useState(null)
  const [player, setPlayer] = useState(null)

  // Learning needs
  const [areas, setAreas] = useState([])
  const [readingLevel, setReadingLevel] = useState('beginning')
  const [supportLevel, setSupportLevel] = useState('some')

  // Sensory needs
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundVolume, setSoundVolume] = useState('normal')
  const [animationLevel, setAnimationLevel] = useState('normal')
  const [visualContrast, setVisualContrast] = useState('normal')
  const [fontSize, setFontSize] = useState('normal')
  const [reducedClutter, setReducedClutter] = useState(false)
  const [timePressure, setTimePressure] = useState(true)

  // Attention & session
  const [sessionLength, setSessionLength] = useState(15)
  const [breakReminder, setBreakReminder] = useState(true)
  const [frustrationSensitivity, setFrustrationSensitivity] = useState('moderate')

  // Goals
  const [goals, setGoals] = useState([])

  // Communication
  const [usesVisualSupports, setUsesVisualSupports] = useState(false)
  const [prefersSimpleLanguage, setPrefersSimpleLanguage] = useState(false)
  const [needsAudioInstructions, setNeedsAudioInstructions] = useState(true)

  const handleNameChange = (newName) => {
    setName(newName)
  }

  const loadFounderProfile = () => {
    const bp = BRENO_PROFILE
    setName(bp.name)
    setAge(bp.age)
    setAvatar(bp.avatar)
    setUniverse(bp.universe)
    setTeam(bp.favoriteTeam)
    setPlayer(bp.favoritePlayer)
    setAreas(bp.learningNeeds.areas)
    setReadingLevel(bp.learningNeeds.readingLevel)
    setSupportLevel(bp.learningNeeds.supportLevel)
    setSoundEnabled(bp.sensory.soundEnabled)
    setSoundVolume(bp.sensory.soundVolume)
    setAnimationLevel(bp.sensory.animationLevel)
    setVisualContrast(bp.sensory.visualContrast)
    setFontSize(bp.sensory.fontSize)
    setReducedClutter(bp.sensory.reducedClutter)
    setTimePressure(bp.sensory.timePressure)
    setSessionLength(bp.attention.sessionLength)
    setBreakReminder(bp.attention.breakReminder)
    setFrustrationSensitivity(bp.attention.frustrationSensitivity)
    setGoals(bp.goals)
    setUsesVisualSupports(bp.communication.usesVisualSupports)
    setPrefersSimpleLanguage(bp.communication.prefersSimpleLanguage)
    setNeedsAudioInstructions(bp.communication.needsAudioInstructions)
    setSubscriptionTier(bp.subscriptionTier)
    setFounderLoaded(true)
  }

  // Auto-load founder profile when ?fundador param is present
  useState(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('fundador') && !founderLoaded) {
      loadFounderProfile()
      setFilledBy('parent')
    }
  })

  // Diagnostic placement test
  const [diagnosticCampo, setDiagnosticCampo] = useState(0) // 0-3 for the 4 campos
  const [diagnosticQ, setDiagnosticQ] = useState(0)          // 0-2 for 3 questions per campo
  const [diagnosticResults, setDiagnosticResults] = useState({
    campo1: [null, null, null],
    campo2: [null, null, null],
    campo3: [null, null, null],
    campo4: [null, null, null],
  })
  const [diagnosticDone, setDiagnosticDone] = useState(false)

  // Calculate levels from diagnostic results
  const detectedLevels = useMemo(() => {
    if (!diagnosticDone) return null
    return calculateStartingLevels(diagnosticResults, { age, readingLevel, supportLevel })
  }, [diagnosticDone, diagnosticResults, age, readingLevel, supportLevel])

  const totalSteps = 10

  const handleNext = () => step < totalSteps - 1 && setStep(step + 1)
  const handleBack = () => step > 0 && setStep(step - 1)

  const toggleList = (list, setList, id) => {
    setList(list.includes(id) ? list.filter((i) => i !== id) : [...list, id])
  }

  const handleFinish = () => {
    const competencyLevels = detectedLevels || { campo1: 1, campo2: 1, campo3: 1, campo4: 1 }
    const profileData = {
      name: name.trim() || 'Jogador',
      age,
      avatar,
      filledBy: filledBy || 'parent',
      universe: universe || 'football',
      favoriteTeam: universe === 'football' ? team : null,
      favoritePlayer: universe === 'football' ? player : null,
      learningNeeds: { areas, readingLevel, supportLevel },
      sensory: {
        soundEnabled, soundVolume, animationLevel, visualContrast,
        fontSize, reducedClutter, timePressure,
      },
      attention: {
        sessionLength,
        breakReminder,
        breakInterval: Math.max(5, sessionLength - 5),
        frustrationSensitivity,
      },
      goals,
      competencyLevels,
      communication: {
        usesVisualSupports,
        prefersSimpleLanguage,
        needsAudioInstructions,
      },
    }
    // Founder profile always has full access
    if (subscriptionTier !== 'free') {
      profileData.subscriptionTier = subscriptionTier
    }
    onComplete(profileData)
  }

  const canAdvance = () => {
    if (step === 0) return !!filledBy
    if (step === 1) return !!name.trim()
    if (step === 8) return diagnosticDone
    return true
  }

  return (
    <div style={styles.container}>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((step + 1) / totalSteps) * 100}%` }} />
      </div>
      <div style={styles.stepIndicator}>
        {step + 1} / {totalSteps}
      </div>

      <div style={styles.content} className="animate-fade-in" key={step}>

        {/* STEP 0: Who is filling this in? */}
        {step === 0 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>👋</span>
            <h1 style={styles.title}>Bem-vindo ao PITCH!</h1>
            <p style={styles.desc}>
              Antes de começar, queremos conhecer melhor a criança para adaptar a experiência.
            </p>
            <p style={styles.label}>Quem está a preencher?</p>
            <div style={styles.grid2}>
              {[
                { id: 'parent', icon: '👨‍👩‍👦', label: 'Mãe / Pai' },
                { id: 'therapist', icon: '🧑‍⚕️', label: 'Terapeuta' },
                { id: 'teacher', icon: '🧑‍🏫', label: 'Professor(a)' },
                { id: 'self', icon: '🧒', label: 'Eu próprio!' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  style={{ ...styles.optionBtn, ...(filledBy === opt.id ? styles.optionBtnActive : {}) }}
                  onClick={() => setFilledBy(opt.id)}
                >
                  <span style={styles.optionEmoji}>{opt.icon}</span>
                  <span style={styles.optionLabel}>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Name & Age */}
        {step === 1 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>🌟</span>
            <h1 style={styles.title}>
              {filledBy === 'self' ? 'Como te chamas?' : 'Como se chama a criança?'}
            </h1>
            <input
              style={styles.input}
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder={filledBy === 'self' ? 'O teu nome...' : 'Nome da criança...'}
              autoFocus
              maxLength={30}
            />

            {founderLoaded && (
              <div style={styles.founderLoaded}>
                Perfil pré-configurado carregado — podes rever tudo nos passos seguintes.
              </div>
            )}

            <p style={styles.label}>Idade</p>
            <div style={styles.ageGrid}>
              {[6, 7, 8, 9, 10, 11, 12, 13, 14].map((a) => (
                <button
                  key={a}
                  style={{ ...styles.ageBtn, ...(age === a ? styles.ageBtnActive : {}) }}
                  onClick={() => setAge(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Universe — the theme that makes them WANT to learn */}
        {step === 2 && (
          <div style={styles.stepContent}>
            <h1 style={styles.title}>
              O que {filledBy === 'self' ? 'te' : ''} fascina mais?
            </h1>
            <p style={styles.desc}>
              Toda a experiência vai ser construída à volta deste mundo.
              {filledBy !== 'self' && ' Escolha o interesse mais intenso da criança.'}
            </p>
            <div style={styles.universeGrid}>
              {UNIVERSES.map((u) => (
                <button
                  key={u.id}
                  style={{
                    ...styles.universeBtn,
                    ...(universe === u.id ? { ...styles.universeBtnActive, borderColor: u.color } : {}),
                  }}
                  onClick={() => setUniverse(u.id)}
                >
                  <span style={styles.universeIcon}>{u.icon}</span>
                  <span style={styles.universeName}>{u.name}</span>
                  <span style={styles.universeDesc}>{u.description}</span>
                </button>
              ))}
            </div>
            {universe === 'football' && (
              <>
                <p style={styles.label}>Equipa favorita</p>
                <div style={styles.teamGrid}>
                  {TEAMS.map((t) => (
                    <button
                      key={t.name}
                      style={{ ...styles.smallBtn, ...(team === t.name ? styles.smallBtnActive : {}) }}
                      onClick={() => setTeam(t.name)}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
                <p style={styles.label}>Jogador favorito</p>
                <div style={styles.teamGrid}>
                  {PLAYERS.map((p) => (
                    <button
                      key={p.name}
                      style={{ ...styles.smallBtn, ...(player === p.name ? styles.smallBtnActive : {}) }}
                      onClick={() => setPlayer(p.name)}
                    >
                      {p.number} {p.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3: Learning Needs — where does the child need support? */}
        {step === 3 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>💪</span>
            <h1 style={styles.title}>Áreas onde precisa de apoio</h1>
            <p style={styles.desc}>
              {filledBy === 'self'
                ? 'O que achas mais difícil? (podes escolher vários)'
                : 'Seleccione as áreas onde a criança tem mais dificuldade. Isto adapta o nível de todas as actividades.'}
            </p>
            <div style={styles.needsGrid}>
              {LEARNING_AREAS.map((area) => (
                <button
                  key={area.id}
                  style={{
                    ...styles.needBtn,
                    ...(areas.includes(area.id) ? styles.needBtnActive : {}),
                  }}
                  onClick={() => toggleList(areas, setAreas, area.id)}
                >
                  <span style={styles.needEmoji}>{area.emoji}</span>
                  <span style={styles.needLabel}>{area.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Reading level & support needs */}
        {step === 4 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>📖</span>
            <h1 style={styles.title}>Nível de leitura e apoio</h1>

            <p style={styles.label}>Nível de leitura</p>
            <div style={styles.grid3}>
              {[
                { id: 'pre-reader', label: 'Pré-leitor', desc: 'Ainda não lê; usa imagens' },
                { id: 'beginning', label: 'A começar', desc: 'Lê palavras simples' },
                { id: 'fluent', label: 'Leitor fluente', desc: 'Lê frases e textos' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  style={{ ...styles.levelBtn, ...(readingLevel === opt.id ? styles.levelBtnActive : {}) }}
                  onClick={() => setReadingLevel(opt.id)}
                >
                  <span style={styles.levelLabel}>{opt.label}</span>
                  <span style={styles.levelDesc}>{opt.desc}</span>
                </button>
              ))}
            </div>

            <p style={styles.label}>Nível de apoio necessário</p>
            <div style={styles.grid3}>
              {[
                { id: 'independent', label: 'Independente', desc: 'Faz sozinho(a)' },
                { id: 'some', label: 'Algum apoio', desc: 'Precisa de pistas' },
                { id: 'full', label: 'Apoio total', desc: 'Precisa de ajuda constante' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  style={{ ...styles.levelBtn, ...(supportLevel === opt.id ? styles.levelBtnActive : {}) }}
                  onClick={() => setSupportLevel(opt.id)}
                >
                  <span style={styles.levelLabel}>{opt.label}</span>
                  <span style={styles.levelDesc}>{opt.desc}</span>
                </button>
              ))}
            </div>

            <p style={styles.label}>Comunicação</p>
            <div style={styles.checkList}>
              <CheckItem
                checked={usesVisualSupports}
                onChange={setUsesVisualSupports}
                label="Usa suportes visuais (mais imagens, menos texto)"
              />
              <CheckItem
                checked={prefersSimpleLanguage}
                onChange={setPrefersSimpleLanguage}
                label="Prefere linguagem simples e directa"
              />
              <CheckItem
                checked={needsAudioInstructions}
                onChange={setNeedsAudioInstructions}
                label="Precisa de instruções em áudio"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Sensory needs */}
        {step === 5 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>🎨</span>
            <h1 style={styles.title}>Necessidades sensoriais</h1>
            <p style={styles.desc}>
              {filledBy === 'self'
                ? 'Como preferes que o ecrã seja?'
                : 'Adapte a experiência sensorial ao perfil da criança.'}
            </p>

            <SensoryRow label="Som">
              <ToggleBtn active={soundEnabled} onClick={() => setSoundEnabled(true)} text="🔊 Com som" />
              <ToggleBtn active={!soundEnabled} onClick={() => setSoundEnabled(false)} text="🔇 Sem som" />
            </SensoryRow>

            {soundEnabled && (
              <SensoryRow label="Volume">
                <ToggleBtn active={soundVolume === 'quiet'} onClick={() => setSoundVolume('quiet')} text="🤫 Baixo" />
                <ToggleBtn active={soundVolume === 'normal'} onClick={() => setSoundVolume('normal')} text="🔊 Normal" />
              </SensoryRow>
            )}

            <SensoryRow label="Animações">
              <ToggleBtn active={animationLevel === 'minimal'} onClick={() => setAnimationLevel('minimal')} text="🧘 Mínimas" />
              <ToggleBtn active={animationLevel === 'normal'} onClick={() => setAnimationLevel('normal')} text="✨ Normal" />
            </SensoryRow>

            <SensoryRow label="Contraste visual">
              <ToggleBtn active={visualContrast === 'normal'} onClick={() => setVisualContrast('normal')} text="Normal" />
              <ToggleBtn active={visualContrast === 'high'} onClick={() => setVisualContrast('high')} text="Alto contraste" />
            </SensoryRow>

            <SensoryRow label="Tamanho do texto">
              <ToggleBtn active={fontSize === 'normal'} onClick={() => setFontSize('normal')} text="Aa" />
              <ToggleBtn active={fontSize === 'large'} onClick={() => setFontSize('large')} text="Aa+" />
              <ToggleBtn active={fontSize === 'extra-large'} onClick={() => setFontSize('extra-large')} text="Aa++" />
            </SensoryRow>

            <div style={styles.checkList}>
              <CheckItem
                checked={reducedClutter}
                onChange={setReducedClutter}
                label="Ecrã simplificado (menos opções por vez)"
              />
              <CheckItem
                checked={!timePressure}
                onChange={(v) => setTimePressure(!v)}
                label="Sem pressão de tempo (sem cronómetros)"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Attention & session management */}
        {step === 6 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>⏱️</span>
            <h1 style={styles.title}>Atenção e sessões</h1>
            <p style={styles.desc}>
              {filledBy === 'self'
                ? 'Quanto tempo gostas de jogar de cada vez?'
                : 'Configure o tempo de sessão e pausas para evitar fadiga.'}
            </p>

            <p style={styles.label}>Duração da sessão</p>
            <div style={styles.sessionGrid}>
              {[5, 10, 15, 20, 30].map((m) => (
                <button
                  key={m}
                  style={{ ...styles.sessionBtn, ...(sessionLength === m ? styles.sessionBtnActive : {}) }}
                  onClick={() => setSessionLength(m)}
                >
                  <span style={styles.sessionNum}>{m}</span>
                  <span style={styles.sessionUnit}>min</span>
                </button>
              ))}
            </div>

            <div style={styles.checkList}>
              <CheckItem
                checked={breakReminder}
                onChange={setBreakReminder}
                label="Lembrete para fazer pausa"
              />
            </div>

            <p style={styles.label}>Sensibilidade à frustração</p>
            <p style={styles.smallDesc}>
              Quando detectamos sinais de frustração, abrimos o "Banco da Calma" para ajudar.
            </p>
            <div style={styles.grid3}>
              {[
                { id: 'sensitive', label: 'Muito sensível', desc: 'Activa rapidamente' },
                { id: 'moderate', label: 'Moderado', desc: 'Equilibrado' },
                { id: 'resilient', label: 'Resiliente', desc: 'Só em situações extremas' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  style={{ ...styles.levelBtn, ...(frustrationSensitivity === opt.id ? styles.levelBtnActive : {}) }}
                  onClick={() => setFrustrationSensitivity(opt.id)}
                >
                  <span style={styles.levelLabel}>{opt.label}</span>
                  <span style={styles.levelDesc}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Therapeutic / learning goals */}
        {step === 7 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>🎯</span>
            <h1 style={styles.title}>Objectivos de aprendizagem</h1>
            <p style={styles.desc}>
              {filledBy === 'self'
                ? 'O que queres aprender mais?'
                : 'Que áreas quer priorizar? As actividades recomendadas vão reflectir estas escolhas.'}
            </p>
            <div style={styles.needsGrid}>
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  style={{
                    ...styles.needBtn,
                    ...(goals.includes(goal.id) ? styles.needBtnActive : {}),
                  }}
                  onClick={() => toggleList(goals, setGoals, goal.id)}
                >
                  <span style={styles.needEmoji}>{goal.emoji}</span>
                  <span style={styles.needLabel}>{goal.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 8: Diagnostic placement test */}
        {step === 8 && (
          <DiagnosticStep
            filledBy={filledBy}
            diagnosticCampo={diagnosticCampo}
            diagnosticQ={diagnosticQ}
            diagnosticResults={diagnosticResults}
            diagnosticDone={diagnosticDone}
            detectedLevels={detectedLevels}
            onAnswer={(campoId, qIdx, correct) => {
              setDiagnosticResults((prev) => {
                const copy = { ...prev }
                copy[campoId] = [...copy[campoId]]
                copy[campoId][qIdx] = correct
                return copy
              })
              // Advance to next question or next campo
              const campoIds = ['campo1', 'campo2', 'campo3', 'campo4']
              if (qIdx < 2) {
                setDiagnosticQ(qIdx + 1)
              } else if (diagnosticCampo < 3) {
                setDiagnosticCampo(diagnosticCampo + 1)
                setDiagnosticQ(0)
              } else {
                setDiagnosticDone(true)
              }
            }}
            onSkipAll={() => setDiagnosticDone(true)}
          />
        )}

        {/* STEP 9: Avatar + Ready */}
        {step === 9 && (
          <div style={styles.stepContent}>
            <h1 style={styles.title}>Escolhe o teu avatar</h1>
            <div style={styles.avatarGrid}>
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  style={{ ...styles.avatarBtn, ...(avatar === a.id ? styles.avatarBtnActive : {}) }}
                  onClick={() => setAvatar(a.id)}
                >
                  <span style={styles.avatarEmoji}>{a.emoji}</span>
                  <span style={styles.avatarLabel}>{a.label}</span>
                </button>
              ))}
            </div>

            <div style={styles.readyBox}>
              <span style={styles.readyEmoji}>
                {UNIVERSES.find(u => u.id === universe)?.icon || '🌟'}
              </span>
              <p style={styles.readyText}>
                Tudo pronto, {name || 'jogador'}!
              </p>
              <p style={styles.readySubtext}>
                A experiência está adaptada às tuas necessidades. Podes sempre ajustar nas definições.
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        {step > 0 && (
          <button style={styles.backBtn} onClick={handleBack}>← Voltar</button>
        )}
        <div style={{ flex: 1 }} />
        {step < totalSteps - 1 ? (
          <button
            style={{ ...styles.nextBtn, ...(!canAdvance() ? styles.nextBtnDisabled : {}) }}
            onClick={handleNext}
            disabled={!canAdvance()}
          >
            Seguinte →
          </button>
        ) : (
          <button style={styles.startBtn} onClick={handleFinish}>
            Começar!
          </button>
        )}
      </div>
    </div>
  )
}

// Reusable components for the intake form
function SensoryRow({ label, children }) {
  return (
    <div style={styles.sensoryRow}>
      <p style={styles.sensoryLabel}>{label}</p>
      <div style={styles.sensoryOptions}>{children}</div>
    </div>
  )
}

function ToggleBtn({ active, onClick, text }) {
  return (
    <button
      style={{ ...styles.toggleBtn, ...(active ? styles.toggleBtnActive : {}) }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

function CheckItem({ checked, onChange, label }) {
  return (
    <button
      style={{ ...styles.checkItem, ...(checked ? styles.checkItemActive : {}) }}
      onClick={() => onChange(!checked)}
    >
      <span style={styles.checkBox}>{checked ? '✓' : ''}</span>
      <span>{label}</span>
    </button>
  )
}

const CAMPO_LABELS = [
  { id: 'campo1', name: 'Linguagem', icon: '🗣️', color: '#1565C0' },
  { id: 'campo2', name: 'Matemática', icon: '🔢', color: '#E65100' },
  { id: 'campo3', name: 'Descoberta', icon: '🌍', color: '#2E7D32' },
  { id: 'campo4', name: 'Autonomia', icon: '🤝', color: '#6A1B9A' },
]

function DiagnosticStep({
  filledBy,
  diagnosticCampo,
  diagnosticQ,
  diagnosticResults,
  diagnosticDone,
  detectedLevels,
  onAnswer,
  onSkipAll,
}) {
  const campoIds = ['campo1', 'campo2', 'campo3', 'campo4']

  if (diagnosticDone && detectedLevels) {
    return (
      <div style={styles.stepContent}>
        <span style={styles.bigEmoji}>🎯</span>
        <h1 style={styles.title}>Níveis detectados!</h1>
        <p style={styles.desc}>
          Com base nas respostas, detectámos o nível inicial para cada área.
          Isto pode ser ajustado a qualquer momento nas definições.
        </p>
        <div style={dStyles.resultsGrid}>
          {CAMPO_LABELS.map((campo) => {
            const level = detectedLevels[campo.id] || 1
            const ml = MASTERY_LEVELS[level - 1]
            return (
              <div key={campo.id} style={dStyles.resultCard}>
                <div style={dStyles.resultHeader}>
                  <span>{campo.icon} {campo.name}</span>
                  <span style={{ ...dStyles.resultLevel, backgroundColor: campo.color }}>
                    {ml.emoji} Nv. {level}
                  </span>
                </div>
                <div style={dStyles.resultBar}>
                  <div style={{
                    ...dStyles.resultFill,
                    width: `${(level / 10) * 100}%`,
                    backgroundColor: campo.color,
                  }} />
                </div>
                <span style={dStyles.resultLabel}>{ml.label} — {ml.description}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const campoId = campoIds[diagnosticCampo]
  const campo = CAMPO_LABELS[diagnosticCampo]
  const questions = DIAGNOSTIC_QUESTIONS[campoId]
  const current = questions[diagnosticQ]
  const totalAnswered = diagnosticCampo * 3 + diagnosticQ
  const totalQuestions = 12

  return (
    <div style={styles.stepContent}>
      <span style={styles.bigEmoji}>🧪</span>
      <h1 style={styles.title}>Mini-avaliação</h1>
      <p style={styles.desc}>
        {filledBy === 'self'
          ? 'Responde a estas perguntas rápidas para sabermos por onde começar. Não te preocupes se não souberes!'
          : 'Perguntas rápidas para detectar o nível inicial. Pode responder "Não sei" sem problema.'}
      </p>

      <div style={dStyles.progressRow}>
        <span style={dStyles.progressLabel}>
          {campo.icon} {campo.name}
        </span>
        <span style={dStyles.progressCount}>
          {totalAnswered + 1} / {totalQuestions}
        </span>
      </div>
      <div style={dStyles.progressBar}>
        <div style={{
          ...dStyles.progressFill,
          width: `${((totalAnswered + 1) / totalQuestions) * 100}%`,
          backgroundColor: campo.color,
        }} />
      </div>

      <div style={{ ...dStyles.questionCard, borderColor: campo.color }}>
        <span style={dStyles.questionEmoji}>{current.emoji}</span>
        <p style={dStyles.questionText}>{current.question}</p>
        {current.hint && <p style={dStyles.questionHint}>{current.hint}</p>}
      </div>

      <div style={dStyles.optionsList}>
        {current.options.map((opt, i) => (
          <button
            key={i}
            style={{
              ...dStyles.optionBtn,
              ...(opt.skip ? dStyles.optionSkip : {}),
            }}
            onClick={() => onAnswer(campoId, diagnosticQ, opt.correct)}
          >
            {opt.text}
          </button>
        ))}
      </div>

      <button style={dStyles.skipAllBtn} onClick={onSkipAll}>
        Saltar avaliação (começar no nível 1)
      </button>
    </div>
  )
}

// Diagnostic-specific styles
const dStyles = {
  progressRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  progressCount: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  progressBar: {
    height: '4px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  questionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-lg)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid',
  },
  questionEmoji: { fontSize: '3rem' },
  questionText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    textAlign: 'center',
  },
  questionHint: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  optionBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
  },
  optionSkip: {
    backgroundColor: 'var(--color-bg)',
    borderStyle: 'dashed',
    color: 'var(--color-text-secondary)',
  },
  skipAllBtn: {
    padding: 'var(--space-sm)',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    textDecoration: 'underline',
    alignSelf: 'center',
  },
  resultsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  resultCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  resultLevel: {
    padding: '2px 10px',
    borderRadius: 'var(--radius-sm)',
    color: 'white',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
  },
  resultBar: {
    height: '6px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  resultFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.6s ease',
  },
  resultLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    maxWidth: '480px',
    margin: '0 auto',
    backgroundColor: 'var(--color-surface)',
  },
  progressBar: {
    height: '4px',
    backgroundColor: 'var(--color-border)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    transition: 'width 0.4s ease',
  },
  stepIndicator: {
    textAlign: 'center',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    padding: 'var(--space-xs)',
  },
  content: {
    flex: 1,
    padding: 'var(--space-md) var(--space-lg)',
    overflowY: 'auto',
    paddingBottom: '80px',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  bigEmoji: { fontSize: '3rem', lineHeight: 1, textAlign: 'center' },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
    textAlign: 'center',
  },
  desc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  smallDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
    marginTop: '-8px',
  },
  label: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    marginTop: 'var(--space-sm)',
  },
  input: {
    width: '100%',
    padding: 'var(--space-md)',
    fontSize: 'var(--font-size-lg)',
    fontFamily: 'inherit',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
    outline: 'none',
  },
  // Grids
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-sm)',
  },
  grid3: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  ageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-xs)',
    maxWidth: '260px',
    alignSelf: 'center',
  },
  ageBtn: {
    padding: 'var(--space-sm)',
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
  },
  ageBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
    color: 'var(--color-primary)',
  },
  // Options (who is filling in)
  optionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  optionBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  optionEmoji: { fontSize: '2rem' },
  optionLabel: { fontWeight: 600, fontSize: 'var(--font-size-sm)' },
  // Universe
  universeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-sm)',
  },
  universeBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'center',
  },
  universeBtnActive: {
    backgroundColor: '#E8F5E9',
  },
  universeIcon: { fontSize: '2.5rem' },
  universeName: { fontWeight: 700, fontSize: 'var(--font-size-base)' },
  universeDesc: { fontSize: '0.7rem', color: 'var(--color-text-secondary)' },
  // Teams (compact)
  teamGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-xs)',
  },
  smallBtn: {
    padding: 'var(--space-xs) var(--space-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
  },
  smallBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
    color: 'var(--color-primary)',
    fontWeight: 700,
  },
  // Learning needs
  needsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  needBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
    width: '100%',
  },
  needBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  needEmoji: { fontSize: '1.5rem', flexShrink: 0 },
  needLabel: { fontWeight: 600, fontSize: 'var(--font-size-sm)' },
  // Level buttons
  levelBtn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: 'var(--space-sm) var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  levelBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  levelLabel: { fontWeight: 700, fontSize: 'var(--font-size-base)' },
  levelDesc: { fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' },
  // Sensory
  sensoryRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  sensoryLabel: {
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
  },
  sensoryOptions: {
    display: 'flex',
    gap: 'var(--space-xs)',
  },
  toggleBtn: {
    flex: 1,
    padding: 'var(--space-sm)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
  },
  toggleBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
    color: 'var(--color-primary)',
  },
  // Checkboxes
  checkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    textAlign: 'left',
    width: '100%',
  },
  checkItemActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  checkBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '2px solid var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '0.7rem',
    color: 'var(--color-primary)',
    flexShrink: 0,
  },
  // Session
  sessionGrid: {
    display: 'flex',
    gap: 'var(--space-xs)',
    justifyContent: 'center',
  },
  sessionBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 'var(--space-sm) var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  sessionBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  sessionNum: { fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-primary)' },
  sessionUnit: { fontSize: '0.6rem', color: 'var(--color-text-secondary)', fontWeight: 600 },
  // Avatar
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-sm)',
  },
  avatarBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: 'var(--space-sm)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
  },
  avatarBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  avatarEmoji: { fontSize: '2rem' },
  avatarLabel: { fontSize: '0.65rem', fontWeight: 600, color: 'var(--color-text-secondary)' },
  // Ready
  readyBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-xl)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-primary)',
  },
  readyEmoji: { fontSize: '3rem' },
  readyText: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
    textAlign: 'center',
  },
  readySubtext: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  // Footer
  footer: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    padding: 'var(--space-md)',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    gap: 'var(--space-sm)',
  },
  backBtn: {
    padding: 'var(--space-sm) var(--space-lg)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
  },
  nextBtn: {
    padding: 'var(--space-sm) var(--space-xl)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  nextBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  startBtn: {
    padding: 'var(--space-md) var(--space-xl)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-lg)',
  },
  // Founder profile loaded indicator
  founderLoaded: {
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-primary)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary-dark)',
    textAlign: 'center',
    fontWeight: 600,
  },
}
