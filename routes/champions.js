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
            resolve(res);
        });
    })
    .then(function (result) {
        data = result;
        // res.send(data);
        var newPromise1=new Promise(function (resolve,reject) {
            pal.getItems(sessionId,'PC',(err,res)=>{
                resolve(res);
            });
        })
            .then(function (result1) {
                // console.log(result1);
                res.render('champions',{data:data,items:result1});
            })
    });
});

module.exports = router;