import React from 'react';
import './RelatedDoctorCard.css';

export default function RelatedDoctorCard({ doctor, onClick }) {
  return (
    <div 
      className="related-doctor-card" 
      onClick={() => onClick(doctor)}
    >
      <img src={doctor.image} alt={doctor.name} className="related-doctor-img" />
      <div className="related-doctor-info">
        <span className="related-doctor-name">{doctor.name}</span>
        <span className="related-doctor-specialty">{doctor.specialty}</span>
      </div>
    </div>
  );
} 