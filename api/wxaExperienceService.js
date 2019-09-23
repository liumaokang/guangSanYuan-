var e = require("./request.js");

module.exports = {
    checkHasExperiencer: function(r) {
        var a = {
            openId: r
        };
        return e.get("/newretail/api/wxa/experience/checkHasExperiencer", a);
    },
    create: function(r, a, n, c) {
        var t = {
            companyName: r,
            mobile: a,
            name: n,
            openId: c
        };
        return e.post("/newretail/api/wxa/experience/create", t);
    }
};