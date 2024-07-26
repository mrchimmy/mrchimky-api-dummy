import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config()
export const app = express();
const port = process.env.APP_PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import productRouter from './routes/product.route';
app.get('/', (req, res) => {
    return res.json({
      message: "Hello World"
    })
})
app.use('/product', productRouter);

app.listen(port, () => {
  console.log(`Express is Running on Port : ${port}`);
});

module.exports = app;