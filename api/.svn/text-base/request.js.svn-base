function e() {
    return new Promise(function(e, o) {
        wx.login({
            success: function(t) {
                console.debug("!!!微信登录返回结果-----" + JSON.stringify(t)), t.code ? e(t.code) : o({
                    code: -1,
                    message: t.errMsg
                });
                console.log(t)
            },
            fail: function(e) {
                console.debug("!!!微信登录失败返回结果-----" + JSON.stringify(e)), console.log(e), s.clearUserInfo(), 
                o({
                    code: -1,
                    message: e.errMsg
                });
            }
        });
    });
}

function o() {
    return new Promise(function(e, o) {
        wx.getUserInfo({
            success: function(o) {
                e(o);
            },
            fail: function(e) {
                console.log(e), o({
                    code: -1,
                    message: e.errMsg
                });
            }
        });
    });
}

var t = Object.assign || function(e) {
    for (var o = 1; o < arguments.length; o++) {
        var t = arguments[o];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, n = require("../utils/utils.js"), s = require("../utils/auth.js"), r = -99999, i = 19, a = 20, c = 21, u = {
    appId: "wxaff71394fc5a164e",
    baseUrl: "https://newretail2.xianfengsg.com"
}, l = wx.getExtConfigSync ? wx.getExtConfigSync() : u, d = l.appId || u.appId, f = l.baseUrl || u.baseUrl, g = "";

wx.getSystemInfo({
    success: function(e) {
        g = "wxapp-" + e.version;
    }
}), module.exports.APP_ID = d, module.exports.BASE_URL = f, module.exports.APP_VERSION = "wxapp-2.0.3.4".split("-")[1], 
module.exports.request = function(e) {
    function o(o, d, f) {
        if (o.statusCode >= 200 && o.statusCode < 300) {
            var g = o.data;
            if (0 == g.code) {
                if (e.indexOf("/mall/store/queryList") >= 0) {
                    var w = n.timestampToTime(Number(g.timestamp));
                    try {
                        wx.setStorageSync("wj_queryStoreTime", w);
                    } catch (e) {}
                }
                d(g.data);
            } else if (g.code != a && g.code != i) g.code != c ? f(g) : (g = t({}, g, {
                // message: "您还没有登录哦~"
            }), f(g)); else {
                var h = l;
                x.login().then(function(o) {
                    n.setHideLoading(!0), x.request(e, u, h, p, m).then(function(e) {
                        d(e);
                    }).catch(function(e) {
                        f(e);
                    });
                }).catch(function(e) {
                    console.log(e, g), s.clearUserInfo();
                });
            }
        } else f({
            code: r,
            message: "服务器繁忙，请稍后再试~"
        });
    }
    var u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "GET", l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, p = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "json", m = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "json", x = this;
    console.log(f + e);
    var w = {};
    w["content-type"] = "json" == p ? "application/json" : "application/x-www-form-urlencoded";
    try {
        var h = wx.getStorageSync("wj_wxa_formId");
        console.log(h), h && (w["wxa-form-id"] = h, wx.removeStorageSync("wj_wxa_formId"));
    } catch (e) {
        console.log(e);
    }
    w["app-version"] = "wxapp-2.0.3.4", w["os-version"] = g, w["api-version"] = "0.0.5", 
    w["wxa-appid"] = d;
    var v = s.getTokens();
    return v && v.accessToken && (w["access-token"] = v.accessToken), new Promise(function(t, s) {
        n.isHideLoading() || wx.showLoading({
            mask: !0
        });
        var r = e;
        /^http:/gi.test(e) || (r = f + e);
        var i = wx.request({
            url: r,
            method: u,
            dataType: m,
            data: l,
            header: w,
            success: function(e) {
                o(e, t, s);
            },
            fail: function(e) {
                console.error(r + " 请求失败返回: " + JSON.stringify(e));
                var o = e.errMsg, t = -1;
                o.indexOf("timeout") >= 0 && (t = -1001, i.abort(), o = "网络出小差了~"), o.indexOf("request:fail") >= 0 && (o = "服务器繁忙，请稍后再试~"), 
                s({
                    code: t,
                    message: o
                });
            },
            complete: function() {
                console.log(), -1 === e.indexOf("getPayRound") && wx.hideLoading();
            }
        });
    });
}, module.exports.login = function() {
    var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], n = this, r = "";
    return e().then(function(e) {
        return r = e, o();
    }).then(function(e) {
        var o = null;
        t && (o = {
            encryptedData: e.encryptedData,
            iv: e.iv
        });
        console.log(e)
        var s = {
            appid: d,
            code: r,
            encryptedUserInfo: o
        };
        return n.post("/newretail/api/wxa/login", s);
    }).then(function(e) {
        return s.setTokens(e), e;
    });
}, module.exports.DEF_APP_CONFIG = u, module.exports.get = function(e, o) {
    return this.request(e, "GET", o);
}, module.exports.post = function(e, o) {
    return this.request(e, "POST", o);
}, module.exports.put = function(e, o) {
    return this.request(e, "PUT", o);
}, module.exports.delete = function(e, o) {
    return this.request(e, "DELETE", o);
};