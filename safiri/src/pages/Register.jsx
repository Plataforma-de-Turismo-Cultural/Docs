// src/pages/Register.jsx
// Formulário de registo: POST /api/register -> guarda token e redireciona

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setPayload((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(payload);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Erro no registo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-24">
      <div className="bg-white dark:bg-slate-800 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Registar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm">Nome</label>
            <input
              name="name"
              value={payload.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Email</label>
            <input
              name="email"
              type="email"
              value={payload.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm">Password</label>
            <input
              name="password"
              type="password"
              value={payload.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded bg-slate-50 dark:bg-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            {submitting ? "A registar..." : "Registar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
