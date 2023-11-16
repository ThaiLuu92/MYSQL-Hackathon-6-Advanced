import express from 'express';
import "dotenv/config"
import route from './routes/index.js';
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDB } from './database/config.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())


route(app);
connectToDB();


const port = process.env.PORT || 3000;

app.listen(port, ()=> {
    console.log(`Connecting to http://localhost:${port}`);
})

