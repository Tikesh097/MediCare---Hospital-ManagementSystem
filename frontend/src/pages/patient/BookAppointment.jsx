import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctorService, appointmentService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Stethoscope, Calendar } from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ date: '', timeSlot: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await doctorService.getAll();
        setDoctors(res.data.doctors);
      } catch {
        toast.error('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) return toast.error('Please select a doctor');
    setSubmitting(true);
    try {
      await appointmentService.create({
        doctorId: selectedDoctor._id,
        date: formData.date,
        timeSlot: formData.timeSlot,
        reason: formData.reason,
      });
      toast.success('Appointment booked successfully!');
      navigate('/patient/appointments');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  // Minimum date is today
  const today = new Date().toISOString().split('T')[0];

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
        <p className="text-gray-500 mt-1">Select a doctor and schedule your visit</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Doctor Selection */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose a Doctor</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`card cursor-pointer transition-all ${
                  selectedDoctor?._id === doctor._id
                    ? 'border-2 border-blue-500 shadow-md'
                    : 'hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Dr. {doctor.userId?.name}</p>
                    <p className="text-sm text-blue-600">{doctor.specialization}</p>
                    <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                    {doctor.availability?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {doctor.availability.map((day) => (
                          <span key={day} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{day.slice(0,3)}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  {doctor.consultationFee > 0 && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">${doctor.consultationFee}</p>
                      <p className="text-xs text-gray-400">per visit</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {doctors.length === 0 && (
              <p className="text-gray-500 text-center py-8">No doctors available</p>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h2>
          <div className="card">
            {selectedDoctor && (
              <div className="mb-5 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">
                  Selected: Dr. {selectedDoctor.userId?.name} — {selectedDoctor.specialization}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline h-4 w-4 mr-1" /> Appointment Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                        formData.timeSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  rows={3}
                  placeholder="Describe your symptoms or reason..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !selectedDoctor || !formData.date || !formData.timeSlot}
                className="btn-primary w-full"
              >
                {submitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
