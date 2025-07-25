import React, { useState } from "react";
import "./HomeRepairAppointment.css";
// You can replace this with an actual image import if you have one
// import handymanImg from "../../assets/handyman1.png";
import handyman2 from "../../assets/handyman2.png";
import handyman4 from "../../assets/handyman4.png";
import handyman3 from "../../assets/handyman3.jpg";
import { useEffect } from "react";
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";

function CountUp({ end, duration = 1200 }) {
  const [count, setCount] = useState(1);
  useEffect(() => {
    let start = 1;
    const increment = end > 1 ? 1 : 0;
    const totalSteps = end - start;
    if (totalSteps <= 0) return;
    const interval = duration / totalSteps;
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      setCount(current);
      if (current >= end) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count}</span>;
}

function RoundedHeroWrapper({ children }) {
  return (
    <div className="hra-hero-rounded-wrapper">
      {children}
    </div>
  );
}

function HomeRepairHeroSection() {
  return (
    <div className="hra-hero-container">
      <div className="hra-hero-overlay">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <div style={{ textAlign: 'left', marginRight: '56px' }}>
            <h1 className="hra-title" style={{ color: '#fff' }}>Home Repairs, Handled <span style={{ color: '#a78bfa' }}>with Heart</span></h1>
            <p className="hra-subtitle">
              From leaky faucets to major makeovers, we bring skill, care, and reliability to every corner of your home.
            </p>
            <div className="hra-hero-actions">
              <button
                className="hra-btn hra-btn-secondary"
                onClick={() => {
                  const section = document.getElementById('hra-appointment-section');
                  if (section) {
                    const yOffset = -80; // adjust for sticky header height
                    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                Get in touch
              </button>
            </div>
            <div className="hra-stats-row">
              <div className="hra-stat">
                <div className="hra-stat-number"><CountUp end={20} duration={1200} /></div>
                <div className="hra-stat-label">Years of experience</div>
              </div>
              <div className="hra-stat">
                <div className="hra-stat-number"><CountUp end={250} duration={1200} /></div>
                <div className="hra-stat-label">Projects Completed</div>
              </div>
              <div className="hra-stat">
                <div className="hra-stat-number"><CountUp end={24} duration={1200} /></div>
                <div className="hra-stat-label">Awards gained</div>
              </div>
            </div>
          </div>
          <img src={handyman3} alt="Handyman" style={{ width: '220px', height: '220px', objectFit: 'cover', borderRadius: '16px', marginLeft: '48px', boxShadow: '0 0 32px 8px #bbf7d0, 0 0 64px 16px #22c55e', display: 'block' }} />
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: "🪑", label: "Furniture assembly" },
  { icon: "⚡", label: "Electrical" },
  { icon: "🟫", label: "Tile" },
  { icon: "🏠", label: "Home repairs" },
  { icon: "🎨", label: "Painting" },
  { icon: "🚰", label: "Plumbing" },
  { icon: "🔨", label: "Remodeling" },
  { icon: "🛁", label: "Bathroom remodeling" },
];

const HomeRepairAppointment = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <RoundedHeroWrapper>
        <HomeRepairHeroSection />
      </RoundedHeroWrapper>
      {/* Services Section Below Hero */}
      <section className="hra-services-section" id="hra-services-section">
        <h2 className="hra-services-title">Our services</h2>
        <p className="hra-services-subtitle">Whatever you need done</p>
        <div className="hra-services-grid">
          {(showAll ? SERVICES : SERVICES.slice(0, 4)).map((service, idx) => (
            <div className="hra-service-card" key={service.label}>
              <span className="hra-service-icon">{service.icon}</span>
              <span className="hra-service-label">{service.label}</span>
            </div>
          ))}
        </div>
        {!showAll && (
          <button className="hra-services-viewmore" onClick={() => setShowAll(true)}>
            View more
          </button>
        )}
      </section>
      {/* Why Hire Us Section */}
      <section className="hra-whyhire-section">
        <div className="hra-whyhire-content">
          <div className="hra-whyhire-left">
            <div className="hra-whyhire-heading">Why hire us ?</div>
            <div className="hra-whyhire-title">Quality Service is our core</div>
            <div className="hra-whyhire-desc">
              We treat every home as if it were our own, blending skill, reliability, and a personal touch to deliver results that last. Our team believes in honest work, clear communication, and going the extra mile—because your peace of mind matters. From the smallest fixes to major renovations, we approach every project with meticulous attention to detail and a commitment to your satisfaction. Trust us to turn your repair needs into a smooth, stress-free experience, every time.
            </div>
          </div>
          <div className="hra-whyhire-right">
            <div className="hra-whyhire-illustration">
              <img src={handyman4} alt="Handyman" style={{ width: '100%', height: '100%', borderRadius: '50px 50px 0 0', objectFit: 'cover', boxShadow: '0 0 32px 8px #bbf7d0, 0 0 64px 16px #22c55e' }} />
            </div>
          </div>
        </div>
      </section>
      {/* Appointment Form Section */}
      <section className="hra-appointment-section" id="hra-appointment-section" style={{ scrollMarginTop: '100px' }}>
        <div className="hra-appointment-content">
          <div className="hra-appointment-left">
            <h2 className="hra-appointment-title">Get In Touch</h2>
            <p className="hra-appointment-subtitle">We are here for you. How can we help you?</p>
            <form className="hra-appointment-form" onSubmit={async e => {
              e.preventDefault();
              const form = e.target;
              const name = form.name.value;
              const phone = form.phone.value;
              const address = form.address.value;
              const date = form.date.value;
              const time = form.time.value;
              const message = form.message.value;
              const bookingDetails = {
                doctorName: name,
                specialization: 'Home Repair',
                address,
                date,
                time,
                image: handyman2,
                message,
              };
              const user = JSON.parse(localStorage.getItem('user'));
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
            }}>
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="tel" name="phone" placeholder="Phone" required />
              <input type="text" name="address" placeholder="Address" required />
              <input type="date" name="date" placeholder="Select date for appointment" required />
              <input type="time" name="time" placeholder="Select time for appointment" required/>
              <textarea name="message" placeholder="Describe the problem you're facing" rows={4} />
              <button type="submit" className="hra-appointment-submit">Request service</button>
            </form>
          </div>
          <div className="hra-appointment-right">
            <div className="hra-appointment-illustration">
              <img src={handyman2} alt="Handyman" style={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: 'none', marginBottom: '32px' }} />
            </div>
            <div className="hra-appointment-contactinfo">
              <div className="hra-appointment-contactrow">
                <span className="hra-appointment-contacticon">📍</span>
                <span>Handyman Services, India</span>
              </div>
              <div className="hra-appointment-contactrow">
                <span className="hra-appointment-contacticon">📞</span>
                <span>+91 9876543210</span>
              </div>
              <div className="hra-appointment-contactrow">
                <span className="hra-appointment-contacticon">✉️</span>
                <span>support@syncserve.com</span>
              </div>
            </div>
            {/* <div className="hra-appointment-socials">
            </div> */}
          </div>
        </div>
      </section>
      <Footer className="footer footer-homerepair" />
    </>
  );
};

export default HomeRepairAppointment; 