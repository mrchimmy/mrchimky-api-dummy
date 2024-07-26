import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const port = process.env.APP_PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    return res.json({
        status: "ok",
        code: 200,
        message: "สวัสดีนี่คือ API Dummy สำหรับคนอยากลองเล่น API สามารถทำไปใช้ได้เลยยย คำเตือนไม่เหมาะกับการนำไปใช้จริง เหมาะสำหรับการลองใช้ หรือ testing เท่านั้น!! เตือนแล้วนะ",
        author: 'MrChimKy, MrChimKy Developments',
        contacts: {
            facebook: 'https://facebook.com/mrchimky',
            youtube: 'https://youtube.com/@mrchimky',
            youtube_game: 'https://youtube.com/@mrchxmer',
            github: 'https://github.com/mrchimmy'
        }
    });
});

import productRouter from './routes/product.route';

app.use('/product', productRouter);

app.listen(port, () => {
  console.log(`Express is Running on Port : ${port}`);
});

module.exports = app;