import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { AVATARS } from '../hooks/useProfile'

const navItems = [
  { path: '/', label: 'Inicio', icon: '🏟️' },
  { path: '/fichas', label: 'Fichas', icon: '✏️' },
  { path: '/desafios', label: 'Desafios', icon: '🎯' },
  { path: '/loja', label: 'Loja', icon: '🛒' },
  { path: '/definicoes', label: 'Mais', icon: '⚙️' },
]

export default function Layout({ profile }) {
  const location = useLocation()
  const isActivity = location.pathname.split('/').length > 3

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        <Outlet />
      </main>
      {!isActivity && (
        <nav style={styles.nav} aria-label="Navegacao principal">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navItem,
                ...(isActive ? styles.navItemActive : {}),
              })}
              end={item.path === '/'}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
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
  main: {
    flex: 1,
    padding: 'var(--space-md)',
    paddingBottom: '80px',
  },
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border)',
    padding: 'var(--space-xs) 0',
    zIndex: 100,
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    padding: 'var(--space-xs) var(--space-sm)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--font-size-sm)',
    transition: 'all var(--transition-speed)',
    textDecoration: 'none',
  },
  navItemActive: {
    color: 'var(--color-primary)',
    fontWeight: 600,
  },
  navIcon: {
    fontSize: '1.4rem',
    lineHeight: 1,
  },
  navLabel: {
    fontSize: '0.65rem',
    fontWeight: 500,
  },
}
