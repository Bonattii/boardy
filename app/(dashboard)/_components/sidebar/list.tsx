'use client'

import { useOrganizationList } from '@clerk/nextjs'
import { Item } from './item'

export function List() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  if (!userMemberships.data?.length) {
    return null
  }

  return (
    <ul className="space-y-4">
      {userMemberships.data.map((userMembership) => (
        <Item
          key={userMembership.organization.id}
          id={userMembership.organization.id}
          name={userMembership.organization.name}
          imageUrl={userMembership.organization.imageUrl}
        />
      ))}
    </ul>
  )
}
