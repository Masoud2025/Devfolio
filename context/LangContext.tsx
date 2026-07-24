// context/LangContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { words } from '@/lib/words'

type Lang = 'fa' | 'en'
export type Theme = 'dark' | 'light'
type Key = keyof typeof words.fa

interface LangContextType {
  lang: Lang
  theme: Theme
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: Key) => any
  toggleLang: () => void
  toggleTheme: () => void
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa')
  const [theme, setTheme] = useState<Theme>('dark')

  const toggleLang = () => {
    const newLang = lang === 'fa' ? 'en' : 'fa'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
    document.documentElement.dir = newLang === 'fa' ? 'rtl' : 'ltr'
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const t = (key: Key) => words[lang][key]

  return (
    <LangContext.Provider value={{ lang, theme, t, toggleLang, toggleTheme }}>
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