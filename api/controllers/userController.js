const UserSchema=require('../models/userSchema');

const nodemailer = require("nodemailer");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt=require('jsonwebtoken');

const addUser=(req,resp)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user=new UserSchema({
            userName:req.body.userName,
            email:req.body.email,
            password:hash,
            address:req.body.address,
            contact:req.body.contact
        })

        user.save().then(saveResponse=>{
            resp.status(201).json({message : 'Successfully Saved !' , saveResponse});
        }).catch(saveResponseError=>{
            resp.status(501).json({message : 'Internal Server Error !' , saveResponseError});
        })
    });
}

const loginUser=(req,resp)=>{
    UserSchema.findOne({userName:req.body.userName}).then(resultData=>{
        if(resultData){
            bcrypt.compare(req.body.password, resultData.password, function(err, result) {
                if(result){
                    const token=jwt.sign(
                        {
                            userName : resultData.userName,
                            email : resultData.email,
                            password : resultData.password
                        },
                        process.env.SECRET
                    );
                    resp.status(201).json({message : 'Logged In !' ,  token : token});
                }
                if(!result){
                    resp.status(401).json({message : 'Unauthorized User !'});
                }
            });
        }else{
            resp.status(404).json({message : 'User Not Found !'});
        }
    })
}

module.exports={
    addUser , loginUser
}
