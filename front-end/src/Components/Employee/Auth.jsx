import React, { useState } from 'react'
import axios from 'axios'

function Auth() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await axios.get('http://localhost:8000/api/employees');
      const found = res.data.find(emp => emp.email === form.email && emp.password === form.password);
      if (found) {
        setSuccess(true);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Error connecting to server');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8, background: '#fff' }}>
      <h2>Employee Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }} />
        <button type="submit" style={{ background: '#388e3c', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: '1rem' }}>Login successful!</div>}
    </div>
  );
}

export default Auth