import React from 'react';

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

export default SkeletonDetail;
