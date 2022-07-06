const mongoose=require('mongoose');

const AdminSchema=new mongoose.Schema({
    fullName:{type:String , required:true},
    email:{type:String , required:true},
    dob:{type:String , required:true},
    address:{type:String , required:true},
    contact:{type:String , required:true},
    nic:{type:String , required:true}
})

module.exports=mongoose.model('admin' , AdminSchema);