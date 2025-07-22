import React, { useState } from 'react'
import axios from 'axios'
import useStore from '../Components/store'

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showLeavesModal, setShowLeavesModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    password: ''
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', designation: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false); 

  // Zustand state
  const {
    employees,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
    addEmployee,
    approveLeave,
    rejectLeave,
   
  } = useStore();

  
  const employeeCount = employees.length;
  const leavePending = pendingLeaves.length;
  const leaveApproved = approvedLeaves.length;
  const leaveRejected = rejectedLeaves.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenLeavesModal = () => setShowLeavesModal(true);
  const handleCloseLeavesModal = () => setShowLeavesModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await axios.post('https://innexoft-task.onrender.com/api/employees', form);
      alert('Employee created successfully!');
      addEmployee(form);
      setShowModal(false);
      setForm({ name: '', designation: '', email: '', phone: '', password: '' });
    } catch (error) {
      alert('Failed to create employee.');
      console.log(error);
    }
    setLoading(false); 
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm(employees[index]);
  };

  const handleSave = (index) => {
 
    setEditIndex(null);
    setEditForm({ name: '', designation: '', email: '', phone: '', password: '' });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <header style={{ background: '#1976d2', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>HR Dashboard</h1>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>Employees: <strong>{employeeCount}</strong></div>
          <button onClick={handleOpenLeavesModal} style={{ background: '#fff', color: '#1976d2', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Pending Leaves: <strong>{leavePending}</strong>
          </button>
          <div>Rejected Leaves: <strong>{leaveRejected}</strong></div>
          <div>Approved Leaves: <strong>{leaveApproved}</strong></div>
          <button onClick={handleOpenModal} style={{ background: '#fff', color: '#1976d2', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Employee</button>
        </div>
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', color: '#222', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ margin: 0, color: '#1976d2' }}>Add Employee</h2>
              <input name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="designation" placeholder="Designation" value={form.designation} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="phone" type='number' placeholder="Phone Number" value={form.phone} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleInputChange} required style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={handleCloseModal} style={{ background: '#eee', color: '#1976d2', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Create</button>
              </div>
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
                  <h3 style={{margin: 0, color: '#1976d2'}}>Server is slow</h3>
                  <p style={{margin: '0.5rem 0 0 0'}}>Please be patient and wait for up to 15 seconds while we create the employee.</p>
                </div>
              )}
            </form>
          </div>
        )}
        {showLeavesModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', color: '#222', padding: '2rem', borderRadius: '8px', minWidth: '400px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 style={{ margin: 0, color: '#1976d2' }}>Pending Leave Applications</h2>
              {pendingLeaves.length === 0 ? (
                <div>No pending leave applications.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#1976d2', color: 'white' }}>
                      <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Employee</th>
                      <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Reason</th>
                      <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                          {
                            (() => {
                              
                              const emp = employees.find(e => e.email === leave.email );
                              return emp ? emp.name : (leave.employeeName || leave.name || leave.email);
                            })()
                          }
                        </td>
                        <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{leave.reason || '-'}</td>
                        <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                          <button onClick={() => approveLeave(leave.id)} style={{ marginRight: '0.5rem', background: '#4caf50', color: '#fff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                          <button onClick={() => rejectLeave(leave.id)} style={{ background: '#f44336', color: '#fff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button onClick={handleCloseLeavesModal} style={{ background: '#eee', color: '#1976d2', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </header>
      <div style={{ maxWidth: '800px', margin: '2rem auto', background: '#f9f9f9', borderRadius: '8px', padding: '1rem' }}>
        <h2>Employee List</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1976d2', color: 'white' }}>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Designation</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Email</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Phone</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx}>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                  {editIndex === idx ? (
                    <input name="name" value={editForm.name} onChange={handleEditInputChange} />
                  ) : (
                    emp.name
                  )}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                  {editIndex === idx ? (
                    <input name="designation" value={editForm.designation} onChange={handleEditInputChange} />
                  ) : (
                    emp.designation
                  )}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                  {editIndex === idx ? (
                    <input name="email" value={editForm.email} onChange={handleEditInputChange} />
                  ) : (
                    emp.email
                  )}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                  {editIndex === idx ? (
                    <input name="phone" value={editForm.phone} onChange={handleEditInputChange} />
                  ) : (
                    emp.phone
                  )}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                  {editIndex === idx ? (
                    <button onClick={() => handleSave(idx)} style={{ marginRight: '0.5rem' }}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(idx)} style={{ marginRight: '0.5rem' }}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Header