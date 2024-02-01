'use client'

import { toast } from 'sonner'
import { FormEventHandler, useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useRenameModal } from '@/store/use-rename-modal'
import { useApiMutation } from '@/hooks/use-api-mutation'

export function RenameModal() {
  const { isOpen, onClose, initialValues } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.update)

  const [title, setTitle] = useState(initialValues.title)

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    mutate({ id: initialValues.id, title })
      .then(() => {
        toast.success('Board title updated!')
        onClose()
      })
      .catch(() => toast.error('Failed to update board title'))
  }

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>

        <DialogDescription>Enter a new title for this board</DialogDescription>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board title"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
