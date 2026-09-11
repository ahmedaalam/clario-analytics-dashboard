import React, { useState, useRef, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';
import { usePageAnimation, useCounterAnimation } from '../../hooks/useGsapAnimations';
import './dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// Flat Stat Card Component with Counter Animation
const StatCard = ({ label, targetVal, prefix = '', suffix = '', decimals = 0, delta, isPositive }) => {
  const numRef = useRef(null);
  useCounterAnimation(numRef, targetVal, prefix, suffix, decimals);

  return (
    <div className="minimal-card stat-card">
      <span className="stat-label">{label}</span>
      <div className="stat-metric-row">
        <span className="stat-value" ref={numRef}>
          {prefix}{targetVal.toLocaleString()}{suffix}
        </span>
        <span className={`stat-delta ${isPositive ? 'positive' : 'neutral'}`}>
          {delta}
        </span>
      </div>
    </div>
  );
};

export const DashboardPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { theme } = useTheme();
  const [timeframe, setTimeframe] = useState('30D');

  // Realistic revenue trajectory
  const chartDataMap = {
    '7D': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [118200, 119500, 121100, 122800, 124600, 126900, 128430]
    },
    '30D': {
      labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
      values: [98400, 103200, 107900, 112500, 118000, 123400, 128430]
    },
    '90D': {
      labels: ['Month 1', 'Month 2', 'Month 3'],
      values: [84200, 104500, 128430]
    }
  };

  const currentDataset = chartDataMap[timeframe] || chartDataMap['30D'];

  const chartData = useMemo(() => {
    return {
      labels: currentDataset.labels,
      datasets: [
        {
          label: 'Revenue ($)',
          data: currentDataset.values,
          borderColor: '#4f7cff',
          borderWidth: 1.75,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#4f7cff',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 1.5,
          tension: 0.35,
          fill: false, // Strict rule: No gradients, no fill
        }
      ]
    };
  }, [currentDataset]);

  const chartOptions = useMemo(() => {
    const isDark = theme === 'dark';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDark ? '#6b7082' : '#94a3b8';

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: isDark ? '#1a1c23' : '#ffffff',
          titleColor: isDark ? '#f2f3f5' : '#0f172a',
          bodyColor: '#4f7cff',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          padding: 8,
          boxPadding: 4,
          usePointStyle: false,
          callbacks: {
            label: (ctx) => ` $${ctx.parsed.y.toLocaleString()}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: {
            color: textColor,
            font: { family: 'Inter', size: 11 },
            maxRotation: 0
          },
          border: { display: false }
        },
        y: {
          grid: {
            color: gridColor,
            drawBorder: false
          },
          ticks: {
            color: textColor,
            font: { family: 'Inter', size: 11 },
            callback: (val) => `$${(val / 1000).toFixed(0)}k`
          },
          border: { display: false }
        }
      }
    };
  }, [theme]);

  // Strict rule: 3-5 simple recent events only
  const recentActivities = [
    { id: 1, event: 'New subscription activated', detail: 'Pro Plan · Monthly', time: '14m ago' },
    { id: 2, event: 'User upgraded to Pro', detail: 'Acme Corp', time: '2h ago' },
    { id: 3, event: 'Payment received ($4,900)', detail: 'Enterprise contract', time: '5h ago' },
    { id: 4, event: 'New subscription activated', detail: 'Starter Plan', time: '8h ago' },
  ];

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">Key performance metrics and revenue growth trajectory</p>
        </div>

        <div className="segment-filter">
          {['7D', '30D', '90D'].map((t) => (
            <button
              key={t}
              className={`segment-btn ${timeframe === t ? 'active' : ''}`}
              onClick={() => setTimeframe(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Strict Rule: Exactly 4 metrics allowed */}
      <section className="stats-grid">
        <StatCard
          label="Revenue"
          targetVal={128430}
          prefix="$"
          delta="+18.4%"
          isPositive={true}
        />
        <StatCard
          label="Active Users"
          targetVal={4289}
          delta="+12.1%"
          isPositive={true}
        />
        <StatCard
          label="Growth"
          targetVal={14.2}
          suffix="%"
          decimals={1}
          delta="+2.3%"
          isPositive={true}
        />
        <StatCard
          label="Conversion Rate"
          targetVal={3.64}
          suffix="%"
          decimals={2}
          delta="+0.4%"
          isPositive={true}
        />
      </section>

      {/* Main Visualization: Strictly 1 Clean Line Chart */}
      <section className="minimal-card chart-section">
        <div className="chart-header">
          <h2 className="section-heading">Revenue Trajectory</h2>
          <span className="chart-currency">USD / Month</span>
        </div>
        <div className="line-chart-wrapper">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>

      {/* Activity Section: Simple list of 3-5 events only */}
      <section className="minimal-card activity-section">
        <div className="activity-header">
          <h2 className="section-heading">Recent Activity</h2>
        </div>
        <ul className="activity-list">
          {recentActivities.map((item) => (
            <li key={item.id} className="activity-item">
              <div className="activity-main">
                <span className="activity-title">{item.event}</span>
                <span className="activity-detail">{item.detail}</span>
              </div>
              <span className="activity-time">{item.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;
