const express=require('express');
const CartController=require('../controllers/cartController');

const route=express.Router();

route.post('/add' , CartController.addToCart);
route.get('/get' , CartController.getItem);
route.delete('/deleteAll' , CartController.deleteItems);

module.exports=route;