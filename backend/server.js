const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/appointment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Appointment schema
const appointmentSchema = new mongoose.Schema({
  userEmail: String,
  doctorName: String,
  specialization: String,
  address: String,
  date: String,
  time: String,
  status: { type: String, enum: ['pending', 'cancelled', 'completed'], default: 'pending' },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// Signup route
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

// Create appointment
app.post('/api/appointments', async (req, res) => {
  const { userEmail, doctorName, specialization, address, date, time } = req.body;
  const appointment = new Appointment({ userEmail, doctorName, specialization, address, date, time });
  await appointment.save();
  res.status(201).json({ message: 'Appointment booked', appointment });
});

// Get user's appointments
app.get('/api/appointments', async (req, res) => {
  const { userEmail } = req.query;
  const appointments = await Appointment.find({ userEmail });
  res.json(appointments);
});

// Cancel appointment
app.patch('/api/appointments/:id/cancel', async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndUpdate(id, { status: 'cancelled' });
  res.json({ message: 'Appointment cancelled' });
});

// Delete appointment
app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  await Appointment.findByIdAndDelete(id);
  res.json({ message: 'Appointment deleted' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Configure transporter (use your real credentials or environment variables)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.CONTACT_EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.CONTACT_EMAIL_PASS || 'your-app-password',
    },
  });

  // Email to site owner
  const ownerMailOptions = {
    from: email,
    to: process.env.CONTACT_EMAIL_USER || 'your-email@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  // Confirmation email to user
  const userMailOptions = {
    from: process.env.CONTACT_EMAIL_USER || 'your-email@gmail.com',
    to: email,
    subject: 'Thank you for contacting us!',
    text: `Dear ${name},\n\nThank you for reaching out! We have received your message and will get back to you soon.\n\nYour message: ${message}\n\nBest regards,\nAppointy Team`,
  };

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);
    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Backend is running!');
});
app.use((req, res) => {
  res.status(404).json({error: 'Not Found'});
});

if(!process.env.VERCEL){
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;