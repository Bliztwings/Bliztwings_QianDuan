var companyList = [
    {"code": "huanyifang", "name": "huanyifang", "abb_name": "浣衣坊"}
];
var currentIndex = 0;

var developConfig = {
    //服务器配置
    "host": "localhost",//服务器IP
    "port": 3001,//启动服务的端口

    //Redis配置
    "RedisHost": {"host": "127.0.0.1", "port": "6379", "password": "123456"},

    //微信配置
    // "wechat": {
    //     "appid": "wx614b63f73b55d7ef",
    //     "appsercet": "caa0df7f27bfbcf17e102123cddb849a",
    //     "token": "HYYXMhyf",
    //     "domain": "www.sawyxd.com"
    // },


    //微信配置
    "wechat": {
        "appid": "wxc6097b5bf9ba801d",
        "appsercet": "be4d1a0381ac606745a4cbe119dc8f7a",
        "token": "HYFXYToken",
        "domain": "www.sawyxd.com"
    },

    "o2ourl": "http://118.178.134.100:8080/ewashing/",
    "imgurl": "http://image.sawyxd.com/ewashing/"

}

var port = parseInt(process.argv[2]) || developConfig.port;
var host = developConfig.host;
var hostPort = "http://" + host + ":" + port;
var serverHost = "http://" + host + ":" + 3000;

//静态资源开发目录
var devDir = "dev";
//静态资源目录
var staticDir = "/static";

module.exports = {
    //生产，开发环境标识
    "env": "",
    //机构编码
    "company": companyList[currentIndex].code,
    //机构名称
    "companyName": companyList[currentIndex].name,
    //机构简称
    "companyAbbName": companyList[currentIndex].abb_name,
    //开发时的静态资源目录
    "dev_dir": devDir,
    //静态资源目录
    "static_dir": staticDir,
    //端口
    "port": port,
    //服务端路径前缀
    "server_host": hostPort,
    //接口路径前缀
    "interface_host": serverHost,
    //静态资源路径前缀 包括js,css文件
    "static_host": "/hyfnode" + staticDir,
    //图片静态资源路径前缀
    "img_host": "/" + companyList[currentIndex].code + "/" + staticDir,
    //版本号
    "version": "1.1.1-" + (new Date().getTime()),
    "setting": {
        cookieSecret: 'mysql',
        sessionTimeOut: 800000,
        db: 'mysql',
        host: "localhost",
        user: "root",
        password: "",
        database: "uq-db",
        port: 3306
    },

    //开发配置

    //Redis配置
    "RedisHost": developConfig.RedisHost,

    //微信配置
    "wechat": developConfig.wechat,

    "o2ourl": developConfig.o2ourl,
    "imgurl": developConfig.imgurl,
};
