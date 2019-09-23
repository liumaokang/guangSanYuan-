var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a]);
    }
    return e;
}, t = require("../../../../api/wxaUserService.js"), o = require("../../../../utils/auth.js"), a = require("../../../../utils/utils.js"), n = require("../../../../utils/address.js"), s = require("../../../../utils/navPage.js"), i = getApp();

Page({
    data: {
        hasUserInfo: !1,
        homeBack: !1
    },
    onLoad: function(e) {
        var t = this;
        i.globalData.userInfo && this.setData({
            hasUserInfo: !0
        }), i.globalData.storeInfo ? (console.log(i.globalData.storeInfo, "1"), this.calcStoreDistance(i.globalData.storeInfo, i.globalData.storeInfo.userLatitude, i.globalData.storeInfo.userLongitude)) : n.getLocation().then(function(e) {
            i.globalData.storeInfo = e, t.calcStoreDistance(e, e.userLatitude, e.userLongitude);
        }), 1 === getCurrentPages().length && this.setData({
            homeBack: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getUserInfo: function(e) {
        var a = this, n = this;
        e && wx.setStorage({
            key: "wj_userInfo",
            data: e.detail.userInfo
        }), t.login().then(function(e) {
            o.setUser(e), i.globalData.userInfo = e, e.member ? (wx.setStorage({
                key: "wj_member",
                data: e.member
            }), a.data.homeBack ? wx.reLaunch({
                url: "/pages/mallModule/index/index/index"
            }) : wx.navigateBack({
                delta: 1
            })) : n.setData({
                hasUserInfo: !0
            });
        }).catch(function(e) {
            n.setData({
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
        var a = this, n = "";
        if (e.detail.errMsg.indexOf("ok") >= 0) {
            if (i.globalData.storeInfo && (console.log(i.globalData.storeInfo), i.globalData.systemConfigure.memberAscriptionStoreDistance && i.globalData.storeInfo.distance)) {
                var r = i.globalData.storeInfo.distance;
                (r = parseFloat(1e3 * r)) < i.globalData.systemConfigure.memberAscriptionStoreDistance && (n = i.globalData.storeInfo.id);
            }
            t.bindMobileByEncrypt(e.detail.encryptedData, e.detail.iv, "WXAPP", n).then(function(e) {
                return t.login();
            }).then(function(e) {
                o.setUser(e), i.globalData.userInfo = e, e.member ? (wx.setStorage({
                    key: "wj_member",
                    data: e.member
                }), wx.showToast({
                    title: "绑定成功~",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 500)) : (a.setData({
                    hasUserInfo: !0
                }), wx.showToast({
                    title: "绑定失败~",
                    icon: "none",
                    duration: 2e3
                }));
            }).catch(function(e) {
                23002 === e.code ? a.getUserInfo() : wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        } else wx.showModal({
            title: "提示",
            content: "获取手机号失败，是否手动绑定手机号",
            success: function(e) {
                if (e.confirm) {
                    s.toBindMobile("?from=authorize");
                }
            }
        });
    },
    toBindMobile: function() {
        s.toBindMobile("?from=authorize");
    },
    calcStoreDistance: function(t, o, n) {
        var s = a.distance(o, n, t.latitude, t.longitude), r = e({}, t, {
            distance: s
        });
        i.globalData.storeInfo = r;
    }
});