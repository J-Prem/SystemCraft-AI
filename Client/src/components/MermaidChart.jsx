import React, { useEffect, useRef, useId } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
  themeVariables: {
    primaryColor: '#6366f1',
    lineColor: '#818cf8',
  }
});

const MermaidChart = ({ chart }) => {
  const ref = useRef(null);
  const id = useId().replace(/:/g, ''); // Mermaid IDs shouldn't have colons

  useEffect(() => {
    if (ref.current && chart) {
      // Clear previous content
      ref.current.innerHTML = '<div class="loading">Rendering diagram...</div>';
      
      const renderChart = async () => {
        try {
          // Generate a truly unique ID for this render attempt
          const renderId = `mermaid-${id}-${Math.floor(Math.random() * 10000)}`;
          const { svg } = await mermaid.render(renderId, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid Render Error:", error);
          if (ref.current) {
            ref.current.innerHTML = `<pre style="color: #ff4d4d; font-size: 0.8rem; background: rgba(255,0,0,0.1); padding: 1rem; border-radius: 8px; white-space: pre-wrap;">Failed to render diagram. Please check the syntax:\n\n${chart}</pre>`;
          }
        }
      };

      renderChart();
    }
  }, [chart, id]);

  if (!chart) return null;

  return (
    <div
      ref={ref}
      className="mermaid-container"
      style={{ 
        background: 'rgba(0,0,0,0.3)', 
        padding: '2rem', 
        borderRadius: '16px', 
        overflowX: 'auto',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100px'
      }}
    />
  );
};

export default MermaidChart;
