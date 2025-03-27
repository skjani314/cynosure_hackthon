import React, { useState } from "react";
import PatientNavbar from "./navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ClipboardList, FileText, MessageSquare, User, Bell } from "lucide-react";

const PatientHome = () => {
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
  const [doctors,setDoctors]=useState();
  const upcomingAppointment = {
    doctor: "Dr. Emma Wilson",
    specialty: "Cardiologist",
    date: "October 15, 2023",
    time: "09:30 AM",
    location: "Central Memorial Hospital, Room 305"
  };

  return (
    <>
      <PatientNavbar />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link 
                  key={index}
                  to={action.link}
                  className="bg-white/90 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="p-2 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Health Stats & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Health Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 bg-white/90 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Health Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Blood Pressure</p>
                    <p className="text-2xl font-bold text-gray-900">120/80</p>
                    <p className="text-xs text-gray-500">Last updated: 3 days ago</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Heart Rate</p>
                    <p className="text-2xl font-bold text-gray-900">72 bpm</p>
                    <p className="text-xs text-gray-500">Last updated: 3 days ago</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 mb-1">Weight</p>
                    <p className="text-2xl font-bold text-gray-900">165 lbs</p>
                    <p className="text-xs text-gray-500">Last updated: 1 week ago</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link 
                    to="/patient/health-tracker"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Complete Health Dashboard →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/90 rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Appointment Reminder</p>
                    <p className="text-xs text-gray-600">Your appointment with Dr. Emma Wilson is tomorrow at 9:30 AM</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                  <div className="border-l-4 border-green-400 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Prescription Refill</p>
                    <p className="text-xs text-gray-600">Your prescription for Lisinopril is ready for pickup</p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                  </div>
                  <div className="border-l-4 border-amber-400 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Lab Results</p>
                    <p className="text-xs text-gray-600">Your recent blood test results are now available</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link 
                    to="/patient/notifications"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All Notifications →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHome;

