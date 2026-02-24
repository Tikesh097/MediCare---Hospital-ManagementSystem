import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth Services ────────────────────────────────────────────────────────────
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// ─── Doctor Services ──────────────────────────────────────────────────────────
export const doctorService = {
  getAll: () => api.get('/doctors'),
  getById: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post('/doctors', data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  delete: (id) => api.delete(`/doctors/${id}`),
};

// ─── Appointment Services ─────────────────────────────────────────────────────
export const appointmentService = {
  getAll: () => api.get('/appointments'),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

// ─── Patient Services ─────────────────────────────────────────────────────────
export const patientService = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  getMyProfile: () => api.get('/patients/me'),
  update: (id, data) => api.put(`/patients/${id}`, data),
};

// ─── Prescription Services ────────────────────────────────────────────────────
export const prescriptionService = {
  create: (data) => api.post('/prescriptions', data),
  getByAppointment: (appointmentId) => api.get(`/prescriptions/${appointmentId}`),
  getMyPrescriptions: () => api.get('/prescriptions/my'),
  update: (id, data) => api.put(`/prescriptions/${id}`, data),
};

// ─── Admin Services ───────────────────────────────────────────────────────────
export const adminService = {
  getAnalytics: () => api.get('/admin/analytics'),
  getAllUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export default api;
