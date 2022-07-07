const express=require('express');
const OrderController=require('../controllers/orderController');

const route=express.Router();

route.post('/add' , OrderController.addOrder);

module.exports=route;