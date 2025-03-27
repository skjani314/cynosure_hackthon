import { useState } from "react";
import { FaUser, FaHospital, FaStethoscope } from "react-icons/fa";

const ProfileUpdate = () => {
  const [role, setRole] = useState("patient");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "", image: "" });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Profile</h2>
        <div className="flex justify-center mb-4">
          {role === "patient" && <FaUser className="text-blue-500 text-4xl" />}
          {role === "doctor" && <FaStethoscope className="text-green-500 text-4xl" />}
          {role === "hospital" && <FaHospital className="text-red-500 text-4xl" />}
        </div>

        <select className="w-full p-2 border rounded mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="hospital">Hospital</option>
        </select>

        <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded mb-2" value={profile.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded mb-2" value={profile.email} onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone" className="w-full p-2 border rounded mb-2" value={profile.phone} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded mb-2" value={profile.address} onChange={handleChange} />
        
        <label className="block text-gray-700 font-medium mb-2">Upload Profile Picture</label>
        <input type="file" className="w-full p-2 border rounded mb-4" onChange={handleImageUpload} />
        {profile.image && <img src={profile.image} alt="Profile Preview" className="w-24 h-24 rounded-full mx-auto mb-4" />}

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">Update Profile</button>
      </div>
    </div>
  );
};

export default ProfileUpdate;
