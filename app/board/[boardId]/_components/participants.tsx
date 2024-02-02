'use client'

import { connectionIdToColor } from '@/lib/utils'
import { useOthers, useSelf } from '@/liveblocks.config'

import { UserAvatar } from './user-avatar'

// Without the current user, we can show 2 users at most
const MAX_SHOWN_USERS = 2

export function Participants() {
  const users = useOthers()
  const currentUser = useSelf()

  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || 'A'}
            borderColor={connectionIdToColor(connectionId)}
          />
        ))}

        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            fallback={currentUser.info?.name?.[0]}
            name={`${currentUser.info?.name} (You)`}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  )
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  )
}
