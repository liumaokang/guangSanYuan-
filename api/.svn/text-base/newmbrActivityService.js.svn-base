var t = require("./request.js");

module.exports = {
    getAll: function(e) {
        var r = {
            storeId: e
        };
        return t.get("/newretail/api/mall/newmbrActivity/getAll", r);
    },
    getNewmbrProductScope: function(e, r) {
        var i = {
            activityId: e,
            productId: r
        };
        return t.get("/newretail/api/mall/newmbrActivity/getNewmbrProductScope", i);
    },
    checkQualification: function(e, r, i, c) {
        var a = {
            activityId: e,
            count: r,
            productId: i,
            storeId: c
        };
        return t.get("/newretail/api/mall/newmbrActivity/checkQualification", a);
    }
};