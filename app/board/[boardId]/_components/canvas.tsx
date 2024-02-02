'use client'

import { useState } from 'react'

import { useCanRedo, useCanUndo, useHistory } from '@/liveblocks.config'
import { CanvasMode, CanvasState } from '@/types/canvas'

import { Info } from './info'
import { Toolbar } from './toolbar'
import { Participants } from './participants'

interface CanvasProps {
  boardId: string
}

export function Canvas({ boardId }: CanvasProps) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />

      <Participants />

      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  )
}
