import express from 'express';
import {AuthRegister,AuthLogin,AuthOtp, ForgetPassword, ForgetVerify, passChange, getUser} from '../conrtollers/AuthControllers.js';
import patientMiddleWare from '../middlewares/patientMiddleWare.js';

const AuthRouter = express.Router();

AuthRouter.post('/login',AuthLogin);
AuthRouter.post('/register',AuthRegister);
AuthRouter.post('/send-otp',AuthOtp);
AuthRouter.post('/forget',ForgetPassword);
AuthRouter.post('/forgetverify',ForgetVerify);
AuthRouter.post('/passchange',passChange);
AuthRouter.get('/',patientMiddleWare,getUser);


export default AuthRouter;