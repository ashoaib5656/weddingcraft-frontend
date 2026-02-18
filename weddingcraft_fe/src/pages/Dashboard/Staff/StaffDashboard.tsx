import React from 'react';
import {
  Assignment as ClipboardIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Error as AlertIcon,
  Chat as MessageIcon,
  AccessTime as ClockIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, Button, Avatar, Chip, Stack } from '@mui/material';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import './StaffDashboard.scss';

const StaffDashboard: React.FC = () => {
  const stats = [
    {
      label: 'Tasks Today',
      value: '12',
      change: '8 pending',
      icon: ClipboardIcon,
      color: '#6366f1',
      progress: 40
    },
    {
      label: 'Weekly Goal',
      value: '45',
      change: '+12% efficiency',
      icon: CheckCircleIcon,
      color: '#10b981',
      progress: 85
    },
    {
      label: 'Active Events',
      value: '3',
      change: '2 on-site',
      icon: CalendarIcon,
      color: '#f59e0b',
      progress: 100
    },
    {
      label: 'Team Alert',
      value: '8',
      change: '2 urgent',
      icon: MessageIcon,
      color: '#ef4444',
      progress: 60
    },
  ];

  const todayTasks = [
    {
      task: 'Venue Setup',
      event: 'Priya & Rahul Wedding',
      time: '09:00',
      priority: 'high',
      status: 'pending',
      location: 'Royal Banquet'
    },
    {
      task: 'Catering Sync',
      event: 'Anita Engagement',
      time: '11:30',
      priority: 'high',
      status: 'pending',
      location: 'Garden Palace'
    },
    {
      task: 'Audio Check',
      event: 'Vikram Wedding',
      time: '14:00',
      priority: 'medium',
      status: 'completed',
      location: 'Grand Hotel'
    },
  ];

  const actionCards = [
    {
      title: 'Clock Operations',
      desc: 'Log attendance and break times.',
      icon: ClockIcon,
      color: '#6366f1',
      status: 'Active'
    },
    {
      title: 'Incident Report',
      desc: 'Flag issues found during setup.',
      icon: AlertIcon,
      color: '#f59e0b',
      status: 'Ready'
    },
    {
      title: 'Team Directory',
      desc: 'Contacts for leads and managers.',
      icon: PhoneIcon,
      color: '#10b981',
      status: '24/7'
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Field Operations"
        subtitle="Real-time task synchronization and site management."
        tag="Task Overview"
        actions={
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            padding: '8px 16px',
            background: 'white',
            borderRadius: '12px',
            border: '1.5px solid var(--dash-glass-border)',
            boxShadow: 'var(--dash-shadow-sm)',
          }}>
            <ClockIcon sx={{ fontSize: 18, color: 'var(--dash-accent)' }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'var(--dash-text)', fontSize: '1.1rem' }}>
              10:45 AM
            </Typography>
          </Box>
        }
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Operation Board */}
        <Grid item xs={12} md={8}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Operation Board</Typography>
              <Chip label="3 Active" size="small" sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontWeight: 800, fontSize: '0.7rem' }} />
            </Box>
            <Stack spacing={2}>
              {todayTasks.map((item, index) => (
                <Box key={index} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '16px',
                  border: '1px solid var(--dash-glass-border)',
                  background: item.status === 'completed' ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.4)',
                  opacity: item.status === 'completed' ? 0.7 : 1
                }}>
                  <Avatar sx={{
                    bgcolor: item.status === 'completed' ? '#dcfce7' : 'white',
                    color: item.status === 'completed' ? '#16a34a' : 'var(--dash-accent)',
                    border: '1.5px solid #f1f5f9',
                    mr: 2
                  }}>
                    {item.status === 'completed' ? <CheckCircleIcon /> : <ClockIcon />}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', textDecoration: item.status === 'completed' ? 'line-through' : 'none' }}>
                        {item.task}
                      </Typography>
                      <Chip
                        label={item.priority}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: '0.6rem',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          bgcolor: item.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                          color: item.priority === 'high' ? '#ef4444' : 'var(--dash-accent)'
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>
                      {item.event} • <Box component="span" sx={{ color: 'var(--dash-accent)' }}>{item.location}</Box>
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2, textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 800, color: 'var(--dash-text)', fontSize: '0.9rem' }}>{item.time}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>

        {/* Attendance & Support */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Attendance Hub</Typography>
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
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{card.desc}</Typography>
                    </Box>
                    <Chip label={card.status} size="small" sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.8)'
                    }} />
                  </Button>
                ))}
              </Stack>
            </DashboardCard>

            <DashboardCard sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Next Site Sync</Typography>
              <Box sx={{ p: 2, borderRadius: '16px', bgcolor: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'var(--dash-text-muted)', textTransform: 'uppercase', display: 'block', mb: 1 }}>
                  BRIEFING AT ROYAL BANQUET
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900, color: 'var(--dash-accent)', mb: 1 }}>15:00 PM</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--dash-text-muted)' }}>Lead: Rajesh Kumar</Typography>
              </Box>
            </DashboardCard>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StaffDashboard;