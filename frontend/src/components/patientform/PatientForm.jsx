import React, { useState } from 'react';
import './PatientForm.css';

export default function PatientForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would handle account creation and booking logic
  };

  if (submitted) {
    return <div className="patient-form-success">Account created! You can now book your appointment.</div>;
  }

  return (
    <div className="patient-form-container">
      <h2>Create Account</h2>
      <form className="patient-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
} 