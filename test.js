// // // // var fs = require('fs');
// // // // var util = require('util');
// // // // var xlsxj = require('xlsx-to-json-lc');
// // // // var DateDiff = require('date-diff');
// // // // const Constants = require('./Config/Constants');


// // // // // fs.stat("D:\\Node Workspace\\rpaapis", function (err, stats) {
// // // // //     // console.log(stats);
// // // // //     var mtime = new Date(util.inspect(stats.mtime));
// // // // //     console.log(mtime+'--->'+mtime.getHours()+':'+mtime.getUTCMinutes());

// // // // // });

// // // // // var path = "D:\\Node Workspace\\share folder_Log.xlsx";
// // // // // const testFolder = 'D:\\Node Workspace\\assets';
// // // // // const Constants  = require('./Config/Constants');

// // // // // var fileName = path.replace(/^.*[\\\/]/, '').split('_').slice(0, -1).join('_');
// // // // // console.log(fileName);


// // // // // const dirTime = fs.statSync(path).mtime.getTime()
// // // // // console.log(stats.mtime);
// // // // // var date = new Date(stats.mtime);
// // // // // console.log(date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());

// // // // // fs.readdirSync(testFolder).forEach(file => {
// // // // //     console.log(file);
// // // // //   });

// // // // // fs.readdir(testFolder, (err, files) => {
// // // // //   files.forEach(file => {
// // // // //     console.log(file);
// // // // //   });
// // // // // });


// // // // //   xlsxj({
// // // // //     input: "D:\\Node Workspace\\share folder\\Bai Ajel Input File_14Feb2019.xls",
// // // // //     output: "D:\\Node Workspace\\bau\\json\\BaiAjel.txt",
// // // // //     lowerCaseHeaders: true
// // // // // }, function (err, result) {
// // // // //     if (err)
// // // // //         console.log("Error : " + err);
// // // // //     else if (result) {
// // // // //         console.log(result);
// // // // //     }
// // // // // });

// // // // // var currentDate = new Date().getTime();
// // // // // console.log(dirTime);
// // // // // var dirDate = stats.mtime;
// // // // // console.log(dirDate.getTime());
// // // // //  var diff = currentDate.getTime() - dirDate.getTime();
// // // // //  console.log(diff);

// // // // // var date1 = new Date();
// // // // // date1.setMinutes(00);
// // // // // var date2 = new Date();
// // // // // var diff = new DateDiff(date2,date1);
// // // // // var minDiff = diff.minutes();
// // // // // console.log(minDiff);
// // // // // var date = new Date();
// // // // // var currentDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
// // // // // var hours = ((date.getHours() % Constants.number.TWELVE || Constants.number.TWELVE) < Constants.number.TEN ? '0' : '') + (date.getHours() % Constants.number.TWELVE || Constants.number.TWELVE);
// // // // // var minutes = date.getMinutes() < Constants.number.TEN ? "0" + date.getMinutes() : date.getMinutes();
// // // // // var seconds = date.getSeconds() < Constants.number.TEN ? "0" + date.getSeconds() : date.getSeconds();
// // // // // var currentTime = hours + ":" + minutes + ":" + seconds;
// // // // // console.log(currentDate + ' ' + currentTime);

// // // // const addSubtractDate = require("add-subtract-date");

// // // // var date = new Date();
// // // // date.setDate(31);
// // // // date.setMonth(11);

// // // // console.log(date.getFullYear() + '-' + ((date.getMonth() + 1) < Constants.number.TEN ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()));
// // // // var nextDate = addSubtractDate.add(date, 1, "days");
// // // // console.log(nextDate.getFullYear() + '-' + ((nextDate.getMonth() + 1) < Constants.number.TEN ? '0' + (nextDate.getMonth() + 1) : (nextDate.getMonth() + 1)) + '-' + (nextDate.getDate() < 10 ? '0' + nextDate.getDate() : nextDate.getDate()));



// // // // const _ = require('lodash');



// // // // var users = [{ 'user': 'fransis', 'age': 50, 'active': true },
// // // // { 'user': 'barney', 'age': 36, 'active': false },
// // // // { 'user': 'fred', 'age': 40, 'active': true }
// // // // ];

// // // // // var exception = _.reject(users, { exception: null });
// // // // var processing = _.filter(users, item => _.startsWith(item.user, 'fre'));

// // // // console.log(processing)


// // // // var rawData =  [{ident:'1',value:'asds'},{ident:'1',value:'asds'},{ident:'2', value:'asds'},{ident:'3', value:'asds'},{ident:'4', value:'asds'}]
// // // // var processing = _.filter(rawData, item => _.includes(null, item.ident));
// // // // console.log(processing);

