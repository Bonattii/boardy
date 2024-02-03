'use node'

import Stripe from 'stripe'
import { v } from 'convex/values'

import { action } from './_generated/server'

const url = process.env.NEXT_PUBLIC_APP_URL
const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2023-10-16'
})

export const pay = action({
  args: { orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    if (!args.orgId) {
      throw new Error('Organization ID is required')
    }

    const session = await stripe.checkout.sessions.create({
      success_url: url,
      cancel_url: url,
      customer_email: identity.email,
      line_items: [
        {
          price_data: {
            currency: 'BRL',
            product_data: {
              name: 'Boardy Pro',
              description: 'Unlimited boards for your organization'
            },
            unit_amount: 3000,
            recurring: {
              interval: 'month'
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        orgId: args.orgId
      },
      mode: 'subscription'
    })

    return session.url!
  }
})
