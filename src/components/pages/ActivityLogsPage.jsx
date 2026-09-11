import React, { useState, useRef } from 'react';
import { ShieldAlert, Terminal, RefreshCw } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './activity.css';

export const ActivityLogsPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { showToast } = useDashboard();
  const [filter, setFilter] = useState('All');

  const logs = [
    {
      id: 'log-1',
      event: 'API Key sk_live_9f83 created',
      category: 'Security',
      actor: 'Alex Rivera',
      ip: '198.51.100.24',
      time: '14m ago',
      status: 'Success'
    },
    {
      id: 'log-2',
      event: 'Subscription upgraded to Pro Tier',
      category: 'Billing',
      actor: 'Alex Rivera',
      ip: '198.51.100.24',
      time: '1h ago',
      status: 'Success'
    },
    {
      id: 'log-3',
      event: 'Deployment to production (commit a4f91e2)',
      category: 'Deploy',
      actor: 'CI/CD Pipeline',
      ip: 'AWS us-east-1',
      time: '3h ago',
      status: 'Success'
    },
    {
      id: 'log-4',
      event: 'Failed login attempt via SSO token',
      category: 'Security',
      actor: 'Unknown',
      ip: '203.0.113.89',
      time: '5h ago',
      status: 'Blocked'
    },
    {
      id: 'log-5',
      event: 'Webhook endpoint /v1/stripe/invoices updated',
      category: 'Billing',
      actor: 'Sarah Chen',
      ip: '198.51.100.12',
      time: '8h ago',
      status: 'Success'
    },
    {
      id: 'log-6',
      event: 'Microservice analytics-worker-node restarted',
      category: 'Deploy',
      actor: 'Kubernetes Controller',
      ip: 'Cluster Pod #4',
      time: '1d ago',
      status: 'Success'
    }
  ];

  const handleRefresh = () => {
    showToast('Audit feed synchronized with production ledger', 'info');
  };

  const filtered = logs.filter(l => {
    if (filter === 'All') return true;
    return l.category === filter;
  });

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Activity Logs</h1>
          <p className="page-subtitle">Immutable audit trail of authentication events, deployments, and billing modifications</p>
        </div>

        <div className="page-actions">
          <div className="segment-filter">
            {['All', 'Security', 'Billing', 'Deploy'].map((t) => (
              <button
                key={t}
                className={`segment-btn ${filter === t ? 'active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="btn btn-secondary" onClick={handleRefresh} title="Sync logs">
            <RefreshCw size={13} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Logs Table Card */}
      <div className="minimal-card logs-table-card">
        <div className="logs-list">
          {filtered.map((log) => (
            <div key={log.id} className="log-row">
              <div className="log-main-col">
                <span className="log-event-title">{log.event}</span>
                <div className="log-meta-row">
                  <span className="log-category-pill">{log.category}</span>
                  <span>·</span>
                  <span>{log.actor}</span>
                  <span>·</span>
                  <span className="font-mono">{log.ip}</span>
                </div>
              </div>

              <div className="log-right-col">
                <span className={`log-status-pill ${log.status.toLowerCase()}`}>
                  {log.status}
                </span>
                <span className="log-time font-mono">{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPage;
