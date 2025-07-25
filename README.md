# Appointment Booking Website

A full-stack web application for booking appointments with various service providers (doctors, salons, home repair, grooming, etc.). The project is divided into two main folders:

- **frontend/**: React-based user interface using Vite, React Router, and Tailwind CSS.
- **backend/**: Node.js/Express REST API with MongoDB (Atlas) for data storage.

---

## Project Structure

```
appointment-booking-website/

├── frontend/
│   ├── src/
│   │   ├── assets/                # Images and static assets
│   │   ├── components/            # Modular React components
│   │   │   ├── AboutPage/
│   │   │   ├── AppointmentsPage.jsx
│   │   │   ├── BridalMakeup/
│   │   │   ├── ContactPage/
│   │   │   ├── DoctorAppointment/
│   │   │   ├── DoctorDetail/
│   │   │   ├── Footer/
│   │   │   ├── GroomingAppointment/
│   │   │   ├── HairColoring/
│   │   │   ├── HairCut/
│   │   │   ├── Header/
│   │   │   ├── Hero/
│   │   │   ├── HomeFooter/
│   │   │   ├── HomeRepair/
│   │   │   ├── Login/
│   │   │   ├── patientform/
│   │   │   ├── RelatedDoctor/
│   │   │   ├── RelatedDoctors/
│   │   │   ├── servicePage/
│   │   │   ├── servicesection/
│   │   │   ├── Testimonials/
│   │   │   ├── Treatment/
│   │   ├── App.jsx                # Main React app component
│   │   ├── Home.jsx               # Home page
│   │   ├── main.jsx               # Entry point
│   │   ├── HomeScrollEffect.css   # Home page scroll effects
│   ├── public/                    # Static public assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies and scripts
│   ├── vite.config.js             # Vite configuration
│   ├── .env.example               # Example environment variables
│   ├── README.md                  # Frontend-specific documentation (if any)
│   └── ...
│
├── backend/
│   ├── models/
│   │   └── Appointment.js         # Mongoose model for appointments
│   ├── server.js                  # Main Express server file
│   ├── package.json               # Backend dependencies and scripts
│   ├── .env.example               # Example environment variables
│   ├── .gitignore                 # Ignore node_modules, .env, etc.
│   └── ...
│
└── README.md                      # Project documentation (this file)
```

---

## Features

### Frontend
- **User Authentication**: Signup and login forms.
- **Booking**: Book appointments for doctors, salons, home repair, grooming, and more.
- **Service Pages**: Detailed pages for each service type.
- **Contact Form**: Send messages to site admin.
- **Responsive UI**: Built with React, Tailwind CSS, and modular components.
- **Persistent Login**: User info stored in localStorage.

### Backend
- **REST API**: Endpoints for user auth, appointments, and contact form.
- **MongoDB Atlas**: Stores users and appointments.
- **Email Notifications**: Sends emails via Nodemailer for contact form submissions.
- **Environment Variables**: Sensitive data managed via `.env` files.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas account

---

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd appointment-booking-website
```

---

### 2. Setup Backend

```sh
cd backend
cp .env.example .env
# Edit .env with your MongoDB Atlas URI and email credentials
npm install
npm start
```

#### `.env.example` for Backend

```env
# MongoDB Atlas connection string
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-address>/<database>?retryWrites=true&w=majority

# Server port
PORT=5000

# Email credentials for Nodemailer (Gmail recommended)
CONTACT_EMAIL_USER=your_email@gmail.com
CONTACT_EMAIL_PASS=your_app_password
```

---

### 3. Setup Frontend

```sh
cd ../frontend
cp .env.example .env
# Edit .env if deploying to production (set VITE_API_URL to your backend URL)
npm install
npm run dev
```

#### `.env.example` for Frontend

```env
# Base URL for backend API
VITE_API_URL=http://localhost:5000
```

---

## Scripts

### Backend

- `npm start` — Starts the Express server.

### Frontend

- `npm run dev` — Starts the Vite development server.
- `npm run build` — Builds the production-ready frontend.
- `npm run preview` — Previews the production build locally.
- `npm run lint` — Lints the codebase.

---

## Deployment

- Set environment variables in your deployment environment (do not commit `.env` files).
- Make sure both frontend and backend are using the correct URLs for production.
- Whitelist your server's IP in MongoDB Atlas.

---

## Main Components & Pages

- **LoginPage**: User authentication.
- **AppointmentsPage**: View and manage appointments.
- **DoctorAppointment, GroomingAppointment, HomeRepairAppointment, BridalMakeupDetail, etc.**: Booking forms for each service.
- **DoctorDetail, HaircutDetail, HairColoringDetail, etc.**: Service provider details.
- **ContactPage**: Contact form for user inquiries.
- **AboutPage, Testimonials, Footer, Header, Hero, etc.**: Informational and layout components.

---

## Models

### Appointment (backend/models/Appointment.js)
```js
{
  userEmail: String,
  doctorName: String,
  specialization: String,
  address: String,
  date: String,
  time: String,
  image: String,
  status: { type: String, default: 'active' }
}
```

---

## Environment & Security

- **.env files** are used for all sensitive configuration.
- **.gitignore** includes `.env` and `node_modules` to prevent accidental leaks.

---

## Brief Description

This website allows users to book appointments for a variety of services, including medical, beauty, and home repair. Users can sign up, log in, browse service providers, book appointments, and contact the site admin. The backend handles authentication, appointment management, and email notifications, while the frontend provides a modern, responsive user experience.

---

## License

MIT

---

## Contact

For any issues or feature requests, please open an issue or contact the maintainer. 