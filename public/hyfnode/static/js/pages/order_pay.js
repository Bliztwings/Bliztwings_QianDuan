function InitOrder(){$.post("/hyfnode/base/order/detail",{orderid:getQueryString("orderid")},function(e){e.data&&"0000"==e.data.resCode&&("已支付"==e.data.obj.payStatus?location.href="/hyfnode/orderdetail?orderid="+getQueryString("orderid"):($(".pay-money").html(e.data.obj.receivableAmount+"元"),$("#pay-btn").html("需支付"+e.data.obj.receivableAmount+"元"),payinfo={freight:e.data.obj.freight,receivableAmount:e.data.obj.receivableAmount,clothesAmount:e.data.obj.clothesAmount})),$(".loader").hide()})}function getQueryString(e){var o=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),i=window.location.search.substr(1).match(o);return null!=i?unescape(i[2]):null}function GetPrepayParam(){var e=window.sessionStorage.getItem("wx_login_openid"),o={orderid:getQueryString("orderid"),amount:payinfo.receivableAmount,openid:e};$.post("/hyfnode/base/order/prepay",o,function(e){200==e.code&&"0000"==e.data.resCode?(prepayObj=e.data.obj,callpay()):show_mes("获取支付信息失败，请在微信中打开"),showLoading(!1)},"json")}function jsApiCall(){WeixinJSBridge.invoke("getBrandWCPayRequest",prepayObj,function(e){WeixinJSBridge.log(e.err_msg),"get_brand_wcpay_request:ok"==e.err_msg?(show_mes("支付成功，将跳转到订单列表"),setTimeout(function(){location.href="/hyfnode/order"},1500)):show_mes("支付失败，请重新尝试",1500)})}function callpay(){"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",jsApiCall,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",jsApiCall),document.attachEvent("onWeixinJSBridgeReady",jsApiCall)):jsApiCall()}function show_mes(e,o){e&&$("#show_mes").html(e),o&&setTimeout(function(){$("#tip-box").hide()},o),$("#tip-box").show()}function showLoading(e){e?$(".loader").show():$(".loader").hide()}console.log("加载首页js");var _openid=window.sessionStorage.getItem("wx_login_openid"),payinfo={};InitOrder();var payway=3;$(".item_list_box").on("click",function(){var e=$(this).attr("data-id");payway="weixin_pay"==e?3:2}),$("#pay-btn").on("click",function(){$(".loader").show(),2==payway?$.post("/hyfnode/base/order/pay",{orderId:getQueryString("orderid"),orderAmount:payinfo.clothesAmount,freight:payinfo.freight},function(e){e.data&&"0000"==e.data.resCode?(show_mes("支付成功，将跳转到订单列表"),setTimeout(function(){location.href="/hyfnode/order"},1500)):show_mes("支付失败，请检查你的余额是否充足",1500),$(".loader").hide()}):(showLoading(!0),GetPrepayParam())});var prepayObj={};