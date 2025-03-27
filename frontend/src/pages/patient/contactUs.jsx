import React, { useState } from "react";
import PatientNavbar from "./navbar";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    
    // In a real app, you would send this data to your backend
    
    // Show success message
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 3000);
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
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help. 
              Fill out the form below and our team will get back to you as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/90 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                
                {isSubmitted ? (
                  <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
                    <p className="font-medium">Thank you for contacting us!</p>
                    <p>We've received your message and will respond shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-[#fbc2eb] focus:border-[#fbc2eb]"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Location</h3>
                    <p className="text-gray-600">
                      123 Healthcare Avenue<br />
                      Medical District, City 12345<br />
                      Country
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Details</h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Email:</span> contact@mediq.com
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Phone:</span> +1 (555) 123-4567
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Fax:</span> +1 (555) 987-6543
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Hours</h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Monday - Friday:</span> 8:00 AM - 8:00 PM
                    </p>
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Saturday:</span> 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Sunday:</span> Closed (Emergency Services Available)
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Emergency Contact</h3>
                    <p className="text-gray-600">
                      For medical emergencies, please call our 24/7 emergency hotline:
                      <br />
                      <span className="text-red-600 font-bold">+1 (555) 911-0000</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-white/90 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us</h2>
              <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">
                  {/* In a real app, a Google Maps iframe would go here */}
                  Interactive Map Would Be Displayed Here
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
