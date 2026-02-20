'use client'

import { Lock, Crown } from 'lucide-react'
import Link from 'next/link'
import { usePremium } from '@/context/PremiumContext'

interface PremiumLockProps {
  children: React.ReactNode
  label?: string
}

export default function PremiumLock({ children, label = 'Contenido Premium' }: PremiumLockProps) {
  const { isPremium } = usePremium()

  if (isPremium) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-sm opacity-40">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-primary/60 rounded-2xl">
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-accent-blue/20 flex items-center justify-center">
            <Lock className="w-7 h-7 text-accent-blue" />
          </div>
          <p className="text-text-primary font-heading font-semibold text-lg">{label}</p>
          <p className="text-text-secondary text-sm max-w-xs">
            Desbloquea todo el contenido con el plan Premium
          </p>
          <Link
            href="/planes"
            className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue hover:bg-blue-600 text-white rounded-full font-semibold text-sm transition-colors"
          >
            <Crown className="w-4 h-4" />
            Ver planes
          </Link>
        </div>
      </div>
    </div>
  )
}
