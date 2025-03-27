import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";



import DoctorLogin from "./pages/doctor/loginPage.jsx";
import DoctorDashboard from "./pages/doctor/appointments.jsx";


import PatientLogin from "./pages/patient/LoginForm.jsx";
import PatientSignUp from "./pages/patient/SignUpForm.jsx";
import PatientNavbar from "./pages/patient/navbar.jsx";
import PatientHome from "./pages/patient/homePage.jsx";
import PatientServices from "./pages/patient/services.jsx";
import PatientPatients from "./pages/patient/patients.jsx";
import PatientContactUs from "./pages/patient/contactUs.jsx";





import HospitalNavbar from "./pages/hospital/navbar.jsx";
import HospitalProfile from "./pages/hospital/profile.jsx";
import HospitalForm from "./pages/hospital/hospitalForm.jsx"
import HospitalDashboard from "./pages/hospital/dashBoard.jsx";
import HospitalLogin from "./pages/hospital/loginForm.jsx";
import axios from "axios";
import { userContex } from "./Context/Context.jsx";

const App = () => {

const {user,setUser}=useContext(userContex);

const getUser=async ()=>{



try{

  const url = import.meta.env.VITE_BACKEND_URL + "/auth/";
  const token = localStorage.getItem('accessToken');
console.log(token);
const result=await axios.get(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
setUser(result.data);
console.log(result);
}
catch(err){
  console.log(err);
}



}

useEffect(()=>{


try{

  getUser();
}
catch(err){
  console.log(err);
}

},[]);



  return (

    <>
      <Routes>
        {/* Public Route */}
   
        <Route path="/" element={<HomePage />} />

        {/* Doctor Routes */}
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* Patient Routes */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/home" element={<PatientHome/>}/>
        <Route path="/patient/signup" element={<PatientSignUp/>}/>
        <Route path="/patient/navbar" element={<PatientNavbar/>}/>
        <Route path="/patient/services" element={<PatientServices/>}/>
        <Route path="/patient/patients" element={<PatientPatients/>}/>
        <Route path="/patient/contactus" element={<PatientContactUs/>}/>


         {/* hospital Routes */}
         <Route path="/hospital/login" element={<HospitalLogin />} />
        <Route path="/hospital/dashboard" element={<HospitalDashboard/>}/>
        <Route path="/hospital/navbar" element={<HospitalNavbar/>}/>
        <Route path="/hospital/profile" element={<HospitalProfile/>}/>
        <Route path="/hospital/form" element={<HospitalForm/>}/>
        




        {/* Catch-All Route for 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      </>
  );
};

export default App;
