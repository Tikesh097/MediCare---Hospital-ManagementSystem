import React, { useEffect, useState } from 'react';
import { prescriptionService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import toast from 'react-hot-toast';
import { FileText, Pill } from 'lucide-react';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await prescriptionService.getMyPrescriptions();
        setPrescriptions(res.data.prescriptions);
      } catch {
        toast.error('Failed to load prescriptions');
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Prescriptions</h1>
        <p className="text-gray-500">{prescriptions.length} prescriptions found</p>
      </div>

      {prescriptions.length === 0 ? (
        <div className="card text-center py-16">
          <FileText className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No prescriptions yet</p>
          <p className="text-gray-400 text-sm mt-1">Prescriptions will appear here after your appointments are completed</p>
        </div>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div key={prescription._id} className="card">
              {/* Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    Dr. {prescription.appointmentId?.doctorId?.userId?.name}
                  </p>
                  <p className="text-sm text-blue-600">
                    {prescription.appointmentId?.doctorId?.specialization}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Date: {new Date(prescription.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>

              {/* Diagnosis */}
              {prescription.diagnosis && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Diagnosis</p>
                  <p className="text-gray-600 bg-red-50 p-3 rounded-lg text-sm">{prescription.diagnosis}</p>
                </div>
              )}

              {/* Medicines */}
              {prescription.medicines?.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Pill className="h-4 w-4" /> Medicines
                  </p>
                  <div className="space-y-2">
                    {prescription.medicines.map((med, idx) => (
                      <div key={idx} className="bg-green-50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-gray-900">{med.name}</p>
                          <span className="text-sm text-green-700 font-medium">{med.dosage}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {med.frequency} &bull; {med.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {prescription.notes && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Doctor's Notes</p>
                  <p className="text-gray-600 bg-yellow-50 p-3 rounded-lg text-sm italic">{prescription.notes}</p>
                </div>
              )}

              {/* Follow-up */}
              {prescription.followUpDate && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Follow-up Date:</span>{' '}
                    {new Date(prescription.followUpDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
