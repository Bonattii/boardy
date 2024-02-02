'use client'

import { memo } from 'react'
import { shallow } from '@liveblocks/client'

import { colorToCss } from '@/lib/utils'
import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config'

import { Cursor } from './cursor'
import { Path } from './path'

function Cursors() {
  const ids = useOthersConnectionIds()

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  )
}

function Drafts() {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor
    }),
    shallow
  )

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              x={0}
              y={0}
              key={key}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss(other.penColor) : '#000'}
            />
          )
        }

        return null
      })}
    </>
  )
}

export const CursorsPresence = memo(function () {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresence'
