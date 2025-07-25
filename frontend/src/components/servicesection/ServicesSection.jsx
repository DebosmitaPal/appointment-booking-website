import React, { useState, useEffect, useRef } from "react";
import "./ServicesSection.css";
import doc1 from "../../assets/doc1.jpg";
import barber1 from "../../assets/barber1.jpg";
import handyman1 from "../../assets/handyman1.jpg";

const services = [
  {
    title: "Doctor Appointments",
    desc: "Book appointments with healthcare professionals easily and quickly.",
    img: doc1,
    alt: "Doctor",
    buttonLink: "/dashboard/doctor"
  },
  {
    title: "Grooming Services",
    desc: "Schedule grooming sessions for personal care .",
    img: barber1,
    alt: "Grooming",
    buttonLink: "/dashboard/grooming"
  },
  {
    title: "Home Repairs",
    desc: "Find trusted professionals for all your home repair needs.",
    img: handyman1,
    alt: "Home Repairs",
    buttonLink: "/dashboard/repairs"
  },
];

function handleGo(link) {
  window.location.href = link;
}

function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % services.length);
    }, 8000); // 8 seconds
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleCardClick = idx => {
    setActiveIdx(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % services.length);
    }, 8000); // 8 seconds
  };

  return (
    <section id="services-section">
      <h2 className="services-section-heading">Services We Provide</h2>
      <section className="services-peek-carousel">
        {services.map((service, idx) => {
          let cardClass = "peek-card";
          if (idx === activeIdx) cardClass += " active";
          else if (idx === (activeIdx + 1) % services.length) cardClass += " next";
          else if (idx === (activeIdx + services.length - 1) % services.length) cardClass += " prev";
          else cardClass += " hidden";
          return (
            <div
              key={service.title}
              className={cardClass}
              onClick={() => handleCardClick(idx)}
              style={{ zIndex: idx === activeIdx ? 3 : 2 }}
            >
              <div className="service-icon-block">
                <img src={service.img} alt={service.alt} className="service-img-large" />
              </div>
              <div className="service-text-block">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <button className="service-go-btn" onClick={e => { e.stopPropagation(); handleGo(service.buttonLink); }}>Go</button>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}

export default ServicesSection; 