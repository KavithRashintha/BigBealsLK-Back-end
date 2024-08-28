const mongoose=require('mongoose');
const express=require('express');

require('dotenv').config();
const port=process.env.PORT;

const AdminRoute=require('./routes/adminRoute');
const UserRoute=require('./routes/userRoute');
const OrderRoute=require('./routes/orderRoute');
const ProductRoute=require('./routes/productRoute');
const CartRoute=require('./routes/cartRoute');
const cors = require("cors");

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:4200',  // Replace with the actual origin of your front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // List of allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // List of allowed headers
}));

mongoose.connect('mongodb://127.0.0.1:27017/BigDealsLK').then(()=>{
    app.listen(port , ()=>{
        console.log(`BigDealsLK server is running to port : ${port}`);
    })
}).catch((error=>{
    console.log(error);
}))

app.use('/api/v1/admin' , AdminRoute);
app.use('/api/v1/user' , UserRoute);
app.use('/api/v1/product' , ProductRoute);
app.use('/api/v1/order' , OrderRoute);
app.use('/api/v1/cart' , CartRoute);