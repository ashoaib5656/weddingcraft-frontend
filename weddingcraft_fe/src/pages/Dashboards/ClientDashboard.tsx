import React from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Clock, 
  Camera, 
  Cake, 
  Gift, 
} from 'lucide-react';
import '../../styles/DashboardStyles.css';

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
      icon: Gift, 
      color: '#6366f1',
      progress: 55
    },
    { 
      label: 'Total Spent', 
      value: '₹8.2L', 
      icon: CheckCircle2, 
      color: '#10b981',
      progress: 60
    },
    { 
      label: 'Confirmed', 
      value: '8/12', 
      icon: Users, 
      color: '#f59e0b',
      progress: 75
    },
    { 
      label: 'Days Remaining', 
      value: '40', 
      icon: Clock, 
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
      icon: MapPin, 
      date: 'Jan 15, 2025' 
    },
    { 
      name: 'Mahesh Photo', 
      category: 'Cinematography', 
      status: 'confirmed', 
      amount: '₹1.2L', 
      icon: Camera, 
      date: 'Jan 15, 2025' 
    },
  ];

  const actionCards = [
    { 
      title: 'Marketplace', 
      desc: 'Discover and book curated premium vendors.', 
      icon: Users, 
      color: '#6366f1',
      count: 'New' 
    },
    { 
      title: 'Budgeter', 
      desc: 'Real-time expense and payment tracking.', 
      icon: Gift, 
      color: '#10b981',
      count: null 
    },
    { 
      title: 'Timeline', 
      desc: 'Chronological roadmap of your big day.', 
      icon: Calendar, 
      color: '#f59e0b',
      count: null 
    },
  ];

  return (
    <div className="dashboard-page wedding-theme">
      {/* Hero Header Section */}
      <div className="glass-card hero-card mb-6 stagger-1">
        <div className="hero-gradient-overlay"></div>
        
        <div className="hero-content-inner">
          <div className="hero-left-content">
            <div className="hero-journey-label">
              <Heart size={24} fill="var(--dash-accent)" color="var(--dash-accent)" />
              <span className="hero-journey-tag">Wedding Journey</span>
            </div>
            <h2 className="hero-main-title hero-title-refined">
              {weddingDetails.bride} & {weddingDetails.groom}
            </h2>
            <div className="hero-details-flex">
              <div className="hero-detail-item">
                <Calendar size={18} className="text-accent" /> {weddingDetails.date}
              </div>
              <div className="hero-detail-item">
                <MapPin size={18} className="text-accent" /> {weddingDetails.venue}
              </div>
            </div>
            
            <div className="hero-progress-container">
              <div className="hero-progress-top">
                <span className="hero-progress-label">Planning Progress</span>
                <span className="hero-progress-value">{weddingDetails.progress}%</span>
              </div>
              <div className="analysis-progress hero-progress-track">
                <div className="analysis-progress-bar" style={{ width: `${weddingDetails.progress}%` }}></div>
              </div>
            </div>
          </div>

          <div className="hero-countdown-box">
             <div className="hero-countdown-days">{weddingDetails.daysLeft}</div>
             <div className="hero-countdown-label hero-countdown-label-inner">Days To Go</div>
          </div>
        </div>
      </div>

      <div className="bento-grid">
        {/* Budget Row */}
        {budgetStats.map((stat, index) => (
          <div key={index} className="glass-card stat-card bento-span-3 stagger-2">
            <div className="flex-center-gap mb-1-5">
              <div className="icon-box" style={{ background: `${stat.color}15`, color: stat.color, borderRadius: '10px', padding: '8px' }}>
                <stat.icon size={18} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--dash-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
            </div>
            <h3 className="stat-value stat-value-md" style={{ fontSize: '1.85rem' }}>{stat.value}</h3>
            <div className="analysis-progress" style={{ height: '4px', background: `${stat.color}08` }}>
              <div className="analysis-progress-bar" style={{ width: `${stat.progress}%`, background: stat.color }}></div>
            </div>
          </div>
        ))}

        {/* Vendors Panel - Left */}
        <div className="glass-card bento-span-8 stagger-3 p-card">
          <div className="section-header">
            <h3 className="content-card-title section-title">Curated Vendors</h3>
            <button className="btn-secondary btn-logs">Manage All</button>
          </div>
          <div className="activity-list">
            {bookedVendors.map((vendor, index) => (
              <div key={index} className="pipeline-item">
                <div className="icon-box pipeline-icon">
                  <vendor.icon size={24} color="#6366f1" />
                </div>
                <div className="pipeline-info">
                  <div className="pipeline-header">
                    <h4 className="pipeline-name">{vendor.name}</h4>
                    <span className="pipeline-amount">{vendor.amount}</span>
                  </div>
                  <div className="pipeline-meta">
                    <p className="pipeline-meta-text">{vendor.category} • {vendor.date}</p>
                  </div>
                </div>
                <div className="pipeline-status-group">
                  <div className="badge-status badge-success">{vendor.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Actions - Right */}
        <div className="bento-span-4 flex-col-gap">
           <div className="glass-card dark-action-panel p-card">
             <h3 className="section-title section-title-bold">Planning Hub</h3>
             <div className="flex-col-gap">
               {actionCards.map((card, index) => (
                <button key={index} className="dark-action-btn dark-action-btn-refined">
                  <div className="icon-box" style={{ background: `${card.color}25`, color: card.color, borderRadius: '12px' }}>
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

           <div className="glass-card p-card centered-card" style={{ flex: 1 }}>
             <div className="circle-icon-box">
                <Cake size={30} className="text-accent" />
             </div>
             <h4 className="centered-card-title">Keep Planning!</h4>
             <p className="dash-subtitle-md centered-card-desc">You've confirmed 68% of your wedding essentials. Almost there!</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;