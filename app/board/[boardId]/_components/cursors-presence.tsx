'use client'

import { memo } from 'react'

import { useOthersConnectionIds } from '@/liveblocks.config'

import { Cursor } from './cursor'

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

export const CursorsPresence = memo(function () {
  return (
    <>
      {/* TODO: Draft pencil */}
      <Cursors />
    </>
  )
})

CursorsPresence.displayName = 'CursorsPresence'
