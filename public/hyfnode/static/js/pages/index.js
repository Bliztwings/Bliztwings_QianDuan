function initBanner() {
    var e = {
        banner: [{
            banner_id: 2009,
            url: "",
            url_type: "web",
            title: "保利浣衣坊充值回馈活动",
            image_url: "/hyfnode/static/image/hyf1.png",
            inner_url: "",
            inner_type: "none",
            inner_title: "",
            description: "",
            tips_id: "",
            tips_name: "",
            put_under: !1
        },{
            banner_id: 2009,
            url: "",
            url_type: "web",
            title: "保利浣衣坊充值回馈活动",
            image_url: "/hyfnode/static/image/hyf2.png",
            inner_url: "",
            inner_type: "none",
            inner_title: "",
            description: "",
            tips_id: "",
            tips_name: "",
            put_under: !1
        }]
    }, i = template("content-text", e);
    $("#slider").html(i)
}
function washlist() {
    $.post("/hyfnode/base/getRoot", {}, function (e) {
        if (e.data.data && e.data.data.length > 0) {
            for (var i = 0; i < e.data.data.length; i++)e.data.data[i].serviceitem = i, e.data.data[i].url = "/hyfnode/washprice?id=" + i;
            var t = {title: "专业清洗", list: e.data.data}, n = template("category_list", {washing: t});
            $("#washing-category").html(n), $(".click-block").on("click", function () {
                location.href = $(this).attr("data-link")
            }), $(".loader").hide()
        }
    })
}
function servicelist() {
    var e = {
        bottom_button: [{
            url: "/hyfnode/info/question",
            url_type: "web",
            title: "常见问题",
            image_url: "/hyfnode/static/image/ic_service_Introduction.png?1468603477",
            inner_url: "http://www.edaixi.com/pages/introduce",
            inner_type: "web",
            inner_title: "常见问题",
            description: "常见问题",
            tips_id: "",
            tips_name: ""
        }, {
            url: "/hyfnode/info/servicearea",
            url_type: "web",
            title: "服务范围",
            image_url: "/hyfnode/static/image/ic_service_scope.png?1468603537",
            inner_url: "http://www.edaixi.com/service/service_area",
            inner_type: "web",
            inner_title: "服务范围",
            description: "服务范围",
            tips_id: "",
            tips_name: ""
        }, {
            url: "/hyfnode/feedback",
            url_type: "in_app",
            title: "意见反馈",
            image_url: "/hyfnode/static/image/ic_feedback.png?1468603317",
            inner_url: "",
            inner_type: "none",
            inner_title: "",
            description: "意见反馈",
            tips_id: "",
            tips_name: ""
        }]
    }, i = template("service_list", e);
    $("#service-list").html(i)
}
function comments() {
    var e = {
        favourable_comments: [{
            date: "2017.09.18",
            tel: "137****4883",
            comment: "这个app真是太好用了，洗的很干净",
            category: "洗鞋服务",
            user: "武汉用户：小***"
        }, {
            date: "2017.09.17",
            tel: "183****8813",
            comment: "售后非常不错，价钱也公道",
            category: "奢侈品皮具养护",
            user: "武汉用户：mewi***"
        }, {date: "2017.09.14", tel: "189****6885", comment: "服务非常好", category: "洗衣家纺", user: "武汉用户：无心***"}]
    }, i = template("comment_list", e);
    $("#comments-list").html(i), $("#comments-list").css("display", "block"), $(".comment-text").each(function () {
        $(this).text().length > 90 && ($(this).text($(this).text().substring(0, 90)), $(this).html($(this).html() + "....."))
    })
}
function getQueryString(e) {
    var i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), t = window.location.search.substr(1).match(i);
    return null != t ? unescape(t[2]) : null
}
console.log("加载首页js"), initBanner(), washlist(), servicelist(), comments(), slider(5e3);
var openid = getQueryString("openid") || "";
openid && window.sessionStorage.setItem("wx_login_openid", openid);