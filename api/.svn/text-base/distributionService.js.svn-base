var e = require("./request.js");

require("../utils/utils.js");

module.exports = {
    getDistributionFee: function(t, i) {
        var r = {
            id: t,
            distance: i
        };
        return e.get("/newretail/api/mall/distributionFee/getDistributionFee", r);
    },
    getDistributionStoreFee: function() {
        return e.get("/newretail/api/mall/distributionFee/getDistributionStoreFee");
    },
    get: function() {
        return e.get("/newretail/api/mall/distributionFee/get");
    },
    queryGroup: function(t) {
        var i = {
            memberId: t
        };
        return e.get("/newretail/api/mbr/distribution/queryGroup", i);
    },
    queryRank: function(t, i, r, n, u, a) {
        var o = {
            memberId: t,
            page: i,
            pageSize: r,
            startDate: n,
            endDate: u,
            searchCount: a
        };
        return e.get("/newretail/api/mbr/distribution/queryRank", o);
    }
};