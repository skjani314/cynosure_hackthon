import React, { useState } from "react";
import PatientNavbar from "./navbar";
import { motion } from "framer-motion";

// Sample appointments data
const initialAppointments = [
  {
    id: 1,
    service: "Cardiology",
    doctor: "Dr. Emma Wilson",
    date: "2023-10-15",
    time: "09:30 AM",
    hospital: "Central Memorial Hospital",
    status: "Upcoming"
  },
  {
    id: 2,
    service: "Dermatology",
    doctor: "Dr. Michael Chen",
    date: "2023-10-10",
    time: "02:15 PM",
    hospital: "Westside Medical Center",
    status: "Completed"
  },
  {
    id: 3,
    service: "Orthopedics",
    doctor: "Dr. Sarah Johnson",
    date: "2023-10-22",
    time: "11:00 AM",
    hospital: "City General Hospital",
    status: "Upcoming"
  }
];

const Patients = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filter, setFilter] = useState("all");
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === "all") return true;
    return appointment.status.toLowerCase() === filter.toLowerCase();
  });

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetails(true);
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setAppointments(appointments.map(appointment => 
        appointment.id === id ? {...appointment, status: "Cancelled"} : appointment
      ));
      setShowAppointmentDetails(false);
    }
  };

  const handleRescheduleAppointment = (id) => {
    // In a real app, this would open a reschedule form
    alert("Reschedule functionality would open a date/time picker here");
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-4">My Appointments</h1>
            <p className="text-lg text-white/80">
              Track and manage your upcoming and past medical appointments
            </p>
          </motion.div>

          {showAppointmentDetails && selectedAppointment ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 rounded-xl shadow-lg overflow-hidden mb-8"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Appointment Details</h2>
                  <button 
                    onClick={() => setShowAppointmentDetails(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-gray-500 text-sm">Service</h3>
                    <p className="text-gray-800 font-medium">{selectedAppointment.service}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Doctor</h3>
                    <p className="text-gray-800 font-medium">{selectedAppointment.doctor}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Date</h3>
                    <p className="text-gray-800 font-medium">{selectedAppointment.date}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Time</h3>
                    <p className="text-gray-800 font-medium">{selectedAppointment.time}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Hospital</h3>
                    <p className="text-gray-800 font-medium">{selectedAppointment.hospital}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 text-sm">Status</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAppointment.status === "Upcoming" ? "bg-green-100 text-green-800" :
                      selectedAppointment.status === "Completed" ? "bg-blue-100 text-blue-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Notes for the doctor</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded">
                    Patient has reported mild discomfort and occasional dizziness. Previous medical history includes hypertension.
                  </p>
                </div>

                {selectedAppointment.status === "Upcoming" && (
                  <div className="flex justify-end space-x-4 mt-6">
                    <button
                      onClick={() => handleCancelAppointment(selectedAppointment.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
                    >
                      Cancel Appointment
                    </button>
                    <button
                      onClick={() => handleRescheduleAppointment(selectedAppointment.id)}
                      className="px-4 py-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white rounded hover:opacity-90"
                    >
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <>
              <div className="bg-white/90 rounded-xl shadow-lg mb-8">
                <div className="p-4 flex flex-wrap items-center justify-between">
                  <div className="flex space-x-2 mb-2 sm:mb-0">
                    <button 
                      onClick={() => setFilter("all")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        filter === "all" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setFilter("upcoming")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        filter === "upcoming" 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Upcoming
                    </button>
                    <button 
                      onClick={() => setFilter("completed")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        filter === "completed" 
                          ? "bg-blue-600 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Completed
                    </button>
                    <button 
                      onClick={() => setFilter("cancelled")}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        filter === "cancelled" 
                          ? "bg-red-600 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="bg-white/90 rounded-xl shadow p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No appointments found</h3>
                  <p className="text-gray-600">
                    {filter === "all" 
                      ? "You don't have any appointments yet." 
                      : `You don't have any ${filter.toLowerCase()} appointments.`}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-white/90 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex flex-wrap justify-between items-start">
                          <div className="mb-4 md:mb-0">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                              appointment.status === "Upcoming" ? "bg-green-100 text-green-800" :
                              appointment.status === "Completed" ? "bg-blue-100 text-blue-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {appointment.status}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800">{appointment.service}</h3>
                            <p className="text-gray-600">{appointment.doctor}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-800 font-medium">{appointment.date}</p>
                            <p className="text-gray-600">{appointment.time}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center">
                          <p className="text-gray-600">{appointment.hospital}</p>
                          <button
                            onClick={() => handleViewDetails(appointment)}
                            className="mt-2 sm:mt-0 px-4 py-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white rounded-lg hover:opacity-90 transition-opacity"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Patients;
