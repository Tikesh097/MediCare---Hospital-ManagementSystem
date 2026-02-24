import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Calendar, X } from 'lucide-react';

const statusBadge = {
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
};

const PatientAppointments = () => {
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

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      const res = await appointmentService.update(id, { status: 'cancelled' });
      setAppointments(appointments.map((a) => (a._id === id ? res.data.appointment : a)));
      toast.success('Appointment cancelled');
    } catch {
      toast.error('Failed to cancel appointment');
    }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
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
                    <p className="font-semibold text-gray-900">Dr. {appt.doctorId?.userId?.name}</p>
                    <span className={statusBadge[appt.status]}>{appt.status}</span>
                  </div>
                  <p className="text-sm text-blue-600">{appt.doctorId?.specialization}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    {' at '}{appt.timeSlot}
                  </p>
                  {appt.reason && <p className="text-sm text-gray-500 mt-1">Reason: {appt.reason}</p>}
                  {appt.notes && <p className="text-sm text-gray-500 mt-1 italic">Doctor's note: {appt.notes}</p>}
                </div>
              </div>
              {(appt.status === 'pending' || appt.status === 'confirmed') && (
                <button
                  onClick={() => handleCancel(appt._id)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-red-200"
                >
                  <X className="h-3.5 w-3.5" /> Cancel
                </button>
              )}
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

export default PatientAppointments;
