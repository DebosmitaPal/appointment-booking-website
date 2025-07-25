import React from "react";
import './ServicePage.css';

function ServicePage({ type }) {
  return (
    <div className="service-page">
      <h2>{type} Appointment Booking</h2>
      <p>Book your {type.toLowerCase()} appointment here!</p>
    </div>
  );
}

export default ServicePage; 