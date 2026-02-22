import { useState } from 'react'
import { AVATARS } from '../hooks/useProfile'
import { TEAMS, PLAYERS } from '../data/vocabulary'

const INTERESTS = [
  { id: 'dinosaurs', emoji: '🦕', label: 'Dinossauros' },
  { id: 'space', emoji: '🚀', label: 'Espaco' },
  { id: 'music', emoji: '🎵', label: 'Musica' },
  { id: 'animals', emoji: '🐾', label: 'Animais' },
  { id: 'cars', emoji: '🏎️', label: 'Carros' },
  { id: 'cooking', emoji: '🍳', label: 'Cozinhar' },
  { id: 'art', emoji: '🎨', label: 'Arte' },
  { id: 'games', emoji: '🎮', label: 'Jogos' },
]

export default function Intake({ onComplete }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [age, setAge] = useState(null)
  const [avatar, setAvatar] = useState('star')
  const [team, setTeam] = useState(null)
  const [player, setPlayer] = useState(null)
  const [interests, setInterests] = useState([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationLevel, setAnimationLevel] = useState('normal')

  const totalSteps = 6

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleFinish = () => {
    onComplete({
      name: name.trim() || 'Jogador',
      age,
      avatar,
      favoriteTeam: team || 'Benfica',
      favoritePlayer: player || 'Ronaldo',
      interests,
      soundEnabled,
      animationLevel,
    })
  }

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((step + 1) / totalSteps) * 100}%` }} />
      </div>

      <div style={styles.content} className="animate-fade-in" key={step}>
        {step === 0 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>⚽</span>
            <h1 style={styles.title}>Bem-vindo ao PITCH!</h1>
            <p style={styles.desc}>
              Vamos criar o teu perfil de jogador. Como te chamas?
            </p>
            <input
              style={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="O teu nome..."
              autoFocus
              maxLength={30}
            />
          </div>
        )}

        {step === 1 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>🎂</span>
            <h1 style={styles.title}>Quantos anos tens, {name || 'jogador'}?</h1>
            <div style={styles.ageGrid}>
              {[6, 7, 8, 9, 10, 11, 12, 13, 14].map((a) => (
                <button
                  key={a}
                  style={{
                    ...styles.ageBtn,
                    ...(age === a ? styles.ageBtnActive : {}),
                  }}
                  onClick={() => setAge(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={styles.stepContent}>
            <h1 style={styles.title}>Escolhe o teu avatar</h1>
            <p style={styles.desc}>Este sera o teu simbolo no PITCH</p>
            <div style={styles.avatarGrid}>
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  style={{
                    ...styles.avatarBtn,
                    ...(avatar === a.id ? styles.avatarBtnActive : {}),
                  }}
                  onClick={() => setAvatar(a.id)}
                >
                  <span style={styles.avatarEmoji}>{a.emoji}</span>
                  <span style={styles.avatarLabel}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>🏟️</span>
            <h1 style={styles.title}>Qual e a tua equipa?</h1>
            <div style={styles.teamGrid}>
              {TEAMS.map((t) => (
                <button
                  key={t.name}
                  style={{
                    ...styles.teamBtn,
                    ...(team === t.name ? styles.teamBtnActive : {}),
                  }}
                  onClick={() => setTeam(t.name)}
                >
                  <span style={styles.teamName}>{t.name}</span>
                  <span style={styles.teamCountry}>{t.country}</span>
                </button>
              ))}
            </div>
            <h2 style={styles.subtitle}>E o teu jogador favorito?</h2>
            <div style={styles.playerGrid}>
              {PLAYERS.map((p) => (
                <button
                  key={p.name}
                  style={{
                    ...styles.playerBtn,
                    ...(player === p.name ? styles.playerBtnActive : {}),
                  }}
                  onClick={() => setPlayer(p.name)}
                >
                  <span style={styles.playerNumber}>{p.number}</span>
                  <span style={styles.playerName}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>💡</span>
            <h1 style={styles.title}>O que mais gostas?</h1>
            <p style={styles.desc}>Escolhe os teus interesses (podes escolher varios)</p>
            <div style={styles.interestGrid}>
              {INTERESTS.map((i) => (
                <button
                  key={i.id}
                  style={{
                    ...styles.interestBtn,
                    ...(interests.includes(i.id) ? styles.interestBtnActive : {}),
                  }}
                  onClick={() => toggleInterest(i.id)}
                >
                  <span style={styles.interestEmoji}>{i.emoji}</span>
                  <span style={styles.interestLabel}>{i.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={styles.stepContent}>
            <span style={styles.bigEmoji}>🎮</span>
            <h1 style={styles.title}>Como preferes jogar?</h1>

            <div style={styles.prefSection}>
              <p style={styles.prefLabel}>Sons</p>
              <div style={styles.prefRow}>
                <button
                  style={{
                    ...styles.prefBtn,
                    ...(soundEnabled ? styles.prefBtnActive : {}),
                  }}
                  onClick={() => setSoundEnabled(true)}
                >
                  🔊 Com som
                </button>
                <button
                  style={{
                    ...styles.prefBtn,
                    ...(!soundEnabled ? styles.prefBtnActive : {}),
                  }}
                  onClick={() => setSoundEnabled(false)}
                >
                  🔇 Sem som
                </button>
              </div>
            </div>

            <div style={styles.prefSection}>
              <p style={styles.prefLabel}>Animacoes</p>
              <div style={styles.prefRow}>
                <button
                  style={{
                    ...styles.prefBtn,
                    ...(animationLevel === 'normal' ? styles.prefBtnActive : {}),
                  }}
                  onClick={() => setAnimationLevel('normal')}
                >
                  ✨ Normal
                </button>
                <button
                  style={{
                    ...styles.prefBtn,
                    ...(animationLevel === 'minimal' ? styles.prefBtnActive : {}),
                  }}
                  onClick={() => setAnimationLevel('minimal')}
                >
                  🧘 Calmo
                </button>
              </div>
            </div>

            <div style={styles.readyBox}>
              <span style={styles.readyEmoji}>🏆</span>
              <p style={styles.readyText}>
                Tudo pronto, {name || 'jogador'}! Vamos comecar a jogar?
              </p>
            </div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        {step > 0 && (
          <button style={styles.backBtn} onClick={handleBack}>
            ← Voltar
          </button>
        )}
        <div style={{ flex: 1 }} />
        {step < totalSteps - 1 ? (
          <button
            style={{
              ...styles.nextBtn,
              ...(step === 0 && !name.trim() ? styles.nextBtnDisabled : {}),
            }}
            onClick={handleNext}
            disabled={step === 0 && !name.trim()}
          >
            Seguinte →
          </button>
        ) : (
          <button style={styles.startBtn} onClick={handleFinish}>
            Comecar a Jogar!
          </button>
        )}
      </div>
    </div>
  )
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
    borderRadius: '2px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '2px',
    transition: 'width 0.4s ease',
  },
  content: {
    flex: 1,
    padding: 'var(--space-lg)',
    overflowY: 'auto',
  },
  stepContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-lg)',
  },
  bigEmoji: {
    fontSize: '4rem',
    lineHeight: 1,
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-text)',
    textAlign: 'center',
    marginTop: 'var(--space-md)',
  },
  desc: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: 'var(--space-md)',
    fontSize: 'var(--font-size-lg)',
    fontFamily: 'inherit',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  ageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-sm)',
    width: '100%',
    maxWidth: '280px',
  },
  ageBtn: {
    padding: 'var(--space-md)',
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  ageBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
    color: 'var(--color-primary)',
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-sm)',
    width: '100%',
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
    transition: 'all 0.2s',
  },
  avatarBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  avatarEmoji: {
    fontSize: '2rem',
  },
  avatarLabel: {
    fontSize: '0.65rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-sm)',
    width: '100%',
  },
  teamBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: 'var(--space-sm) var(--space-xs)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  teamBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  teamName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  teamCountry: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  playerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-sm)',
    width: '100%',
  },
  playerBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  playerBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  playerNumber: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: 'var(--color-primary)',
    minWidth: '32px',
    textAlign: 'center',
  },
  playerName: {
    fontWeight: 600,
  },
  interestGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-sm)',
    width: '100%',
  },
  interestBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  interestBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  interestEmoji: {
    fontSize: '1.5rem',
  },
  interestLabel: {
    fontWeight: 600,
  },
  prefSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  prefLabel: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
  },
  prefRow: {
    display: 'flex',
    gap: 'var(--space-sm)',
  },
  prefBtn: {
    flex: 1,
    padding: 'var(--space-md)',
    border: '2px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  prefBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
    color: 'var(--color-primary)',
  },
  readyBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-primary)',
    marginTop: 'var(--space-md)',
    width: '100%',
  },
  readyEmoji: {
    fontSize: '3rem',
  },
  readyText: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 600,
    textAlign: 'center',
    color: 'var(--color-primary-dark)',
  },
  footer: {
    display: 'flex',
    padding: 'var(--space-md)',
    borderTop: '1px solid var(--color-border)',
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
    transition: 'opacity 0.2s',
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
    transition: 'transform 0.2s',
  },
}
