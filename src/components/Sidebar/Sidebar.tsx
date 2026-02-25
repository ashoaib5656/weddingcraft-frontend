import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard as DashboardIcon,
  MessageSquare as ChatIcon,
  Home as HomeIcon,
  LogOut as LogoutIcon,
  User
} from "lucide-react";
import { type JSX } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";
import { MENU_CONFIG, type MenuItem } from "./SidebarConfig";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from "@mui/material";

const Sidebar = (): JSX.Element => {
  const theme = useTheme();
  const { role, logout } = useAuth();
  const { sidebarOpen, closeSidebar } = useDashboard();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentRole = role?.toLowerCase() ||
    (window.location.pathname.includes('/admin') ? 'admin' :
      window.location.pathname.includes('/manager') ? 'manager' :
        window.location.pathname.includes('/vendor') ? 'vendor' :
          window.location.pathname.includes('/staff') ? 'staff' :
            'client');

  const sidebarWidth = 260;
  const collapsedWidth = 72;
  const isExpanded = sidebarOpen || isHovered;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getMenuItems = () => {
    const rolePath = currentRole === 'client' ? 'client' : currentRole;

    // Base menu items that appear for all roles
    const items: MenuItem[] = [
      { text: "Dashboard", icon: <DashboardIcon size={20} />, path: `/${rolePath}-dashboard` }
    ];

    // Role-specific menu items from config
    const roleItems = MENU_CONFIG[currentRole] || [];
    items.push(...roleItems);

    return items;
  };

  const getGlobalItems = () => {
    return [
      { text: "Chatbot", icon: <ChatIcon size={20} />, path: "/chatbot" },
      { text: "Home", icon: <HomeIcon size={20} />, path: "/" },
      { text: "Profile", icon: <User size={20} />, path: "/profile" },
    ];
  };

  const mainMenuItems = getMenuItems();
  const globalItems = getGlobalItems();

  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.path;
    return (
      <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
        <ListItemButton
          component={NavLink}
          to={item.path}
          onClick={() => {
            if (window.innerWidth < 1200) closeSidebar();
          }}
          sx={{
            borderRadius: 0,
            py: 1,
            minHeight: 48,
            justifyContent: isExpanded ? 'initial' : 'center',
            px: 2.5,
            bgcolor: 'transparent',
            color: isActive ? 'primary.main' : 'text.secondary',
            transition: 'color 0.2s',
            '&:hover': {
              bgcolor: 'transparent',
              color: 'primary.main',
              '& .MuiListItemIcon-root': { color: 'primary.main' },
              '& .sidebar-item-underline::after': {
                transform: 'scaleX(1)',
              }
            },
            '&.active': {
              bgcolor: 'transparent',
              color: 'primary.main',
              '& .MuiListItemIcon-root': { color: 'primary.main' },
              '& .sidebar-item-underline::after': {
                transform: 'scaleX(1)',
              }
            }
          }}
        >
          {/* Inner content box — border only spans this element's width */}
          <Box
            className="sidebar-item-underline"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: isExpanded ? 2 : 0,
              pb: 0.75,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                bgcolor: 'primary.main',
                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease-in-out',
              }
            }}
          >
            <ListItemIcon sx={{
              minWidth: 0,
              justifyContent: 'center',
              color: isActive ? 'primary.main' : 'inherit',
              transition: 'color 0.2s'
            }}>
              {item.icon}
            </ListItemIcon>
            {isExpanded && (
              <ListItemText
                primary={item.text}
                sx={{ m: 0 }}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 600,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap'
                }}
              />
            )}
          </Box>
        </ListItemButton>
      </ListItem>
    );
  };


  const drawerContent = (
    <Box
      onMouseEnter={() => !sidebarOpen && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        pt: '80px',
        overflowX: 'hidden',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >

      <List sx={{ px: 1.5, flexGrow: 1, py: 0 }}>
        {mainMenuItems.map(renderMenuItem)}

        <Divider sx={{ my: 2, mx: 1, opacity: 0.6 }} />

        {globalItems.map(renderMenuItem)}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 1,
            py: 1.25,
            minHeight: 48,
            justifyContent: isExpanded ? 'initial' : 'center',
            px: 2.5,
            color: 'error.main',
            '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.08) }
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: isExpanded ? 2 : 'auto', justifyContent: 'center', color: 'inherit' }}>
            <LogoutIcon size={20} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.15s' }}
            primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap' }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: sidebarOpen ? sidebarWidth : collapsedWidth },
        flexShrink: { lg: 0 },
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={sidebarOpen && window.innerWidth < 1200}
        onClose={closeSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: sidebarWidth,
            borderRight: 'none',
            boxShadow: '10px 0 25px rgba(0,0,0,0.05)',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: isExpanded ? sidebarWidth : collapsedWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflowX: 'hidden',
            transition: theme.dashboard.transition,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
