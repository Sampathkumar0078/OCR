var express=require('express');
var router=express.Router();

router.use('/mesc',(req,res)=>{
    res.json({
        "success":true,
        "message":"data found",
        "data":[{
            "sunday":{
                "min":55,
                "max":25
            },
            "monday":{
                "min":80,
                "max":25
            },
            "tuesday":{
                "min":33,
                "max":35
            },
            "wednesday":{
                "min":62,
                "max":70
            },
            "Thursday":{
                "min":20,
                "max":45
            },
            "friday":{
                "min":47,
                "max":50
            },
            "saturday":{
                "min":57,
                "max":80
            }
        }]
    })
})

module.exports=router