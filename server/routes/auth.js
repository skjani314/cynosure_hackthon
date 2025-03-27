import express from 'express';
import {AuthRegister,AuthLogin,AuthOtp} from '../conrtollers/AuthControllers.js';

const AuthRouter = express.Router();


AuthRouter.post('/login',AuthLogin);
AuthRouter.post('/register',AuthRegister);
AuthRouter.post('/send-otp',AuthOtp);


export default AuthRouter;