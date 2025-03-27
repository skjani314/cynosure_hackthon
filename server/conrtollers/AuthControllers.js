import Otp from "../models/Otp.js";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import patientModel from "../models/patientModel.js";
import doctorModel from "../models/doctorModel.js";
import HospitalModel from "../models/hostpitalModel.js";


const AuthLogin=async (req,res,next)=>{


    try {
        const { email, password,role } = req.body;
let user=null;

if(role=='patient'){
         user = await patientModel.findOne({email});
}else if(role=='doctor'){
  user=await doctorModel.findOne({email});
}else{
    user =await HospitalModel.findOne({email});
    console.log(email);
    console.log(user);

}

        if (!user) {
            next(new Error("User Not Found"));
        }
        else {

            const isMatch = await bcrypt.compare(password, user.password);
         console.log(password);
         console.log(user.password);
            if (isMatch) {
                const accessToken = jwt.sign({ id: user._id, role}, process.env.KEY, { expiresIn: '7d' });


                return res.status(200).json(accessToken);
            } else {
                return res.status(401).json({ message: "Password incorrect" });
            }
        }
    } catch (error) {
        next(error);
    }


}

const AuthRegister=async (req,res,next)=>{
try{

const {email,password,name,address,pincode,mobile,otp,age}=req.body;
console.log(req.body);


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
    
    
    const ForgetPassword = async (req, res, next) => {

        try {
    
            const { email,role } = req.body;
            
            let user=null;

            if(role=='patient'){
                     user = await patientModel.findOne({ email });
            }else if(role=='doctor'){
              user=await doctorModel.findOne({email});
            }else{
                user =await HospitalModel.findOne({email});
            }
            if (!user) {
                next(new Error("User Not Found"));
            } else {
    
    
                const token = jwt.sign({ email,role }, process.env.KEY, { expiresIn: '5m' });
    
    
    
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
                    subject: 'Forget Password',
                    html: `<html>
                        <body>
                          <h1>Hello,</h1>
                          <p>Your Reset link is:<br></br> <strong>${process.env.FRONTENDURL + '/forgot/' + token}</strong></p>
                          <p>Thank you!</p>
                        </body>
                      </html>`,
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
    
                res.json(token);
    
            }
        } catch (err) {
    
            next(err);
    
        }
    
    
    }


    const ForgetVerify = async (req, res, next) => {


        try {
    
            const token = req.body.token;
            await jwt.verify(token, process.env.KEY, (err, decode) => {
    
                if (err) {
                    next(err);
                } else {
                    res.json({ verified: true });
    
                }
    
            })
        } catch (err) {
    
            next(err);
    
        }
    
    }

    
    const passChange = async (req, res, next) => {

        const { token } = req.body;
        const pass = req.body.password;
    
        try {
    
            await jwt.verify(token, process.env.KEY, async (err, decode) => {
    
                if (err) {
                    next(err)
                } else {
    
                    const email = decode.email;
                    const role =decode.role;
                    const hashpassword = await bcrypt.hash(pass, 10);
                    console.log(hashpassword)
                   let user=null;
                    if(role=='patient'){
                        user = await patientModel.findOneAndUpdate({ email }, { password: hashpassword }, { new: true, runValidators: true });
               }else if(role=='doctor'){
                 user=await doctorModel.findOneAndUpdate({ email }, { password: hashpassword }, { new: true, runValidators: true });
               }else{
                   user =await HospitalModel.findOneAndUpdate({ email }, { password: hashpassword }, { new: true, runValidators: true });
               }
                    res.status(200).json("Password changed");
    
                }
    
    
            })
        } catch (err) {
            next(err);
        }
    
    }



const getUser=async (req,res,next)=>{



try{

   const {role,id}=req.query; 
    let user=null;

    if(role=='patient'){
             user = await patientModel.findById(id).select("-password");
             console.log(user)
    }else if(role=='doctor'){
      user=await doctorModel.findById(id).select("-password");
    }else{
        user =await HospitalModel.findById(id).select("-password");
    }
res.json(user);

}
catch(err){
    next(err);
}

}



export {AuthLogin,AuthRegister,AuthOtp,ForgetPassword,ForgetVerify,passChange,getUser};