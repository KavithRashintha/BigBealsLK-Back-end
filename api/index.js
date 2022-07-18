const mongoose=require('mongoose');
const express=require('express');

require('dotenv').config();
const port=process.env.PORT;

const AdminRoute=require('./routes/adminRoute');
const UserRoute=require('./routes/userRoute');
const OrderRoute=require('./routes/orderRoute');
const ProductRoute=require('./routes/productRoute');
const CartRoute=require('./routes/cartRoute');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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