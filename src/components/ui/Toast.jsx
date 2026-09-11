import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import './toast.css';

export const ToastContainer = () => {
  const { toasts, removeToast } = useDashboard();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="toast-icon success" />;
      case 'warning':
        return <AlertTriangle size={16} className="toast-icon warning" />;
      case 'error':
        return <AlertCircle size={16} className="toast-icon error" />;
      default:
        return <Info size={16} className="toast-icon info" />;
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.type}`}>
          {getIcon(toast.type)}
          <span className="toast-message">{toast.message}</span>
          <button 
            className="toast-close" 
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss alert"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
