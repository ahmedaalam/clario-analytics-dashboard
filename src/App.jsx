import React from 'react';
import { useDashboard } from './context/DashboardContext';
import { useLenis } from './hooks/useLenis';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/ui/Toast';

import { DashboardPage } from './components/pages/DashboardPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { ReportsPage } from './components/pages/ReportsPage';
import { BillingPage } from './components/pages/BillingPage';
import { UsersPage } from './components/pages/UsersPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ActivityLogsPage } from './components/pages/ActivityLogsPage';
import { SettingsPage } from './components/pages/SettingsPage';

export const App = () => {
  // Lenis smooth scroll
  useLenis();

  const { activeTab, isSidebarCollapsed } = useDashboard();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'billing':
        return <BillingPage />;
      case 'users':
        return <UsersPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'activity':
        return <ActivityLogsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Minimal Sidebar with 8 Pages */}
      <Sidebar />

      {/* Main Content Area */}
      <div className={`main-content-wrapper ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar />
        <main className="content-area">
          {renderActivePage()}
        </main>
      </div>

      {/* Minimal Global Toast Feedback */}
      <ToastContainer />
    </div>
  );
};

export default App;
