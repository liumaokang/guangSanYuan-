var e = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = arguments[n];
        for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    }
    return e;
}, n = require("../../../../api/rechargeService.js"), t = require("../../../../api/memberService.js");

Page({
    data: {
        storedValue: 0,
        rechargeList: []
    },
    onLoad: function(e) {
        this.getMbrBalance(), this.getRechargeList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return {
            path: "/pages/index/index"
        };
    },
    getMbrBalance: function() {
        var e = this;
        t.getMbrBalance().then(function(n) {
            e.setData({
                storedValue: n
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getRechargeList: function() {
        var t = this;
        n.query().then(function(n) {
            var a = [];
            n.forEach(function(n) {
                a.push(e({}, n, {
                    active: !1
                }));
            }), t.setData({
                rechargeList: a
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    clickCheckPrice: function(e) {
        var n = this.data.rechargeList;
        n.forEach(function(n) {
            e.currentTarget.dataset.id === n.rechangeMoneyId ? n.active = !n.active : n.active = !1;
        }), this.setData({
            rechargeList: n
        });
    },
    handleRecharge: function() {
        var e = "";
        this.data.rechargeList.forEach(function(n) {
            n.active && (e = n.rechangeMoneyId);
        }), e ? n.createOrder(e).then(function(e) {
            var t = e.id;
            n.getPaySign(t, "WX_MINI_APP").then(function(e) {
                var n = JSON.parse(e), t = JSON.parse(n.sign), a = "";
                a = t.packageValue, wx.requestPayment({
                    timeStamp: t.timeStamp,
                    nonceStr: t.nonceStr,
                    package: a,
                    signType: t.signType,
                    paySign: t.paySign,
                    success: function(e) {
                        wx.showToast({
                            title: "充值成功",
                            icon: "none",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {
                        console.log("支付失败----------"), console.log(e), "requestPayment:fail cancel" === e.errMsg ? wx.showToast({
                            title: "您取消了支付~",
                            icon: "none",
                            duration: 2e3
                        }) : wx.showToast({
                            title: e.errMsg,
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "请选择要充值的金额",
            icon: "none",
            duration: 2e3
        });
    },
    toChangeBalancePass: function() {
        wx.navigateTo({
            url: "../changeBalancePass/changeBalancePass"
        });
    },
    toBalancePayList: function() {
        wx.navigateTo({
            url: "../balancePayList/balancePayList"
        });
    }
});