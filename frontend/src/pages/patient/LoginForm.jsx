import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    pincode:"",
    address:"",
    mobile:"",
    age:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if(isLogin){
      const url = import.meta.env.VITE_BACKEND_URL + "/auth/login";
    console.log(formData);
    const form_data=new FormData();
    form_data.append("email",formData.email);
    form_data.append("password",formData.password);
    form_data.append("role","patient");
    
      const response = await axios.post(url,form_data);
      localStorage.setItem("accessToken", response.data);
      setUser(response.data);
      setFormData({
        email: "",
        password: "",
      })
      navigate("/patient/home"); 
    }
    else{

      const url = import.meta.env.VITE_BACKEND_URL + "/auth/register";
      console.log(formData);
      const form_data=new FormData();
      form_data.append("email",formData.email);
      form_data.append("password",formData.password);
      form_data.append("address",formData.address);
      form_data.append("pincode",formData.pincode);
      form_data.append("")
      
        const response = await axios.post(url,form_data);
        localStorage.setItem("accessToken", response.data);
        setUser(response.data);
        setFormData({
          email: "",
          password: "",
        })
        navigate("/patient/home"); 
      




    }
    }catch(err){
    
      console.error(err);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? "Sign in to your account" : "Create new account"}
        </h2>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}

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
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>

        <div className="text-center">
          <button className="text-[#a6c1ee] hover:text-[#fbc2eb]" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin;
