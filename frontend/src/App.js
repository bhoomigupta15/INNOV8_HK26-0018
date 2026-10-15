import React, { useEffect, useState } from 'react';

function App() {
  const [logs, setLogs] = useState([]);
  const [currentRisk, setCurrentRisk] = useState(10);
  const [threatCount, setThreatCount] = useState(0);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/logs");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLogs((prevLogs) => [data, ...prevLogs.slice(0, 8)]);
      setCurrentRisk(data.risk_score);
      if (data.is_anomaly) {
        setThreatCount((prev) => prev + 1);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh', padding: '24px', fontFamily: 'Segoe UI, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '16px', marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>🛡️ AI Cyber Threat Detection SOC Dashboard</h1>
        <p style={{ color: '#94a3b8', margin: '4px 0 0 0' }}>Real-time Log Anomaly Engine & Threat Escalation</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>Current System Risk</span>
          <h2 style={{ fontSize: '32px', margin: '8px 0 0 0', color: currentRisk > 50 ? '#ef4444' : '#22c55e' }}>{currentRisk}%</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>Anomalies Caught</span>
          <h2 style={{ fontSize: '32px', margin: '8px 0 0 0', color: '#f59e0b' }}>{threatCount}</h2>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>AI Engine Status</span>
          <h2 style={{ fontSize: '32px', margin: '8px 0 0 0', color: '#22c55e' }}>ACTIVE</h2>
        </div>
      </div>

      <div style={{ background: '#1e293b', padding: '20px', borderRadius: '12px', overflowX: 'auto' }}>
        <h3 style={{ marginTop: 0, borderBottom: '1px solid #334155', paddingBottom: '12px' }}>Live Log Analytics Stream</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ color: '#94a3b8', borderBottom: '1px solid #334155' }}>
              <th style={{ padding: '12px' }}>IP Address</th>
              <th>Failed Logins</th>
              <th>Req / Min</th>
              <th>Status</th>
              <th>Attack Type</th>
              <th>Action Required</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #334155', background: log.is_anomaly ? 'rgba(239, 68, 68, 0.15)' : 'transparent' }}>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{log.ip}</td>
                <td>{log.failed_logins}</td>
                <td>{log.request_rate}</td>
                <td style={{ color: log.is_anomaly ? '#ef4444' : '#22c55e', fontWeight: 'bold' }}>
                  {log.is_anomaly ? 'THREAT' : 'NORMAL'}
                </td>
                <td>{log.attack_type}</td>
                <td style={{ color: log.is_anomaly ? '#f59e0b' : '#94a3b8' }}>{log.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;