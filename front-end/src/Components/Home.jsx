import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: '2rem' }}>
      <h1>Welcome to the Portal</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <button onClick={() => navigate('/hr')} style={{ padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: '8px', border: 'none', background: '#1976d2', color: 'white', cursor: 'pointer' }}>HR</button>
        <button onClick={() => navigate('/employee/login')} style={{ padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: '8px', border: 'none', background: '#388e3c', color: 'white', cursor: 'pointer' }}>Employee</button>
      </div>
    </div>
  )
}

export default Home