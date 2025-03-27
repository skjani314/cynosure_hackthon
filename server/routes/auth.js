import express from 'express';
import {AuthRegister,AuthLogin,AuthOtp, ForgetPassword, ForgetVerify, passChange} from '../conrtollers/AuthControllers.js';

const AuthRouter = express.Router();


AuthRouter.post('/login',AuthLogin);
AuthRouter.post('/register',AuthRegister);
AuthRouter.post('/send-otp',AuthOtp);
AuthRouter.post('/forget',ForgetPassword);
AuthRouter.post('/forgetverify',ForgetVerify);
AuthRouter.post('/passchange',passChange);


export default AuthRouter;