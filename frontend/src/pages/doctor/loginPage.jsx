import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Logged In:", formData);
    navigate("/doctor/dashboard"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#fbc2eb] to-[#abc1ee] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Doctor Login</h2>
        <p className="text-center text-gray-600">Enter your credentials to access the portal</p>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email Address</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb] focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb] focus:outline-none"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
