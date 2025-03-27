import Otp from "../models/Otp.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import patientModel from "../models/patientModel.js";


const AuthLogin=async (req,res,next)=>{


}

const AuthRegister=async (req,res,next)=>{
try{

const {email,password,name,addresss,pincode,mobile,otp,age}=req.body;
console.log(req.body);
if(!email || !password || !name || !addresss || !pincode || !mobile || !otp || !age){
  return  next(new Error("fill all required fields"));
}
else{

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
        next(new Error('invalid Otp'));
    }
    else{
        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
        if (!isOtpValid) {
            next(new Error('invalid OTP'));
        }else{
            await Otp.deleteOne({ email });

            const hashpassword = await bcrypt.hash(password, 10);
            const result =await patientModel.create({age,email,password:hashpassword,name,mobile,pincode,address});

            res.json(result);

        }

    }


}

}
catch(err){
    next(err);
}



}

const AuthOtp=async (req, res, next) => {

        const { email } = req.body;
        if(!email){
            return next(new Error("no email found"))
        }
    
        try {
    
            const user = await patientModel.findOne({ email });
            if (user) {
                next(new Error('user already found'));
            } else {
                const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
    
                const otp = generateOtp();
    
                const hashedOtp = await bcrypt.hash(otp, 10);
    
                const oldRecord = await Otp.findOne({ email });
                if (!oldRecord) {
                    const newOtp = await Otp.create({ email, otp: hashedOtp });
                } else {
                    await Otp.deleteOne({ email });
                    const newOtp = await Otp.create({ email, otp: hashedOtp });
                }
    
    
    
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'skilllinkforget@gmail.com',
                        pass: process.env.EMAILPASSWORD
                    }
                });
    
                const mailOptions = {
                    from: 'skilllinkforget@gmail.com',
                    to: email,
                    subject: 'OTP Verification',
                    html: `<html>
                        <body>
                          <h1>Hello,</h1>
                          <p>Your OTP code is: <strong>${otp}</strong></p>
                          <p>Thank you!</p>
                        </body>
                      </html>`
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
    
    
                res.status(200).json('email sent')
    
            }
        } catch (error) {
            next(error);
        }
    }
    
    






export {AuthLogin,AuthRegister,AuthOtp};