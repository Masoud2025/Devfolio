// components/Header.tsx
'use client'
import { useLang } from '@/context/LangContext'

export default function Header() {
  const { t } = useLang()

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-blue-600">MySite</h1>
      <nav className="flex gap-6">
        <a href="#" className="hover:text-blue-600">{t('about')}</a>
        <a href="#" className="hover:text-blue-600">{t('products')}</a>
        <a href="#" className="hover:text-blue-600">{t('services')}</a>
        <a href="#" className="hover:text-blue-600">{t('contact')}</a>
      </nav>
    </header>
  )
}