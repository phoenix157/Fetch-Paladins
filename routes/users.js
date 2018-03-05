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
        var championsData = tempdb.getChampData();
        //var champSorted = [];
        var newPromise = new Promise(function (resolve,reject) {
            var charSorted = new Array();
            for(var i=0;i<champData.length;i++){
                charSorted.push({});
            }

            for(var i=0;i<champData.length;i++){
                        var j = championsData.findIndex(x => x.id==champData[i].champion_id);
                        charSorted[i].image = championsData[j].ChampionIcon_URL;
                        charSorted[i].title = championsData[j].Title;
                        charSorted[i].Ability1 = championsData[j].Ability1;
                        charSorted[i].Ability2 = championsData[j].Ability2;
                        charSorted[i].Ability3 = championsData[j].Ability3;
                        charSorted[i].Ability4 = championsData[j].Ability4;
                        charSorted[i].Ability5 = championsData[j].Ability5;
                        charSorted[i].Ability1_URL = championsData[j].Ability_1.URL;
                        charSorted[i].Ability2_URL = championsData[j].Ability_2.URL;
                        charSorted[i].Ability3_URL = championsData[j].Ability_3.URL;
                        charSorted[i].Ability4_URL = championsData[j].Ability_4.URL;
                        charSorted[i].Ability5_URL = championsData[j].Ability_5.URL;
            }

            resolve(charSorted);


        }).then(function (result) {
            res.render('users', {
                champData:champData,
                playerStatus:playerStatus,
                playerData:playerData,
                champSorted:result
            });
             //console.log(playerStatus);

        });





    });

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

// router.get('/champions', function (req, res, next) {
//     var sessionId = tempdb.getSessionId();
//     const pal = tempdb.getPal();
//
//     var user_name = req.baseUrl.toString().substr(7);
//     var data = [];
//
//     var newPromise = new Promise(function (resolve,reject) {
//         pal.getChampionRanks(sessionId, 'PC', user_name, (err,res)=>{
//             resolve(res);
//     });
//     });
//     newPromise.then(function (result) {
//         data = result;
//         data.push({
//             user_name:user_name
//         });
//         //console.log(data);
//         res.render('user_champion_data',{data:data});
//     });
//
// });



module.exports = router;
