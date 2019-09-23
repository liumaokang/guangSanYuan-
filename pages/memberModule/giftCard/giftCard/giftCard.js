var t = require("../../../../api/giftCardService.js"), n = require("../../../../api/bannerService.js"), i = require("../../../../utils/navPage.js");

Page({
    data: {
        bannerList: [],
        activityGroup: []
    },
    onLoad: function(t) {
        var i = this;
        this.queryActivityGroup(), n.getBannerList("GIFTCARD").then(function(t) {
            console.log(t), t && t.length > 0 && i.setData({
                bannerList: t[0].pictureUrl
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            path: "/pages/mallModule/index/index/index"
        };
    },
    toGiftCardBuy: function(t) {
        var n = "?giftCardActivityId=" + t.currentTarget.dataset.id;
        i.toGiftCardBuy(n);
    },
    toBuyHistory: function() {
        i.toBuyHistory();
    },
    queryActivityGroup: function() {
        var n = this;
        t.queryActivityGroup().then(function(t) {
            console.log(t), n.setData({
                activityGroup: t
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});