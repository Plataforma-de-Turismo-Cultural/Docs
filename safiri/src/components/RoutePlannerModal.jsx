import React, { useState } from "react";
import { X } from "lucide-react";
import { generateItinerary } from "../services/api";

const RoutePlannerModal = ({ onClose }) => {
  const [form, setForm] = useState({
    preferences: [],
    num_people: "",
    adults: "",
    children: "",
    days: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const togglePreference = (pref) => {
    setForm((prev) => {
      const newPrefs = prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref];
      return { ...prev, preferences: newPrefs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await generateItinerary(form);
      setResult(res.data);
    } catch (err) {
      console.error("Erro ao gerar roteiro:", err);
      setResult({ error: "Falha ao gerar roteiro." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg max-w-lg w-full p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Gerador de Roteiro Turístico ✈️</h2>

        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Tipo de atividades preferidas:
              </label>
              <div className="flex flex-wrap gap-2">
                {["Aventura", "Natureza", "Cultura", "Relaxamento", "Gastronomia"].map(
                  (pref) => (
                    <button
                      type="button"
                      key={pref}
                      onClick={() => togglePreference(pref.toLowerCase())}
                      className={`px-3 py-1 rounded-full border ${
                        form.preferences.includes(pref.toLowerCase())
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {pref}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Número total de pessoas:</label>
                <input
                  type="number"
                  value={form.num_people}
                  onChange={(e) => setForm({ ...form, num_people: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>

              <div>
                <label className="block mb-1">Dias de viagem:</label>
                <input
                  type="number"
                  value={form.days}
                  onChange={(e) => setForm({ ...form, days: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Adultos:</label>
                <input
                  type="number"
                  value={form.adults}
                  onChange={(e) => setForm({ ...form, adults: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-1">Crianças:</label>
                <input
                  type="number"
                  value={form.children}
                  onChange={(e) => setForm({ ...form, children: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Orçamento total (Kz):</label>
              <input
                type="number"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-2 rounded mt-2"
            >
              {loading ? "Gerando roteiro..." : "Gerar roteiro"}
            </button>
          </form>
        ) : (
          <div>
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <>
                <h3 className="font-semibold mb-2">Roteiro sugerido:</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {result.itinerary?.map((item, i) => (
                    <li key={i}>
                      <strong>Dia {item.day}:</strong> {item.activity}
                    </li>
                  ))}
                </ul>

                {result.recommendations && (
                  <>
                    <h4 className="mt-4 font-semibold">Recomendações:</h4>
                    <ul className="list-disc pl-5 text-sm">
                      {result.recommendations.map((r, i) => (
                        <li key={i}>
                          {r.name} ({r.category})
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <button
                  onClick={() => setResult(null)}
                  className="mt-4 w-full bg-gray-200 py-2 rounded"
                >
                  Gerar novo roteiro
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePlannerModal;
