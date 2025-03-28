import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const userContex=createContext()

const ContextProvide = ({children}) => {

const [symptoms,setSymptoms]=useState("");
    const [response,setResponse]=useState();
    const [user,setUser]=useState(null);
    const [suggestion,setSuggestion]=useState("")

    const callGemini=async(query)=>
      {
        const response=await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDU1Wf6kwfYMx6DxmpevBummzXXLYdqClU',{
          
            "contents": [{
                "parts":[{"text": query+". these are my symtoms tell me which specilist i sholud consider just give me name a single word"}]
                }]
            
        })
       
        return response['data']['candidates'][0]['content']['parts'][0]['text']
      }


    const data={
        symptoms,
        setSymptoms,
        response,
        setResponse,
        user,
        setUser,
        callGemini,
        suggestion,
        setSuggestion

    }

  

  return (

    <userContex.Provider value={data}>
         {children}
    </userContex.Provider>
   
  )
}

export default ContextProvide