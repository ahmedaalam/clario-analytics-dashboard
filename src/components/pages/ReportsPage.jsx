import React, { useState, useRef } from 'react';
import { Download, FileText, Plus } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './reports.css';

export const ReportsPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { showToast } = useDashboard();
  const [filter, setFilter] = useState('All');

  const reportsData = [
    {
      id: 'rep-1',
      title: 'Q3 Revenue & Cohort Retention',
      type: 'Scheduled',
      format: 'PDF',
      date: 'Sep 01, 2026',
      size: '2.4 MB'
    },
    {
      id: 'rep-2',
      title: 'August VAT & Sales Tax Ledger',
      type: 'Export',
      format: 'CSV',
      date: 'Aug 31, 2026',
      size: '840 KB'
    },
    {
      id: 'rep-3',
      title: 'Weekly Churn & Expansion Rollup',
      type: 'Scheduled',
      format: 'CSV',
      date: 'Aug 28, 2026',
      size: '512 KB'
    },
    {
      id: 'rep-4',
      title: 'Annual MRR Audit & Accounting Snapshot',
      type: 'Export',
      format: 'PDF',
      date: 'Aug 15, 2026',
      size: '4.1 MB'
    },
    {
      id: 'rep-5',
      title: 'SOC2 Telemetry & Access Compliance Logs',
      type: 'Scheduled',
      format: 'JSON',
      date: 'Aug 01, 2026',
      size: '1.2 MB'
    }
  ];

  const handleDownload = (report) => {
    showToast(`Downloading ${report.title} (${report.format})...`, 'success');
  };

  const handleGenerate = () => {
    showToast('New report queued for generation. You will receive an alert once ready.', 'info');
  };

  const filtered = reportsData.filter(r => {
    if (filter === 'All') return true;
    return r.type === filter;
  });

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">Scheduled exports, accounting ledger snapshots, and cohort downloads</p>
        </div>

        <div className="page-actions">
          <div className="segment-filter">
            {['All', 'Scheduled', 'Export'].map((t) => (
              <button
                key={t}
                className={`segment-btn ${filter === t ? 'active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={handleGenerate}>
            <Plus size={14} />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="minimal-card reports-table-card">
        <div className="reports-list">
          {filtered.map((item) => (
            <div key={item.id} className="report-row">
              <div className="report-identity">
                <FileText size={16} className="report-file-icon" />
                <div className="report-info">
                  <span className="report-title">{item.title}</span>
                  <div className="report-meta">
                    <span className="report-type-badge">{item.type}</span>
                    <span>·</span>
                    <span className="font-mono">{item.date}</span>
                    <span>·</span>
                    <span className="font-mono">{item.size}</span>
                  </div>
                </div>
              </div>

              <div className="report-actions">
                <span className="format-tag font-mono">{item.format}</span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDownload(item)}
                  title="Download report file"
                >
                  <Download size={13} />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
