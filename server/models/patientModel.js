import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  mobile:{type:String,required:true},
  img:{type:String,default:"https://www.google.com/imgres?q=user&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F439%2F863%2Fnon_2x%2Fvector-users-icon.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-icon&docid=E3VnjqP3ez2tMM&tbnid=7249SWrC3zpm3M&vet=12ahUKEwjAo7a7_qmMAxUesVYBHay2NO4QM3oECBYQAA..i&w=490&h=490&hcb=2&ved=2ahUKEwjAo7a7_qmMAxUesVYBHay2NO4QM3oECBYQAA"},
  
});

const doctorModel = mongoose.model("patients", doctorSchema);

export default doctorModel;
