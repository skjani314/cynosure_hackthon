import mongoose from 'mongoose';



const hospitalSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,password:'ongole@123'},
    name: { type: String, required: true },
    location: { type: String, required: true },
});

const HospitalModel = mongoose.model('hospital', hospitalSchema);

export default HospitalModel;
