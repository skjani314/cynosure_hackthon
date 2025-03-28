import jwt from "jsonwebtoken";
import patientModel from "../models/patientModel.js";
import HospitalModel from "../models/hostpitalModel.js";
import doctorModel from "../models/doctorModel.js";

const patientMiddleWare=async (req,res,next)=>{


try{
    console.log(req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log(token);
    if (!token) {
        return next(new Error("User Not Found"));
    }
    else{


        const token_decode = await jwt.verify(token, process.env.KEY);
        const { id,role } = token_decode;
        console.log(token_decode);

        req.id = id;
        req.role=role;
        let user=null;

        if(role=='patient'){
                 user = await patientModel.findById(id);
                 console.log(user)
        }else if(role=='doctor'){
          user=await doctorModel.findById(id);
        }else{
            user =await HospitalModel.findById(id);
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

export default patientMiddleWare;