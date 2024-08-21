// Package
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import path from "path";

dotenv.config()
const app = express();
const port = process.env.APP_PORT || 3001;

// cors ป้องกัน allow-cors แต่กรณีผม ผมไม่ได้ป้องกันอะไรมาก เพราะเปิดเป็น public
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// กำหนด public file
app.use('/public', express.static(path.join(process.cwd(), 'public/css')));
app.use('/public', express.static(path.join(process.cwd(), 'public/image')));

// ส่วนนี้ vercel เค้าใช้ ejs ไม่ได้ก็เลยอ่านไฟล์ html ทั่วไปแทน
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views/index.html'));
});

// Import Router
import APIRouter from './routes/api.v1.route';

// ผมใช้ app.use แทน app.get เพราะจะได้กำหนด url ได้ทั้งหมดทีเดียว และไปใช้ router ในการแยกแต่ละ url อีกที
app.use('/api/v1', APIRouter);

// listen port ทั่วไปบนเครื่องเรา
app.listen(port, () => {
  console.log(`Express is Running on Port : ${port}`);
});

// ผม exports ใว้เพราะ vercel เค้า require แบบนี้มาถ้าไม่พอร์ตออก vercel จะ server functional error
module.exports = app;