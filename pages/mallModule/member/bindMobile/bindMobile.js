var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = require("../../../../api/wxaUserService.js"), o = require("../../../../api/smsService.js"), a = (require("../../../../api/storeService.js"), 
require("../../../../utils/auth.js")), n = require("../../../../utils/utils.js"), i = require("../../../../utils/navPage.js"), s = require("../../../../utils/address.js"), r = getApp();

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
        if (this.checkMobile() && "#333333" === this.data.getCodeBgColor) {
            var t = 60, e = this;
            this.setData({
                getCodeBgColor: "#999999",
                getCodeBtn: "(" + t + ") 重新获取"
            });
            var a = setInterval(function() {
                t--, e.setData({
                    getCodeBtn: "(" + t + ") 重新获取"
                }), t <= 0 && (e.setData({
                    getCodeBtn: "获取验证码",
                    getCodeBgColor: "#333333"
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
        i.toAdvertising("?from=bindMobile");
    },
    bindbox: function() {},
    bindMobile: function(t) {
        var o = this;
        if (this.checkAuth()) if (this.checkMobile() && this.checkCaptcha() && "#3CDBC0" !== this.data.getCodeBgColor) {
            try {
                wx.setStorageSync("wj_wxa_formId", t.detail.formId);
            } catch (t) {}
            var i = "";
            if (r.globalData.storeInfo && r.globalData.systemConfigure.memberAscriptionStoreDistance && r.globalData.storeInfo.distance) {
                var s = r.globalData.storeInfo.distance;
                (s = parseFloat(1e3 * s)) < r.globalData.systemConfigure.memberAscriptionStoreDistance && (i = r.globalData.storeInfo.id);
            }
            e.bindMobile(this.data.mobile, this.data.captcha, "WXAPP", i).then(function(t) {
                if (console.log(t), n.isHideLoading() && n.setHideLoading(!1), t.member) {
                    a.setUser(t), wx.showToast({
                        title: "绑定成功",
                        icon: "none",
                        duration: 2e3
                    }), r.globalData.userInfo = t;
                    try {
                        wx.setStorageSync("wj_member", t.member);
                    } catch (t) {}
                } else wx.showToast({
                    title: "绑定失败",
                    icon: "none",
                    duration: 2e3
                });
                setTimeout(function() {
                    "authorize" === o.options.from ? wx.navigateBack({
                        delta: 2
                    }) : wx.navigateBack({
                        delta: 1
                    });
                }, 500);
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
        return !!r.globalData.userInfo;
    },
    onLoad: function(t) {
        wx.hideShareMenu(), this.getMemberUserInfo();
        var e = this;
        s.getLocation().then(function(t) {
            r.globalData.storeInfo = t, e.calcStoreDistance(t, t.userLatitude, t.userLongitude);
        }).catch(function(t) {
            console.log(t);
        });
    },
    getMemberUserInfo: function() {
        r.globalData.userInfo || wx.showToast({
            title: "您还未授权，请登陆授权",
            icon: "none",
            duration: 2e3
        });
    },
    calcStoreDistance: function(e, o, a) {
        var i = n.distance(o, a, e.latitude, e.longitude), s = t({}, e, {
            distance: i
        });
        r.globalData.storeInfo = s, this.setData({
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