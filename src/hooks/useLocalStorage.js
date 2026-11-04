import { useEffect, useState } from 'react'

// Same shape as useState, but the value survives a page refresh.
// try/catch: corrupted JSON or blocked storage must never crash the app.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage full or disabled: keep working in memory only
    }
  }, [key, value])

  return [value, setValue]
}
