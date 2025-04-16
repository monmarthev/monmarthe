// pages/success.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Option : Vérifier les détails de la session auprès de Stripe
      // Dans un cas réel, vous pourriez vouloir vérifier la validité de cette session
      // et récupérer des détails supplémentaires

      // Pour cet exemple, nous simulons simplement un chargement
      setTimeout(() => {
        setOrderDetails({
          email: "client@example.com", // Dans une implémentation réelle, cela viendrait de Stripe
          downloadLink: "/download/memphis-installer.zip", // Lien fictif
        });
        setLoading(false);
      }, 1500);
    }
  }, [session_id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
          {loading ? (
            <div className="text-center py-12">
              <svg
                className="animate-spin h-12 w-12 text-purple-600 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-lg text-gray-600">
                Traitement de votre commande...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="h-10 w-10 text-green-500"
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

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Merci pour votre achat !
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Votre commande a été traitée avec succès. Un email de
                confirmation avec les instructions de téléchargement a été
                envoyé à {orderDetails?.email}.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Prochaines étapes
                </h2>
                <ol className="space-y-4 text-left">
                  <li className="flex">
                    <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <h3 className="font-medium">Téléchargez Memphis</h3>
                      <p className="text-gray-600">
                        Utilisez le lien ci-dessous pour télécharger
                        l'application Memphis.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <h3 className="font-medium">Installez l'application</h3>
                      <p className="text-gray-600">
                        Suivez les instructions d'installation pour votre
                        système d'exploitation.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <h3 className="font-medium">
                        Activez avec votre clé de licence
                      </h3>
                      <p className="text-gray-600">
                        Utilisez la clé de licence envoyée par email pour
                        activer Memphis.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={orderDetails?.downloadLink}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow transition duration-200"
                >
                  Télécharger Memphis
                </a>
                <Link href="/">
                  <a className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow transition duration-200">
                    Retour à l'accueil
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Besoin d'aide ?
          </h2>
          <p className="text-gray-600 mb-4">
            Notre équipe de support est disponible pour vous aider avec
            l'installation et la configuration.
          </p>
          <a
            href="mailto:support@memphis-app.com"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            support@memphis-app.com
          </a>
        </div>
      </div>
    </div>
  );
}
