import mongoose from "mongoose";

const hospitalSchema=new mongoose.Schema({
       
       name:{type:String,required:true},
       pincode:{type:String,required:true},
       img:{type:String}
       
})

const HospitalModel =mongoose.model('hospitals',hospitalSchema);

export default HospitalModel;