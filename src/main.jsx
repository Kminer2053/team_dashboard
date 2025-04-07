import React from 'react';
import ReactDOM from 'react-dom/client';

function Dashboard() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🌐 미래성장처 대시보드</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>📅 업무일정표</h2>
          <p>간단한 일정표가 여기에 표시됩니다.</p>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>⚠ 리스크이슈 모니터링</h2>
          <p>리스크 이슈 키워드 기반 뉴스가 여기에 표시됩니다.</p>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🤝 제휴처 탐색</h2>
          <p>제휴처 조건 기반 정보가 여기에 표시됩니다.</p>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🚀 신기술 동향</h2>
          <p>AI 및 업무 효율화 기술 정보가 여기에 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);
