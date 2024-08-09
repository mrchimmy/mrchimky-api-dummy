import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import path from "path";

dotenv.config()
const app = express();
const port = process.env.APP_PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join('public/css')));
app.use('/public', express.static(path.join('public/image')));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', { root: '.' });
});

import APIRouter from './routes/api.v1.route';

app.use('/api/v1', APIRouter);

app.listen(port, () => {
  console.log(`Express is Running on Port : ${port}`);
});

module.exports = app;