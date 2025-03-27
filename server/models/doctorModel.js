import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true,default:'rgukt@123'},
  rating: { type: Number, max: 5, min: 1, required: true },
  active:{type:Boolean,default:true},
  specility:{type:String,required:true},
  img:{type:String,default:"https://www.google.com/imgres?q=doctor&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fmale-doctor-smiling-happy-face-600nw-2481032615.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdoctor-character&docid=0gRqjQaWOKSHuM&tbnid=BTIkBfkQ9CwtCM&vet=12ahUKEwiewcv4-qmMAxUZslYBHU9wH3QQM3oECBkQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwiewcv4-qmMAxUZslYBHU9wH3QQM3oECBkQAA"},
  hospitalId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'hospitals'
  }
});

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
