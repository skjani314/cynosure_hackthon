import { Plus, Pencil, Trash2 } from "lucide-react";
import {Rate} from 'antd';
import { FaEdit } from "react-icons/fa";

const DoctorCard= ({doctor,index})=>{

console.log(doctor)


const handleEditDoctor=async ()=>{


try{




    

}
catch(err){
    console.log(err);
}



}


return(
<>
<div  className="bg-white/90 backdrop-blur-lg rounded-xl p-6 shadow-lg">
              <img
                src={doctor.img}
                alt={doctor.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.email}</p>
              <p className="text-gray-600">{doctor.speciality}</p>
              <p className="text-gray-600">{doctor.pincode}</p>

              <p className="text-gray-600 mb-4">{doctor.active?"Available":"Not Avaialble"}</p>
                <Rate  allowClear value={doctor.rating}/>
              <div className="flex justify-end gap-2">
                <button className="p-2 text-black-200 hover:bg-red-50 rounded-lg" onClick={() => handleEditDoctor(doctor.id)}>
                  <FaEdit className="h-5 w-5" />
                </button>
              </div>
            </div>
</>
);



}

export default DoctorCard;