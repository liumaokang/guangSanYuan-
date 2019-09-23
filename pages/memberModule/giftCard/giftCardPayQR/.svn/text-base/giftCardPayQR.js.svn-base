var o, t = require("../../../../api/giftCardService.js"), e = require("../../../../utils/self.js");

Page({
    data: {
        cardNo: "",
        authCode: ""
    },
    onLoad: function(o) {
        console.log(o), o.cardNo && this.setData({
            cardNo: o.cardNo
        }), this.getPayCode();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {
        clearTimeout(o);
    },
    onUnload: function() {
        clearTimeout(o);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getPayQrCode: function(o) {
        this.ctxCanvas || (this.ctxCanvas = wx.createCanvasContext("barcode")), e.barcode(this.ctxCanvas, o, 585, 144), 
        e.qrcode("qrcode", o, 450, 450);
    },
    getPayCode: function() {
        var e = this, a = this;
        t.getPayCode(this.data.cardNo).then(function(t) {
            console.log(t), e.setData({
                authCode: t.authCode
            }), e.getPayQrCode(t.authCode);
            var n = 1e3 * t.expiresIn;
            o = setTimeout(function() {
                console.log("刷新了"), a.getPayCode();
            }, n);
        }).catch(function(o) {
            wx.showToast({
                title: "请选择卡面额",
                icon: "none",
                duration: 2e3
            });
        });
    }
});