// // // // var users = [{
// // // //     id: 12,
// // // //     name: 'Adam'
// // // //  },{
// // // //     id: 14,
// // // //     name: 'Bob'
// // // //  },{
// // // //     id: 16,
// // // //     name: 'Charlie'
// // // //  },{
// // // //     id: 18,
// // // //     name: 'David'
// // // //  }
// // // // ]

// // // // var ids = _.map(users, 'name'); // [12, 14, 16, 18]
// // // // console.log(ids);
// const _ = require('lodash');
// const Constants = require('./Config/Constants');
// var fs = require('fs');
// var xlsxj = require('xlsx-to-json-lc');
// var date = new Date();
// var currentFolderDate = (date.getDate() < Constants.number.TEN ? '0' + date.getDate() : date.getDate()) + Constants.MONTHS[date.getMonth()] + date.getFullYear();
// // console.log(currentFolderDate);
// var folderPath = Constants.BO.FIRCO.ROOT_FOLDER + currentFolderDate + Constants.BO.FIRCO.SUB_FOLDER;
// var _times = [];
// var _fileNamesArray = [];
// fs.readdir(folderPath, (err, files) => {
//    _.forEach(files, function (file) {
//       var completeFilePath = folderPath + file;
//       if (fs.existsSync(completeFilePath)) {
//          // console.log(completeFilePath);
//          const dirTime = fs.statSync(completeFilePath).mtime.getTime();
//          _times.push(dirTime);
//          _fileNamesArray.push({ fileName: completeFilePath, modifiedTime: dirTime })
//          // console.log(completeFilePath+' : '+dirTime);
//          // (currentTime - dirTime) >= Constants.MINUTES_15 ? hangedProfiles.push(wataniItem.replace(Constants.FILE_NAME_REGEX, '').split('_').slice(0, -1).join('_')) : null;
//       }
//    });
//    // console.log(_.max(_times));
//    // console.log(latestFileArray);
//    var latestFileArray = _.filter(_fileNamesArray, { modifiedTime: _.max(_times) });
//    var lastModifiedFileName = latestFileArray[Constants.number.ZERO].fileName;
//    // console.log(lastModifiedFileName);
//    // 'D:\\Node Workspace\\share folder\\prod\\BO\\Firco Payment Screening\\19Mar2019\\Report\\Firco_Status_Report_19Mar2019_12_25_53_PM - Copy.xlsx'
//    xlsxj({
//       input: lastModifiedFileName,
//       output: Constants.BO.FIRCO.OUTPUT_JSON,
//       lowerCaseHeaders: true
//    }, function (err, result) {
//       if (err)
//          console.log("Error : " + err);
//       else if (result) {
//          var fircoReport = {
//             voulme: 0,
//             botPicked: 0,
//             botPickedPercentage: 0,
//             botProcessed: 0,
//             botProcessedPercentage: 0,
//             reassigned: 0,
//             reassignedPercentage: 0
//          }

