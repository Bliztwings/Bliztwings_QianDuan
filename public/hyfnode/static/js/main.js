function getConfig(obj) {
    if (!obj) {
        obj = {};
    }
    return {
        baseUrl: (obj._static_host || "") + "/js/" || '',
        paths: {
            /*工具类配置*/
            jquery: 'public/lib/jquery-1.8.2.min',
            slider: 'public/lib/slider',
            swipe: 'public/lib/swipe.min',
            template: 'public/lib/template',
            zepto: 'public/lib/zepto',
            "location": "public/lib/address_location2",
            "sui": 'public/lib/sm.min',
            "sui-ext": 'public/lib/sm-ext.min',
            "viewer": "public/lib/viewer.min",
            /*pages*/
            "index": 'pages/index',
            "order": 'pages/order',
            "usercenter": 'pages/usercenter',
            "feedback": 'pages/feedback',
            "washdesc": 'pages/washdesc',
            "washprice": 'pages/washprice',
            "shopcart": "pages/shopping-cart",
            "orderplace": "pages/orderplace",
            "fly": "pages/fly",
            "editplace": "pages/editplace",
            "login": "pages/login",
            "addresslist": "pages/addresslist",
            "timectr": "pages/timectr",
            "recharge": "pages/recharge",
            "recharge_pay": "pages/recharge_pay",
            "logictics": "pages/logictics",
            "orderdetail": "pages/orderdetail",
            "regist": "pages/regist",
            "order_pay": "pages/order_pay",
            "findpassword": "pages/findpassword",

        },
        urlArgs: 'v=' + (obj._version || "1.0") // 修改这里的版本号
    };
}

function loadPageScript(pageid) {
    switch (pageid) {
        case "index":   //首页
            hna.hnaLoader.load(['jquery', 'template', 'swipe', 'slider', 'index'], function () {
                //console.log('load complete index');
            });
            break;
        case "order":   //订单页面
            hna.hnaLoader.load(['jquery', 'template', 'slider', 'swipe', 'order'], function () {
                //console.log('load complete index');
            });
            break;
        case "usercenter":   //用户中心
            hna.hnaLoader.load(['jquery', 'usercenter'], function () {
                //console.log('load complete index');
            });
            break;
        case "feedback":   //用户中心
            hna.hnaLoader.load(['jquery', 'feedback'], function () {
                //console.log('load complete index');
            });
            break;
        case "washdesc":   //用户中心
            hna.hnaLoader.load(['jquery', 'washdesc'], function () {
                //console.log('load complete index');
            });
            break;
        case "washprice":   //用户中心
            hna.hnaLoader.load(['zepto', 'template', 'shopcart', 'fly', 'washprice'], function () {
                //console.log('load complete index');
            });
            break;
        case "orderplace":   //用户中心
            hna.hnaLoader.load(['zepto', 'template', 'orderplace'], function () {
                //console.log('load complete index');
            });
            break;
        case "editplace":   //用户中心
            hna.hnaLoader.load(['jquery', 'location', 'editplace'], function () {
                //console.log('load complete index');
            });
            break;
        case "login":   //用户中心
            hna.hnaLoader.load(['jquery', 'login'], function () {
                //console.log('load complete index');
            });
            break;
        case "addresslist":   //用户中心
            hna.hnaLoader.load(['jquery', 'template', 'addresslist'], function () {
                //console.log('load complete index');
            });
            break;
        case "timectr":   //用户中心
            hna.hnaLoader.load(['jquery', 'template', 'timectr'], function () {
                //console.log('load complete index');
            });
            break;
        case "recharge":   //用户中心
            hna.hnaLoader.load(['jquery', 'template', 'recharge'], function () {
                //console.log('load complete index');
            });
            break;
        case "logictics":   //用户中心
            hna.hnaLoader.load(['jquery', 'template', 'logictics'], function () {
                //console.log('load complete index');
            });
            break;

        case "orderdetail":   //用户中心
            hna.hnaLoader.load(['jquery', 'template', 'viewer', 'orderdetail'], function () {
                //console.log('load complete index');
            });
            break;
        case "regist":   //用户中心
            hna.hnaLoader.load(['zepto', 'sui', "sui-ext", 'regist'], function () {
                //console.log('load complete index');
            });
            break;
        case "findpassword":   //用户中心
            hna.hnaLoader.load(['zepto', 'sui', "sui-ext", 'findpassword'], function () {
                //console.log('load complete index');
            });
            break;
        case "recharge_pay":   //用户中心
            hna.hnaLoader.load(['jquery', 'recharge_pay'], function () {
                //console.log('load complete index');
            });
            break;
        case "order_pay":   //用户中心
            hna.hnaLoader.load(['jquery', 'order_pay'], function () {
                //console.log('load complete index');
            });
            break;


        default:
            hna.hnaLoader.load(['jquery'], function () {
                //console.log('load complete index');
            });
            break;
    }
}
/**
 * Created by hua on 2016/6/29.
 */
