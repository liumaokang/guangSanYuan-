var e = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    }
    return e;
}, a = require("../../../api/memberService.js"), t = require("../../../utils/auth.js"), o = getApp();

Page({
    data: {
        scoreList: [],
        memberScoreBalance: 0,
        mobile: "",
        page: 1,
        pageSize: 20,
        pageCount: 1,
        loading: !1,
        loadingText: "正在加载..."
    },
    checkAuth: function() {
        try {
            return !!o.globalData.userInfo;
        } catch (e) {}
    },
    getScoreBalance: function() {
        var e = this;
        a.getBalance(this.data.mobile).then(function(a) {
            console.log(a), e.setData({
                memberScoreBalance: a
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getMemberScoreBalance: function(e, a) {
        this.checkAuth() ? this.queryScoreData(e, a) : wx.showToast({
            title: "请登录后查询积分明细",
            icon: "none",
            duration: 2e3
        });
    },
    queryScoreData: function(t, o) {
        var n = this, r = this.data.mobile;
        a.queryHst(t, o, r).then(function(a) {
            console.log(a);
            var t = n.data.scoreList;
            if (a.records && a.records.length >= 0) {
                a.records.forEach(function(a) {
                    var o = {};
                    if (a.occur > 0) {
                        var n = "+" + a.occur;
                        o = e({}, a, {
                            occur: n,
                            increase: !0
                        });
                    } else if (a.occur < 0) {
                        var r = 0 - a.occur;
                        o = e({}, a, {
                            occur: r = "-" + r,
                            increase: !1
                        });
                    } else o = e({}, a, {
                        occur: "-0.00",
                        increase: !1
                    });
                    o = e({}, o, {
                        action: a.remark
                    }), t.push(o);
                });
                var o = parseInt(a.recordCount / a.pageSize) + 1;
                return n.setData({
                    page: a.page,
                    pageCount: o,
                    scoreList: t
                }), t;
            }
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    handleAction: function(e) {
        return "recharge" === e ? "充值" : "consume" === e ? "消费" : "adjust" === e ? "调整" : "checkIn" === e ? "签到" : "refund" === e ? "退款" : e;
    },
    onLoad: function(e) {
        var a = this;
        try {
            var o = t.getUser();
            if (o && o.member) {
                var n = o.member.mobile;
                a.setData({
                    mobile: n
                }), a.getScoreBalance(), a.getMemberScoreBalance(this.data.page, this.data.pageSize);
            }
        } catch (e) {}
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            page: 1,
            pageCount: 1,
            scoreList: []
        }), this.getMemberScoreBalance(this.data.page, this.data.pageSize), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (this.data.page < this.data.pageCount) {
            var e = this.data.page;
            ++e, this.queryScoreData(e, this.data.pageSize);
        } else wx.showToast({
            title: "没有更多数据~",
            icon: "none",
            duration: 1500
        });
    },
    onShareAppMessage: function(e) {
        return {
            path: "/pages/mallModule/index/index"
        };
    }
});