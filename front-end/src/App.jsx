import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'
import Header from './Components/Header'
import EmployeeHeader from './Components/Employee/Header'
import Home from './Components/Home'
import Auth from './Components/Employee/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hr" element={<Header />} />
        <Route path="/employee" element={<EmployeeHeader />} />
        <Route path="/employee/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
