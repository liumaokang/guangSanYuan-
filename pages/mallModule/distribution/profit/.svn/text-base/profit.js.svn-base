var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = require("../../../../api/backCashService.js"), a = (require("../../../../utils/utils.js"), 
getApp());

Page({
    data: {
        profitList: [],
        page: 1,
        mobile: "",
        pageSize: 10,
        pageCount: 1,
        noMore: !1,
        loading: !1
    },
    onLoad: function(t) {
        wx.hideShareMenu();
        var e = this;
        if (a.globalData.userInfo) a.globalData.userInfo.member ? (e.setData({
            member: a.globalData.userInfo.member,
            mobile: a.globalData.userInfo.member.mobile
        }), e.handelQueryList(this.data.page)) : wx.showToast({
            title: "您还不是会员，请先绑定手机号码成为会员",
            icon: "none",
            duration: 2e3
        }); else try {
            wx.showModal({
                title: "提示",
                content: "请登录后查看",
                success: function(t) {
                    t.confirm ? (console.log("用户点击确定"), wx.switchTab({
                        url: "../my/my"
                    })) : t.cancel && console.log("用户点击取消");
                }
            });
        } catch (t) {}
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            profitList: [],
            mobile: "",
            page: 1,
            pageCount: 1,
            noMore: !1
        }), this.onLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {
        if (this.data.page < this.data.pageCount) {
            this.setData({
                loading: !0
            });
            var t = this.data.page;
            ++t, this.handelQueryList(t);
        } else this.data.profitList.length > 0 ? this.setData({
            noMore: !0
        }) : wx.showToast({
            title: "没有更多数据~",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function() {},
    handelQueryList: function(a) {
        var o = this, n = this;
        e.query(a, this.data.pageSize, "HASBACK", !0).then(function(e) {
            if (console.log(e), e && e.records && e.records.length >= 0) {
                var a = o.data.profitList;
                e.records.forEach(function(e) {
                    a.push(t({}, e));
                });
                var i = parseInt(e.recordCount / e.pageSize) + 1;
                o.setData({
                    page: e.page,
                    pageCount: i,
                    profitList: a
                });
            }
            o.data.loading && n.setData({
                loading: !1
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), o.data.loading && n.setData({
                loading: !1
            });
        });
    }
});