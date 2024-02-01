'use client'

import { Info } from './info'
import { Toolbar } from './toolbar'
import { Participants } from './participants'

interface CanvasProps {
  boardId: string
}

export function Canvas({ boardId }: CanvasProps) {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
