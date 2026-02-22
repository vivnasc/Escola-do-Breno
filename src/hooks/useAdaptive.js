import { useMemo, useEffect, useRef, useCallback, useState } from 'react'
import { getUniverse } from '../data/universes'

/**
 * Translates a child's needs profile into concrete UI/UX adaptations.
 * This is the engine that makes personalisation real, not cosmetic.
 */
export function useAdaptive(profile) {
  const sessionStartRef = useRef(Date.now())
  const [showBreakReminder, setShowBreakReminder] = useState(false)

  const universe = useMemo(
    () => getUniverse(profile?.universe),
    [profile?.universe]
  )

  // === CSS-level adaptations injected as CSS variables ===
  const cssAdaptations = useMemo(() => {
    const s = profile?.sensory || {}
    const vars = {}

    // Font size
    if (s.fontSize === 'large') {
      vars['--adaptive-font-scale'] = '1.2'
      vars['--adaptive-font-size-base'] = '1.2rem'
    } else if (s.fontSize === 'extra-large') {
      vars['--adaptive-font-scale'] = '1.4'
      vars['--adaptive-font-size-base'] = '1.4rem'
    } else {
      vars['--adaptive-font-scale'] = '1'
      vars['--adaptive-font-size-base'] = '1rem'
    }

    // High contrast
    if (s.visualContrast === 'high') {
      vars['--adaptive-text-color'] = '#000000'
      vars['--adaptive-bg-color'] = '#FFFFFF'
      vars['--adaptive-border-width'] = '2px'
      vars['--adaptive-border-color'] = '#333333'
    }

    // Reduced animations
    if (s.animationLevel === 'minimal') {
      vars['--adaptive-animation-duration'] = '0s'
      vars['--adaptive-transition-speed'] = '0s'
    } else {
      vars['--adaptive-animation-duration'] = '0.6s'
      vars['--adaptive-transition-speed'] = '0.3s'
    }

    return vars
  }, [profile?.sensory])

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement
    Object.entries(cssAdaptations).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    return () => {
      Object.keys(cssAdaptations).forEach((key) => {
        root.style.removeProperty(key)
      })
    }
  }, [cssAdaptations])

  // === Break reminders based on attention needs ===
  useEffect(() => {
    const attn = profile?.attention
    if (!attn?.breakReminder) return

    const interval = (attn.breakInterval || 10) * 60 * 1000
    const timer = setInterval(() => {
      setShowBreakReminder(true)
    }, interval)

    return () => clearInterval(timer)
  }, [profile?.attention])

  const dismissBreak = useCallback(() => {
    setShowBreakReminder(false)
    sessionStartRef.current = Date.now()
  }, [])

  // === Difficulty adjustment based on competency levels ===
  // Returns overall difficulty (1-3) and per-campo difficulty map
  const difficulty = useMemo(() => {
    const levels = profile?.competencyLevels || {}
    // Average across all campos for a global difficulty
    const vals = Object.values(levels).filter((v) => typeof v === 'number')
    const avg = vals.length > 0 ? vals.reduce((s, v) => s + v, 0) / vals.length : 1
    // Map 1-10 competency levels to 1-3 difficulty
    if (avg >= 7) return 3
    if (avg >= 4) return 2
    return 1
  }, [profile?.competencyLevels])

  // Per-campo difficulty (1-3) derived from competency levels
  const campoDifficulty = useMemo(() => {
    const levels = profile?.competencyLevels || {}
    const result = {}
    for (const [campo, level] of Object.entries(levels)) {
      if (level >= 7) result[campo] = 3
      else if (level >= 4) result[campo] = 2
      else result[campo] = 1
    }
    return result
  }, [profile?.competencyLevels])

  // === How many options to show per question ===
  const choiceCount = useMemo(() => {
    const needs = profile?.learningNeeds || {}
    const sensory = profile?.sensory || {}

    if (needs.supportLevel === 'full' || sensory.reducedClutter) return 2
    if (needs.supportLevel === 'some') return 3
    return 4
  }, [profile?.learningNeeds, profile?.sensory])

  // === Frustration detection thresholds ===
  const frustrationConfig = useMemo(() => {
    const sensitivity = profile?.attention?.frustrationSensitivity || 'moderate'

    if (sensitivity === 'sensitive') {
      return { rapidClicks: 3, consecutiveErrors: 2, inactivityMs: 45000 }
    }
    if (sensitivity === 'resilient') {
      return { rapidClicks: 7, consecutiveErrors: 5, inactivityMs: 90000 }
    }
    // moderate
    return { rapidClicks: 5, consecutiveErrors: 3, inactivityMs: 60000 }
  }, [profile?.attention?.frustrationSensitivity])

  // === Whether to show timers/countdowns ===
  const showTimers = profile?.sensory?.timePressure !== false

  // === Text complexity based on reading level ===
  const textLevel = useMemo(() => {
    const level = profile?.learningNeeds?.readingLevel || 'beginning'
    return {
      useSimpleLanguage: level === 'pre-reader' || profile?.communication?.prefersSimpleLanguage,
      showImages: level === 'pre-reader' || profile?.communication?.usesVisualSupports,
      readAloud: level !== 'fluent' || profile?.communication?.needsAudioInstructions,
    }
  }, [profile?.learningNeeds?.readingLevel, profile?.communication])

  // === Which campos/goals to prioritise on home screen ===
  const prioritisedCampos = useMemo(() => {
    const goals = profile?.goals || []
    const priority = []

    if (goals.some(g => ['language-pt', 'language-en', 'reading', 'writing', 'communication'].includes(g))) {
      priority.push('campo1')
    }
    if (goals.some(g => ['math', 'attention-focus'].includes(g))) {
      priority.push('campo2')
    }
    if (goals.some(g => ['language-en'].includes(g))) {
      if (!priority.includes('campo1')) priority.push('campo1')
      priority.push('campo3')
    }
    if (goals.some(g => ['social-skills', 'emotional-regulation', 'daily-living'].includes(g))) {
      priority.push('campo4')
    }

    // If no goals set, show all equally
    return priority.length > 0 ? priority : ['campo1', 'campo2', 'campo3', 'campo4']
  }, [profile?.goals])

  // === Session time management ===
  const sessionLimit = (profile?.attention?.sessionLength || 15) * 60 * 1000

  const isSessionExpired = useCallback(() => {
    return Date.now() - sessionStartRef.current > sessionLimit
  }, [sessionLimit])

  return {
    universe,
    cssAdaptations,
    difficulty,
    campoDifficulty,
    choiceCount,
    frustrationConfig,
    showTimers,
    textLevel,
    prioritisedCampos,
    showBreakReminder,
    dismissBreak,
    isSessionExpired,
    sessionLimit,
  }
}
