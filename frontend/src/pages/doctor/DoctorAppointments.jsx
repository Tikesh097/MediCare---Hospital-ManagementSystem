import React, { useEffect, useState } from 'react';
import { appointmentService, prescriptionService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Calendar, Plus, X, FileText } from 'lucide-react';

const statusBadge = {
  pending: 'badge-pending',
  confirmed: 'badge-confirmed',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
};

const initialPrescForm = { diagnosis: '', notes: '', followUpDate: '', medicines: [{ name: '', dosage: '', frequency: '', duration: '' }] };

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [prescModal, setPrescModal] = useState(null); // holds appointment for prescription
  const [prescForm, setPrescForm] = useState(initialPrescForm);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => { fetchAppointments(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await appointmentService.update(id, { status });
      setAppointments(appointments.map((a) => (a._id === id ? res.data.appointment : a)));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...prescForm.medicines];
    updated[index] = { ...updated[index], [field]: value };
    setPrescForm({ ...prescForm, medicines: updated });
  };

  const addMedicine = () => {
    setPrescForm({ ...prescForm, medicines: [...prescForm.medicines, { name: '', dosage: '', frequency: '', duration: '' }] });
  };

  const removeMedicine = (index) => {
    setPrescForm({ ...prescForm, medicines: prescForm.medicines.filter((_, i) => i !== index) });
  };

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await prescriptionService.create({ appointmentId: prescModal._id, ...prescForm });
      toast.success('Prescription created successfully');
      setPrescModal(null);
      fetchAppointments();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create prescription');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
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
                    <p className="font-semibold text-gray-900">{appt.patientId?.userId?.name}</p>
                    <span className={statusBadge[appt.status]}>{appt.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">{new Date(appt.date).toLocaleDateString()} at {appt.timeSlot}</p>
                  {appt.reason && <p className="text-sm text-gray-500">Reason: {appt.reason}</p>}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {appt.status === 'pending' && (
                  <button
                    onClick={() => handleStatusChange(appt._id, 'confirmed')}
                    className="text-sm px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    Confirm
                  </button>
                )}
                {(appt.status === 'confirmed' || appt.status === 'pending') && (
                  <button
                    onClick={() => { setPrescModal(appt); setPrescForm(initialPrescForm); }}
                    className="text-sm px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-1"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Prescribe
                  </button>
                )}
                {appt.status !== 'completed' && appt.status !== 'cancelled' && (
                  <button
                    onClick={() => handleStatusChange(appt._id, 'cancelled')}
                    className="text-sm px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 card">No appointments found</div>
        )}
      </div>

      {/* Prescription Modal */}
      {prescModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Write Prescription</h2>
                <p className="text-sm text-gray-500">Patient: {prescModal.patientId?.userId?.name}</p>
              </div>
              <button onClick={() => setPrescModal(null)}><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handlePrescriptionSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
                <textarea
                  value={prescForm.diagnosis}
                  onChange={(e) => setPrescForm({ ...prescForm, diagnosis: e.target.value })}
                  required
                  rows={2}
                  className="input-field resize-none"
                  placeholder="Patient diagnosis..."
                />
              </div>

              {/* Medicines */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">Medicines</label>
                  <button type="button" onClick={addMedicine} className="text-sm text-blue-600 flex items-center gap-1 hover:underline">
                    <Plus className="h-3.5 w-3.5" /> Add Medicine
                  </button>
                </div>
                <div className="space-y-3">
                  {prescForm.medicines.map((med, idx) => (
                    <div key={idx} className="p-3 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-2 gap-2">
                        <input placeholder="Medicine name" value={med.name} onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)} required className="input-field text-sm" />
                        <input placeholder="Dosage (e.g. 500mg)" value={med.dosage} onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)} required className="input-field text-sm" />
                        <input placeholder="Frequency (e.g. Twice/day)" value={med.frequency} onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)} required className="input-field text-sm" />
                        <input placeholder="Duration (e.g. 7 days)" value={med.duration} onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)} required className="input-field text-sm" />
                      </div>
                      {prescForm.medicines.length > 1 && (
                        <button type="button" onClick={() => removeMedicine(idx)} className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={prescForm.notes}
                  onChange={(e) => setPrescForm({ ...prescForm, notes: e.target.value })}
                  rows={2}
                  className="input-field resize-none"
                  placeholder="Additional notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={prescForm.followUpDate}
                  onChange={(e) => setPrescForm({ ...prescForm, followUpDate: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setPrescModal(null)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Saving...' : 'Create Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
