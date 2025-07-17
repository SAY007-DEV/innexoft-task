import { create } from 'zustand'

const useEmployeeStore = create((set) => ({
  employees: [],
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  updateEmployee: (index, updated) => set((state) => ({
    employees: state.employees.map((emp, i) => (i === index ? { ...emp, ...updated } : emp)),
  })),
  setEmployees: (employees) => set({ employees }),
}))

export default useEmployeeStore 