import React, { useState } from "react";
import "./DoctorAppointment.css";
import doc1 from "../../assets/doc1.jpg";
import doc3 from "../../assets/doc3.jpg";
import doc2 from "../../assets/doc2.jpg";
import doc8 from "../../assets/doc8.jpeg";
import ldoc3 from "../../assets/ldoc3.png";
import ldoc4 from "../../assets/ldoc4.jpg";
import doc7 from "../../assets/doc7.webp";
import doc9 from "../../assets/doc9.jpg";
import doc4 from "../../assets/doc4.jpg";
import doc5 from "../../assets/doc5.avif";
import ldoc5 from "../../assets/ldoc5.jpg";
import ldoc2 from "../../assets/ldoc2.webp";
import doc10 from "../../assets/doc10.jpg";
import doc6 from "../../assets/doc6.webp";
import ldoc6 from "../../assets/ldoc6.webp";
import { useNavigate } from "react-router-dom";

const specialties = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const doctors = [
  {
    name: "Dr. Debanjan Ghosh",
    specialty: "General physician",
    image: doc3,
    degree: "MBBS, MD",
    experience: "12",
    about: "Dr. Debanjan Ghosh brings years of clinical experience to his role as a general physician, offering evidence-based medical care with a strong focus on preventive health and patient education. He is deeply committed to building long-term relationships with his patients, ensuring continuity of care and personalized treatment. Dr. Ghosh upholds the highest standards of medical ethics and professionalism, making him a trusted choice for individuals and families alike.",
    fee: "800"
  },
  {
    name: "Dr. Shreya Roy",
    specialty: "Gynecologist",
    image: ldoc3,
    degree: "MBBS, MS",
    experience: "8",
    about: "Dr. Shreya Roy is a compassionate gynecologist with extensive expertise in women's reproductive health and gynecological care. She specializes in providing comprehensive care for women at all stages of life, from adolescence through menopause. Dr. Roy is known for her gentle approach and commitment to patient education, ensuring women feel empowered about their health decisions. Her practice focuses on both routine gynecological care and complex reproductive health issues.",
    fee: "1200"
  },
  {
    name: "Dr. Divya Sen",
    specialty: "Dermatologist",
    image: doc1,
    degree: "MBBS, MD",
    experience: "10",
    about: "Dr. Divya Sen is a board-certified dermatologist with specialized training in medical, surgical, and cosmetic dermatology. She provides comprehensive skin care solutions for patients of all ages, from acne treatment to skin cancer screening and anti-aging procedures. Dr. Sen is committed to using the latest evidence-based treatments and advanced dermatological techniques. Her patient-centered approach ensures personalized care plans tailored to each individual's skin concerns and goals.",
    fee: "1000"
  },
  {
    name: "Dr. Aviraj Basu",
    specialty: "Pediatricians",
    image: doc4,
    degree: "MBBS, MD",
    experience: "15",
    about: "Dr. Aviraj Basu is a senior pediatrician with over 15 years of experience in child healthcare and development. He specializes in providing comprehensive medical care for infants, children, and adolescents, with particular expertise in growth monitoring and developmental assessments. Dr. Basu believes in creating a comfortable and friendly environment for children, making medical visits less stressful for both kids and parents. His approach combines medical expertise with a deep understanding of child psychology and family dynamics.",
    fee: "900"
  },
  {
    name: "Dr. Sayan Dasgupta",
    specialty: "Pediatricians",
    image: doc5,
    degree: "MBBS, MD",
    experience: "11",
    about: "Dr. Sayan Dasgupta is a dedicated pediatrician known for his compassionate care and expertise in managing childhood illnesses and developmental concerns. He has extensive experience in preventive care, immunizations, and early intervention for developmental delays. Dr. Dasgupta emphasizes the importance of building strong relationships with families and providing education about child health and nutrition. His practice focuses on holistic child development, ensuring both physical and emotional well-being.",
    fee: "850"
  },
  {
    name: "Dr. Madhumita Mukherjee",
    specialty: "Neurologist",
    image: ldoc2,
    degree: "MBBS, MD",
    experience: "14",
    about: "Dr. Madhumita Mukherjee is a highly skilled neurologist with specialized expertise in diagnosing and treating complex neurological disorders. She has extensive experience in managing conditions such as epilepsy, stroke, multiple sclerosis, and movement disorders. Dr. Mukherjee is known for her thorough diagnostic approach and commitment to staying updated with the latest advances in neurological treatments. Her patient care philosophy emphasizes clear communication and involving patients in their treatment decisions.",
    fee: "1500"
  },
  {
    name: "Dr. Kunal Nair",
    specialty: "Gastroenterologist",
    image: doc6,
    degree: "MBBS, MD",
    experience: "13",
    about: "Dr. Kunal Nair is an experienced gastroenterologist specializing in the diagnosis and treatment of digestive system disorders. He has expertise in performing advanced endoscopic procedures and managing complex gastrointestinal conditions including inflammatory bowel disease, liver disorders, and pancreatic diseases. Dr. Nair is committed to providing comprehensive digestive health care with a focus on both medical and lifestyle interventions. His approach combines clinical expertise with patient education to promote long-term digestive wellness.",
    fee: "1300"
  },
  {
    name: "Dr. Raghav Rathi",
    specialty: "Dermatologist",
    image: doc7,
    degree: "MBBS, MD",
    experience: "9",
    about: "Dr. Raghav Rathi is a skilled dermatologist with expertise in both medical and cosmetic dermatology procedures. He specializes in advanced skin treatments, laser therapy, and minimally invasive cosmetic procedures. Dr. Rathi is known for his attention to detail and commitment to achieving natural-looking results for his patients. His practice emphasizes patient safety and uses the most current dermatological techniques and technologies available.",
    fee: "1100"
  },
  {
    name: "Dr. Uday Chakraborty",
    specialty: "General physician",
    image: doc2,
    degree: "MBBS, MD",
    experience: "16",
    about: "Dr. Uday Chakraborty is a senior general physician with extensive experience in primary healthcare and preventive medicine. He has dedicated his career to providing comprehensive medical care for adults and families, with particular expertise in chronic disease management and health promotion. Dr. Chakraborty believes in the importance of preventive care and regular health screenings to maintain optimal wellness. His patient-centered approach focuses on building lasting relationships and providing continuity of care.",
    fee: "750"
  },
  {
    name: "Dr. Ipshita Pal",
    specialty: "Gynecologist",
    image: ldoc4,
    degree: "MBBS, MS",
    experience: "7",
    about: "Dr. Ipshita Pal is a caring gynecologist dedicated to providing comprehensive women's health care throughout all life stages. She specializes in reproductive health, family planning, and gynecological surgery with a focus on minimally invasive procedures. Dr. Pal is committed to creating a comfortable and supportive environment where women feel heard and respected. Her practice emphasizes preventive care and patient education to empower women in making informed health decisions.",
    fee: "1150"
  },
  {
    name: "Dr. Arnab Yadav",
    specialty: "Neurologist",
    image: doc10,
    degree: "MBBS, MD",
    experience: "12",
    about: "Dr. Arnab Yadav is a specialized neurologist with expertise in treating complex neurological conditions and disorders. He has extensive experience in managing stroke patients, neurodegenerative diseases, and chronic neurological conditions. Dr. Yadav is known for his thorough diagnostic evaluations and personalized treatment plans tailored to each patient's specific needs. His approach combines advanced medical knowledge with compassionate care, ensuring patients receive comprehensive neurological support.",
    fee: "1400"
  },
  {
    name: "Dr. Priya Singh",
    specialty: "Pediatricians",
    image: ldoc5,
    degree: "MBBS, MD",
    experience: "10",
    about: "Dr. Priya Singh is an experienced pediatrician committed to providing excellent healthcare services for children from birth through adolescence. She specializes in preventive care, acute illness management, and developmental monitoring with a focus on early intervention when needed. Dr. Singh believes in creating a nurturing environment where children feel safe and parents feel supported. Her practice emphasizes family-centered care and education to promote healthy child development.",
    fee: "900"
  },
  {
    name: "Dr. Sophia De",
    specialty: "Gastroenterologist",
    image: ldoc6,
    degree: "MBBS, MD",
    experience: "11",
    about: "Dr. Sophia De is a dedicated gastroenterologist with expertise in diagnosing and treating a wide range of digestive system disorders. She specializes in endoscopic procedures, inflammatory bowel disease management, and liver disease treatment. Dr. De is committed to providing comprehensive digestive health care with a focus on both medical treatment and lifestyle modifications. Her patient-centered approach ensures thorough evaluation and personalized care plans for optimal digestive health outcomes.",
    fee: "1250"
  },
  {
    name: "Dr. Vivek Dutta",
    specialty: "Dermatologist",
    image: doc9,
    degree: "MBBS, MD",
    experience: "8",
    about: "Dr. Vivek Dutta is a professional dermatologist providing comprehensive skin care and aesthetic treatments for patients of all ages. He specializes in medical dermatology, surgical procedures, and cosmetic treatments with a focus on achieving natural-looking results. Dr. Dutta is known for his gentle approach and commitment to patient safety in all procedures. His practice emphasizes education and prevention, helping patients maintain healthy skin through proper care and treatment.",
    fee: "1050"
  },
  {
    name: "Dr. Devansh Guha",
    specialty: "General physician",
    image: doc8,
    degree: "MBBS, MD",
    experience: "13",
    about: "Dr. Devansh Guha is an experienced general physician focused on providing comprehensive primary healthcare and preventive medicine services. He has extensive experience in managing chronic conditions, acute illnesses, and promoting overall wellness through lifestyle modifications. Dr. Guha believes in building strong doctor-patient relationships based on trust and open communication. His practice emphasizes preventive care, regular health screenings, and patient education to help individuals maintain optimal health throughout their lives.",
    fee: "800"
  },
];

