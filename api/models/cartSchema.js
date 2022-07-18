const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
    email:{type:String ,required:true},
    itemId:{type:String , required:true},
    title:{type:String ,required:true},
    color:{type:String ,required:true},
    size:{type:String ,required:true},
    url:{type:String, required:true}
})

module.exports=mongoose.model('cart' , CartSchema);