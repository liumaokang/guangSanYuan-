var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (a[o] = n[o]);
    }
    return a;
}, e = require("../../../../api/giftCardService.js"), n = require("../../../../utils/auth.js"), o = require("../../../../utils/navPage.js"), t = getApp();

Page({
    data: {
        avatar: "",
        nickName: "",
        name: "",
        imageUrl: "",
        cardNo: "",
        cardId: "",
        state: "",
        isCardMaster: !1,
        showPhone: !1
    },
    onLoad: function(a) {
        console.log(a);
        var e = n.getUser();
        a.cardNo && (this.cardNo = a.cardNo, e && this.handleInit(a.cardNo));
    },
    handleInit: function(a) {
        var o = this;
        e.queryGiftCardInfo(a).then(function(a) {
            if (a) {
                o.setData({
                    avatar: a.avatar,
                    nickName: a.nickName,
                    name: a.name,
                    state: a.state,
                    cardNo: a.cardNo,
                    cardId: a.cardId,
                    imageUrl: a.imageUrl,
                    allowPresent: a.allowPresent
                });
                var e = n.getUser();
                if (e && e.member) {
                    var t = !1;
                    t = e.member.wxOpenid === a.memberCode, o.setData({
                        isCardMaster: t
                    });
                }
            }
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
    handelGetCard: function() {
        var a = n.getUser();
        a && a.member ? e.acquireDonate(this.data.cardNo).then(function(a) {
            console.log("领取成功------------------"), console.log(a);
            var e = "?cardNo=" + a.cardNo + "&fromSend=true";
            o.toCardBuyResult(e);
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        }) : wx.showModal({
            title: "提示",
            content: "您当前未登录，请去授权登录，再重新领卡",
            success: function() {
                o.toHome();
            }
        });
    },
    handelClose: function() {
        o.toHome();
    },
    handleUserLogin: function() {
        var e = t.globalData.userInfo;
        console.log(e);
        var n = this;
        e && (this.setData({
            userInfo: a({}, e.wxaUser)
        }), e.member ? n.handleInit(n.cardNo) : n.handlePopupPhone());
    },
    handleTabbar: function(a) {
        console.log(a.detail), a.detail.showTabbar, this.setData({
            showTabbar: a.detail.showTabbar
        });
    },
    handlePopupPhone: function() {
        t.globalData.userInfo.member ? this.setData({
            showPhone: !1
        }) : this.setData({
            showPhone: !0
        });
    },
    handleBindPhone: function(a) {
        !0 === a.detail.bindMobile && this.handlePopupPhone();
    }
});