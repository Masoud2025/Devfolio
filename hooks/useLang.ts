'use client'
import { useState, useEffect } from 'react'
import { words } from '@/lib/words'

export function useLang() {
  const [lang, setLang] = useState<'fa'|'en'>('fa')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    const saved = localStorage.getItem('lang') as 'fa'|'en'
    if (saved) setLang(saved)
  }, [])

  const t = (key: keyof typeof words.fa) => words[lang][key]
  
  const toggle = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr'
  }

  return { lang, t, toggle, mounted }
}