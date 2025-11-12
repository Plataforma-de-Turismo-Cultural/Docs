// src/services/api.js
// Configuração do Axios para comunicar com o backend Django.
// Inclui interceptors para enviar o token JWT automaticamente.
// Exporta também funções utilitárias para endpoints ML.

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api", // ajuste se necessário
});

// Adiciona token JWT (se existir) a todas as requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getDestinations = async () => {
  try {
    const response = await api.get("destinations/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar destinos:", error);
    throw error;
  }
};

// Endpoints principais
export const classifyPost = (text) => api.post("/ml/classify", { text });
export const getRecommendations = (userId) =>
  api.get(`/ml/recommendations/${userId}`);

// Outros endpoints usados pela app
// Endpoints principais
export const getPosts = () => api.get("/posts/posts/");
export const createPost = (formData) =>
  api.post("/posts/posts/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const loginRequest = (payload) => api.post("/login", payload);
export const registerRequest = (payload) => api.post("/register", payload);
export const getUserData = () => api.get("/user"); // endpoint para obter user autenticado

// Estatísticas para o dashboard
export const getPostsStats = () => api.get("/statistics/posts");
export const getUsersStats = () => api.get("/statistics/users");
export const getSpamStats = () => api.get("/statistics/spam");

export const generateItinerary = (payload) =>
  api.post("/ml/generate_itinerary/", payload);
