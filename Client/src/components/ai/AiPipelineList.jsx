import React from 'react';
import { Cpu, Zap, Activity, ChevronRight } from 'lucide-react';

const AiPipelineList = ({ pipelines, onEvaluate, loading }) => {
  return (
    <div className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Architectural Options</h2>
        <p className="text-dim">Choose from these AI-generated architecture pipelines.</p>
      </div>

      <div className="pipeline-grid">
        {pipelines.map(p => (
          <div key={p.id} className="glass-card pipeline-card">
            <div className="card-header">
              <h3 className="primary-text">{p.name}</h3>
              <span className="badge">{p.complexity}</span>
            </div>
            <p className="summary">{p.summary}</p>
            <div className="tool-list">
              {p.tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
            </div>
            <div className="scalability-info">
              <strong>Scalability:</strong> {p.scalability}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <button onClick={onEvaluate} className="btn-primary btn-large" disabled={loading}>
          {loading ? "Evaluating..." : <><Activity size={20} /> Compare & Recommend</>}
        </button>
      </div>
    </div>
  );
};

export default AiPipelineList;
