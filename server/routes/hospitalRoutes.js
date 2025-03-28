import express from 'express';
import { addDoctor, createHospital, deleteHospital, getDoctorByLocation, getDoctorBySymptoms, showDoctors, UpdateDoctorStatus, UpdateHospital } from '../conrtollers/hospitalControllers.js';
import patientMiddleWare from '../middlewares/patientMiddleWare.js';


const Hospitalrouter =express.Router();
Hospitalrouter.post('/create',createHospital);
Hospitalrouter.delete('/delete',deleteHospital);
Hospitalrouter.put('/update',UpdateHospital)
Hospitalrouter.get('/getdoctors',patientMiddleWare,showDoctors)
Hospitalrouter.post('/add-doctor',addDoctor);
Hospitalrouter.put('/update-isavailable',UpdateDoctorStatus)
Hospitalrouter.post('/get-by-location',getDoctorByLocation)
Hospitalrouter.post('/getsymptoms',getDoctorBySymptoms);

export default Hospitalrouter;