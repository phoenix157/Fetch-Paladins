var sessionId;
var pal;

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

