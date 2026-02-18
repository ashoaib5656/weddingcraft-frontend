import React from 'react';
import { 
  ClipboardList, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Clock, 
  Phone, 
} from 'lucide-react';
import '../../styles/DashboardStyles.css';

const StaffDashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Tasks Today', 
      value: '12', 
      change: '8 pending', 
      icon: ClipboardList, 
      color: '#6366f1',
      progress: 40
    },
    { 
      label: 'Weekly Goal', 
      value: '45', 
      change: '+12% efficiency', 
      icon: CheckCircle2, 
      color: '#10b981',
      progress: 85
    },
    { 
      label: 'Active Events', 
      value: '3', 
      change: '2 on-site', 
      icon: Calendar, 
      color: '#f59e0b',
      progress: 100
    },
    { 
      label: 'Team Alert', 
      value: '8', 
      change: '2 urgent', 
      icon: MessageSquare, 
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
      icon: Clock, 
      color: '#6366f1',
      status: 'Active' 
    },
    { 
      title: 'Incident Report', 
      desc: 'Flag issues found during setup.', 
      icon: AlertCircle, 
      color: '#f59e0b',
      status: 'Ready' 
    },
    { 
      title: 'Team Directory', 
      desc: 'Contacts for leads and managers.', 
      icon: Phone, 
      color: '#10b981',
      status: '24/7' 
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="flex-between-center mb-10 stagger-1">
        <div>
          <span className="dash-tag-premium">Task Overview</span>
          <h1 className="content-card-title dash-title-lg">Field Operations</h1>
          <p className="text-secondary dash-subtitle-md">Real-time task synchronization and site management.</p>
        </div>
        <div className="flex-center-gap-sm">
          <div className="white-pill">
             <Clock size={18} className="text-accent" />
             <span className="text-800-bold text-1-1rem-bold">10:45 AM</span>
          </div>
        </div>
      </div>

      <div className="bento-grid">
        {/* Stats Row */}
        {stats.map((stat, index) => (
          <div key={index} className="glass-card stat-card bento-span-3 stagger-2">
            <div className="flex-between-center mb-1-5">
              <div className="icon-box" style={{ background: `${stat.color}15`, color: stat.color }}>
                <stat.icon size={20} />
              </div>
              <span className={`text-xxs-bold-uppercase ${stat.color === '#ef4444' ? 'text-danger' : 'text-secondary'}`} style={{ color: stat.color === '#ef4444' ? '#ef4444' : 'var(--dash-text-muted)' }}>{stat.change}</span>
            </div>
            <p className="stat-label stat-label-refined">{stat.label}</p>
            <h3 className="stat-value stat-value-md">{stat.value}</h3>
            <div className="analysis-progress stat-progress-bar-container" style={{ background: `${stat.color}10` }}>
              <div className="analysis-progress-bar" style={{ width: `${stat.progress}%`, background: stat.color }}></div>
            </div>
          </div>
        ))}

        {/* Priority Task Board - Left */}
        <div className="glass-card bento-span-8 stagger-3 p-card">
          <div className="section-header">
            <h3 className="content-card-title section-title">Operation Board</h3>
            <div className="flex-gap-8">
              <span className="badge-status badge-success">3 Active</span>
            </div>
          </div>
          <div className="flex-col-gap">
            {todayTasks.map((item, index) => (
              <div key={index} className="pipeline-item">
                <div className="icon-box pipeline-icon-sm" style={{ background: item.status === 'completed' ? '#dcfce7' : 'white' }}>
                  {item.status === 'completed' ? <CheckCircle2 size={22} color="#16a34a" /> : <Clock size={22} color="#6366f1" />}
                </div>
                <div className="pipeline-info">
                  <div className="pipeline-header">
                    <h4 className={`activity-name ${item.status === 'completed' ? 'opacity-60' : ''}`}>{item.task}</h4>
                    <div className={`badge-status ${item.priority === 'high' ? 'badge-status-urgent' : 'badge-status-normal'}`}>{item.priority}</div>
                  </div>
                  <div className="pipeline-meta">
                    <p className="pipeline-meta-text">{item.event} • <span className="text-accent">{item.location}</span></p>
                  </div>
                </div>
                <div className="pipeline-status-group">
                  <div className="text-800-bold text-indicator-text">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance & Support - Right */}
        <div className="bento-span-4 stagger-4 flex-col-gap">
          <div className="glass-card dark-action-panel p-card">
            <h3 className="section-title section-title-bold">Attendance Hub</h3>
            <div className="flex-col-gap-sm">
              {actionCards.map((card, index) => (
                <button key={index} className="dark-action-btn">
                  <div className="icon-box" style={{ background: `${card.color}25`, color: card.color }}>
                    <card.icon size={20} />
                  </div>
                  <div className="dark-action-content">
                    <h4 className="dark-action-title">{card.title}</h4>
                    <p className="activity-time-text">{card.desc}</p>
                  </div>
                  <div className="badge-count" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>{card.status}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-card flex-col-gap flex-1">
             <h4 className="activity-name">Next Site Sync</h4>
             <div className="activity-item-col">
               <div className="mb-0-5 text-xxs-bold-uppercase">BRIEFING AT ROYAL BANQUET</div>
               <div className="text-xl-bold text-accent">15:00 PM</div>
               <div className="text-indicator-text activity-time-text">Lead: Rajesh Kumar</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;