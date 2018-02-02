var express = require('express');
var router = express.Router();
var Promise = require('promise');
var tempdb = require('./tempdb');

router.get('/', function(req, res, next) {

    var sessionId = tempdb.getSessionId();
    const pal = tempdb.getPal();

    //console.log('a ' +sessionId);
    //console.log(pal);

    var data = [];

    var newPromise = new Promise(function (resolve,reject) {
        pal.getChampions(sessionId, 'PC', (err, res) => {
            //console.log(res);
            resolve(res)
        });
    });

    newPromise.then(function (result) {
        data = result;
        //console.log(data);
        res.render('champions',{data:data});

    });
});

module.exports = router;