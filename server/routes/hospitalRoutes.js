import express from 'express';
import { createHospital, deleteHospital, showDoctors, UpdateHospital } from '../conrtollers/hospitalControllers.js';

const Hospitalrouter =express.Router();
Hospitalrouter.post('/create',createHospital);
Hospitalrouter.delete('/delete',deleteHospital);
Hospitalrouter.put('/update',UpdateHospital)
Hospitalrouter.get('/getdoctors',showDoctors)

export default Hospitalrouter;