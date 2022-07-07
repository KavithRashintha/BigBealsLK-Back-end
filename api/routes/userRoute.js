const express=require('express');
const UserController=require('../controllers/userController');

const route=express.Router();

route.post('/save' , UserController.addUser);
route.post('/login' , UserController.loginUser);

module.exports=route;