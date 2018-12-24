function cancelOrder() {
    $(".wx_float").animate({bottom: "10"}, 400), $("#codFloat").slideDown()
}
function closeCancel() {
    return $("#codFloat").hide(), $(".cancel-order").css("pointer-events", "auto"), !1
}
function doCancel(t) {
    $(".cancel-order").css({"pointer-events": "none"});
    var e = {reason: t, orderid: getQueryString("orderid")};
    $.post("/hyfnode/base/order/cancel", e, function (t) {
        closeCancel();
        showTip("取消成功", "/hyfnode/order")
    }, "json")
}
function initOrder() {
    $.post("/hyfnode/base/order/detail", {orderid: getQueryString("orderid")}, function (t) {
        if (t.data && "0000" == t.data.resCode) {
            var e = t.data.obj.orderStatus, o = 1;
            o = "送往工厂" == e ? 2 : "清洗中" == e ? 3 : "送回中" == e ? 4 : "已签收" == e ? 5 : 1, $("#orderflowimg").html('<img src="/hyfnode/static/image/orderflow' + o + '.png">');
            var a = {item: t.data.obj}, r = template("orderinfo_tpl", a);
            $("#orderinfo").html(r), $("#orderaddress").html(template("orderaddress_tpl", a)), t.data.obj.logistics.length > 0 && $("#orderflow").html(template("orderflow_tpl", a)), t.data.obj.clothesList.length > 0 && $("#orderclothes").html(template("orderclothes_tpl", {list: t.data.obj.clothesList}));
            var i = !1;
            if ("送回中" == t.data.obj.orderStatus) {
                n = {
                    info: {
                        paidAmount: t.data.obj.paidAmount,
                        freight: t.data.obj.freight,
                        receivableAmount: t.data.obj.receivableAmount
                    }, list: t.data.obj.clothesList
                };
                $("#orderpay").html(template("orderpay_tpl", n)), i = !0
            }
            var d = !1;
            if ("已签收" == t.data.obj.orderStatus || "已支付" == t.data.obj.payStatus) {
                var n = {
                    info: {
                        paidAmount: t.data.obj.paidAmount,
                        freight: t.data.obj.freight,
                        receivableAmount: t.data.obj.receivableAmount
                    }, list: t.data.obj.clothesList
                };
                $("#orderpay").html(template("orderpay_tpl", n)), d = !0
            }
            var l = !1;
            if ("已支付" != t.data.obj.payStatus && "2" == t.data.obj.valuation) {
                var s = getQueryString("orderid"), c = {
                    orderid: s,
                    freight: t.data.obj.freight,
                    receivableAmount: t.data.obj.receivableAmount
                };
                window.sessionStorage.setItem("orderdetail_payinfo_" + s, JSON.stringify(c)), l = !0
            }
            var p = {btnfast: i, bthcanpay: l, btnsign: d};
            $("#orderbtn").html(template("orderbtn_tpl", p)), $(".modify_time").on("click", function () {
                location.href = "/hyfnode/timectr?id=" + $(this).attr("data-id")
            }), $(".loader").hide();
            $('.viewer').viewer();
        }
    })
}
function showTip(t, e, o) {
    $("#show_mes").html(t), e ? $("#tip-box").show().delay(2e3).hide(function () {
            window.location.href = e
        }) : o ? $("#tip-box").show() : $("#tip-box").show().delay(2e3).hide(0)
}
function getQueryString(t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"), o = window.location.search.substr(1).match(e);
    return null != o ? unescape(o[2]) : null
}
function complain() {
    location.href = "/hyfnode/feedback"
}
function cuidan() {
    $.post("/hyfnode/base/order/sign", {orderid: getQueryString("orderid")}, function (res) {
        if (res && res.data.resCode && res.data.resCode == "0000") {
            alert("签收成功!"), location.reload()
        }
        else
            alert("签收失败，请稍后重试")
    })
}
function gotopay() {
    var t = getQueryString("orderid");
    location.href = "/hyfnode/order_pay?orderid=" + t
}
initOrder();