import express from 'express';
import cors from 'cors';
import './database/connection';
import routes from './routes';
import {config} from 'dotenv';

const app = express();
config()
app.use(cors());
app.use(express.json());
app.use(routes)

const port = 3333;

app.listen(port, () => {
    console.log('Server running in port ', port);

})
