import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { appointmentService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatCard from '../../components/common/StatCard';
import { Calendar, Clock, CheckCircle, FileText, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const statusBadge = {
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
};

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await appointmentService.getAll();
        setAppointments(res.data.appointments);
      } catch {
        toast.error('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const upcoming = appointments.filter((a) => a.status === 'pending' || a.status === 'confirmed');
  const completed = appointments.filter((a) => a.status === 'completed');

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-gray-500 mt-1">Your health dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Appointments" value={appointments.length} icon={Calendar} color="blue" />
        <StatCard title="Upcoming" value={upcoming.length} icon={Clock} color="yellow" />
        <StatCard title="Completed" value={completed.length} icon={CheckCircle} color="green" />
      </div>

      {/* Quick Actions */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/patient/book" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <Plus className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Book Appointment</p>
              <p className="text-sm text-gray-500">Schedule a doctor visit</p>
            </div>
          </Link>
          <Link to="/patient/prescriptions" className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
            <FileText className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">My Prescriptions</p>
              <p className="text-sm text-gray-500">View medicines & notes</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Appointments</h2>
          <Link to="/patient/appointments" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No appointments yet</p>
            <Link to="/patient/book" className="btn-primary inline-block mt-3 text-sm">Book your first appointment</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 5).map((appt) => (
              <div key={appt._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    Dr. {appt.doctorId?.userId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString()} at {appt.timeSlot}
                  </p>
                </div>
                <span className={statusBadge[appt.status]}>{appt.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
