// app/page.tsx
'use client'
import { useLang } from '@/context/LangContext'
import DockNav from '@/components/DockNav'

export default function Home() {
  const { t, theme } = useLang()

  return (
    <main className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          {t('title')}
        </h1>
        <p className={`text-xl transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {t('subtitle')}
        </p>
      </div>
      <DockNav />
    </main>
  )
}