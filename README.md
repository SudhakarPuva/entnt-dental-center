🦷 ENTNT Dental Center Management Dashboard

A **frontend-only React-based Dental Center Management System** built for ENTNT, supporting both **Admin (Dentist)** and **Patient** roles.

> Includes appointment tracking, patient management, file uploads, incident reports, calendar views, and even a floating chatbot assistant — all in one seamless dashboard.

---

## 🌐 Live Demo

🔗 [View Demo](https://your-deployed-link.com)  
📦 [GitHub Repository](https://github.com/SudhakarPuva/entnt-dental-center)

---

## 🚀 Features

### 🔐 Authentication

- Hardcoded users stored in `localStorage`
- Two user roles: **Admin** and **Patient**
- Role-based routing and protected routes
- Session persistence using `localStorage`

### 👩‍⚕️ Admin Dashboard

- View / Add / Edit / Delete **Patients**
- Manage **Appointments & Incidents**
- Upload and preview **Treatment Files** (PDFs, Images)
- View **Appointment Calendar**
- Read **Feedback** submitted by patients
- Live **Notification Panel**
- **Floating Chatbot Assistant** for instant help
- Dashboard charts and statistics

### 🧑‍💼 Patient Dashboard

- View **Upcoming & Past Appointments**
- Access **Billing Info**, **Status**, and **Treatment Files**
- Submit **Feedback**
- Manage and edit **Profile Details**

### 📁 File Handling

- Files uploaded as **base64-encoded URLs**
- Instant preview and download
- Supports images and PDF formats

### 📅 Appointment Calendar

- Built with `react-calendar`
- Visual indicators for appointment days
- Clickable appointment cards

### 💬 Floating Chatbot (Additional Feature)

- Available on the **Landing Page**
- Replies to keyword queries like `services`, `cost`, `doctors`, `contact`, etc.
- Extensible architecture for future AI or support integration

---

## 🧱 Project Structure

src/
├── assets/ # Static images & icons
├── components/ # Shared components (modals, notifications, charts)
├── patientPageComponents/ # Patient-specific dashboard components
├── pages/ # Login, Signup, Landing, AdminDashboard, etc.
├── App.jsx # Main router and layout
├── index.js # Root render
└── localStorage.js # Custom utility for storage

---

## 🛠️ Technologies Used

- **Routing**: React Router v6
- **Styling**: TailwindCSS
- **Animations**: Framer Motion, AOS (Animate On Scroll)
- **State Management**: useState, useEffect, Context API
- **Calendar**: `react-calendar`
- **File Handling**: Base64 in `localStorage`
- **Auth**: Simulated using hardcoded users and role-based rendering
- **Deployment**: Netlify / Vercel / GitHub Pages

---

## 📦 Sample Users

```json
[
  {
    "id": "1",
    "role": "Admin",
    "email": "admin@entnt.in",
    "password": "admin123"
  },
  {
    "id": "2",
    "role": "Patient",
    "email": "john@entnt.in",
    "password": "patient123"
  }
]

---

⚙️ Getting Started

1️⃣ Clone the Repo

git clone https://github.com/SudhakarPuva/entnt-dental-center.git
cd entnt-dental-center

2️⃣ Install Dependencies

npm install

3️⃣ Start Development Server

npm run dev

4️⃣ Build for Production

npm run build

---

🧠 Technical Highlights

localStorage used to simulate a persistent database.

Used UUIDs for uniquely identifying appointments and feedbacks.

Fully responsive design across mobile, tablet, and desktop.

Base64 file storage ensures a backend-free approach.

Conditional rendering based on user roles and login state.

Modular and scalable folder structure.

---

🐞 Known Limitations

localStorage is not encrypted — visible via browser dev tools.

No backend or real-time sync.

File size limits not enforced.

Chatbot is static and keyword-based (not AI-driven).

No pagination for long lists (e.g., appointments).

Some transient UI states reset on page reload due to lack of global state (e.g., Redux).

---

✅ Notable Features

✅ Floating Chatbot (Landing Page only)

✅ Real-time Notifications

✅ Editable Profile Modal with Avatar Upload

✅ Dashboard with animated stats and charts

✅ Feedback Submission System

✅ File Vault with secure previews

✅ Mobile-first Design

---

🙌 Thank You

We hope the ENTNT Dental Center Management System redefines the dental software experience — making it clean, efficient, and delightful for both patients and doctors.

© 2025 ENTNT Dental Center | Built with ❤️ by Sudhakar B



