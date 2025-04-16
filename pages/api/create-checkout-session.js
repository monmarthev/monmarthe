// pages/api/create-checkout-session.js
import Stripe from "stripe";
import "../styles/memphis.css";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    // Initialiser Stripe avec la clé privée
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { priceId } = req.body;

    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la session de paiement" });
  }
}
