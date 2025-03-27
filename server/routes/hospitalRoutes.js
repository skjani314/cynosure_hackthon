import express from 'express';
import { createHospital } from '../conrtollers/hospitalControllers';

const router =express.Router();
router.post('/',createHospital);