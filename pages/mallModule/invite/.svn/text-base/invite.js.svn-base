var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = require("../../../api/memberService.js"), o = require("../../../api/smsService.js"), a = require("../../../api/storeService.js"), n = require("../../../api/wxaUserService.js"), i = require("../../../utils/auth.js"), s = require("../../../utils/utils.js"), r = require("../../../utils/navPage.js"), c = getApp();

Page({
    data: {
        modal: !1,
        mobile: "15372005595",
        showMobile: "",
        captcha: "",
        getCodeBtn: "获取验证码",
        getCodeColor: "#333333",
        prompt: !1,
        entrance: "inviter",
        inviteStatus: "success",
        marginTop: "270rpx",
        marginBottom: "0rpx",
        paddingBottom: "0",
        hasUserInfo: !1,
        sceneArray: [],
        userInfo: {},
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        member: {},
        stores: {}
    },
    clickActivity: function() {
        this.data.modal ? this.setData({
            modal: !1
        }) : this.setData({
            modal: !0
        });
    },
    clickActivityBody: function() {},
    clickPrompt: function() {
        this.data.prompt ? this.setData({
            prompt: !1
        }) : this.setData({
            prompt: !0
        });
    },
    clickPromptBody: function() {},
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
    handleBindFocus: function() {
        this.setData({
            marginBottom: "-336rpx"
        });
    },
    handleBindBlur: function() {
        this.setData({
            marginBottom: "0"
        });
    },
    getCaptcha: function() {
        if (this.checkMobile() && "#333333" === this.data.getCodeColor) {
            var t = 60, e = this;
            this.setData({
                getCodeColor: "#e5e5e5",
                getCodeBtn: t + "s"
            });
            var a = setInterval(function() {
                t--, e.setData({
                    getCodeBtn: t + "s"
                }), t <= 0 && (e.setData({
                    getCodeBtn: "获取验证码",
                    getCodeColor: "#333333"
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
    bindMobile: function() {
        var o = this, a = o.data.sceneArray;
        if (this.checkMobile() && this.checkCaptcha()) {
            var i = {
                captcha: o.data.captcha,
                inviteeMobile: o.data.mobile,
                sourceType: "WX_XCX"
            };
            "member" === o.options.type ? i = t({}, i, {
                introducerId: o.options.shareId
            }) : "user" === o.options.type ? i = t({}, i, {
                introducerId: o.options.shareId
            }) : o.options.scene && ("user" === a[0] ? i = t({}, i, {
                introducerId: a[1]
            }) : "member" === a[0] ? i = t({}, i, {
                introducerId: a[1]
            }) : "store" === a[0] ? i = t({}, i, {
                introduceStoreId: a[1]
            }) : o.data.stores.id && (i = t({}, i, {
                introduceStoreId: o.data.stores.id
            }))), e.invite(i).then(function(t) {
                console.log(t), c.globalData.userInfo && c.globalData.userInfo.member && n.bindMobile(o.data.mobile, o.data.captcha).then(function(t) {
                    console.log(t), n.login().then(function(t) {
                        console.log(t), t.member && wx.setStorage({
                            key: "wj_member",
                            data: t.member
                        });
                    });
                }), o.setData({
                    entrance: "success",
                    inviteStatus: "success",
                    showMobile: o.data.mobile.replace(/^(\d{3}).*(\d{4}$)/, "$0****$1"),
                    prompt: !0
                });
            }).catch(function(t) {
                "您已经是会员用户，可以直接去下单了" === t.message ? o.setData({
                    prompt: !0,
                    inviteStatus: "again"
                }) : "您已经被邀请，请您注册会员" === t.message ? o.setData({
                    prompt: !0,
                    inviteStatus: "again"
                }) : wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    },
    test: function() {
        this.setData({
            entrance: "success",
            inviteStatus: "success",
            showMobile: this.data.mobile.replace(/^(\d{3})(\d)*(\d{4}$)/, "$1****$3"),
            prompt: !0
        });
    },
    getUserInfo: function(t) {
        console.log(t);
        t.detail.userInfo && (c.globalData.userInfo = t.detail.userInfo, wx.setStorage({
            key: "wj_userInfo",
            data: t.detail.userInfo
        }), n.login().then(function(t) {
            console.log(t), i.setUser(t), c.globalData.userInfo = t, t.member && wx.setStorage({
                key: "wj_member",
                data: t.member
            });
        }));
    },
    toIndex: function() {
        r.toHome();
    },
    checkAuth: function() {
        return !!c.globalData.userInfo;
    },
    onLoad: function(t) {
        var e = this;
        if (console.log(t), t.type) this.setData({
            entrance: "invitee",
            marginTop: "360rpx"
        }); else if (t.scene) {
            var o = decodeURIComponent(t.scene);
            if (o.indexOf(",") > 0) {
                var n = o.split(",");
                console.log(n), this.setData({
                    entrance: "invitee",
                    sceneArray: n
                });
            } else a.queryList().then(function(t) {
                console.log(t);
                var a = null, n = [];
                if (t && t.length > 0) {
                    t.forEach(function(t) {
                        t.id === o && (a = t, c.globalData.storeInfo = t), "OPEN" === t.status && n.push(t);
                    });
                    try {
                        wx.setStorageSync("wj_allStores", n);
                    } catch (t) {
                        console.log(t);
                    }
                    a ? e.setData({
                        stores: a,
                        entrance: "invitee"
                    }) : wx.getLocation({
                        type: "gcj02",
                        success: function(t) {
                            var o = t.latitude, a = t.longitude;
                            if (n.length > 0) {
                                var i = e.getNearestStore(n, o, a);
                                c.globalData.storeInfo = n[i], e.setData({
                                    entrance: "invitee"
                                });
                            }
                        }
                    });
                }
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        } else c.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), c.globalData.userInfo.member ? e.setData({
            member: c.globalData.userInfo.member
        }) : e.setData({
            hasUserInfo: !1
        }));
        if (e.options.mobile && "" != e.options.mobile && void 0 != e.options.mobile) {
            var i = e.options.mobile;
            try {
                wx.setStorageSync("wj_sharingId", i);
            } catch (t) {}
        }
        this.getSharePictures();
    },
    getNearestStore: function(t, e, o) {
        var a = [];
        t.forEach(function(t) {
            var n = s.distance(e, o, t.latitude, t.longitude);
            a.push(n);
        });
        for (var n = Math.min.apply(Math, a), i = 0, r = 0; r < a.length; r++) if (n === a[r]) {
            i = r;
            break;
        }
        return this.setData({
            stores: t[i]
        }), i;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    toShare: function() {
        c.globalData.userInfo ? c.globalData.userInfo.member || wx.showToast({
            title: "您还不是会员，请先绑定手机号码成为会员~",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "您还未授权登陆，请登陆后再邀请好友哦~",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function(t) {
        var e = this.checkAuth(), o = this.data.sharePictures;
        if (e) {
            var a = "";
            return "button" === t.from ? (console.log(t.target), a = this.data.member.id) : this.data.member.id && (a = this.data.member.id), 
            {
                title: "鲜丰水果，新鲜才好吃！",
                imageUrl: o,
                path: "/pages/mallModule/invite/invite?type=member&shareId=" + a + "&mobile=" + a
            };
        }
        return {
            title: "鲜丰水果，新鲜才好吃！",
            imageUrl: o,
            path: "/pages/mallModule/index/index/index"
        };
    },
    getSharePictures: function() {
        var t = this;
        s.getSharePictures("INVITE_MEMBER").then(function(e) {
            t.setData({
                sharePictures: e
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});