var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
    }
    return e;
}, t = (require("../../../api/wxaUserService.js"), require("../../../api/bannerService.js")), o = require("../../../api/memberService.js"), n = require("../../../api/couponService.js"), a = require("../../../utils/auth.js"), r = (require("../../../utils/utils.js"), 
getApp());

Page({
    data: {
        userInfo: {},
        hasUserInfo: !1,
        showModel: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        mobile: "",
        bindMobile: "",
        memberId: "",
        couponCount: "*",
        storedValue: "*",
        score: "*",
        banners: [],
        encryptedData: "",
        iv: "",
        showPhone: !1
    },
    onLoad: function() {
        try {
            var e = a.getUser();
            e && (console.log(e), this.setData({
                userInfo: e.wxaUser,
                hasUserInfo: !0,
                mobile: e.member.mobile,
                memberId: e.member.id
            }), this.data.memberId && (this.queryCoupon(1, 0, this.data.memberId), this.getMbrBalance(), 
            this.queryScore()));
        } catch (e) {}
        this.getBanners();
    },
    getBanners: function() {
        var e = this;
        t.getBannerList("WXAPPHOME").then(function(t) {
            e.setData({
                banners: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    queryCoupon: function(e, t, o) {
        var a = this, r = 0;
        n.queryCoupon(e, t, o).then(function(e) {
            if (e.records && e.records.length > 0) {
                var t = 0;
                e.records.forEach(function(e) {
                    "OPEN" === e.status && t++;
                }), r += t;
            }
            var a = {
                memberId: o
            };
            return n.queryExternalCoupons(a);
        }).then(function(e) {
            if (e && e.length > 0) {
                var t = 0;
                e.forEach(function(e) {
                    "OPEN" === e.status && t++;
                }), r += t, a.setData({
                    couponCount: r
                });
            } else a.setData({
                couponCount: "*"
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getMbrBalance: function() {
        var e = this;
        o.getMbrBalance().then(function(t) {
            e.setData({
                storedValue: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    queryScore: function() {
        var e = this;
        o.getBalance(this.data.mobile).then(function(t) {
            e.setData({
                score: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    checkAuthor: function() {
        return !!this.data.hasUserInfo || (wx.showToast({
            title: "点击头像授权登录后才能查看哦~",
            icon: "none",
            duration: 2e3
        }), !1);
    },
    toMallModule: function() {
        wx.switchTab({
            url: "/pages/mallModule/index/index/index"
        });
    },
    toStoredValue: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../balance/storedValue/storedValue"
        });
    },
    toMyCoupon: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../coupon/myCoupon/myCoupon"
        });
    },
    toCouponCenter: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../coupon/couponCenter/couponCenter"
        });
    },
    toScore: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../score/score"
        });
    },
    toMyCard: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../myCard/myCard"
        });
    },
    toGiftCard: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../giftCard/giftCard/giftCard"
        });
    },
    toScoreMall: function() {
        this.checkAuthor() && wx.navigateTo({
            url: "../scoreMall/scoreMall/scoreMall"
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            userInfo: {},
            mobile: "",
            couponCount: 0,
            storedValue: 0,
            score: 0,
            hasUserInfo: !1
        }), this.onLoad(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {},
    handelBannerClick: function(e) {
        var t = "";
        this.data.banners.forEach(function(o) {
            o.id === e.currentTarget.dataset.id && (console.log(o), t = o);
        }), this.checkAuthor() && ("APP" === t.linkType ? "MEMBER_CARD" === t.appReturnType ? wx.navigateTo({
            url: "../myCard/myCard"
        }) : "RECHARGE" === t.appReturnType ? wx.navigateTo({
            url: "../balance/storedValue/storedValue"
        }) : "GIFTCARD" === t.appReturnType && wx.navigateTo({
            url: "../giftCard/giftCard/giftCard"
        }) : "GIFTCARDACTIVITYDETAILS" === t.linkType && wx.navigateTo({
            url: "../giftCard/giftCardBuy/giftCardBuy?giftCardActivityId=" + t.giftcardActivityId
        }));
    },
    handleUserLogin: function() {
        var t = r.globalData.userInfo;
        console.log(t);
        var o = this;
        t && (this.setData({
            userInfo: e({}, t.wxaUser)
        }), t.member ? (o.setData({
            hasUserInfo: !0,
            mobile: t.member.mobile,
            memberId: t.member.id
        }), o.queryCoupon(1, 0, t.member.id), o.getMbrBalance(), o.queryScore()) : (o.setData({
            userInfo: t.wxaUser,
            hasUserInfo: !0
        }), o.handlePopupPhone()));
    },
    handleTabbar: function(e) {
        console.log(e.detail), e.detail.showTabbar, this.setData({
            showTabbar: e.detail.showTabbar
        });
    },
    handlePopupPhone: function() {
        r.globalData.userInfo.member ? this.setData({
            showPhone: !1
        }) : this.setData({
            showPhone: !0
        });
    },
    handleBindPhone: function(e) {
        !0 === e.detail.bindMobile && this.handlePopupPhone();
    }
});