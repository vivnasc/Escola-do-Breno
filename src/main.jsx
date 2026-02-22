import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { migrateToIndexedDB } from './hooks/useStorage'
import './styles/variables.css'
import './styles/global.css'
import './styles/animations.css'

// Migrate localStorage → IndexedDB on first load (non-blocking)
migrateToIndexedDB().catch(() => {})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
