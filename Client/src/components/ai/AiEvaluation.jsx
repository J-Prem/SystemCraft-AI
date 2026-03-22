import React from 'react';
import { CheckCircle2, XCircle, FileText, Loader2 } from 'lucide-react';

const AiEvaluation = ({ evaluation, selectedPipeline, onGenerateBlueprint, loading }) => {
  if (!evaluation || !selectedPipeline) return null;

  const metrics = ['speed', 'reliability', 'cognitiveLoad', 'extensibility'];

  return (
    <div className="glass-card fade-in" style={{ padding: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
            Winner: <span className="primary-text">{selectedPipeline.name}</span>
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            {evaluation.reasoning}
          </p>

          <div className="grid-2">
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <h4 style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} /> Key Advantages
              </h4>
              <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                {selectedPipeline.pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <h4 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <XCircle size={18} /> Trade-offs
              </h4>
              <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                {selectedPipeline.cons.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>Metric Analysis</h3>
          {metrics.map(metric => (
            <div key={metric} className="score-bar-container">
              <div className="score-label">
                <span>{metric.replace(/([A-Z])/g, ' $1')}</span>
                <span>{evaluation.scores[selectedPipeline.id][metric]}/10</span>
              </div>
              <div className="score-bar-bg">
                <div 
                  className="score-bar-fill" 
                  style={{ width: `${evaluation.scores[selectedPipeline.id][metric] * 10}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <button onClick={onGenerateBlueprint} className="btn-primary btn-large" disabled={loading}>
          {loading ? <Loader2 className="spinner" /> : <><FileText size={20} /> Generate Execution Blueprint</>}
        </button>
      </div>
    </div>
  );
};

export default AiEvaluation;
