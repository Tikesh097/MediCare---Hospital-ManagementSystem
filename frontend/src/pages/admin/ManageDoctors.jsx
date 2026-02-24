import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, X, Stethoscope } from 'lucide-react';

const initialForm = {
  name: '', email: '', password: '', specialization: '',
  experience: '', qualifications: '', consultationFee: '', bio: '',
  availability: [],
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => { fetchDoctors(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleDay = (day) => {
    const current = formData.availability;
    setFormData({
      ...formData,
      availability: current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day],
    });
  };

  const openAddModal = () => {
    setEditingDoctor(null);
    setFormData(initialForm);
    setShowModal(true);
  };

  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.userId?.name || '',
      email: doctor.userId?.email || '',
      password: '',
      specialization: doctor.specialization,
      experience: doctor.experience,
      qualifications: doctor.qualifications || '',
      consultationFee: doctor.consultationFee || '',
      bio: doctor.bio || '',
      availability: doctor.availability || [],
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingDoctor) {
        await doctorService.update(editingDoctor._id, formData);
        toast.success('Doctor updated successfully');
      } else {
        await doctorService.create(formData);
        toast.success('Doctor added successfully');
      }
      setShowModal(false);
      fetchDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor? This cannot be undone.')) return;
    try {
      await doctorService.delete(id);
      toast.success('Doctor deleted');
      setDoctors(doctors.filter((d) => d._id !== id));
    } catch {
      toast.error('Failed to delete doctor');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Doctors</h1>
          <p className="text-gray-500">{doctors.length} doctors registered</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Doctor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{doctor.userId?.name}</p>
                  <p className="text-sm text-gray-500">{doctor.userId?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(doctor)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(doctor._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Specialization:</span> {doctor.specialization}</p>
              <p><span className="font-medium">Experience:</span> {doctor.experience} years</p>
              {doctor.consultationFee > 0 && (
                <p><span className="font-medium">Fee:</span> ${doctor.consultationFee}</p>
              )}
              {doctor.availability?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {doctor.availability.map((day) => (
                    <span key={day} className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">{day}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
              <button onClick={() => setShowModal(false)}><X className="h-5 w-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!editingDoctor && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="input-field" />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} required className="input-field" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                  <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" required className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee ($)</label>
                  <input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleChange} min="0" className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="e.g. MBBS, MD" className="input-field" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={2} className="input-field resize-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDay(day)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        formData.availability.includes(day)
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 text-gray-600 hover:border-green-400'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Saving...' : editingDoctor ? 'Update Doctor' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
