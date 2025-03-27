import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHomeRepairService, MdOutlineMenu } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const PatientNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] backdrop-blur-md bg-opacity-0 shadow-lg rounded-full text-black z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <h1 className="text-xl font-bold text-black">Hospital</h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/patient/home" className="hover:text-blue-600 flex items-center space-x-2">
            <AiFillHome /> <span>Home</span>
          </Link>
          <Link to="/patient/services" className="hover:text-blue-600 flex items-center space-x-2">
            <MdHomeRepairService /> <span>Services</span>
          </Link>
          <Link to="/patient/patients" className="hover:text-blue-600 flex items-center space-x-2">
            <FaClipboardList /> <span>Patients</span>
          </Link>
          <Link to="/patient/contactus" className="hover:text-blue-600 flex items-center space-x-2">
            <IoChatbubbleEllipsesSharp /> <span>Contact Us</span>
          </Link>
          <Link to="/patient/login" className="bg-yellow-400 text-blue-800 px-4 py-1 rounded-md font-semibold hover:bg-yellow-500">
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-2xl text-black">
          <MdOutlineMenu />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="w-64 bg-white shadow-md p-4 text-black">
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
      </div>
    </header>
  );
};

export default PatientNavbar;
