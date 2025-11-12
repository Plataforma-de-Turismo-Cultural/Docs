// src/pages/Login.jsx
// Formulário de login: POST /api/login -> guarda token no localStorage via AuthContext.login

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Credenciais inválidas.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-24">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Entrar</h2>
        <form onSubmit={handle}>
          <div className="mb-3">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-emerald-600 text-white rounded"
            >
              {submitting ? "A entrar..." : "Entrar"}
            </button>
            <Link to="/register" className="text-sm underline">
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