function DoctorAppointment() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const navigate = useNavigate();

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doc) => doc.specialty === selectedSpecialty)
    : doctors;

  const handleCardClick = (doc) => {
    const relatedDoctors = doctors.filter(
      (d) => d.specialty === doc.specialty && d.name !== doc.name
    );
    navigate(`/doctor/${encodeURIComponent(doc.name)}`, {
      state: { doctor: doc, relatedDoctors },
    });
  };

  return (
    <div className="doctor-appointment-container">
      <aside className="sidebar">
        <h2>Browse through the doctors specialist.</h2>
        {specialties.map((spec) => (
          <button
            key={spec}
            className={`sidebar-btn${selectedSpecialty === spec ? " active" : ""}`}
            onClick={() => setSelectedSpecialty(spec)}
          >
            {spec}
          </button>
        ))}
        <button
          className={`sidebar-btn${selectedSpecialty === null ? " active" : ""}`}
          onClick={() => setSelectedSpecialty(null)}
        >
          All Doctors
        </button>
      </aside>
      <main className="doctor-cards-area">
        <div className="doctor-cards-grid">
          {filteredDoctors.map((doc, idx) => {
            return (
              <div className="doctor-card" key={idx} onClick={() => handleCardClick(doc)} style={{ cursor: 'pointer' }}>
                <div className="doctor-img-wrapper">
                  <img src={doc.image} alt={doc.name} className="doctor-img" />
                </div>
                <div className="doctor-info">
                  <span className="doctor-available">
                    <span className="dot" /> Available
                  </span>
                  <h3>{doc.name}</h3>
                  <p>{doc.specialty}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default DoctorAppointment; 