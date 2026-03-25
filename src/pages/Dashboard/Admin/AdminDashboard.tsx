import React from "react";
import {
  People as UsersIcon,
  Business as BuildingIcon,
  AttachMoney as DollarIcon,
  BarChart as ChartIcon,
  CalendarMonth as CalendarIcon,
  Security as ShieldIcon,
  CheckCircle as SuccessIcon,
  HourglassEmpty as PendingIcon,
  CloudUpload as UploadIcon,
} from "@mui/icons-material";
import { Box, Grid, Typography, Button, Avatar, useTheme, alpha, keyframes } from "@mui/material";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import Chart from "react-apexcharts";

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`;


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
      icon: PendingIcon,
      desc: "Updated venue capacity and license documents."
    },
    {
      name: "Priya & Rahul",
      action: "Booking Confirmed",
      time: "15 mins ago",
      status: "success",
      icon: SuccessIcon,
      desc: "Full payment received for Wedding Reception."
    },
    {
      name: "Mahesh Photo",
      action: "Portfolio Update",
      time: "1 hour ago",
      status: "info",
      icon: UploadIcon,
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
    <Box sx={{ p: 0, maxWidth: 1600, margin: '0 auto' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 900, 
            mb: 4, 
            letterSpacing: '-0.02em',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}
        >
          Admin Dashboard
        </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <DashboardCard noPadding>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Revenue Growth</Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 900, 
                  color: theme.palette.primary.main, 
                  textTransform: 'uppercase', 
                  fontSize: '0.65rem' 
                }}
              >
                Monthly
              </Typography>
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
          <DashboardCard noPadding sx={{ minHeight: 520 }}>
            <Box sx={{ p: 3, borderBottom: `1px solid ${theme.dashboard.glassBorder}` }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Vendor Matrix</Typography>
            </Box>
            <Box 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                animation: `${slideIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1) both`,
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }
              }}
            >
              <Chart
                options={{
                  chart: { 
                    type: 'pie',
                    fontFamily: theme.typography.fontFamily,
                    animations: {
                      enabled: true,
                      speed: 800,
                      animateGradually: { enabled: true, delay: 150 },
                      dynamicAnimation: { enabled: true, speed: 350 }
                    },
                    dropShadow: {
                      enabled: true,
                      blur: 15,
                      left: 0,
                      top: 10,
                      opacity: 0.1
                    }
                  },
                  labels: ['Venues', 'Catering', 'Photography', 'Decor', 'Makeup', 'Planners'],
                  colors: [
                    theme.palette.primary.main,    // Violet
                    theme.palette.success.main,    // Emerald
                    theme.palette.warning.main,    // Amber
                    theme.palette.info.main,       // Cyan
                    '#f472b6',                     // Pink (Wedding Accent)
                    theme.palette.secondary.main   // Indigo
                  ],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shade: 'light',
                      type: 'vertical',
                      shadeIntensity: 0.1,
                      gradientToColors: [
                        alpha(theme.palette.primary.main, 0.7),
                        alpha(theme.palette.success.main, 0.7),
                        alpha(theme.palette.warning.main, 0.7),
                        alpha(theme.palette.info.main, 0.7),
                        alpha('#f472b6', 0.7),
                        alpha(theme.palette.secondary.main, 0.7)
                      ],
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 0.85,
                      stops: [0, 100]
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    formatter: (_, opts) => opts.w.config.labels[opts.seriesIndex],
                    style: {
                      fontSize: '13px',
                      fontWeight: 800,
                      fontFamily: theme.typography.fontFamily,
                      colors: [theme.palette.text.secondary]
                    },
                    dropShadow: { enabled: false }
                  },
                  plotOptions: {
                    pie: {
                      customScale: 0.8,
                      expandOnClick: true,
                      dataLabels: {
                        offset: 45,
                        minAngleToShowLabel: 5
                      }
                    }
                  },
                  legend: { 
                    show: true,
                    position: 'bottom', 
                    offsetY: -25,
                    fontWeight: 700,
                    fontSize: '13px',
                    fontFamily: theme.typography.fontFamily,
                    itemMargin: { horizontal: 8, vertical: 4 },
                    markers: { size: 8 }
                  },
                  stroke: { 
                    show: true, 
                    width: 2, 
                    colors: [theme.palette.background.paper] 
                  },
                  tooltip: { theme: 'light' }
                }}
                series={[44, 55, 13, 33, 22, 18]}
                type="pie"
                height={410}
              />
            </Box>
          </DashboardCard>
        </Grid>

        {/* Main Activity Column */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Real-time Operations</Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  color: theme.palette.primary.main, 
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  fontWeight: 700,
                  borderRadius: '8px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }
                }}
              >
                Stream Logs
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon;
                const paletteColor = activity.status === 'success' 
                  ? theme.palette.success 
                  : activity.status === 'pending' 
                    ? theme.palette.warning 
                    : theme.palette.info;
                    
                return (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      gap: 2,
                      p: 1.5,
                      borderRadius: '16px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid transparent',
                      animation: `${slideIn} 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.background.paper, 0.4),
                        border: `1px solid ${theme.dashboard.glassBorder}`,
                        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <Avatar sx={{
                        bgcolor: alpha(paletteColor.main, 0.1),
                        color: paletteColor.main,
                        borderRadius: '12px',
                        width: 44,
                        height: 44,
                        boxShadow: `inset 0 0 0 1px ${alpha(paletteColor.main, 0.2)}`
                      }}>
                        <IconComponent sx={{ fontSize: '1.25rem' }} />
                      </Avatar>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5, alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', color: 'text.primary' }}>
                          {activity.name}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            fontWeight: 900, 
                            color: 'text.secondary', 
                            textTransform: 'uppercase', 
                            fontSize: '0.65rem' 
                          }}
                        >
                          {activity.time}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: paletteColor.main, 
                          fontWeight: 800, 
                          mb: 0.5, 
                          display: 'inline-block',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {activity.action}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: 'text.secondary',
                          bgcolor: alpha(theme.palette.background.default, 0.2),
                          p: 1.25,
                          px: 1.5,
                          borderRadius: '10px',
                          fontSize: '0.8125rem',
                          border: `1px solid ${theme.dashboard.glassBorder}`,
                          borderLeft: `3px solid ${paletteColor.main}`,
                          lineHeight: 1.5
                        }}
                      >
                        {activity.desc}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
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
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 900, 
                          color: 'warning.main', 
                          textTransform: 'uppercase', 
                          fontSize: '0.65rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.2
                        }}
                      >
                        ★ {vendor.rating}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </DashboardCard>

            {/* Operations Hub */}
            <DashboardCard variant="glass" sx={{ 
              position: 'relative',
              overflow: 'hidden',
              minHeight: '100%',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.1)}`,
              }
            }}>
              {/* Subtle Ambient Glow */}
              <Box sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }} />

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, letterSpacing: '0.5px' }}>
                Operations Hub
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {actionCards.map((card, index) => (
                  <Button 
                    key={index} 
                    fullWidth 
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      p: 1.75,
                      borderRadius: '16px',
                      background: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      backdropFilter: 'blur(8px)',
                      '&:hover': { 
                        background: alpha(theme.palette.background.paper, 0.8),
                        border: `1px solid ${alpha(card.color, 0.4)}`,
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: `0 10px 30px ${alpha(theme.palette.common.black, 0.05)}`,
                        '& .card-icon-container': {
                          background: alpha(card.color, 0.2),
                          boxShadow: `0 0 15px ${alpha(card.color, 0.25)}`,
                        }
                      }
                    }}
                  >
                    <Box 
                      className="card-icon-container"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        bgcolor: alpha(card.color, 0.1),
                        color: card.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        transition: 'all 0.4s ease'
                      }}
                    >
                      <card.icon sx={{ fontSize: 22 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem' }}>{card.title}</Typography>
                        {card.count && (
                          <Box sx={{ 
                            px: 1, 
                            py: 0.25, 
                            borderRadius: '6px', 
                            background: alpha(theme.palette.primary.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                          }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontWeight: 900, 
                                color: 'primary.main', 
                                fontSize: '0.7rem' 
                              }}
                            >
                              {card.count}
                            </Typography>
                          </Box>
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
