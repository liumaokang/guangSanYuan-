var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = require("../../../../api/rechargeService.js"), a = require("../../../../utils/auth.js");

Page({
    data: {
        payList: [],
        mobile: "",
        page: 1,
        pageSize: 20,
        pageCount: 1
    },
    onLoad: function(t) {
        var e = a.getUser();
        e && e.member && this.setData({
            mobile: e.member.mobile
        }), this.handelQueryList(this.data.page);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            payList: [],
            mobile: "",
            page: 1,
            pageCount: 1
        }), this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (this.data.page < this.data.pageCount) {
            var t = this.data.page;
            ++t, this.handelQueryList(t);
        } else wx.showToast({
            title: "没有更多数据了~",
            icon: "none",
            duration: 1500
        });
    },
    handelQueryList: function(a) {
        var o = this;
        e.queryList(a, this.data.pageSize, this.data.mobile).then(function(e) {
            if (e && e.records && e.records.length >= 0) {
                var a = o.data.payList;
                e.records.forEach(function(e) {
                    var o = !0;
                    o = !(e.occurTotal < 0 || "消费" === e.action || "consume" === e.action), a.push(t({}, e, {
                        state: o
                    }));
                });
                var n = parseInt(e.recordCount / e.pageSize) + 1;
                o.setData({
                    page: e.page,
                    pageCount: n,
                    payList: a
                });
            }
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});