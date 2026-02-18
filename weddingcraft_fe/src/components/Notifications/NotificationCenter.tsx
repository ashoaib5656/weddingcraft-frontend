import React, { useState } from "react";
import {
  Bell,
  Clock,
  Calendar,
  Shield,
  X,
  Settings,
  ArrowRight,
  Trash2,
  CheckCircle2
} from "lucide-react";
import "./NotificationCenter.scss";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'system' | 'event' | 'security';
  unread: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "System Update",
    message: "New version 2.4.0 is now live with enhanced AI algorithms.",
    time: "2 mins ago",
    type: 'system',
    unread: true
  },
  {
    id: "2",
    title: "Event Confirmed",
    message: "The Grande Wedding for 'Arjun & Sneha' has been locked.",
    time: "45 mins ago",
    type: 'event',
    unread: true
  },
  {
    id: "3",
    title: "Security Alert",
    message: "New login detected from Mumbai, India.",
    time: "2 hours ago",
    type: 'security',
    unread: false
  }
];

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifs([]);
  };

  const markAllAsRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const filteredNotifs = activeFilter === 'all'
    ? notifs
    : notifs.filter(n => n.unread);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'system': return <Settings size={16} />;
      case 'event': return <Calendar size={16} />;
      case 'security': return <Shield size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getIconClass = (type: Notification['type']) => {
    switch (type) {
      case 'system': return 'icon-system';
      case 'event': return 'icon-event';
      case 'security': return 'icon-security';
      default: return '';
    }
  };

  return (
    <div className="notification-center-overlay animate-fadeIn" onClick={onClose}>
      <div className="notification-center glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <div className="flex-center-gap-sm">
            <div className="notif-bell-icon">
              <Bell size={18} />
              {notifs.some(n => n.unread) && <span className="header-notif-pulse"></span>}
            </div>
            <div className="notif-header-text">
              <h3 className="notification-title">Intelligence Center</h3>
              <p className="notif-count-meta">{notifs.filter(n => n.unread).length} Pending Protocol{notifs.filter(n => n.unread).length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button className="notification-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="notification-tabs">
          <button
            className={`notif-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Logs
          </button>
          <button
            className={`notif-tab ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </button>
          <button className="notif-clear-btn" onClick={handleClearAll} disabled={notifs.length === 0}>
            Clear Hub
          </button>
        </div>

        <div className="notification-list custom-scrollbar">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((notif) => (
              <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`}>
                <div className={`notification-icon-wrapper ${getIconClass(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-item-header">
                    <span className="notif-item-title">{notif.title}</span>
                    <div className="notif-actions-hover">
                      <button className="notif-action-btn delete" onClick={(e) => handleDelete(notif.id, e)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="notif-item-message">{notif.message}</p>
                  <div className="notif-item-footer">
                    <span className="notif-item-time">
                      <Clock size={12} />
                      {notif.time}
                    </span>
                    {notif.unread && <span className="premium-unread-tag">New</span>}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="notif-empty-state">
              <CheckCircle2 size={40} className="empty-icon" />
              <p>Intelligence Hub Clear</p>
              <span>No active protocols found.</span>
            </div>
          )}
        </div>

        <div className="notification-footer">
          <button className="btn-ghost-sm" onClick={markAllAsRead} disabled={!notifs.some(n => n.unread)}>
            Mark all read
          </button>
          <button className="btn-link-sm">
            View Analytics
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
