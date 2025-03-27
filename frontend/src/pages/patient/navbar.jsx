import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHomeRepairService, MdOutlineMenu } from "react-icons/md";
import { FaClipboardList, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const PatientNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState("");

  // Fetch user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Fetch city name from OpenStreetMap API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data.address) {
          setLocation(data.address.city || data.address.town || "Unknown");
        }
      });
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Hospital</h1>

        {/* Search Bar & Location (Centered) */}
        <div className="flex-grow mx-6 hidden md:flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full text-gray-700">
              <FaSearch />
            </button>
          </div>

          {/* Location Input */}
          <div className="relative flex items-center bg-white px-4 py-2 rounded-full border border-gray-300">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/patient/home" className="hover:text-white flex items-center space-x-2">
            <AiFillHome /> <span>Home</span>
          </Link>
          <Link to="/patient/services" className="hover:text-white flex items-center space-x-2">
            <MdHomeRepairService /> <span>Services</span>
          </Link>
          <Link to="/patient/patients" className="hover:text-white flex items-center space-x-2">
            <FaClipboardList /> <span>Patients</span>
          </Link>
          <Link to="/patient/contactus" className="hover:text-white flex items-center space-x-2">
            <IoChatbubbleEllipsesSharp /> <span>Contact Us</span>
          </Link>
          <Link to="/patient/login" className="bg-yellow-400 text-blue-800 px-4 py-1 rounded-md font-semibold hover:bg-yellow-500">
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-2xl text-white">
          <MdOutlineMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="w-64 bg-white shadow-md p-4">
            <button onClick={() => setMobileMenuOpen(false)} className="text-right text-2xl">&times;</button>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/patient/home" className="hover:text-blue-600">Home</Link>
              <Link to="/patient/services" className="hover:text-blue-600">Services</Link>
              <Link to="/patient/patients" className="hover:text-blue-600">Patients</Link>
              <Link to="/patient/contactus" className="hover:text-blue-600">Contact Us</Link>
              <Link to="/patient/login" className="bg-yellow-400 text-blue-800 px-4 py-1 rounded-md font-semibold hover:bg-yellow-500">
                Login
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default PatientNavbar;
