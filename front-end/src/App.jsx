import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import EmployeeHeader from './Components/Employee/Header'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hr" element={<Header />} />
        <Route path="/employee" element={<EmployeeHeader />} />
        {/* Optionally add a 404 fallback here */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
