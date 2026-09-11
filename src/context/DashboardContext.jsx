import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProjectsData, initialApiKeys, mockBillingData } from '../data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState(null);

  // Billing state
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currentPlan, setCurrentPlan] = useState(mockBillingData.currentPlan);

  // Projects state
  const [projects, setProjects] = useState(initialProjectsData);

  // API keys state
  const [apiKeys, setApiKeys] = useState(initialApiKeys);

  // Notifications / Toast
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Keyboard shortcut listener for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsUpgradeModalOpen(false);
        setIsNewProjectModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: projectData.name,
      description: projectData.description || 'Cloud microservice deployed via Clario Pipeline',
      framework: projectData.framework || 'Node.js',
      environment: projectData.environment || 'Production',
      region: projectData.region || 'us-east-1',
      status: 'Active',
      uptime: '100%',
      latency: `${Math.floor(Math.random() * 30 + 15)}ms`,
      requests: '12k / hr',
      branch: 'main',
      commit: Math.random().toString(36).substring(2, 9),
      updatedAt: 'Just now'
    };
    setProjects(prev => [newProj, ...prev]);
    showToast(`Project "${newProj.name}" created successfully`, 'success');
  };

  const toggleProjectStatus = (id) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Active' ? 'Paused' : 'Active';
        showToast(`Project "${p.name}" status updated to ${nextStatus}`, 'info');
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const createApiKey = (name, environment, role) => {
    const randomHex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const prefix = environment === 'Production' ? 'sk_live_' : 'sk_test_';
    const newKey = {
      id: `key-${Date.now()}`,
      name: name || 'API Secret Key',
      prefix: `${prefix}${randomHex.slice(0, 4)}`,
      fullKey: `${prefix}${randomHex}`,
      created: 'Just now',
      lastUsed: 'Never',
      environment,
      role: role || 'Full Access'
    };
    setApiKeys(prev => [newKey, ...prev]);
    showToast(`New API key created for ${environment}`, 'success');
    return newKey;
  };

  const revokeApiKey = (id) => {
    const target = apiKeys.find(k => k.id === id);
    setApiKeys(prev => prev.filter(k => k.id !== id));
    showToast(`Revoked key ${target ? target.name : ''}`, 'warning');
  };

  const upgradePlan = (planId) => {
    setCurrentPlan(planId);
    setIsUpgradeModalOpen(false);
    showToast(`Successfully upgraded to ${planId.toUpperCase()} tier!`, 'success');
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        isNewProjectModalOpen,
        setIsNewProjectModalOpen,
        selectedPlanForUpgrade,
        setSelectedPlanForUpgrade,
        billingCycle,
        setBillingCycle,
        currentPlan,
        setCurrentPlan,
        upgradePlan,
        projects,
        addProject,
        toggleProjectStatus,
        apiKeys,
        createApiKey,
        revokeApiKey,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
