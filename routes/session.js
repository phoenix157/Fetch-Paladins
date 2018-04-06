const paladins = require('paladins-api');
var keyJSON = require('../.key.json');
const pal = new paladins(keyJSON['devId'], keyJSON['key']);
var Promise = require('promise');
var tempdb = require('./tempdb');

var sessionId;

var newpromise = new Promise(function (resolve,reject) {
    pal.connect('PC', (err, res) => {
        if(!err) {
        resolve(res);
        };
    });
})
.then(function (result) {
    sessionId = result;
    //console.log(sessionId);
    //console.log(pal);
    console.log("SessionId created");
    tempdb.savePal(pal);
    tempdb.saveSessionId(sessionId);

});
