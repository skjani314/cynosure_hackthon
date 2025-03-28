import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, UserCircle, Building } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slider images
const slides = [
  {
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2000&q=80",
    title: "Modern Healthcare Solutions",
    subtitle: "Connect with specialists instantly",
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80",
    title: "Virtual Queue System",
    subtitle: "Save time, stay comfortable",
  },
  {
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=2000&q=80",
    title: "Expert Medical Care",
    subtitle: "Quality healthcare at your fingertips",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    accessibility: true,
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
      {/* Website Name - MediQ */}
      <div className="w-full bg-white py-4 flex justify-center shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-blue-900 tracking-wide drop-shadow-lg"
        >
          Medi<span className="text-blue-500">Q</span>
        </motion.h1>
      </div>

      {/* Hero Carousel */}
      <div className="w-full max-w-5xl mx-auto mt-8">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative h-[60vh] flex items-end justify-center text-center text-white pb-12">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
                }}
              ></div>
              <div className="relative px-4">
                <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">{slide.title}</h2>
                <p className="text-lg drop-shadow-lg">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Role-Based Portals */}
      <div className="py-12 px-4 w-full max-w-6xl flex flex-wrap justify-center gap-8">
        {/* Patient Portal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-80 p-8 bg-white border rounded-xl shadow-lg text-center cursor-pointer transform transition hover:-translate-y-2"
        >
          <UserCircle size={48} color="#319795" className="mx-auto" />
          <h3 className="text-2xl font-semibold mt-4 text-gray-800">Patient Portal</h3>
          <p className="text-gray-600 mt-2">Find specialists, book appointments, and join virtual queues.</p>
          <button
            onClick={() => navigate("/patient/signup")} // Updated to go to the signup page
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            Access Patient Portal
          </button>
        </motion.div>

        {/* Doctor Portal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-80 p-8 bg-white border rounded-xl shadow-lg text-center cursor-pointer transform transition hover:-translate-y-2"
        >
          <Stethoscope size={48} color="#F6AD55" className="mx-auto" />
          <h3 className="text-2xl font-semibold mt-4 text-gray-800">Doctor Portal</h3>
          <p className="text-gray-600 mt-2">Manage appointments, view patient queue, and update availability.</p>
          <button
            onClick={() => navigate("/doctor/login")}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
          >
            Access Doctor Portal
          </button>
        </motion.div>

        {/* Hospital Portal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-80 p-8 bg-white border rounded-xl shadow-lg text-center cursor-pointer transform transition hover:-translate-y-2"
        >
          <Building size={48} color="#d97706" className="mx-auto" />
          <h3 className="text-2xl font-semibold mt-4 text-gray-800">Hospital Portal</h3>
          <p className="text-gray-600 mt-2">Manage hospital operations, staff, and reports.</p>
          <button
            onClick={() => navigate("/hospital/login")}
            className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700"
          >
            Access Hospital Portal
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;

