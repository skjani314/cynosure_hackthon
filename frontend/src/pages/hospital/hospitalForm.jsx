import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const HospitalForm = () => {
  const navigate = useNavigate(); // ✅ Navigation

  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    availability: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Added:", formData);
    navigate("/hospital/dashboard"); // ✅ Redirect back after adding doctor
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add Doctor</h2>
          <button onClick={() => navigate("/hospital/dashboard")} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Doctor's Name" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Specialty" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Years of Experience" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="text" name="availability" value={formData.availability} onChange={handleChange} placeholder="Availability (e.g., Mon-Fri, 9AM-5PM)" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => navigate("/hospital/dashboard")} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Doctor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalForm;
