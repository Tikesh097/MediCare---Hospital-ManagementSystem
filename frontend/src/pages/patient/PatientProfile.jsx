import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { User, Save } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const PatientProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    age: '', gender: '', phone: '', address: '', bloodGroup: '',
  });
  const [medHistory, setMedHistory] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await patientService.getMyProfile();
        const p = res.data.patient;
        setProfile(p);
        setFormData({
          age: p.age || '',
          gender: p.gender || '',
          phone: p.phone || '',
          address: p.address || '',
          bloodGroup: p.bloodGroup || '',
        });
        setMedHistory(p.medicalHistory?.join(', ') || '');
      } catch {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const medicalHistory = medHistory.split(',').map((s) => s.trim()).filter(Boolean);
      await patientService.update(profile._id, { ...formData, medicalHistory });
      toast.success('Profile updated successfully');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">Update your personal and medical information</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="card text-center">
          <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
          <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
            {user?.role}
          </span>

          {formData.bloodGroup && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-500">Blood Group</p>
              <p className="text-2xl font-bold text-red-600">{formData.bloodGroup}</p>
            </div>
          )}
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  min="0"
                  className="input-field"
                  placeholder="Your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-field"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="input-field resize-none"
                placeholder="Your address..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <div className="flex flex-wrap gap-2">
                {BLOOD_GROUPS.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                    className={`px-3 py-1.5 text-sm rounded-lg border font-medium transition-colors ${
                      formData.bloodGroup === bg
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-300 text-gray-600 hover:border-red-300'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
                <span className="text-gray-400 font-normal ml-1">(comma-separated)</span>
              </label>
              <textarea
                value={medHistory}
                onChange={(e) => setMedHistory(e.target.value)}
                rows={2}
                className="input-field resize-none"
                placeholder="e.g. Diabetes, Hypertension, Asthma"
              />
            </div>

            <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
