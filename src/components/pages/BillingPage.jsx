import React, { useState, useRef } from 'react';
import { Check } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { usePageAnimation } from '../../hooks/useGsapAnimations';
import './billing.css';

export const BillingPage = () => {
  const containerRef = useRef(null);
  usePageAnimation(containerRef);

  const { currentPlan, setCurrentPlan, showToast } = useDashboard();
  const [cycle, setCycle] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Essential analytics for early projects and prototypes.',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 1,000 active users',
        '7-day data retention',
        'Standard event tracking',
        'Community support'
      ],
      cta: 'Free Tier',
      isCurrent: currentPlan === 'starter'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Production metrics for fast-moving startups and apps.',
      price: cycle === 'annual' ? '$39' : '$49',
      period: '/ month',
      features: [
        'Up to 50,000 active users',
        '1-year data retention',
        'Real-time anomaly alerts',
        'Priority email & Slack support',
        'Custom export endpoints'
      ],
      cta: currentPlan === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      isCurrent: currentPlan === 'pro',
      highlight: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Dedicated infrastructure with custom SLAs and audit logs.',
      price: cycle === 'annual' ? '$239' : '$299',
      period: '/ month',
      features: [
        'Unlimited active users',
        'Unlimited retention',
        '99.99% uptime SLA',
        'Dedicated account manager',
        'SOC2 & HIPAA compliance'
      ],
      cta: 'Contact Sales',
      isCurrent: currentPlan === 'enterprise'
    }
  ];

  const handleSelectPlan = (planId) => {
    if (planId === 'enterprise') {
      showToast('Enterprise inquiries forwarded to enterprise@clario.io', 'info');
      return;
    }
    setCurrentPlan(planId);
    showToast(`Subscription updated to ${planId.toUpperCase()} plan`, 'success');
  };

  return (
    <div className="page-container" ref={containerRef}>
      {/* Calm Header */}
      <div className="page-header">
        <div className="page-header-text">
          <h1 className="page-title">Billing</h1>
          <p className="page-subtitle">Simple, predictable pricing scaled with your volume</p>
        </div>

        {/* Monthly / Annual Cycle Toggle */}
        <div className="segment-filter">
          <button
            className={`segment-btn ${cycle === 'monthly' ? 'active' : ''}`}
            onClick={() => setCycle('monthly')}
          >
            Monthly
          </button>
          <button
            className={`segment-btn ${cycle === 'annual' ? 'active' : ''}`}
            onClick={() => setCycle('annual')}
          >
            Annual (-20%)
          </button>
        </div>
      </div>

      {/* Strict Rule: 2–3 pricing cards only, highlight one "Pro" plan */}
      <div className="pricing-grid">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`minimal-card pricing-card ${plan.highlight ? 'pro-highlight' : ''}`}
          >
            <div className="pricing-card-header">
              <div className="pricing-title-row">
                <h2 className="pricing-plan-name">{plan.name}</h2>
                {plan.highlight && <span className="pro-tag">Popular</span>}
              </div>
              <p className="pricing-plan-desc">{plan.description}</p>
            </div>

            <div className="pricing-price-row">
              <span className="pricing-number">{plan.price}</span>
              <span className="pricing-period">{plan.period}</span>
            </div>

            <ul className="pricing-feature-list">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="pricing-feature-item">
                  <Check size={14} className="feature-check-icon" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button
              className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'} pricing-cta-btn`}
              onClick={() => handleSelectPlan(plan.id)}
              disabled={plan.isCurrent}
            >
              {plan.isCurrent ? 'Current Plan' : plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingPage;
