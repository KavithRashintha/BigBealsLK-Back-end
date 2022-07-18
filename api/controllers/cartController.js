const CartSchema=require('../models/cartSchema');

const addToCart=(req,resp)=>{
    const cart=new CartSchema({
        email:req.body.email,
        itemId:req.body.itemId,
        title:req.body.title,
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

const deleteItem=(req,resp)=>{
    CartSchema.findOne({itemId:req.body.itemId}).then(resultData=>{
        CartSchema.findByIdAndDelete({_id:resultData.id}).then(deleteResponse=>{
            resp.status(201).json({message : 'Successfully Deleted !'});
        }).catch(deleteResponseError=>{
            resp.status(501).json({message : 'Internal Server Error'});
        })
    }).catch(error=>{
        resp.status(404).json({message : 'Product Not Found !'});
    })
}

module.exports={
    addToCart , deleteItem
}