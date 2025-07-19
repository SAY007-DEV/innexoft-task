import React, { useState } from 'react'
import useStore from '../store'

function Header() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reason: '', from: '', to: '', leaveType: '' });
  const [editForm, setEditForm] = useState({ reason: '', from: '', to: '', leaveType: '' });

  const {
    leaveBalance,
    appliedLeaves,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
    editId,
    addAppliedLeave,
    editAppliedLeave,
    setEditId,
    clearEditId,
    deleteLeave,
  } = useStore();

  const approvedCount = approvedLeaves.length;
  const rejectedCount = rejectedLeaves.length;
  const pendingCount = pendingLeaves.length;

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual employee info (from auth or props)
    const employeeName = "John Doe"; // Replace with real data
    const employeeEmail = "john@example.com"; // Replace with real data

    const leave = {
      ...form,
      status: 'pending',
      id: generateId(),
      employeeName,
      employeeEmail
    };
    addAppliedLeave(leave);
    setForm({ reason: '', from: '', to: '', leaveType: '' });
    setShowForm(false);
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
    editAppliedLeave(id, editForm);
    clearEditId();
    setEditForm({ reason: '', from: '', to: '', leaveType: '' });
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
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc', fontWeight: 'bold', color: leave.status === 'approved' ? 'green' : leave.status === 'rejected' ? 'red' : '#888' }}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </td>
                  <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {leave.status === 'pending' && (
                      editId === leave.id ? (
                        <button onClick={() => handleSave(leave.id)} style={{ marginRight: '0.5rem' }}>Save</button>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(leave.id)} style={{ marginRight: '0.5rem' }}>Edit</button>
                        </>
                      )
                    )}
                    <button onClick={() => deleteLeave(leave.id)} style={{ background: '#f44336', color: '#fff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', marginLeft: '0.5rem' }}>Delete</button>
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