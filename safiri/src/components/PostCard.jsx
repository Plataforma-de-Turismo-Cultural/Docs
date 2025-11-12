import React, { useState } from "react";
import { format } from "date-fns";

const PostCard = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(post.likes ?? 0);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      {/* Cabeçalho do Post */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-200 flex items-center justify-center text-emerald-800">
          {post.user?.avatar ? (
            <img src={post.user.avatar} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            post.user?.name?.[0] ?? "U"
          )}
        </div>
        <div>
          <div className="font-semibold">{post.user?.name || post.user?.username}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">{post.location}</div>
        </div>
        <div className="ml-auto text-sm text-slate-400">
          {post.created_at ? format(new Date(post.created_at), "dd/MM/yyyy") : ""}
        </div>
      </div>

      {/* Corpo */}
      <div className="mt-3 text-slate-700 dark:text-slate-200">
        {post.text?.slice(0, 180)}
        {post.text && post.text.length > 180 ? "..." : ""}
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="mt-3 rounded max-h-60 w-full object-cover"
        />
      )}

      {/* Rodapé */}
      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={() => setLikes((prev) => prev + 1)}
          className="text-sm text-red-500 hover:underline"
        >
          ❤️ {likes}
        </button>
        <button
          onClick={() => setOpen(true)}
          className="text-sm underline text-emerald-600"
        >
          Ver mais
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-3xl w-full z-10 p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{post.user?.name}</h3>
              <button onClick={() => setOpen(false)}>Fechar</button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {post.text}
            </p>
            {post.image && (
              <img
                src={post.image}
                alt="imagem post"
                className="mt-4 rounded max-h-96 w-full object-cover"
              />
            )}
            <div className="mt-4 text-sm text-slate-500">
              Categoria: {post.category || "—"} • Spam: {post.spam ? "Sim" : "Não"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
