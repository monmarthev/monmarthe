import ProductDisplay from "@/components/product-display"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mon Produit | Boutique en ligne",
  description: "Découvrez et achetez mon produit incroyable",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Ma Boutique en Ligne</h1>
      <ProductDisplay
        product={{
          id: "prod_123",
          name: "Mon Produit Incroyable",
          description: "Une description détaillée de mon produit et de ses caractéristiques exceptionnelles.",
          price: 49.99,
          currency: "EUR",
          image: "/placeholder.svg?height=400&width=600",
        }}
      />
    </main>
  )
}
