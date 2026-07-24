// components/Card.tsx
'use client'
import { useLang } from '@/context/LangContext'

interface CardProps {
  title: keyof typeof import('@/lib/words').fa
  description: keyof typeof import('@/lib/words').fa
}

export default function Card({ title, description }: CardProps) {
  const { t } = useLang()

  return (
    <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{t(title)}</h3>
      <p className="text-gray-600">{t(description)}</p>
    </div>
  )
}