import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, DollarSign, Sparkles } from "lucide-react";



const Generator = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cidade: "",
    dias: 3,
    orcamento: 50000,
    horas_diarias: 8,
    tamanho_grupo: 2,
    idades: "",
    preferencias_texto: "",
  });

  const [loading, setLoading] = useState(false);
  const [roteiro, setRoteiro] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoteiro("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ml/generate_itinerary/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setRoteiro(data.roteiro);
      } else {
        setRoteiro("❌ Erro ao gerar roteiro: " + (data.error || "Desconhecido"));
      }
    } catch {
      setRoteiro("🚫 Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto min-h-[80vh] flex flex-col items-center "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-black-700 dark: text-white-700 flex items-center gap-2">
        Gerador de Roteiro Inteligente
      </h1>

      <motion.form
        onSubmit={handleSubmit}
        className=" shadow-xl rounded-2xl p-6 w-full space-y-4 border border-gray-100 "
        whileHover={{ scale: 1.01 }}
      >
        {/* Campo nome */}
        <div>
          <label className="block font-semibold mb-1">Seu nome</label>
          <input
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex: Ana"
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-blue-500" /> Cidade de destino
          </label>
          <input
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            placeholder="Ex: Luanda, Lisboa, Rio de Janeiro..."
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Dias e orçamento */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1 flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" /> Número de dias
            </label>
            <input
              type="number"
              name="dias"
              value={formData.dias}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-500" /> Orçamento (Kz)
            </label>
            <input
              type="number"
              name="orcamento"
              value={formData.orcamento}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>

        {/* Tamanho do grupo */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-500" /> Quantas pessoas?
          </label>
          <input
            type="number"
            name="tamanho_grupo"
            value={formData.tamanho_grupo}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Preferências */}
        <div>
          <label className="block font-semibold mb-1 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-purple-500" /> Preferências de atividades
          </label>
          <textarea
            name="preferencias_texto"
            value={formData.preferencias_texto}
            onChange={handleChange}
            placeholder="Ex: aventura, natureza, gastronomia, cultura..."
            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-400 outline-none h-24"
          />
        </div>

        {/* Botão de envio */}
        <motion.button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-900 w-full font-semibold shadow-md"
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Gerando roteiro..." : "✨ Gerar Roteiro"}
        </motion.button>
      </motion.form>

      {/* Resultado */}
      {roteiro && (
        <motion.div
          className="mt-6 bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-md w-full border border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-semibold text-green-700 mb-3">Seu roteiro personalizado:</h2>
          <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">{roteiro}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Generator;
