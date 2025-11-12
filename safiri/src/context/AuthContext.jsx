// src/context/AuthContext.jsx
// Gerencia autenticacao e estado do utilizador usando Context API.
// Expondo: user, token, login, logout, register, getUser.

import React, { createContext, useState, useEffect } from "react";
import {
  loginRequest,
  registerRequest,
  getUserData,
  api,
} from "../services/api";

export const AuthContext = createContext();

/**
 * AuthProvider envolve a aplicacao e fornece estado de autenticacao.
 * Guarda o token em localStorage e fornece funcoes para login/logout/register.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // dados do utilizador
  const [loading, setLoading] = useState(true); // para mostrar loader enquanto verifica token

  useEffect(() => {
    // On mount, tenta carregar user a partir do token (se existir)
    const token = localStorage.getItem("token");
    if (token) {
      // getUserData usa o interceptor para enviar o token
      getUserData()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          // token invalido -> remove
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  // Funcao de login: chama o backend, guarda token e user
  const login = async (email, password) => {
    const res = await loginRequest({ email, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    // carregar user
    const userRes = await getUserData();
    setUser(userRes.data);
    return userRes.data;
  };

  // Funcao de registo
  const register = async (payload) => {
    const res = await registerRequest(payload);
    const { token } = res.data;
    localStorage.setItem("token", token);
    const userRes = await getUserData();
    setUser(userRes.data);
    return userRes.data;
  };

  // Logout simples: remove token e limpa user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // opcional: limpar interceptors ou redirect feito na UI
  };

  // Recarregar dados do user (util apos edicao de perfil)
  const getUser = async () => {
    const res = await getUserData();
    setUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
