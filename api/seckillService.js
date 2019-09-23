var t = require("./request.js");

module.exports = {
    query: function(e) {
        return t.get("/newretail/api/mall/grabActivity/query", e);
    },
    checkQualification: function(e) {
        return t.get("/newretail/api/mall/grabActivity/checkQualification", e);
    },
    getActivityStoreProduct: function(e, i, r) {
        var a = {
            activityId: e,
            productId: i,
            storeId: r
        };
        return t.get("/newretail/api/mall/grabActivity/getActivityStoreProduct", a);
    },
    getAll: function(e) {
        var i = {
            storeId: e
        };
        return t.get("/newretail/api/mall/grabActivity/getAll", i);
    }
};