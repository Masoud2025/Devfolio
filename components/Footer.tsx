// components/Footer.tsx
'use client'
import { useLang } from '@/context/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="p-4 bg-gray-800 text-white text-center">
      <p>© 2024 {t('footer')}</p>
    </footer>
  )
}