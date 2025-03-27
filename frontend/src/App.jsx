import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DoctorLogin from "./pages/doctor/loginPage.jsx";
import DoctorDashboard from "./pages/doctor/appointments.jsx";
import PatientLogin from "./pages/patient/LoginForm.jsx";
import PatientHome from "./pages/patient/homePage.jsx"
import HospitalNavbar from "./pages/hospital/navbar.jsx";
import HospitalProfile from "./pages/hospital/profile.jsx";
import HospitalForm from "./pages/hospital/hospitalForm.jsx"
import { toast } from "react-toastify";
import HospitalDashboard from "./pages/hospital/dashBoard.jsx";
import HospitalLogin from "./pages/hospital/loginForm.jsx";
import { userContex } from "./Context/Context.jsx";
import axios from "axios";

const App = () => {

  const {user,setUser}=useContext(userContex)



const getUser=async ()=>{


try{
  const token = localStorage.getItem('accessToken');
  const url = import.meta.env.VITE_BACKEND_URL + "/auth/";
if(!token){
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  setUser(response.data);
}
}
catch(err){
console.log(err);
}

}



 useEffect(()=>{


getUser();


 },[]) 
  




  return (
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />

        {/* Doctor Routes */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* Patient Routes */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/home" element={<PatientHome/>}/>

         {/* hospital Routes */}
         <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard/>}/>
        <Route path="/hospital/navbar" element={<HospitalNavbar/>}/>
        <Route path="/hospital/profile" element={<HospitalProfile/>}/>
        <Route path="/hospital/form" element={<HospitalForm/>}/>




        {/* Catch-All Route for 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
  );
};

export default App;
