var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = require("../../../api/wxaUserService.js"), o = require("../../../api/smsService.js"), a = require("../../../utils/auth.js"), n = getApp();

Page({
    data: {
        mobile: "",
        captcha: "",
        getCodeBtn: "获取验证码",
        getCodeBgColor: "#3CDBC0"
    },
    bindMobileInput: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    bindcaptchaInput: function(t) {
        this.setData({
            captcha: t.detail.value
        });
    },
    getCaptcha: function() {
        if (this.checkMobile() && "#3CDBC0" === this.data.getCodeBgColor) {
            var t = 60, e = this;
            this.setData({
                getCodeBgColor: "#bbb",
                getCodeBtn: t + "s"
            });
            var a = setInterval(function() {
                t--, e.setData({
                    getCodeBtn: t + "s"
                }), t <= 0 && (e.setData({
                    getCodeBtn: "获取验证码",
                    getCodeBgColor: "#3CDBC0"
                }), clearInterval(a));
            }, 1e3);
            o.sendSms(this.data.mobile).then(function(t) {
                console.log(t);
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    },
    checkMobile: function() {
        var t = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        return this.data.mobile ? !!t.test(this.data.mobile) || (wx.showToast({
            title: "请填写正确的手机号",
            icon: "none",
            duration: 2e3
        }), !1) : (wx.showToast({
            title: "请填写手机号",
            icon: "none",
            duration: 2e3
        }), !1);
    },
    checkCaptcha: function() {
        return !!this.data.captcha || (wx.showToast({
            title: "请填写验证码",
            icon: "none",
            duration: 2e3
        }), !1);
    },
    toAdPage: function(t) {
        try {
            wx.setStorageSync("webUrl", "https://xianfengxcx.gomoretech.com/newretail-admin/#/xfAgreement");
        } catch (t) {}
        wx.navigateTo({
            url: "../advertising/advertising?from=bindMobile"
        });
    },
    bindMobile: function(t) {
        console.log(t);
        var o = this;
        if (this.checkAuth()) if (this.checkMobile() && this.checkCaptcha() && "#3CDBC0" !== this.data.getCodeBgColor) {
            try {
                wx.setStorageSync("wj_wxa_formId", t.detail.formId);
            } catch (t) {}
            var a = "";
            if (n.globalData.storeInfo && (console.log(n.globalData.storeInfo), n.globalData.systemConfigure.memberAscriptionStoreDistance && n.globalData.storeInfo.distance)) {
                var i = n.globalData.storeInfo.distance;
                (i = parseFloat(1e3 * i)) < n.globalData.systemConfigure.memberAscriptionStoreDistance && (console.log(i, n.globalData.systemConfigure.memberAscriptionStoreDistance), 
                a = n.globalData.storeInfo.id);
            }
            e.bindMobile(this.data.mobile, this.data.captcha, "WXAPP", a).then(function(t) {
                console.log(t), o.getLoginInfo();
            }).catch(function(t) {
                wx.showToast({
                    title: "绑定失败",
                    icon: "none",
                    duration: 2e3
                });
            });
        } else "#3CDBC0" === this.data.getCodeBgColor && wx.showToast({
            title: "请获取验证码！",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "您还未授权登陆，请登陆后绑定手机号哦~",
            icon: "none",
            duration: 2e3
        });
    },
    getLoginInfo: function() {
        e.login().then(function(t) {
            console.log(t), t.member ? (a.setUser(t), wx.showToast({
                title: "绑定成功",
                icon: "none",
                duration: 2e3
            }), n.globalData.userInfo = t) : wx.showToast({
                title: "绑定失败",
                icon: "none",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateTo({
                    url: "../index/index"
                });
            }, 2e3);
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    checkAuth: function() {
        return !!n.globalData.userInfo;
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.getMemberUserInfo();
        var e = this;
        if (qqmapsdk = new QQMapWX({
            key: "M4TBZ-4KSRI-DQPGJ-54BUF-UUJX5-YKFH3"
        }), n.globalData.addressInfo) {
            console.log(n.globalData.addressInfo);
            var o = n.globalData.addressInfo.lat, a = n.globalData.addressInfo.lng;
            e.getAllStoreInfo(o, a);
        } else wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var o = t.latitude, a = t.longitude;
                e.getAllStoreInfo(o, a);
            }
        });
    },
    getMemberUserInfo: function() {
        n.globalData.userInfo || wx.showToast({
            title: "您还未授权，请登陆授权",
            icon: "none",
            duration: 2e3
        });
    },
    getAllStoreInfo: function(t, e) {
        var o = this;
        try {
            var a = wx.getStorageSync("wj_allStores");
            if (a) {
                var i = o.getNearestStore(a, t, e);
                n.globalData.storeInfo = a[i], o.calcStoreDistance(a[i], t, e), address.getAllStore();
            } else storeService.queryList().then(function(a) {
                var n = [];
                a.forEach(function(t) {
                    "OPEN" === t.status && n.push(t);
                });
                try {
                    wx.setStorageSync("wj_allStores", n);
                } catch (t) {
                    console.log(t);
                }
                var i = o.getNearestStore(n, t, e);
                return n[i];
            }).then(function(a) {
                n.globalData.storeInfo = a, o.calcStoreDistance(a, t, e);
            });
        } catch (t) {}
    },
    getNearestStore: function(t, e, o) {
        var a = [];
        t.forEach(function(t) {
            var n = utils.distance(e, o, t.latitude, t.longitude);
            a.push(n);
        });
        for (var n = Math.min.apply(Math, a), i = 0, s = 0; s < a.length; s++) if (n === a[s]) {
            i = s;
            break;
        }
        return this.setData({
            store: t[i].name,
            storeId: t[i].id
        }), i;
    },
    calcStoreDistance: function(e, o, a) {
        var i = utils.distance(o, a, e.latitude, e.longitude), s = t({}, e, {
            distance: i
        });
        n.globalData.storeInfo = s, this.setData({
            storeInfo: s
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});