import mongoose from "mongoose";
import AutoIncrement from 'mongoose-sequence';
const appointmentSchema = new mongoose.Schema({

    pid:{type:mongoose.Schema.Types.ObjectId,ref:"patients",required:true},
    d_id:{type:mongoose.Schema.Types.ObjectId,ref:"doctors",required:true},
    date: { 
        type: Date, 
        default: () => new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }))
    },
        status:{type:String,default:'pending'},
    token:{type:Number,unique:true}
    
});

appointmentSchema.plugin(AutoIncrement(mongoose), { inc_field: "token" });


const appointmentModel = mongoose.model("appointments", appointmentSchema);

export default appointmentModel;
