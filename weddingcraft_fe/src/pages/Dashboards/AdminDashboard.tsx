import React from "react";
import {
  Users,
  Building2,
  DollarSign,
  BarChart3,
  Calendar,
  Shield,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import "../../styles/DashboardStyles.css";

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Vendors",
      value: "1,234",
      change: "+12%",
      icon: Building2,
      color: "#6366f1",
      progress: 75,
      trend: "up"
    },
    {
      label: "Total Revenue",
      value: "₹45.2L",
      change: "+18%",
      icon: DollarSign,
      color: "#10b981",
      progress: 62,
      trend: "up"
    },
    {
      label: "Active Clients",
      value: "8,567",
      change: "+23%",
      icon: Users,
      color: "#f59e0b",
      progress: 88,
      trend: "up"
    },
    {
      label: "Bookings",
      value: "456",
      change: "+15%",
      icon: Calendar,
      color: "#3b82f6",
      progress: 94,
      trend: "up"
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
      icon: Shield, 
      color: "#6366f1",
      count: 12
    },
    { 
      title: "Revenue Report", 
      desc: "Export monthly financial growth analysis.", 
      icon: BarChart3, 
      color: "#10b981",
      count: null
    },
    { 
      title: "User Audit", 
      desc: "System-wide user activity and security log.", 
      icon: Users, 
      color: "#f59e0b",
      count: 5
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="flex-between-center mb-10 stagger-1">
        <div>
          <span className="dash-tag-premium">Strategic Overview</span>
          <h1 className="content-card-title dash-title-lg">Admin Command</h1>
          <p className="text-secondary dash-subtitle-md">Orchestrating system growth and operational excellence.</p>
        </div>
        <div className="live-indicator-pill">
          <div className="live-dot" />
          <span className="text-indicator-text">System Live</span>
        </div>
      </div>

      <div className="bento-grid">
        {/* Main Stats Row */}
        {stats.map((stat, index) => (
          <div key={index} className="glass-card stat-card bento-span-3 stagger-2">
            <div className="flex-between-center stat-card-top">
              <div className="icon-box" style={{ background: `${stat.color}15`, color: stat.color, borderRadius: '14px' }}>
                <stat.icon size={24} />
              </div>
              <div className="text-right">
                <div className="trend-badge trend-up">
                  <TrendingUp size={14} />
                  {stat.change}
                </div>
                <span className="text-xxs-muted-bold">vs last month</span>
              </div>
            </div>
            <p className="stat-label stat-label-refined">{stat.label}</p>
            <h3 className="stat-value stat-value-md">{stat.value}</h3>
            
            <div className="analysis-progress" style={{ height: '6px', background: `${stat.color}10` }}>
              <div 
                className="analysis-progress-bar" 
                style={{ width: `${stat.progress}%`, background: stat.color }}
              ></div>
            </div>
          </div>
        ))}

        {/* Insight Section - Left (Activity) */}
        <div className="glass-card bento-span-8 stagger-3 p-card">
          <div className="section-header">
            <h3 className="content-card-title section-title">Real-time Operations</h3>
            <button className="btn-secondary btn-logs">Stream Logs</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon-box" style={{ color: activity.status === 'success' ? '#10b981' : '#f59e0b' }}>
                  <ArrowUpRight size={20} />
                </div>
                <div className="activity-content">
                  <div className="activity-header">
                    <h4 className="activity-name">{activity.name}</h4>
                    <span className="activity-time-text">{activity.time}</span>
                  </div>
                  <p className="activity-action-text">{activity.action}</p>
                  <p className="activity-desc-pill">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight Section - Right (Top Performers & Quick Action Panel) */}
        <div className="bento-span-4 flex-col-gap">
          {/* Top Vendors Card */}
          <div className="glass-card stagger-4 p-card" style={{ flex: 1 }}>
            <h3 className="content-card-title section-title" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Revenue Leaders</h3>
            <div className="flex-col-gap">
              {topVendors.map((vendor, index) => (
                <div key={index} className="gradient-card-item">
                  <div className="item-row-between">
                    <span className="text-900-bold">{vendor.name}</span>
                    <span className="text-850-extrabold-success">{vendor.revenue}</span>
                  </div>
                  <div className="flex-between-center">
                    <span className="text-750-muted-bold">{vendor.bookings} Bookings</span>
                    <div className="badge-rating">★ {vendor.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Cards Panel */}
          <div className="glass-card stagger-1 dark-action-panel">
            <h3 className="section-title section-title-white">Operations Hub</h3>
            <div className="flex-col-gap">
              {actionCards.map((card, index) => (
                <button key={index} className="dark-action-btn">
                  <div className="icon-box" style={{ background: `${card.color}30`, color: card.color, borderRadius: '10px', padding: '8px' }}>
                    <card.icon size={20} />
                  </div>
                  <div className="dark-action-content">
                    <div className="flex-between-center">
                      <span className="dark-action-title">{card.title}</span>
                      {card.count && <span className="badge-count" style={{ background: card.color }}>{card.count}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
