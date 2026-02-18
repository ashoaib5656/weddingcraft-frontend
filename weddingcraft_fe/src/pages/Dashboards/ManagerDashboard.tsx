import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  ClipboardList, 
  AlertTriangle, 
  Target
} from 'lucide-react';
import '../../styles/DashboardStyles.css';

const ManagerDashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Team Members', 
      value: '24', 
      change: '+3 new', 
      icon: Users, 
      color: '#6366f1',
      progress: 80
    },
    { 
      label: 'Active Events', 
      value: '18', 
      change: '5 today', 
      icon: Calendar, 
      color: '#f59e0b',
      progress: 65
    },
    { 
      label: 'Op. Budget', 
      value: '₹32L', 
      change: '+15%', 
      icon: DollarSign, 
      color: '#10b981',
      progress: 92
    },
    { 
      label: 'Efficiency', 
      value: '94%', 
      change: '+2%', 
      icon: Target, 
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
      icon: ClipboardList, 
      color: '#6366f1',
      count: 3 
    },
    { 
      title: 'Review Budget', 
      desc: 'Analyze and approve event expenses.', 
      icon: DollarSign, 
      color: '#10b981',
      count: null 
    },
    { 
      title: 'Safety Logs', 
      desc: 'Monitor on-site compliance reports.', 
      icon: AlertTriangle, 
      color: '#f59e0b',
      count: 1 
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="flex-between-center mb-10 stagger-1">
        <div>
          <span className="dash-tag-premium">Operations Overview</span>
          <h1 className="content-card-title dash-title-lg">Fleet Operations</h1>
          <p className="text-secondary dash-subtitle-md">Managing peak event synchronization and team logistics.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary">Deploy Team</button>
        </div>
      </div>

      <div className="bento-grid">
        {/* Stats Row */}
        {stats.map((stat, index) => (
          <div key={index} className="glass-card stat-card bento-span-3 stagger-2">
            <div className="flex-center-gap" style={{ marginBottom: '1.25rem', gap: '12px' }}>
              <div className="icon-box" style={{ background: `${stat.color}15`, color: stat.color, borderRadius: '12px' }}>
                <stat.icon size={20} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
            </div>
            <div className="flex-between-end">
              <h3 className="stat-value stat-value-lg">{stat.value}</h3>
              <div style={{ textAlign: 'right', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: stat.color === '#10b981' ? '#10b981' : '#6366f1' }}>{stat.change}</span>
              </div>
            </div>
            <div className="analysis-progress" style={{ height: '4px', background: `${stat.color}10`, marginTop: '1.25rem' }}>
              <div className="analysis-progress-bar" style={{ width: `${stat.progress}%`, background: stat.color }}></div>
            </div>
          </div>
        ))}

        {/* Team Efficiency - Left */}
        <div className="glass-card bento-span-6 stagger-3 p-card">
          <div className="section-header">
            <h3 className="content-card-title section-title">Active Personnel</h3>
            <button className="btn-ghost-accent">View All Staff</button>
          </div>
          <div className="activity-list" style={{ gap: '1rem' }}>
            {teamPerformance.map((member, index) => (
              <div key={index} className="personnel-card">
                <div className="flex-between-center" style={{ marginBottom: '1rem' }}>
                  <div className="flex-center-gap" style={{ gap: '1rem' }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt="" className="avatar-img" />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{member.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--dash-text-muted)', fontWeight: 600 }}>{member.role}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: member.efficiency > 90 ? '#10b981' : '#3b82f6' }}>{member.efficiency}%</div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--dash-text-muted)' }}>Score</span>
                  </div>
                </div>
                <div className="analysis-progress" style={{ height: '6px', background: 'white' }}>
                  <div className="analysis-progress-bar" style={{ width: `${member.efficiency}%`, background: member.efficiency > 90 ? '#10b981' : '#3b82f6' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline - Right */}
        <div className="glass-card bento-span-6 stagger-4 p-card">
          <h3 className="content-card-title section-title" style={{ marginBottom: '2rem' }}>Event Pipeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingEvents.map((event, index) => (
              <div key={index} style={{ padding: '1.25rem', borderRadius: '20px', border: '1px solid #f1f5f9', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{event.event}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--dash-text-muted)', fontWeight: 600 }}>{event.venue}</span>
                  </div>
                  <div style={{ padding: '4px 12px', borderRadius: '8px', background: event.status === 'live' ? '#dcfce7' : '#dbeafe', color: event.status === 'live' ? '#16a34a' : '#2563eb', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{event.status}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--dash-text-muted)' }}>
                      <Calendar size={14} /> {event.date}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--dash-text-muted)' }}>
                      <Target size={14} /> {event.time}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dash-accent)' }}>👥 {event.team} Staff</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Hub - Bottom Span */}
        <div className="glass-card bento-span-12 stagger-1 dark-action-panel">
          <div className="section-header" style={{ marginBottom: '1.5rem' }}>
            <h3 className="section-title" style={{ fontWeight: 800 }}>Workflow Hub</h3>
            <span style={{ fontSize: '0.8rem', padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontWeight: 600 }}>Active Control Mode</span>
          </div>
          <div className="quick-actions-grid cols-3">
            {actionCards.map((card, index) => (
              <button key={index} className="dark-action-btn" style={{ flexDirection: 'column' }}>
                <div className="flex-between-center" style={{ width: '100%' }}>
                  <div className="icon-box" style={{ background: `${card.color}30`, color: card.color, borderRadius: '12px' }}>
                    <card.icon size={22} />
                  </div>
                  {card.count && <span style={{ padding: '2px 10px', background: card.color, color: 'white', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800 }}>{card.count} Pending</span>}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700 }}>{card.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500, lineHeight: 1.4 }}>{card.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;