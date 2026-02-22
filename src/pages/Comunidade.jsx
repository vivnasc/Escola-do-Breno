import { useState } from 'react'
import { AVATARS } from '../hooks/useProfile'

// Simulated community members (since this is a local-first app)
const SIMULATED_MEMBERS = [
  { name: 'Sofia', avatar: 'crown', stars: 45, badge: 'Goleadora' },
  { name: 'Miguel', avatar: 'lightning', stars: 38, badge: 'Explorador' },
  { name: 'Ana', avatar: 'fire', stars: 52, badge: 'Linguista' },
  { name: 'Tiago', avatar: 'rocket', stars: 29, badge: 'Matematico' },
  { name: 'Ines', avatar: 'eagle', stars: 61, badge: 'Lenda' },
]

const ENCOURAGEMENT_TEMPLATES = [
  'Continua assim, es incrivel!',
  'Cada dia melhor! Grande jogador!',
  'O teu esforco esta a dar frutos!',
  'Brilhas como uma estrela!',
  'Um verdadeiro campeao!',
]

export default function Comunidade({ profile, progress, addEncouragement }) {
  const [activeTab, setActiveTab] = useState('mural')
  const [newMessage, setNewMessage] = useState('')

  const myAvatar = AVATARS.find((a) => a.id === profile?.avatar)?.emoji || '⭐'
  const myName = profile?.name || 'Jogador'

  const handleSendEncouragement = () => {
    if (!newMessage.trim()) return
    addEncouragement?.(myName, newMessage.trim())
    setNewMessage('')
  }

  // Combine simulated + real encouragements
  const allEncouragements = [
    // Simulated encouragements from "other players"
    ...SIMULATED_MEMBERS.slice(0, 3).map((m, i) => ({
      id: `sim-${i}`,
      from: m.name,
      avatar: AVATARS.find((a) => a.id === m.avatar)?.emoji || '⭐',
      message: ENCOURAGEMENT_TEMPLATES[i],
      date: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
    })),
    // Real encouragements
    ...(profile?.encouragements || []).map((e) => ({
      ...e,
      avatar: myAvatar,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Leaderboard: combine player with simulated members
  const leaderboard = [
    { name: myName, avatar: myAvatar, stars: progress?.totalStars || 0, isMe: true },
    ...SIMULATED_MEMBERS.map((m) => ({
      ...m,
      avatar: AVATARS.find((a) => a.id === m.avatar)?.emoji || '⭐',
      isMe: false,
    })),
  ].sort((a, b) => b.stars - a.stars)

  // My achievements for the pride wall
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
  ].filter(Boolean)

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Comunidade</h1>
          <p style={styles.subtitle}>O nosso balneario virtual!</p>
        </div>
        <span style={styles.headerEmoji}>🏟️</span>
      </header>

      <div style={styles.tabs}>
        {[
          { id: 'mural', label: 'Mural', icon: '📋' },
          { id: 'ranking', label: 'Ranking', icon: '🏆' },
          { id: 'orgulho', label: 'Orgulho', icon: '🌟' },
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
          <div style={styles.messageInput}>
            <input
              style={styles.input}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escreve uma mensagem de forca..."
              maxLength={100}
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

          <div style={styles.messageList}>
            {allEncouragements.map((msg) => (
              <div key={msg.id} style={styles.messageCard}>
                <span style={styles.messageAvatar}>{msg.avatar}</span>
                <div style={styles.messageContent}>
                  <span style={styles.messageName}>{msg.from}</span>
                  <p style={styles.messageText}>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ranking' && (
        <div style={styles.section} className="animate-fade-in">
          <h2 style={styles.sectionTitle}>Tabela Classificativa</h2>
          <div style={styles.leaderboard}>
            {leaderboard.map((player, idx) => (
              <div
                key={player.name}
                style={{
                  ...styles.leaderRow,
                  ...(player.isMe ? styles.leaderRowMe : {}),
                  ...(idx === 0 ? styles.leaderFirst : {}),
                }}
              >
                <span style={styles.leaderPos}>
                  {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
                </span>
                <span style={styles.leaderAvatar}>{player.avatar}</span>
                <div style={styles.leaderInfo}>
                  <span style={styles.leaderName}>
                    {player.name}
                    {player.isMe && ' (Tu!)'}
                  </span>
                  {player.badge && (
                    <span style={styles.leaderBadge}>{player.badge}</span>
                  )}
                </div>
                <span style={styles.leaderStars}>⭐ {player.stars}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orgulho' && (
        <div style={styles.section} className="animate-fade-in">
          <h2 style={styles.sectionTitle}>Mural do Orgulho</h2>
          <p style={styles.sectionDesc}>As tuas conquistas, {myName}!</p>

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

          <div style={styles.teamChallenge}>
            <h3 style={styles.challengeTitle}>Desafio de Equipa</h3>
            <p style={styles.challengeDesc}>
              Juntos, a comunidade ja ganhou mais de 200 estrelas! Vamos chegar a 500?
            </p>
            <div style={styles.challengeBar}>
              <div style={{ ...styles.challengeFill, width: '40%' }} />
            </div>
            <span style={styles.challengeProgress}>200 / 500 estrelas</span>
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
  // Message wall
  messageInput: {
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
  // Leaderboard
  leaderboard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  leaderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  leaderRowMe: {
    backgroundColor: '#E8F5E9',
    border: '2px solid var(--color-primary)',
  },
  leaderFirst: {
    backgroundColor: '#FFF8E1',
  },
  leaderPos: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    minWidth: '32px',
    textAlign: 'center',
  },
  leaderAvatar: {
    fontSize: '1.5rem',
  },
  leaderInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  leaderName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  leaderBadge: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  leaderStars: {
    fontWeight: 700,
    color: '#F57F17',
  },
  // Pride wall
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
  teamChallenge: {
    padding: 'var(--space-lg)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-primary)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  challengeTitle: {
    fontWeight: 700,
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-primary-dark)',
  },
  challengeDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    lineHeight: 1.4,
  },
  challengeBar: {
    height: '10px',
    backgroundColor: 'var(--color-border)',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  challengeFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '5px',
    transition: 'width 0.6s ease',
  },
  challengeProgress: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'right',
  },
}
