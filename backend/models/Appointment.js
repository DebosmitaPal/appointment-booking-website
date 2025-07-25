const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userEmail: String, // or userId if you use IDs
  doctorName: String,
  specialization: String,
  address: String,
  date: String,
  time: String,
  image: String, // Add image field
  status: { type: String, default: 'active' } // or 'cancelled'
});

module.exports = mongoose.model('Appointment', appointmentSchema); 