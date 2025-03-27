import express from 'express';
import { addAppointment, getAppointments, updateAppointment } from '../conrtollers/appointmentControllers.js';


const appointmentRouter = express.Router();

appointmentRouter.post('/add',addAppointment);
appointmentRouter.get('/',getAppointments);
appointmentRouter.put('/update',updateAppointment);

export default appointmentRouter;