import express from 'express';
import cors from 'cors';
import ConnectDb from './config/Connect.js'; 
import 'dotenv/config'

const app = express();
app.use(express.json());

ConnectDb();

app.get('/', (req, res) => {
    res.send(`<h2>Welcome to the server</h2>`);
});

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});
