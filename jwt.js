var jwt = require('jsonwebtoken');

var user = {
    fistName: 'Sharath',
    lastName: 'Vaddireddy',
    age: 24
}

const token = jwt.sign(user, 'Arb@2019', {
    expiresIn: 604800 //1 week
});

var _token = 'JWT ' + token

console.log(_token);