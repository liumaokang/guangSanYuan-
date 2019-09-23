var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
}, t = require("../../../../api/memberService.js"), n = require("../../../../api/teamBuyService.js"), o = require("../../../../utils/utils.js"), i = require("../../../../api/productService.js");

require("../../../../utils/navPage.js");

Page({
    data: {
        balance: "",
        recommendingList: []
    },
    onLoad: function(e) {
        console.log(e), this.setData({
            type: e.type,
            storeId: e.storeId
        }), this.getRecommendingGoods(e.storeId);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getBalance: function() {
        var e = this;
        t.getMbrBalance().then(function(t) {
            e.setData({
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
    getRecommendingGoods: function(t) {
        var r = this;
        n.getStartedTeamBuyingByStoreId(t).then(function(n) {
            var a = [];
            if (n && n.length > 0) {
                for (var c = 0; c < n.length; c++) if (c < 16) {
                    var s = n[c], u = e({}, s, {
                        teamLeaderPrice: s.teamLeaderPrice ? s.teamLeaderPrice : s.teamMemberPrice,
                        isTeam: !0,
                        memberCount: o.numberConversion.numberToChinese(s.teamMemberCount)
                    });
                    i.getDetails(t, s.productId).then(function(t) {
                        var n = r.data.recommendingList;
                        if (t) for (var o = 0; o < n.length; o++) {
                            var i = n[o], a = e({}, i, {
                                productUrl: t.imageUrl,
                                sellPrice: t.sellPrice
                            });
                            i.productId && i.productId === t.id && (n[o] = a);
                        }
                        r.setData({
                            recommendingList: n
                        });
                    }), a.push(u);
                }
                r.setData({
                    recommendingList: a
                });
            }
            if (a.length < 16) {
                var d = 16 - a.length;
                i.getStoreHotProduct(t).then(function(t) {
                    if (t && t.length > 0) {
                        for (var n = 0; n < t.length; n++) if (n < d) {
                            var o = t[n], i = e({}, o, {
                                isTeam: !1,
                                productUrl: o.imageUrl
                            });
                            r.data.recommendingList.push(i);
                        }
                        r.setData({
                            recommendingList: r.data.recommendingList
                        });
                    }
                }).catch(function(e) {
                    wx.showToast({
                        title: e.message,
                        icon: "none",
                        duration: 2e3
                    });
                });
            }
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});