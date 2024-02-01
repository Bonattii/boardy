'use client'

import { useSelf } from '@/liveblocks.config'

import { Info } from './info'
import { Toolbar } from './toolbar'
import { Participants } from './participants'

interface CanvasProps {
  boardId: string
}

export function Canvas({ boardId }: CanvasProps) {
  const info = useSelf((me) => me.info)

  console.log('User Info', info)

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
