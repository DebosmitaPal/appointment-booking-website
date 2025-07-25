import React from "react";
import ContactContainer from "./ContactContainer";

function ContactPageBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(90deg, #EFE6DA 0%, #AF887E 100%)",
      }}
    />
  );
}

function ContactPage() {
  return (
    <>
      <ContactPageBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ContactContainer />
      </div>
    </>
  );
}

export default ContactPage; 