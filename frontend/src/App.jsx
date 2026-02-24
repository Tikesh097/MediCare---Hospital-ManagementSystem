import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageDoctors from './pages/admin/ManageDoctors';
import UsersList from './pages/admin/UsersList';
import AdminAppointments from './pages/admin/AdminAppointments';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import PatientAppointments from './pages/patient/PatientAppointments';
import Prescriptions from './pages/patient/Prescriptions';
import PatientProfile from './pages/patient/PatientProfile';

// Common
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';

const App = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect root URL based on auth status and role
  const getRootRedirect = () => {
    if (!isAuthenticated) return '/login';
    const map = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
    return map[user?.role] || '/login';
  };

  return (
    <Routes>
      {/* ── Root redirect ──────────────────────────────── */}
      <Route path="/" element={<Navigate to={getRootRedirect()} replace />} />

      {/* ── Public Auth Routes ─────────────────────────── */}
      <Route path="/login" element={isAuthenticated ? <Navigate to={getRootRedirect()} replace /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to={getRootRedirect()} replace /> : <Register />} />

      {/* ── Admin Routes ───────────────────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <Layout><AdminDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute roles={['admin']}>
            <Layout><ManageDoctors /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={['admin']}>
            <Layout><UsersList /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute roles={['admin']}>
            <Layout><AdminAppointments /></Layout>
          </ProtectedRoute>
        }
      />

      {/* ── Doctor Routes ──────────────────────────────── */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute roles={['doctor']}>
            <Layout><DoctorDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute roles={['doctor']}>
            <Layout><DoctorAppointments /></Layout>
          </ProtectedRoute>
        }
      />

      {/* ── Patient Routes ─────────────────────────────── */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute roles={['patient']}>
            <Layout><PatientDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/book"
        element={
          <ProtectedRoute roles={['patient']}>
            <Layout><BookAppointment /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/appointments"
        element={
          <ProtectedRoute roles={['patient']}>
            <Layout><PatientAppointments /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/prescriptions"
        element={
          <ProtectedRoute roles={['patient']}>
            <Layout><Prescriptions /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute roles={['patient']}>
            <Layout><PatientProfile /></Layout>
          </ProtectedRoute>
        }
      />

      {/* ── 404 ───────────────────────────────────────── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
