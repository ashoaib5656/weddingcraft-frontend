import { Outlet } from "react-router-dom";
import { type JSX } from "react";

const AuthLayout = (): JSX.Element => {
  return (
    <div className="auth-layout" style={{ minHeight: "100vh" }}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
