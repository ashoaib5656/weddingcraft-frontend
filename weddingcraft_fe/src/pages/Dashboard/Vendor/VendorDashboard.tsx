import React from 'react';
import {
  CalendarMonth as CalendarIcon,
  AttachMoney as DollarIcon,
  Grade as StarIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as PackageIcon,
  Chat as MessageIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, Button, Avatar, Chip, Stack } from '@mui/material';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import './VendorDashboard.scss';

const VendorDashboard: React.FC = () => {
  const stats = [
    {
      label: 'Bookings Reach',
      value: '45',
      change: '+8%',
      icon: CalendarIcon,
      color: '#6366f1',
      progress: 72
    },
    {
      label: 'Annual Revenue',
      value: '₹8.2L',
      change: '+15%',
      icon: DollarIcon,
      color: '#10b981',
      progress: 65
    },
    {
      label: 'Client Rating',
      value: '4.8',
      change: '+0.2',
      icon: StarIcon,
      color: '#f59e0b',
      progress: 96
    },
    {
      label: 'Reach Status',
      value: '1.2K',
      change: '+23%',
      icon: TrendingUpIcon,
      color: '#3b82f6',
      progress: 88
    },
  ];

  const upcomingBookings = [
    {
      client: 'Priya & Rahul',
      event: 'Wedding Reception',
      date: 'Dec 28, 2024',
      status: 'confirmed',
      amount: '₹85,000',
      type: 'Premium'
    },
    {
      client: 'Anita Sharma',
      event: 'Engagement Ceremony',
      date: 'Jan 05, 2025',
      status: 'pending',
      amount: '₹45,000',
      type: 'Standard'
    },
  ];

  const actionCards = [
    {
      title: 'Gallery Hub',
      desc: 'Update your portfolio with latest event shots.',
      icon: ImageIcon,
      color: '#6366f1',
      count: 24
    },
    {
      title: 'Services',
      desc: 'Manage pricing and event package details.',
      icon: PackageIcon,
      color: '#10b981',
      count: null
    },
    {
      title: 'Client Inbox',
      desc: 'Respond to new booking inquiries.',
      icon: MessageIcon,
      color: '#3b82f6',
      count: 4
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Vendor Portal"
        subtitle="Global reach and transaction management dashboard."
        tag="Business Overview"
        actions={<Button variant="contained" sx={{ bgcolor: 'var(--dash-accent)', borderRadius: '12px', fontWeight: 700, p: '10px 24px' }}>Post Update</Button>}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Booking Pipeline */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Booking Pipeline</Typography>
              <Button variant="text" sx={{ color: 'var(--dash-accent)', fontWeight: 700 }}>Calendar View</Button>
            </Box>
            <Stack spacing={3}>
              {upcomingBookings.map((booking, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '16px',
                  border: '1px solid var(--dash-glass-border)',
                  background: 'rgba(255,255,255,0.4)'
                }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'var(--dash-accent)', mr: 2 }}>
                    <PackageIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontWeight: 700 }}>{booking.client}</Typography>
                      <Typography sx={{ fontWeight: 800, color: '#10b981' }}>{booking.amount}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>
                      {booking.event} • {booking.type}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, textAlign: 'right' }}>
                    <Chip
                      label={booking.status}
                      size="small"
                      sx={{
                        mb: 0.5,
                        bgcolor: booking.status === 'confirmed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: booking.status === 'confirmed' ? '#10b981' : '#f59e0b',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontSize: '0.65rem'
                      }}
                    />
                    <Typography variant="caption" sx={{ display: 'block', color: 'var(--dash-text-muted)', fontWeight: 700 }}>
                      {booking.date}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>

        {/* Tools & Performance */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Business Tools</Typography>
              <Stack spacing={2}>
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
                      bgcolor: `${card.color}25`,
                      color: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <card.icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{card.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>{card.desc}</Typography>
                    </Box>
                    {card.count && (
                      <Chip label={card.count} size="small" sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        bgcolor: card.color,
                        color: 'white'
                      }} />
                    )}
                  </Button>
                ))}
              </Stack>
            </DashboardCard>

            <DashboardCard sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', width: 60, height: 60 }}>
                <StarIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Performance Elite</Typography>
              <Typography variant="body2" sx={{ color: 'var(--dash-text-muted)', fontWeight: 500 }}>
                You are in the top 5% of vendors this month. Keep it up!
              </Typography>
            </DashboardCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorDashboard;