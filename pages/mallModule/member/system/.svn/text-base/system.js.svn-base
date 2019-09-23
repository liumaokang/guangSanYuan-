var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, t = require("../../../../api/request.js"), o = require("../../../../api/userService.js"), n = require("../../../../utils/navPage.js"), a = (require("../../../../utils/authorize.js"), 
require("../../../../utils/auth.js")), i = require("../../../../utils/utils.js"), r = getApp();

Page({
    data: {
        version: "0.0.1",
        location: {
            latitude: 0,
            longitude: 0
        }
    },
    onLoad: function(e) {
        wx.hideShareMenu(), r.globalData.location.latitude ? this.setData({
            version: t.APP_VERSION,
            location: {
                latitude: r.globalData.location.latitude.toFixed(6),
                longitude: r.globalData.location.longitude.toFixed(6)
            }
        }) : this.setData({
            version: t.APP_VERSION,
            location: {
                latitude: 0,
                longitude: 0
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getLoc: function() {
        var e = this;
        ADDRESS.getLocation().then(function(t) {
            e.calcStoreDistance(t, t.userLatitude, t.userLongitude);
        });
    },
    calcStoreDistance: function(t, o, n) {
        var a = i.distance(o, n, t.latitude, t.longitude), s = e({}, t, {
            distance: a
        });
        r.globalData.storeInfo = s, this.setData({
            storeInfo: s
        });
    },
    toCouponCenter: function() {
        n.toCouponCenter("?type=admin");
    },
    copyLocation: function() {
        var e = this.data.location.latitude + "," + this.data.location.longitude;
        wx.setClipboardData({
            data: e,
            success: function(e) {
                wx.hideToast(), wx.showToast({
                    title: "位置信息复制成功",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    logout: function() {
        wx.clearStorageSync();
        wx.showToast({
          title: '退出成功',
          success:function(){
            wx.reLaunch({
              url: '/pages/mallModule/index/index/index',
            })
          }
        })
       
        // wx.showModal({
        //     title: "提示",
        //     content: "是否确认解绑会员，解绑后需重新绑定会员手机号",
        //     success: function(e) {
        //         e.confirm && (i.setHideLoading(!1), o.phoneUnbind().then(function(e) {
        //             a.clearUserInfo(), r.globalData.storeInfo = null, r.globalData.memberInfo = null, 
        //             r.globalData.addressInfo = null, r.globalData.storeInfo = null, 
        //             n.toAuthorize();
                    
        //         }).catch(function(e) {
        //             wx.showToast({
        //                 title: e.message,
        //                 icon: "none",
        //                 duration: 2e3
        //             });
        //         }));
        //     }
        // });
    },
    getUserInfo: function(t) {
        var o = this, i = this;
        wx.setStorage({
            key: "wj_userInfo",
            data: t.detail.userInfo
        }), wxaUserService.login().then(function(o) {
            a.setUser(o), r.globalData.userInfo = o, o.member ? (i.setData({
                member: e({}, i.data.member, o.member, {
                    nickName: o.member.nickName ? o.member.nickName : o.wxaUser.nickName
                }),
                isMember: !0,
                userInfo: e({}, t.detail.userInfo),
                hasUserInfo: !0
            }), wx.setStorage({
                key: "wj_member",
                data: o.member
            }), i.getOrderStatusCount(), i.getMemberInfo()) : (i.setData({
                isMember: !1,
                userInfo: t.detail.userInfo,
                hasUserInfo: !0,
                member: {
                    couponNum: "*"
                }
            }), n.toAuthorize()), i.handlePageSkip();
        }).catch(function(e) {
            console.log(e);
            var t = e.message;
            o.setData({
                isMember: !1,
                hasUserInfo: !1
            }), t.indexOf("meet frequency limit") > -1 ? wx.showToast({
                title: "登陆超时，请小憩片刻再来登陆吧~",
                icon: "none",
                duration: 2e3
            }) : t.indexOf("auth deny") > -1 ? wx.showToast({
                title: "授权失败，请点击头像重新登录~",
                icon: "none",
                duration: 2e3
            }) : wx.showToast({
                title: "登陆失败，请点击头像重新登录~",
                icon: "none",
                duration: 2e3
            });
        });
    },
    clearStorage: function() {
        // wx.removeStorageSync("wxtoken");
        wx.clearStorage();
        wx.reLaunch()
        r.globalData.storeInfo = null;
        try {
            wx.removeStorageSync("wj_sceneForm"), wx.removeStorageSync("wj_speechSearch"), wx.removeStorageSync("wj_sharingId"), 
            wx.removeStorageSync("wj_shopcart"), wx.removeStorageSync("wj_pageUrl"), wx.removeStorageSync("wj_distributionStore"), 
            wx.removeStorageSync("searchDataLog"), wx.removeStorageSync("__user__"), wx.removeStorageSync("wj_member"), 
            wx.removeStorageSync("attentionClose"), wx.removeStorage({
                key: "wj_allStores",
                success: function(e) {
                    wx.reLaunch({
                        // url: "/pages/mallModule/index/index/index"
                    });
                  
                }
            });
        } catch (e) {}
    }
});