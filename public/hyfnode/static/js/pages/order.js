function InitOrder(){$.post("/hyfnode/base/order/list",{},function(i){if("900"==i.code)$(".nologin").show(),$(".myOrder").hide();else if(i.data&&i.data.length>0){var e={list:i.data},t=template("orderlist",e);$(".myOrder").html(t),$(".modify_time").on("click",function(){location.href="/hyfnode/timectr?id="+$(this).attr("data-id")}),$(".order_logictics").on("click",function(){location.href="/hyfnode/logictics?orderid="+$(this).attr("data-id")})}else{var e={list:[]},t=template("orderlist",e);$(".myOrder").html(t)}$(".loader").hide()})}function getQueryString(i){var e=new RegExp("(^|&)"+i+"=([^&]*)(&|$)","i"),t=window.location.search.substr(1).match(e);return null!=t?unescape(t[2]):null}console.log("加载首页js"),InitOrder();var openid=getQueryString("openid")||"";openid&&window.sessionStorage.setItem("wx_login_openid",openid);