import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorForm = ({ selectedDoctor, onClose }) => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (selectedDoctor) {
      setName(selectedDoctor.name);
      setSpecialization(selectedDoctor.specialization);
      setEmail(selectedDoctor.email);
      setPhone(selectedDoctor.phone);
    } else {
      // Reset form fields if no doctor is selected
      setName('');
      setSpecialization('');
      setEmail('');
      setPhone('');
    }
  }, [selectedDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = { name, specialization, email, phone };
    try {
      if (selectedDoctor) {
        // Update existing doctor
        await axios.put(`http://localhost:3000/doctors/${selectedDoctor.id}`, newDoctor);
      } else {
        // Create new doctor
        await axios.post('http://localhost:3000/doctors', newDoctor);
      }
      onClose(); // Close form and refresh the list
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Specialization:</label>
        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <button type="submit">{selectedDoctor ? 'Update' : 'Add'} Doctor</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default DoctorForm;
