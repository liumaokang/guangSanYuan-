var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = require("../../../../api/giftCardService.js"), a = require("../../../../utils/utils.js"), n = require("../../../../utils/navPage.js"), o = require("../../../../utils/address.js"), i = getApp();

Page({
    data: {
        showCheckedImg: "",
        cardList: [],
        priceList: [],
        needPayValue: 0,
        cardInfo: ""
    },
    onLoad: function(a) {
        var n = this, c = a.giftCardActivityId ? a.giftCardActivityId : null;
        c && e.queryActivityDetails(c).then(function(e) {
            if (console.log(e), e && e.card) {
                var a = [], o = [];
                e.card.cardStyles && e.card.cardStyles.forEach(function(e, n) {
                    0 === n ? a.push(t({}, e, {
                        active: !0
                    })) : a.push(t({}, e, {
                        active: !1
                    }));
                }), e.card.faces && e.card.faces.forEach(function(e) {
                    o.push(t({}, e, {
                        active: !1
                    }));
                }), n.setData({
                    cardInfo: e,
                    cardList: a,
                    priceList: o,
                    showCheckedImg: e.card.cardStyles[0].imageUrl
                });
            }
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        }), this.storeId = "", i.globalData.storeInfo ? this.storeId = i.globalData.storeInfo.id : o.getLocation().then(function(t) {
            i.globalData.storeInfo = t, n.storeId = t.id;
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
    clickChange: function(t) {
        var e = this;
        console.log(t);
        var a = this.data.cardList;
        a.forEach(function(a) {
            a.styleId === t.currentTarget.dataset.styleid ? (a.active = !0, e.setData({
                showCheckedImg: a.imageUrl
            })) : a.active = !1;
        }), this.setData({
            cardList: a
        });
    },
    clickPrice: function(t) {
        var e = this.data.priceList, a = 0;
        e.forEach(function(e) {
            e.faceId === t.currentTarget.dataset.faceid ? (e.active = !e.active, a = e.active ? e.price : 0) : e.active = !1;
        }), this.setData({
            priceList: e,
            needPayValue: a
        });
    },
    toUseNeedKnow: function() {
        wx.setStorage({
            key: "_useNeedKnow",
            data: this.data.cardInfo
        }), n.toUseNeedKnow();
    },
    handleBuy: function() {
        var t = "", o = 0, i = 0;
        if (this.data.priceList.forEach(function(e) {
            e.active && (t = e.faceId, o = e.price, i = e.faceValue);
        }), t) {
            var c = "", s = "";
            this.data.cardList.forEach(function(t) {
                t.active && (c = t.styleId, s = t.imageUrl);
            });
            var r = {
                cardId: this.data.cardInfo.card.id,
                cardName: this.data.cardInfo.name,
                faceId: t,
                giftCardActivityId: this.data.cardInfo.id,
                giftCardActivityName: this.data.cardInfo.name,
                imageUrl: s,
                payAmount: o,
                styleId: c,
                total: i,
                storeId: this.storeId
            };
            e.createOrder(r).then(function(t) {
                return t;
            }).then(function(t) {
                console.log(t);
                var o = {
                    orderId: t,
                    payMethod: "WX_MINI_APP"
                };
                e.getPaySign(o).then(function(o) {
                    var i = JSON.parse(o), c = JSON.parse(i.sign);
                    wx.requestPayment({
                        timeStamp: c.timeStamp,
                        nonceStr: c.nonceStr,
                        package: c.package ? c.package : c.packageValue,
                        signType: c.signType,
                        paySign: c.paySign,
                        success: function(o) {
                            console.log("支付成功---------------"), console.log(o);
                            var i = setInterval(function() {
                                e.getStatusById(t).then(function(t) {
                                    if (console.log("查询交易结果-------------"), console.log(t), "SUCCESS" === t.status && t.cardNo) {
                                        a.setHideLoading(!1), clearInterval(i);
                                        var e = "?cardNo=" + t.cardNo;
                                        n.toCardBuyResult(e);
                                    } else "FAILED" === t.status ? (a.setHideLoading(!1), clearInterval(i), t.failedReason && wx.showToast({
                                        title: t.failedReason,
                                        icon: "none",
                                        duration: 2e3
                                    })) : a.setHideLoading(!0);
                                }).catch(function(t) {
                                    clearInterval(i), wx.showToast({
                                        title: o.errMsg,
                                        icon: "none",
                                        duration: 2e3
                                    });
                                });
                            }, 300);
                        },
                        fail: function(t) {
                            console.log("支付失败-------------"), console.log(t), "requestPayment:fail cancel" === t.errMsg ? wx.showToast({
                                title: "您取消了支付~",
                                icon: "none",
                                duration: 2e3
                            }) : wx.showToast({
                                title: t.errMsg,
                                icon: "none",
                                duration: 2e3
                            });
                        }
                    });
                }).catch(function(t) {
                    wx.showToast({
                        title: t.message,
                        icon: "none",
                        duration: 2e3
                    });
                });
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        } else wx.showToast({
            title: "请选择卡面额",
            icon: "none",
            duration: 2e3
        });
    }
});