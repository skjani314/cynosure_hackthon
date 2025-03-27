import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import HospitalModel from "../models/hostpitalModel.js";
import doctorModel from "../models/doctorModel.js";

const patientMiddleWare=async (res,req,next)=>{


try{


    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(new Error("User Not Found"));
    }
    else{


        const token_decode = await jwt.verify(token, process.env.KEY);
        const { id } = token_decode;
        console.log(token_decode);

        req.id = id;
        let user=null;

        if(role=='patient'){
                 user = await patientModel.findOne({email});
                 console.log(user)
        }else if(role=='doctor'){
          user=await doctorModel.findOne({email});
        }else{
            user =await HospitalModel.findOne({email});
        }
        if (user != null) {
            next();
        }
        else {
            next(new Error("Unauthorized"));
        }

    }



}
catch(err){
    next(err);
}


}