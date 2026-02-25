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
import { Box, Grid, Typography, Button, Avatar, Chip, useTheme, alpha } from "@mui/material";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import Chart from "react-apexcharts";

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const stats = [
    {
      label: "Total Vendors",
      value: "1,234",
      change: "+12%",
      icon: BuildingIcon,
      color: theme.palette.primary.main,
      progress: 75,
      trend: "up" as const
    },
    {
      label: "Total Revenue",
      value: "₹45.2L",
      change: "+18%",
      icon: DollarIcon,
      color: theme.palette.success.main,
      progress: 62,
      trend: "up" as const
    },
    {
      label: "Active Clients",
      value: "8,567",
      change: "+23%",
      icon: UsersIcon,
      color: theme.palette.warning.main,
      progress: 88,
      trend: "up" as const
    },
    {
      label: "Bookings",
      value: "456",
      change: "+15%",
      icon: CalendarIcon,
      color: theme.palette.info.main,
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
      color: theme.palette.primary.main,
      count: 12
    },
    {
      title: "Revenue Report",
      desc: "Export monthly financial growth analysis.",
      icon: ChartIcon,
      color: theme.palette.success.main,
      count: null
    },
    {
      title: "User Audit",
      desc: "System-wide user activity and security log.",
      icon: UsersIcon,
      color: theme.palette.warning.main,
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Revenue Growth</Typography>
              <Chip label="Monthly" size="small" sx={{ fontWeight: 700, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }} />
            </Box>
            <Box sx={{ p: 2 }}>
              <Chart
                options={{
                  chart: {
                    type: 'area',
                    toolbar: { show: false },
                    fontFamily: theme.typography.fontFamily,
                  },
                  colors: [theme.palette.primary.main],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.7,
                      opacityTo: 0.1,
                      stops: [0, 90, 100]
                    }
                  },
                  stroke: { curve: 'smooth', width: 3 },
                  grid: { borderColor: alpha(theme.palette.divider, 0.5), strokeDashArray: 5 },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                  },
                  tooltip: { theme: 'light' }
                }}
                series={[{
                  name: "Revenue",
                  data: [310000, 400000, 350000, 500000, 490000, 620000, 690000, 810000]
                }]}
                type="area"
                height={350}
              />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard sx={{ p: 0, overflow: 'hidden', height: '100%' }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Vendor Matrix</Typography>
            </Box>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', height: 'calc(100% - 75px)' }}>
              <Chart
                options={{
                  chart: { type: 'donut' },
                  labels: ['Venues', 'Catering', 'Photo', 'Decor'],
                  colors: [
                    theme.palette.primary.main,
                    theme.palette.success.main,
                    theme.palette.warning.main,
                    theme.palette.info.main
                  ],
                  legend: { position: 'bottom', fontWeight: 600 },
                  plotOptions: {
                    pie: {
                      donut: {
                        size: '75%',
                        labels: {
                          show: true,
                          total: { show: true, label: 'Total', fontWeight: 800 }
                        }
                      }
                    }
                  },
                  stroke: { show: false }
                }}
                series={[44, 55, 13, 33]}
                type="donut"
              />
            </Box>
          </DashboardCard>
        </Grid>

        {/* Main Activity Column */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Real-time Operations</Typography>
              <Button variant="text" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>Stream Logs</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {recentActivities.map((activity, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{
                    bgcolor: activity.status === 'success' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                    color: activity.status === 'success' ? 'success.main' : 'warning.main',
                    borderRadius: '12px',
                    width: 48,
                    height: 48
                  }}>
                    <ArrowUpIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 700 }}>{activity.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{activity.time}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 0.5 }}>{activity.action}</Typography>
                    <Typography variant="body2" sx={{
                      color: 'text.secondary',
                      bgcolor: alpha(theme.palette.action.hover, 0.5),
                      p: 1.5,
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      border: `1px solid ${theme.dashboard.glassBorder}`
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
                    border: `1px solid ${theme.dashboard.glassBorder}`
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography sx={{ fontWeight: 800 }}>{vendor.name}</Typography>
                      <Typography sx={{ fontWeight: 900, color: 'success.main' }}>{vendor.revenue}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        {vendor.bookings} Bookings
                      </Typography>
                      <Chip label={`★ ${vendor.rating}`} size="small" sx={{
                        height: 24,
                        fontWeight: 700,
                        bgcolor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main
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
                      bgcolor: alpha(card.color, 0.2),
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
        </Grid >
      </Grid >
    </Box >
  );
};

export default AdminDashboard;
