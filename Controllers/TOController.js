const express = require('express');
const router = express.Router();
var Constants = require('../config/Constants');
const TOService = require('../Service/TOService');
const _ = require('lodash');

router.get('/gettardeeports/:queueName', (req, res, next) => {
    // return TOService.getVolumeReport(req, res);
    res.json({
        "success": true,
        "msg": "Data found",
        "data": [{
            "left_heading": "Import LC",
            "completed": 2,
            "exception": 30,
            "pending": 4
        },
        {
            "left_heading": "Export LC",
            "completed": 2,
            "exception": 10,
            "pending": 5
        },
        {
            "left_heading": "Releaser",
            "completed": 11,
            "exception": 4,
            "pending": 45
        },
        {
            "left_heading": "Closure",
            "completed": 44,
            "exception": 1,
            "pending": 5
        }
        ]
    });
});



module.exports = router;