import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Home";
import ServicePage from "./components/servicePage/ServicePage";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import LoginPage from "./components/Login/LoginPage";
import Footer from "./components/Footer/Footer";
import DoctorAppointment from "./components/DoctorAppointment/DoctorAppointment";
import GroomingAppointment from "./components/GroomingAppointment/GroomingAppointment";
import HomeRepairAppointment from "./components/HomeRepair/HomeRepairAppointment";
import DoctorDetail from "./components/DoctorDetail/DoctorDetail";
import HaircutDetail from "./components/HairCut/HaircutDetail";
import BridalMakeupDetail from "./components/BridalMakeup/BridalMakeupDetail";
import FacialTreatmentDetail from "./components/Treatment/FacialTreatmentDetail";
import HairColoringDetail from "./components/HairColoring/HairColoringDetail";
import ManicurePedicureDetail from "./components/Treatment/ManicurePedicureDetail";
import NailsTreatmentDetail from "./components/Treatment/NailsTreatmentDetail";
import AppointmentsPage from "./components/AppointmentsPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    // Check localStorage on initial load
    return !!localStorage.getItem('user');
  });

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user'); // Also clear user on logout
  };

  const handleServiceClick = (service) => {
    if (!isLoggedIn) {
      window.location.href = '/create-account';
    } else {
      window.location.href = `/services/${service}`;
    }
  };

  const location = useLocation();
  const isDoctorPage = location.pathname === "/dashboard/doctor";
  const isDoctorDetailPage = location.pathname.startsWith("/doctor/");
  const isGroomingPage = location.pathname === "/dashboard/grooming";
  const isGroomingDetailPage = location.pathname.startsWith("/grooming/");
  const isHomeRepairPage = location.pathname === "/dashboard/repairs";

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        blueHeader={isDoctorPage || isDoctorDetailPage}
        pinkHeader={isGroomingPage || isGroomingDetailPage}
        className={
          isHomeRepairPage ? "header-violet" :
          (isGroomingPage || isGroomingDetailPage) ? "header-pink" :
          ""
        }
      />
      <main>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} onServiceClick={handleServiceClick} />} />
          <Route path="/services/doctors" element={isLoggedIn ? <ServicePage type="Doctor" /> : <Navigate to="/create-account" />} />
          <Route path="/services/grooming" element={isLoggedIn ? <ServicePage type="Personal Grooming" /> : <Navigate to="/create-account" />} />
          <Route path="/services/repairs" element={isLoggedIn ? <ServicePage type="Home Repairs" /> : <Navigate to="/create-account" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/create-account" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/dashboard/doctor" element={<DoctorAppointment />} />
          <Route path="/dashboard/grooming" element={<GroomingAppointment />} />
          <Route path="/dashboard/repairs" element={<HomeRepairAppointment />} />
          <Route path="/doctor/:doctorName" element={<DoctorDetail />} />
          <Route path="/grooming/haircut" element={<HaircutDetail />} />
          <Route path="/grooming/bridal-makeup" element={<BridalMakeupDetail />} />
          <Route path="/grooming/facial-treatment" element={<FacialTreatmentDetail />} />
          <Route path="/grooming/hair-coloring" element={<HairColoringDetail />} />
          <Route path="/grooming/manicure-pedicure" element={<ManicurePedicureDetail />} />
          <Route path="/grooming/nails-treatment" element={<NailsTreatmentDetail />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      {location.pathname !== "/contact" && location.pathname !== "/about" && location.pathname !== "/" && location.pathname !== "/create-account" && location.pathname !== "/appointments" && !isGroomingPage && !isGroomingDetailPage && location.pathname !== "/dashboard/repairs" && <div className="footer-wave-bg"></div>}
      {location.pathname !== "/contact" && location.pathname !== "/about" && location.pathname !== "/" && location.pathname !== "/create-account" && location.pathname !== "/appointments" && !isGroomingPage && !isGroomingDetailPage && location.pathname !== "/dashboard/repairs" && <Footer doctorPage={location.pathname === "/dashboard/doctor"} doctorDetailPage={location.pathname.startsWith("/doctor/")} />}
    </>
  );
}
