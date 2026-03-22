import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
});

const MermaidChart = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && chart) {
      ref.current.removeAttribute('data-processed');
      mermaid.contentLoaded();

      // Try to render again if content changed
      try {
        mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart).then(({ svg }) => {
          if (ref.current) ref.current.innerHTML = svg;
        });
      } catch (e) {
        console.error("Mermaid Render Error:", e);
      }
    }
  }, [chart]);

  return (
    <div
      className="mermaid"
      ref={ref}
      style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', overflowX: 'auto' }}
    >
      {chart}
    </div>
  );
};

export default MermaidChart;
