var express=require('express');
var router=express.Router();

router.get('/totalbots',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "running":68,
            "onhold":10,
            "suspended":04,
            "idle":12,
            "issuse":61
        }
    })
})

module.exports=router