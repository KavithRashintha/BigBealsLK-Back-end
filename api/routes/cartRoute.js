const express=require('express');
const CartController=require('../controllers/cartController');

const route=express.Router();

route.post('/add' , CartController.addToCart);
route.delete('/delete' , CartController.deleteItem);

module.exports=route;