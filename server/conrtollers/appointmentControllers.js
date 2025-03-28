import mongoose, { mongo } from "mongoose";
import appointmentModel from "../models/appointmentModel.js";

const addAppointment=async (req,res,next)=>{
try{
const {pid,d_id}=req.body;
const result=await appointmentModel.create({pid,d_id});
res.json(result);
}
catch(err)
{
    next(err);
}

}


const getAppointments=async (req,res,next)=>{

try{

const {role,id}=req.query;

let data=[];

if(role=='patient'){
    data=await appointmentModel.find({pid:new mongoose.Types.ObjectId(id)}).populate(
        {
            path:"d_id",
        select:"-password",
        populate:{
            path:"hospitalId",
        }}); 
}
else{
    data=await appointmentModel.find({d_id:new mongoose.Types.ObjectId(id)}).populate({
        path:"pid",
        select:"-password",
    });
}

res.json(data);

}
catch(err){
    next(err)

}


}


const updateAppointment =async (req,res,next)=>{


try{

const {id,status}=req.body;

const result=await appointmentModel.findByIdAndUpdate(id,{status},{new:true});

res.json(result);

}
catch(err){
    next(err);
}


}


export {updateAppointment,addAppointment,getAppointments}