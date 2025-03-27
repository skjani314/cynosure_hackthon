import doctorModel from "../models/doctorModel";
import patientModel from "../models/patientModel";

export const viewAppointments=async(req,res)=>
{
      try {
           const {email,password}=req.body;
           if(!email || !password)
           {
            res.send({success:false,message:"Please provide email and passowrd"})
           }
           const user=await doctorModel.findOne({email});
           if(!user)
           {
              res.send({success:false,message:"No crediential are available"});
           }
           const patients=await patientModel.find({doctoId})
      } catch (error) {
        res.send({success:false,message:"unable to see Appoinments"})
        console.log("error at viewappointmants");
      }
}