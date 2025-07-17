import React, { useState, useEffect } from 'react'

function Header() {
  const [leaveBalance, setLeaveBalance] = useState(10);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reason: '', from: '', to: '', leaveType: '' });
  const [appliedLeaves, setAppliedLeaves] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ reason: '', from: '', to: '', leaveType: '' });

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  useEffect(() => {
    const stored = localStorage.getItem('appliedLeaves');
    if (stored) setAppliedLeaves(JSON.parse(stored));
    const storedEditId = localStorage.getItem('editId');
    if (storedEditId !== null && storedEditId !== '') setEditId(storedEditId);
    const pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    setPendingCount(pendingLeaves.length);
  }, []);

  useEffect(() => {
    localStorage.setItem('appliedLeaves', JSON.stringify(appliedLeaves));
    localStorage.setItem('editId', editId !== null ? editId : '');
  }, [appliedLeaves, editId]);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const leave = { ...form, status: 'pending', id: generateId() };
    setAppliedLeaves([...appliedLeaves, leave]);
    const pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    pendingLeaves.push(leave);
    localStorage.setItem('pendingLeaves', JSON.stringify(pendingLeaves));
    setPendingCount(pendingLeaves.length);
    setForm({ reason: '', from: '', to: '', leaveType: '' });
    setShowForm(false);
  };

  // Approve leave (for demo/HR)
  const handleApprove = (id) => {
    const updatedLeaves = appliedLeaves.map((leave) =>
      leave.id === id ? { ...leave, status: 'approved' } : leave
    );
    setAppliedLeaves(updatedLeaves);
    setLeaveBalance((prev) => prev - 1);
    localStorage.setItem('appliedLeaves', JSON.stringify(updatedLeaves));
    // Remove from pendingLeaves in localStorage
    let pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    pendingLeaves = pendingLeaves.filter((leave) => leave.id !== id);
    localStorage.setItem('pendingLeaves', JSON.stringify(pendingLeaves));
    setPendingCount(pendingLeaves.length);
  };

  
  const handleEdit = (id) => {
    setEditId(id);
    const leave = appliedLeaves.find((l) => l.id === id);
    setEditForm({
      reason: leave.reason,
      from: leave.from,
      to: leave.to,
      leaveType: leave.leaveType || ''
    });
  };

  // Save edited leave
  const handleSave = (id) => {
    const updatedLeaves = appliedLeaves.map((leave) =>
      leave.id === id ? { ...leave, ...editForm } : leave
    );
    setAppliedLeaves(updatedLeaves);
    setEditId(null);
    setEditForm({ reason: '', from: '', to: '', leaveType: '' });
    // Also update pendingLeaves in localStorage
    let pendingLeaves = JSON.parse(localStorage.getItem('pendingLeaves') || '[]');
    pendingLeaves = pendingLeaves.map((leave) =>
      leave.id === id ? { ...leave, ...editForm } : leave
    );
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
            <label htmlFor="leaveType">Leave Type</label>
            <select
              name="leaveType"
              value={form.leaveType}
              onChange={handleInputChange}
              required
              style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Earned Leave">Earned Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
            <label htmlFor="reason">Reason</label>
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
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Leave Type</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Reason</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>From</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>To</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Status</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appliedLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editId === leave.id && leave.status === 'pending' ? (
                      <select
                        name="leaveType"
                        value={editForm.leaveType}
                        onChange={handleEditInputChange}
                        required
                        style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Earned Leave">Earned Leave</option>
                        <option value="Maternity Leave">Maternity Leave</option>
                        <option value="Paternity Leave">Paternity Leave</option>
                        <option value="Unpaid Leave">Unpaid Leave</option>
                      </select>
                    ) : (
                      leave.leaveType
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editId === leave.id && leave.status === 'pending' ? (
                      <input name="reason" value={editForm.reason} onChange={handleEditInputChange} />
                    ) : (
                      leave.reason
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editId === leave.id && leave.status === 'pending' ? (
                      <input name="from" type="date" value={editForm.from} onChange={handleEditInputChange} />
                    ) : (
                      leave.from
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {editId === leave.id && leave.status === 'pending' ? (
                      <input name="to" type="date" value={editForm.to} onChange={handleEditInputChange} />
                    ) : (
                      leave.to
                    )}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{leave.status}</td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {leave.status === 'pending' && (
                      editId === leave.id ? (
                        <button onClick={() => handleSave(leave.id)} style={{ marginRight: '0.5rem' }}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(leave.id)} style={{ marginRight: '0.5rem' }}>Edit</button>
                          <button onClick={() => handleApprove(leave.id)} style={{ marginRight: '0.5rem', background: '#388e3c', color: '#fff' }}>Approve</button>
                        </>
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