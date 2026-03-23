import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Search, Send, MessageSquare, Layers, FileText, Loader2 } from 'lucide-react';
import MermaidChart from '../MermaidChart';

const AiBlueprint = ({ blueprint, chat, onSendMessage, loading }) => {
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', height: 'calc(100vh - 200px)' }}>
      {/* Blueprint Content */}
      <div className="glass-card" style={{ padding: '2.5rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Execution Blueprint</h2>
          <div className="glass" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>{blueprint.summary}</p>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Layers size={22} className="primary-text" /> Architectural Flow
          </h3>
          {blueprint.flowchart ? (
            <MermaidChart chart={blueprint.flowchart} />
          ) : (
            <div className="glass" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No flow diagram generated.</div>
          )}
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Search size={22} className="primary-text" /> Data Schema
          </h3>
          {blueprint.schemaChart ? (
            <MermaidChart chart={blueprint.schemaChart} />
          ) : (
            <div className="glass" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No schema diagram generated.</div>
          )}
        </div>
        
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={22} className="primary-text" /> API Architecture
          </h3>
          {blueprint.apiChart ? (
            <MermaidChart chart={blueprint.apiChart} />
          ) : (
            <div className="glass" style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>No API architecture diagram generated.</div>
          )}
        </div>

        <div className="prose" style={{ marginTop: '4rem' }}>
          <ReactMarkdown>{blueprint.markdown}</ReactMarkdown>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
          <MessageSquare size={20} className="primary-text" />
          <h3 style={{ fontSize: '1.1rem' }}>Architect Support</h3>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', fontSize: '0.9rem', border: '1px solid var(--glass-border)' }}>
            Ask me anything about the plan, deployment strategies, or code structure.
          </div>
          {chat.map((m, i) => (
            <div key={i} style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              padding: '0.8rem 1rem',
              borderRadius: m.role === 'user' ? '16px 16px 0 16px' : '0 16px 16px 16px',
              maxWidth: '85%',
              fontSize: '0.85rem',
              boxShadow: m.role === 'user' ? '0 4px 12px rgba(99, 102, 241, 0.2)' : 'none'
            }}>
              {m.content}
            </div>
          ))}
          {loading && <div style={{ opacity: 0.5, fontStyle: 'italic', fontSize: '0.8rem' }}>Thinking...</div>}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
          <input 
            type="text" 
            placeholder="Ask a question..." 
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ fontSize: '0.9rem' }}
          />
          <button type="submit" className="btn-primary" style={{ width: '50px', padding: 0 }} disabled={loading}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiBlueprint;
