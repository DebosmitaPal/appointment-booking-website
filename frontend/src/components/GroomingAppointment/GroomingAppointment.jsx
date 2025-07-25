import React, { useRef } from "react";
import './GroomingAppointment.css';
import barber1 from "../../assets/barber1.jpg";
import alarmclock1 from "../../assets/alarmclock1.png";
import doc8 from "../../assets/doc8.jpeg";
import calendar1 from "../../assets/calendar1.avif";
import calendar2 from "../../assets/calendar2.avif";
import calendar3 from "../../assets/calendar3.avif";
import handyman1 from "../../assets/handyman1.jpg";
import doc2 from "../../assets/doc2.jpg";
import doc3 from "../../assets/doc3.jpg";
import doc4 from "../../assets/doc4.jpg";
import groomingface from "../../assets/groomingface.webp";
import pinksaloon from "../../assets/pinksaloon.avif";
import haircut from "../../assets/haircut.jpg";
import bridalmakeup from "../../assets/bridalmakeup.jpeg";
import facialtreatment from "../../assets/facialtreatment.png";
import haircolor from "../../assets/haircolor.jpg";
import manicure from "../../assets/manicure.jpg";
import nailart from "../../assets/nailart.jpg";
import barber2 from "../../assets/barber2.avif";
import barber3 from "../../assets/barber3.webp";
import barber4 from "../../assets/barber4.webp";
import barber5 from "../../assets/barber5.webp";
import barber6 from "../../assets/barber6.webp";
import { useNavigate } from "react-router-dom";
import Footer from '../Footer/Footer';

const services = [
  {
    title: "Haircut",
    desc: "Professional haircuts tailored to your style.",
    img: haircut,
  },
  {
    title: "Bridal Makeup",
    desc: "Stunning bridal and wedding makeup for your special day.",
    img: bridalmakeup,
  },
  {
    title: "Facial Treatment",
    desc: "Rejuvenating facials for glowing skin.",
    img: facialtreatment,
  },
  {
    title: "Hair Coloring",
    desc: "Trendy hair coloring and highlights.",
    img: haircolor,
  },
  {
    title: "Manicure & Pedicure",
    desc: "Pamper your hands and feet with our spa treatments.",
    img: manicure,
  },
  {
    title: "Nails Treatment",
    desc: "Beautiful nail art and care for perfect hands.",
    img: nailart,
  },
];

const team = [
  {
    name: "Priya Sharma",
    role: "Senior Stylist",
    img: barber1,
  },
  {
    name: "Sneha Roy",
    role: "Beauty Expert",
    img: barber4,
  },
  {
    name: "Aditi Verma",
    role: "Facial Therapist",
    img: barber3,
  },
  {
    name: "Riya Kapoor",
    role: "Hair Colorist",
    img: barber2,
  },
  {
    name: "Megha Singh",
    role: "Nail Artist",
    img: barber5,
  },
  {
    name: "Ananya Das",
    role: "Manicure & Pedicure Expert",
    img: barber6,
  },
];

const serviceRoutes = {
  "Haircut": "/grooming/haircut",
  "Bridal Makeup": "/grooming/bridal-makeup",
  "Facial Treatment": "/grooming/facial-treatment",
  "Hair Coloring": "/grooming/hair-coloring",
  "Manicure & Pedicure": "/grooming/manicure-pedicure",
  "Nails Treatment": "/grooming/nails-treatment",
};

