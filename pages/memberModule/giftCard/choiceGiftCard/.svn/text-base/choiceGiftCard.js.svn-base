var t = Object.assign || function(t) {
    for (var o = 1; o < arguments.length; o++) {
        var a = arguments[o];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    }
    return t;
}, o = require("../../../../api/orderService.js");

Page({
    data: {
        giftCardList: [],
        card: {}
    },
    onLoad: function(a) {
        var e = this;
        console.log(a);
        var n = JSON.parse(a.productData);
        if (n.length > 0) {
            var r = [];
            n.forEach(function(t) {
                var o = {
                    productId: t.id,
                    productNum: t.productNum
                };
                r.push(o);
            });
            var c = {
                productIds: r,
                storeId: a.storeId
            };
            o.calculateCard(c).then(function(o) {
                var a = [], n = [];
                o && o.length > 0 && o.forEach(function(o) {
                    var e = t({}, o, {
                        isChecked: !1
                    });
                    o.useable ? a.push(e) : n.pop(e);
                }), a = a.concat(n), e.setData({
                    giftCardList: a
                });
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toCardBuyResult: function(t) {
        console.log(t);
        var o = t.currentTarget.dataset.cardid, a = this.data.giftCardList, e = null;
        if (a.forEach(function(t) {
            t.cardId === o ? (t.isChecked = !t.isChecked, e = t) : t.isChecked = !1;
        }), this.setData({
            giftCardList: a
        }), e) if (console.log(e), e.useable) {
            try {
                wx.setStorageSync("wj_chooseCard", e);
            } catch (t) {}
            wx.navigateBack({
                delta: 1
            });
        } else wx.showToast({
            title: e.reason,
            icon: "none",
            duration: 2e3
        });
    }
});