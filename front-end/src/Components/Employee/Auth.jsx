import React, { useState } from 'react';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://innexoft-task.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      setCurrentUser(data.user);
      navigate('/employee');
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: 10, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      {loading && (
        <div style={{
          background: '#fffbe6',
          color: '#856404',
          border: '1px solid #ffe58f',
          borderRadius: 8,
          marginTop: 20,
          padding: '1rem',
          textAlign: 'center',
        }}>
          <h3 style={{margin: 0, color: '#388e3c'}}>Server is slow</h3>
          <p style={{margin: '0.5rem 0 0 0'}}>Please be patient and wait for up to 15 seconds while we log you in.</p>
        </div>
      )}
    </div>
  );
}

export default Auth;