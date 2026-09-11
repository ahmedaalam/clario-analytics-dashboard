import React, { useState, useRef } from 'react';
import { UserPlus, Shield, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './users.css';

export const UsersPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { showToast } = useDashboard();
  const [filter, setFilter] = useState('All');

  const [members, setMembers] = useState([
    {
      id: 'usr-1',
      name: 'Alex Rivera',
      email: 'alex@company.io',
      role: 'Owner',
      twoFactor: true,
      lastActive: 'Now',
      initials: 'AR'
    },
    {
      id: 'usr-2',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.io',
      role: 'Admin',
      twoFactor: true,
      lastActive: '2h ago',
      initials: 'SC'
    },
    {
      id: 'usr-3',
      name: 'Marcus Vance',
      email: 'marcus@company.io',
      role: 'Member',
      twoFactor: true,
      lastActive: '5h ago',
      initials: 'MV'
    },
    {
      id: 'usr-4',
      name: 'Elena Rostova',
      email: 'elena@company.io',
      role: 'Member',
      twoFactor: false,
      lastActive: '1d ago',
      initials: 'ER'
    },
    {
      id: 'usr-5',
      name: 'Devon Bell',
      email: 'devon@company.io',
      role: 'Viewer',
      twoFactor: true,
      lastActive: '3d ago',
      initials: 'DB'
    }
  ]);

  const handleInvite = () => {
    showToast('Invitation link generated: https://clario.io/join/acme-org', 'info');
  };

  const handleRoleChange = (member) => {
    showToast(`Permission settings updated for ${member.name}`, 'info');
  };

  const filtered = members.filter(m => {
    if (filter === 'All') return true;
    return m.role === filter;
  });

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Users</h1>
          <p className="page-subtitle">Team members with workspace access, roles, and security authentication</p>
        </div>

        <div className="page-actions">
          <div className="segment-filter">
            {['All', 'Admin', 'Member'].map((t) => (
              <button
                key={t}
                className={`segment-btn ${filter === t ? 'active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={handleInvite}>
            <UserPlus size={14} />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="minimal-card users-table-card">
        <div className="users-list">
          {filtered.map((user) => (
            <div key={user.id} className="user-row">
              <div className="user-identity">
                <div className="member-avatar">{user.initials}</div>
                <div className="member-info">
                  <div className="member-name-row">
                    <span className="member-name">{user.name}</span>
                    <span className="member-role-tag">{user.role}</span>
                  </div>
                  <span className="member-email font-mono">{user.email}</span>
                </div>
              </div>

              <div className="user-meta-right">
                <div className="security-pill">
                  <CheckCircle2 size={13} className={user.twoFactor ? 'status-ok' : 'status-warn'} />
                  <span>{user.twoFactor ? '2FA Enabled' : '2FA Off'}</span>
                </div>

                <span className="member-active-time">Active {user.lastActive}</span>

                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleRoleChange(user)}
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
