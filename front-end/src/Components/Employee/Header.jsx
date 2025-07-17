import React, {  useState } from 'react'

function Header() {
  
  const [leaveBalance,setLeaveBalance]= useState(''); 

  const [approvedCount,setApprovedCount] = useState();

  const [rejectedCount, setRejectCount] = useState();

  return (
    <header style={{ background: '#388e3c', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Employee Dashboard</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>Leave Balance: <strong>{leaveBalance}</strong></div>
        <div>Approved: <strong>{approvedCount}</strong></div>
        <div>Rejected: <strong>{rejectedCount}</strong></div>
      </div>
    </header>
  );
}

export default Header