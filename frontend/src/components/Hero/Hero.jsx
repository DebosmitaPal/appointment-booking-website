import React from "react";
import './Hero.css';
import calendar2 from "../../assets/calendar2.avif";

function HomeHero() {
  const handleBookNow = () => {
    const section = document.getElementById('services-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  const handleDiscoverMore = () => {
    const section = document.getElementById('testimonials-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="hero">
      <div className="hero-bg-abstract"></div>
      <div className="hero-bg-pattern"></div>
      <div className="hero-card">
        <div className="hero-content-left">
          <div className="hero-text-group">
            <h1 className="hero-title">SyncServe: Your Appointment Hub</h1>
            <p className="hero-tagline">Seamlessly schedule appointments for healthcare, grooming, and home repairs.<br/>Making your life easier, one booking at a time.</p>
            <div className="hero-actions">
              <button className="hero-cta-btn" onClick={handleBookNow}>Book Now</button>
              <button className="hero-arrow-btn" onClick={handleDiscoverMore}>Discover More</button>
            </div>
          </div>
        </div>
        <div className="hero-abstract">
          <div className="hero-abstract-shape">
            <img src={calendar2} alt="Calendar" className="hero-abstract-img" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero; 