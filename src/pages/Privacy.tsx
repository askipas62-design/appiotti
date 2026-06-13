import React from "react";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] py-20 px-4 font-sans">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white border-4 border-brand-dark rounded-[32px] p-8 md:p-12 shadow-[16px_16px_0px_#1B1B2F]">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b-4 border-brand-dark pb-12">
            <div className="w-20 h-20 bg-brand-orange text-white rounded-2xl flex items-center justify-center shrink-0">
              <Shield size={40} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-brand-dark uppercase tracking-tight leading-none">Politique de Confidentialité</h1>
              <p className="mt-4 text-gray-500 font-mono text-sm uppercase tracking-widest font-bold">Dernière mise à jour : Mai 2026</p>
            </div>
          </div>

          <div className="space-y-10 text-brand-dark">
            <section>
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center text-xs">01</span>
                Collecte des Données
              </h2>
              <p className="text-lg leading-relaxed opacity-80">
                Nous collectons uniquement les informations nécessaires au traitement de vos commandes : nom, prénom, adresse de livraison et adresse e-mail. Nous ne collectons aucune donnée bancaire, puisque les paiements s'effectuent par virement externe.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center text-xs">02</span>
                Utilisation des Données
              </h2>
              <p className="text-lg leading-relaxed opacity-80">
                Vos données sont utilisées exclusivement pour :
              </p>
              <ul className="list-disc ml-8 mt-4 space-y-2 text-lg opacity-80">
                <li>La gestion et le suivi de vos commandes.</li>
                <li>L'expédition de vos colis via nos transporteurs partenaires.</li>
                <li>La communication relative à vos achats (confirmation, suivi).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center text-xs">03</span>
                Conservation
              </h2>
              <p className="text-lg leading-relaxed opacity-80">
                Nous conservons vos données pour la durée légale nécessaire à la gestion comptable et fiscale de notre activité, soit 10 ans pour les factures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center text-xs">04</span>
                Vos Droits
              </h2>
              <p className="text-lg leading-relaxed opacity-80">
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous par e-mail à contact@appiotti-jeux.fr.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
