const ProductSchema=require('../models/productSchema');

const addProduct=(req,resp)=>{
    const product=new ProductSchema({
        title:req.body.title,
        productCode:req.body.productCode,
        description:req.body.description,
        colors:req.body.colors,
        sizes:req.body.sizes,
        url:req.body.url,
        price:req.body.price
    })

    product.save().then(saveResponse=>{
        resp.status(201).json({message : 'Successfully saved !' , saveResponse});
    }).catch(saveResponseError=>{
        resp.status(501).json({message : 'Internal server error' , saveResponseError});
    });
}

const updateDProduct=(req,resp)=>{
    ProductSchema.findOne({productCode:req.body.productCode}).then(resultData=>{
        ProductSchema.findByIdAndUpdate({_id:resultData.id} , {
            $set:{
                title:req.body.title,
                description:req.body.description,
                colors:req.body.colors,
                sizes:req.body.sizes,
                url:req.body.url,
                price:req.body.price
            }}
        ).then(updateResponse=>{
            resp.status(201).json({message : 'Successfully Updated !'});
        }).catch(updateResponseError=>{
            resp.status(501).json({message : 'Internal Server Error !'});
        });
    }).catch(error=>{
        resp.status(404).json({message : 'Drug Not Found !'});
    })
}

const deleteProduct=(req, resp)=>{
    ProductSchema.findOne({productCode:req.body.productCode}).then(resultData=>{
        ProductSchema.findByIdAndDelete({_id:resultData.id}).then(deleteResponse=>{
            resp.status(201).json({message : 'Successfully Deleted !'});
        }).catch(deleteResponseError=>{
            resp.status(501).json({message : 'Internal Server Error'});
        })
    }).catch(error=>{
        resp.status(404).json({message : 'Drug Not Found !'});
    })
}

const getProduct=(req,resp)=>{
    ProductSchema.findOne({productCode:req.headers.productCode}).then(resultData=>{
        if(resultData!=null){
            resp.status(201).json({message : resultData});
        }else{
            resp.status(404).json({message : 'Drug Not Found !'});
        }
    }).catch(resultDataError=>{
        resp.status(501).json({message : 'Internal Server Error !'});
    })
}

const getAllProducts=(req,resp)=>{
    ProductSchema.find().then(resultData=>{
        if(resultData.length>0){
            resp.status(201).json({message : resultData});
        }else{
            resp.status(404).json({message : 'Drugs Not Found !'});
        }
    }).catch(resultDataError=>{
        resp.status(501).json({message : 'Internal Server Error !'});
    })
}

module.exports={
    addProduct , updateDProduct , deleteProduct , getProduct , getAllProducts
}