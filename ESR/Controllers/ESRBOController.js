var express=require('express');
var router=express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.get('/esrbo',(req,res)=>{
    console.log('esrbo')
    res.json({
        "success":true,
        "messsage":"data found",
        "data":{
            "BO":30
        }
    })

})

router.get('/esrpo',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "PO":40
        }
    })
})

router.get('/esrto',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "TO":50
        }
    })
})

router.get('/esrcc',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "CC":60
        }

    })
})

module.exports=router;