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
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './analytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const AnalyticsPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { theme } = useTheme();
  const [filter, setFilter] = useState('Week');

  // Realistic user retention and growth datasets
  const analyticsDataMap = {
    Today: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      values: [3820, 3835, 3910, 4120, 4240, 4275, 4289],
      summaryTotal: '4,289',
      summaryDiff: '+169 today'
    },
    Week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [3940, 4010, 4080, 4130, 4190, 4250, 4289],
      summaryTotal: '4,289',
      summaryDiff: '+349 this week'
    },
    Month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [3620, 3810, 4040, 4289],
      summaryTotal: '4,289',
      summaryDiff: '+669 this month'
    }
  };

  const currentSet = analyticsDataMap[filter] || analyticsDataMap.Week;

  const chartData = useMemo(() => {
    return {
      labels: currentSet.labels,
      datasets: [
        {
          label: 'Active Users',
          data: currentSet.values,
          borderColor: '#4f7cff',
          borderWidth: 1.75,
          pointRadius: 0,
          pointHoverRadius: 4,
          pointHoverBackgroundColor: '#4f7cff',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 1.5,
          tension: 0.35,
          fill: false, // Strict rule: No gradient, no fill
        }
      ]
    };
  }, [currentSet]);

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
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.y.toLocaleString()} users`
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
            callback: (val) => val.toLocaleString()
          },
          border: { display: false }
        }
      }
    };
  }, [theme]);

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Single unified view of active customer retention and trajectory</p>
        </div>

        {/* Simple Date Filter: Today / Week / Month */}
        <div className="segment-filter">
          {['Today', 'Week', 'Month'].map((tab) => (
            <button
              key={tab}
              className={`segment-btn ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Strict Rule: Exactly ONE chart per page */}
      <section className="minimal-card analytics-chart-card">
        <div className="analytics-summary-bar">
          <div>
            <span className="analytics-stat-label">Active Platform Users</span>
            <div className="analytics-stat-value">{currentSet.summaryTotal}</div>
          </div>
          <span className="analytics-stat-diff">{currentSet.summaryDiff}</span>
        </div>

        <div className="analytics-canvas-box">
          <Line data={chartData} options={chartOptions} />
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
