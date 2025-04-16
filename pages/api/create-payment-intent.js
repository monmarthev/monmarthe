import Stripe from "stripe";

// Remplacez par votre clé secrète Stripe
const stripe = new Stripe(process.env.SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { paymentMethodId, amount } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "eur", // Remplacez par la devise souhaitée
        payment_method: paymentMethodId,
        confirmation_method: "manual",
        confirm: true,
      });

      res.status(200).json(paymentIntent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
