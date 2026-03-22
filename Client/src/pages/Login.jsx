import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Rocket, Shield, Cpu, Zap } from 'lucide-react';

import useAuthStore from '../store/useAuthStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login({ username, password });
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please authenticate again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top right, #1e1b4b, #020617)' }}>
      <div className="glass" style={{ width: 'min(450px, 90vw)', padding: '3.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}>
            <Cpu size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>SystemCraft AI</h2>
          <p style={{ color: 'var(--text-muted)' }}>Authenticate to access your neural blueprints.</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.85rem' }}>Operator Identity</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.85rem' }}>Security Protocol</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary" style={{ height: '3.5rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Decrypting...' : <><Zap size={18} /> Establish Connection</>}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          New Operator? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Initialize Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
