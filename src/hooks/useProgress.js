import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'pitch-progress'

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : getDefaultProgress()
  } catch {
    return getDefaultProgress()
  }
}

function getDefaultProgress() {
  return {
    wordsLearned: [],
    activitiesCompleted: {},
    streakDays: 0,
    lastActiveDate: null,
    totalStars: 0,
    campoProgress: {
      campo1: { completed: 0, total: 50 },
      campo2: { completed: 0, total: 20 },
      campo3: { completed: 0, total: 20 },
      campo4: { completed: 0, total: 20 },
    },
    trophies: [],
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const markWordLearned = useCallback((wordId) => {
    setProgress((prev) => {
      if (prev.wordsLearned.includes(wordId)) return prev
      const updated = {
        ...prev,
        wordsLearned: [...prev.wordsLearned, wordId],
        campoProgress: {
          ...prev.campoProgress,
          campo1: {
            ...prev.campoProgress.campo1,
            completed: prev.campoProgress.campo1.completed + 1,
          },
        },
      }
      return updated
    })
  }, [])

  const completeActivity = useCallback((activityId, stars = 1) => {
    setProgress((prev) => {
      const prevStars = prev.activitiesCompleted[activityId] || 0
      if (prevStars >= stars) return prev
      return {
        ...prev,
        activitiesCompleted: {
          ...prev.activitiesCompleted,
          [activityId]: stars,
        },
        totalStars: prev.totalStars + (stars - prevStars),
      }
    })
  }, [])

  const updateCampoProgress = useCallback((campoId, completed) => {
    setProgress((prev) => ({
      ...prev,
      campoProgress: {
        ...prev.campoProgress,
        [campoId]: {
          ...prev.campoProgress[campoId],
          completed: Math.max(prev.campoProgress[campoId].completed, completed),
        },
      },
    }))
  }, [])

  const addTrophy = useCallback((trophy) => {
    setProgress((prev) => {
      if (prev.trophies.find((t) => t.id === trophy.id)) return prev
      return {
        ...prev,
        trophies: [...prev.trophies, { ...trophy, date: new Date().toISOString() }],
      }
    })
  }, [])

  const updateStreak = useCallback(() => {
    setProgress((prev) => {
      const today = new Date().toDateString()
      if (prev.lastActiveDate === today) return prev

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const isConsecutive = prev.lastActiveDate === yesterday.toDateString()

      return {
        ...prev,
        lastActiveDate: today,
        streakDays: isConsecutive ? prev.streakDays + 1 : 1,
      }
    })
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress(getDefaultProgress())
  }, [])

  return {
    progress,
    markWordLearned,
    completeActivity,
    updateCampoProgress,
    addTrophy,
    updateStreak,
    resetAll,
  }
}
