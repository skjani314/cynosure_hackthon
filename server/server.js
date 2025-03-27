import express from 'express';
import cors from 'cors'
const app=express();
app.use(express.json())
app.get('/',(req,res)=>
{
    res.send(`<h2>welcome to the server</h2>`)
})

app.listen(3000,()=>
{
    console.log(`http://localhost:3000`)
})
