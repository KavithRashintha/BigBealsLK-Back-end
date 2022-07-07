const OrderSchema=require('../models/orderSchema');

const addOrder=(req,resp)=>{
    const order=new OrderSchema({
        orderId:req.body.orderId,
        date:req.body.date,
        customer:req.body.customer,
        items:req.body.items,
        amount:req.body.amount
    })

    order.save().then(saveResponse=>{
        resp.status(201).json({message : 'Successfully saved !' , saveResponse});
    }).catch(saveResponseError=>{
        resp.status(501).json({message : 'Internal server error !' , saveResponseError});
    })
}

module.exports={
    addOrder
}