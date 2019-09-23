var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = require("../../../../api/distributionService.js"), a = require("../../../../api/backCashService.js"), n = require("../../../../utils/utils.js"), o = require("../../../../utils/navPage.js"), i = getApp();

Page({
    data: {
        tabType: [ "本月", "本季", "本年" ],
        tabSelected: 0,
        member: {
            nickName: "未获取到会员昵称"
        },
        userInfo: {},
        rankList: [ {}, {}, {} ],
        monthRankList: [ {}, {}, {} ],
        quarterRankList: [ {}, {}, {} ],
        annualRankList: [ {}, {}, {} ]
    },
    onLoad: function(t) {
        var a = "";
        i.globalData.userInfo ? (this.setData({
            userInfo: i.globalData.userInfo.wxaUser
        }), i.globalData.userInfo.member ? (this.setData({
            member: i.globalData.userInfo.member
        }), this.getMemberInfo(), a = i.globalData.userInfo.member.id, e.queryGroup(a).then(function(t) {
            console.log(t);
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        }), this.getRankList(0), this.getRankList(1), this.getRankList(2)) : wx.showToast({
            title: "您还不是会员，请绑定手机号成为会员~",
            icon: "none",
            duration: 2e3
        })) : wx.showToast({
            title: "您还没有登录哦，请点击头像授权登陆~",
            icon: "none",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    switchTab: function(t) {
        this.setData({
            tabSelected: t.currentTarget.dataset.idx
        });
    },
    bindChange: function(t) {
        this.setData({
            tabSelected: t.detail.current
        });
    },
    getQuarterStartMonth: function(t) {
        var e = 0;
        return t < 3 && (e = 0), 2 < t && t < 6 && (e = 3), 5 < t && t < 9 && (e = 6), t > 8 && (e = 9), 
        e;
    },
    getMemberInfo: function() {
        var e = this;
        a.queryBackCashAccountDetails().then(function(a) {
            console.log(a);
            var n = e.data.member;
            n = t({}, n, {
                backCashTotal: a.backCashTotal.toFixed(2),
                canBackCash: a.canBackCash.toFixed(2),
                hasBackCash: a.hasBackCash.toFixed(2),
                stayBackCash: a.stayBackCash.toFixed(2)
            }), e.setData({
                member: n
            }), console.log(n);
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getRankList: function(t) {
        var e = this, a = new Date(), o = n.formatTime(a).replace(/\//g, "-");
        if (0 === t) {
            var i = o.slice(0, 8) + "01 00:00:00", s = o;
            e.queryRank(i, s, t);
        } else if (1 === t) {
            var r = a.getMonth(), c = n.timeFormat(e.getQuarterStartMonth(r)), u = o.slice(0, 4) + "-" + c + "-01 00:00:00", h = o;
            e.queryRank(u, h, t);
        } else if (2 === t) {
            var l = o.slice(0, 4) + "-01-01 00:00:00", f = o;
            e.queryRank(l, f, t);
        } else {
            var m = o.slice(0, 8) + "01 00:00:00", g = o;
            e.queryRank(m, g, t);
        }
    },
    queryRank: function(t, a, n) {
        var o = this;
        e.queryRank(this.data.member.id, 1, 3, t, a, !1).then(function(t) {
            var e = [];
            if (t & t.records.length > 0) for (var a = 0; a < 3; a++) t.records[a] ? e.push(item) : e.push({}); else e = [ {}, {}, {} ];
            0 === n ? o.setData({
                monthRankList: e
            }) : 1 === n ? o.setData({
                quarterRankList: e
            }) : 2 === n && o.setData({
                annualRankList: e
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    createBackCash: function() {
        var t = {
            mobile: this.data.member.mobile
        };
        this.data.member.canBackCash > 0 ? a.create(t).then(function(t) {
            console.log(t);
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        }) : wx.showToast({
            title: "可提现金额不足~",
            icon: "none",
            duration: 2e3
        });
    },
    toProfit: function() {
        o.toProfit();
    },
    toMyGroup: function() {
        o.toDistributionTeamList();
    },
    toRankingList: function() {
        o.toRankingList();
    },
    toInvitation: function() {
        o.toInvite();
    }
});