function setFeedType(){checkLogin()&&($(this).toggleClass("select_li").siblings().removeClass("select_li"),$(this).siblings().children("img").hide(),$(this).children("img").toggle(),setSubmitBtn())}function setFeedContent(){checkLogin(),setSubmitBtn()}function sumitFeed(){if(clearTimeout(timer),!setSubmitBtn())return!1;toggleBtn(!1),$submitBtn.text("正在提交");var e={feedBackType:$feedItem.filter(".select_li").data("feed-id"),feedBackContent:$.trim($feedContent.val())};$.post("/hyfnode/base/feedback",e,function(e){if(200==e.code&&"0000"==e.data.resCode){$submitBtn.text("提交成功");var t=sessionStorage.getItem("feedbook_from")||"/";sessionStorage.removeItem("feedbook_from"),showTip("您的反馈我们已经收到，您也可以致电浣衣坊服务热线027-65523663 ，感谢您的支持！",t),timer=setTimeout(function(){$("#tip-box").hide(),window.location.href=t+"&t=1506607694"},2e3)}else toggleBtn(!0),$submitBtn.text("提交"),showTip(e.data.msg)},"json")}function showTip(e,t){$("#show_mes").html(e),t?($("#tip-box").show(),setTimeout(function(){"reload"==t?window.location.reload():"back"==t?window.history.back():window.location.href=t},800)):$("#tip-box").show().delay(2e3).hide(0)}function setSubmitBtn(){var e=$feedItem.hasClass("select_li"),t=$.trim($feedContent.val());return e&&t?(toggleBtn(!0),!0):(toggleBtn(!1),!1)}function toggleBtn(e){e?$submitBtn.prop("disabled",!1).removeClass("nosub").addClass("cansub"):$submitBtn.prop("disabled",!0).removeClass("cansub").addClass("nosub")}function checkLogin(){return!0}console.log("加载首页js");var $feedUl=$("#feedback-ul"),$feedItem=$feedUl.find("li"),$feedForm=$("#feedback-form"),$feedContent=$("#feedback-content"),$submitBtn=$("#submit-btn"),timer=null;window.onload=function(){$feedItem.on("click",setFeedType),$feedContent.on("focus input",setFeedContent),$submitBtn.on("click",sumitFeed)};