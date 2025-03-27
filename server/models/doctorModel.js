import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, default: 'rgukt@123' },

  rating: { type: Number, max: 5, min: 1, required: true },
  active:{type:Boolean,default:true},
  speciality: { type: String, required: true },
  img:{type:String,default:"https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg"},
  hospitalId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'hospital',
  }
});

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
