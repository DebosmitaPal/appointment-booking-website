import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import specialist from "../../assets/barber3.webp";
import "../HairCut/HaircutDetail.css";

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

export default function FacialTreatmentDetail() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const dateOptions = getNext7Days();

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const bookingDetails = {
      doctorName: 'Aditi Verma',
      specialization: 'Facial Therapist',
      address: 'Facial Treatment Studio',
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
          <img src={specialist} alt="Facial Treatment Specialist" className="haircut-specialist-img-main" />
          <div className="haircut-specialist-card-info">
            <h2>Aditi Verma</h2>
            <p className="haircut-specialist-role">Facial Therapist</p>
            <p className="haircut-specialist-desc">
              Aditi Verma is an expert in facial treatments, offering rejuvenating and relaxing experiences for all skin types. Her personalized approach ensures radiant, healthy skin for every client.
            </p>
            <p className="haircut-specialist-extra">Specialization: Deep Cleansing, Anti-Aging, Hydrating, Brightening Facials</p>
          </div>
        </div>
        <div className="haircut-types-card">
          <h1>Facial Treatment Service</h1>
          <div className="haircut-types-list">
            <h3>Types of Facial Treatments & Specializations</h3>
            <ul>
              <li><b>Deep Cleansing Facial:</b> Removes impurities and unclogs pores.</li>
              <li><b>Anti-Aging Facial:</b> Reduces fine lines and boosts collagen.</li>
              <li><b>Hydrating Facial:</b> Restores moisture for soft, supple skin.</li>
              <li><b>Brightening Facial:</b> Evens skin tone and adds radiance.</li>
              <li><b>Acne Treatment:</b> Targets breakouts and soothes irritation.</li>
            </ul>
            <p className="haircut-types-desc">Our specialist will recommend the best facial treatment for your skin type and concerns, ensuring a glowing, refreshed complexion after every session.</p>
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
      <footer className="grooming-footer">
        <div className="grooming-footer-content">
          <div className="grooming-footer-col">
            <h3>SyncUniServe</h3>
            <p>SyncUniServe is your trusted platform for booking appointments with doctors, personal grooming experts, and home repair professionals. We make your life easier, one booking at a time.</p>
          </div>
          <div className="grooming-footer-col">
            <h3>Follow us on</h3>
            <div className="grooming-footer-socials">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.585.069-4.851c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.35c0-.734-.592-1.326-1.325-1.326z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          <div className="grooming-footer-col">
            <h3>Get in Touch</h3>
            <p>Email: support@syncuniserve.com<br/>Address: SyncUniServe: Appointy Store, DP Road, Kolkata</p>
          </div>
        </div>
        <div className="grooming-footer-bottom">© 2025 SyncUniServe. All rights reserved.</div>
      </footer>
    </div>
  );
} 