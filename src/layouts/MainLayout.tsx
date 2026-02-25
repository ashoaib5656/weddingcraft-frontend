import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer/Footer";
import React, { type JSX } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="main-layout">
      <NavBar />
      <main className="main-layout-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
