'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { words } from '@/lib/words'

type Lang = 'fa' | 'en'
type Key = keyof typeof words.fa

interface LangContextType {
  lang: Lang
  t: (key: Key) => string
  toggleLang: () => void
  
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa')

  const toggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr'
  }

  const t = (key: Key) => words[lang][key]

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) {
    throw new Error('useLang must be used within LangProvider')
  }
  return context
}