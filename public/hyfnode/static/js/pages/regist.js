$("#city-picker").cityPicker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择地址</h1>\
    </header>'
});
var issending = false;
var wait = 60;
function time(o) {
    if (wait == 0) {
        $("#sendMsg").html("发送验证码");
        wait = 60;
        issending = false;
    } else {
        issending = true;
        $("#sendMsg").html("重新发送(" + wait + ")");
        wait--;
        setTimeout(function () {
                time()
            },
            1000)
    }
}

$("#sendMsg").click(function () {
    if (issending) return false;
    var mobileval = $("#mobile").val();
    if (mobileval.length == 0) {
        $.alert('请输入手机号');
        return;
    }
    if (!/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(mobileval)) {
        $.alert('手机号格式不正确');
        return;
    }
    $.showPreloader('发送短信中，请稍后...')
    var senddata = {telephone: mobileval}

    $.post("/hyfnode/base/sendmsg", senddata, function (data) {
            $.hidePreloader();
            if (data.code == 200 && data.data.resCode == "0000") {
                issending = true;

                time(60)
            }
            else {
                $.alert(data.data.msg || '发送失败,请重试操作');
            }
        }
        , "json");

})

$('#btnregist').click(function () {


    var mobileval = $("#mobile").val();
    if (mobileval.length == 0) {
        $.alert('请输入手机号');
        return;
    }
    if (!/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(mobileval)) {
        $.alert('手机号格式不正确');
        return;
    }

    var checkCode = $("#checkcode").val();
    if (checkCode.length == 0) {
        $.alert('请输入验证码');
        return;
    }
    var passval = $("#password").val();
    var repassval = $("#repassword").val();
    if (passval.length == 0) {
        $.alert('请输入密码');
        return;
    }
    if (repassval.length == 0) {
        $.alert('请再次输入密码');
        return;
    }
    if (passval.length < 4 || repassval.length < 4) {
        $.alert('密码长度不能小于4位');
        return;
    }

    if (passval != repassval) {
        $.alert('两次密码输入的不一致');
        return;
    }

    var usernameval = $("#username").val();
    if (usernameval.length == 0) {
        $.alert('请输入用户姓名');
        return;
    }
    //
    // var telephoneval = $("#telephone").val();
    // if (telephoneval.length == 0) {
    //     $.alert('请输入固定电话');
    //     return;
    // }

    var citypicker = $("#city-picker").val();
    if (citypicker.length == 0) {
        $.alert('请选择地址');
        return;
    }

    var citylist = citypicker.split(' ');
    var province = citylist[0];
    var city = citylist[1];
    var area = citylist[2];

    var addressval = $("#address").val();
    if (addressval.length == 0) {
        $.alert('请输入详细地址');
        return;
    }
    $.showPreloader('注册中，请稍后...')
    var openid = window.sessionStorage.getItem('wx_login_openid') || "";
    var registdata = {
        mobilePhone: mobileval,
        password: passval,
        openId: openid,
        name: usernameval,
        sex: "0",
        telephone: "",
        address: addressval,
        province: province,
        city: city,
        area: area,
        deviceId: "weixin",
        checkCode: checkCode
    };

    $.post("/hyfnode/base/regist", registdata, function (data) {
            $.hidePreloader();
            if (data.code == 200 && data.data.resCode == "0000") {
                $.alert('注册成功，即将跳转到登陆页面', function () {
                    location.href = '/hyfnode/login'
                });
            }
            else {
                $.alert(data.data.msg || '注册失败,请重试操作');
            }
        }
        , "json");
})