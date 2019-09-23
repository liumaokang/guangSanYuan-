function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, o = require("../../api/wxaUserService.js"), n = (require("../../api/systemService.js"), 
require("../../api/storeService.js"), require("../../utils/auth.js")), a = require("../../utils/utils.js"), i = require("../../utils/address.js"), s = getApp();

Component({
    properties: {
        onClickLogin: {
            type: Boolean,
            value: !0
        },
        showPhone: Boolean,
        onPopupPhone: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        show: {
            middle: !1,
            login: !1,
            phone: !1
        },
        overlayStyle: "",
        hasPhoneNumber: !1,
        phoneNumber: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        name: "",
        company: "",
        phone: ""
    },
    attached: function() {},
    ready: function() {
        s.globalData.userInfo ? this.data.show.login && this.setData(e({}, "show.login", !1)) : (this.setData(e({}, "show.login", !0)), 
        this.handleTabBar(!1));
    },
    show: function() {},
    pageLifetimes: {
        show: function() {}
    },
    methods: {
        onSuccess: function() {
            this.triggerEvent("login-result"), this.handleTabBar(!0), this.data.onClickLogin && this.triggerEvent("login");
        },
        onPopupPhone: function() {
            this.triggerEvent("popup-phone"), this.data.onPopupPhone || this.triggerEvent("phone");
        },
        handleTabBar: function(e) {
            var t = {
                showTabbar: e
            }, o = {};
            this.triggerEvent("tabBar", t, o);
        },
        triggerBindMobile: function(e) {
            var t = {
                bindMobile: e
            }, o = {};
            this.triggerEvent("phone", t, o);
        },
        getUserInfo: function(e) {
            var t = this, a = this;
            e && wx.setStorage({
                key: "wj_userInfo",
                data: e.detail.userInfo
            }), o.login().then(function(e) {
                n.setUser(e), s.globalData.userInfo = e, e.member ? (a.data.show.login && a.toggleMiddlePopup(), 
                a.triggerBindMobile(!0), a.setData({
                    hasUserInfo: !0
                }), wx.setStorage({
                    key: "wj_member",
                    data: e.member
                })) : (a.setData({
                    user: e.wxaUser,
                    hasUserInfo: !0
                }), a.toggleMiddlePopup()), a.onSuccess();
            }).catch(function(e) {
                t.setData({
                    hasUserInfo: !1
                }), e.message.indexOf("auth deny") >= 0 ? wx.showToast({
                    title: "您拒绝了授权~",
                    icon: "none",
                    duration: 2e3
                }) : wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        },
        getPhoneNumber: function(e) {
            var t = this;
            i.getLocation().then(function(e) {
                console.log(e, 1), t.calcStoreDistance(e, e.userLatitude, e.userLongitude);
            }), e.detail.errMsg.indexOf("ok") >= 0 ? o.parseWxaMobile(e.detail.encryptedData, e.detail.iv).then(function(o) {
                t.setData({
                    hasPhoneNumber: !0,
                    phoneNumber: o,
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv
                });
            }).catch(function(e) {
                wx.showToast({
                    title: "未知错误，即将跳转到手动绑定手机号",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/mallModule/member/bindMobile/bindMobile"
                    });
                }, 2e3);
            }) : (wx.showToast({
                title: "获取手机号失败，即将跳转到手动绑定手机号",
                icon: "none",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateTo({
                    url: "/pages/mallModule/member/bindMobile/bindMobile"
                });
            }, 2e3));
        },
        toBindMobile: function() {
            wx.navigateTo({
                url: "/pages/mallModule/member/bindMobile/bindMobile"
            });
        },
        handleBindMobile: function() {
            var e = this, t = "";
            if (s.globalData.storeInfo && (console.log(s.globalData.storeInfo), s.globalData.systemConfigure.memberAscriptionStoreDistance && s.globalData.storeInfo.distance)) {
                var n = s.globalData.storeInfo.distance;
                (n = parseFloat(1e3 * n)) < s.globalData.systemConfigure.memberAscriptionStoreDistance && (t = s.globalData.storeInfo.id);
            }
            o.bindMobileByEncrypt(this.data.encryptedData, this.data.iv, "WXAPP", t).then(function(t) {
                e.triggerBindMobile(!0);
            }).then(function(t) {
                e.getUserInfo();
            }).catch(function(t) {
                23002 === t.code ? (e.triggerBindMobile(!0), e.getUserInfo()) : wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        },
        toggleBottomPopup: function() {
            this.toggle("middle");
        },
        toggleMiddlePopup: function() {
            this.toggle("login");
        },
        togglePhonePopup: function() {
            this.toggle("phone"), this.data.show.phone || this.triggerBindMobile(!0);
        },
        catchtouchmove: function() {},
        toggle: function(t) {
            var o;
            this.setData((o = {}, e(o, "show." + t, !this.data.show[t]), e(o, "overlayStyle", this.data.overlayStyle), 
            o));
        },
        calcStoreDistance: function(e, o, n) {
            var i = a.distance(o, n, e.latitude, e.longitude), r = t({}, e, {
                distance: i
            });
            s.globalData.storeInfo = r, this.setData({
                storeInfo: r
            });
        },
        saveCustomerInfo: function(e) {
            var t = this, o = t.data.company, n = t.data.name, a = t.data.phone, i = s.globalData.userInfo.wxaUser.openId;
            "" !== o && "" !== n && this.checkMobile(a) ? wxaExperienceService.create(o, a, n, i).then(function(e) {
                wx.showToast({
                    title: "信息提交成功~",
                    icon: "none",
                    duration: 1e3
                }), setTimeout(function() {
                    t.toggle("customer"), t.onSuccess();
                }, 1e3);
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            }) : "" == n ? wx.showToast({
                title: "请输入姓名~",
                icon: "none",
                duration: 2e3
            }) : "" == o ? wx.showToast({
                title: "请输入公司名称~",
                icon: "none",
                duration: 2e3
            }) : "" == a && wx.showToast({
                title: "请输入联系方式~",
                icon: "none",
                duration: 2e3
            });
        },
        checkMobile: function(e) {
            var t = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            return e ? !!t.test(e) || (wx.showToast({
                title: "请填写正确的手机号",
                icon: "none",
                duration: 2e3
            }), !1) : (wx.showToast({
                title: "请填写手机号",
                icon: "none",
                duration: 2e3
            }), !1);
        },
        handleName: function(e) {
            e.detail.cursor < 5 ? this.setData({
                name: e.detail.value
            }) : 5 === e.detail.cursor && (this.setData({
                name: e.detail.value
            }), wx.showToast({
                title: "联系人昵称最大不能超10个字符哦~",
                icon: "none",
                duration: 2e3
            }));
        },
        handleCompany: function(e) {
            e.detail.cursor < 20 ? this.setData({
                company: e.detail.value
            }) : 20 === e.detail.cursor && (this.setData({
                company: e.detail.value
            }), wx.showToast({
                title: "公司名称最大不能超20个字符哦~",
                icon: "none",
                duration: 2e3
            }));
        },
        handleInputPhone: function(e) {
            this.setData({
                phone: e.detail.value
            });
        }
    }
});