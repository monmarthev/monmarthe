import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Ces valeurs devront être remplacées par vos clés réelles
  const stripePublicKey = "votre_clé_publique_stripe";
  const priceId = "votre_price_id";

  const handlePurchase = async () => {
    setLoading(true);

    try {
      // Initialiser Stripe avec la clé publique
      const stripe = await loadStripe(stripePublicKey);

      // Faire une requête à votre API backend pour créer une session de paiement
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: priceId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const session = await response.json();

      // Rediriger vers Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
        alert("Erreur lors de la redirection vers le paiement.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">Memphis</span>
          </div>
          <nav className="flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600">
              Fonctionnalités
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">
              Tarifs
            </a>
            <a href="#faq" className="text-gray-600 hover:text-purple-600">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Memphis: Le gestionnaire de presse-papier intelligent pour votre
            productivité
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Ne perdez plus jamais vos copier-coller. Memphis mémorise tout ce
            que vous copiez et vous permet d'y accéder instantanément.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg transition duration-200 transform hover:-translate-y-1"
            >
              {loading ? "Chargement..." : "Acheter maintenant - 9,99€"}
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fonctionnalités principales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Historique illimité
              </h3>
              <p className="text-gray-600">
                Conservez un historique complet de tous vos éléments copiés,
                accessibles à tout moment.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Recherche intelligente
              </h3>
              <p className="text-gray-600">
                Retrouvez instantanément n'importe quel élément grâce à notre
                moteur de recherche puissant.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sécurité des données
              </h3>
              <p className="text-gray-600">
                Toutes vos données sont cryptées et restent sur votre appareil
                pour une confidentialité totale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Un prix simple
          </h2>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 bg-purple-600 sm:p-10 sm:pb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl leading-8 font-extrabold text-white sm:text-3xl sm:leading-9">
                  Achat unique
                </h3>
                <div className="text-5xl leading-none font-extrabold text-white">
                  9,99€
                </div>
              </div>
            </div>
            <div className="px-6 pt-6 pb-8 bg-gray-50 sm:p-10">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    Achat unique, pas d'abonnement
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    Toutes les fonctionnalités incluses
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    Mises à jour gratuites à vie
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    Support client prioritaire
                  </p>
                </li>
              </ul>
              <div className="mt-8">
                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition duration-200"
                >
                  {loading ? "Chargement..." : "Acheter maintenant"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Comment Memphis fonctionne-t-il?
              </h3>
              <p className="text-gray-600">
                Memphis fonctionne en arrière-plan et capture automatiquement
                tout ce que vous copiez dans le presse-papier. Vous pouvez
                ensuite accéder à votre historique complet via un raccourci
                clavier simple ou l'interface de l'application.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Est-ce que Memphis fonctionne sur tous les systèmes
                d'exploitation?
              </h3>
              <p className="text-gray-600">
                Oui, Memphis est disponible pour Windows, macOS et Linux. Votre
                licence unique vous permet d'utiliser l'application sur tous vos
                appareils.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Mes données sont-elles sécurisées avec Memphis?
              </h3>
              <p className="text-gray-600">
                Absolument. Toutes vos données sont stockées localement sur
                votre appareil et sont entièrement cryptées. Memphis n'envoie
                jamais vos données de presse-papier vers des serveurs externes.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Puis-je synchroniser mon historique entre plusieurs appareils?
              </h3>
              <p className="text-gray-600">
                Oui, Memphis offre une synchronisation optionnelle via votre
                propre stockage cloud (Google Drive, Dropbox, etc.) pour
                garantir que vos données restent sous votre contrôle tout en
                étant disponibles sur tous vos appareils.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à révolutionner votre flux de travail?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Rejoignez des milliers d'utilisateurs satisfaits qui ont transformé
            leur productivité grâce à Memphis.
          </p>
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="px-8 py-3 bg-white hover:bg-gray-100 text-purple-600 font-medium rounded-lg shadow-lg transition duration-200"
          >
            {loading ? "Chargement..." : "Acheter Memphis - 9,99€"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <span className="text-2xl font-bold text-white">Memphis</span>
              <p className="mt-2 text-gray-400">
                Le gestionnaire de presse-papier intelligent
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Tutoriels
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Légal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Confidentialité
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Conditions d'utilisation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Memphis. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
