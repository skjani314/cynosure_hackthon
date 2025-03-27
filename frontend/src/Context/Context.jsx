import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const userContex=createContext()

const ContextProvide = ({children}) => {

    const [query,setQuery]=useState();
    const [response,setResponse]=useState();
    const [user,setUser]=useState(null);
    const data={
        query,
        setQuery,
        response,
        setResponse,
        user,
        setUser

    }

    const callGemini=async()=>
    {
      const response=await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDU1Wf6kwfYMx6DxmpevBummzXXLYdqClU',{
        
          "contents": [{
              "parts":[{"text": "Chest pain or discomfort, shortness of breath, pain in arms/jaw/neck/back, cold sweat, nausea, dizziness, unusual fatigue, indigestion-like discomfort. these are my symtoms tell me which specilist i sholud consider just give me name a single word"}]
              }]
          
      })
     
      console.log(response['data']['candidates'][0]['content']['parts'][0]['text'])
    }

    callGemini()
  return (

    <userContex.Provider value={data}>
         {children}
    </userContex.Provider>
   
  )
}

export default ContextProvide