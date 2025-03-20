'use client'

import { useEffect } from 'react'

export function useInfiniteScroll(callback: () => void) {
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return
      callback()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback])
}