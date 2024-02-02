'use client'

import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { api } from '@/convex/_generated/api'

import { cn } from '@/lib/utils'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { useProModal } from '@/store/use-pro-modal'

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

export function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const router = useRouter()
  const { onOpen } = useProModal()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    mutate({
      orgId,
      title: 'Untitled'
    })
      .then((id) => {
        toast.success('Board created!')
        router.push(`/board/${id}`)
      })
      .catch(() => {
        toast.error('Failed to create board')
        onOpen()
      })
  }

  return (
    <button
      disabled={disabled || pending}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (disabled || pending) &&
          'opacity-75 cursor-not-allowed hover:bg-blue-600'
      )}
    >
      <div />

      <Plus className="h-12 w-12 text-white stroke-1" />

      <p className="text-sm text-white font-light">New board</p>
    </button>
  )
}
