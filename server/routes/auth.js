import express from 'express';
import {AuthRegister,AuthLogin} from '../conrtollers/AuthControllers.js';

const AuthRouter = express.Router();


AuthRouter.post('/login',AuthLogin);
AuthRouter.post('/register',AuthRegister);



export default AuthRouter;