// src/pages/Recommendations.jsx
// Chama GET /api/ml/recommendations/{user_id} e lista lugares sugeridos.

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getRecommendations } from "../services/api";
import Loader from "../components/Loader";

const Recommendations = () => {
  const { user } = useContext(AuthContext);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const res = await getRecommendations(user.id);
        setRecs(res.data);
      } catch (err) {
        console.error("Erro recomendações:", err);
        setRecs([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">
      <h2 className="text-2xl font-bold mb-4">Recomendações para ti</h2>
      {loading ? (
        <Loader />
      ) : recs.length === 0 ? (
        <p>Sem recomendações por enquanto.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recs.map((r) => (
            <div
              key={r.id || r.name}
              className="bg-white dark:bg-slate-800 p-4 rounded shadow"
            >
              <h3 className="font-semibold">{r.name}</h3>
              <p className="text-sm text-slate-600">{r.description}</p>
              <p className="text-xs mt-2 text-slate-500">Local: {r.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