//          fs.readFile(Constants.BO.FIRCO.OUTPUT_JSON, (err, data) => {
//             if (err) throw err;
//             let report = JSON.parse(data);
//             // report = [{ "count of transaction number2": "10.71%", "row labels": "Human-L1", "count of transaction number": "495" }, { "count of transaction number2": "0.04%", "row labels": "Arabic Name", "count of transaction number": "2" }, { "count of transaction number2": "0.04%", "row labels": "Failed To perform Step 1 In Navigate Stage 'click on first hit' on page 'Click Hits' - The object invoked has disconnected from its clients. (Exception from HRESULT: 0x80010108 (RPC_E_DISCONNECTED))", "count of transaction number": "2" }, { "count of transaction number2": "1.06%", "row labels": "Human-Arabic", "count of transaction number": "49" }, { "count of transaction number2": "0.52%", "row labels": "Sancation name is in arrabic", "count of transaction number": "24" }, { "count of transaction number2": "0.00%", "row labels": "Benef Name/Remit Name/Purpose is Blank", "count of transaction number": "" }, { "count of transaction number2": "6.49%", "row labels": "Receiver tag PASS criteria not match", "count of transaction number": "300" }, { "count of transaction number2": "0.45%", "row labels": "Could not store calculation result - Field DetailsCollection.NAME_TYPE not found", "count of transaction number": "21" }, { "count of transaction number2": "1.86%", "row labels": "BENEF_POB-not a known hit", "count of transaction number": "86" }, { "count of transaction number2": "0.02%", "row labels": "BEN_DOC_NB-not a known hit", "count of transaction number": "1" }, { "count of transaction number2": "0.04%", "row labels": "BenefBIC-not a known hit", "count of transaction number": "2" }, { "count of transaction number2": "0.06%", "row labels": "BENEF_ADDR-not a known hit", "count of transaction number": "3" }, { "count of transaction number2": "0.02%", "row labels": "Failed To perform Step 2 In Read Stage 'name and Nationality' on page 'Get Sancation Name and Nationality' - The object invoked has disconnected from its clients. (Exception from HRESULT: 0x80010108 (RPC_E_DISCONNECTED))", "count of transaction number": "1" }, { "count of transaction number2": "0.02%", "row labels": "BENEF_ACCO-not a known hit", "count of transaction number": "1" }, { "count of transaction number2": "0.02%", "row labels": "Failed To perform Step 1 In Read Stage 'Read Origin and Designation' on page 'Get Sancation Name and Nationality' - The object invoked has disconnected from its clients. (Exception from HRESULT: 0x80010108 (RPC_E_DISCONNECTED))", "count of transaction number": "1" }, { "count of transaction number2": "0.02%", "row labels": "Failed To perform Step 1 In Read Stage 'Read Origin and Designation' on page 'Get Sanction list matched info' - The object invoked has disconnected from its clients. (Exception from HRESULT: 0x80010108 (RPC_E_DISCONNECTED))", "count of transaction number": "1" }, { "count of transaction number2": "0.02%", "row labels": "Failed To perform Step 1 In Navigate Stage 'click on more info button' on page 'Get More information' - The object invoked has disconnected from its clients. (Exception from HRESULT: 0x80010108 (RPC_E_DISCONNECTED))", "count of transaction number": "1" }, { "count of transaction number2": "26.95%", "row labels": "L1", "count of transaction number": "1246" }, { "count of transaction number2": "0.58%", "row labels": "FP - BenfBank partially Match", "count of transaction number": "27" }, { "count of transaction number2": "13.48%", "row labels": "NFR - Beneficiary Name Partially Match", "count of transaction number": "623" }, { "count of transaction number2": "7.81%", "row labels": "NFR - No Additional Data Available", "count of transaction number": "361" }, { "count of transaction number2": "0.63%", "row labels": "NFR - YOB Match", "count of transaction number": "29" }, { "count of transaction number2": "4.46%", "row labels": "PTH - Remitter Name Partially Matches", "count of transaction number": "206" }, { "count of transaction number2": "4.24%", "row labels": "L2", "count of transaction number": "196" }, { "count of transaction number2": "0.30%", "row labels": "NFR - Beneficiary Name Partially/Exactly Match", "count of transaction number": "14" }, { "count of transaction number2": "0.71%", "row labels": "PTH - Remitter Name Match Completely", "count of transaction number": "33" }, { "count of transaction number2": "3.09%", "row labels": "PTH-J", "count of transaction number": "143" }, { "count of transaction number2": "0.13%", "row labels": "NFR - Beneficiary Bank partially/fully Match", "count of transaction number": "6" }, { "count of transaction number2": "58.10%", "row labels": "Pass", "count of transaction number": "2686" }, { "count of transaction number2": "0.65%", "row labels": "FP - Beneficiary Bank Does not match completely", "count of transaction number": "30" }, { "count of transaction number2": "12.94%", "row labels": "FP - Beneficiary Name Does not match completely", "count of transaction number": "598" }, { "count of transaction number2": "4.65%", "row labels": "FP - Beneficiary Name match partially", "count of transaction number": "215" }, { "count of transaction number2": "5.86%", "row labels": "FP - Beneficiary Nationality Does not match completely", "count of transaction number": "271" }, { "count of transaction number2": "7.90%", "row labels": "FP - Name does not match Completely", "count of transaction number": "365" }, { "count of transaction number2": "4.85%", "row labels": "FP - Name Type Mismatch", "count of transaction number": "224" }, { "count of transaction number2": "8.09%", "row labels": "FP - YOB does not match", "count of transaction number": "374" }, { "count of transaction number2": "2.40%", "row labels": "Purpose---FP - Purpose not match with prohibited words", "count of transaction number": "111" }, { "count of transaction number2": "10.77%", "row labels": "FP - Receiver Tag - Bank Misr", "count of transaction number": "498" }, { "count of transaction number2": "0.00%", "row labels": "(blank)", "count of transaction number": "" }, { "count of transaction number2": "0.00%", "row labels": "(blank)", "count of transaction number": "" }, { "count of transaction number2": "100.00%", "row labels": "Grand Total", "count of transaction number": "4623" }];
//             var humanL1Array = _.filter(report, { 'row labels': 'Human-L1' });
//             var l1 = _.filter(report, { 'row labels': 'L1' });
//             var l2 = _.filter(report, { 'row labels': 'L2' });
//             var pass = _.filter(report, { 'row labels': 'Pass' });
//             var grandToatal = _.filter(report, { 'row labels': 'Grand Total' });
//             fircoReport.reassigned = parseInt(humanL1Array[0]['count of transaction number']) + parseInt(l1[0]['count of transaction number']);
//             fircoReport.reassignedPercentage = parseFloat(humanL1Array[0]['count of transaction number2']) + parseFloat(l1[0]['count of transaction number2']);
//             fircoReport.botProcessed = parseInt(l2[0]['count of transaction number']) + parseInt(pass[0]['count of transaction number']);
//             fircoReport.botProcessedPercentage = parseFloat(l2[0]['count of transaction number2']) + parseFloat(pass[0]['count of transaction number2']);
//             fircoReport.botPicked = parseInt(grandToatal[0]['count of transaction number']);

