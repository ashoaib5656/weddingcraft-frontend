import React from 'react';
import {
  Favorite as HeartIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as MapPinIcon,
  People as UsersIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as ClockIcon,
  CameraAlt as CameraIcon,
  Cake as CakeIcon,
  CardGiftcard as GiftIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, Button, Avatar, Chip, LinearProgress } from '@mui/material';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import './ClientDashboard.scss';

const ClientDashboard: React.FC = () => {
  const weddingDetails = {
    bride: 'Priya',
    groom: 'Rahul',
    date: 'January 15, 2025',
    venue: 'Royal Banquet Hall, Mumbai',
    daysLeft: 40,
    guests: 350,
    progress: 68
  };

  const budgetStats = [
    {
      label: 'Wedding Budget',
      value: '₹15L',
      icon: GiftIcon,
      color: '#6366f1',
      progress: 55
    },
    {
      label: 'Total Spent',
      value: '₹8.2L',
      icon: CheckCircleIcon,
      color: '#10b981',
      progress: 60
    },
    {
      label: 'Confirmed',
      value: '8/12',
      icon: UsersIcon,
      color: '#f59e0b',
      progress: 75
    },
    {
      label: 'Days Remaining',
      value: '40',
      icon: ClockIcon,
      color: '#ef4444',
      progress: 100
    },
  ];

  const bookedVendors = [
    {
      name: 'Royal Banquet',
      category: 'Venue & Catering',
      status: 'confirmed',
      amount: '₹3.5L',
      icon: MapPinIcon,
      date: 'Jan 15, 2025'
    },
    {
      name: 'Mahesh Photo',
      category: 'Cinematography',
      status: 'confirmed',
      amount: '₹1.2L',
      icon: CameraIcon,
      date: 'Jan 15, 2025'
    },
  ];

  const actionCards = [
    {
      title: 'Marketplace',
      desc: 'Discover and book curated premium vendors.',
      icon: UsersIcon,
      color: '#6366f1',
      count: 'New'
    },
    {
      title: 'Budgeter',
      desc: 'Real-time expense and payment tracking.',
      icon: GiftIcon,
      color: '#10b981',
      count: null
    },
    {
      title: 'Timeline',
      desc: 'Chronological roadmap of your big day.',
      icon: CalendarIcon,
      color: '#f59e0b',
      count: null
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Wedding Dashboard"
        subtitle="Manage your special day with elegance and ease."
        tag="Wedding Journey"
      />

      {/* Hero Header Section */}
      <DashboardCard
        sx={{
          mb: 4,
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
          borderColor: 'rgba(99, 102, 241, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <HeartIcon sx={{ color: 'var(--dash-accent)' }} />
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--dash-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Wedding Journey
              </Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'var(--dash-text)' }}>
              {weddingDetails.bride} & {weddingDetails.groom}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--dash-text-muted)' }}>
                <CalendarIcon sx={{ fontSize: 18, color: 'var(--dash-accent)' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{weddingDetails.date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--dash-text-muted)' }}>
                <MapPinIcon sx={{ fontSize: 18, color: 'var(--dash-accent)' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{weddingDetails.venue}</Typography>
              </Box>
            </Box>

            <Box sx={{ maxWidth: 400 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--dash-text-muted)' }}>Planning Progress</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--dash-accent)' }}>{weddingDetails.progress}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={weddingDetails.progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(99, 102, 241, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'var(--dash-accent)',
                    borderRadius: 4,
                  }
                }}
              />
            </Box>
          </Box>

          <Box sx={{
            textAlign: 'center',
            p: 3,
            borderRadius: '24px',
            background: 'white',
            boxShadow: 'var(--dash-shadow-lg)',
            border: '1px solid var(--dash-glass-border)',
            minWidth: 160
          }}>
            <Typography variant="h2" sx={{ fontWeight: 900, color: 'var(--dash-accent)', lineHeight: 1 }}>
              {weddingDetails.daysLeft}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'var(--dash-text-muted)', textTransform: 'uppercase' }}>
              Days To Go
            </Typography>
          </Box>
        </Box>
      </DashboardCard>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {budgetStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Curated Vendors</Typography>
              <Button variant="text" sx={{ color: 'var(--dash-accent)', fontWeight: 700 }}>Manage All</Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {bookedVendors.map((vendor, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '16px',
                  border: '1px solid var(--dash-glass-border)',
                  background: 'rgba(255,255,255,0.4)'
                }}>
                  <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'var(--dash-accent)', mr: 2 }}>
                    <vendor.icon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontWeight: 700 }}>{vendor.name}</Typography>
                      <Typography sx={{ fontWeight: 800, color: '#10b981' }}>{vendor.amount}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>
                      {vendor.category} • {vendor.date}
                    </Typography>
                  </Box>
                  <Chip
                    label={vendor.status}
                    size="small"
                    sx={{
                      ml: 2,
                      bgcolor: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      fontSize: '0.65rem'
                    }}
                  />
                </Box>
              ))}
            </Box>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Planning Hub</Typography>
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
              </Box>
            </DashboardCard>

            <DashboardCard sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'rgba(99, 102, 241, 0.1)', color: 'var(--dash-accent)', width: 60, height: 60 }}>
                <CakeIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Keep Planning!</Typography>
              <Typography variant="body2" sx={{ color: 'var(--dash-text-muted)', fontWeight: 500 }}>
                You've confirmed 68% of your wedding essentials. Almost there!
              </Typography>
            </DashboardCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;