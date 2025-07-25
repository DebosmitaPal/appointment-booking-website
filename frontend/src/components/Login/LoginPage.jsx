import React, { useState } from "react";
import "./LoginPage.css";
import handyman3 from "../../assets/login1.jpeg";
import loginImg from "../../assets/login.jpeg";
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

  // New: State for form fields and errors
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.message || "Login failed");
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        // Check for pending booking
        const pending = localStorage.getItem('pendingBooking');
        if (pending) {
          const booking = JSON.parse(pending);
          await fetch(`${import.meta.env.VITE_API_URL}/api/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...booking, userEmail: data.user.email }),
          });
          localStorage.removeItem('pendingBooking');
        }
        if (onLogin) onLogin();
        navigate('/appointments');
      }
    } catch (err) {
      setLoginError("Network error");
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");
    if (signupPassword !== signupConfirm) {
      setSignupError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSignupError(data.message || "Signup failed");
      } else {
        setSignupSuccess(true);
        setTimeout(() => {
          setMode("login");
          setSignupSuccess(false);
          setSignupName("");
          setSignupEmail("");
          setSignupPassword("");
          setSignupConfirm("");
        }, 1200);
      }
    } catch (err) {
      setSignupError("Network error");
    }
  };

  return (
    <div className="loginpage-2col">
      {/* Left Side: Login or Signup Form */}
      <div className="loginpage-left">
        {mode === "login" ? (
          <>
            <h2>Welcome Back!</h2>
            <p className="loginpage-sub">Please enter your login details below</p>
            <form className="login-form" onSubmit={handleLogin}>
              <input type="email" placeholder="Email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <div className="login-password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  style={{ paddingRight: 40 }}
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.73 3.29-5 6-6.32"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="7"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <button type="submit">Sign in</button>
              {loginError && <div className="loginpage-success" style={{ color: '#e53935' }}>{loginError}</div>}
            </form>
            <div className="loginpage-bottomtext">
              Don't have an account?{' '}
              <span className="loginpage-link" onClick={() => { setMode("signup"); setLoginError(""); }}>{"Sign Up"}</span>
            </div>
          </>
        ) : (
          <>
            <h2>Create Account</h2>
            <p className="loginpage-sub">Sign up to get started with SyncServe</p>
            <form className="login-form" onSubmit={handleSignup}>
              <input type="text" placeholder="Full Name" required value={signupName} onChange={e => setSignupName(e.target.value)} />
              <input type="email" placeholder="Email" required value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
              <div className="login-password-input-wrapper">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  style={{ paddingRight: 40 }}
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  tabIndex={-1}
                  aria-label={showSignupPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowSignupPassword((v) => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showSignupPassword ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.73 3.29-5 6-6.32"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="7"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <div className="login-password-input-wrapper">
                <input
                  type={showSignupConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  required
                  style={{ paddingRight: 40 }}
                  value={signupConfirm}
                  onChange={e => setSignupConfirm(e.target.value)}
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  tabIndex={-1}
                  aria-label={showSignupConfirm ? "Hide password" : "Show password"}
                  onClick={() => setShowSignupConfirm((v) => !v)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {showSignupConfirm ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.73 3.29-5 6-6.32"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="7"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              <button type="submit">Sign Up</button>
              {signupError && <div className="loginpage-success" style={{ color: '#e53935' }}>{signupError}</div>}
            </form>
            <div className="loginpage-bottomtext">
              Already have an account?{' '}
              <span className="loginpage-link" onClick={() => { setMode("login"); setSignupError(""); }}>{"Sign In"}</span>
            </div>
            {signupSuccess && <div className="loginpage-success">Account created! Redirecting to login...</div>}
          </>
        )}
      </div>
      {/* Right Side: Illustration and Tagline */}
      <div className="loginpage-right">
        <div className="loginpage-bgimg-full" style={{backgroundImage: `url(${loginImg})`}}></div>
        <img src={handyman3} alt="Welcome" className="loginpage-illustration" />
        <br/><br/>
        <div className="loginpage-tagline">Manage your Bookings Anywhere</div>
        <div className="loginpage-desc">Book, track, and manage your appointments with ease—anytime, anywhere, on any device.</div>
      </div>
    </div>
  );
}

function LoginPageWrapper(props) {
  return (
    <div className="login-outer-wrapper">
      <LoginPage {...props} />
    </div>
  );
}

export default LoginPageWrapper; 