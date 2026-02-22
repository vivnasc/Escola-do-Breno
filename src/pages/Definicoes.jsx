import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AVATARS } from '../hooks/useProfile'
import { UNIVERSES } from '../data/universes'
import { TIERS } from '../data/tiers'
import { exportAllData, importData } from '../hooks/useStorage'

/**
 * Settings page — edit profile, needs, or reset.
 * Accessible from bottom nav so the parent/therapist can adjust anytime.
 */
export default function Definicoes({
  profile, profiles, updateProfile, resetProfile, deleteProfile,
  addRealReward, removeRealReward, subscription,
}) {
  const navigate = useNavigate()
  const [showReset, setShowReset] = useState(false)
  const [editSection, setEditSection] = useState(null)
  const [newRewardName, setNewRewardName] = useState('')
  const [newRewardStars, setNewRewardStars] = useState('10')
  const [newRewardIcon, setNewRewardIcon] = useState('🎁')
  const [backupMsg, setBackupMsg] = useState(null)
  const fileInputRef = useRef(null)

  const universe = UNIVERSES.find((u) => u.id === profile?.universe)

  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.header}>
        <img src="/logos/pitch-robo.png" alt="PITCH" style={styles.logo} />
        <div>
          <h1 style={styles.title}>Definicoes</h1>
          <p style={styles.subtitle}>A Escola do {profile?.name || 'Jogador'}</p>
        </div>
      </div>

      {/* Profile Summary */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Perfil</h2>
        <div style={styles.profileCard}>
          <div style={styles.profileRow}>
            <span style={styles.profileLabel}>Nome</span>
            <span style={styles.profileValue}>{profile?.name}</span>
          </div>
          <div style={styles.profileRow}>
            <span style={styles.profileLabel}>Idade</span>
            <span style={styles.profileValue}>{profile?.age} anos</span>
          </div>
          <div style={styles.profileRow}>
            <span style={styles.profileLabel}>Avatar</span>
            <span style={styles.profileValue}>
              {AVATARS.find((a) => a.id === profile?.avatar)?.emoji} {AVATARS.find((a) => a.id === profile?.avatar)?.label}
            </span>
          </div>
          <div style={styles.profileRow}>
            <span style={styles.profileLabel}>Mundo</span>
            <span style={styles.profileValue}>{universe?.icon} {universe?.name}</span>
          </div>
          {profile?.favoriteTeam && (
            <div style={styles.profileRow}>
              <span style={styles.profileLabel}>Equipa</span>
              <span style={styles.profileValue}>{profile.favoriteTeam}</span>
            </div>
          )}
        </div>
      </section>

      {/* Subscription Plan */}
      {subscription && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Plano</h2>
          <div style={{
            ...styles.planCard,
            borderColor: subscription.tier.color,
          }}>
            <div style={styles.planRow}>
              <span style={styles.planEmoji}>{subscription.tier.emoji}</span>
              <div style={styles.planInfo}>
                <span style={{ ...styles.planName, color: subscription.tier.color }}>
                  Plano {subscription.tier.name}
                </span>
                <span style={styles.planPrice}>{subscription.tier.priceLabel}</span>
              </div>
              <button
                style={{ ...styles.planBtn, borderColor: subscription.tier.color, color: subscription.tier.color }}
                onClick={() => navigate('/planos')}
              >
                {subscription.isFree ? 'Melhorar' : 'Ver planos'}
              </button>
            </div>
            {subscription.isFree && (
              <p style={styles.planHint}>
                Desbloqueie todos os universos e actividades com o plano Flor.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Learning Needs */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Necessidades de Aprendizagem</h2>
        <div style={styles.needsCard}>
          <div style={styles.needRow}>
            <span style={styles.needLabel}>Areas de apoio</span>
            <div style={styles.tags}>
              {(profile?.learningNeeds?.areas || []).map((area) => (
                <span key={area} style={styles.tag}>{area}</span>
              ))}
              {(profile?.learningNeeds?.areas || []).length === 0 && (
                <span style={styles.tagEmpty}>Nenhuma seleccionada</span>
              )}
            </div>
          </div>
          <div style={styles.needRow}>
            <span style={styles.needLabel}>Nivel de leitura</span>
            <span style={styles.needValue}>
              {profile?.learningNeeds?.readingLevel === 'pre-reader' ? 'Pre-leitor' :
               profile?.learningNeeds?.readingLevel === 'beginning' ? 'A comecar' : 'Fluente'}
            </span>
          </div>
          <div style={styles.needRow}>
            <span style={styles.needLabel}>Nivel de apoio</span>
            <span style={styles.needValue}>
              {profile?.learningNeeds?.supportLevel === 'independent' ? 'Independente' :
               profile?.learningNeeds?.supportLevel === 'some' ? 'Algum apoio' : 'Apoio total'}
            </span>
          </div>
        </div>
      </section>

      {/* Sensory */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Sensorial</h2>
        <div style={styles.needsCard}>
          <SettingToggle
            label="Som"
            value={profile?.sensory?.soundEnabled}
            onToggle={(v) => updateProfile({ sensory: { ...profile.sensory, soundEnabled: v } })}
          />
          <SettingToggle
            label="Animacoes minimas"
            value={profile?.sensory?.animationLevel === 'minimal'}
            onToggle={(v) => updateProfile({ sensory: { ...profile.sensory, animationLevel: v ? 'minimal' : 'normal' } })}
          />
          <SettingToggle
            label="Alto contraste"
            value={profile?.sensory?.visualContrast === 'high'}
            onToggle={(v) => updateProfile({ sensory: { ...profile.sensory, visualContrast: v ? 'high' : 'normal' } })}
          />
          <SettingToggle
            label="Sem pressao de tempo"
            value={!profile?.sensory?.timePressure}
            onToggle={(v) => updateProfile({ sensory: { ...profile.sensory, timePressure: !v } })}
          />
          <div style={styles.needRow}>
            <span style={styles.needLabel}>Tamanho do texto</span>
            <div style={styles.sizeButtons}>
              {['normal', 'large', 'extra-large'].map((size) => (
                <button
                  key={size}
                  style={{
                    ...styles.sizeBtn,
                    ...(profile?.sensory?.fontSize === size ? styles.sizeBtnActive : {}),
                  }}
                  onClick={() => updateProfile({ sensory: { ...profile.sensory, fontSize: size } })}
                >
                  {size === 'normal' ? 'Aa' : size === 'large' ? 'Aa+' : 'Aa++'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Attention */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Sessoes e Atencao</h2>
        <div style={styles.needsCard}>
          <div style={styles.needRow}>
            <span style={styles.needLabel}>Duracao da sessao</span>
            <div style={styles.sizeButtons}>
              {[5, 10, 15, 20, 30].map((m) => (
                <button
                  key={m}
                  style={{
                    ...styles.sizeBtn,
                    ...(profile?.attention?.sessionLength === m ? styles.sizeBtnActive : {}),
                  }}
                  onClick={() => updateProfile({
                    attention: {
                      ...profile.attention,
                      sessionLength: m,
                      breakInterval: Math.max(5, m - 5),
                    },
                  })}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
          <SettingToggle
            label="Lembrete de pausa"
            value={profile?.attention?.breakReminder}
            onToggle={(v) => updateProfile({ attention: { ...profile.attention, breakReminder: v } })}
          />
          <div style={styles.needRow}>
            <span style={styles.needLabel}>Sensibilidade a frustracao</span>
            <div style={styles.sizeButtons}>
              {[
                { id: 'sensitive', label: 'Alta' },
                { id: 'moderate', label: 'Media' },
                { id: 'resilient', label: 'Baixa' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  style={{
                    ...styles.sizeBtn,
                    ...(profile?.attention?.frustrationSensitivity === opt.id ? styles.sizeBtnActive : {}),
                  }}
                  onClick={() => updateProfile({ attention: { ...profile.attention, frustrationSensitivity: opt.id } })}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Objectivos</h2>
        <div style={styles.tags}>
          {(profile?.goals || []).map((g) => (
            <span key={g} style={styles.goalTag}>{g}</span>
          ))}
          {(profile?.goals || []).length === 0 && (
            <span style={styles.tagEmpty}>Nenhum objectivo definido</span>
          )}
        </div>
      </section>

      {/* Profile Management */}
      {profiles && profiles.length > 1 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Perfis</h2>
          <p style={styles.profileCount}>{profiles.length} escolas neste dispositivo</p>
          <button
            style={styles.switchBtn}
            onClick={() => resetProfile('switch')}
          >
            Trocar de perfil
          </button>
        </section>
      )}

      {/* Real-World Rewards */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Recompensas Reais</h2>
        <p style={styles.rewardHint}>
          Defina premios reais que a crianca pode trocar por estrelas.
        </p>

        {(profile?.realRewards || []).length > 0 && (
          <div style={styles.rewardList}>
            {(profile?.realRewards || []).map((r) => (
              <div key={r.id} style={styles.rewardItem}>
                <span style={styles.rewardIcon}>{r.icon}</span>
                <div style={styles.rewardInfo}>
                  <span style={styles.rewardName}>{r.name}</span>
                  <span style={styles.rewardCost}>{r.starCost} estrelas</span>
                </div>
                <button
                  style={styles.rewardRemoveBtn}
                  onClick={() => removeRealReward?.(r.id)}
                  aria-label={`Remover ${r.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={styles.rewardForm}>
          <div style={styles.rewardFormRow}>
            <div style={styles.rewardIconPicker}>
              {['🎁', '🎮', '🍦', '🎬', '🏊', '⚽', '📖', '🎨'].map((icon) => (
                <button
                  key={icon}
                  style={{
                    ...styles.iconBtn,
                    ...(newRewardIcon === icon ? styles.iconBtnActive : {}),
                  }}
                  onClick={() => setNewRewardIcon(icon)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <input
            style={styles.rewardInput}
            type="text"
            value={newRewardName}
            onChange={(e) => setNewRewardName(e.target.value)}
            placeholder="Nome do premio (ex: Ida ao parque)"
            maxLength={50}
          />
          <div style={styles.rewardFormRow}>
            <span style={styles.needLabel}>Custo em estrelas:</span>
            <div style={styles.sizeButtons}>
              {['5', '10', '15', '20', '30'].map((n) => (
                <button
                  key={n}
                  style={{
                    ...styles.sizeBtn,
                    ...(newRewardStars === n ? styles.sizeBtnActive : {}),
                  }}
                  onClick={() => setNewRewardStars(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button
            style={{
              ...styles.addRewardBtn,
              ...(!newRewardName.trim() ? { opacity: 0.4 } : {}),
            }}
            onClick={() => {
              if (!newRewardName.trim()) return
              addRealReward?.(newRewardName.trim(), newRewardStars, newRewardIcon)
              setNewRewardName('')
            }}
            disabled={!newRewardName.trim()}
          >
            + Adicionar premio
          </button>
        </div>
      </section>

      {/* Dashboard */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Painel do Educador</h2>
        <button
          style={styles.dashboardBtn}
          onClick={() => navigate('/dashboard')}
        >
          📊 Ver progresso detalhado
        </button>
      </section>

      {/* Backup & Sync */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Backup e Transferencia</h2>
        <p style={styles.rewardHint}>
          Exporte os dados para transferir para outro dispositivo ou guardar como backup.
        </p>
        <div style={styles.backupBtns}>
          <button
            style={styles.backupExportBtn}
            onClick={async () => {
              try {
                const data = await exportAllData()
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `PITCH_Backup_${new Date().toISOString().slice(0, 10)}.json`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
                setBackupMsg('Backup exportado com sucesso!')
              } catch {
                setBackupMsg('Erro ao exportar')
              }
              setTimeout(() => setBackupMsg(null), 3000)
            }}
          >
            📤 Exportar backup
          </button>
          <button
            style={styles.backupImportBtn}
            onClick={() => fileInputRef.current?.click()}
          >
            📥 Importar backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                const text = await file.text()
                const data = JSON.parse(text)
                await importData(data)
                setBackupMsg('Backup importado! Recarregue a pagina.')
              } catch {
                setBackupMsg('Erro: ficheiro invalido')
              }
              e.target.value = ''
              setTimeout(() => setBackupMsg(null), 4000)
            }}
          />
        </div>
        {backupMsg && (
          <p style={styles.backupMsg}>{backupMsg}</p>
        )}
      </section>

      {/* Actions */}
      <section style={styles.section}>
        <button
          style={styles.intakeBtn}
          onClick={() => resetProfile('intake')}
        >
          Refazer questionario completo
        </button>

        <button
          style={styles.resetBtn}
          onClick={() => setShowReset(true)}
        >
          Apagar este perfil
        </button>
      </section>

      {showReset && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <p style={styles.modalText}>
              Tem a certeza? Isto apaga o perfil "{profile?.name}" e todo o seu progresso.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.modalCancel} onClick={() => setShowReset(false)}>
                Cancelar
              </button>
              <button
                style={styles.modalConfirm}
                onClick={() => {
                  deleteProfile(profile?.id)
                  setShowReset(false)
                }}
              >
                Sim, apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SettingToggle({ label, value, onToggle }) {
  return (
    <div style={styles.needRow}>
      <span style={styles.needLabel}>{label}</span>
      <button
        style={{ ...styles.toggleBtn, ...(value ? styles.toggleBtnOn : {}) }}
        onClick={() => onToggle(!value)}
      >
        <span style={{ ...styles.toggleKnob, ...(value ? styles.toggleKnobOn : {}) }} />
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-lg)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
  logo: {
    width: '48px',
    height: '48px',
    objectFit: 'contain',
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
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  sectionTitle: {
    fontWeight: 700,
    color: 'var(--color-primary-dark)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: 'var(--font-size-sm)',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  profileRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  },
  profileValue: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 700,
    color: 'var(--color-text)',
  },
  needsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  needRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  needLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    flexShrink: 0,
  },
  needValue: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-text)',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  tag: {
    padding: '2px 8px',
    backgroundColor: '#E3F2FD',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.65rem',
    fontWeight: 600,
    color: '#1565C0',
  },
  goalTag: {
    padding: '4px 10px',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
  },
  tagEmpty: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
  },
  // Toggle switch
  toggleBtn: {
    position: 'relative',
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#ccc',
    cursor: 'pointer',
    padding: 0,
    transition: 'background-color 0.2s',
    flexShrink: 0,
  },
  toggleBtnOn: {
    backgroundColor: 'var(--color-primary)',
  },
  toggleKnob: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'transform 0.2s',
    display: 'block',
  },
  toggleKnobOn: {
    transform: 'translateX(20px)',
  },
  // Size/option buttons
  sizeButtons: {
    display: 'flex',
    gap: '4px',
  },
  sizeBtn: {
    padding: '4px 10px',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--color-surface)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
  },
  sizeBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
    color: 'var(--color-primary)',
  },
  // Actions
  profileCount: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  dashboardBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: '#E8F5E9',
    border: '2px solid var(--color-primary)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-primary-dark)',
  },
  switchBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    border: '2px solid #1565C0',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    color: '#1565C0',
  },
  intakeBtn: {
    width: '100%',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    border: '2px solid var(--color-primary)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-primary)',
  },
  resetBtn: {
    width: '100%',
    padding: 'var(--space-sm)',
    backgroundColor: 'transparent',
    border: '1px solid #C62828',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 500,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: '#C62828',
  },
  // Reset modal
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: 'var(--space-md)',
  },
  modal: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-xl)',
    maxWidth: '340px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-md)',
  },
  modalText: {
    fontSize: 'var(--font-size-base)',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  modalActions: {
    display: 'flex',
    gap: 'var(--space-sm)',
  },
  modalCancel: {
    flex: 1,
    padding: 'var(--space-sm)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    backgroundColor: 'var(--color-bg)',
  },
  modalConfirm: {
    flex: 1,
    padding: 'var(--space-sm)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    backgroundColor: '#C62828',
    color: 'white',
  },
  // Real rewards
  rewardHint: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.3,
  },
  rewardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  rewardItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FFD54F',
  },
  rewardIcon: {
    fontSize: '1.5rem',
    flexShrink: 0,
  },
  rewardInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  rewardName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
  },
  rewardCost: {
    fontSize: '0.7rem',
    color: '#F57F17',
    fontWeight: 600,
  },
  rewardRemoveBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid #C62828',
    backgroundColor: 'transparent',
    color: '#C62828',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rewardForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
  },
  rewardFormRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-sm)',
    flexWrap: 'wrap',
  },
  rewardIconPicker: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
  },
  iconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnActive: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#E8F5E9',
  },
  rewardInput: {
    padding: 'var(--space-sm) var(--space-md)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
  },
  addRewardBtn: {
    padding: 'var(--space-sm)',
    backgroundColor: '#F57F17',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
  // Backup
  backupBtns: {
    display: 'flex',
    gap: 'var(--space-sm)',
  },
  backupExportBtn: {
    flex: 1,
    padding: 'var(--space-md)',
    backgroundColor: '#E3F2FD',
    border: '2px solid #1565C0',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: '#1565C0',
  },
  backupImportBtn: {
    flex: 1,
    padding: 'var(--space-md)',
    backgroundColor: '#FFF3E0',
    border: '2px solid #E65100',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    color: '#E65100',
  },
  backupMsg: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    textAlign: 'center',
    padding: 'var(--space-sm)',
    backgroundColor: '#E8F5E9',
    borderRadius: 'var(--radius-sm)',
  },
  // Plan card
  planCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-bg)',
    borderRadius: 'var(--radius-md)',
    border: '2px solid',
  },
  planRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
  },
  planEmoji: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  planInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  planName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  planPrice: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  },
  planBtn: {
    padding: 'var(--space-xs) var(--space-md)',
    border: '2px solid',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
    flexShrink: 0,
  },
  planHint: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
  },
}
