import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Lazy initialization pour éviter les re-rendus inutiles
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return initialValue
    }
  })

  // Synchronisation uniquement lors du changement de clé, pas de initialValue
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    try {
      const item = window.localStorage.getItem(key)
      if (item !== null) {
        const value = JSON.parse(item)
        setStoredValue(value)
      } else {
        // Si la clé n'existe pas, initialiser avec la valeur par défaut
        window.localStorage.setItem(key, JSON.stringify(initialValue))
        setStoredValue(initialValue)
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error)
    }
  }, [key]) // Suppression de initialValue des dépendances

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    },
    [key, storedValue]
  )

  return [storedValue, setValue] as const
}
