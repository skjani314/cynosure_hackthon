import React, { useState } from "react";
import { Stethoscope, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HospitalProfile from "./profile";

const HospitalNavbar = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  // Logout Function
  const handleLogout = () => {
    // Clear any session storage or authentication tokens (if applicable)
    navigate("/hospital/login"); // Redirect to hospital login page
  };

  return (
    <>
      <nav className="sticky top-0 bg-white/85 backdrop-blur-lg shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Stethoscope className="h-8 w-8 text-[#319795]" />
            <span className="text-2xl font-semibold text-gray-800">MediQ</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-gray-600 hover:text-gray-800">
              Home
            </button>

            {/* Profile & Logout */}
            <button onClick={() => setShowProfile(true)} className="text-gray-600 hover:text-gray-800">
              <UserCircle className="h-6 w-6" />
            </button>
            <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Show Profile Modal when clicked */}
      {showProfile && <HospitalProfile onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default HospitalNavbar;
