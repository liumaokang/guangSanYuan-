var e = require("./request.js"), r = require("../utils/utils.js");

module.exports = {
    login: function() {
        var r = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        return e.login(r);
    },
    bindMobile: function(i, t, n, o) {
        var a = this;
        return e.post("/newretail/api/wxa/bindMobile", {
            mobile: i,
            captcha: t,
            registerSourceType: n,
            registerStoreId: o
        }).then(function(e) {
            return r.setHideLoading(!0), a.login();
        });
    },
    bindMobileByEncrypt: function(r, i, t, n) {
        return e.post("/newretail/api/wxa/bindMobileByEncrypt", {
            encryptedData: r,
            iv: i,
            registerSourceType: t,
            registerStoreId: n
        });
    },
    parseWxaMobile: function(r, i) {
        return e.post("/newretail/api/wxa/parseWxaMobile", {
            encryptedData: r,
            iv: i
        });
    },
    checkMobile: function(r, i) {
        return e.post("/newretail/api/mbr/member/checkCode", {
            mobile: r,
            captcha: i
        });
    }
};