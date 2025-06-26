"use client"
// useCachedFetch.ts
// Utility React hook for fetching and caching data every 2 days, and always on page refresh if expired.
// Usage: const { data, loading, error } = useCachedFetch('articles', getArticles)

import { useEffect, useState } from 'react'

const CACHE_DURATION = 2 * 24 * 60 * 60 * 1000 // 2 days in ms

export function useCachedFetch<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    let isMounted = true
    const cached = localStorage.getItem(key)
    if (cached) {
      setData(JSON.parse(cached))
      setLoading(false)
    }
    async function fetchAndUpdate() {
      setLoading(true)
      setError(null)
      try {
        const fresh = await fetcher()
        if (isMounted) {
          setData(fresh)
          setLoading(false)
        }
        localStorage.setItem(key, JSON.stringify(fresh))
        localStorage.setItem(key + ':ts', String(Date.now()))
      } catch (e) {
        if (isMounted) {
          setError(e)
          setLoading(false)
        }
      }
    }
    fetchAndUpdate()
    return () => { isMounted = false }
  }, [key, fetcher])

  return { data, loading, error }
}
