// src/components/Loader.jsx
// Componente simples de loader animado (usado enquanto carregam dados)

import React from "react";

const Loader = ({ message = "A carregar..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600" />
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{message}</p>
    </div>
  );
};

export default Loader;
