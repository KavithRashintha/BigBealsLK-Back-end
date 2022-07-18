const AdminSchema=require('../models/adminSchema');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt=require('jsonwebtoken');

const registerAdmin=(req,resp)=>{

    const token=req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        resp.status(403).send("Authentication required !");
        return;
    }

    try {
        const decode=jwt.verify(token, process.env.SECRET);
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
    }catch (e) {
        resp.status(500).json({message : 'Token required !' , e});
        return;
    }
}

const updateAdmin=(req,resp)=>{

    const token=req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        resp.status(403).send("Authentication required !");
        return;
    }

    try {
        AdminSchema.findOne({email:req.headers.email}).then(resultData=>{
            AdminSchema.findByIdAndUpdate({_id:resultData.id}, {
                $set:{
                    fullName:req.body.fullName,
                    email:req.body.newEmail,
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
    }catch (e) {
        resp.status(500).json({message : 'Token required !' , e});
        return;
    }

}

const deleteAdmin=(req,resp)=>{

    const token=req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        resp.status(403).send("Authentication required !");
        return;
    }

    try {
        AdminSchema.findOne({email:req.headers.email}).then(resultData=>{
            AdminSchema.findByIdAndDelete({_id:resultData.id}).then(deleteResponse=>{
                resp.status(201).json({message : 'Successfully Deleted !'});
            }).catch(deleteResponseError=>{
                resp.status(501).json({message : 'Internal Server Error !'});
            })
        }).catch(error=>{
            resp.status(404).json({message : 'Patient Not Found !'});
        })
    }catch (e) {
        resp.status(500).json({message : 'Token required !' , e});
        return;
    }

}

const getAdmin=(req,resp)=>{
    AdminSchema.findOne({email:req.headers.email}).then(resultData=>{
        if(resultData!=null){
            resp.status(201).json({message : resultData});
        }else{
            resp.status(404).json({message : 'Admin Not Found !' , resultData});
        }
    }).catch(error=>{
        resp.status(501).json({message : 'Internal Server Error !'});
    })
}

const loginAdmin=(req,resp)=>{
    AdminSchema.findOne({email:req.body.email}).then(resultData=>{
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
