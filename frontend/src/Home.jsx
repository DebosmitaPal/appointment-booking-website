import React, { useEffect, useRef, useState } from "react";
import Hero from "./components/Hero/Hero";
import ServicesSection from "./components/servicesection/ServicesSection";
import Testimonials from "./components/Testimonials/Testimonials";
import HomeFooter from "./components/HomeFooter/HomeFooter";
import './HomeScrollEffect.css';

// Collapsible/expandable FAQ section for SyncUniServe
function FAQSection() {
  const faqs = [
    {
      q: "What services can I book on SyncUniServe?",
      a: "You can book appointments for healthcare, grooming, and home repair services—all in one place."
    },
    {
      q: "How do I know the professionals are verified?",
      a: "All service providers on SyncUniServe are thoroughly verified and reviewed by our team and users."
    },
    {
      q: "Is my personal information safe?",
      a: "Yes, we use advanced security measures to keep your data private and secure."
    },
    {
      q: "How do I reschedule or cancel an appointment?",
      a: "You can easily manage, reschedule, or cancel your appointments from your SyncUniServe dashboard."
    },
    {
      q: "Is there customer support?",
      a: "Absolutely! Our support team is available 24/7 to assist you with any queries."
    },
    {
      q: "Can I book appointments for my family members?",
      a: "Yes, you can add family members to your account and book appointments on their behalf."
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept all major credit/debit cards, UPI, and net banking for your convenience."
    },
    {
      q: "Will I get reminders for my appointments?",
      a: "Yes, you will receive timely reminders and notifications for all your upcoming appointments."
    },
    {
      q: "How do I leave a review for a service provider?",
      a: "After your appointment, you can rate and review the service provider from your dashboard."
    },
    {
      q: "Is there a mobile app for SyncUniServe?",
      a: "A mobile app is coming soon! For now, you can use our fully responsive website on any device."
    }
  ];
  const [openIdx, setOpenIdx] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [faqVisible, setFaqVisible] = useState(Array(faqs.length).fill(false));
  const faqListRef = useRef(null);

  useEffect(() => {
    const node = faqListRef.current;
    if (!node) return;
    let timeoutIds = [];
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          faqs.forEach((_, idx) => {
            timeoutIds[idx] = setTimeout(() => {
              setFaqVisible(v => {
                const next = [...v];
                next[idx] = true;
                return next;
              });
            }, idx * 180);
          });
        } else {
          setFaqVisible(Array(faqs.length).fill(false));
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [faqs.length]);

  const handleToggle = idx => setOpenIdx(openIdx === idx ? null : idx);
  const directions = ["from-left", "from-bottom", "from-right"];
  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list" ref={faqListRef}>
        {faqs.map((item, idx) => (
          <div
            className={`faq-item${openIdx === idx ? ' open' : ''} faq-pop card-animate ${directions[idx % 3]}${faqVisible[idx] ? ' faq-pop-visible card-animate-visible' : ''}`}
            key={idx}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <button className="faq-q" onClick={() => handleToggle(idx)} aria-expanded={openIdx === idx}>
              {item.q}
              <span className="faq-toggle-icon">{openIdx === idx ? '−' : '+'}</span>
            </button>
            {openIdx === idx && <div className="faq-a">{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// Simulated AI chatbot in the bottom right corner
function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hi! 👋 How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  const aiReplies = [
    "I'm here to help! Please tell me more.",
    "You can book appointments for healthcare, grooming, and home repairs.",
    "All our professionals are verified and reviewed.",
    "You can manage your appointments from your dashboard.",
    "Our support team is available 24/7!",
    "Your data is safe and secure with us.",
    "You will receive reminders for all your appointments.",
    "You can add family members to your account and book for them.",
    "A mobile app is coming soon!"
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }]);
    setInput("");
    setTimeout(() => {
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      setMessages(msgs => [...msgs, { from: 'ai', text: reply }]);
    }, 800);
  };

  useEffect(() => {
    if (open && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  return (
    <>
      <button
        className="chatbot-fab chatbot-fab-bordered"
        aria-label="Open AI Chatbot"
        onClick={() => setOpen(true)}
        style={{ display: open ? 'none' : 'flex' }}
      >
        <span role="img" aria-label="chatbot" style={{ fontSize: 28 }}>🤖</span>
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>AI Chatbot</span>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close Chatbot">×</button>
          </div>
          <div className="chatbot-body" ref={chatBodyRef} style={{ maxHeight: 260, overflowY: 'auto' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message chatbot-message-${msg.from}`}>{msg.text}</div>
            ))}
          </div>
          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              className="chatbot-input"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus={open}
            />
            <button className="chatbot-send-btn" type="submit" aria-label="Send">➤</button>
          </form>
        </div>
      )}
    </>
  );
}

function Home({ isLoggedIn, onServiceClick }) {
  const NUM_SECTIONS = 5;
  const sectionsRef = useRef([]);
  const [visible, setVisible] = useState(Array(NUM_SECTIONS).fill(false));

  useEffect(() => {
    const observers = [];
    sectionsRef.current.forEach((el, idx) => {
      if (!el) return;
      observers[idx] = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(v => {
              const next = [...v];
              next[idx] = true;
              return next;
            });
            observers[idx].disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observers[idx].observe(el);
    });
    return () => observers.forEach(obs => obs && obs.disconnect());
  }, []);

  return (
    <>
      <div ref={el => (sectionsRef.current[0] = el)} className={`reveal-on-scroll${visible[0] ? " reveal-visible" : ""}`}><Hero /></div>
      <div ref={el => (sectionsRef.current[1] = el)} className={`reveal-on-scroll${visible[1] ? " reveal-visible" : ""}`}><ServicesSection isLoggedIn={isLoggedIn} onServiceClick={onServiceClick} /></div>
      <div ref={el => (sectionsRef.current[2] = el)} className={`reveal-on-scroll${visible[2] ? " reveal-visible" : ""}`}><FAQSection /></div>
      <div ref={el => (sectionsRef.current[3] = el)} className={`reveal-on-scroll${visible[3] ? " reveal-visible" : ""}`}><Testimonials /></div>
      <div ref={el => (sectionsRef.current[4] = el)} className={`reveal-on-scroll${visible[4] ? " reveal-visible" : ""}`}><HomeFooter /></div>
    </>
  );
}

export default Home; 