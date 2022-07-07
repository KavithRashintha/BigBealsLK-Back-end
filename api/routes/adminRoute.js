const express=require('express');
const AdminController=require('../controllers/adminController');

const route=express.Router();

route.post('/register' , AdminController.registerAdmin);
route.put('/update' , AdminController.updateAdmin);
route.delete('/delete' , AdminController.deleteAdmin);
route.post('/login' , AdminController.loginAdmin);

module.exports=route;