import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import toast from "react-hot-toast";
import HospitalNavbar from "./navbar";
import axios from "axios";
import DoctorCard from "../doctor/DoctorCard.jsx";

function HospitalDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      experience: 12,
      availability: "Mon-Fri, 9AM-5PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Dr. James Chen",
      specialty: "Neurologist",
      experience: 15,
      availability: "Tue-Sat, 10AM-6PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ]);



const getDoctors=async ()=>{


  try{

    const url = import.meta.env.VITE_BACKEND_URL + "/hospital/getdoctors";
    const token = localStorage.getItem('accessToken');

const data=await axios.get(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
})
console.log(data.data.doctors)
setDoctors(data.data.doctors);
  }
  catch(err){
    console.log(err);
  }


}




  useEffect(()=>{

getDoctors()
  },[])




  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    toast.success("Doctor removed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HospitalNavbar />

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Our Doctors</h2>
          
        
          <button
            onClick={() => navigate("/hospital/form")} 
            className="flex items-center gap-2 bg-[#4299E1] text-white px-4 py-2 rounded-lg hover:bg-[#3182CE] transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Doctor
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor,index) => (

            <DoctorCard doctor={doctor} key={index} />

          ))}
        </div>
      </div>
    </div>
  );
}

export default HospitalDashboard;
