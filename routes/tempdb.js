var sessionId;
var pal;
var champData;


exports.getSessionId = function () {
    return sessionId;
}
exports.getPal = function () {
    return pal;
}
exports.saveSessionId = function (res) {
    sessionId = res;
}
exports.savePal = function (res) {
    pal = res;
}

exports.saveChampData = function (res) {
    champData = res;
}

exports.getChampData = function () {
    return champData;
}