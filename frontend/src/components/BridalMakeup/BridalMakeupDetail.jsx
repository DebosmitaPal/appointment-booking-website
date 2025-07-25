import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import specialist from "../../assets/barber4.webp";
import "../HairCut/HaircutDetail.css";
import Footer from '../Footer/Footer';

// Generate available slots for the next 7 days dynamically
const defaultSlots = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];
function getAvailableSlotsForDate(dateStr) {
  // Optionally, you can customize slots for specific days here
  // For now, use defaultSlots for all days
  return defaultSlots;
}

function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export default function BridalMakeupDetail() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const dateOptions = getNext7Days();

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const bookingDetails = {
      doctorName: 'Sneha Roy',
      specialization: 'Bridal Makeup Artist',
      address: 'Bridal Makeup Studio',
      date: selectedDate,
      time: selectedSlot,
      image: '', // Revert: do not store the imported image value
    };
    if (!user || !user.email) {
      localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
      navigate('/create-account');
      return;
    }
    await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bookingDetails, userEmail: user.email }),
    });
    navigate('/appointments');
  };

  return (
    <div className="haircut-detail-page">
      <div className="haircut-detail-cards">
        <div className="haircut-specialist-card">
          <img src={specialist} alt="Bridal Makeup Specialist" className="haircut-specialist-img-main" />
          <div className="haircut-specialist-card-info">
            <h2>Sneha Roy</h2>
            <p className="haircut-specialist-role">Bridal Makeup Artist</p>
            <p className="haircut-specialist-desc">
              Sneha Roy is a renowned bridal makeup artist with a passion for creating flawless, radiant looks for your special day. With years of experience and a keen eye for detail, she ensures every bride feels confident and beautiful.
            </p>
            <p className="haircut-specialist-extra">Specialization: HD Makeup, Airbrush Makeup, Traditional Bridal, Contemporary Bridal</p>
          </div>
        </div>
        <div className="haircut-types-card">
          <h1>Bridal Makeup Service</h1>
          <div className="haircut-types-list">
            <h3>Types of Bridal Makeup & Specializations</h3>
            <ul>
              <li><b>HD Bridal Makeup:</b> Flawless, camera-ready finish for your big day.</li>
              <li><b>Airbrush Makeup:</b> Lightweight, long-lasting, and perfect for all skin types.</li>
              <li><b>Traditional Bridal:</b> Classic looks with rich colors and defined features.</li>
              <li><b>Contemporary Bridal:</b> Modern, minimal, and elegant styles.</li>
              <li><b>Pre-Wedding Looks:</b> Engagement, Mehendi, Sangeet, and Reception makeup.</li>
            </ul>
            <p className="haircut-types-desc">Our bridal makeup specialist will help you achieve the perfect look for every wedding event, ensuring you feel radiant and confident throughout your celebrations.</p>
          </div>
        </div>
      </div>
      <div className="haircut-booking-section">
        <h3>Book Your Appointment</h3>
        <div className="haircut-calendar">
          {dateOptions.map((date) => (
            <button
              key={date}
              className={`haircut-date-btn${selectedDate === date ? " selected" : ""}`}
              onClick={() => {
                setSelectedDate(date);
                setSelectedSlot(null);
              }}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>
        {selectedDate && (
          <div className="haircut-slots">
            <h4>Available Time Slots for {formatDate(selectedDate)}</h4>
            <div className="haircut-slot-btns">
              {getAvailableSlotsForDate(selectedDate).map((slot) => (
                <button
                  key={slot}
                  className={`haircut-slot-btn${selectedSlot === slot ? " selected" : ""}`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedDate && selectedSlot && (
          <button className="haircut-book-btn" onClick={handleBook}>
            Book Appointment
          </button>
        )}
      </div>
      <br/><br/>
      <Footer className="footer footer-grooming" />
    </div>
  );
} 