import { useState } from 'react'
import { AVATARS } from '../hooks/useProfile'

/**
 * Family Board — replaces simulated community with real family communication.
 * Parent/therapist can leave messages, child sees real achievements.
 */
export default function Comunidade({ profile, progress, addEncouragement }) {
  const [activeTab, setActiveTab] = useState('mural')
  const [newMessage, setNewMessage] = useState('')
  const [senderName, setSenderName] = useState('')

  const myAvatar = AVATARS.find((a) => a.id === profile?.avatar)?.emoji || '⭐'
  const myName = profile?.name || 'Crianca'

  const handleSendEncouragement = () => {
    if (!newMessage.trim()) return
    const from = senderName.trim() || 'Familia'
    addEncouragement?.(from, newMessage.trim())
    setNewMessage('')
  }

  // Only real encouragements from family
  const allMessages = (profile?.encouragements || [])
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Real achievements from progress
  const achievements = [
    progress?.wordsLearned?.length > 0 && {
      icon: '🗣️',
      text: `Aprendi ${progress.wordsLearned.length} palavras em ingles!`,
    },
    progress?.totalStars > 0 && {
      icon: '⭐',
      text: `Ja ganhei ${progress.totalStars} estrelas!`,
    },
    progress?.streakDays > 1 && {
      icon: '🔥',
      text: `${progress.streakDays} dias seguidos a jogar!`,
    },
    Object.keys(progress?.activitiesCompleted || {}).length > 0 && {
      icon: '🏆',
      text: `Completei ${Object.keys(progress.activitiesCompleted).length} actividades!`,
    },
    progress?.trophies?.length > 0 && {
      icon: '🏅',
      text: `Tenho ${progress.trophies.length} trofeus!`,
    },
    progress?.wordsLearned?.length >= 10 && {
      icon: '📖',
      text: 'Ja sei mais de 10 palavras!',
    },
    progress?.wordsLearned?.length >= 30 && {
      icon: '🌟',
      text: 'Mais de 30 palavras! Poliglota em formacao!',
    },
    progress?.totalStars >= 20 && {
      icon: '💫',
      text: 'Mais de 20 estrelas! Verdadeiro campeao!',
    },
  ].filter(Boolean)

  // Milestones
  const milestones = [
    { target: 10, label: '10 palavras', current: progress?.wordsLearned?.length || 0, icon: '🗣️' },
    { target: 30, label: '30 estrelas', current: progress?.totalStars || 0, icon: '⭐' },
    { target: 16, label: 'Todas as actividades', current: Object.keys(progress?.activitiesCompleted || {}).length, icon: '🏆' },
    { target: 7, label: '7 dias seguidos', current: progress?.streakDays || 0, icon: '🔥' },
  ]

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Familia</h1>
          <p style={styles.subtitle}>Mensagens e conquistas</p>
        </div>
        <span style={styles.headerEmoji}>👨‍👩‍👧‍👦</span>
      </header>

      <div style={styles.tabs}>
        {[
          { id: 'mural', label: 'Mensagens', icon: '💌' },
          { id: 'orgulho', label: 'Conquistas', icon: '🌟' },
          { id: 'metas', label: 'Metas', icon: '🎯' },
        ].map((tab) => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'mural' && (
        <div style={styles.section} className="animate-fade-in">
          <div style={styles.infoBox}>
            <span style={styles.infoIcon}>💡</span>
            <p style={styles.infoText}>
              Pais e terapeutas: deixem mensagens de encorajamento para o {myName}!
            </p>
          </div>

          <div style={styles.messageInput}>
            <input
              style={styles.nameInput}
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="O teu nome (ex: Mae, Pai, Tera...)"
              maxLength={30}
            />
            <div style={styles.messageRow}>
              <input
                style={styles.input}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escreve uma mensagem de forca..."
                maxLength={200}
                onKeyDown={(e) => e.key === 'Enter' && handleSendEncouragement()}
              />
              <button
                style={styles.sendBtn}
                onClick={handleSendEncouragement}
                disabled={!newMessage.trim()}
              >
                Enviar
              </button>
            </div>
          </div>

          {allMessages.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyEmoji}>💌</span>
              <p style={styles.emptyText}>
                Ainda nao ha mensagens. Pede a alguem da tua familia para te deixar uma mensagem!
              </p>
            </div>
          ) : (
            <div style={styles.messageList}>
              {allMessages.map((msg) => (
                <div key={msg.id} style={styles.messageCard}>
                  <span style={styles.messageAvatar}>💝</span>
                  <div style={styles.messageContent}>
                    <span style={styles.messageName}>{msg.from}</span>
                    <p style={styles.messageText}>{msg.message}</p>
                    <span style={styles.messageDate}>
                      {new Date(msg.date).toLocaleDateString('pt')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orgulho' && (
        <div style={styles.section} className="animate-fade-in">
          <h2 style={styles.sectionTitle}>Mural do Orgulho</h2>
          <p style={styles.sectionDesc}>As conquistas reais do {myName}!</p>

          {achievements.length === 0 ? (
            <div style={styles.emptyState}>
              <span style={styles.emptyEmoji}>🌱</span>
              <p style={styles.emptyText}>
                Comeca a jogar para desbloqueares conquistas!
              </p>
            </div>
          ) : (
            <div style={styles.achievementList}>
              {achievements.map((ach, i) => (
                <div key={i} style={styles.achievementCard}>
                  <span style={styles.achievementIcon}>{ach.icon}</span>
                  <p style={styles.achievementText}>{ach.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'metas' && (
        <div style={styles.section} className="animate-fade-in">
          <h2 style={styles.sectionTitle}>Metas</h2>
          <p style={styles.sectionDesc}>Objectivos para o {myName} alcancar!</p>

          <div style={styles.milestoneList}>
            {milestones.map((m, i) => {
              const pct = Math.min(100, Math.round((m.current / m.target) * 100))
              const done = m.current >= m.target
              return (
                <div key={i} style={{ ...styles.milestoneCard, ...(done ? styles.milestoneDone : {}) }}>
                  <div style={styles.milestoneTop}>
                    <span style={styles.milestoneIcon}>{m.icon}</span>
                    <span style={styles.milestoneLabel}>{m.label}</span>
                    <span style={styles.milestoneProgress}>
                      {done ? 'Concluido!' : `${m.current}/${m.target}`}
                    </span>
                  </div>
                  <div style={styles.milestoneBar}>
                    <div style={{ ...styles.milestoneFill, width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  subtitle: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  headerEmoji: {
    fontSize: '2.5rem',
  },
  tabs: {
    display: 'flex',
    gap: 'var(--space-xs)',
  },
  tab: {
    flex: 1,
    padding: 'var(--space-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderColor: 'var(--color-primary)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  sectionTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
  },
  sectionDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginTop: '-8px',
  },
  infoBox: {
    display: 'flex',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #90CAF9',
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: '1.2rem',
    flexShrink: 0,
  },
  infoText: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  messageInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  nameInput: {
    padding: 'var(--space-sm) var(--space-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
  },
  messageRow: {
    display: 'flex',
    gap: 'var(--space-sm)',
  },
  input: {
    flex: 1,
    padding: 'var(--space-sm) var(--space-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    outline: 'none',
  },
  sendBtn: {
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
  },
  messageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  messageCard: {
    display: 'flex',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  messageAvatar: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  messageContent: {
    flex: 1,
  },
  messageName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
    display: 'block',
  },
  messageText: {
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    marginTop: '2px',
  },
  messageDate: {
    fontSize: '0.7rem',
    color: 'var(--color-text-secondary)',
    marginTop: '4px',
    display: 'block',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-xl)',
  },
  emptyEmoji: {
    fontSize: '3rem',
  },
  emptyText: {
    textAlign: 'center',
    color: 'var(--color-text-secondary)',
  },
  achievementList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  achievementCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
    padding: 'var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FFD54F',
  },
  achievementIcon: {
    fontSize: '2rem',
  },
  achievementText: {
    fontWeight: 600,
    fontSize: 'var(--font-size-base)',
  },
  milestoneList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  milestoneCard: {
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  milestoneDone: {
    backgroundColor: '#E8F5E9',
    borderColor: 'var(--color-primary)',
  },
  milestoneTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  milestoneIcon: {
    fontSize: '1.5rem',
  },
  milestoneLabel: {
    flex: 1,
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  milestoneProgress: {
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  milestoneBar: {
    height: '8px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  milestoneFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px',
    transition: 'width 0.6s ease',
  },
}
