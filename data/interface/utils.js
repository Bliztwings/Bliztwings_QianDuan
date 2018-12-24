module.exports.setSessionUserInfo = function (req, userInfo) {
    if (req && req.session) {
        var thisUserInfo = null;
        if (userInfo) {
            thisUserInfo = userInfo;
        }
        console.log(thisUserInfo);
        req.session.userInfo = thisUserInfo;
    }
}

module.exports.GetUserInfo = function (req) {
    if (req && req.session && req.session.userInfo) {
        return req.session.userInfo
    }
    else return null
};

