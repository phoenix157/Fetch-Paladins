var Promise = require('promise');
var tempdb = require('./tempdb');
var sessionId = tempdb.getSessionId();
const pal = tempdb.getPal();

var newpromise = new Promise (function (resolve,reject) {

    pal.getChampions(sessionId, 'PC', function (err, res) {
        //console.log(res);
        resolve(res);
    });

}).then(function (result) {
    console.log("CHAMP REQ");
    tempdb.saveChampData(result);
});
