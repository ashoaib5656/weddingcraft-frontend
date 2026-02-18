import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import {
  LayoutDashboard,
  Package,
  Users,
  ReceiptIndianRupee,
  MessageSquare,
  Home,
  LogOut
} from "lucide-react";
import { type JSX } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { getInitials } from "../../utils/userUtils";

const Sidebar = (): JSX.Element => {
  const { role, logout, userName } = useAuth();
  const { sidebarOpen, closeSidebar } = useDashboard();
  const nav = useNavigate();
  const location = useLocation();

  // Robust role detection fallback based on URL
  const getDetectedRole = () => {
    if (role) return role.toLowerCase();

    // Fallback based on pathname if role is null (e.g. during refresh)
    const path = location.pathname.toLowerCase();
    if (path.includes("/admin")) return "admin";
    if (path.includes("/manager")) return "manager";
    if (path.includes("/vendor")) return "vendor";
    if (path.includes("/staff")) return "staff";
    if (path.includes("/client") || path.includes("/customer") || path.includes("/products")) return "client";

    return null;
  };

  const currentRole = getDetectedRole();

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  const getMenuItems = () => {
    const items = [];

    // Dashboard path mapping
    let dashboardPath = `/${currentRole}-dashboard`;
    if (currentRole === "customer" || currentRole === "client") {
      dashboardPath = "/client-dashboard";
    }

    if (currentRole) {
      items.push({ text: "Dashboard", icon: <LayoutDashboard size={22} />, path: dashboardPath });
    }

    switch (currentRole) {
      case "admin":
        items.push(
          { text: "Master", icon: <Package size={22} />, path: "/admin/master" },
          { text: "Inventory", icon: <Package size={22} />, path: "/admin/inventory" },
          { text: "Users", icon: <Users size={22} />, path: "/admin/users" },
          { text: "Bills", icon: <ReceiptIndianRupee size={22} />, path: "/admin/bills" }
        );
        break;
      case "manager":
        items.push(
          { text: "Inventory", icon: <Package size={22} />, path: "/manager/inventory" },
          { text: "Bills", icon: <ReceiptIndianRupee size={22} />, path: "/manager/bills" }
        );
        break;
      case "staff":
        items.push(
          { text: "Inventory", icon: <Package size={22} />, path: "/staff/inventory" }
        );
        break;
      case "vendor":
        items.push(
          { text: "Bills", icon: <ReceiptIndianRupee size={22} />, path: "/vendor/bills" }
        );
        break;
      case "customer":
      case "client":
        items.push(
          { text: "Products", icon: <Package size={22} />, path: "/products" },
          { text: "My Bills", icon: <ReceiptIndianRupee size={22} />, path: "/customer/bills" }
        );
        break;
    }
    return items;
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>

      <nav className="sidebar-nav">
        <div className="nav-group">
          {/* <div className="nav-label">Main Menu</div> */}
          {menuItems.map((item) => {
            const isDashboard = item.text === "Dashboard";

            if (isDashboard) {
              return (
                <NavLink
                  key={item.text}
                  to={item.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={closeSidebar}
                >
                  <div className="nav-icon-container">{item.icon}</div>
                  <span className="nav-text">{item.text}</span>
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.text}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                <div className="nav-icon-container">{item.icon}</div>
                <span className="nav-text">{item.text}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="nav-group">
          {/* <div className="nav-label">Support</div> */}
          <NavLink
            to="/chatbot"
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            <div className="nav-icon-container">
              <MessageSquare size={22} />
            </div>
            <span className="nav-text">Chatbot</span>
          </NavLink>
          <NavLink
            to="/"
            className="nav-item"
            onClick={closeSidebar}
          >
            <div className="nav-icon-container">
              <Home size={22} />
            </div>
            <span className="nav-text">Home</span>
          </NavLink>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div
          className="sidebar-profile-section"
          onClick={() => {
            nav("/profile");
            closeSidebar();
          }}
        >
          <div className="avatar-initials">{getInitials(userName || currentRole)}</div>
          <div className="footer-text-content">
            <div className="footer-profile-name">{userName || currentRole}</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="sidebar-logout-btn"
        >
          <div className="nav-icon-container">
            <LogOut size={20} />
          </div>
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
