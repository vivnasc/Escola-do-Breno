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

  // === Difficulty adjustment based on learning needs ===
  const difficulty = useMemo(() => {
    const needs = profile?.learningNeeds || {}
    const areas = needs.areas || []

    // Start easier if they have many areas of difficulty
    const baseDifficulty = areas.length >= 3 ? 1 : areas.length >= 1 ? 1 : 2

    // Support level affects starting difficulty
    const supportMod = needs.supportLevel === 'full' ? -1
      : needs.supportLevel === 'independent' ? 1
      : 0

    return Math.max(1, Math.min(3, baseDifficulty + supportMod))
  }, [profile?.learningNeeds])

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
