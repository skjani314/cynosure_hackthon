import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import axios from "axios";
import { userContex } from "../../Context/Context";

const HospitalForm = () => {
  const navigate = useNavigate(); // ✅ Navigation
const {user}=useContext(userContex);
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    speciality: "",
    rating:"",
    pincode:""

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async  (e) => {
    e.preventDefault();

    const form_data=new FormData();
    form_data.append("email",formData.email);
    form_data.append("rating",formData.rating);
    form_data.append("speciality",formData.speciality);
    form_data.append("name",formData.name);
    form_data.append("hospitalId",user._id);
    form_data.append("pincode",formData.pincode);

    const url = import.meta.env.VITE_BACKEND_URL + "/hospital/add-doctor";
    const accessToken = localStorage.getItem('accessToken');

    const result = await axios.post(url, form_data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });
    console.log(result); 

    console.log("Doctor Added:", formData);



    navigate("/hospital/dashboard"); 
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
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} placeholder="Speciality" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300" />

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
