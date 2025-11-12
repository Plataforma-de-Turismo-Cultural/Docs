// src/pages/AdminDashboard.jsx
// Dashboard com gráficos usando Recharts. Usa dados simulados caso a API não responda.
// Endpoints esperados: /statistics/posts, /statistics/users, /statistics/spam

import React, { useEffect, useState } from "react";
import { getPostsStats, getUsersStats, getSpamStats } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Loader from "../components/Loader";

const COLORS = ["#2ecc71", "#f1c40f", "#3498db", "#e74c3c", "#9b59b6"];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [postsStats, setPostsStats] = useState(null);
  const [usersStats, setUsersStats] = useState(null);
  const [spamStats, setSpamStats] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [pRes, uRes, sRes] = await Promise.allSettled([
          getPostsStats(),
          getUsersStats(),
          getSpamStats(),
        ]);

        // Se a API não responder, usamos dados simulados (útil para testes locais)
        setPostsStats(
          pRes.status === "fulfilled"
            ? pRes.value.data
            : {
                total: 128,
                byCategory: [
                  { name: "história", value: 45 },
                  { name: "natureza", value: 30 },
                  { name: "gastronomia", value: 20 },
                  { name: "eventos", value: 18 },
                ],
                monthly: [
                  { month: "Jan", posts: 8 },
                  { month: "Feb", posts: 10 },
                  { month: "Mar", posts: 12 },
                  { month: "Apr", posts: 6 },
                  { month: "May", posts: 10 },
                ],
              }
        );

        setUsersStats(
          uRes.status === "fulfilled"
            ? uRes.value.data
            : { active: 540, newThisMonth: 34 }
        );

        setSpamStats(
          sRes.status === "fulfilled"
            ? sRes.value.data
            : { total_checked: 120, spam_percent: 12.5 }
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-12">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h3 className="font-semibold">Utilizadores ativos</h3>
          <p className="text-3xl font-bold">{usersStats.active}</p>
          <p className="text-sm text-slate-500">Novos este mês: {usersStats.newThisMonth}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h3 className="font-semibold">Total de posts</h3>
          <p className="text-3xl font-bold">{postsStats.total}</p>
          <p className="text-sm text-slate-500">Categorias principais abaixo</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h3 className="font-semibold">Spam detectado</h3>
          <p className="text-3xl font-bold">{spamStats.spam_percent}%</p>
          <p className="text-sm text-slate-500">Verificado: {spamStats.total_checked} posts</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Categorias mais publicadas</h4>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={postsStats.byCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {postsStats.byCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Posts mensais</h4>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={postsStats.monthly}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Tendência de posts</h4>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={postsStats.monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="posts" stroke="#2ecc71" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
