import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  X
} from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useDashboard } from "../contexts/DashboardContext";
import { type JSX, useState } from "react";
import { getInitials } from "../utils/userUtils";
import "./DashboardLayout.scss";
import Logo from "../components/Logo/Logo";
import NotificationCenter from "../components/Notifications/NotificationCenter";

const DashboardLayout = (): JSX.Element => {
  const { role, userName } = useAuth();
  const { toggleSidebar, sidebarOpen, closeSidebar } = useDashboard();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Robust role detection fallback based on URL
  const getDetectedRole = () => {
    if (role) return role;

    const path = location.pathname.toLowerCase();
    if (path.includes("/admin")) return "Admin";
    if (path.includes("/manager")) return "Manager";
    if (path.includes("/vendor")) return "Vendor";
    if (path.includes("/staff")) return "Staff";
    if (path.includes("/client") || path.includes("/customer") || path.includes("/products")) return "Client";

    return null;
  };

  const currentRole = getDetectedRole();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-is-open' : ''} ${isSidebarHovered ? 'sidebar-is-hovered' : ''}`}>
      {/* Notifications Layer */}
      {isNotificationsOpen && (
        <NotificationCenter onClose={() => setIsNotificationsOpen(false)} />
      )}
      {/* Full-width Top Header */}
      <header className="dash-header">
        <div className="header-left">
          <div className="header-logo-container">
            <Logo />
          </div>
        </div>

        <div className={`header-right ${isSearchOpen ? 'search-active' : ''}`}>
          <div className={`header-search ${isSearchOpen ? 'mobile-show' : 'mobile-hide'}`}>
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search anything..." autoFocus={isSearchOpen} />
            <button className="search-close-mobile" onClick={() => setIsSearchOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="header-actions">
            <button
              className="mobile-search-toggle"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Toggle Search"
            >
              <Search size={22} />
            </button>

            <button
              className={`notification-btn ${isNotificationsOpen ? 'active' : ''}`}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>

            <button className="mobile-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>

            <div className="profile-trigger" onClick={() => navigate("/profile")}>
              <div className="avatar-initials">{getInitials(userName || currentRole)}</div>
              <div className="profile-info">
                <span className="profile-name">{userName || currentRole}</span>
                <span className="profile-role">{currentRole}</span>
              </div>
              <ChevronDown size={14} color="var(--dash-text-muted)" className="profile-chevron" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area below Header */}
      <div className="dashboard-content-wrapper">
        <div
          className="sidebar-hover-listener"
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
          onClick={closeSidebar}
        />

        <main className="dashboard-main">
          <div className="dash-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
