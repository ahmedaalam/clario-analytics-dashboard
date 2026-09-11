import React, { useState, useRef } from 'react';
import { Plus, ExternalLink, GitBranch, Server } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './projects.css';

export const ProjectsPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { showToast } = useDashboard();
  const [filter, setFilter] = useState('All');

  const [projectsList, setProjectsList] = useState([
    {
      id: 'proj-1',
      name: 'clario-core-api',
      description: 'High-throughput analytics ingestion pipeline',
      framework: 'Node.js',
      region: 'us-east-1',
      status: 'Active',
      uptime: '99.99%',
      latency: '28ms',
      branch: 'main',
      updated: '14m ago'
    },
    {
      id: 'proj-2',
      name: 'billing-engine-v2',
      description: 'Stripe webhook processor and invoice automation',
      framework: 'Go',
      region: 'us-east-1',
      status: 'Active',
      uptime: '100%',
      latency: '16ms',
      branch: 'main',
      updated: '1h ago'
    },
    {
      id: 'proj-3',
      name: 'analytics-worker-node',
      description: 'Distributed aggregation queue for rollups',
      framework: 'Rust',
      region: 'eu-west-1',
      status: 'Active',
      uptime: '99.95%',
      latency: '42ms',
      branch: 'main',
      updated: '4h ago'
    },
    {
      id: 'proj-4',
      name: 'customer-portal-nextjs',
      description: 'Client dashboard and embeddable telemetry widgets',
      framework: 'Next.js',
      region: 'us-west-2',
      status: 'Paused',
      uptime: '99.80%',
      latency: '64ms',
      branch: 'staging',
      updated: '1d ago'
    }
  ]);

  const toggleStatus = (id) => {
    setProjectsList(prev => prev.map(p => {
      if (p.id === id) {
        const next = p.status === 'Active' ? 'Paused' : 'Active';
        showToast(`Service "${p.name}" marked as ${next}`, 'info');
        return { ...p, status: next };
      }
      return p;
    }));
  };

  const handleNewProject = () => {
    showToast('Project creation CLI: `npx clario-cli init`', 'info');
  };

  const filtered = projectsList.filter(p => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">Microservices, ingestion endpoints, and application telemetry</p>
        </div>

        <div className="page-actions">
          <div className="segment-filter">
            {['All', 'Active', 'Paused'].map((t) => (
              <button
                key={t}
                className={`segment-btn ${filter === t ? 'active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={handleNewProject}>
            <Plus size={14} />
            <span>New Service</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-minimal-grid">
        {filtered.map((item) => (
          <div key={item.id} className="minimal-card project-minimal-card">
            <div className="project-card-top">
              <div className="project-identity">
                <span className="project-name">{item.name}</span>
                <span className="project-meta-pill">{item.framework}</span>
              </div>

              <span className={`project-status-tag ${item.status.toLowerCase()}`}>
                <span className="indicator-dot active" />
                {item.status}
              </span>
            </div>

            <p className="project-desc">{item.description}</p>

            <div className="project-specs-row">
              <div className="spec-item">
                <span className="spec-label">Latency</span>
                <span className="spec-value font-mono">{item.latency}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Uptime</span>
                <span className="spec-value font-mono">{item.uptime}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Region</span>
                <span className="spec-value font-mono">{item.region}</span>
              </div>
            </div>

            <div className="project-card-bottom">
              <div className="project-git-info">
                <GitBranch size={13} className="branch-icon" />
                <span className="branch-text">{item.branch} · {item.updated}</span>
              </div>

              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => toggleStatus(item.id)}
              >
                {item.status === 'Active' ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
