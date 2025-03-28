
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import PatientNavbar from "./navbar";

import { Link } from "react-router-dom";
import { Calendar, ClipboardList, FileText, MessageSquare, User, Bell } from "lucide-react";

import axios from "axios";
import { userContex } from "../../Context/Context";
import {
  Container,
  Grid,
  Card,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Clock, UserCheck, Users, AlertCircle, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";


  
const services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
 const [appointments,setAppointments]=useState([])
 const {user}=useContext(userContex);


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/appointments/get/?role="+"patient"+"&id="+user._id, {
          params: {  },
        });
  
        console.log("Appointments Data:", response.data);
        setAppointments(response.data); 
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
  
    fetchAppointments();
    // console.log(appointments +"This is the one")
  }, [user]); 
  console.log(user);
  useEffect(() => {
    if (appointments.length > 0 && appointments[0]?.pid) {
      console.log("Updated Appointments:", appointments[0].token);
    } else {
      console.log("No appointments found or invalid data.");
    }
  }, [appointments]); 
  
  const doctor = {
    name: "Dr. Emily Watson",
    profilePic: "https://via.placeholder.com/50", // Replace with actual image
  };

  // const patients = [
  //   { id: 1, token: "A001", name: "John Doe", age: 30, symptoms: "Fever, Headache", profilePic: "https://via.placeholder.com/50" },
  //   { id: 2, token: "A002", name: "Jane Smith", age: 25, symptoms: "Cough, Sore throat", profilePic: "https://via.placeholder.com/50" },
  // ];

  const stats = [
    { icon: <Users size={28} />, label: "In Queue", value: "12" },
    { icon: <UserCheck size={28} />, label: "Seen Today", value: "28" },
    { icon: <Clock size={28} />, label: "Avg. Wait Time", value: "25m" },
    { icon: <AlertCircle size={28} />, label: "Urgent Cases", value: "3" },
  ];

  const handleDecline = (id) => {
    alert(`Declined patient ID: ${id}`);
    setSelectedPatient(null);
  };

  const handleComplete = (id) => {
    alert(`Marked patient ID: ${id} as completed`);
    setSelectedPatient(null);
  };

  const handleLogout = () => {

    navigate("/doctor/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundImage: "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)", py: 5 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        
        {/* Top Navbar with Doctor Profile & Logout */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
           Patients Dashboard
          </Typography>
          
          {/* Doctor Profile Section */}
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>{user.name}</Typography>
            <Avatar src={doctor.profilePic} sx={{ width: 40, height: 40, cursor: "pointer" }} onClick={(e) => setAnchorEl(e.currentTarget)} />
            
            {/* Profile Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={handleLogout}>
                <LogOut size={20} style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Stats Section */}
       

        {/* Patients Table */}
        <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Token</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Doctor Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((patient) => (
                <TableRow key={patient._id} hover>
                  <TableCell>{patient.token}</TableCell>
                  <TableCell>{patient.d_id?.name}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" onClick={() => setSelectedPatient(patient)}>
                      View More
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Patient Details Modal */}
        <Dialog open={!!selectedPatient} onClose={() => setSelectedPatient(null)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Doctor Details
            Doctor Details
            <Button onClick={() => setSelectedPatient(null)}>
              <X size={24} />
            </Button>
          </DialogTitle>
          <DialogContent>
            {selectedPatient && (
              <Box textAlign="center">
                <Avatar src={selectedPatient.pid.img} sx={{ width: 64, height: 64, mx: "auto", mb: 2 }} />
                <Typography variant="h6">{selectedPatient.d_id?.name}</Typography>
                <Typography variant="body1">Email: {selectedPatient.d_id?.email}</Typography>
               
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default services;
