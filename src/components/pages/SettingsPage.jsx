import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useDashboard } from '../../context/DashboardContext';
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './settings.css';

export const SettingsPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { theme, setTheme } = useTheme();
  const { showToast } = useDashboard();

  const [copiedKey, setCopiedKey] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex@company.io',
    workspace: 'acme-analytics'
  });

  const apiKey = 'clario_live_9f83a2e104cb883901bcf5a';

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    showToast('API key copied to clipboard', 'info');
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile updated', 'success');
  };

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Workspace parameters, authentication, and appearance</p>
        </div>
      </div>

      {/* Stacked Clean Sections */}
      <div className="settings-stack">
        {/* Section 1: Profile Info */}
        <section className="minimal-card settings-section">
          <div className="settings-section-header">
            <h2 className="section-heading">Profile Information</h2>
            <p className="settings-section-desc">Personal details and workspace identifier.</p>
          </div>

          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="workspace">Workspace Slug</label>
                <input
                  id="workspace"
                  type="text"
                  className="form-input font-mono"
                  value={profile.workspace}
                  onChange={(e) => setProfile({ ...profile, workspace: e.target.value })}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Section 2: API Key (Fake UI with clean copy) */}
        <section className="minimal-card settings-section">
          <div className="settings-section-header">
            <h2 className="section-heading">API Access Key</h2>
            <p className="settings-section-desc">Authenticate server-side ingestion SDKs with this publishable token.</p>
          </div>

          <div className="api-key-box">
            <span className="api-key-text">
              clario_live_••••••••••••••••••••f5a
            </span>
            <button 
              type="button" 
              className="btn btn-secondary btn-copy"
              onClick={handleCopyKey}
            >
              {copiedKey ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedKey ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </section>

        {/* Section 3: Theme Preference */}
        <section className="minimal-card settings-section">
          <div className="settings-section-header">
            <h2 className="section-heading">Interface Appearance</h2>
            <p className="settings-section-desc">Select visual color theme for this session.</p>
          </div>

          <div className="theme-options-row">
            <button
              type="button"
              className={`theme-select-card ${theme === 'dark' ? 'selected' : ''}`}
              onClick={() => setTheme('dark')}
            >
              <span className="theme-circle dark-circle" />
              <div className="theme-text-col">
                <span className="theme-title">Dark Mode</span>
                <span className="theme-sub">Near-black backdrop with muted contrast</span>
              </div>
            </button>

            <button
              type="button"
              className={`theme-select-card ${theme === 'light' ? 'selected' : ''}`}
              onClick={() => setTheme('light')}
            >
              <span className="theme-circle light-circle" />
              <div className="theme-text-col">
                <span className="theme-title">Light Mode</span>
                <span className="theme-sub">Off-white backdrop with crisp typography</span>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
