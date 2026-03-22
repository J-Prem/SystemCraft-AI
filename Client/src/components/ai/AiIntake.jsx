import React, { useState } from 'react';
import { Layers, ArrowRight, Loader2 } from 'lucide-react';
import { ProjectIntake } from '../../dto/ai/ProjectIntake';

const AiIntake = ({ onNext, loading }) => {
  const [data, setData] = useState(new ProjectIntake());

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(data);
  };

  return (
    <div className="glass-card fade-in" style={{ padding: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>AI Architect: Project Intake</h2>
        <p className="text-dim">Define your project requirements for the AI agent.</p>
      </div>

      <form onSubmit={handleSubmit} className="ai-form">
        <div className="grid-2">
          <div className="form-group">
            <label>Problem Statement</label>
            <textarea 
              value={data.problem} 
              onChange={e => setData({...data, problem: e.target.value})} 
              placeholder="What problem are we solving?"
              required
            />
          </div>
          <div className="form-group">
            <label>Target User</label>
            <textarea 
              value={data.user} 
              onChange={e => setData({...data, user: e.target.value})} 
              placeholder="Who is this for?"
              required
            />
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Main Output</label>
            <textarea 
              value={data.output} 
              onChange={e => setData({...data, output: e.target.value})} 
              placeholder="What are the key deliverables?"
              required
            />
          </div>
          <div className="form-group">
            <label>Constraints</label>
            <textarea 
              value={data.constraints} 
              onChange={e => setData({...data, constraints: e.target.value})} 
              placeholder="Budget, Stack, Deadline..."
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-2" disabled={loading}>
          {loading ? <Loader2 className="spinner" /> : <><Layers size={20} /> Initialize Architect</>}
        </button>
      </form>
    </div>
  );
};

export default AiIntake;
