import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { userContex } from "../../Context/Context";

const PatientLogin = () => {
  const navigate = useNavigate();
  const {user,setUser}=useContext(userContex);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_BACKEND_URL + "/auth/login";
      console.log(formData);
      const form_data=new FormData();
      form_data.append("email",formData.email);
      form_data.append("password",formData.password);
      form_data.append("role","patient");
      
        const response = await axios.post(url,form_data);
        console.log(response);
        localStorage.setItem("accessToken", response.data);
        const url2 = import.meta.env.VITE_BACKEND_URL + "/auth/";
        const result=await axios.get(url2, {
          headers: {
            Authorization: `Bearer ${response.data}`,
            "Content-Type": "application/json",
          },
        });
        setUser(result.data);      
        console.log(result.data);
        setFormData({ 
          email: "",
          password: "",
        })
        // toast.success("logged in successfully");
        navigate("/patient/home"); 
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.log(err);
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
