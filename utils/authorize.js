var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, t = require("../api/wxaUserService.js"), a = require("../utils/auth.js"), r = require("../utils/utils.js"), n = (require("../utils/address.js"), 
require("../utils/navPage.js"), getApp());

module.exports = {
    login: function(e) {
        return new Promise(function(r, i) {
            e && wx.setStorage({
                key: "wj_userInfo",
                data: e.detail.userInfo
            }), t.login().then(function(e) {
                a.setUser(e), n.globalData.userInfo = e, e.member && wx.setStorage({
                    key: "wj_member",
                    data: e.member
                }), r(e);
            }).catch(function(e) {
                i(e);
            });
        });
    },
    bindMobileByEncrypt: function(e) {
        return new Promise(function(a, r) {
            var i = "";
            if (e.detail.errMsg.indexOf("ok") >= 0) {
                if (n.globalData.storeInfo && n.globalData.systemConfigure.memberAscriptionStoreDistance && n.globalData.storeInfo.distance) {
                    var o = n.globalData.storeInfo.distance;
                    (o = parseFloat(1e3 * o)) < n.globalData.systemConfigure.memberAscriptionStoreDistance && (i = n.globalData.storeInfo.id);
                }
                t.bindMobileByEncrypt(e.detail.encryptedData, e.detail.iv, "WXAPP", i).then(function(e) {
                    a(e);
                }).catch(function(e) {
                    r(e);
                });
            } else r({
                message: "获取手机号失败，即将跳转到手动绑定手机号"
            });
        });
    },
    calcStoreDistance: function(t, a, i) {
        var o = r.distance(a, i, t.latitude, t.longitude), s = e({}, t, {
            distance: o
        });
        n.globalData.storeInfo = s;
    }
};