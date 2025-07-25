import React from "react";
import './Testimonials.css';

const testimonials = [
  { name: 'Amit', text: 'Booked a doctor in minutes. Super easy!' },
  { name: 'Sneha', text: 'The booking process was seamless and the staff was very friendly.' },
  { name: 'Divya', text: 'Booked a home repair for my parents. They loved the service!' },
  { name: 'Rahul', text: 'Home repairs were quick and professional.' },
  { name: 'Priya', text: 'Loved the grooming service. Highly recommend SyncUniServe!' },
  { name: 'Vikram', text: 'I managed to get a same-day appointment for my AC repair. Impressive!' },
  { name: 'Meera', text: 'Personal grooming at home was a great experience. Will use again.' },
  { name: 'Suresh', text: 'Doctor was punctual and professional. Highly satisfied.' },
  { name: 'Anjali', text: 'Easy to use and lots of service options. SyncUniServe is my go-to!' },
  { name: 'Rohit', text: 'Customer support was very helpful when I had a query.' },
];

function Testimonials() {
  // Repeat testimonials to ensure smooth continuous scrolling
  const repeatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  return (
    <section className="testimonials" id="testimonials-section">
      <h2>Testimonials</h2>
      <div className="marquee">
        <div className="marquee-content">
          {repeatedTestimonials.map((t, idx) => (
            <div className="marquee-card" key={idx}>
              <div>"{t.text}"</div>
              <span>- {t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials; 