function GroomingAppointment() {
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const howRef = useRef(null);

  const handleBookNow = () => {
    if (servicesRef.current) servicesRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const handleDiscoverMore = () => {
    if (howRef.current) howRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grooming-appointment-page">
      {/* Hero Section */}
      <section className="grooming-hero">
        <div className="grooming-hero-text">
          <h2>Embrace the <span className="accent">Ultimate Grooming</span> Experience</h2>
          <p>Book your appointment with our top grooming experts and enjoy a luxurious, relaxing session tailored just for you.</p>
          <div className="grooming-hero-actions">
            <button className="primary-btn" onClick={handleBookNow}>Book Now</button>
            <button className="secondary-btn" onClick={handleDiscoverMore}>Discover More</button>
          </div>
          <div className="grooming-hero-contact">
            <span>📍 Appointy Store, DP Road, Kolkata</span>
            <span>📞 +91 98765 43210</span>
            <span>✉️ info@grooming.com</span>
          </div>
        </div>
        <div className="grooming-hero-img">
          <img src={groomingface} alt="Grooming Hero" />
        </div>
      </section>

      {/* About Section */}
      <section className="grooming-about">
        <div className="grooming-about-text">
          <h3>About Us</h3>
          <h2>We Have The Best Grooming Services In The City</h2>
          <p>Discover a new level of grooming and wellness. Experience our innovative grooming services and immerse yourself in our luxurious haven. Our experts ensure you leave looking and feeling your best.</p>
          <button className="secondary-btn" onClick={handleDiscoverMore}>Discover More</button>
        </div>
        <div className="grooming-about-img">
          <img src={pinksaloon} alt="About Grooming" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="grooming-services" ref={servicesRef}>
        <h2>Take Your Desired Services</h2>
        <div className="grooming-services-grid">
          {services.map((service, idx) => (
            <div className="grooming-service-card" key={idx}>
              <img src={service.img} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              {service.title === "Haircut" ? (
                <button className="primary-btn" onClick={() => navigate("/grooming/haircut")}>Read More <span>&#8599;</span></button>
              ) : (
                <button className="primary-btn" onClick={() => navigate(serviceRoutes[service.title])}>Read More <span>&#8599;</span></button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="grooming-how" ref={howRef}>
        <h2>How We Deal With Customers</h2>
        <div className="grooming-timeline grooming-timeline-minimal">
          <div className="grooming-timeline-line"><span className="timeline-dot-right"></span></div>
          <div className="grooming-timeline-cards grooming-timeline-cards-minimal">
            <div className="grooming-timeline-step-minimal">
              <div className="grooming-timeline-img-minimal-wrapper">
                <div className="grooming-timeline-img-wrap grooming-timeline-img-minimal">
                  <img src={calendar1} alt="Booking/Meeting" className="grooming-timeline-img" />
                </div>
              </div>
              <div className="grooming-timeline-step-circle-minimal-centered">1</div>
              <div className="grooming-timeline-content-minimal">
                <div className="grooming-timeline-title-minimal">Booking/Meeting</div>
                <br/>
                <div className="grooming-timeline-desc-minimal">Book Your Transformation Today!.</div>
              </div>
            </div>
            <div className="grooming-timeline-step-minimal">
              <div className="grooming-timeline-img-minimal-wrapper">
                <div className="grooming-timeline-img-wrap grooming-timeline-img-minimal">
                  <img src={facialtreatment} alt="Treatment" className="grooming-timeline-img" />
                </div>
              </div>
              <div className="grooming-timeline-step-circle-minimal-centered">2</div>
              <div className="grooming-timeline-content-minimal">
                <div className="grooming-timeline-title-minimal">Treatment</div>
                <br/>
                <div className="grooming-timeline-desc-minimal">Innovative Grooming Treatments Await.</div>
              </div>
            </div>
            <div className="grooming-timeline-step-minimal">
              <div className="grooming-timeline-img-minimal-wrapper">
                <div className="grooming-timeline-img-wrap grooming-timeline-img-minimal">
                  <img src={barber4} alt="Finalizing" className="grooming-timeline-img" />
                </div>
              </div>
              <div className="grooming-timeline-step-circle-minimal-centered">3</div>
              <div className="grooming-timeline-content-minimal">
                <div className="grooming-timeline-title-minimal">Finalizing</div>
                <br/>
                <div className="grooming-timeline-desc-minimal">Immerse Yourself in Our Luxurious Beauty and Spa Haven.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="grooming-team">
        <h2>Meet Our Experts</h2>
        <div className="grooming-team-grid">
          {team.map((member, idx) => (
            <div className="grooming-team-card" key={idx}>
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <span>{member.role}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Pink Footer for Grooming Page Only */}
      <Footer className="footer footer-grooming" />
    </div>
  );
}

export default GroomingAppointment; 