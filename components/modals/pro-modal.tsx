'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useProModal } from '@/store/use-pro-modal'

export function ProModal() {
  const { isOpen, onClose } = useProModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pro modal</DialogTitle>
        </DialogHeader>

        <DialogDescription>This is a pro modal</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
