'use client'

import { useCallback, useState } from 'react'

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation
} from '@/liveblocks.config'
import { Camera, CanvasMode, CanvasState } from '@/types/canvas'

import { Info } from './info'
import { Toolbar } from './toolbar'
import { Participants } from './participants'
import { CursorsPresence } from './cursors-presence'
import { pointerEventToCanvasPoint } from '@/lib/utils'

interface CanvasProps {
  boardId: string
}

export function Canvas({ boardId }: CanvasProps) {
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      const current = pointerEventToCanvasPoint(e, camera)

      setMyPresence({ cursor: current })
    },
    []
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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

      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="h-[100vh] w-[100vw]"
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`
          }}
        >
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
