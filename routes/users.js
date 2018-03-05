var express = require('express');
var router = express.Router();
var Promise = require('promise');
var tempdb = require('./tempdb');



/* GET users listing. */
router.get('/', function(req, res, next) {

    var sessionId = tempdb.getSessionId();
    const pal = tempdb.getPal();

    //console.log('a ' +sessionId);
    //console.log(pal);

    var user_name = req.baseUrl.toString().substr(7);
    var champData = [];
    var playerStatus = {};
    var playerData = {};

    var newPromise = new Promise(function (resolve, reject) {

        var newPromise = new Promise(function (resolve,reject) {

            pal.getPlayer(sessionId, 'PC', user_name, (err, res) => {
                //console.log(res);
                resolve(res[0]);
            });
        }).then(function (result) {
            playerData = result;

        });

        var newPromise = new Promise(function (resolve,reject) {

            pal.getChampionRanks(sessionId, 'PC', user_name, (err, res) => {
                //console.log(res);
                resolve(res);
            });
        }).then(function (result) {
            champData = result;

        });

        var newPromise = new Promise(function (resolve,reject) {

            pal.getPlayerStatus(sessionId, 'PC', user_name, (err, res) => {
                //console.log(res);
                resolve(res[0]);
            });
        }).then(function (result) {
            playerStatus = result;

        });

        setTimeout(function () {
            resolve(1);
        },3000);

    }).then(function (result) {
        res.render('users', {
            champData:champData,
            playerStatus:playerStatus,
            playerData:playerData
        });
    })


    setTimeout(function () {


    },1500);


});




router.get('/matches', function (req, res, next) {
    var sessionId = tempdb.getSessionId();
    const pal = tempdb.getPal();

    var user_name = req.baseUrl.toString().substr(7);
    var data = [];

    var newPromise = new Promise(function (resolve,reject) {
       pal.getMatchHistory(sessionId, 'PC', user_name, (err,res)=>{
          resolve(res);
       });
    });
    newPromise.then(function (result) {
        data = result;
        data.push({
           user_name:user_name
        });
        //console.log(data);
        res.render('user_match_details',{data:data});
    });

});

router.get('/champions', function (req, res, next) {
    var sessionId = tempdb.getSessionId();
    const pal = tempdb.getPal();

    var user_name = req.baseUrl.toString().substr(7);
    var data = [];

    var newPromise = new Promise(function (resolve,reject) {
        pal.getChampionRanks(sessionId, 'PC', user_name, (err,res)=>{
            resolve(res);
    });
    });
    newPromise.then(function (result) {
        data = result;
        data.push({
            user_name:user_name
        });
        //console.log(data);
        res.render('user_champion_data',{data:data});
    });

});



module.exports = router;
