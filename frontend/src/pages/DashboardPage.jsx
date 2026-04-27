import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

import { 
  FaHeart, FaSignOutAlt, FaUser, FaEnvelope, 
  FaPhone, FaCalendarAlt, FaUsers, FaQrcode,
  FaPlus, FaChartLine, FaCog, FaBell,
  FaEdit, FaTrash, FaShare, FaDownload,
  FaMagic, FaStar, FaGift, FaClock,
  FaMapMarkerAlt, FaCheckCircle, FaSpinner,
  FaBars, FaTimes, FaArrowRight
} from 'react-icons/fa';
import '../styles/globals.css';
import '../styles/animations.css';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvitations: 0,
    totalGuests: 0,
    totalViews: 0,
    rsvpRate: 0
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchInvitations();
    fetchStats();
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await axios.get(`${API_URL}/invitations`);
      setInvitations(response.data.data || []);
    } catch (error) {
      console.error('Failed to load invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/invitations`);
      const invites = response.data.data || [];
      const totalGuests = invites.reduce((sum, inv) => sum + (inv.stats?.rsvpCount?.yes || 0), 0);
      const totalViews = invites.reduce((sum, inv) => sum + (inv.stats?.totalViews || 0), 0);
      
      setStats({
        totalInvitations: invites.length,
        totalGuests: totalGuests,
        totalViews: totalViews,
        rsvpRate: invites.length > 0 ? (totalGuests / (invites.length * 100) * 100).toFixed(1) : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    const confirm = window.confirm('Are you sure you want to logout?');
    if (confirm) {
      await logout();
      navigate('/login');
    }
  };

  const handleCreateInvitation = () => {
    navigate('/create-invitation');
  };

  const handleViewInvitation = (id) => {
    navigate(`/edit-invitation/${id}`);
  };

  const handleDeleteInvitation = async (id) => {
    if (window.confirm('Are you sure you want to delete this invitation?')) {
      try {
        await axios.delete(`${API_URL}/invitations/${id}`);
        toast.success('Invitation deleted successfully');
        fetchInvitations();
        fetchStats();
      } catch (error) {
        toast.error('Failed to delete invitation');
      }
    }
  };

  const quickActions = [
    { icon: FaPlus, label: 'Create Invitation', color: '#FF3366', action: handleCreateInvitation },
    { icon: FaUsers, label: 'Add Guests', color: '#3b82f6', action: () => toast.info('Coming Soon!') },
    { icon: FaQrcode, label: 'Generate QR', color: '#10b981', action: () => toast.info('Coming Soon!') },
    { icon: FaShare, label: 'Share', color: '#8b5cf6', action: () => toast.info('Coming Soon!') }
  ];

  const statCards = [
    { icon: FaHeart, label: 'Total Invitations', value: stats.totalInvitations, color: 'pink', suffix: '' },
    { icon: FaUsers, label: 'Total Guests', value: stats.totalGuests, color: 'blue', suffix: '' },
    { icon: FaChartLine, label: 'Total Views', value: stats.totalViews, color: 'green', suffix: '' },
    { icon: FaCheckCircle, label: 'RSVP Rate', value: stats.rsvpRate, color: 'purple', suffix: '%' }
  ];

  return (
    <div className="dashboard-page-premium">
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar-premium ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-premium">
          <div className="logo-wrapper">
            <FaHeart className="sidebar-logo-premium" />
            <span>Wed<span className="text-gold">Card</span> Pro</span>
          </div>
        </div>
        
        <nav className="sidebar-nav-premium">
          <Link to="/dashboard" className="nav-item-premium active">
            <FaChartLine />
            <span>Dashboard</span>
          </Link>
          <button onClick={handleCreateInvitation} className="nav-item-premium">
            <FaPlus />
            <span>Create Invitation</span>
          </button>
          <Link to="#" className="nav-item-premium">
            <FaUsers />
            <span>Guest Management</span>
          </Link>
          <Link to="#" className="nav-item-premium">
            <FaQrcode />
            <span>QR Codes</span>
          </Link>
          <Link to="#" className="nav-item-premium">
            <FaCalendarAlt />
            <span>Events</span>
          </Link>
          <Link to="#" className="nav-item-premium">
            <FaCog />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer-premium">
          <div className="user-info-sidebar">
            <div className="user-avatar-sidebar">
              <FaUser />
            </div>
            <div className="user-details">
              <span className="user-name-sidebar">{user?.name || 'User'}</span>
              <span className="user-email-sidebar">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn-premium">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main-premium">
        {/* Header */}
        <header className="dashboard-header-premium">
          <div className="header-title-premium">
            <h1>Dashboard</h1>
            <p>Welcome back, {user?.name?.split(' ')[0] || 'Guest'}! 👋</p>
          </div>
          
          <div className="header-actions-premium">
            <button className="notification-btn-premium">
              <FaBell />
              <span className="notification-badge">3</span>
            </button>
            
            <div className="user-menu-premium">
              <div className="user-avatar-premium">
                <FaUser />
              </div>
              <div className="user-info-premium">
                <span className="user-name-premium">{user?.name || 'User'}</span>
                <span className="user-email-premium">{user?.email || 'user@example.com'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <div className="welcome-banner-premium">
          <div className="banner-content">
            <div className="banner-text">
              <h2>Create Your Dream Wedding Invitation</h2>
              <p>Use our AI-powered designer to create stunning invitations in minutes</p>
              <button onClick={handleCreateInvitation} className="banner-btn">
                Create New Invitation
                <FaArrowRight />
              </button>
            </div>
            <div className="banner-icon">
              <FaGift />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-premium">
          {statCards.map((stat, index) => (
            <div key={index} className={`stat-card-premium ${stat.color}`}>
              <div className="stat-icon-premium">
                <stat.icon />
              </div>
              <div className="stat-info-premium">
                <h3>{stat.value}{stat.suffix}</h3>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-premium">
          <div className="section-header-premium">
            <h2>Quick Actions</h2>
            <p>Get started with these common tasks</p>
          </div>
          <div className="actions-grid-premium">
            {quickActions.map((action, index) => (
              <button key={index} className="action-card-premium" onClick={action.action}>
                <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                  <action.icon />
                </div>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Invitations */}
        <div className="recent-invitations-premium">
          <div className="section-header-premium">
            <div>
              <h2>Recent Invitations</h2>
              <p>Your latest created invitations</p>
            </div>
            {invitations.length > 0 && (
              <button className="view-all-btn-premium">View All</button>
            )}
          </div>
          
          {loading ? (
            <div className="loading-state-premium">
              <FaSpinner className="spinner" />
              <p>Loading your invitations...</p>
            </div>
          ) : invitations.length === 0 ? (
            <div className="empty-state-premium">
              <div className="empty-icon-wrapper">
                <FaHeart className="empty-icon" />
              </div>
              <h3>No Invitations Yet</h3>
              <p>Create your first digital wedding invitation and start managing your guests</p>
              <button onClick={handleCreateInvitation} className="create-btn-premium">
                <FaPlus />
                Create Your First Invitation
              </button>
            </div>
          ) : (
            <div className="invitations-list-premium">
              {invitations.slice(0, 3).map((invitation) => (
                <div key={invitation._id} className="invitation-item-premium">
                  <div className="invitation-info">
                    <h4>{invitation.title || `${invitation.couple?.bride} & ${invitation.couple?.groom}`}</h4>
                    <div className="invitation-meta">
                      <span><FaCalendarAlt /> {new Date(invitation.eventDate).toLocaleDateString()}</span>
                      <span><FaMapMarkerAlt /> {invitation.venue?.city || 'Location TBD'}</span>
                      <span><FaUsers /> {invitation.stats?.rsvpCount?.yes || 0} RSVPs</span>
                    </div>
                  </div>
                  <div className="invitation-actions-premium">
                    <button onClick={() => handleViewInvitation(invitation._id)} className="action-icon-btn edit">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteInvitation(invitation._id)} className="action-icon-btn delete">
                      <FaTrash />
                    </button>
                    <button className="action-icon-btn share">
                      <FaShare />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="tips-section-premium">
          <div className="tips-header">
            <FaMagic className="tips-icon" />
            <h2>Pro Tips</h2>
          </div>
          <div className="tips-grid">
            <div className="tip-card">
              <FaStar className="tip-icon" />
              <h4>Personalize Your Invitation</h4>
              <p>Add your own photos and customize colors to match your wedding theme</p>
            </div>
            <div className="tip-card">
              <FaQrcode className="tip-icon" />
              <h4>Use QR Codes</h4>
              <p>Generate QR codes for easy access to your wedding portal</p>
            </div>
            <div className="tip-card">
              <FaUsers className="tip-icon" />
              <h4>Track RSVPs</h4>
              <p>Monitor guest responses and manage dietary preferences easily</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dashboard-page-premium {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
          font-family: 'Poppins', sans-serif;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1001;
          background: rgba(255,255,255,0.1);
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 12px;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          display: none;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(255,215,0,0.2);
        }

        /* Sidebar Overlay */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          z-index: 998;
          display: none;
        }

        /* Sidebar Styles */
        .dashboard-sidebar-premium {
          width: 280px;
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          z-index: 999;
          transition: transform 0.3s ease;
        }

        .sidebar-header-premium {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .sidebar-logo-premium {
          color: #FF3366;
          font-size: 1.75rem;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .text-gold {
          color: #FFD700;
        }

        .sidebar-nav-premium {
          flex: 1;
          padding: 1.5rem 0;
        }

        .nav-item-premium {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          width: 100%;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .nav-item-premium:hover {
          background: rgba(255,51,102,0.1);
          color: #FF3366;
          transform: translateX(5px);
        }

        .nav-item-premium.active {
          background: linear-gradient(90deg, rgba(255,51,102,0.2), transparent);
          color: #FF3366;
          border-right: 3px solid #FF3366;
        }

        .sidebar-footer-premium {
          padding: 1rem;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .user-info-sidebar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .user-avatar-sidebar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF3366, #FF6B35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-details {
          flex: 1;
        }

        .user-name-sidebar {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
        }

        .user-email-sidebar {
          display: block;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
        }

        .logout-btn-premium {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 12px;
          color: #ef4444;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn-premium:hover {
          background: rgba(239,68,68,0.2);
          transform: translateY(-2px);
        }

        /* Main Content */
        .dashboard-main-premium {
          flex: 1;
          margin-left: 280px;
          padding: 2rem;
          overflow-x: auto;
        }

        /* Header */
        .dashboard-header-premium {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header-title-premium h1 {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .header-title-premium p {
          color: rgba(255,255,255,0.6);
        }

        .header-actions-premium {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-btn-premium {
          position: relative;
          background: rgba(255,255,255,0.1);
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notification-btn-premium:hover {
          background: rgba(255,215,0,0.2);
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #FF3366;
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
        }

        .user-menu-premium {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255,255,255,0.05);
          padding: 0.5rem 1rem;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .user-avatar-premium {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #FF3366, #FF6B35);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-info-premium {
          text-align: left;
        }

        .user-name-premium {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
        }

        .user-email-premium {
          display: block;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
        }

        /* Welcome Banner */
        .welcome-banner-premium {
          background: linear-gradient(135deg, rgba(255,51,102,0.15), rgba(255,107,53,0.15));
          border: 1px solid rgba(255,215,0,0.3);
          border-radius: 20px;
          padding: 1.5rem 2rem;
          margin-bottom: 2rem;
        }

        .banner-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .banner-text h2 {
          color: white;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        .banner-text p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 1rem;
        }

        .banner-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #0a0a0f;
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .banner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }

        .banner-icon {
          font-size: 3rem;
          color: #FFD700;
          animation: float 3s ease-in-out infinite;
        }

        /* Stats Grid */
        .stats-grid-premium {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card-premium {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
        }

        .stat-card-premium:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.08);
        }

        .stat-card-premium.pink .stat-icon-premium {
          background: rgba(255,51,102,0.15);
          color: #FF3366;
        }

        .stat-card-premium.blue .stat-icon-premium {
          background: rgba(59,130,246,0.15);
          color: #3b82f6;
        }

        .stat-card-premium.green .stat-icon-premium {
          background: rgba(16,185,129,0.15);
          color: #10b981;
        }

        .stat-card-premium.purple .stat-icon-premium {
          background: rgba(139,92,246,0.15);
          color: #8b5cf6;
        }

        .stat-icon-premium {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-info-premium h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .stat-info-premium p {
          color: rgba(255,255,255,0.6);
          font-size: 0.875rem;
        }

        /* Quick Actions */
        .quick-actions-premium {
          margin-bottom: 2rem;
        }

        .section-header-premium {
          margin-bottom: 1.5rem;
        }

        .section-header-premium h2 {
          color: white;
          font-size: 1.3rem;
          margin-bottom: 0.25rem;
        }

        .section-header-premium p {
          color: rgba(255,255,255,0.5);
          font-size: 0.875rem;
        }

        .actions-grid-premium {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .action-card-premium {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .action-card-premium:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-3px);
        }

        .action-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .action-card-premium span {
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Recent Invitations */
        .recent-invitations-premium {
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .section-header-premium {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .view-all-btn-premium {
          background: rgba(255,255,255,0.1);
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-all-btn-premium:hover {
          background: rgba(255,215,0,0.2);
          color: #FFD700;
        }

        .loading-state-premium {
          text-align: center;
          padding: 3rem;
        }

        .spinner {
          animation: spin 1s linear infinite;
          font-size: 2rem;
          color: #FFD700;
          margin-bottom: 1rem;
        }

        .empty-state-premium {
          text-align: center;
          padding: 3rem;
        }

        .empty-icon-wrapper {
          width: 80px;
          height: 80px;
          background: rgba(255,255,255,0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .empty-icon {
          font-size: 2.5rem;
          color: #FFD700;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .empty-state-premium h3 {
          color: white;
          margin-bottom: 0.5rem;
        }

        .empty-state-premium p {
          color: rgba(255,255,255,0.6);
          margin-bottom: 1.5rem;
        }

        .create-btn-premium {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #0a0a0f;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .create-btn-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }

        .invitations-list-premium {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .invitation-item-premium {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .invitation-item-premium:hover {
          background: rgba(255,255,255,0.08);
        }

        .invitation-info h4 {
          color: white;
          margin-bottom: 0.5rem;
        }

        .invitation-meta {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .invitation-meta span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }

        .invitation-actions-premium {
          display: flex;
          gap: 0.5rem;
        }

        .action-icon-btn {
          width: 35px;
          height: 35px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-icon-btn.edit {
          background: rgba(59,130,246,0.15);
          color: #3b82f6;
        }

        .action-icon-btn.edit:hover {
          background: #3b82f6;
          color: white;
        }

        .action-icon-btn.delete {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }

        .action-icon-btn.delete:hover {
          background: #ef4444;
          color: white;
        }

        .action-icon-btn.share {
          background: rgba(16,185,129,0.15);
          color: #10b981;
        }

        .action-icon-btn.share:hover {
          background: #10b981;
          color: white;
        }

        /* Tips Section */
        .tips-section-premium {
          background: rgba(255,255,255,0.03);
          border-radius: 20px;
          padding: 1.5rem;
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tips-icon {
          color: #FFD700;
          font-size: 1.3rem;
        }

        .tips-header h2 {
          color: white;
          font-size: 1.2rem;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .tip-card {
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
        }

        .tip-icon {
          font-size: 1.5rem;
          color: #FFD700;
          margin-bottom: 0.5rem;
        }

        .tip-card h4 {
          color: white;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .tip-card p {
          color: rgba(255,255,255,0.5);
          font-size: 0.75rem;
          line-height: 1.4;
        }

        /* Animations */
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .stats-grid-premium {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .sidebar-overlay {
            display: block;
          }

          .dashboard-sidebar-premium {
            transform: translateX(-100%);
          }

          .dashboard-sidebar-premium.open {
            transform: translateX(0);
          }

          .dashboard-main-premium {
            margin-left: 0;
            padding: 1rem;
            padding-top: 4rem;
          }

          .stats-grid-premium {
            grid-template-columns: 1fr;
          }

          .actions-grid-premium {
            grid-template-columns: repeat(2, 1fr);
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }

          .banner-content {
            flex-direction: column;
            text-align: center;
          }

          .banner-icon {
            display: none;
          }

          .user-menu-premium {
            display: none;
          }

          .invitation-item-premium {
            flex-direction: column;
            text-align: center;
          }

          .invitation-meta {
            justify-content: center;
          }

          .header-title-premium h1 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .actions-grid-premium {
            grid-template-columns: 1fr;
          }

          .stat-card-premium {
            padding: 1rem;
          }

          .stat-icon-premium {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .stat-info-premium h3 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;