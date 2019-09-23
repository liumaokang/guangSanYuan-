var e = require("./request.js");

module.exports = {
    query: function(r, a, t, l, i, n) {
        var f = {
            page: r,
            pageSize: a,
            startTime: t,
            endTime: l,
            statusEquals: i,
            raffleActivityTypeEquals: n
        };
        return e.get("/newretail/api/mall/raffleActivity/query", f);
    },
    cash: function(r) {
        var a = {
            raffleRecordId: r
        };
        return e.post("/newretail/api/mall/raffle/cash", a);
    },
    create: function(r) {
        return e.post("/newretail/api/mall/raffle/create", r);
    },
    draw: function(r) {
        return e.post("/newretail/api/mall/raffle/draw", r);
    },
    getById: function(r) {
        var a = {
            raffleId: r
        };
        return e.get("/newretail/api/mall/raffle/getById", a);
    },
    getRecordsById: function(r) {
        var a = {
            raffleId: r
        };
        return e.get("/newretail/api/mall/raffle/getRecordsById", a);
    },
    cashByMemberId: function() {
        return e.put("/newretail/api/mall/raffle/cashByMemberId");
    },
    getByType: function(r) {
        var a = {
            type: r
        };
        return e.get("/newretail/api/mall/raffleActivity/getByType", a);
    }
};