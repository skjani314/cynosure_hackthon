import HospitalModel from "../models/hostpitalModel.js";
import DoctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';

export const createHospital = async (req, res, next) => {
  try {
    const { email, password, name, location, description } =
      req.body;
      console.log(req.body);
    if (!email || !name || !location || !description || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all details" });
    }
                const hashpassword = await bcrypt.hash(password, 10);
    const hospital = new HospitalModel({
      email,
      password:hashpassword,
      name,
      location,
      description,

    });
    await hospital.save();
    return res
      .status(201)
      .json({
        success: true,
        message: "Successfully added hospital",
        hospital,
      });
  } catch (error) {
    next(error);
  }
};
export const deleteHospital = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    if (!hospitalId) {
      next(new Error("Please prive all details"));
    }
    await HospitalModel.findByIdAndDelete(hospitalId);
    res.json({ success: true, message: "hospital deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const UpdateHospital = async (req, res, next) => {
  try {
    const { email, description, img } = req.body;

    if (!email) {
      return next(new Error("Please provide the hospital's email"));
    }

    const hospital = await HospitalModel.findOneAndUpdate(
      { email },
      { description, img },
      { new: true }
    );

    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "No hospital found with this email" });
    }

    res
      .status(200)
      .json({ success: true, message: "Updated successfully", hospital });
  } catch (error) {
    next(error);
  }
};

export const showDoctors = async (req, res, next) => {
  try {
    const hospitalId = req.id;
    if (!hospitalId) {
      return res.json({
        success: false,
        message: "Please provide Hospital details",
      });
    }

    const hospital = await HospitalModel.findById(hospitalId);

    if (!hospital) {
      return next(new Error("No hospitals Found"));
    }
    const doctors = await DoctorModel.find({ hospitalId });
    res
      .status(200)
      .send({ success: true, message: "Dotors fetched successfully", doctors });
  } catch (error) {
    next(error);
  }
};

// for adding Doctors

export const addDoctor = async (req, res, next) => {
  try {
    const { name, email, rating, active, speciality, hospitalId,pincode } = req.body;
    if (!name || !email || !rating || !speciality || !hospitalId || !pincode) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all details" });
    }
    const hospital = await HospitalModel.findById(hospitalId);
    if (!hospital) {
      return res
        .status(404)
        .json({ success: false, message: "Hospital not found" });
    }
                const hashpassword = await bcrypt.hash("rgukt@123", 10);
  
    const newDoctor = new DoctorModel({
      name,
      email,
      rating,
      active,
      speciality,
      hospitalId,
      password:hashpassword,
      pincode
    });

    await newDoctor.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Doctor added successfully",
        doctor: newDoctor,
      });
  } catch (error) {
    next(error);
  }
};

//for updating status
export const UpdateDoctorStatus = async (req, res, next) => {
  try {
    const { doctorId, active } = req.body;
    if (!doctorId) {
      return next(new Error("Please provide doctorId"));
    }
    const newDoctor = await DoctorModel.findByIdAndUpdate(doctorId,
      {active},
      { new: true }
    );

    return res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    next(error);
  }
};

//Get Doctor By Location

export const getDoctorByLocation=async(req,res,next)=>
{
      try {
        const {pincode}=req.body;
        const doctors=await DoctorModel.find({pincode});
        if(!doctors)
        {
          next(new Error("Doctors not found in the Location"))
        }

        res.json({success:true,message:"Doctors fetched Successfully",doctors})
        

      } catch (error) {
        next(error)
      }
}

export const getDoctorBySymptoms=async (req,res,next)=>{


  try {
    const {pincode,specialist}=req.body;
    console.log(req.body);
    const doctors=await DoctorModel.find({pincode,speciality:specialist});
    if(!doctors)
    {
      next(new Error("Doctors not found in the Location"))
    }

    res.json({success:true,message:"Doctors fetched Successfully",doctors})
    

  } catch (error) {
    next(error)
  }

}