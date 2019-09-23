var e, t = require("../../../../utils/self.js"), o = require("../../../../api/memberService.js");

Page({
    data: {
        payNumber: "",
        storedValue: 0
    },
    onLoad: function(e) {
        this.getPayQrCode(), this.getMbrBalance();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        clearTimeout(e);
    },
    onUnload: function() {
        clearTimeout(e);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getPayQrCode: function() {
        var n = this, a = this;
        o.getPayCode().then(function(o) {
            console.log(o), n.ctxCanvas || (n.ctxCanvas = wx.createCanvasContext("barcode")), 
            t.barcode(n.ctxCanvas, o.code, 585, 144), t.qrcode("qrcode", o.code, 380, 380), 
            a.setData({
                payNumber: o.code
            });
            var c = 1e3 * o.integer;
            e = setTimeout(function() {
                a.getPayQrCode(), console.log("刷新了");
            }, c);
        });
    },
    getMbrBalance: function() {
        var e = this;
        o.getMbrBalance().then(function(t) {
            e.setData({
                storedValue: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toBalancePay: function() {
        wx.navigateTo({
            url: "../storedValue/storedValue"
        });
    }
});