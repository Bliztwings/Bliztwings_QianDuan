// 获取url中参数
function getSearchParams() {
    var params = {};
    var chunks = location.search.substr(1).split(/&/g);
    for (var i = 0; i < chunks.length; i++) {
        try {
            var items = chunks[i].split('=', 2);
            var key = items[0];
            var value = decodeURIComponent(items[1]);
            params[key] = value;
        }
        catch (ex) {
        }
    }
    return params;
}


$.ajax({
    url: '/hyfnode/base/recharge',
    type: 'GET',
    data: {},
    dataType: 'json'
})

    .done(function (data) {
        if (data.code == "200") {


            rechargeOnline(data);
            // 选择金额
            var $sumInput = $("#sum-input");

            var $selectedSum = $("#selected-sum");
            var $selectedSumM = $("#selected-sum");
            var $selectedMo = $("#other-recharge");
            var $sumSel = $("#recharge-list").find("li");
            var $sumMon = $("#special_recharge").find(".recharge-div");
            var $mobileS = $("#other-recharge");


            $sumInput.keyup(function () {
                if ($sumInput.val() == '') {
                    $("#recharge_btn").prop('disabled', true);
                } else {

                    $("#recharge_btn").prop('disabled', false);
                }
                ;

            })


            // 在线充值特殊
            $sumMon.click(function () {
                $("#special_recharge .recharge-div").removeClass('tab-current2');
                $("#recharge-list li").removeClass('tab-current');
                $(this).addClass("tab-current2").siblings().removeClass("tab-current2");


                $sumInput.val('').attr("placeholder", "输入其他金额");
                var sum = $(this).data('sum');

                // 选中金额放入隐藏域
                $selectedSumM.val(sum);
            })


            // 在线充值正常
            $sumSel.click(function () {

                $("#special_recharge .recharge-div").removeClass('tab-current2');


                $("#recharge-list li").removeClass('tab-current');
                $(this).addClass("tab-current").siblings().removeClass("tab-current");
                var sum = $(this).data('sum');

                $sumInput.val(sum).attr("placeholder", "输入其他金额");


                // 选中金额放入隐藏域
                $selectedSum.val(sum);
            });
            $sumSel.eq(0).click();

            // 输入金额
            $sumInput.on('focus', function () {
                $selectedSum.val('');
                $selectedSumM.val('');
                $("#recharge-list li").removeClass('tab-current');
                $("#special_recharge .recharge-div").removeClass('tab-current2');

            });

            // 检查金额
            function check_sum() {
                var input_sum = +$.trim($sumInput.val());   // 输入金额

                if (!input_sum) {
                    alert("请选择或输入正确充值金额");
                    return false;
                }


                var re = /^\d+\.{0,1}\d{0,2}$/;
                if (!re.test(input_sum) || input_sum <= 0 || input_sum > 99999) {
                    alert("请输入合理金额(1~99999)");
                    return false;
                }
                return true;
            }


            // 提交金额
            $("#recharge_btn").click(function () {
                if (check_sum()) {
                    $(this).prop("disabled", true);
                }
                else {
                    return false;
                }
                var rechageval = $('#sum-input').val()
                if (!rechageval) {
                    alert("请输入充值金额")
                    return;
                }

                var zengsong = 0;
                var recharge = parseFloat(rechageval)
                if (recharge == 500) zengsong = 58;
                if (recharge == 1000) zengsong = 258;
                if (recharge == 3000) zengsong = 998;

                window.sessionStorage.setItem('recharge_pay_amount', parseFloat(rechageval));
                window.sessionStorage.setItem('recharge_pay_amount_zengsong', parseFloat(zengsong));
                location.href = '/hyfnode/recharge_pay'

            });

            // 弹窗提示
            function alert_1(title) {
                if (title) {
                    $("#show_mes").html(title);
                }
                $("#codFloat").show().delay(2000).hide(0);
            }
        }

        $(".loader").hide()

    })

    .fail(function () {
        alert("网络错误，请稍后再试")
    })

// 模板取数据
function rechargeOnline(data) {
    var rechargeOnline = data.data;
    var onlinerehcarge = data.data.recharge_list;
    console.log(onlinerehcarge);

    var rechargeMoney = template('rechargebox', rechargeOnline);
    var rechargeNormal = template('recharge-normal', {
        "normal_recharge": [{min: 500, display_money_give: 58}, {min: 1000, display_money_give: 258}, {
            min: 3000,
            display_money_give: 998
        },]
    });
    var rechargeSpecial = template('recharge-special', onlinerehcarge);

    document.getElementById('rechatgeblock').innerHTML = rechargeMoney;
    document.getElementById('normal_recharge').innerHTML = rechargeNormal;
    document.getElementById('special_recharge').innerHTML = rechargeSpecial;
}


