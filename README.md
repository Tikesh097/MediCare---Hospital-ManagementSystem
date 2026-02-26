# 🏥 MediCare — Hospital Management System
**MERN Stack • JWT Auth • Role-Based Access • Tailwind CSS**

MediCare is a full-featured, production-ready Hospital Management System built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It enables seamless management of patients, doctors, appointments, prescriptions, and admin analytics with secure authentication and role-based access.

---

## ✨ Features

### 👥 User Roles
- 🛡️ **Admin** — Full system control with analytics dashboard
- 👨‍⚕️ **Doctor** — Manage appointments & create prescriptions
- 🧑‍🤝‍🧑 **Patient** — Book appointments & view prescriptions

### ⚙️ Core Functionality
- 🔐 JWT-based authentication & role protection
- 📅 Appointment booking with time slots
- 💊 Prescription management with medicine details
- 📊 Admin analytics dashboard (real-time counts)
- 🧭 Role-based protected routes
- 📱 Fully responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **State Management** | Context API |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, bcryptjs |
| **Notifications** | react-hot-toast |
| **Icons** | lucide-react |

---

## 📁 Project Structure

```
hospital-management-system/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── context/     # Authentication context
        ├── pages/       # Admin, Doctor, Patient dashboards
        ├── services/    # API calls (Axios)
        └── App.jsx      # Routing setup
```

---

## 📦 Installation & Setup

### ✅ Prerequisites
- Node.js v18+
- MongoDB (Local or Atlas)

---

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Tikesh097/MediCare---Hospital-ManagementSystem
cd MediCare---Hospital-ManagementSystem
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # optional
```

---

## ▶️ Run Application

**Terminal 1 — Backend**

```bash
cd backend
npm run dev
```
👉 http://localhost:5000

**Terminal 2 — Frontend**

```bash
cd frontend
npm run dev
```
👉 http://localhost:5173

---

## 🔑 Seed Admin Account

**Option 1 — Using API**

```http
POST /api/auth/register
```

```json
{
  "name": "Admin User",
  "email": "admin@hospital.com",
  "password": "password123",
  "role": "admin"
}
```

**Option 2 — MongoDB**

```js
db.users.updateOne(
  { email: "admin@hospital.com" },
  { $set: { role: "admin" } }
)
```

---

## 🔌 API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Auth |
| GET | `/api/doctors` | Public |
| POST | `/api/doctors` | Admin |
| PUT | `/api/doctors/:id` | Admin/Doctor |
| DELETE | `/api/doctors/:id` | Admin |
| GET | `/api/appointments` | Auth |
| POST | `/api/appointments` | Patient |
| PUT | `/api/appointments/:id` | Auth |
| GET | `/api/patients` | Admin/Doctor |
| GET | `/api/patients/me` | Patient |
| PUT | `/api/patients/:id` | Patient/Admin |
| POST | `/api/prescriptions` | Doctor |
| GET | `/api/prescriptions/my` | Patient |
| GET | `/api/prescriptions/:appointmentId` | Auth |
| GET | `/api/admin/analytics` | Admin |
| GET | `/api/admin/users` | Admin |
| DELETE | `/api/admin/users/:id` | Admin |

---

## 🚀 Deployment

```bash
# 1. Build frontend
npm run build
```

- Deploy the `dist` folder to **Netlify / Vercel**
- Deploy backend to **Render / Railway / VPS**

---

## 🤝 Contributing

Contributions are welcome!

```bash
git checkout -b feature/AmazingFeature
git commit -m "Add AmazingFeature"
git push origin feature/AmazingFeature
```

Then open a **Pull Request** 🚀

---

## 📄 License

This project is licensed under the **MIT License** — free for personal and commercial use.

---

## 🔗 Live Demo

👉 [https://medicarehospitalmanagementsystem.netlify.app](https://medicarehospitalmanagementsystem.netlify.app)

---

## 🙌 Acknowledgements

Built following best practices of MERN architecture, scalable backend design, and modern React UI patterns.

---

*Made with ❤️ by Tikesh*
