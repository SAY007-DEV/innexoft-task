import React, { useState, useEffect } from 'react'

function Header() {
  const [leaveBalance, setLeaveBalance] = useState(10);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reason: '', from: '', to: '' });
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ reason: '', from: '', to: '' });


  useEffect(() => {
    const stored = localStorage.getItem('appliedLeaves');
    if (stored) setAppliedLeaves(JSON.parse(stored));
    const storedEditIndex = localStorage.getItem('editIndex');
    if (storedEditIndex !== null) setEditIndex(Number(storedEditIndex));
    const pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    setPendingCount(pendingLeaves.length);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('appliedLeaves', JSON.stringify(appliedLeaves));
    localStorage.setItem('editIndex', editIndex !== null ? editIndex : '');
  }, [appliedLeaves, editIndex]);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const leave = { ...form, status: 'pending' };
    setAppliedLeaves([...appliedLeaves, leave]);
    setLeaveBalance((prev) => prev - 1);
    const pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    pendingLeaves.push(leave);
    localStorage.setItem('pendingLeaves', JSON.stringify(pendingLeaves));
    setPendingCount(pendingLeaves.length);
    setForm({ reason: '', from: '', to: '' });
    setShowForm(false);
  };

  
  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditForm({
      reason: appliedLeaves[idx].reason,
      from: appliedLeaves[idx].from,
      to: appliedLeaves[idx].to
    });
  };

  
  const handleSave = (idx) => {
    const updatedLeaves = [...appliedLeaves];
    updatedLeaves[idx] = { ...updatedLeaves[idx], ...editForm };
    setAppliedLeaves(updatedLeaves);
    setEditIndex(null);
    setEditForm({ reason: '', from: '', to: '' });
    
    let pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    pendingLeaves[idx] = { ...pendingLeaves[idx], ...editForm };
    localStorage.setItem('pendingLeaves', JSON.stringify(pendingLeaves));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <header style={{ background: '#388e3c', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Employee Dashboard</h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>Leave Balance: <strong>{leaveBalance}</strong></div>
          <div>Pending: <strong>{pendingCount}</strong></div>
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
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Status</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliedLeaves.map((leave, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editIndex === idx && leave.status === 'pending' ? (
                      <input name="reason" value={editForm.reason} onChange={handleEditInputChange} />
                    ) : (
                      leave.reason
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editIndex === idx && leave.status === 'pending' ? (
                      <input name="from" type="date" value={editForm.from} onChange={handleEditInputChange} />
                    ) : (
                      leave.from
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editIndex === idx && leave.status === 'pending' ? (
                      <input name="to" type="date" value={editForm.to} onChange={handleEditInputChange} />
                    ) : (
                      leave.to
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{leave.status}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {leave.status === 'pending' && (
                      editIndex === idx ? (
                        <button onClick={() => handleSave(idx)} style={{ marginRight: '0.5rem' }}>Save</button>
                      ) : (
                        <button onClick={() => handleEdit(idx)} style={{ marginRight: '0.5rem' }}>Edit</button>
                      )
                    )}
                  </td>
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