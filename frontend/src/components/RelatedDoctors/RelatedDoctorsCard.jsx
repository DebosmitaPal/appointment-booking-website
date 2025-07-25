import React from 'react';
import RelatedDoctorCard from '../RelatedDoctor/RelatedDoctorCard';
import './RelatedDoctorsCard.css';

export default function RelatedDoctorsCard({ relatedDoctors, onDoctorClick }) {
  return (
    <div className="related-doctors-card-container">
      <h3 className="related-doctors-card-heading">Related Doctors</h3>
      <p className="related-doctors-card-description">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="related-doctors-card-list">
        {relatedDoctors && relatedDoctors.map((doc, i) => (
          <RelatedDoctorCard
            key={i}
            doctor={doc}
            onClick={onDoctorClick}
          />
        ))}
      </div>
    </div>
  );
} 