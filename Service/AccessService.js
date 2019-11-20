const Constants = require('../Config/Constants');
var BPASessionRepo = require('../Repository/BPASessionRepo');
const BPAWorkQueueRepo = require('../Repository/BPAWorkQueueRepo');
var BPAResourceRepo = require('../Repository/BPAResourceRepo');
const CCService = require('../Service/CCService');
const POService = require('../Service/POService');
const TOService = require('../Service/TOService');


module.exports.getQueues = function (req, res) {

    /* Since Local Machine has 1 DB, so redireceted all depts to single DB */

    if (req.query.dept == Constants.DEPARTMENTS.PO) {
        
        // POService.getQueues(req, (err, _data) => { 
        //     if (err) {
        //         res.json(ErrLogger(err.toString()));
        //     } else if (_data) {
        //         res.json({
        //             success: true,
        //             msg: 'Success',
        //             data: _data
        //         });
        //     }
        // });
        BPAWorkQueueRepo.getQueues(req, (err, _data) => {
            if (err) {
                res.json(err.toString());
               // res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else if (req.params.dept == Constants.DEPARTMENTS.CC) {
        // CCService.getQueues(req, (err, _data) => {
        //     if (err) {
        //         res.json(ErrLogger(err.toString()));
        //     } else if (_data) {
        //         res.json({
        //             success: true,
        //             msg: 'Success',
        //             data: _data
        //         });
        //     }
        // });
        BPAWorkQueueRepo.getQueues(req, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else if (req.params.dept == Constants.DEPARTMENTS.BO) {
        BPAWorkQueueRepo.getQueues(req, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else if (req.params.dept == Constants.DEPARTMENTS.TO) {
        // TOService.getQueues(req, (err, _data) => {
        //     if (err) {
        //         res.json(ErrLogger(err.toString()));
        //     } else if (_data) {
        //         res.json({
        //             success: true,
        //             msg: 'Success',
        //             data: _data
        //         });
        //     }
        // });
        BPAWorkQueueRepo.getQueues(req, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: 'No Queues found.'
        });
    }
}

module.exports.resumeOrPauseQueue = function (req, res) {
    var conditions = {
        id: req.body.conditions.queueId
    };
    var updateFields = {};
    if (req.body.updateFields.running == Constants.BOOLEAN.FALSE) {
        updateFields.running = 0//Constants.BOOLEAN.FALSE
    } else if (req.body.updateFields.running == Constants.BOOLEAN.TRUE) {
        updateFields.running = 1//Constants.BOOLEAN.TRUE
    }
    if (req.body.conditions.department == Constants.DEPARTMENTS.PO) {
        // POService.getQueues(req, (err, _data) => {
        //     if (err) {
        //         res.json(ErrLogger(err.toString()));
        //     } else if (_data) {
        //         res.json({
        //             success: true,
        //             msg: 'Success',
        //             data: _data
        //         });
        //     }
        // });
        BPAWorkQueueRepo.updateQueue(conditions, updateFields, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else if (req.body.conditions.department == Constants.DEPARTMENTS.CC) {
        // CCService.getQueues(req, (err, _data) => {
        //     if (err) {
        //         res.json(ErrLogger(err.toString()));
        //     } else if (_data) {
        //         res.json({
        //             success: true,
        //             msg: 'Success',
        //             data: _data
        //         });
        //     }
        // });
        BPAWorkQueueRepo.updateQueue(conditions, updateFields, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else if (req.body.conditions.department == Constants.DEPARTMENTS.BO) {
        BPAWorkQueueRepo.updateQueue(conditions, updateFields, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else if (req.body.conditions.department == Constants.DEPARTMENTS.TO) {
        // TOService.getQueues(req, (err, _data) => {
        //     if (err) {
        //         res.json(ErrLogger(err.toString()));
        //     } else if (_data) {
        //         res.json({
        //             success: true,
        //             msg: 'Success',
        //             data: _data
        //         });
        //     }
        // });
        BPAWorkQueueRepo.updateQueue(conditions, updateFields, (err, _data) => {
            if (err) {
                res.json(ErrLogger(err.toString()));
            } else if (_data) {
                res.json({
                    success: true,
                    msg: 'Success',
                    data: _data
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: 'No Queues found.'
        });
    }
}

module.exports.deletePendingSessions = function (req, res) {
    var conditions = {
        statusid: { [Op.equal]: Constants.number.ZERO }
    }
    BPASessionRepo.delete(conditions, (err, res) => {
        if (err) {
            res.json(ErrLogger(err.toString()));
        } else if (res) {
            res.json({
                success: true,
                msg: 'Deleted successfully',
            });
        } else {
            res.json({
                success: true,
                msg: 'Unable to delete',
            });
        }
    })

}

module.exports.getResources = function (req, res) {
    var conditions = {};
    BPAResourceRepo.getAll(conditions, (err, _resources) => {
        if (err) {
            res.json(err.toString());
        } else if (res) {
            res.json({
                success: true,
                msg: 'Sucess',
                data: _resources
            });
        }
    });
}


// const util = require('util')
// module.exports.extract = function (req, res) {
//     // Demo sample using ABBYY Cloud OCR SDK from Node.js

//     if (((typeof process) == 'undefined') || ((typeof window) != 'undefined')) {
//         throw new Error("This code must be run on server side under NodeJS");
//     }

//     // !!! Please provide your application id and password and remove this line !!!
//     // To create an application and obtain a password,
//     // register at http://cloud.ocrsdk.com/Account/Register
//     // More info on getting your application id and password at
//     // http://ocrsdk.com/documentation/faq/#faq3

//     // Name of application you created
//     var appId = 'Sample_extract';
//     // Password should be sent to your e-mail after application was created
//     var password = 'VbcG0GfaDZLd347XxG1qf9Le ';

//     var imagePath = 'C:\\Users\\Sharath Vaddireddy\\Downloads\\img-Y08230759-0001.jpg';
//     var outputPath = 'C:\\Users\\Sharath Vaddireddy\\Documents\\Sample';

//     try {
//         console.log("ABBYY Cloud OCR SDK Sample for Node.js");

//         var ocrsdkModule = require('../ocrsdk.js');
//         var ocrsdk = ocrsdkModule.create(appId, password);

//         console.log(util.inspect(ocrsdk, { showHidden: false, depth: null }))
//         ocrsdk.serverUrl = "https://cloud.ocrsdk.com"; // change to https for secure connection

//         if (appId.length == 0 || password.length == 0) {
//             throw new Error("Please provide your application id and password!");
//         }

//         if (imagePath == 'imagePath') {
//             throw new Error("Please provide path to your image!")
//         }

//         function downloadCompleted(error) {
//             if (error) {
//                 console.log("Error: " + error.message);
//                 return;
//             }
//             console.log("Done.");
//         }

//         function processingCompleted(error, taskData) {
//             console.log('processing')
//             if (error) {
//                 console.log("Error: " + error.message);
//                 return;
//             }

//             if (taskData.status != 'Completed') {
//                 console.log("Error processing the task.");
//                 if (taskData.error) {
//                     console.log("Message: " + taskData.error);
//                 }
//                 return;
//             }

//             console.log("Processing completed.");
//             console.log("Downloading result to " + outputPath);

//             ocrsdk
//                 .downloadResult(taskData.resultUrl.toString(), outputPath,
//                     downloadCompleted);
//         }

//         function uploadCompleted(error, taskData) {
//             if (error) {
//                 console.log("Error: " + error.message);
//                 return;
//             }

//             console.log("Upload completed.");
//             console.log("Task id = " + taskData.id + ", status is " + taskData.status);
//             if (!ocrsdk.isTaskActive(taskData)) {
//                 console.log("Unexpected task status " + taskData.status);
//                 return;
//             }

//             ocrsdk.waitForCompletion(taskData.id, processingCompleted);
//         }

//         var settings = new ocrsdkModule.ProcessingSettings();
//         // Set your own recognition language and output format here
//         settings.language = "English"; // Can be comma-separated list, e.g. "German,French".
//         settings.exportFormat = "txt"; // All possible values are listed in 'exportFormat' parameter description 
//         // at http://ocrsdk.com/documentation/apireference/processImage/
//         console.log(settings);

//         console.log("Uploading image..");
//         ocrsdk.processImage(imagePath, settings, uploadCompleted);
//         ocrsdk.

    // }
    // catch (err) {
    //     console.log("Error: " + err.message);
    // }

// }