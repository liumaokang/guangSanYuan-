var a = require("../../../../api/optionsService.js"), e = require("../../../../utils/navPage.js");

Page({
    data: {
        timeRange: "",
        mobile: "",
        ramark: "",
        validityTime: "",
        storeRange: ""
    },
    onLoad: function(e) {
        var t = this, n = this;
        wx.getStorage({
            key: "_useNeedKnow",
            success: function(a) {
                if (console.log(a.data), a.data) {
                    var e = [];
                    a.data.card.remark && (e = a.data.card.remark.split("\n"));
                    var t = a.data.card.useRule.validityUnit;
                    "hour" === t ? t = "小时" : "day" === t ? t = "天" : "month" === t ? t = "月" : "year" === t && (t = "年"), 
                    n.setData({
                        timeRange: a.data.beginDate + " - " + a.data.endDate,
                        validityTime: a.data.card.useRule.validity + t,
                        remark: e,
                        storeRange: a.data.card.useRule.storeRange
                    });
                }
            }
        }), a.query("appContactMobile").then(function(a) {
            a && a.length > 0 && a.forEach(function(a) {
                "appContactMobile" === a.key && t.setData({
                    mobile: a.value
                });
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
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
    onShareAppMessage: function() {},
    toStoreList: function() {
        wx.setStorage({
            key: "_storeRange_",
            data: this.data.storeRange
        }), e.toGiftCardStoreList();
    },
    handelCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.mobile
        });
    }
});