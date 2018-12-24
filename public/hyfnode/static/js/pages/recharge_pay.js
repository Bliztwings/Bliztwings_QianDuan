var flag = true;

var _amount = parseFloat(window.sessionStorage.getItem('recharge_pay_amount'));
var _zengsong = parseFloat(window.sessionStorage.getItem('recharge_pay_amount_zengsong'));
var _openid = window.sessionStorage.getItem('wx_login_openid');
$(".pay-money").html(_amount + '')
$("#pay-btn").html("需支付" + _amount + '元')
$(".recharge_send").html('<span class="send">赠送金额</span><span class="money">￥<em>' + _zengsong + '</em></span>');


var prepayObj = {};
function GetPrepayParam() {
    var __amount = window.sessionStorage.getItem('recharge_pay_amount');
    var __openid = window.sessionStorage.getItem('wx_login_openid');
    $.post("/hyfnode/base/order/prepay", {
        amount: __amount,
        openid: __openid
    }, function (data) {
        if (data.code == 200 && data.data.resCode == "0000") {
            prepayObj = {
                "appId": data.data.obj.appId,     //公众号名称，由商户传入
                "timeStamp": data.data.obj.timeStamp,          //时间戳，自1970年以来的秒数
                "nonceStr": data.data.obj.nonceStr,   //随机串
                "package": data.data.obj.package,
                "signType": data.data.obj.signType,         //微信签名方式：
                "paySign": data.data.obj.paySign,  //微信签名
            };
            // alert(JSON.stringify(prepayObj))
        } else {
            show_mes("获取支付信息失败，请在微信中打开")
        }
        showLoading(false);
    }, 'json');
}
GetPrepayParam();


//调用微信JS api 支付
function onBridgeReady() {


    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId": prepayObj.appId,     //公众号名称，由商户传入
            "timeStamp": prepayObj.timeStamp,       //时间戳，自1970年以来的秒数
            "nonceStr": prepayObj.nonceStr,  //随机串
            "package": prepayObj.package,
            "signType": prepayObj.signType,       //微信签名方式：
            "paySign": prepayObj.paySign   //微信签名
        },
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                showLoading(false);
                show_mes("充值成功，稍后跳转到用户中心")
                setTimeout(function () {
                    location.href = "/hyfnode/usercenter"
                }, 1500);
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            else {
                // alert(JSON.stringify(res))
                showLoading(false);
                $("#pay-btn").removeAttr('disabled')
                show_mes("支付失败,请重新尝试", 1500)
            }

        }
    );
}

function callpay() {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }


}


function submitting(el) {
    showLoading(true);
    callpay();

}

//显示加载中
function showLoading(show) {
    if (show) {
        $(".loader").show();
    } else {
        $(".loader").hide();
    }
}

//显示提示信息
function show_mes(title, delay_time) {
    if (title) {
        $("#show_mes").html(title);
    }
    if (delay_time) {
        setTimeout(function () {
            $("#tip-box").hide();
        }, delay_time);
    }
    $("#tip-box").show();
}
