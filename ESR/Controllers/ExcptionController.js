var express=require('express');
var router=express.Router();

router.get('/BusinessExeptions',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",

        "data":{
            "BE":60
        }
    })
})

router.get('/ProcessExceptions',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "PE":70
        }
    })
})

router.get('/TechnicalException',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "TE":80
        }
    })
})

module.exports=router
