
// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import ContactSection from "./components/ContactSection";
import Generator from "./pages/Generator";
import About from "./components/AboutSection";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route path="/generator" element={<Generator />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinos" element={<Destinations />} />
            <Route path="/contact" element={<ContactSection />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element=  {<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

