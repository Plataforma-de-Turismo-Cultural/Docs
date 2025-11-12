// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Heart, MessageCircle } from "lucide-react";
import axios from "axios";

/**
 * Home (Feed estilo Instagram)
 * - Logs para debugging
 * - Usa campos reais do teu backend (author_username, title, text, destination_name, category_name, likes, comments_count, created_at)
 * - Coloca este ficheiro em src/pages/Home.jsx (sobrescreve)
 */

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/posts/");
      console.log("Posts:", response.data);
    } catch (error) {
      console.error("[Home] erro ao carregar posts:", error);
    }
  };

  fetchPosts();
  useEffect(() => {
  
    console.log("[Home] mount -> a buscar /posts/");
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts/");
        console.log("[Home] resposta /posts/", res);
        // Suporta paginação: res.data.results ou lista simples em res.data
        const data = res.data.results ? res.data.results : res.data;
        console.log("[Home] dados usados:", data);
        setPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[Home] erro ao carregar posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Carregando publicações...
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Ainda não há publicações (ou a API retornou uma lista vazia).
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 flex-col items-center">
      {posts.map((post) => (
        <article
          key={post.id}
           className="w-full max-w-3xl shadow-md rounded-2xl p-6 mb-6"
        >
          {/* Header */}
          <header className="flex items-center p-4">
            <img
              src={post.author_profile_image || "/default-user.png"}
              alt={post.author_username}
              className="w-10 h-10 rounded-full mr-3 object-cover"
              onError={(e) => (e.currentTarget.src = "/default-user.png")}
            />
            <div>
              <div className="font-semibold text-gray-800 dark:text-gray-100">
                @{post.author_username}
              </div>
              <div className="text-xs text-gray-500 dark: text-gray-50">
                {post.destination_name || "Destino não especificado"} ·{" "}
                <span className="italic text-green-600">{post.category_name || "Categoria"}</span>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
              {post.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {post.text}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Heart className="w-5 h-5 text-red-500" />
                <span>{post.likes ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span>{post.comments_count ?? 0}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              {post.created_at ? new Date(post.created_at).toLocaleString("pt-PT") : ""}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
