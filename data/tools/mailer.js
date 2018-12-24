var nodemailer = require('nodemailer');
var log = require('./log.js');

var mailer = {};
var authEmail = {
    service: 'qq',
    auth: {
        user: '931283130@qq.com',
        pass: 'losbdcvfwngfbeea'
    }
};
mailer.send = function (obj,callback){
    if(!obj) obj={};
    if(!obj.toEmailArr) obj.toEmailArr=[];
    obj.toEmail = obj.toEmailArr.join(",");
    if(!obj.toEmail){
        if(callback && typeof(callback)=="function") callback("邮箱不能为空！",null)
        return false;
    }
    var transporter = nodemailer.createTransport(authEmail);

    var mailOptions = {
        from: obj.fromEmail || authEmail.auth.user, // 发送者
        to: obj.toEmail, // 接受者,可以同时发送多个,以逗号隔开
        subject: obj.title||"邮件标题", // 标题
        //text: 'Hello world', // 文本
        html: obj.content||'<h2>想想空间</h2>'
    };
    try{
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                log.init(err);
                if(callback && typeof(callback)=="function") callback(err,null);
            }else{
                if(callback && typeof(callback)=="function") callback(null,info);
            }
        });
    }catch(e){
        log.init(e);
        if(callback && typeof(callback)=="function") callback(e,null);
    }
}

module.exports = mailer;