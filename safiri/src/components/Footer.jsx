// src/components/Footer.jsx
// Rodapé informativo com contacto e créditos.

import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h4 className="font-semibold">EcoTour</h4>
            <p className="text-sm">Promoção do turismo e património cultural.</p>
          </div>
          <div className="text-sm mt-4 md:mt-0">
            <p>Contacto: info@ecotour.example</p>
            <p className="text-xs mt-1">© {new Date().getFullYear()} EcoTour</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