+(function () {
    if (!Array.prototype.unique) {
        /*
         * 数组去重
         */
        Array.prototype.unique = function () {
            // n为hash表，r为临时数组
            var n = {}, r = [];
            for (var i = 0; i < this.length; i++) {
                // 如果hash表中没有当前项
                if (!n[this[i]]) {
                    // 存入hash表
                    n[this[i]] = true;
                    // 把当前数组的当前项push到临时数组里面
                    r.push(this[i]);
                }
            }
            return r;
        };
    }
})();

+(function (n, t) {
    "use strict";
    function w() {
    }

    function u(n, t) {
        if (n) {
            typeof n == "object" && (n = [].slice.call(n));
            for (var i = 0, r = n.length; i < r; i++)t.call(n, n[i], i)
        }
    }

    function it(n, i) {
        var r = Object.prototype.toString.call(i).slice(8, -1);
        return i !== t && i !== null && r === n
    }

    function s(n) {
        return it("Function", n)
    }

    function a(n) {
        return it("Array", n)
    }

    function et(n) {
        var i = n.split("/"), t = i[i.length - 1], r = t.indexOf("?");
        return r !== -1 ? t.substring(0, r) : t
    }

    function f(n) {
        (n = n || w, n._done) || (n(), n._done = 1)
    }

    function ot(n, t, r, u) {
        var f = typeof n == "object" ? n : {
                test: n,
                success: !t ? !1 : a(t) ? t : [t],
                failure: !r ? !1 : a(r) ? r : [r],
                callback: u || w
            }, e = !!f.test;
        return e && !!f.success ? (f.success.push(f.callback), i.load.apply(null, f.success)) : e || !f.failure ? u() : (f.failure.push(f.callback), i.load.apply(null, f.failure)), i
    }

    function v(n) {
        var t = {}, i, r;
        if (typeof n == "object")for (i in n)!n[i] || (t = {name: i, url: n[i]}); else t = {name: et(n), url: n};
        return (r = c[t.name], r && r.url === t.url) ? r : (c[t.name] = t, t)
    }

    function y(n) {
        n = n || c;
        for (var t in n)if (n.hasOwnProperty(t) && n[t].state !== l)return !1;
        return !0
    }

    function st(n) {
        n.state = ft;
        u(n.onpreload, function (n) {
            n.call()
        })
    }

    function ht(n) {
        n.state === t && (n.state = nt, n.onpreload = [], rt({url: n.url, type: "cache"}, function () {
            st(n)
        }))
    }

    function ct() {
        var n = arguments, t = n[n.length - 1], r = [].slice.call(n, 1), f = r[0];
        return (s(t) || (t = null), a(n[0])) ? (n[0].push(t), i.load.apply(null, n[0]), i) : (f ? (u(r, function (n) {
                    s(n) || !n || ht(v(n))
                }), b(v(n[0]), s(f) ? f : function () {
                        i.load.apply(null, r)
                    })) : b(v(n[0])), i)
    }

    function lt() {
        var n = arguments, t = n[n.length - 1], r = {};
        return (s(t) || (t = null), a(n[0])) ? (n[0].push(t), i.load.apply(null, n[0]), i) : (u(n, function (n) {
                n !== t && (n = v(n), r[n.name] = n)
            }), u(n, function (n) {
                n !== t && (n = v(n), b(n, function () {
                    y(r) && f(t)
                }))
            }), i)
    }

    function b(n, t) {
        if (t = t || w, n.state === l) {
            t();
            return
        }
        if (n.state === tt) {
            i.ready(n.name, t);
            return
        }
        if (n.state === nt) {
            n.onpreload.push(function () {
                b(n, t)
            });
            return
        }
        n.state = tt;
        rt(n, function () {
            n.state = l;
            t();
            u(h[n.name], function (n) {
                f(n)
            });
            o && y() && u(h.ALL, function (n) {
                f(n)
            })
        })
    }

    function at(n) {
        n = n || "";
        var t = n.split("?")[0].split(".");
        return t[t.length - 1].toLowerCase()
    }

    function rt(t, i) {
        function e(t) {
            t = t || n.event;
            u.onload = u.onreadystatechange = u.onerror = null;
            i()
        }

        function o(f) {
            f = f || n.event;
            (f.type === "load" || /loaded|complete/.test(u.readyState) && (!r.documentMode || r.documentMode < 9)) && (n.clearTimeout(t.errorTimeout), n.clearTimeout(t.cssTimeout), u.onload = u.onreadystatechange = u.onerror = null, i())
        }

        function s() {
            if (t.state !== l && t.cssRetries <= 20) {
                for (var i = 0, f = r.styleSheets.length; i < f; i++)if (r.styleSheets[i].href === u.href) {
                    o({type: "load"});
                    return
                }
                t.cssRetries++;
                t.cssTimeout = n.setTimeout(s, 250)
            }
        }

        var u, h, f;
        i = i || w;
        h = at(t.url);
        h === "css" ? (u = r.createElement("link"), u.type = "text/" + (t.type || "css"), u.rel = "stylesheet", u.href = t.url, t.cssRetries = 0, t.cssTimeout = n.setTimeout(s, 500)) : (u = r.createElement("script"), u.type = "text/" + (t.type || "javascript"), u.src = t.url);
        u.onload = u.onreadystatechange = o;
        u.onerror = e;
        u.async = !1;
        u.defer = !1;
        t.errorTimeout = n.setTimeout(function () {
            e({type: "timeout"})
        }, 7e3);
        f = r.head || r.getElementsByTagName("head")[0];
        f.insertBefore(u, f.lastChild)
    }

    function vt() {
        for (var t, u = r.getElementsByTagName("script"), n = 0, f = u.length; n < f; n++)if (t = u[n].getAttribute("data-headjs-load"), !!t) {
            i.load(t);
            return
        }
    }

    function yt(n, t) {
        var v, p, e;
        return n === r ? (o ? f(t) : d.push(t), i) : (s(n) && (t = n, n = "ALL"), a(n)) ? (v = {}, u(n, function (n) {
                    v[n] = c[n];
                    i.ready(n, function () {
                        y(v) && f(t)
                    })
                }), i) : typeof n != "string" || !s(t) ? i : (p = c[n], p && p.state === l || n === "ALL" && y() && o) ? (f(t), i) : (e = h[n], e ? e.push(t) : e = h[n] = [t], i)
    }

    function e() {
        if (!r.body) {
            n.clearTimeout(i.readyTimeout);
            i.readyTimeout = n.setTimeout(e, 50);
            return
        }
        o || (o = !0, vt(), u(d, function (n) {
            f(n)
        }))
    }

    function k() {
        r.addEventListener ? (r.removeEventListener("DOMContentLoaded", k, !1), e()) : r.readyState === "complete" && (r.detachEvent("onreadystatechange", k), e())
    }

    var r = n.document, d = [], h = {}, c = {}, ut = "async" in r.createElement("script") || "MozAppearance" in r.documentElement.style || n.opera, o, g = n.head_conf && n.head_conf.head || "hnaload", i = n[g] = n[g] || function () {
            i.ready.apply(null, arguments)
        }, nt = 1, ft = 2, tt = 3, l = 4, p;
    if (r.readyState === "complete") e(); else if (r.addEventListener) r.addEventListener("DOMContentLoaded", k, !1), n.addEventListener("load", e, !1); else {
        r.attachEvent("onreadystatechange", k);
        n.attachEvent("onload", e);
        p = !1;
        try {
            p = !n.frameElement && r.documentElement
        } catch (wt) {
        }
        p && p.doScroll && function pt() {
            if (!o) {
                try {
                    p.doScroll("left")
                } catch (t) {
                    n.clearTimeout(i.readyTimeout);
                    i.readyTimeout = n.setTimeout(pt, 50);
                    return
                }
                e()
            }
        }()
    }
    i.load = i.js = ut ? lt : ct;
    i.test = ot;
    i.ready = yt;
    i.ready(r, function () {
        y() && u(h.ALL, function (n) {
            f(n)
        });
        i.feature && i.feature("domloaded", !0)
    })
})(window);

