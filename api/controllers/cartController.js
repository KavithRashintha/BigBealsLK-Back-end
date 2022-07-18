const CartSchema=require('../models/cartSchema');
const ProductSchema = require("../models/productSchema");

const addToCart=(req,resp)=>{
    const cart=new CartSchema({
        email:req.body.email,
        title:req.body.title,
        price:req.body.price,
        color:req.body.color,
        size:req.body.size,
        url:req.body.url
    })

    cart.save().then(saveResponse=>{
        resp.status(201).json({message : 'Item added to the card !' , saveResponse});
    }).catch(saveResponseError=>{
        resp.status(501).json({message : 'Not Implemented !' , saveResponseError});
    })
}

const getItem=(req,resp)=>{
    CartSchema.find({email:req.headers.email}).then(resultData=>{
        if(resultData!=null){
            resp.status(201).json({message : resultData});
        }else{
            resp.status(404).json({message : 'Product Not Found !'});
        }
    }).catch(resultDataError=>{
        resp.status(501).json({message : 'Internal Server Error !'});
    })
}

const deleteItems=(req,resp)=>{
    CartSchema.find({email:req.headers.email}).then(resultData=>{
        CartSchema.deleteMany().then(deleteResponse=>{
            resp.status(201).json({message : 'Successfully Deleted !'});
        }).catch(deleteResponseError=>{
            resp.status(501).json({message : 'Internal Server Error'});
        })
    }).catch(error=>{
        resp.status(404).json({message : 'Product Not Found !'});
    })
}

module.exports={
    addToCart , deleteItems , getItem
}