var express=require('express');
var router=express.Router();

router.get('/cic',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "p1":25,
            "p2":5,
            "p3":15
        }
    })
})

module.exports=router