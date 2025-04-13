"use server"
import Stripe from "stripe"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
}

export async function createCheckoutSession(priceId: string): Promise<string> {
  // Déterminer dynamiquement l'URL de base
  const headersList = headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const baseUrl = `${protocol}://${host}`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
    })

    if (!session.url) {
      throw new Error("Impossible de créer la session de paiement")
    }

    return session.url
  } catch (error) {
    console.error("Stripe error:", error)
    throw new Error("Erreur lors de la création de la session de paiement")
  }
}
