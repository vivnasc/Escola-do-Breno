import { useCallback, useRef } from 'react'

/**
 * TTS module-level config — synced from profile by App.jsx.
 *
 * ttsMode values:
 *   'auto'      — speaks automatically + on tap (current default)
 *   'on-demand' — only speaks when the user taps the instruction
 *   'off'       — completely silent
 */
let _ttsMode = 'auto'

export function setTTSMode(mode) {
  _ttsMode = mode || 'auto'
}

export function getTTSMode() {
  return _ttsMode
}

export function useTTS(lang = 'pt') {
  const utteranceRef = useRef(null)

  const speak = useCallback(
    (text, options = {}) => {
      if (!('speechSynthesis' in window)) return

      // Respect ttsMode:
      // 'off' → never speak
      // 'on-demand' → skip auto-triggered speaks, allow manual (tap)
      if (_ttsMode === 'off') return
      if (_ttsMode === 'on-demand' && options.auto) return

      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = options.lang || lang
      utterance.rate = options.rate || 0.85
      utterance.pitch = options.pitch || 1.0
      utterance.volume = options.volume ?? 1.0

      const voices = window.speechSynthesis.getVoices()
      const preferred = voices.find(
        (v) => v.lang.startsWith(utterance.lang) && v.localService
      )
      if (preferred) utterance.voice = preferred

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    [lang]
  )

  const speakEn = useCallback(
    (text, options = {}) => {
      speak(text, { ...options, lang: 'en-GB' })
    },
    [speak]
  )

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
  }, [])

  return { speak, speakEn, stop }
}
