// src/pages/Profile.jsx
// Mostra dados do utilizador autenticado e os seus posts.
// Assumimos que a API tem endpoint /user/posts ou filtra posts por token.

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, getUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserPosts = async () => {
    try {
      setLoading(true);
      // endpoint esperado: /posts?user_id=me ou /user/posts
      const res = await api.get("/user/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Erro ao carregar posts do perfil:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserPosts();
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-12">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Perfil</h2>
        <p className="mt-2 text-sm text-slate-600">
          Nome: {user?.name || user?.username}
        </p>
        <p className="text-sm text-slate-600">Email: {user?.email}</p>
        <button
          className="mt-3 px-3 py-1 bg-emerald-500 text-white rounded"
          onClick={getUser}
        >
          Recarregar dados
        </button>
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-3">As minhas publicações</h3>
        {loading ? (
          <Loader />
        ) : posts.length === 0 ? (
          <p>Nenhuma publicação ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
