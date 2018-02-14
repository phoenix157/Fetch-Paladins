var express = require('express');
var router = express.Router();
var Promise = require('promise');
var tempdb = require('./tempdb');
var items_map=new Map();
var data;
router.get('/', function(req, res, next) {

    var sessionId = tempdb.getSessionId();
    const pal = tempdb.getPal();

    //console.log('a ' +sessionId);
    //console.log(pal);


    if(data==undefined) {
        var newPromise = new Promise(function (resolve, reject) {
            pal.getChampions(sessionId, 'PC', function (err, res) {
                //console.log(res);
                console.log("CHAMP REQ");
                resolve(res);
            });
        })
            .then(function (result) {
                data = result;
                // res.send(data);
                if (items_map.size == 0) {
                    var newPromise1 = new Promise(function (resolve, reject) {
                        pal.getItems(sessionId, 'PC', function (err, res) {
                            console.log("ITEMS REQ");
                            resolve(res);
                        });
                    })
                        .then(function (result1) {
                            // console.log(result1);
                            result1.forEach(function (item) {
                                var temp = items_map.get(item.champion_id);
                                if (temp == undefined) {
                                    temp = new Set();
                                    temp.add(item);
                                    items_map.set(item.champion_id, temp);
                                }
                                else {
                                    items_map.set(item.champion_id, temp.add(item));
                                }
                            });
                            res.render('champions', {data: data, items_map: items_map});
                        })
                }
                else {
                    res.render('champions', {data: data, items_map: items_map});
                }
            });
    }
    else{
        res.render('champions', {data: data, items_map: items_map});
    }
});

module.exports = router;