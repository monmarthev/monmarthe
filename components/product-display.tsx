"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createCheckoutSession } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  image: string
}

export default function ProductDisplay({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      const url = await createCheckoutSession("price_1RDSpYQTK3FebJtBxPdw0h4d")
      window.location.href = url
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la session de paiement",
        variant: "destructive",
      })
      console.error("Checkout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{product.name}</CardTitle>
        <CardDescription>
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: product.currency,
          }).format(product.price)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative h-[300px] w-full overflow-hidden rounded-md">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>
        <p className="text-gray-700">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCheckout} className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? "Chargement..." : "Acheter maintenant"}
        </Button>
      </CardFooter>
    </Card>
  )
}
