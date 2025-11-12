import React, { useEffect, useState } from "react";
import DestinationCard from "../components/DestinationCard"
import RoutePlannerModal from "../components/RoutePlannerModal";
import { getDestinations } from "../services/api";

const Destinations = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPlanner, setShowPlanner] = useState(false);

  useEffect(() => {
    loadFeatured();
  }, []);

  const loadFeatured = async () => {
    setLoading(true);
    try {
      const res = await getDestinations(1, 6); // ou endpoint especial /featured/
      const data = res.data.results ?? res.data;
      setFeatured(data.slice(0, 6));
    } catch (err) {
      console.error("Erro ao carregar destinos:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-10 bg-sandy-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Destinos em Destaque 
        </h1>

        {loading && <p className="text-center text-gray-500">A carregar...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </div>

      {/* Botão flutuante para abrir o gerador */}
      <button
        onClick={() => setShowPlanner(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        Quer um roteiro turístico?
      </button>

      {showPlanner && <RoutePlannerModal onClose={() => setShowPlanner(false)} />}
    </div>
  );
};

export default Destinations;
