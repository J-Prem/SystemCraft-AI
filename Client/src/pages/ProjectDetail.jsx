import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService, chatService } from '../services/api';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { Send, Database, GitBranch, Terminal, MessageSquare, Info, Folder, File, ChevronRight, Trash2 } from 'lucide-react';

const FileTree = ({ structure }) => {
  if (!structure) return <div className="pulse">Generating architecture roadmap...</div>;

  const lines = structure.split('\n').filter(l => l.trim());

  return (
    <div className="file-tree">
      {lines.map((line, idx) => {
        const depth = (line.match(/[│├└─\s]/g) || []).length;
        const cleanName = line.replace(/[│├└─\s]/g, '').replace(/\//g, '').trim();
        if (!cleanName) return null;

        const isFolder = line.includes('/') || (!cleanName.includes('.') && !line.includes('README'));

        return (
          <div
            key={idx}
            className="file-tree-node"
            style={{ marginLeft: `${depth * 8}px` }}
          >
            {isFolder ? (
              <Folder size={16} className="file-tree-folder" />
            ) : (
              <File size={16} className="file-tree-file" />
            )}
            <span className={isFolder ? 'file-tree-folder' : 'file-tree-file'}>
              {cleanName}{isFolder ? '/' : ''}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('architecture');
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await projectService.getById(id);
      setProject(res.data);
      const chatRes = await chatService.getHistory(id);
      setChat(Array.isArray(chatRes.data) ? chatRes.data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSending(true);
    try {
      const res = await chatService.sendMessage(id, message);
      setChat([...chat, res.data]);
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm("CRITICAL: Deleting this system architecture is permanent. Are you absolutely sure?")) {
      try {
        await projectService.delete(id);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        alert("Failed to decommission system");
      }
    }
  };

  const SkeletonDetail = () => (
    <div style={{ animation: 'fadeIn 0.4s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div className="skeleton" style={{ width: '64px', height: '64px', borderRadius: '12px' }}></div>
        <div>
          <div className="skeleton" style={{ width: '200px', height: '32px', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ width: '150px', height: '18px' }}></div>
        </div>
      </div>
      <div className="skeleton" style={{ width: '100%', height: '120px', marginBottom: '3rem' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: '50px' }}></div>)}
      </div>
    </div>
  );

  const SqlSchemaTable = ({ schema }) => {
    if (!schema || !schema.tables) return <div className="pulse">No schema tables defined.</div>;

    return (
      <div className="schema-table-container">
        {schema.tables.map((table, tIdx) => (
          <div key={tIdx} className="schema-table-card glass">
            <div className="schema-table-header">
              <Database size={18} color="var(--primary)" />
              <span className="schema-table-name">{table.name}</span>
            </div>
            <table className="schema-table">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Type</th>
                  <th>Attributes</th>
                </tr>
              </thead>
              <tbody>
                {table.columns?.map((col, cIdx) => (
                  <tr key={cIdx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: '500' }}>{col.name}</span>
                        {col.primaryKey && <span className="schema-pk">PK</span>}
                      </div>
                    </td>
                    <td><span className="schema-type">{col.type}</span></td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{col.constraints || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  const renderSchema = () => {
    if (!project?.databaseSchema?.schemaJson) return <div className="pulse">Initializing Schema...</div>;

    try {
      const schema = JSON.parse(project.databaseSchema.schemaJson);
      if (schema.tables && Array.isArray(schema.tables)) {
        return <SqlSchemaTable schema={schema} />;
      }
      return (
        <div style={{ height: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={JSON.stringify(schema, null, 2)}
            options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, padding: { top: 20 } }}
          />
        </div>
      );
    } catch (e) {
      return (
        <div className="glass" style={{ padding: '2rem', color: 'var(--danger)' }}>
          Error parsing schema: {e.message}
        </div>
      );
    }
  };

  if (error) return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div className="glass" style={{ padding: '3rem', textAlign: 'center', maxWidth: '450px' }}>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <Info size={32} color="var(--danger)" />
        </div>
        <h3 style={{ marginBottom: '1rem' }}>Access Error</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{error}</p>
        <button onClick={fetchProject} className="btn-primary">Retry Connection</button>
      </div>
    </div>
  );

  return (
    <div className="main-content" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', height: 'calc(100vh - 180px)', maxWidth: '1600px' }}>
      {/* Main View */}
      <div className="glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '2.5rem' }}>
            {['architecture', 'schema', 'api', 'blueprint'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`tab-btn ${tab === t ? 'active' : ''}`}
              >
                {t === 'architecture' && <GitBranch size={16} />}
                {t === 'schema' && <Database size={16} />}
                {t === 'api' && <Terminal size={16} />}
                {t === 'blueprint' && <div style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><GitBranch size={16} style={{ rotate: '90deg' }} /></div>}
                <span style={{ fontSize: '0.9rem', fontWeight: '600', textTransform: 'capitalize' }}>
                  {t === 'schema' ? 'DB Schema' : t === 'api' ? 'API Definitions' : t}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleDeleteProject}
            className="btn-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
          {!project && loading ? <SkeletonDetail /> : (
            <>
              {tab === 'architecture' && (
                <div style={{ animation: 'fadeIn 0.4s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '0.8rem', background: 'var(--primary-muted)', borderRadius: '12px' }}>
                      <GitBranch color="var(--primary)" size={32} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.75rem' }}>{project?.architecture?.type}</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Primary Architectural Pattern</p>
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', background: 'rgba(99, 102, 241, 0.03)', borderLeft: '4px solid var(--primary)' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.75rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Design Overview</h4>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{project?.architecture?.description}</p>
                  </div>

                  <h4 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Recommended Technology Stack</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {project?.architecture?.techStack?.replace(/[{}"]/g, '').split(/[,\n]/).filter(t => t.trim()).map((t, i) => (
                      <div key={i} className="glass" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                        <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{t.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'schema' && renderSchema()}

              {tab === 'api' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.3s' }}>
                  {project?.apiDefinitions?.map((api, idx) => (
                    <div key={idx} className="glass glass-hover" style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{
                          fontWeight: '800', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                          background: api.method === 'GET' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                          color: api.method === 'GET' ? '#10b981' : '#6366f1',
                          padding: '0.4rem 0.8rem', borderRadius: '6px'
                        }}>{api.method}</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#fff' }}>{api.endpoint}</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{api.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'blueprint' && (
                <div style={{ animation: 'fadeIn 0.3s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                    <div style={{ padding: '0.8rem', background: 'var(--primary-muted)', borderRadius: '12px' }}>
                      <Database color="var(--primary)" size={32} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: '1.75rem' }}>Project Blueprint</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Comprehensive Folder & File Structure</p>
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)', fontFamily: 'monospace', lineHeight: '1.6', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Architect Blueprint
                    </div>
                    <FileTree structure={project?.folderStructure} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sidebar Chat */}
      <div className="glass" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0b1120' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <MessageSquare size={20} color="var(--primary)" />
            <div style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', border: '2px solid #0b1120' }}></div>
          </div>
          <h4 style={{ fontSize: '1rem' }}>GenAI Architect</h4>
        </div>

        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {loading && !project ? (
            <div className="skeleton" style={{ height: '80px', borderRadius: '18px 18px 18px 0' }}></div>
          ) : (
            <div className="glass" style={{ padding: '1.25rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', background: 'rgba(255,255,255,0.02)' }}>
              I've drafted the core specifications for <strong>{project?.name}</strong>. How should we proceed with refinement?
            </div>
          )}

          {Array.isArray(chat) && chat.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--primary)', color: '#fff', padding: '0.85rem 1.1rem', borderRadius: '18px 18px 0 18px', alignSelf: 'flex-end', fontSize: '0.9rem', maxWidth: '85%', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)' }}>
                {msg.message}
              </div>
              <div className="chat-bubble-ai">
                <ReactMarkdown>{msg.response}</ReactMarkdown>
              </div>
            </div>
          ))}

          {sending && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.85rem 1.1rem', borderRadius: '0 18px 18px 18px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Architect is thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Ask for refinements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ fontSize: '0.95rem', paddingRight: '3.5rem', background: '#0f172a' }}
            />
            <button type="submit" className="btn-primary" style={{ position: 'absolute', right: '5px', padding: '0.4rem', borderRadius: '6px' }} disabled={sending}>
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetail;
