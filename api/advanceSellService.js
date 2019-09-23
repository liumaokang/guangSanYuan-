var e = require("./request.js");

module.exports = {
    getByIds: function(a, r) {
        var t = {
            advanceId: a,
            productId: r
        };
        return e.get("/newretail/api/mall/advanceSell/getByIds", t);
    },
    query: function(a) {
        return e.get("/newretail/api/mall/advanceSell/query", a);
    },
    getBalancePaySign: function(a) {
        return e.post("/newretail/api/mall/advanceSell/getBalancePaySign", a);
    },
    createOrder: function(a) {
        return e.post("/newretail/api/mall/advanceSell/createOrder", a);
    }
};