require("../../../../api/backCashService.js");

var e = require("../../../../api/distributionService.js"), t = require("../../../../utils/utils.js"), a = require("../../../../utils/navPage.js"), n = getApp();

Page({
    data: {
        tabType: [ "本月", "本季", "本年" ],
        tabSelected: 0,
        rankingList: [],
        page: 1,
        pageSize: 10,
        pageCount: 1,
        noMore: !1,
        loading: !1
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        var t = this;
        if (n.globalData.userInfo) n.globalData.userInfo.member ? (t.setData({
            member: n.globalData.userInfo.member,
            mobile: n.globalData.userInfo.member.mobile
        }), t.handelQueryList(this.data.page)) : wx.showToast({
            title: "您还不是会员，请先绑定手机号码成为会员",
            icon: "none",
            duration: 2e3
        }); else try {
            wx.showModal({
                title: "提示",
                content: "请登录后查看",
                success: function(e) {
                    e.confirm ? (console.log("用户点击确定"), a.toMy()) : e.cancel && console.log("用户点击取消");
                }
            });
        } catch (e) {}
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            rankingList: [],
            mobile: "",
            page: 1,
            pageCount: 1,
            noMore: !1
        }), this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (this.data.page < this.data.pageCount) {
            this.setData({
                loading: !0
            });
            var e = this.data.page;
            ++e, this.handelQueryList(e);
        } else this.data.rankingList.length > 0 ? this.setData({
            noMore: !0
        }) : wx.showToast({
            title: "没有更多数据~",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function() {},
    switchTab: function(e) {
        console.log(e), this.setData({
            tabSelected: e.currentTarget.dataset.idx,
            rankingList: []
        }), this.handelQueryList(1);
    },
    bindChange: function(e) {
        this.setData({
            tabSelected: e.detail.current,
            rankingList: []
        }), this.handelQueryList(1);
    },
    handelQueryList: function(a) {
        var o = this, i = this, s = new Date(), r = t.formatTime(s).replace(/\//g, "-");
        if (0 === i.data.tabSelected) {
            var l = r.slice(0, 8) + "01 00:00:00", u = r;
            i.queryRank(l, u, a);
        } else if (1 === i.data.tabSelected) {
            var c = s.getMonth(), d = t.timeFormat(i.getQuarterStartMonth(c)), g = r.slice(0, 4) + "-" + d + "-01 00:00:00", h = r;
            i.queryRank(g, h, a);
        } else if (2 === i.data.tabSelected) {
            var f = r.slice(0, 4) + "-01-01 00:00:00", p = r;
            i.queryRank(f, p, a);
        } else {
            var b = r.slice(0, 8) + "01 00:00:00", m = r;
            i.queryRank(b, m, a);
        }
        var D = n.globalData.userInfo.member.id;
        e.queryGroup(D).then(function(e) {
            if (console.log(e), e && e.length >= 0) {
                var t = e;
                o.setData({
                    groupList: t
                });
            }
            o.data.loading && i.setData({
                loading: !1
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            }), o.data.loading && i.setData({
                loading: !1
            });
        });
    },
    queryRank: function(t, a, n) {
        var o = this;
        e.queryRank(this.data.member.id, n, this.data.pageSize, t, a, !1).then(function(e) {
            console.log(e);
            var t = [];
            if (e & e.records.length > 0) for (var a = 0; a < 3; a++) e.records[a] ? t.push(item) : t.push({}); else t = [ {}, {}, {} ];
            var n = parseInt(e.recordCount / e.pageSize) + 1;
            o.setData({
                page: e.page,
                pageCount: n,
                rankingList: t
            }), o.data.loading && that.setData({
                loading: !1
            });
        }).catch(function(e) {
            console.log(e), wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            }), o.data.loading && that.setData({
                loading: !1
            });
        });
    },
    getQuarterStartMonth: function(e) {
        var t = 0;
        return e < 3 && (t = 0), 2 < e && e < 6 && (t = 3), 5 < e && e < 9 && (t = 6), e > 8 && (t = 9), 
        t;
    }
});