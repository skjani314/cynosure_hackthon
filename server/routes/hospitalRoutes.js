import express from 'express';
import { createHospital, deleteHospital } from '../conrtollers/hospitalControllers.js';

const Hospitalrouter =express.Router();
Hospitalrouter.post('/create',createHospital);
Hospitalrouter.delete('/delete',deleteHospital);

export default Hospitalrouter;