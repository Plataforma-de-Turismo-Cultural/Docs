// src/components/ProtectedRoute.jsx
// Rota protegida: apenas acessível se o utilizador estiver autenticado.
// Usa react-router-dom v6+.

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/**
 * Use ProtectedRoute em vez de Route element={...}
 * Exemplo:
 * <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
 *
 * Aqui usamos Outlet para rotas aninhadas ou
 * retornamos <Navigate to="/login" /> quando não autenticado.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-8">A carregar...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
