// components/DockNav.tsx
'use client'
import { useLang } from '@/context/LangContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  MoonIcon,
  SunIcon
  
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeSolid,
  HeartIcon as HeartSolid,
  UserIcon as UserSolid,
} from '@heroicons/react/24/solid'

export default function DockNav() {
  const { lang, toggleLang } = useLang()
  const [active, setActive] = useState('home')
  const [hovered, setHovered] = useState<string | null>(null)

  const items = [
    { id: 'home', icon: HomeIcon, solid: HomeSolid, label: lang === 'fa' ? 'خانه' : 'Home' },
    { id: 'search', icon: MagnifyingGlassIcon, label: lang === 'fa' ? 'جستجو' : 'Search' },
    { id: 'heart', icon: HeartIcon, solid: HeartSolid, label: lang === 'fa' ? 'علاقه‌مندی' : 'Favorites' },
    { id: 'chat', icon: ChatBubbleLeftIcon, label: lang === 'fa' ? 'پیام‌ها' : 'Messages' },
    { id: 'user', icon: UserIcon, solid: UserSolid, label: lang === 'fa' ? 'پروفایل' : 'Profile' },
    { id: 'Theme', icon: MoonIcon, solid: SunIcon, label: lang === 'fa' ? 'تغییر تم' : 'Theme ' },

  ]

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-2xl shadow-2xl rounded-3xl px-3 py-2 flex items-center gap-1 border border-white/30"
      style={{
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.8)'
      }}
    >
      {/* آیتم‌های ناوبری */}
      {items.map((item, index) => {
        const isActive = active === item.id
        const isHovered = hovered === item.id
        const scale = isHovered ? 1.35 : isActive ? 1.2 : 1

        return (
          <motion.div
            key={item.id}
            className="relative"
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setActive(item.id)}
            animate={{ scale }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 15,
              mass: 0.8
            }}
          >
            <motion.button
              className={`
                relative p-3 rounded-2xl transition-colors duration-200
                ${isActive 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }
              `}
              whileTap={{ scale: 0.85 }}
            >
              {/* آیکون */}
              {isActive && item.solid ? (
                <item.solid className="w-6 h-6" />
              ) : (
                <item.icon className="w-6 h-6" />
              )}

              {/* دایره فعال */}
              {isActive && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.8 }}
                  animate={{ opacity: 1, y: -5, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg"
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      {/* جداکننده */}
      <div className="w-px h-10 bg-gray-200/60 mx-1"></div>

      {/* دکمه تغییر زبان با انیمیشن ویژه */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <motion.button
          onClick={toggleLang}
          className="relative p-3 rounded-2xl hover:bg-gradient-to-br hover:from-green-500 hover:to-emerald-600 hover:text-white transition-colors duration-200 text-gray-600"
          whileTap={{ scale: 0.85 }}
          animate={{ rotate: lang === 'fa' ? 0 : 360 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <GlobeAltIcon className="w-6 h-6" />
          
          {/* نشانگر زبان */}
          <motion.span
            className="absolute -top-1 -right-1 text-[10px] bg-gradient-to-br from-blue-500 to-purple-600 text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {lang === 'fa' ? 'فا' : 'EN'}
          </motion.span>
        </motion.button>

        {/* Tooltip زبان */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: -5 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
        >
          {lang === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </motion.div>
      </motion.div>

      {/* افکت دایره‌ای دنبال‌کننده ماوس (اختیاری) */}
      <motion.div
        className="absolute -inset-1 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59,130,246,0.1) 0%, transparent 50%)',
        }}
      />
    </motion.nav>
  )
}