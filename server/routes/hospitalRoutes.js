import express from 'express';
import { addDoctor, createHospital, deleteHospital, showDoctors, UpdateDoctorStatus, UpdateHospital } from '../conrtollers/hospitalControllers.js';

const Hospitalrouter =express.Router();
Hospitalrouter.post('/create',createHospital);
Hospitalrouter.delete('/delete',deleteHospital);
Hospitalrouter.put('/update',UpdateHospital)
Hospitalrouter.get('/getdoctors',showDoctors)
Hospitalrouter.post('/add-doctor',addDoctor);
Hospitalrouter.put('/update-isavailable',UpdateDoctorStatus)

export default Hospitalrouter;