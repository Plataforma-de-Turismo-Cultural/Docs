import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main
        style={{
          minHeight: "80vh",
          paddingTop: "100px", // espaço abaixo do navbar
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
