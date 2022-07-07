const mongoose=require('mongoose');

const OrderSchema=new mongoose.Schema({
    orderId:{type:String , required:true},
    date:{type:Date , required:true},
    customer:{type:String , required:true},
    items:{type:Array , required:true},
    amount:{type:Number , required:true}
})

module.exports=mongoose.model('order' , OrderSchema);