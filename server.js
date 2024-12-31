const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doctor_portalitis'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Get all doctors
app.get('/doctors', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Create a new doctor
app.post('/doctors', (req, res) => {
  const { name, specialization, email, phone } = req.body;
  const query = 'INSERT INTO doctors (name, specialization, email, phone) VALUES (?, ?, ?, ?)';
  db.query(query, [name, specialization, email, phone], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, specialization, email, phone });
  });
});

// Update a doctor
app.put('/doctors/:id', (req, res) => {
  const { id } = req.params;
  const { name, specialization, email, phone } = req.body;
  const query = 'UPDATE doctors SET name = ?, specialization = ?, email = ?, phone = ? WHERE id = ?';
  db.query(query, [name, specialization, email, phone, id], (err, results) => {
    if (err) throw err;
    res.json({ id, name, specialization, email, phone });
  });
});

// Delete a doctor
app.delete('/doctors/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM doctors WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Doctor deleted successfully' });
  });
});

// Get all appointments
app.get('/appointments', (req, res) => {
  db.query('SELECT * FROM appointments', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

app.post('/appointments', (req, res) => {
    const { doctorId, date, time, patientName, patientEmail, patientPhone } = req.body;
  
    const query = 'INSERT INTO appointments (doctor_id, appointment_date, appointment_time, patient_name, patient_email, patient_phone) VALUES (?, ?, ?, ?, ?, ?)';
  
    db.query(query, [doctorId, date, time, patientName, patientEmail, patientPhone], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json({ id: results.insertId, doctorId, date, time, patientName, patientEmail, patientPhone });
    });
  });
  
  

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
