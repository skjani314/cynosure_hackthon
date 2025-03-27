import React from 'react';
import { X } from 'lucide-react';

function HospitalProfile({ onClose }) {
  const hospitalData = {
    name: 'City General Hospital',
    address: '123 Healthcare Ave, Medical District',
    phone: '+1 (555) 987-6543',
    email: 'info@citygeneralhospital.com',
    specialties: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'],
    established: '1985',
    accreditation: 'Joint Commission Accredited',
    emergencyServices: '24/7',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Hospital Profile</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <img
            src={hospitalData.image}
            alt={hospitalData.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">General Information</h4>
              <div className="space-y-2">
                <p><span className="text-gray-600">Name:</span> {hospitalData.name}</p>
                <p><span className="text-gray-600">Established:</span> {hospitalData.established}</p>
                <p><span className="text-gray-600">Accreditation:</span> {hospitalData.accreditation}</p>
                <p><span className="text-gray-600">Emergency Services:</span> {hospitalData.emergencyServices}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
              <div className="space-y-2">
                <p><span className="text-gray-600">Address:</span> {hospitalData.address}</p>
                <p><span className="text-gray-600">Phone:</span> {hospitalData.phone}</p>
                <p><span className="text-gray-600">Email:</span> {hospitalData.email}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {hospitalData.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalProfile;

