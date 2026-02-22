import { useState } from 'react'
import { SHOP_CATEGORIES, SHOP_ITEMS } from '../data/shop'

export default function Loja({ profile, progress, purchaseItem, equipItem, claimRealReward }) {
  const [selectedCategory, setSelectedCategory] = useState('celebrations')
  const [purchaseConfirm, setPurchaseConfirm] = useState(null)
  const [justPurchased, setJustPurchased] = useState(null)

  const availableStars = progress?.totalStars || 0
  const purchasedIds = new Set((profile?.purchasedItems || []).map((i) => i.id))

  // Count spent stars
  const spentStars = (profile?.purchasedItems || []).reduce((sum, item) => {
    const shopItem = SHOP_ITEMS.find((s) => s.id === item.id)
    return sum + (shopItem?.cost || 0)
  }, 0)
  const currentStars = availableStars - spentStars

  const filteredItems = SHOP_ITEMS.filter((item) => item.category === selectedCategory)

  const handlePurchase = (item) => {
    if (currentStars < item.cost) return
    if (purchasedIds.has(item.id)) return
    setPurchaseConfirm(item)
  }

  const confirmPurchase = () => {
    if (!purchaseConfirm) return
    purchaseItem?.(purchaseConfirm, purchaseConfirm.cost)
    setJustPurchased(purchaseConfirm.id)
    setPurchaseConfirm(null)
    setTimeout(() => setJustPurchased(null), 2000)
  }

  const handleEquip = (item) => {
    if (item.category === 'celebrations') {
      equipItem?.('celebration', item.id)
    } else if (item.category === 'badges') {
      equipItem?.('badge', item.id)
    }
  }

  return (
    <div style={styles.container} className="animate-fade-in">
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Loja de Premios</h1>
          <p style={styles.subtitle}>Gasta as tuas estrelas!</p>
        </div>
        <div style={styles.starBalance}>
          <span style={styles.starIcon}>⭐</span>
          <span style={styles.starCount}>{currentStars}</span>
        </div>
      </header>

      <div style={styles.catRow}>
        {SHOP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            style={{
              ...styles.catBtn,
              ...(selectedCategory === cat.id ? styles.catBtnActive : {}),
            }}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div style={styles.itemGrid}>
        {filteredItems.map((item) => {
          const owned = purchasedIds.has(item.id) || item.owned
          const canAfford = currentStars >= item.cost
          const isEquipped =
            (item.category === 'celebrations' && profile?.equippedCelebration === item.id) ||
            (item.category === 'badges' && profile?.equippedBadge === item.id)
          const wasJustPurchased = justPurchased === item.id

          return (
            <div
              key={item.id}
              style={{
                ...styles.itemCard,
                ...(wasJustPurchased ? styles.itemCardPurchased : {}),
                ...(owned ? styles.itemCardOwned : {}),
              }}
            >
              <span style={styles.itemIcon}>{item.icon}</span>
              <span style={styles.itemName}>{item.name}</span>
              <p style={styles.itemDesc}>{item.description}</p>

              {wasJustPurchased ? (
                <div style={styles.purchasedBanner}>
                  🎉 Comprado!
                </div>
              ) : owned ? (
                <div style={styles.ownedActions}>
                  {(item.category === 'celebrations' || item.category === 'badges') && (
                    <button
                      style={{
                        ...styles.equipBtn,
                        ...(isEquipped ? styles.equippedBtn : {}),
                      }}
                      onClick={() => handleEquip(item)}
                    >
                      {isEquipped ? '✓ Equipado' : 'Equipar'}
                    </button>
                  )}
                  {item.category === 'stickers' || item.category === 'stadium' ? (
                    <span style={styles.ownedLabel}>✓ Na coleccao</span>
                  ) : null}
                </div>
              ) : (
                <button
                  style={{
                    ...styles.buyBtn,
                    ...(!canAfford ? styles.buyBtnDisabled : {}),
                  }}
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford}
                >
                  ⭐ {item.cost}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Real-world rewards from parents */}
      {(profile?.realRewards || []).length > 0 && (
        <div style={styles.realRewardsSection}>
          <h2 style={styles.realRewardsTitle}>Premios Reais</h2>
          <p style={styles.realRewardsDesc}>
            Troca as tuas estrelas por premios de verdade!
          </p>
          <div style={styles.realRewardGrid}>
            {(profile?.realRewards || []).map((reward) => {
              const canClaim = currentStars >= reward.starCost
              const alreadyClaimed = (profile?.claimedRewards || []).some(
                (c) => c.id === reward.id && !c.confirmed
              )
              return (
                <div key={reward.id} style={styles.realRewardCard}>
                  <span style={styles.realRewardIcon}>{reward.icon}</span>
                  <span style={styles.realRewardName}>{reward.name}</span>
                  <span style={styles.realRewardCost}>⭐ {reward.starCost}</span>
                  {alreadyClaimed ? (
                    <span style={styles.realRewardPending}>A espera...</span>
                  ) : (
                    <button
                      style={{
                        ...styles.realRewardBtn,
                        ...(!canClaim ? styles.buyBtnDisabled : {}),
                      }}
                      onClick={() => canClaim && claimRealReward?.(reward.id)}
                      disabled={!canClaim}
                    >
                      Pedir!
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Purchase confirmation modal */}
      {purchaseConfirm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.modalIcon}>{purchaseConfirm.icon}</span>
            <h3 style={styles.modalTitle}>Comprar {purchaseConfirm.name}?</h3>
            <p style={styles.modalDesc}>{purchaseConfirm.description}</p>
            <p style={styles.modalCost}>Custo: ⭐ {purchaseConfirm.cost}</p>
            <p style={styles.modalBalance}>
              Tens: ⭐ {currentStars} → Ficas com: ⭐ {currentStars - purchaseConfirm.cost}
            </p>
            <div style={styles.modalActions}>
              <button
                style={styles.modalCancel}
                onClick={() => setPurchaseConfirm(null)}
              >
                Cancelar
              </button>
              <button style={styles.modalConfirm} onClick={confirmPurchase}>
                Comprar!
              </button>
            </div>
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
  starBalance: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    padding: 'var(--space-sm) var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #FFD54F',
  },
  starIcon: {
    fontSize: '1.5rem',
  },
  starCount: {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 700,
    color: '#F57F17',
  },
  catRow: {
    display: 'flex',
    gap: 'var(--space-xs)',
    overflowX: 'auto',
    paddingBottom: 'var(--space-xs)',
  },
  catBtn: {
    padding: 'var(--space-xs) var(--space-md)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  catBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderColor: 'var(--color-primary)',
  },
  itemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--space-sm)',
  },
  itemCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-xs)',
    padding: 'var(--space-md)',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
    transition: 'all 0.3s',
  },
  itemCardOwned: {
    borderColor: 'var(--color-primary)',
    backgroundColor: '#F1F8E9',
  },
  itemCardPurchased: {
    borderColor: '#FFD54F',
    backgroundColor: '#FFF8E1',
    animation: 'successPulse 0.5s ease',
  },
  itemIcon: {
    fontSize: '2.5rem',
  },
  itemName: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  itemDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.3,
  },
  buyBtn: {
    padding: 'var(--space-xs) var(--space-lg)',
    backgroundColor: '#F57F17',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
    transition: 'opacity 0.2s',
  },
  buyBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  ownedActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  },
  equipBtn: {
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
  equippedBtn: {
    backgroundColor: '#66BB6A',
  },
  ownedLabel: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-primary)',
    fontWeight: 600,
  },
  purchasedBanner: {
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
    color: '#F57F17',
  },
  // Modal
  modal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: 'var(--space-md)',
  },
  modalContent: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-xl)',
    maxWidth: '340px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-md)',
  },
  modalIcon: {
    fontSize: '3rem',
  },
  modalTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
  },
  modalCost: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: '#F57F17',
  },
  modalBalance: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  modalActions: {
    display: 'flex',
    gap: 'var(--space-md)',
    width: '100%',
  },
  modalCancel: {
    flex: 1,
    padding: 'var(--space-sm)',
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  modalConfirm: {
    flex: 1,
    padding: 'var(--space-sm)',
    backgroundColor: '#F57F17',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-base)',
  },
  // Real-world rewards
  realRewardsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: '#FFF8E1',
    borderRadius: 'var(--radius-md)',
    border: '2px solid #FFD54F',
  },
  realRewardsTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 700,
    color: '#F57F17',
  },
  realRewardsDesc: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
  },
  realRewardGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-sm)',
  },
  realRewardCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    padding: 'var(--space-md)',
    backgroundColor: 'white',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FFD54F',
  },
  realRewardIcon: {
    fontSize: '2rem',
    flexShrink: 0,
  },
  realRewardName: {
    flex: 1,
    fontWeight: 700,
    fontSize: 'var(--font-size-base)',
  },
  realRewardCost: {
    fontWeight: 700,
    fontSize: 'var(--font-size-sm)',
    color: '#F57F17',
    marginRight: 'var(--space-sm)',
  },
  realRewardBtn: {
    padding: 'var(--space-xs) var(--space-md)',
    backgroundColor: '#F57F17',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-sm)',
  },
  realRewardPending: {
    fontSize: 'var(--font-size-sm)',
    color: '#F57F17',
    fontWeight: 600,
    fontStyle: 'italic',
  },
}
