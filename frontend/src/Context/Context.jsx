import React, { createContext, useState } from 'react'
import { useContext } from 'react'
import axios from 'axios'
export const userContex=createContext()

const ContextProvide = ({children}) => {

    const [query,setQuery]=useState();
    const [response,setResponse]=useState()
    const data={
        query,setQuery,response,setResponse,just:'hi uday'
    }

    const callGemini=async()=>
    {
      const response=await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDU1Wf6kwfYMx6DxmpevBummzXXLYdqClU',{
        
          "contents": [{
              "parts":[{"text": "Explain how AI works"}]
              }]
          
      })
      console.log(response)
    }

    callGemini()
  return (

    <userContex.Provider value={data}>
         {children}
    </userContex.Provider>
   
  )
}

export default ContextProvide