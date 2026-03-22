import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { UserPlus, ShieldCheck, Cpu } from 'lucide-react';

import useAuthStore from '../store/useAuthStore';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      await authService.register({ username, email, password, role: ['user'] });
      const loginRes = await authService.login({ username, password });
      setToken(loginRes.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Initialization failed. System conflict.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top right, #1e1b4b, #020617)' }}>
      <div className="glass" style={{ width: 'min(450px, 90vw)', padding: '3.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ background: 'var(--primary)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}>
            <UserPlus size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Join SystemCraft</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create your architect profile.</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '10px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '0.85rem' }}>Architect Name</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.85rem' }}>Communication Node</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@nexus.com" required />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '0.85rem' }}>Security Protocol</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="btn-primary" style={{ height: '3.5rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Initializing...' : <><ShieldCheck size={18} /> Register Identity</>}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already registered? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Establish Connection</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