var hna = window.hna || {};
//开发环境和生产环境标识production
hna._env = "";

//航司编号
hna._code = "8L";

//全局语言
hna._lang_type = "zh_CN";
hna._langTypeStoreKey = "lang_type";

//设置全局的币别
hna._currency = {
    "code": "CNY",
    "name": "人民币",
    "symbol": "￥"
};

//全局的静态资源路径前缀
hna._static_host = "";

//图片的基本路径
hna._img_host = "";

//全局的页面路由路径前缀
hna._server_host = "";

//全局的请求接口路径前缀
hna._interface_host = "";

//全局的MMV路径前缀
hna._mmv_host = "";

//全局的版本号
hna._version = "";

//本地存储的数据默认保存时间 一天
hna._exp = 24 * 60 * 60 * 1000;

hna.hnaLoader = (function () {

    var _config = {};

    var _setConfig = function (cfg) {
        _config = cfg;
    };

    var _loadScript = function (_arr, _callback) {
        if (_arr instanceof Array) {
            _arr = _arr.unique();
        } else {
            _arr = [];
        }

        var jsList = [];
        for (var i = 0; i < _arr.length; i++) {
            var item = _config.paths[_arr[i]];
            if (!item) {
                //console.log(_arr[i] + " is not found");
            }
            else {
                if (item.indexOf("http://") <= -1) {
                    item = _config.baseUrl + item;
                }
                jsList.push(item + ".js?" + _config.urlArgs);
            }
        }

        hnaload.js(jsList, _callback);
    };

    return {
        setConfig: _setConfig,
        load: _loadScript
    }
})();


// 根据配置加载所需模块
var scripts = document.getElementsByTagName("script");
for (var i = 0; i < scripts.length; i++) {
    // 获取页面所需加载模块入口名称
    hna._page_id = scripts[i].getAttribute("data-page-id") || "";
    if (hna._page_id) {
        hna._version = scripts[i].getAttribute("data-version") || "1.0";
        hna._static_host = scripts[i].getAttribute("data-static-host") || "";
        hna._img_host = scripts[i].getAttribute("data-img-host") || "";
        hna._server_host = scripts[i].getAttribute("data-server-host") || "";
        hna._interface_host = scripts[i].getAttribute("data-interface-host") || "";
        hna._mmv_host = scripts[i].getAttribute("data-mmv-host") || "";
        hna._env = scripts[i].getAttribute("data-env") || "";
        hna.hnaLoader.setConfig(getConfig(hna));
        loadPageScript(hna._page_id);
        break;
    }
}
