var e = require("./request.js");

module.exports = {
    create: function(t) {
        return e.post("/newretail/api/mall/teamBuyingActivity/create", t);
    },
    createOrder: function(t) {
        return e.post("/newretail/api/mall/teamBuyingActivity/createOrder", t);
    },
    getGoodsDetails: function(t) {
        var i = {
            id: t
        };
        return e.get("/newretail/api/mall/teamBuyingActivity/getDetails", i);
    },
    getDetails: function(t, i) {
        var r = {
            id: t,
            teamLeaderRecordId: i
        };
        return e.get("/newretail/api/mall/teamBuyingActivity/getDetails", r);
    },
    getDetailsByStoreId: function(t, i, r) {
        var a = {
            id: t,
            storeId: i,
            teamLeaderRecordId: r
        };
        return e.get("/newretail/api/mall/teamBuyingActivity/getDetails", a);
    },
    getOpenTeamBuyings: function(t, i, r) {
        var a = {
            storeId: t,
            productId: i,
            teamBuyingId: r
        };
        return e.get("/newretail/api/mall/teamBuyingActivity/getOpenTeamBuyings", a);
    },
    query: function(t) {
        return e.get("/newretail/api/mall/teamBuyingActivity/query", t);
    },
    getStartedTeamBuyingByStoreId: function(t) {
        var i = {
            storeId: t
        };
        return e.get("/newretail/api/mall/teamBuyingActivity/getStartedTeamBuyingByStoreId", i);
    },
    removeById: function(t) {
        return e.get("/newretail/api/mall/teamBuyingActivity/removeById", t);
    },
    getStoresById: function(t) {
        var i = {
            id: t
        };
        return e.get("/newretail/api/mall/teamBuyingActivity/getStoresById", i);
    }
};