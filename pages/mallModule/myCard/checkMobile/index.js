var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
}, e = require("../../../../api/wxaUserService.js"), o = require("../../../../api/smsService.js"), n = (require("../../../../api/storeService.js"), 
require("../../../../utils/auth.js"), require("../../../../utils/utils.js")), a = require("../../../../utils/navPage.js"), i = require("../../../../utils/address.js"), s = getApp();

Page({
    data: {
        mobile: "",
        captcha: "",
        agree: !0,
        getCodeBtn: "获取验证码",
        getCodeBgColor: "#333333"
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
    toggleAgree: function() {
        this.setData({
            agree: !this.data.agree
        });
    },
    getCaptcha: function() {
        if ("#333333" === this.data.getCodeBgColor) {
            var t = 60, e = this;
            this.setData({
                getCodeBgColor: "#999999",
                getCodeBtn: "(" + t + ") 重新获取"
            });
            var n = setInterval(function() {
                t--, e.setData({
                    getCodeBtn: "(" + t + ") 重新获取"
                }), t <= 0 && (e.setData({
                    getCodeBtn: "获取验证码",
                    getCodeBgColor: "#333333"
                }), clearInterval(n));
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
        return !!this.data.mobile || (wx.showToast({
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
        a.toAdvertising("?from=bindMobile");
    },
    bindbox: function() {},
    bindMobile: function(t) {
        if (this.checkAuth()) if (this.checkMobile() && this.checkCaptcha() && "#3CDBC0" !== this.data.getCodeBgColor) {
            try {
                wx.setStorageSync("wj_wxa_formId", t.detail.formId);
            } catch (t) {}
            e.checkMobile(this.data.mobile, this.data.captcha).then(function(t) {
                console.log(t), n.isHideLoading() && n.setHideLoading(!1), a.toResetPassword();
            }).catch(function(t) {
                console.log(t), wx.showToast({
                    title: t.message,
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
    checkAuth: function() {
        return !!s.globalData.userInfo;
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.getMemberUserInfo();
        var e = this;
        i.getLocation().then(function(t) {
            s.globalData.storeInfo = t, e.calcStoreDistance(t, t.userLatitude, t.userLongitude);
        }).catch(function(t) {
            console.log(t);
        });
    },
    getMemberUserInfo: function() {
        if (s.globalData.userInfo) {
            var t = wx.getStorageSync("wj_member").mobile;
            if (!t) return wx.showToast({
                title: "请先绑定手机号",
                icon: "none",
                duration: 2e3
            }), void wx.navigateBack();
            this.setData({
                mobile: t
            });
        } else wx.showToast({
            title: "您还未授权，请登陆授权",
            icon: "none",
            duration: 2e3
        });
    },
    calcStoreDistance: function(e, o, a) {
        var i = n.distance(o, a, e.latitude, e.longitude), c = t({}, e, {
            distance: i
        });
        s.globalData.storeInfo = c, this.setData({
            storeInfo: c
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