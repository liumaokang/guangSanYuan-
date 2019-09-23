var e = require("./request.js");

module.exports = {
    getBalance: function() {
        return e.get("/newretail/api/mbr/redPacket/getBalance");
    },
    checkCanJoin: function() {
        return e.get("/newretail/api/mbr/redPacketActivity/checkCanJoin");
    },
    query: function(r, t, a, n) {
        var i = {
            page: r,
            pageSize: t,
            searchCount: a,
            stateEquals: n
        };
        return e.get("/newretail/api/mbr/redPacketActivity/query", i);
    },
    queryRedPacketHst: function(r, t, a, n) {
        var i = {
            page: r,
            pageSize: t,
            searchCount: a,
            memberMobileEquals: n,
            orderField: "tranTime",
            orderDirection: "desc"
        };
        return e.get("/newretail/api/mbr/redPacket/queryRedPacketHst", i);
    },
    openRedPacket: function(r) {
        var t = {
            id: r
        };
        return e.get("/newretail/api/mbr/redPacket/openRedPacket", t);
    }
};