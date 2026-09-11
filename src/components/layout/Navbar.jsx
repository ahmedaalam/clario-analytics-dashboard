import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import './navbar.css';

const tabTitles = {
  dashboard: 'Overview',
  analytics: 'Analytics',
  reports: 'Reports',
  billing: 'Billing',
  users: 'Users',
  projects: 'Projects',
  activity: 'Activity Logs',
  settings: 'Settings'
};

export const Navbar = () => {
  const { 
    activeTab,
    isMobileSidebarOpen, 
    setIsMobileSidebarOpen
  } = useDashboard();

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar-header">
      <div className="navbar-left">
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div className="navbar-breadcrumb">
          <span className="breadcrumb-root">Clario</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{tabTitles[activeTab] || 'Overview'}</span>
        </div>
      </div>

      <div className="navbar-right">
        <button 
          className="navbar-theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          <span className="navbar-theme-text">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
