import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, LogOut, LayoutDashboard, Settings, Layers } from 'lucide-react';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '1.25rem 2.5rem', borderBottom: '1px solid var(--border)', background: 'var(--glass)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none', color: 'inherit' }}>
        <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '10px', boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' }}>
          <Cpu size={22} color="white" />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em' }}>SystemCraft <span style={{ color: 'var(--primary)' }}>AI</span></span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/dashboard" className="btn-nav">
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/ai-architect" className="btn-nav">
          <Layers size={18} /> AI Architect
        </Link>
        <button onClick={onLogout} className="btn-logout">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
