var crypto = require('crypto');

//加密
module.exports.encryption=function(text) {
    return crypto.createHash('md5').update(text).digest('hex');
};
