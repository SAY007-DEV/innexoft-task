import React, { useState } from 'react'

function Header() {
  const [leaveBalance, setLeaveBalance] = useState(10); 
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reason: '', from: '', to: '' });
  const [appliedLeaves, setAppliedLeaves] = useState([]);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  setAppliedLeaves([...appliedLeaves, form]);
     setLeaveBalance((prev) => prev - 1);
    setForm({ reason: '', from: '', to: '' });
    setShowForm(false);
  };

  return (
    <>
      <header style={{ background: '#388e3c', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Employee Dashboard</h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>Leave Balance: <strong>{leaveBalance}</strong></div>
          <div>Approved: <strong>{approvedCount}</strong></div>
          <div>Rejected: <strong>{rejectedCount}</strong></div>
          <button onClick={handleShowForm} style={{ background: '#fff', color: '#388e3c', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Apply Leave</button>
        </div>
      </header>
      {showForm && (
        <div style={{ maxWidth: '500px', margin: '2rem auto', background: '#f9f9f9', borderRadius: '8px', padding: '1rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ margin: 0, color: '#388e3c' }}>Apply for Leave</h2>
            <input name="reason" placeholder="Reason" value={form.reason} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <label>From</label>
            <input name="from" type="date" value={form.from} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <label>To</label>
            <input name="to" type="date" value={form.to} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" onClick={handleHideForm} style={{ background: '#eee', color: '#388e3c', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ background: '#388e3c', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Apply</button>
            </div>
          </form>
        </div>
      )}
      {appliedLeaves.length > 0 && (
        <div style={{ maxWidth: '600px', margin: '2rem auto', background: '#fff', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3>Applied Leaves</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#e0e0e0' }}>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Reason</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>From</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>To</th>
              </tr>
            </thead>
            <tbody>
              {appliedLeaves.map((leave, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{leave.reason}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{leave.from}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{leave.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Header