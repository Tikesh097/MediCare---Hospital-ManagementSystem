import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { appointmentService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import StatCard from '../../components/common/StatCard';
import { Calendar, Clock, CheckCircle, Users } from 'lucide-react';
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await appointmentService.getAll();
        setAppointments(res.data.appointments);
      } catch {
        toast.error('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const today = new Date().toDateString();
  const todayAppts = appointments.filter(
    (a) => new Date(a.date).toDateString() === today && a.status !== 'cancelled'
  );
  const pending = appointments.filter((a) => a.status === 'pending');
  const completed = appointments.filter((a) => a.status === 'completed');

  // Get unique patients
  const uniquePatients = new Set(appointments.map((a) => a.patientId?._id)).size;

  const statusBadge = { pending: 'badge-pending', confirmed: 'badge-confirmed', completed: 'badge-completed', cancelled: 'badge-cancelled' };

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good day, Dr. {user?.name}!</h1>
        <p className="text-gray-500 mt-1">Here's your schedule overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today's Appointments" value={todayAppts.length} icon={Calendar} color="blue" />
        <StatCard title="Pending Approvals" value={pending.length} icon={Clock} color="yellow" />
        <StatCard title="Completed" value={completed.length} icon={CheckCircle} color="green" />
        <StatCard title="Total Patients" value={uniquePatients} icon={Users} color="purple" />
      </div>

      {/* Today's Schedule */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
          <Link to="/doctor/appointments" className="text-sm text-blue-600 hover:underline">View all</Link>
        </div>
        {todayAppts.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No appointments today</p>
        ) : (
          <div className="space-y-3">
            {todayAppts.slice(0, 5).map((appt) => (
              <div key={appt._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appt.patientId?.userId?.name}</p>
                  <p className="text-sm text-gray-500">{appt.timeSlot} - {appt.reason || 'General consultation'}</p>
                </div>
                <span className={statusBadge[appt.status]}>{appt.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <Link
          to="/doctor/appointments"
          className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <Calendar className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Manage Appointments</p>
            <p className="text-sm text-gray-500">View, confirm, and prescribe</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
