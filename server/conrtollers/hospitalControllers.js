import HospitalModel from "../models/hostpitalModel.js";
import DoctorModel from "../models/doctorModel.js";

export const createHospital = async (req, res, next) => {
    try {
        const { email, password, name, location, description, img,doctors } = req.body;
        if (!email || !name || !location || !description || !img || !doctors) {
            return res.status(400).json({ success: false, message: "Please provide all details" });
        }
        const hospital = new HospitalModel({
            email,
            password,
            name,
            location,
            description,
            img,doctors
        });
        await hospital.save();
        return res.status(201).json({ success: true, message: "Successfully added hospital", hospital });
    } catch (error) {
        next(error);
    }
};
export const deleteHospital=async(req,res)=>
{
    try {
        
        const {hospitalId}=req.body;
        if(!hospitalId)
        {
            next(new Error("Please prive all details"))
        }
        await HospitalModel.findByIdAndDelete(hospitalId);
        res.json({success:true,message:"hospital deleted successfully"})
    } catch (error) {
        next(error)
    }
}

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
            return res.status(404).json({ success: false, message: "No hospital found with this email" });
        }

        res.status(200).json({ success: true, message: "Updated successfully", hospital });
    } catch (error) {
        next(error);
    }
};

export const showDoctors=async(req,res,next)=>
{
    try {
         const {hospitalId}=req.body;
         if(!hospitalId)
         {
            return res.json({success:false,message:"Please provide Hospital details"})
         }

         const hospital=await HospitalModel.findById(hospitalId);

         if(!hospital)
         {
            return next(new Error("No hospital Found"))
         }
    const doctors=hospital.doctors;
         res.status(200).send({success:true,message:"Dotors fetched successfully",doctors})
    } catch (error) {
        next(error)
    }
}


// export const addDoctor = async (req, res, next) => {
//     try {
//         const { name, email, rating, active, speciality, hospitalId } = req.body;
//         if (!name || !email || !rating || !speciality || !hospitalId) {
//             return res.status(400).json({ success: false, message: "Please provide all details" });
//         }
//         const hospital = await HospitalModel.findById(hospitalId);
//         if (!hospital) {
//             return res.status(404).json({ success: false, message: "Hospital not found" });
//         }
//         const newDoctor = new DoctorModel({
//             name,
//             email,
//             rating,
//             active,
//             speciality,
//             hospital: hospitalId
//         });
//         await newDoctor.save();
//         hospital.doctors.push(newDoctor._id);
//         await hospital.save();
//         res.status(201).json({ success: true, message: "Doctor added successfully", doctor: newDoctor });

//     } catch (error) {
//         next(error);
//     }
// };
// export const deleteDoctor = async (req, res, next) => {
//     try {
//         const { doctorId, hospitalId } = req.body;

//         if (!doctorId || !hospitalId) {
//             return res.status(400).json({ success: false, message: "Doctor ID and Hospital ID are required" });
//         }
//         const hospital = await HospitalModel.findById(hospitalId);
//         if (!hospital) {
//             return res.status(404).json({ success: false, message: "Hospital not found" });
//         }
//         const doctor = await DoctorModel.findById(doctorId);
//         if (!doctor) {
//             return res.status(404).json({ success: false, message: "Doctor not found" });
//         }

//         hospital.doctors = hospital.doctors.filter(id => id.toString() !== doctorId);
//         await hospital.save();
//         // await DoctorModel.findByIdAndDelete(doctorId);
//         res.status(200).json({ success: true, message: "Doctor deleted successfully" });

//     } catch (error) {
//         next(error);
//     }
// };