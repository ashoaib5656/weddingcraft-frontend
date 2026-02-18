import React from 'react';
import { 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Package, 
  MessageSquare, 
  Image, 
} from 'lucide-react';
import '../../styles/DashboardStyles.css';

const VendorDashboard: React.FC = () => {
  const stats = [
    { 
      label: 'Bookings Reach', 
      value: '45', 
      change: '+8%', 
      icon: Calendar, 
      color: '#6366f1',
      progress: 72
    },
    { 
      label: 'Annual Revenue', 
      value: '₹8.2L', 
      change: '+15%', 
      icon: DollarSign, 
      color: '#10b981',
      progress: 65
    },
    { 
      label: 'Client Rating', 
      value: '4.8', 
      change: '+0.2', 
      icon: Star, 
      color: '#f59e0b',
      progress: 96
    },
    { 
      label: 'Reach Status', 
      value: '1.2K', 
      change: '+23%', 
      icon: TrendingUp, 
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
      icon: Image, 
      color: '#6366f1',
      count: 24 
    },
    { 
      title: 'Services', 
      desc: 'Manage pricing and event package details.', 
      icon: Package, 
      color: '#10b981',
      count: null 
    },
    { 
      title: 'Client Inbox', 
      desc: 'Respond to new booking inquiries.', 
      icon: MessageSquare, 
      color: '#3b82f6',
      count: 4 
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="flex-between-center mb-10 stagger-1">
        <div>
          <span className="dash-tag-premium">Business Overview</span>
          <h1 className="content-card-title dash-title-lg">Vendor Portal</h1>
          <p className="text-secondary dash-subtitle-md">Global reach and transaction management dashboard.</p>
        </div>
        <div className="flex-center-gap">
          <button className="btn-primary">Post Update</button>
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
              <div className="badge-status badge-success">{stat.change}</div>
            </div>
            <p className="stat-label stat-label-refined">{stat.label}</p>
            <h3 className="stat-value stat-value-md">{stat.value}</h3>
            <div className="analysis-progress stat-progress-bar-container" style={{ background: `${stat.color}10` }}>
              <div className="analysis-progress-bar" style={{ width: `${stat.progress}%`, background: stat.color }}></div>
            </div>
          </div>
        ))}

        {/* Booking Pipeline - Left */}
        <div className="glass-card bento-span-8 stagger-3 p-card">
          <div className="section-header">
            <h3 className="content-card-title section-title">Booking Pipeline</h3>
            <button className="btn-secondary btn-logs">Calendar View</button>
          </div>
          <div className="activity-list">
            {upcomingBookings.map((booking, index) => (
              <div key={index} className="pipeline-item">
                <div className="icon-box pipeline-icon">
                  <Package size={24} color="#6366f1" />
                </div>
                <div className="pipeline-info">
                  <div className="pipeline-header">
                    <h4 className="pipeline-name">{booking.client}</h4>
                    <span className="text-850-extrabold-success">{booking.amount}</span>
                  </div>
                  <div className="pipeline-meta">
                     <p className="pipeline-meta-text">{booking.event} • {booking.type}</p>
                  </div>
                </div>
                <div className="pipeline-status-group">
                  <div className={`badge-status ${booking.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>{booking.status}</div>
                  <span className="text-indicator-text">{booking.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions & Insights - Right */}
        <div className="bento-span-4 stagger-4 flex-col-gap">
          <div className="glass-card dark-action-panel p-card">
            <h3 className="section-title section-title-bold">Business Tools</h3>
            <div className="flex-col-gap">
              {actionCards.map((card, index) => (
                <button key={index} className="dark-action-btn">
                  <div className="icon-box" style={{ background: `${card.color}25`, color: card.color }}>
                    <card.icon size={20} />
                  </div>
                  <div className="dark-action-content">
                    <h4 className="dark-action-title">{card.title}</h4>
                    <p className="activity-action-text">{card.desc}</p>
                  </div>
                  {card.count && <div className="badge-count" style={{ background: card.color }}>{card.count}</div>}
                </button>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-card centered-card flex-1">
             <Star size={32} color="#f59e0b" fill="#f59e0b" className="mb-1 opacity-60" />
             <h4 className="centered-card-title">Performance Elite</h4>
             <p className="dash-subtitle-md line-height-1-5">You are in the top 5% of vendors this month. Keep it up!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;