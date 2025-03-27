import express from 'express';
import cors from 'cors';
import ConnectDb from './config/Connect.js'; 
import 'dotenv/config'
import AuthRouter from './routes/auth.js';
import { error } from 'console';

const app = express();
app.use(express.json());

ConnectDb();

app.get('/', (req, res) => {
    res.send(`<h2>Welcome to the server</h2>`);
});

app.use('/auth',AuthRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send({success:false,message:error})
});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
