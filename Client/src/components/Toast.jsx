import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1';
  
  return (
    <div className="glass" style={{ 
      display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem',
      minWidth: '300px', background: 'rgba(15, 23, 42, 0.95)', borderLeft: `4px solid ${bgColor}`,
      animation: 'fadeIn 0.3s ease-out', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      {type === 'success' ? <CheckCircle2 size={20} color="#10b981" /> : <AlertCircle size={20} color="#ef4444" />}
      <span style={{ fontSize: '0.9rem', fontWeight: '500', flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={16} /></button>
    </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 1000 }}>
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
};
