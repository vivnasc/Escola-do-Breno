/**
 * IndexedDB storage wrapper — robust persistence beyond localStorage.
 *
 * localStorage limits: 5-10MB, synchronous, no structured data.
 * IndexedDB: 50MB+, async, survives cache clears better.
 *
 * This module provides:
 *   - Automatic migration from localStorage to IndexedDB
 *   - Fallback to localStorage if IndexedDB unavailable
 *   - Export/import JSON for cross-device backup
 *   - Same API shape as localStorage usage in useProfile/useProgress
 */

const DB_NAME = 'pitch-db'
const DB_VERSION = 1
const STORE_NAME = 'keyval'

function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'))
      return
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function idbGet(key) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)
      const req = store.get(key)
      req.onsuccess = () => resolve(req.result ?? null)
      req.onerror = () => reject(req.error)
    })
  } catch {
    // Fallback to localStorage
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : null
  }
}

async function idbSet(key, value) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req = store.put(value, key)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {
    // Fallback to localStorage
    localStorage.setItem(key, JSON.stringify(value))
  }
}

async function idbDelete(key) {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)
      const req = store.delete(key)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch {
    localStorage.removeItem(key)
  }
}

/**
 * Migrate existing localStorage data into IndexedDB.
 * Runs once — after migration, localStorage keys are kept as backup.
 */
export async function migrateToIndexedDB() {
  const migrated = localStorage.getItem('pitch-idb-migrated')
  if (migrated) return

  try {
    const keys = ['pitch-profiles', 'pitch-active-id', 'pitch-progress']
    for (const key of keys) {
      const val = localStorage.getItem(key)
      if (val) {
        await idbSet(key, JSON.parse(val))
      }
    }
    localStorage.setItem('pitch-idb-migrated', 'true')
  } catch {
    // If migration fails, localStorage remains as primary
  }
}

/**
 * Export all app data as a single JSON object (for backup/transfer).
 */
export async function exportAllData() {
  const profiles = await idbGet('pitch-profiles') || JSON.parse(localStorage.getItem('pitch-profiles') || '[]')
  const activeId = await idbGet('pitch-active-id') || localStorage.getItem('pitch-active-id')
  const progress = await idbGet('pitch-progress') || JSON.parse(localStorage.getItem('pitch-progress') || '{}')

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    profiles,
    activeId,
    progress,
  }
}

/**
 * Import data from a JSON backup. Merges or replaces existing data.
 */
export async function importData(data) {
  if (!data || data.version !== 1) {
    throw new Error('Formato de backup inválido')
  }

  if (data.profiles) {
    await idbSet('pitch-profiles', data.profiles)
    localStorage.setItem('pitch-profiles', JSON.stringify(data.profiles))
  }
  if (data.activeId) {
    await idbSet('pitch-active-id', data.activeId)
    localStorage.setItem('pitch-active-id', data.activeId)
  }
  if (data.progress) {
    await idbSet('pitch-progress', data.progress)
    localStorage.setItem('pitch-progress', JSON.stringify(data.progress))
  }

  return true
}

export { idbGet, idbSet, idbDelete }
