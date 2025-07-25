import React, { useState, useEffect } from "react";
import './AboutPage.css';
import mainImg from "../../assets/calendar3.avif";

const TABS = [
  {
    key: 'mission',
    label: 'Mission',
    icon: '🎯',
    content: (
      <>
        <b>Our Mission</b>
        <p>
          To provide a seamless, reliable, and user-friendly platform that empowers our clients to book services with confidence and convenience, making everyday life easier by connecting you with trusted professionals for all your appointment needs.
        </p>
      </>
    )
  },
  {
    key: 'vision',
    label: 'Vision',
    icon: '🌟',
    content: (
      <>
        <b>Our Vision</b>
        <p>
          To be the go-to place for booking consultations with top healthcare professionals, skilled handymen, and trusted grooming experts, ensuring joyful, interactive, and impactful service experiences for all users.
        </p>
      </>
    )
  },
  {
    key: 'values',
    label: 'Values',
    icon: '💡',
    content: (
      <>
        <b>Our Values</b>
        <p>
          Easy Booking, Trusted Professionals, Reminders & Notifications, Secure & Private, 24/7 Support. We believe in collaborative excellence, intelligent evolution, and global impact for our community.
        </p>
      </>
    )
  }
];

const CORE_PRINCIPLES = [
  {
    icon: '🤝',
    title: 'Collaborative Excellence',
    desc: 'We believe the best solutions emerge from diverse minds working together.'
  },
  {
    icon: '🚀',
    title: 'Intelligent Evolution',
    desc: 'Every improvement guided by how users interact, every update powered by insights into effective service.'
  },
  {
    icon: '🌍',
    title: 'Global Impact',
    desc: 'Transforming service booking and fostering trust in professionals.'
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('vision');

  // Auto-switch tabs every 5 seconds
  useEffect(() => {
    const currentIdx = TABS.findIndex(tab => tab.key === activeTab);
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const idx = TABS.findIndex(tab => tab.key === prev);
        return TABS[(idx + 1) % TABS.length].key;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="about-alpha-bg">
      <div className="about-alpha-container">
        <button className="about-alpha-btn">About SyncUniServe</button>
        <h1 className="about-alpha-title">A gateway to Seamless Service Booking</h1>
        <div className="about-alpha-subtitle">A platform to connect you with trusted professionals for all your appointment needs</div>
        <div className="about-alpha-tabs-row">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`about-alpha-tab-btn${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="about-alpha-tab-content">
          <div className="about-alpha-tab-card">
            <span className="about-alpha-tab-icon">{TABS.find(t => t.key === activeTab).icon}</span>
            {TABS.find(t => t.key === activeTab).content}
          </div>
        </div>
        <h2 className="about-alpha-core-title">Our Core Principles</h2>
        <div className="about-alpha-core-desc">The fundamental beliefs that guide our community and drive our mission forward</div>
        <div className="about-alpha-core-row">
          {CORE_PRINCIPLES.map((item, idx) => (
            <div className="about-alpha-core-card" key={idx}>
              <div className="about-alpha-core-icon">{item.icon}</div>
              <div className="about-alpha-core-card-title">{item.title}</div>
              <div className="about-alpha-core-card-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 