import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/api';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Users, Stethoscope, Calendar, CheckCircle, Clock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await adminService.getAnalytics();
        setAnalytics(res.data.analytics);
      } catch (error) {
        toast.error('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Hospital overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Users" value={analytics?.totalUsers} icon={Users} color="blue" />
        <StatCard title="Total Doctors" value={analytics?.totalDoctors} icon={Stethoscope} color="green" />
        <StatCard title="Total Patients" value={analytics?.totalPatients} icon={UserPlus} color="purple" />
        <StatCard title="Total Appointments" value={analytics?.totalAppointments} icon={Calendar} color="yellow" />
        <StatCard title="Pending Appointments" value={analytics?.pendingAppointments} icon={Clock} color="yellow" />
        <StatCard title="Completed Appointments" value={analytics?.completedAppointments} icon={CheckCircle} color="green" />
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/doctors"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <Stethoscope className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Manage Doctors</p>
              <p className="text-sm text-gray-500">Add, edit, remove doctors</p>
            </div>
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
          >
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">View Users</p>
              <p className="text-sm text-gray-500">All registered users</p>
            </div>
          </Link>
          <Link
            to="/admin/appointments"
            className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors"
          >
            <Calendar className="h-6 w-6 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-900">Appointments</p>
              <p className="text-sm text-gray-500">Manage all appointments</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
