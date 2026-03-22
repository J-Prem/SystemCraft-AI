import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { projectService } from '../services/api';
import { Plus, Rocket, ArrowRight, Package, Info, Trash2 } from 'lucide-react';
import useProjectStore from '../store/useProjectStore';
import { ToastContainer } from '../components/Toast';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [scale, setScale] = useState('medium');
  const [toasts, setToasts] = useState([]);
  const { projects, setProjects, loading, setLoading } = useProjectStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectService.getAll();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      addToast("Failed to sync blueprints", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await projectService.create({ name, description, scale });
      setProjects([res.data, ...projects]);
      setShowModal(false);
      addToast("New architecture initialized successfully");
      setTimeout(() => navigate(`/project/${res.data.id}`), 1000);
    } catch (err) {
      console.error(err);
      addToast("Failed to initialize development", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this blueprint? This action cannot be undone.")) {
      try {
        await projectService.delete(id);
        setProjects(projects.filter(p => p.id !== id));
        addToast("Blueprint decommissioned successfully", "info");
      } catch (err) {
        console.error(err);
        addToast("Failed to delete project", "error");
      }
    }
  };

  const Skeletons = () => (
    <>
      {[1, 2, 3].map(i => (
        <div key={i} className="glass" style={{ padding: '2.5rem', height: '280px' }}>
          <div className="skeleton" style={{ width: '40%', height: '24px', marginBottom: '1.5rem' }}></div>
          <div className="skeleton" style={{ width: '80%', height: '32px', marginBottom: '1rem' }}></div>
          <div className="skeleton" style={{ width: '100%', height: '60px', marginBottom: '2rem' }}></div>
          <div className="skeleton" style={{ width: '30%', height: '18px' }}></div>
        </div>
      ))}
    </>
  );

  return (
    <div className="main-content">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Architecture Central</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Blueprint your next breakthrough with AI precision.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary" style={{ padding: '0.875rem 1.75rem' }}>
          <Plus size={20} /> Build New System
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
        {loading && projects.length === 0 ? (
          <Skeletons />
        ) : projects.length === 0 ? (
          <div className="glass empty-state" style={{ gridColumn: '1 / -1' }}>
            <div style={{ background: 'var(--primary-muted)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
              <Package size={48} color="var(--primary)" />
            </div>
            <h2>No Blueprints Found</h2>
            <p style={{ maxWidth: '400px', margin: '1rem 0 2rem' }}>The workspace is clear. Ready to architect something remarkable?</p>
            <button onClick={() => setShowModal(true)} className="btn-secondary">
              <Plus size={18} /> Start First Project
            </button>
          </div>
        ) : (
          projects.map(project => (
            <Link key={project.id} to={`/project/${project.id}`} className="glass glass-hover project-card" style={{ padding: '2.5rem', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <button 
                onClick={(e) => handleDelete(e, project.id)}
                className="delete-btn"
                title="Delete Project"
              >
                <Trash2 size={16} />
              </button>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                 <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--primary-muted)', padding: '0.4rem 0.8rem', borderRadius: '100px', color: 'var(--primary)' }}>{project.scale} Scale</span>
                 <ArrowRight size={20} color="var(--primary)" style={{ opacity: 0.6 }} />
              </div>
              <h3 style={{ marginBottom: '1rem', lineHeight: '1.3' }}>{project.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', flex: 1, display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                View Blueprint
              </div>
            </Link>
          ))
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, animation: 'fadeIn 0.2s ease-out' }}>
          <div className="glass" style={{ width: 'min(550px, 95vw)', padding: '3.5rem', position: 'relative' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>New Implementation</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Define your requirements for the AI architect.</p>
            
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div className="form-group">
                <label>System Identity</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Nexus E-commerce Core" required />
              </div>
              <div className="form-group">
                <label>Mission Description</label>
                <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the primary goals and domains..." required />
              </div>
              <div className="form-group">
                <label>Operational Scale</label>
                <select value={scale} onChange={(e) => setScale(e.target.value)}>
                  <option value="small">Small (Prototype / MVP)</option>
                  <option value="medium">Medium (Scaled Startup)</option>
                  <option value="large">Large (High-Availability Enterprise)</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1 }}>Discard</button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={loading}>
                  {loading ? 'Processing Blueprint...' : <><Rocket size={18} /> Initialize Development</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
