import React, { useState, useEffect,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHomeRepairService, MdOutlineMenu, MdClose } from "react-icons/md";
import { FaClipboardList, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { Stethoscope, UserCircle, LogOut } from "lucide-react";
import { MdSettingsSuggest } from "react-icons/md";
import { Button, Modal,Flex } from "antd";
import { Input } from 'antd';
import { userContex } from "../../Context/Context";
import axios from "axios";
const { TextArea } = Input;
const PatientNavbar = ({doctors,pincode,setPincode,setSearchResult}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState("Ongole");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
const navigate=useNavigate();
const {symptoms,setSymptoms,callGemini,setSuggestion,suggestion}=useContext(userContex);
const [isModel,setModel]=useState(false);

  // Fetch user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        // Reverse Geocoding API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        if (data.address) {
          setLocation(data.address.city || data.address.town || "Unknown");
          setPincode(data.address.postcode || 523002);
          
        }
        console.log(data);

      });
    }
  }, []);

  // Fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    if (query.length < 2) {
      setLocationSuggestions([]);
      return;
    }
    const response = await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=in`
    );
    const data = await response.json();
    console.log(data);
    setLocationSuggestions(data.map((place) => place.display_name));
  };

  // Fetch search suggestions
  const fetchSearchSuggestions = async (query) => {
    if (query.length < 2) {
      setSearchSuggestions([]);
      return;
    }
    
    setSearchSuggestions(doctors.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())));
  };



const handleSymptomClick=async ()=>{


try{


const form_data=new FormData();
form_data.append('specialist',await callGemini(symptoms));
form_data.append("pincode",pincode);

const url = import.meta.env.VITE_BACKEND_URL + "/hospital/getsymptoms";

const result=await axios.post(url,form_data);
console.log(result);
setSearchResult(prev=>([...result.data.doctors]))
setModel(false);
setSymptoms("");
const geminisuggestion=await callGemini(symptoms)
setSuggestion(geminisuggestion)

console.log(geminisuggestion)

}
catch(err){

console.log(err);

}



}

// useEffect(()=>{



// },[])



  const handleLogout = () => {
    // Clear any session storage or authentication tokens (if applicable)
    localStorage.removeItem("accessToken");

    navigate("/"); // Redirect to hospital login page
  };

  return (
    <>
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#fbc2eb] to-[#a6c1ee] shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-bold text-white">🏥 Hospital</h1>

        {/* Search & Location (Hidden on Small Screens) */}
        <div className="hidden md:flex flex-grow mx-6 items-center space-x-4">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchSearchSuggestions(e.target.value);
              }}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full text-gray-700">
              <FaSearch />
            </button>
            {/* Search Suggestions */}
            {searchSuggestions.length > 0 && (
              <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                {searchSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(suggestion.name);
                      setSearchResult(prev=>([suggestion]));
                      setSearchSuggestions([]);
                    }}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location Input */}
          <div className="relative flex items-center bg-white px-4 py-2 rounded-full border border-gray-300">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                fetchLocationSuggestions(e.target.value);
              }}
              className="outline-none w-full bg-transparent"
            />
            {/* Location Suggestions */}
            {locationSuggestions.length > 0 && (
              <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                {locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setLocation(suggestion);
                      setLocationSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/patient/home" className="hover:text-white flex items-center space-x-2">
            <AiFillHome className="text-lg" /> <span>Home</span>
          </Link>
          <Link to="/patient/services" className="hover:text-white flex items-center space-x-2">
            <MdHomeRepairService className="text-lg" /> <span>Appointments</span>
          </Link>
          <Link to="/patient/contactus" className="hover:text-white flex items-center space-x-2">
            <IoChatbubbleEllipsesSharp className="text-lg" /> <span>Contact</span>
          </Link>
          <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
              <LogOut className="h-6 w-6" />
            </button>
            <button onClick={()=>setModel(true)} className="text-gray-600 hover:text-gray-800">

            <MdSettingsSuggest className="h-6 w-6"/>
            </button>

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
            <button onClick={() => setMobileMenuOpen(false)} className="text-right text-2xl">
              <MdClose />
            </button>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/patient/home" className="flex items-center space-x-2">
                <AiFillHome className="text-lg" /> <span>Home</span>
              </Link>
              <Link to="/patient/services" className="flex items-center space-x-2">
                <MdHomeRepairService className="text-lg" /> <span>Services</span>
              </Link>
              <Link to="/patient/patients" className="flex items-center space-x-2">
                <FaClipboardList className="text-lg" /> <span>Patients</span>
              </Link>
              <Link to="/patient/contactus" className="flex items-center space-x-2">
                <IoChatbubbleEllipsesSharp className="text-lg" /> <span>Contact</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>

    <Modal open={isModel} footer={null} onCancel={()=>setModel(false)}>
      <Flex vertical gap={10} className="mt-3">
      <h1>Enter Symptoms</h1>
      <TextArea placeholder="Enter Your symptoms" value={symptoms} onChange={(e)=>setSymptoms(e.target.value)}/>
        <Flex justify="end">
 <Button type="primary" onClick={handleSymptomClick}>submit</Button>
        </Flex>
      </Flex>
    </Modal>
    </>
  );
};

export default PatientNavbar;
