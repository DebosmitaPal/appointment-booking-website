import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import RelatedDoctorCard from '../RelatedDoctor/RelatedDoctorCard';
import './DoctorDetail.css';
import RelatedDoctorsCard from '../RelatedDoctors/RelatedDoctorsCard';

export default function DoctorDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctor, relatedDoctors } = location.state || {};
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!doctor) return <div style={{padding: '2rem', textAlign: 'center'}}>Doctor not found.</div>;

  // Generate next 7 days
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });

  // Time slots: every hour from 10am to 7pm
  const slots = Array.from({ length: 10 }, (_, i) => `${10 + i}:00`);

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const bookingDetails = {
      doctorName: doctor.name,
      specialization: doctor.specialty,
      address: doctor.address || 'Clinic address not provided',
      date: days[selectedDate].toLocaleDateString(),
      time: slots[selectedSlot],
      image: '', // Revert: do not store the imported image value
    };
    if (!user || !user.email) {
      // Save booking details and redirect to login
      localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
      navigate('/create-account');
      return;
    }
    // Book appointment
    await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bookingDetails, userEmail: user.email }),
    });
    navigate('/appointments');
  };

  const handleRelatedDoctorClick = (clickedDoctor) => {
    // Get all doctors from the original list (you might need to pass this as state)
    // For now, we'll use the relatedDoctors array and add the current doctor
    const allDoctors = [doctor, ...relatedDoctors];
    const newRelatedDoctors = allDoctors.filter(doc => doc.name !== clickedDoctor.name);
    
    navigate(`/doctor/${encodeURIComponent(clickedDoctor.name)}`, {
      state: { doctor: clickedDoctor, relatedDoctors: newRelatedDoctors },
    });
  };

  return (
    <>
      <div className="doctor-detail-main">
        <div className="doctor-detail-imgbox">
          <img src={doctor.image} alt={doctor.name} className="doctor-detail-img" />
        </div>
        <div className="doctor-detail-info">
          <h2>{doctor.name} <span className="doctor-detail-specialty">{doctor.degree}</span></h2>
          <div className="doctor-detail-meta">
            <span>{doctor.specialty}</span>
            <span className="doctor-detail-experience">{doctor.experience ? `${doctor.experience} Years` : null}</span>
          </div>
          <div className="doctor-detail-about">
            <b className="doctor-detail-about-label">About:</b>
            <div className="doctor-detail-about-text">{doctor.about}</div>
          </div>
          <div className="doctor-detail-fee">Appointment fee: <b>₹{doctor.fee}</b></div>
        </div>
      </div>
      <div className="doctor-detail-booking">
        <h3 className="doctor-detail-booking-title">Booking Slots</h3>
        <div className="doctor-detail-booking-content">
          <div className="doctor-detail-dates">
            {days.map((d, i) => (
              <button
                key={i}
                className={`doctor-detail-date-btn${selectedDate === i ? ' selected' : ''}`}
                onClick={() => { setSelectedDate(i); setSelectedSlot(null); }}
              >
                {d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
              </button>
            ))}
          </div>
          {selectedDate !== null && (
            <div className="doctor-detail-slots">
              {slots.map((slot, i) => (
                <button
                  key={i}
                  className={`doctor-detail-slot-btn${selectedSlot === i ? ' selected' : ''}`}
                  onClick={() => setSelectedSlot(i)}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
          {selectedDate !== null && selectedSlot !== null && (
            <button className="doctor-detail-book-btn" onClick={handleBook}>
              Book Appointment
            </button>
          )}
        </div>
      </div>
      {/* Related Doctors Card Section */}
      <RelatedDoctorsCard 
        relatedDoctors={relatedDoctors} 
        onDoctorClick={handleRelatedDoctorClick} 
      />
    </>
  );
} 