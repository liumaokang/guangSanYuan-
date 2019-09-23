var e = require("../../../api/memberService.js"), n = require("../../../api/couponService.js"), o = require("../../../utils/self.js"), t = require("../../../utils/auth.js");

Page({
    data: {
        userInfo: "",
        couponCount: "*",
        storedValue: "*",
        score: "*"
    },
    onLoad: function(e) {
        var n = t.getUser();
        console.log(n), n && (this.setData({
            userInfo: n
        }), this.ctxCanvas || (this.ctxCanvas = wx.createCanvasContext("barcode")), o.barcode("barcode", n.member.id, 585, 144), 
        this.queryCoupon(1, 0, n.member.id), this.getMbrBalance(), this.queryScore(n.member.mobile));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    queryCoupon: function(e, o, t) {
        var a = this, c = 0;
        n.queryCoupon(e, o, t).then(function(e) {
            if (e.records && e.records.length > 0) {
                var o = 0;
                e.records.forEach(function(e) {
                    "OPEN" === e.status && o++;
                }), c += o;
            }
            var a = {
                memberId: t
            };
            return n.queryExternalCoupons(a);
        }).then(function(e) {
            if (e && e.length > 0) {
                var n = 0;
                e.forEach(function(e) {
                    "OPEN" === e.status && n++;
                }), c += n, a.setData({
                    couponCount: c
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
        var n = this;
        e.getMbrBalance().then(function(e) {
            n.setData({
                storedValue: e
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    queryScore: function(n) {
        var o = this;
        e.getBalance(n).then(function(e) {
            console.log(e), o.setData({
                score: e
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toBalancePay: function() {
        wx.navigateTo({
            url: "../balance/balancePay/balancePay"
        });
    }
});