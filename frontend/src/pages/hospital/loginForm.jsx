import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContex } from "../../Context/Context";
import { toast } from "react-toastify";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const {user,setUser}=useContext(userContex);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async  (e) => {
    e.preventDefault();
try{

  const url = import.meta.env.VITE_BACKEND_URL + "/auth/login";

const form_data=new FormData();
form_data.append("email",formData.email);
form_data.append("password",form_data.password);
form_data.append("role","hospital");

  const response = await axios.post(url,form_data);
  localStorage.setItem("accessToken", response.data);


 const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });
  setUser(result.data);
  setFormData({
    email: "",
    password: "",
  })
  toast.success("logged in successfully");
  navigate("/hospital/dashboard"); 

}catch(err){

  console.group(err);
  toast.error("something went wrong");
}

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
      }}
    >
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Hospital Portal Login
        </h2>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white font-medium rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalLogin;
