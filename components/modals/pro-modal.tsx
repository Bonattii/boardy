'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useAction } from 'convex/react'
import { Poppins } from 'next/font/google'
import { useOrganization } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { useProModal } from '@/store/use-pro-modal'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export function ProModal() {
  const [pending, setPending] = useState(false)

  const pay = useAction(api.stripe.pay)
  const { isOpen, onClose } = useProModal()
  const { organization } = useOrganization()

  const onClick = async () => {
    if (!organization?.id) {
      return
    }

    setPending(true)

    try {
      const redirectUrl = await pay({ orgId: organization.id })

      window.location.href = redirectUrl
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[340px] p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image fill src="/pro.svg" alt="pro" className="object-fit" />
        </div>

        <div
          className={cn(
            'text-neutral-700 mx-auto space-y-6 p-6',
            font.className
          )}
        >
          <h2 className="font-medium text-lg">🚀 Upgrade to Pro today!</h2>

          <div className="pl-3">
            <ul className="text-[11px] space-y-1 list-disc">
              <li>Unlimited tools</li>
              <li>Unlimited boards</li>
              <li>Unlimited members</li>
              <li>Unlimited organizations</li>
            </ul>
          </div>

          <Button
            size="sm"
            className="w-full"
            onClick={onClick}
            disabled={pending}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
