const express=require('express');
const ProductController=require('../controllers/productController');

const route=express.Router();

route.post('/add' , ProductController.addProduct);
route.put('/update' , ProductController.updateDProduct);
route.delete('/delete' , ProductController.deleteProduct);
route.post('/get' , ProductController.getProduct);
route.get('/getAll' , ProductController.getAllProducts);

module.exports=route;