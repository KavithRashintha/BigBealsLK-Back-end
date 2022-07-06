const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    title:{type:String , required:true},
    productCode:{type:String , required:true},
    description:{type:String , required:true},
    colors:{type:Array , required:true},
    sizes:{type:Array , required:true},
    url:{type:Array, required:true},
    price:{type:Number , required:true}
})

module.exports=mongoose.model('product' , ProductSchema);