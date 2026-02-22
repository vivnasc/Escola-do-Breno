import { useCallback, useRef } from 'react'

export function useTTS(lang = 'pt') {
  const utteranceRef = useRef(null)

  const speak = useCallback(
    (text, options = {}) => {
      if (!('speechSynthesis' in window)) return

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
