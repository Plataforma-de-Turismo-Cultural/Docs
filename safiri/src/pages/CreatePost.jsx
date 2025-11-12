// src/pages/CreatePost.jsx
import React, { useState, useContext } from "react";
import { createPost, classifyPost } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const culturalLocations = [
  "Fortaleza de São Miguel",
  "Museu Nacional",
  "Igreja Nossa Senhora",
  "Parque Natural",
  "Mercado Tradicional",
];

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [location, setLocation] = useState(culturalLocations[0]);
  const [mediaFiles, setMediaFiles] = useState([]); // fotos e vídeos
  const [submitting, setSubmitting] = useState(false);
  const [classification, setClassification] = useState(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return alert("Escreve uma descrição antes de enviar.");

    const formData = new FormData();
    formData.append("text", text);
    formData.append("location", location);

    mediaFiles.forEach((file) => {
      formData.append("media", file); // envia múltiplos arquivos com o mesmo campo
    });

    try {
      setSubmitting(true);
      // 1️⃣ cria post
      const createRes = await createPost(formData);
      // 2️⃣ classifica o texto
      const mlRes = await classifyPost(text);
      setClassification(mlRes.data);

      alert(`A publicação foi classificada como ${mlRes.data.categoria}.`);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar publicação.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">
      <h2 className="text-2xl font-bold mb-4">Criar Publicação</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-6 rounded shadow"
      >
        {/* Descrição */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
            rows={5}
            placeholder="Conta algo interessante sobre o local..."
          />
        </div>

        {/* Localidade */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Localidade</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
          >
            {culturalLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Fotos e vídeos */}
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Fotos e Vídeos (opcional)
          </label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="mt-1"
          />
          {mediaFiles.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {mediaFiles.length} ficheiro(s) selecionado(s)
            </p>
          )}
        </div>

        {/* Botão */}
        <div className="flex items-center gap-3">
          <button
            disabled={submitting}
            type="submit"
            className="px-4 py-2 rounded bg-emerald-600 text-white"
          >
            {submitting ? "Enviando..." : "Publicar"}
          </button>
          {classification && (
            <div className="text-sm text-slate-600">
              Classificação: <strong>{classification.categoria}</strong>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
