# Hospital Management System (MERN Stack)

A full-featured, production-ready Hospital Management System built with MongoDB, Express.js, React, and Node.js.

---

## Features

### Roles
- **Admin** - Full system control, analytics dashboard
- **Doctor** - Appointment management, prescriptions
- **Patient** - Book appointments, view prescriptions

### Key Functionality
- JWT-based authentication with role protection
- Book and manage appointments with time slots
- Write and view prescriptions with medicine details
- Admin analytics dashboard with real-time counts
- Responsive UI with Tailwind CSS
- Protected routes per role

---

## Project Structure

```
hospital-management-system/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Business logic
│   ├── middleware/       # Auth & error handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   └── server.js        # App entry point
│
└── frontend/
    └── src/
        ├── components/  # Reusable UI components
        ├── context/     # Auth Context
        ├── pages/       # Admin, Doctor, Patient pages
        ├── services/    # Axios API calls
        └── App.jsx      # Router configuration
```

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone and Setup Backend

```bash
cd hospital-management-system/backend

# Install dependencies
npm install

# Copy env file and configure
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/hospital_management
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 2. Setup Frontend

```bash
cd hospital-management-system/frontend

# Install dependencies
npm install

# Optional: copy env file
cp .env.example .env
```

### 3. Run Both Apps

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Seed Admin Account

Create an admin account by calling the register API or inserting directly:

```bash
# Via API (POST http://localhost:5000/api/auth/register)
{
  "name": "Admin User",
  "email": "admin@hospital.com",
  "password": "password123",
  "role": "admin"
}
```

Or update an existing user's role to `admin` in MongoDB:
```js
db.users.updateOne({ email: "admin@hospital.com" }, { $set: { role: "admin" } })
```

---

## API Endpoints

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Auth |
| GET | /api/doctors | Public |
| POST | /api/doctors | Admin |
| PUT | /api/doctors/:id | Admin/Doctor |
| DELETE | /api/doctors/:id | Admin |
| GET | /api/appointments | Auth |
| POST | /api/appointments | Patient |
| PUT | /api/appointments/:id | Auth |
| GET | /api/patients | Admin/Doctor |
| GET | /api/patients/me | Patient |
| PUT | /api/patients/:id | Patient/Admin |
| POST | /api/prescriptions | Doctor |
| GET | /api/prescriptions/my | Patient |
| GET | /api/prescriptions/:appointmentId | Auth |
| GET | /api/admin/analytics | Admin |
| GET | /api/admin/users | Admin |
| DELETE | /api/admin/users/:id | Admin |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS |
| State Management | Context API |
| HTTP Client | Axios |
| Routing | React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Notifications | react-hot-toast |
| Icons | lucide-react |
