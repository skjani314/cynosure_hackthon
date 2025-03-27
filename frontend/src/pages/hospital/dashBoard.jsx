import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import toast from "react-hot-toast";
import HospitalNavbar from "./navbar";

function HospitalDashboard() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      experience: 12,
      availability: "Mon-Fri, 9AM-5PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Dr. James Chen",
      specialty: "Neurologist",
      experience: 15,
      availability: "Tue-Sat, 10AM-6PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ]);

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    toast.success("Doctor removed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HospitalNavbar />

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Doctors</h2>
          
          {/* ✅ Navigate to form page when clicked */}
          <button
            onClick={() => navigate("/hospital/form")} 
            className="flex items-center gap-2 bg-[#4299E1] text-white px-4 py-2 rounded-lg hover:bg-[#3182CE] transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Doctor
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-600">{doctor.experience} years experience</p>
              <p className="text-gray-600 mb-4">{doctor.availability}</p>
              <div className="flex justify-end gap-2">
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" onClick={() => handleDeleteDoctor(doctor.id)}>
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;
