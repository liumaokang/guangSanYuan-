var t = require("../../../../api/giftCardService.js"), e = require("../../../../utils/auth.js"), o = require("../../../../utils/navPage.js");

Page({
    data: {
        historyList: []
    },
    onLoad: function(o) {
        var a = this, n = e.getUser(), i = "";
        n && n.member && (i = n.member.id, t.queryMyGiftCard(i).then(function(t) {
            console.log(t), t && a.setData({
                historyList: t
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            path: "/pages/mallModule/index/index/index"
        };
    },
    toCardBuyResult: function(t) {
        var e = this.data.historyList[t.currentTarget.dataset.index];
        if ("UNACTIVATED" === e.state) {
            wx.setStorage({
                key: "_currentCardInfo_",
                data: e
            });
            var a = "?cardNo=" + e.cardNo;
            o.toCardBuyResult(a);
        } else if ("ACTIVED" === e.state) {
            var n = "?cardNo=" + e.cardNo;
            o.toGiftCardDetails(n);
        }
    }
});