import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved !== null ? (JSON.parse(saved) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // 저장 공간이 막힌 환경(시크릿 모드 등)에서는 무시
    }
  }, [key, value])

  return [value, setValue] as const
}
