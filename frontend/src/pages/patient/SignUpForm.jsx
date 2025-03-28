import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PatientSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "",
    pincode: "",
    mobile: "",
    age: "",
    otp: "",
  });

  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Handle OTP Request - Just hides the button & shows the input field
  const handleOtpRequest = async () => {
    setOtpSent(true); // Hide button and show input field
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Form submitted successfully!"); // Temporary success message
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create New Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {!otpSent ? (
            <button
              type="button"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleOtpRequest}
            >
              Send OTP
            </button>
          ) : (
            <input
              type="text"
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <input
            type="text"
            placeholder="Address"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />

          <input
            type="text"
            placeholder="Pincode"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          />

          <input
            type="number"
            placeholder="Age"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-2 text-white font-medium rounded-md bg-blue-600 hover:opacity-90"
            disabled={!otpSent} // Disable sign-up until OTP is entered
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <button className="text-blue-500 hover:text-blue-700" onClick={() => navigate("/patient/login")}>
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientSignUp;
