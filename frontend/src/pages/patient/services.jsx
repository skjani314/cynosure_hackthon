import React, { useState } from "react";
import PatientNavbar from "./navbar";
import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    name: "Cardiology",
    description: "Comprehensive heart care services including diagnostics, treatment and preventive care.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    price: "$150-300"
  },
  {
    id: 2,
    name: "Neurology",
    description: "Specialized care for disorders of the nervous system, brain and spinal cord conditions.",
    image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?auto=format&fit=crop&w=600&q=80",
    price: "$200-400"
  },
  {
    id: 3,
    name: "Orthopedics",
    description: "Expert care for bone and joint issues, sports injuries, and rehabilitation services.",
    image: "https://images.unsplash.com/photo-1571772996211-2f02974a9f91?auto=format&fit=crop&w=600&q=80",
    price: "$180-350"
  },
  {
    id: 4,
    name: "Pediatrics",
    description: "Specialized healthcare for children from newborns to adolescents including vaccinations.",
    image: "https://images.unsplash.com/photo-1559206180-4e9483ee7404?auto=format&fit=crop&w=600&q=80",
    price: "$120-250"
  },
  {
    id: 5,
    name: "Dermatology",
    description: "Skin care treatments for various conditions from acne to skin cancer screenings.",
    image: "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?auto=format&fit=crop&w=600&q=80",
    price: "$130-280"
  },
  {
    id: 6,
    name: "Dentistry",
    description: "Complete dental care including preventive, restorative and cosmetic dentistry services.",
    image: "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=600&q=80",
    price: "$100-450"
  }
];

const Services = () => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    symptoms: "",
    preferredDate: "",
    preferredTime: ""
  });

  const handleBookAppointment = (service) => {
    setSelectedService(service);
    setShowAppointmentForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log("Appointment booked:", { service: selectedService, patient: formData });
    
    // Show success message
    alert(`Appointment for ${selectedService.name} service booked successfully!`);
    
    // Reset form
    setFormData({
      name: "",
      age: "",
      email: "",
      phone: "",
      symptoms: "",
      preferredDate: "",
      preferredTime: ""
    });
    setShowAppointmentForm(false);
  };

  const closeForm = () => {
    setShowAppointmentForm(false);
  };

  return (
    <>
      <PatientNavbar />
      <div className="pt-24 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4 pb-16">
        {showAppointmentForm ? (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
                <button 
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              {selectedService && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Selected Service: {selectedService.name}</h3>
                  <p className="text-sm text-blue-600">Estimated cost: {selectedService.price}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      min="0"
                      max="120"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                      placeholder="25"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                    placeholder="Please describe your symptoms or reason for appointment"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                    >
                      <option value="">Select a time</option>
                      <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                      <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                      <option value="Evening (3PM-6PM)">Evening (3PM-6PM)</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white rounded-md hover:opacity-90"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-blue-800 mb-4"
              >
                Our Medical Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-600 max-w-3xl mx-auto"
              >
                Discover our comprehensive range of healthcare services designed to provide you with the best medical care.
              </motion.p>
            </div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {service.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 min-h-[80px]">{service.description}</p>
                    <button
                      onClick={() => handleBookAppointment(service)}
                      className="w-full py-2 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Book Appointment
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Services;
