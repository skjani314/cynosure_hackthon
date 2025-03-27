import mongoose from 'mongoose';



const hospitalSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,password:'ongole@123'},
    name: { type: String, required: true },
    location: { type: String, required: true },
    description:{type:String,required:true},
    img:{type:String,default:"https://www.google.com/imgres?q=hopital&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fpeople-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fhopital-medical&docid=5HiP0fmUiagalM&tbnid=fJyF3kWw_zVCxM&vet=12ahUKEwiykcKirKqMAxVXwTgGHTrKKr8QM3oECBoQAA..i&w=626&h=392&hcb=2&ved=2ahUKEwiykcKirKqMAxVXwTgGHTrKKr8QM3oECBoQAA"},
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'doctors' }]
});

const HospitalModel = mongoose.model('hospital', hospitalSchema);

export default HospitalModel;
