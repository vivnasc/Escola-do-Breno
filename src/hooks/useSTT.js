import { useState, useCallback, useRef } from 'react'

/**
 * Speech-to-Text hook using native SpeechRecognition API.
 *
 * Allows the child to speak answers instead of only touching.
 * Falls back gracefully — if browser doesn't support it, returns
 * `supported: false` and all functions are no-ops.
 *
 * Requires: Chrome, Edge, Safari 14.1+, or Android WebView.
 * Requires: internet (speech recognition is cloud-processed).
 *
 * Usage:
 *   const { listen, stop, transcript, isListening, supported } = useSTT('en-GB')
 *   listen({ onResult: (text) => checkAnswer(text) })
 */

const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null

export function useSTT(lang = 'pt') {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const recognitionRef = useRef(null)
  const callbackRef = useRef(null)

  const supported = !!SpeechRecognition

  const listen = useCallback((options = {}) => {
    if (!SpeechRecognition) return
    // Stop any existing session
    if (recognitionRef.current) {
      try { recognitionRef.current.abort() } catch {}
    }

    const recognition = new SpeechRecognition()
    recognition.lang = options.lang || lang
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 3

    callbackRef.current = options.onResult || null

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
    }

    recognition.onresult = (event) => {
      const results = []
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          results.push(event.results[i][j].transcript.trim().toLowerCase())
        }
      }
      const best = results[0] || ''
      setTranscript(best)
      if (callbackRef.current) {
        callbackRef.current(best, results)
      }
    }

    recognition.onerror = (event) => {
      // 'no-speech' and 'aborted' are not real errors
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('STT error:', event.error)
      }
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [lang])

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch {}
    }
    setIsListening(false)
  }, [])

  const listenForWord = useCallback((expectedWords, options = {}) => {
    const words = Array.isArray(expectedWords)
      ? expectedWords.map((w) => w.toLowerCase())
      : [expectedWords.toLowerCase()]

    return new Promise((resolve) => {
      listen({
        lang: options.lang || lang,
        onResult: (best, alternatives) => {
          const allTexts = alternatives || [best]
          const match = words.find((w) =>
            allTexts.some((alt) => alt.includes(w) || w.includes(alt))
          )
          resolve({
            match: !!match,
            matchedWord: match || null,
            heard: best,
            alternatives: allTexts,
          })
        },
      })

      // Auto-timeout after 5 seconds
      setTimeout(() => {
        stop()
        resolve({ match: false, matchedWord: null, heard: '', alternatives: [] })
      }, options.timeout || 5000)
    })
  }, [listen, stop, lang])

  return {
    listen,
    stop,
    listenForWord,
    transcript,
    isListening,
    supported,
  }
}
