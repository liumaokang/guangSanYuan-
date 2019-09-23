function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, a = require("../../../../api/redPacketService.js"), n = require("../../../../utils/auth.js"), o = require("../../../../utils/utils.js");

Page({
    data: {
        balance: "0.00",
        termValidity: "2018.11.11  23:59:59",
        balanceList: [],
        page: 1,
        pageSize: 20,
        pageCount: 1,
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        step: "first"
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        var t = n.getUser();
        t && t.member && (this.setData({
            mobile: t.member.mobile
        }), this.handelRedPacketBalance());
        var a = new Date(), i = o.formatTime(a).replace(/\//g, "-").split(" ")[0] + " 23:59:59";
        this.setData({
            termValidity: i
        });
        try {
            if (wx.getStorageSync("wj_redCount")) {
                var r = i.replace(/-/g, "/"), s = new Date().getTime(), c = new Date(r).getTime();
                s > c && this.toggleMiddlePopup(), console.log(r, c);
            } else this.toggleMiddlePopup();
            wx.setStorageSync("wj_redCount", i);
        } catch (e) {}
        this.handelQueryList(this.data.page);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    handelRedPacketBalance: function() {
        var e = this;
        a.getBalance().then(function(t) {
            console.log(t), e.setData({
                balance: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    handelQueryList: function(e) {
        var n = this;
        a.queryRedPacketHst(e, this.data.pageSize, !0, this.data.mobile).then(function(e) {
            if (e && e.records && e.records.length >= 0) {
                var a = n.data.balanceList;
                e.records.forEach(function(e) {
                    var n = !0, o = "";
                    e.occurTotal < 0 ? (n = !1, o = "消费") : (n = !0, o = "系统发放", e.occurTotal = "+" + e.occurTotal), 
                    a.push(t({}, e, {
                        state: n,
                        action: o
                    }));
                });
                var o = parseInt(e.recordCount / e.pageSize) + 1;
                n.setData({
                    page: e.page,
                    pageCount: o,
                    balanceList: a
                });
            }
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toggleMiddlePopup: function() {
        this.toggle("middle"), this.setData({
            step: "first"
        });
    },
    toggle: function(t) {
        this.setData(e({}, "show." + t, !this.data.show[t]));
    },
    toggleNextStep: function() {
        this.setData({
            step: "second"
        });
    }
});