//             // console.log(fircoReport);/* Total volume from input */
//             fs.readdir(Constants.BO.FIRCO.INPUT_FOLDER, (err, inputFiles) => {
//                _.forEach(inputFiles, function (inputFile) {
//                   xlsxj({
//                      input: Constants.BO.FIRCO.INPUT_FOLDER + inputFile,
//                      output: Constants.BO.FIRCO.OUTPUT_JSON,
//                      lowerCaseHeaders: true
//                   }, function (err, result) {
//                      if (err)
//                         console.log("Error : " + err);
//                      else if (result) {
//                         fircoReport.volume = result.length;
//                         console.log(fircoReport);
//                      }
//                   });
//                });
//             });
//          });
//       }
//    });
// });


var _ = require('lodash');

// var s = '<parameters><inputs /><outputs><output name="step1" type="text" value="2" /><output name="step2" type="text" value="4" /><output name="step3" type="text" value="3562" /></outputs></parameters>'

// var s1 = _.split(s, 'step3');




// console.log(
//    _.uniqBy(data["BaiAjal-PreContract"], 'keyvalue').length
// )
// console.log(
//    data["BaiAjal-PreContract"].length
// )

// var data = {};

// var pre = [
//    {
//       "id": "A2F40CD1-7461-49B8-9FF8-8E2D98AA71BB",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034514313",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.837Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:01.983Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "324",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:01.983Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:01.983Z"
//    },
//    {
//       "id": "757EF02A-079B-495E-81B0-8E81AE66C274",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034514343",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.843Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:02.417Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "325",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:02.417Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:02.417Z"
//    },
//    {
//       "id": "461A50BF-E711-44CB-8A7C-E11AD9A3FF37",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034514402",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.847Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:03.027Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 1,
//       "queueident": 2,
//       "ident": "326",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 1,
//       "finished": "2019-03-25T05:07:03.027Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:03.027Z"
//    },
//    {
//       "id": "F868FAA0-F445-4671-A4FB-83CA80A797DA",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034514462",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.850Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:03.463Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "327",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:03.463Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:03.463Z"
//    },
//    {
//       "id": "9C2B6EAE-21FE-4606-BE23-4B26C94EEC5C",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034512375",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.853Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:03.937Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "328",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:03.937Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:03.937Z"
//    },
//    {
//       "id": "B496BE0F-11C6-42C4-BF62-88DDC564761B",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034513808",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.860Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:04.433Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "329",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:04.433Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:04.433Z"
//    },
//    {
//       "id": "86417910-E451-47A8-8F80-AF9E83BC7A36",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034513837",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.863Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:04.853Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "330",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:04.853Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:04.853Z"
//    },
//    {
//       "id": "779AE2D7-DEAA-42CF-A5BB-70F72D1389B3",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034513916",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.867Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:05.283Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "331",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:05.283Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:05.283Z"
//    },
//    {
//       "id": "BF6F8439-408F-41BA-B863-D4F0974466B9",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034513917",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.870Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:05.710Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "332",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:05.710Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:05.710Z"
//    },
//    {
//       "id": "31BC914F-95FB-4B1C-8D66-860399940F85",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0034514463",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:06:58.873Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:06.200Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "333",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:06.200Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:06.200Z"
//    },
//    {
//       "id": "5C4C76B1-28E1-45DF-A7C5-5F3D39E64D74",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134514313",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.483Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:53.347Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1232",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:53.347Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:53.347Z"
//    },
//    {
//       "id": "BA45FAC5-C81D-443F-823F-5CFFB5D12428",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134514343",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.517Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:54.170Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1233",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:54.170Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:54.170Z"
//    },
//    {
//       "id": "6914CA22-BDB4-4CC8-B1ED-EFCB082E4020",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134514402",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.520Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:55.203Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1234",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:55.203Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:55.203Z"
//    },
//    {
//       "id": "FC03D6E9-5DA9-4189-B8C8-185581BDBC89",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134514462",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.527Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:55.937Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1235",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:55.937Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:55.937Z"
//    },
//    {
//       "id": "B40AC240-9075-4226-BF47-A979AB773F4A",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134512375",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.530Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:56.647Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1236",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:56.647Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:56.647Z"
//    },
//    {
//       "id": "5F96AF36-4733-4B37-A3C7-71A521CC6AAC",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134513808",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.533Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:57.487Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1237",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:57.487Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:57.487Z"
//    },
//    {
//       "id": "D056A9E3-02EC-4566-B8D0-89594BAC747B",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134513837",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.540Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:58.237Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1238",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:58.237Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:58.237Z"
//    },
//    {
//       "id": "EC08AA04-EDD3-40C4-B9DD-51F6DF7F03FF",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134513916",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.543Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:58.903Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1239",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:58.903Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:58.903Z"
//    },
//    {
//       "id": "248DD998-62C7-4AB8-BA08-27DE961F5AD0",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134513917",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.547Z",
//       "completed": null,
//       "exception": "2019-03-25T12:23:59.647Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1240",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:23:59.647Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:23:59.647Z"
//    },
//    {
//       "id": "AC762664-5DB3-4B16-8AF2-AD6962AE7E22",
//       "queueid": "3BB085D0-6CF9-4502-A695-ED1378681FD5",
//       "keyvalue": "DP0134514463",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:50.550Z",
//       "completed": null,
//       "exception": "2019-03-25T12:24:00.367Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 2,
//       "ident": "1241",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:24:00.367Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:24:00.367Z"
//    }
// ]

