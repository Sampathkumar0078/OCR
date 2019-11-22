const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const AppConfig = require('./Config/AppConfig');
const cors = require('cors');
const passport = require('passport');
var methodOverride = require('method-override');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
var db = require('./Models');
var db2 = require('./Models2');
const Constants = require('./config/Constants');
var say = require('say');

var app = express();

// // CORS middleware
app.use(cors());

// //Body Parser Middleware
app.use(bodyParser.json(
	{limit: '5mb'}
));

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something broke!')
});

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./Config/PassportConfig')(passport);

//Defining the controllers used in application
const access = require('./Controllers/AccessController');
app.use('/access', access);

const bo = require('./Controllers/BOController');
app.use('/bo', bo);

const po = require('./Controllers/POController');
app.use('/po', po);

const cc = require('./Controllers/CCController');
app.use('/cc', cc);

const to = require('./Controllers/TOController');
app.use('/to', to);

const users = require('./Controllers/UserController');
app.use('/users', users);

const admin = require('./Controllers/AdminController');{
	console.log('in admin')
app.use('/admin', admin);
}

// const esr = require('./Controllers/ESRCOntroller');
// {
// app.use('/esr', esr);
// }

const esrc=require('./ESR/Controllers/ESRBOController');{
	console.log('in esrc')
	app.use('/esrc',esrc)
}

const exception=require('./ESR/Controllers/ExcptionController');{
	app.use('/exception',exception)
}

const mesc=require('./ESR/Controllers/MESController');{
	app.use('/mesc',mesc)
}

const bots=require('./ESR/Controllers/TotalBots');{
	app.use('/bots',bots)
}

const cpv=require('./ESR/Controllers/CPVController');{
	app.use('/cpv',cpv)
}

const cic=require('./ESR/Controllers/CIController');{
	app.use('/cic',cic)
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'Public/index.html'));
});



app.listen(AppConfig.application.port, () => {
	console.log('server started on port ' + AppConfig.application.port);
});

// Database authentication => configuration @./model/index.js
db.sequelize
.authenticate()
.then(() => {
  console.log(AppConfig.database.name+Constants.MSG.CON_ESTABLISHED);
  // say.speak(AppConfig.database.name+Constants.MSG.CON_ESTABLISHED);
})
.catch(err => {
  console.error(Constants.MSG.CON_FAILURE, err);
});

// db2.sequelize
// .authenticate()
// .then(() => {
//   console.log(AppConfig.database2.name+Constants.MSG.CON_ESTABLISHED);
//   // say.speak(AppConfig.database2.name+Constants.MSG.CON_ESTABLISHED);
// })
// .catch(err => {
//   console.error(Constants.MSG.CON_FAILURE, err);
// });