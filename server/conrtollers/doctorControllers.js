import doctorModel from "../models/doctorModel";
import patientModel from "../models/patientModel";


export const viewAppointments=async(req,res,next)=>
{
      try {
           const {email,password}=req.body;
           if(!email || !password)
           {
            res.json({success:false,message:"Please provide email and passowrd"})
           }
           const user=await doctorModel.findOne({email});
           if(!user)
           {
              res.json({success:false,message:"No crediential are available"});
           }
           const patients=await patientModel.find({doctoId})
           res.status(200).json({success:true,message:"Doctor Added Sucessfullly"})
      } catch (error) {
        next(error)
      }
}

