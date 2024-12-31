import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import DoctorList from './Components/DoctorList';
import AppointmentBooking from './Components/AppointmentBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/appointments" element={<AppointmentBooking />} />
      </Routes>
    </Router>
  );
}

export default App;
