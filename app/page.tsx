import ProductDisplay from "@/components/product-display"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Monmarthe",
  description: "Applications de productivité",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Applications</h1>
      <ProductDisplay
        product={{
          id: "1",
          name: "Horae",
          description: "Application de gestion de temps et de tâches", 
          price: 10,
          currency: "EUR",
          image: "/placeholder.svg?height=400&width=600",
        }}
      />
    </main>
  )
}
