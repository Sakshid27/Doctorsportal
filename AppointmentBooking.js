import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Patient information states
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor) {
      alert('Please select a doctor.');
      return;
    }

    if (!date || !time) {
      alert('Please select a date and time.');
      return;
    }

    if (!patientName || !patientEmail || !patientPhone) {
      alert('Please provide patient details.');
      return;
    }

    const newAppointment = {
      doctorId: selectedDoctor.id,
      date,
      time,
      patientName,
      patientEmail,
      patientPhone,
    };

    try {
      await axios.post('http://localhost:3000/appointments', newAppointment);
      alert('Appointment booked successfully!');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment.');
    }
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-heading">Book an Appointment</h1>

      <div className="form-group">
        <label className="form-label">Doctor:</label>
        <select
          className="form-select"
          onChange={(e) =>
            setSelectedDoctor(doctors.find((d) => d.id === parseInt(e.target.value)))
          }
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Date:</label>
        <input
          type="date"
          className="form-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Time:</label>
        <input
          type="time"
          className="form-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Patient Name:</label>
        <input
          type="text"
          className="form-input"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Patient Email:</label>
        <input
          type="email"
          className="form-input"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Patient Phone:</label>
        <input
          type="tel"
          className="form-input"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
        />
      </div>

      <button className="form-button" onClick={handleBookAppointment}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentBooking;
