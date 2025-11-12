// src/components/NavBar.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext) || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);
  const handleLogout = () => {
    if (logout) logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-emerald-700 dark:bg-emerald-900 text-white shadow-md z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="font-extrabold text-xl tracking-wide hover:opacity-90"
        >
          Safiri
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-amber-300 transition-colors">
            Home
          </Link>
          <Link to="/generator" className="hover:text-amber-300 transition-colors">
            Roteirizador
          </Link>
          <Link
            to="/destinos"
            className="hover:text-amber-300 transition-colors"
          >
            Destinos
          </Link>
          <Link to="/about" className="hover:text-amber-300 transition-colors">
            Sobre
          </Link>
          <Link
            to="/contact"
            className="hover:text-amber-300 transition-colors"
          >
            Contato
          </Link>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Auth buttons */}
          {user ? (
            <>
              <span className="hidden md:inline-block">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md transition text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 hover:bg-white/20 rounded-md text-sm transition"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-sm transition"
              >
                Registar
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-900 dark:text-slate-100 border-t border-white/20 animate-slideDown">
          <div className="flex flex-col items-start px-6 py-4 space-y-3">
            <Link
              to="/"
              className="hover:text-emerald-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/generator"
              className="hover:text-emerald-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Roteirizador
            </Link>
            <Link
              to="/destinos"
              className="hover:text-emerald-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Destinos
            </Link>
            <Link
              to="/about"
              className="hover:text-emerald-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contact"
              className="hover:text-emerald-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </Link>
            <hr className="w-full border-t border-slate-300 dark:border-slate-700" />
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left hover:text-red-500 transition"
              >
                Sair
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-emerald-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="hover:text-emerald-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Registar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
