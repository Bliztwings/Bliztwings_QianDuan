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

    $.post("/hyfnode/base/sendpsdmsg", senddata, function (data) {
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


    $.showPreloader('正在重置密码，请稍后...')
    var registdata = {
        mobilePhone: mobileval,
        password: passval,
        checkCode: checkCode
    };

    $.post("/hyfnode/base/resetpwd", registdata, function (data) {
            $.hidePreloader();
            if (data.code == 200 && data.data.resCode == "0000") {
                $.alert('重置密码成功，即将跳转到登陆页面', function () {
                    location.href = '/hyfnode/login'
                });
            }
            else {
                $.alert(data.data && data.data.msg || '重置密码失败,请重试操作');
            }
        }
        , "json");
})