import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../contexts/Auth/useAuth";
import { useDashboard } from "../contexts/DashboardContext";
import { type JSX, useState } from "react";
import { getInitials } from "../utils/userUtils";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
  alpha,
  useTheme,
  Typography
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as BellIcon,
  ShoppingCart as CartIcon
} from "@mui/icons-material";
import Logo from "../components/Logo/Logo";
import NotificationCenter from "../components/Notifications/NotificationCenter";
import { useCart } from "../contexts/CartContext";
import { UserRole } from "../Types/auth.types";

const DashboardLayout = (): JSX.Element => {
  const theme = useTheme();
  const { role, userName } = useAuth();
  const { sidebarOpen, toggleSidebar } = useDashboard();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { items } = useCart();
  const cartCount = items.length;


  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getDetectedRole = () => {
    if (role) return role;
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/admin")) return "Admin";
    if (path.includes("/manager")) return "Manager";
    if (path.includes("/vendor")) return "Vendor";
    if (path.includes("/staff")) return "Staff";
    if (path.includes("/customer")) return "Customer";
    return "User";
  };

  const currentRole = getDetectedRole();
  const sidebarWidthFull = 220;
  const sidebarWidthCollapsed = 64;
  const currentSidebarWidth = sidebarOpen ? sidebarWidthFull : sidebarWidthCollapsed;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      {/* Notifications Layer */}
      {isNotificationsOpen && (
        <NotificationCenter onClose={() => setIsNotificationsOpen(false)} />
      )}

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleSidebar}
              sx={{ mr: 1, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
              <Logo />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                sx={{
                  bgcolor: isNotificationsOpen ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  color: isNotificationsOpen ? 'primary.main' : 'inherit'
                }}
              >
                <Badge badgeContent={4} color="error">
                  <BellIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {currentRole === UserRole.CLIENT && (
              <Tooltip title="View Cart">
                <IconButton
                  size="large"
                  sx={{ color: 'inherit' }}
                  onClick={() => navigate('/cart')}
                >
                  <Badge badgeContent={cartCount} color="primary">
                    <CartIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Box
              onClick={handleProfileClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                p: 0.5,
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}
              >
                {getInitials(userName || currentRole)}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                  {userName || 'User'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, md: 3 },
          width: { lg: `calc(100% - ${currentSidebarWidth}px)` },
          mt: '70px', // Header height
          transition: theme.dashboard.transition,
          overflowX: 'hidden', // Prevent horizontal overflow from children
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
