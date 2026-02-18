import React from 'react';
import {
  People as UsersIcon,
  CalendarMonth as CalendarIcon,
  AttachMoney as DollarIcon,
  Assignment as ClipboardIcon,
  Warning as AlertIcon,
  TrackChanges as TargetIcon,
} from '@mui/icons-material';
import { Box, Grid, Typography, Button, Avatar, Chip, LinearProgress, Stack, Paper } from '@mui/material';
import DashboardHeader from "../../../components/Dashboard/DashboardHeader/DashboardHeader";
import DashboardStats from "../../../components/Dashboard/DashboardStats/DashboardStats";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import './ManagerDashboard.scss';

const ManagerDashboard: React.FC = () => {
  const stats = [
    {
      label: 'Team Members',
      value: '24',
      change: '+3 new',
      icon: UsersIcon,
      color: '#6366f1',
      progress: 80
    },
    {
      label: 'Active Events',
      value: '18',
      change: '5 today',
      icon: CalendarIcon,
      color: '#f59e0b',
      progress: 65
    },
    {
      label: 'Op. Budget',
      value: '₹32L',
      change: '+15%',
      icon: DollarIcon,
      color: '#10b981',
      progress: 92
    },
    {
      label: 'Efficiency',
      value: '94%',
      change: '+2%',
      icon: TargetIcon,
      color: '#3b82f6',
      progress: 94
    },
  ];

  const teamPerformance = [
    {
      name: 'Rajesh Kumar',
      role: 'Event Lead',
      tasksCompleted: 45,
      tasksTotal: 48,
      efficiency: 94,
      status: 'excellent'
    },
    {
      name: 'Priya Sharma',
      role: 'Coordinator',
      tasksCompleted: 38,
      tasksTotal: 42,
      efficiency: 90,
      status: 'good'
    },
  ];

  const upcomingEvents = [
    {
      event: 'Priya & Rahul Wedding',
      date: 'Today',
      time: '18:00',
      team: 8,
      status: 'live',
      venue: 'Royal Banquet'
    },
    {
      event: 'Anita Engagement',
      date: 'Tomorrow',
      time: '17:00',
      team: 6,
      status: 'ready',
      venue: 'Garden Palace'
    },
  ];

  const actionCards = [
    {
      title: 'Assign Staff',
      desc: 'Deploy teams to upcoming venues.',
      icon: ClipboardIcon,
      color: '#6366f1',
      count: 3
    },
    {
      title: 'Review Budget',
      desc: 'Analyze and approve event expenses.',
      icon: DollarIcon,
      color: '#10b981',
      count: null
    },
    {
      title: 'Safety Logs',
      desc: 'Monitor on-site compliance reports.',
      icon: AlertIcon,
      color: '#f59e0b',
      count: 1
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, margin: '0 auto' }}>
      <DashboardHeader
        title="Fleet Operations"
        subtitle="Managing peak event synchronization and team logistics."
        tag="Operations Overview"
        actions={<Button variant="contained" sx={{ bgcolor: 'var(--dash-accent)', borderRadius: '12px', fontWeight: 700, p: '10px 24px' }}>Deploy Team</Button>}
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardStats {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Active Personnel */}
        <Grid item xs={12} md={6}>
          <DashboardCard sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>Active Personnel</Typography>
              <Button variant="text" sx={{ color: 'var(--dash-accent)', fontWeight: 700 }}>View All Staff</Button>
            </Box>
            <Stack spacing={2}>
              {teamPerformance.map((member, index) => (
                <Paper key={index} sx={{
                  p: 2,
                  borderRadius: '16px',
                  background: 'white',
                  border: '1px solid #f1f5f9',
                  boxShadow: 'none'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{member.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>{member.role}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography sx={{ fontWeight: 800, color: member.efficiency > 90 ? '#10b981' : '#3b82f6', fontSize: '1.1rem' }}>
                        {member.efficiency}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Score</Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={member.efficiency}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: '#f1f5f9',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: member.efficiency > 90 ? '#10b981' : '#3b82f6',
                        borderRadius: 3,
                      }
                    }}
                  />
                </Paper>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>

        {/* Event Pipeline */}
        <Grid item xs={12} md={6}>
          <DashboardCard sx={{ height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Event Pipeline</Typography>
            <Stack spacing={2}>
              {upcomingEvents.map((event, index) => (
                <Box key={index} sx={{
                  p: 2,
                  borderRadius: '20px',
                  border: '1px solid #f1f5f9',
                  background: 'white'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{event.event}</Typography>
                      <Typography variant="caption" sx={{ color: 'var(--dash-text-muted)', fontWeight: 600 }}>{event.venue}</Typography>
                    </Box>
                    <Chip
                      label={event.status}
                      size="small"
                      sx={{
                        bgcolor: event.status === 'live' ? '#dcfce7' : '#dbeafe',
                        color: event.status === 'live' ? '#16a34a' : '#2563eb',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontSize: '0.65rem'
                      }}
                    />
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.5,
                    bgcolor: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--dash-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                        <CalendarIcon sx={{ fontSize: 14 }} /> {event.date}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--dash-text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
                        <TargetIcon sx={{ fontSize: 14 }} /> {event.time}
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dash-accent)' }}>👥 {event.team} Staff</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Workflow Hub */}
      <DashboardCard sx={{ bgcolor: '#0f172a', color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Workflow Hub</Typography>
          <Chip label="Active Control Mode" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, fontSize: '0.7rem' }} />
        </Box>
        <Grid container spacing={2}>
          {actionCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Button fullWidth sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                textTransform: 'none',
                p: 2,
                borderRadius: '16px',
                bgcolor: 'rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                color: 'inherit'
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
                  <Avatar sx={{ bgcolor: `${card.color}30`, color: card.color, borderRadius: '12px' }}>
                    <card.icon />
                  </Avatar>
                  {card.count && (
                    <Chip label={`${card.count} Pending`} size="small" sx={{ bgcolor: card.color, color: 'white', fontWeight: 800, fontSize: '0.7rem' }} />
                  )}
                </Box>
                <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{card.title}</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500, textAlign: 'left', lineHeight: 1.4 }}>
                  {card.desc}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </Box>
  );
};

export default ManagerDashboard;