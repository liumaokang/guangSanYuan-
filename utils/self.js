function e(e) {
    return Math.round(i * e / 750);
}

var t = require("../libs/barcode"), o = require("../libs/qrcode"), i = wx.getSystemInfoSync().windowWidth;

module.exports = {
    barcode: function(o, i, n, r) {
        setTimeout(function() {
            t.code128(o, i, e(n), e(r));
        }, 1e3);
    },
    qrcode: function(t, i, n, r) {
        setTimeout(function() {
            o.api.draw(i, {
                ctx: wx.createCanvasContext(t),
                width: e(n),
                height: e(r)
            });
        }, 1e3);
    }
};