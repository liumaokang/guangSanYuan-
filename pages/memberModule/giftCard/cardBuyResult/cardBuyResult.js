function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = require("../../../../api/giftCardService.js"), o = require("../../../../utils/navPage.js");

Page({
    data: (t = {
        imageUrl: "",
        name: "",
        state: "",
        memberCode: "",
        cardId: "",
        cardNo: "",
        allowPresent: "",
        recharge: "",
        created: ""
    }, e(t, "state", ""), e(t, "fromSend", !1), t),
    onLoad: function(t) {
        var o = this;
        console.log(t), t.cardNo && a.queryMyGiftCardDetails(t.cardNo).then(function(t) {
            console.log(t), t.myGiftCardDTO && o.setData(e({
                imageUrl: t.myGiftCardDTO.imageUrl,
                name: t.myGiftCardDTO.name,
                state: t.myGiftCardDTO.state,
                memberCode: t.myGiftCardDTO.memberCode,
                cardId: t.myGiftCardDTO.cardId,
                cardNo: t.myGiftCardDTO.cardNo,
                allowPresent: t.myGiftCardDTO.allowPresent,
                recharge: t.myGiftCardDTO.recharge,
                created: t.myGiftCardDTO.created
            }, "state", t.myGiftCardDTO.state));
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        }), t.fromSend && this.setData({
            fromSend: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this;
        return "button" === e.from && (wx.showShareMenu({
            withShareTicket: !0
        }), a.donate(t.data.cardNo).then(function(e) {
            console.log("已经赠送————————————————"), console.log(e);
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        })), {
            title: "送你一张礼品卡",
            path: "/pages/memberModule/giftCard/giveState/giveState?cardNo=" + t.data.cardNo,
            success: function(e) {}
        };
    },
    handelActivate: function(e) {
        var t = this;
        console.log(e), this.data.cardNo && a.active(this.data.cardNo).then(function(e) {
            console.log(e);
            var a = "?cardNo=" + t.data.cardNo;
            o.toGiftCardDetails(a);
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});