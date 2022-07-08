const AdminSchema=require('../models/adminSchema');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt=require('jsonwebtoken');
const UserSchema = require("../models/userSchema");

const registerAdmin=(req,resp)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user=new AdminSchema({
            fullName:req.body.fullName,
            email:req.body.email,
            password:hash,
            dob:req.body.dob,
            address:req.body.address,
            contact:req.body.contact,
            nic:req.body.nic
        })

        user.save().then(saveResponse=>{
            resp.status(201).json({message : 'Successfully Saved !' , saveResponse});
        }).catch(saveResponseError=>{
            resp.status(501).json({message : 'Internal Server Error !' , saveResponseError});
        })
    });
}

const updateAdmin=(req,resp)=>{
    AdminSchema.findOne({fullName:req.body.fullName}).then(resultData=>{
        AdminSchema.findByIdAndUpdate({_id:resultData.id}, {
            $set:{
                fullName:req.body.newName,
                email:req.body.email,
                dob:req.body.dob,
                address:req.body.address,
                contact:req.body.contact,
                nic:req.body.nic
            }
        }).then(updateResponse=>{
            resp.status(201).json({message : 'Successfully Updated !'});
        }).catch((updateResponseError=>{
            resp.status(501).json({message : 'Internal Server Error !'});
        }))
    }).catch(error=>{
        resp.status(404).json({message : 'Patient Not Found !'});
    })
}

const deleteAdmin=(req,resp)=>{
    AdminSchema.findOne({fullName:req.body.fullName}).then(resultData=>{
        AdminSchema.findByIdAndDelete({_id:resultData.id}).then(deleteResponse=>{
            resp.status(201).json({message : 'Successfully Deleted !'});
        }).catch(deleteResponseError=>{
            resp.status(501).json({message : 'Internal Server Error !'});
        })
    }).catch(error=>{
        resp.status(404).json({message : 'Patient Not Found !'});
    })
}

const getAdmin=(req,resp)=>{
    AdminSchema.findOne({fullName:req.headers.fullName}).then(resultData=>{
        if(resultData!=null){
            resp.status(201).json({message : resultData});
        }else{
            resp.status(404).json({message : 'Admin Not Found !'});
        }
    }).catch(resultDataError=>{
        resp.status(501).json({message : 'Internal Server Error !'});
    })
}

const loginAdmin=(req,resp)=>{
    AdminSchema.findOne({fullName:req.body.fullName}).then(resultData=>{
        if(resultData){
            bcrypt.compare(req.body.password, resultData.password, function(err, result) {
                if(result){
                    const token=jwt.sign(
                        {
                            fullName : resultData.fullName,
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
            resp.status(404).json({message : 'Admin Not Found !'});
        }
    })
}

module.exports={
    registerAdmin , updateAdmin , deleteAdmin , getAdmin , loginAdmin
}
