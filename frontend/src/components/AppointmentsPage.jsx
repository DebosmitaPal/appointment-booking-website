import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer/Footer';
import './Footer/AppointmentsFooter.css';
import doctorimage from '../assets/doctorimage.avif';
import handymanimage from '../assets/handymanimage.webp';
import barberimage from '../assets/barberimage.webp';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user email from localStorage or context (set in login)
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) {
      navigate('/login');
      return;
    }
    setUserEmail(user.email);
    fetch(`${import.meta.env.VITE_API_URL}/api/appointments?userEmail=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  }, [navigate]);

  const handleCancel = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}/cancel`, { method: 'PATCH' });
    setAppointments(appts => appts.map(a => a._id === id ? { ...a, status: 'cancelled' } : a));
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/${id}`, { method: 'DELETE' });
    setAppointments(appts => appts.filter(a => a._id !== id));
  };

  if (loading) return <div style={{padding: '2rem'}}>Loading...</div>;

  return (
    <div className="appointments-main-container">
      <div className="appointments-card">
        <h2 style={{ fontWeight: 700, fontSize: '1.6rem', marginBottom: 32 }}>My appointments</h2>
        {appointments.length === 0 ? (
          <div>No appointments found.</div>
        ) : (
          appointments.map((appt, idx) => {
            // Remove duplicate 'Dr.' if present
            let displayName = appt.doctorName;
            if (displayName.toLowerCase().startsWith('dr. ')) {
              displayName = displayName.slice(4);
            }
            // Only add 'Dr.' for doctor appointments (DoctorDetail page)
            const doctorSpecialties = [
              'general physician',
              'gynecologist',
              'dermatologist',
              'pediatricians',
              'neurologist',
              'gastroenterologist',
            ];
            const isDoctor = appt.specialization && doctorSpecialties.some(spec => appt.specialization.toLowerCase() === spec);
            // For doctor appointments, replace default address if needed
            let displayAddress = appt.address;
            if (isDoctor && displayAddress === 'Clinic address not provided') {
              displayAddress = 'Clinic near Appointy store,DP Road';
            }
            // Choose default image based on appointment type
            let defaultImg = barberimage;
            if (isDoctor) defaultImg = doctorimage;
            else if (appt.specialization && appt.specialization.toLowerCase() === 'home repair') defaultImg = handymanimage;
            return (
              <div key={appt._id} style={{ display: 'flex', alignItems: 'flex-start', borderBottom: '1px solid #eee', padding: '2rem 0' }}>
                <div style={{ width: 160, height: 160, background: '#f5f6fa', borderRadius: 8, overflow: 'hidden', marginRight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={appt.image || defaultImg} alt={displayName} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{isDoctor ? `Dr. ${displayName}` : displayName}</div>
                  <div style={{ color: '#666', marginBottom: 4 }}>{appt.specialization}</div>
                  <div><b>Address:</b><br/>{displayAddress}</div>
                  <div style={{ marginTop: 8 }}><b>Date & Time:</b> {appt.date} | {appt.time}</div>
                </div>
                <div style={{ minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                  {((appt.status === 'cancelled') || (!appt.status || appt.status === 'active') && isPast) ? (
                    <button style={{ color: '#e53935', border: '1.5px solid #e53935', background: '#fff', borderRadius: 8, padding: '12px 24px', fontWeight: 600, fontSize: '1rem', marginTop: 24 }}>Appointment cancelled</button>
                  ) : (
                    <button onClick={() => handleCancel(appt._id)} style={{ color: '#555', border: '1.5px solid #eee', background: '#fff', borderRadius: 8, padding: '12px 24px', fontWeight: 500, fontSize: '1rem' }}>Cancel appointment</button>
                  )}
                  <button onClick={() => handleDelete(appt._id)} style={{ color: '#888', border: '1.5px solid #eee', background: '#fff', borderRadius: 8, padding: '10px 24px', fontWeight: 400, fontSize: '0.98rem', marginTop: 8 }}>Delete from history</button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Footer className="footer-appointments" />
    </div>
  );
}

export default AppointmentsPage; 