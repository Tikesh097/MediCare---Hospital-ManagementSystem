import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Trash2, Calendar } from 'lucide-react';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await appointmentService.delete(id);
      toast.success('Appointment deleted');
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await appointmentService.update(id, { status });
      setAppointments(appointments.map((a) => (a._id === id ? res.data.appointment : a)));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  const statusBadge = {
    pending: 'badge-pending',
    confirmed: 'badge-confirmed',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  };

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Appointments</h1>
        <p className="text-gray-500">{appointments.length} total appointments</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === s ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((appt) => (
          <div key={appt._id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={statusBadge[appt.status]}>{appt.status}</span>
                  </div>
                  <p className="font-medium text-gray-900">
                    Patient: {appt.patientId?.userId?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Doctor: Dr. {appt.doctorId?.userId?.name || 'Unknown'} ({appt.doctorId?.specialization})
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString()} at {appt.timeSlot}
                  </p>
                  {appt.reason && <p className="text-sm text-gray-500 mt-1">Reason: {appt.reason}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={appt.status}
                  onChange={(e) => handleStatusUpdate(appt._id, e.target.value)}
                  className="text-sm border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 card">No appointments found</div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
