var e = require("../../../../api/giftCardService.js"), a = require("../../../../api/optionsService.js"), t = require("../../../../utils/navPage.js");

Page({
    data: {
        balance: "",
        beginDate: "",
        cardId: "",
        cardNo: "",
        created: "",
        endDate: "",
        imageUrl: "",
        memberCode: "",
        name: "",
        recharge: "",
        state: "",
        timeRange: "",
        remark: "",
        mobile: ""
    },
    onLoad: function(t) {
        var n = this;
        console.log(t), t.cardNo && e.queryMyGiftCardDetails(t.cardNo).then(function(e) {
            console.log(e), e.remark && n.setData({
                remark: e.remark.split("\n")
            }), e.myGiftCardDTO && n.setData({
                balance: e.myGiftCardDTO.balance,
                beginDate: e.myGiftCardDTO.beginDate,
                cardId: e.myGiftCardDTO.cardId,
                cardNo: e.myGiftCardDTO.cardNo,
                created: e.myGiftCardDTO.created,
                endDate: e.myGiftCardDTO.endDate,
                imageUrl: e.myGiftCardDTO.imageUrl,
                memberCode: e.myGiftCardDTO.memberCode,
                name: e.myGiftCardDTO.name,
                recharge: e.myGiftCardDTO.recharge,
                state: e.myGiftCardDTO.state
            }), e.useRule && n.setData({
                storeRange: e.useRule.storeRange
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        }), a.query("appContactMobile").then(function(e) {
            e && e.length > 0 && e.forEach(function(e) {
                "appContactMobile" === e.key && n.setData({
                    mobile: e.value
                });
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
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
    onShareAppMessage: function(e) {
        return {
            path: "/pages/mallModule/index/index/index"
        };
    },
    clickUse: function() {
        var e = "?cardNo=" + this.data.cardNo;
        t.toGiftCardPayQR(e);
    },
    handelCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.mobile
        });
    },
    toStoreList: function() {
        wx.setStorage({
            key: "_storeRange_",
            data: this.data.storeRange
        }), t.toGiftCardStoreList();
    }
});