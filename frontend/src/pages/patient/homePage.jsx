import React, { useContext, useEffect, useState } from "react";
import PatientNavbar from "./navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ClipboardList, FileText, MessageSquare, User, Bell } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { userContex } from "../../Context/Context";


const PatientHome = () => {

  const {user,callGemini,symptoms,suggestion} =useContext(userContex)
const [pincode,setPincode]=useState(523002);


  const quickActions = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "Book Appointment",
      description: "Schedule a consultation with your doctor",
      link: "/patient/appointments/new"
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-green-600" />,
      title: "My Appointments",
      description: "View and manage your scheduled appointments",
      link: "/patient/appointments"
    },
    {
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      title: "Medical Records",
      description: "Access your medical history and test results",
      link: "/patient/records"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-pink-600" />,
      title: "Contact Doctor",
      description: "Send a message to your healthcare provider",
      link: "/patient/messages"
    }
  ];
const [search_result,setSearchResult]=useState([]);
  const [doctors,setDoctors]=useState([]);

  const getDoctors=async()=>{
    try {
      const response=await axios.post('http://localhost:3000/hospital/get-by-location',{
        "pincode":pincode
    })
    setDoctors(response.data.doctors);
    } catch (error) {
      toast.error(error);
    }
  }
const bookApointment=async(d_id)=>
{
  try {
    const response=await axios.post('http://localhost:3000/appointments/add',{pid:user._id,d_id})
    toast.success("Booked Appointment successfully ")
    
    console.log(response+"booked data")
    // console.log(user)
  } catch (error) {
    toast.error(error)
    console.log(error)
  }
}
  useEffect(()=>
  {
       getDoctors();
      
       
       
       
  },[pincode]);
console.log(search_result);
 
  const upcomingAppointment = {
    doctor: "Dr. Emma Wilson",
    specialty: "Cardiologist",
    date: "October 15, 2023",
    time: "09:30 AM",
    location: "Central Memorial Hospital, Room 305"
  };

  return (
    <>
      <PatientNavbar doctors={doctors} pincode={pincode} setPincode={setPincode} setSearchResult={setSearchResult} />
      <div className="pt-24 min-h-screen px-4 pb-16" style={{ backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, John</h1>
            <p className="text-white/80 mb-8">Here's an overview of your health information</p>
          </motion.div>

{search_result.length>0?
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">Search Result</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {search_result.map((action, index) => (
                <Link 
                  key={action._id}
                  to={action.link}
                  className="bg-white/90 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="p-2 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <img src={action.img} alt="" className="rounded-full" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{action.name}</h3>
                  <p className="text-gray-600 text-sm">{action.speciality}</p>
                  
                  <div>
                    {[...Array(action.rating)].map((_, index) => (
                      <span key={index}>⭐</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>:<div className="w-fill items-center bg-white py-3 px-3 rounded-2xl mb-2.5">

{
  suggestion!=""?` Based on symptoms, we suggest you consult ${suggestion}. However, we can't find one near you.`:'without symptoms or location we cant give suggestions'
}



</div>

            }

          {/* Next Appointment Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/90 rounded-xl shadow-md overflow-hidden mb-8"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Your Next Appointment</h2>
                <Link 
                  to="/patient/appointments"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="font-medium text-gray-900">{upcomingAppointment.doctor}</p>
                  <p className="text-gray-600">{upcomingAppointment.specialty}</p>
                  <div className="mt-2">
                    <p className="text-gray-700">{upcomingAppointment.date} at {upcomingAppointment.time}</p>
                    <p className="text-gray-600 text-sm">{upcomingAppointment.location}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white rounded-lg hover:opacity-90 transition-opacity">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">Recomended Doctors</h2>

             {search_result.length>0?<>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             
              {doctors.map((action, index) => (
                <Link 
                  key={action._id}
                  to={action.link}
                  className="bg-white/90 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="p-2 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <img src={action.img} alt="" className="rounded-full " />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{action.name}</h3>
                  <p className="text-gray-600 text-sm">{action.speciality}</p>
                  
                  <div>
                    {[...Array(action.rating)].map((_, index) => (
                      <span key={index}>⭐</span>
                      
                    ))}
                  </div>
                  <button className="w-full bg-amber-200 px-5 py-3 items-center justify-center mt-9 hover:cursor-pointer" onClick={()=>{bookApointment(action.id)}}>Book Appointment</button>
                </Link>
              ))}
            </div></>:<>
              
            </>}
          </motion.div>

          {/* Health Stats & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHome;

