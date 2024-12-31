import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import homepg from '../assets/homepg.jpg';

const HomePage = () => {
  return (
    <div className="container">
      <img 
        src={homepg} 
        alt="Doctor Appointment System" 
        className="image" 
      />
      <h1 className="heading">Welcome to the Doctor Appointment System</h1>
      <p className="paragraph">
        A simple application for managing doctor appointments and information.
      </p>
      <div className="button-container">
        <Link to="/appointments">
          <button className="button">Book an Appointment</button>
        </Link>
      </div>
      <div className="button-container">
        <Link to="/doctors">
          <button className="button">Manage Doctors (Admin)</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;