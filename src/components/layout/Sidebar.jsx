import React from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  FileText,
  CreditCard, 
  Users,
  FolderGit2,
  History,
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen,
  X
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import './sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'activity', label: 'Activity Logs', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed,
    isMobileSidebarOpen, 
    setIsMobileSidebarOpen
  } = useDashboard();

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-label="Close sidebar backdrop"
        />
      )}

      <aside className={`sidebar-aside ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobileSidebarOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand-row">
          <div className="sidebar-brand" onClick={() => handleNavClick('dashboard')}>
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#0f1117" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                <path d="M6 16V12M10 16V8M14 16V10M18 16V6" stroke="#f2f3f5" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="brand-title">Clario</span>
          </div>

          <button 
            className="sidebar-toggle-btn desktop-only"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>

          <button 
            className="sidebar-mobile-close-btn mobile-only"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Minimal Navigation List: 8 items */}
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="sidebar-nav-item">
                  <button 
                    className={`sidebar-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <Icon size={16} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Minimal Bottom Controls (User indicator) */}
        <div className="sidebar-bottom">
          <div className="sidebar-user-row">
            <div className="user-avatar-circle">AR</div>
            <div className="user-info-text">
              <span className="user-name">Alex Rivera</span>
              <span className="user-workspace">Workspace</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
