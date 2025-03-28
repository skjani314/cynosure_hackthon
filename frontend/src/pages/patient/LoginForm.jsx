import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patient/login", formData);
      alert("Login successful!");
      localStorage.setItem("patientToken", response.data.token); // Save token for authentication
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-medium rounded-md bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <div className="text-center">
          <button className="text-[#a6c1ee] hover:text-[#fbc2eb]" onClick={() => navigate("/patient/signup")}>
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
