import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorForm from './DoctorForm';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsFormVisible(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsFormVisible(true);
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    fetchDoctors(); // Refresh the list after closing the form
  };

  return (
    <div className="doctor-list-container">
      <h1 className="heading">Doctor List</h1>
      <button className="add-button" onClick={handleAddDoctor}>
        Add Doctor
      </button>
      {isFormVisible && (
        <DoctorForm selectedDoctor={selectedDoctor} onClose={handleCloseForm} />
      )}
      <table className="doctor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditDoctor(doctor)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDoctor(doctor.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