// var post =  [
//    {
//       "id": "9FEE4B1D-CA71-4D80-9C3C-7868FBA94192",
//       "queueid": "B33E1A5B-411B-4AB5-9958-4CF7C56FD2DC",
//       "keyvalue": "DP0034509407",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:07:01.753Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:07.740Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 1,
//       "ident": "334",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:07.740Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:07.740Z"
//    },
//    {
//       "id": "15A1C141-F591-487E-9DDF-59439AEB9603",
//       "queueid": "B33E1A5B-411B-4AB5-9958-4CF7C56FD2DC",
//       "keyvalue": "DP0034509420",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T05:07:01.757Z",
//       "completed": null,
//       "exception": "2019-03-25T05:07:08.183Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 1,
//       "ident": "335",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T05:07:08.183Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T05:07:08.183Z"
//    },
//    {
//       "id": "8B197A58-DA51-4F0A-A9EF-684D20530A29",
//       "queueid": "B33E1A5B-411B-4AB5-9958-4CF7C56FD2DC",
//       "keyvalue": "DP0134509407",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:52.750Z",
//       "completed": null,
//       "exception": "2019-03-25T12:24:01.343Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 0,
//       "queueident": 1,
//       "ident": "1242",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 0,
//       "finished": "2019-03-25T12:24:01.343Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:24:01.343Z"
//    },
//    {
//       "id": "6DDCD592-963E-4087-85D3-9D655CCBB801",
//       "queueid": "B33E1A5B-411B-4AB5-9958-4CF7C56FD2DC",
//       "keyvalue": "DP0134509420",
//       "status": "",
//       "attempt": 1,
//       "loaded": "2019-03-25T12:23:52.890Z",
//       "completed": null,
//       "exception": "2019-03-25T12:24:02.017Z",
//       "exceptionreason": "Please re run ",
//       "deferred": null,
//       "worktime": 1,
//       "queueident": 1,
//       "ident": "1243",
//       "sessionid": "891C72EB-437D-4DF3-B384-25B0A2516942",
//       "priority": 0,
//       "prevworktime": 0,
//       "attemptworktime": 1,
//       "finished": "2019-03-25T12:24:02.017Z",
//       "exceptionreasonvarchar": "Please re run ",
//       "exceptionreasontag": "Exception: Please re run ",
//       "encryptid": null,
//       "lastupdated": "2019-03-25T12:24:02.017Z"
//    }
// ]

// var arr = [];
// _.forEach(pre, function(item) {
//    arr.push(item);
//    });
// _.forEach(post, function(item) {
//    arr.push(item);
// });

// console.log(arr.length);

