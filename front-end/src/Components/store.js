import { create } from 'zustand';


const load = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const useStore = create((set, get) => ({
  employees: [],
  appliedLeaves: load('appliedLeaves', []),
  pendingLeaves: load('pendingLeaves', []),
  approvedLeaves: load('approvedLeaves', []),
  rejectedLeaves: load('rejectedLeaves', []),
  editId: null,
  leaveBalance: load('leaveBalance', 10),
  currentUser: null,

  
  setCurrentUser: (user) => set(() => ({ currentUser: user })),
  clearCurrentUser: () => set(() => ({ currentUser: null })),

  
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),

  
  addAppliedLeave: (leave) => {
    const newApplied = [...get().appliedLeaves, leave];
    const newPending = [...get().pendingLeaves, leave];
    localStorage.setItem('appliedLeaves', JSON.stringify(newApplied));
    localStorage.setItem('pendingLeaves', JSON.stringify(newPending));
    return set({ appliedLeaves: newApplied, pendingLeaves: newPending });
  },

  editAppliedLeave: (id, updatedLeave) => {
    const newApplied = get().appliedLeaves.map((leave) => leave.id === id ? { ...leave, ...updatedLeave } : leave);
    const newPending = get().pendingLeaves.map((leave) => leave.id === id ? { ...leave, ...updatedLeave } : leave);
    localStorage.setItem('appliedLeaves', JSON.stringify(newApplied));
    localStorage.setItem('pendingLeaves', JSON.stringify(newPending));
    return set({ appliedLeaves: newApplied, pendingLeaves: newPending });
  },

  setEditId: (id) => set(() => ({ editId: id })),
  clearEditId: () => set(() => ({ editId: null })),

  
  approveLeave: (id) => {
    const leave = get().pendingLeaves.find((l) => l.id === id);
    if (!leave) return;
    const newPending = get().pendingLeaves.filter((l) => l.id !== id);
    const newApproved = [...get().approvedLeaves, { ...leave, status: 'approved' }];
    const newApplied = get().appliedLeaves.map((l) => l.id === id ? { ...l, status: 'approved' } : l);
    const newBalance = get().leaveBalance - 1;
    localStorage.setItem('pendingLeaves', JSON.stringify(newPending));
    localStorage.setItem('approvedLeaves', JSON.stringify(newApproved));
    localStorage.setItem('appliedLeaves', JSON.stringify(newApplied));
    localStorage.setItem('leaveBalance', JSON.stringify(newBalance));
    return set({ pendingLeaves: newPending, approvedLeaves: newApproved, appliedLeaves: newApplied, leaveBalance: newBalance });
  },
  rejectLeave: (id) => {
    const leave = get().pendingLeaves.find((l) => l.id === id);
    if (!leave) return;
    const newPending = get().pendingLeaves.filter((l) => l.id !== id);
    const newRejected = [...get().rejectedLeaves, { ...leave, status: 'rejected' }];
    const newApplied = get().appliedLeaves.map((l) => l.id === id ? { ...l, status: 'rejected' } : l);
    localStorage.setItem('pendingLeaves', JSON.stringify(newPending));
    localStorage.setItem('rejectedLeaves', JSON.stringify(newRejected));
    localStorage.setItem('appliedLeaves', JSON.stringify(newApplied));
    return set({ pendingLeaves: newPending, rejectedLeaves: newRejected, appliedLeaves: newApplied });
  },

  deleteLeave: (id) => {
    const newApplied = get().appliedLeaves.filter((leave) => leave.id !== id);
    const newPending = get().pendingLeaves.filter((leave) => leave.id !== id);
    const newApproved = get().approvedLeaves.filter((leave) => leave.id !== id);
    const newRejected = get().rejectedLeaves.filter((leave) => leave.id !== id);
    localStorage.setItem('appliedLeaves', JSON.stringify(newApplied));
    localStorage.setItem('pendingLeaves', JSON.stringify(newPending));
    localStorage.setItem('approvedLeaves', JSON.stringify(newApproved));
    localStorage.setItem('rejectedLeaves', JSON.stringify(newRejected));
    return set({
      appliedLeaves: newApplied,
      pendingLeaves: newPending,
      approvedLeaves: newApproved,
      rejectedLeaves: newRejected,
    });
  },

  
}));

export default useStore; 