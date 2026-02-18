import React from "react";
import {
  People as UsersIcon,
  Business as BuildingIcon,
  AttachMoney as DollarIcon,
  BarChart as ChartIcon,
  CalendarMonth as CalendarIcon,
  Security as ShieldIcon,
  ArrowUpward as ArrowUpIcon,
} from "@mui/icons-material";
import { Box, Grid, Typography, Button, Avatar, Chip } from "@mui/material";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Vendors",
      value: "1,234",
      change: "+12%",
      icon: BuildingIcon,
      color: "#6366f1",
      progress: 75,
      trend: "up" as const
    },
    {
      label: "Total Revenue",
      value: "₹45.2L",
      change: "+18%",
      icon: DollarIcon,
      color: "#10b981",
      progress: 62,
      trend: "up" as const
    },
    {
      label: "Active Clients",
      value: "8,567",
      change: "+23%",
      icon: UsersIcon,
      color: "#f59e0b",
      progress: 88,
      trend: "up" as const
    },
    {
      label: "Bookings",
      value: "456",
      change: "+15%",
      icon: CalendarIcon,
      color: "#3b82f6",
      progress: 94,
      trend: "up" as const
    },
  ];

  const recentActivities = [
    {
      name: "Royal Banquet Hall",
      action: "Vendor Verification",
      time: "2 mins ago",
      status: "pending",
      desc: "Updated venue capacity and license documents."
    },
    {
      name: "Priya & Rahul",
      action: "Booking Confirmed",
      time: "15 mins ago",
      status: "success",
      desc: "Full payment received for Wedding Reception."
    },
    {
      name: "Mahesh Photo",
      action: "Portfolio Update",
      time: "1 hour ago",
      status: "success",
      desc: "Added 24 new high-resolution wedding shots."
    },
  ];

  const topVendors = [
    {
      name: "Royal Banquet Hall",
      category: "Venue",
      bookings: 45,
      revenue: "₹12.5L",
      rating: 4.9,
    },
    {
      name: "Spice Caterers",
      category: "Catering",
      bookings: 52,
      revenue: "₹15.3L",
      rating: 4.7,
    },
  ];

  const actionCards = [
    {
      title: "Verify Assets",
      desc: "Review pending vendor documents and insurance.",
      icon: ShieldIcon,
      color: "#6366f1",
      count: 12
    },
    {
      title: "Revenue Report",
      desc: "Export monthly financial growth analysis.",
      icon: ChartIcon,
      color: "#10b981",
      count: null
    },
    {
      title: "User Audit",
      desc: "System-wide user activity and security log.",
      icon: UsersIcon,
      color: "#f59e0b",
      count: 5
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Admin Command"
        subtitle="Orchestrating system growth and operational excellence."
        tag="Strategic Overview"
        live
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Main Activity Column */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Real-time Operations</Typography>
              <Button variant="text" sx={{ color: 'var(--dash-accent)', fontWeight: 700 }}>Stream Logs</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{
                    bgcolor: activity.status === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: activity.status === 'success' ? '#10b981' : '#f59e0b',
                    borderRadius: '12px',
                    width: 48,
                    height: 48
                  }}>
                    <ArrowUpIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 700 }}>{activity.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)' }}>{activity.time}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'var(--dash-accent)', fontWeight: 600, mb: 0.5 }}>{activity.action}</Typography>
                    <Typography variant="body2" sx={{
                      color: 'var(--dash-text-muted)',
                      bgcolor: 'rgba(0,0,0,0.03)',
                      p: 1,
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}>
                      {activity.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </DashboardCard>
        </Grid>

        {/* Sidebar Insights */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Top Vendors */}
            <DashboardCard>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Revenue Leaders</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {topVendors.map((vendor, index) => (
                  <Box key={index} sx={{
                    p: 2,
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ fontWeight: 800 }}>{vendor.name}</Typography>
                      <Typography sx={{ fontWeight: 900, color: '#10b981' }}>{vendor.revenue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--dash-text-muted)' }}>
                        {vendor.bookings} Bookings
                      </Typography>
                      <Chip label={`★ ${vendor.rating}`} size="small" sx={{
                        height: 24,
                        fontWeight: 700,
                        bgcolor: 'rgba(245, 158, 11, 0.1)',
                        color: '#f59e0b'
                      }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </DashboardCard>

            {/* Operations Hub */}
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Operations Hub</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {actionCards.map((card, index) => (
                  <Button key={index} fullWidth sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    p: 1.5,
                    borderRadius: '12px',
                    bgcolor: 'rgba(255,255,255,0.05)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    color: 'inherit'
                  }}>
                    <Box sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      bgcolor: `${card.color}30`,
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <card.icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{card.title}</Typography>
                        {card.count && (
                          <Chip label={card.count} size="small" sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            bgcolor: card.color,
                            color: 'white'
                          }} />
                        )}
                      </Box>
                    </Box>
                  </Button>
                ))}
              </Box>
            </DashboardCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
