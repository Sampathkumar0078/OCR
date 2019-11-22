var express=require('express');
var router=express.Router();

router.get('/cpv',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":{
            "baeAgel":70,
            "sama":85,
            "shortage":50,
            "es":40,
            "ops":65
        }
    })
})

module.exports=router