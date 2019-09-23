var e = require("./request.js");

module.exports = {
    queryList: function(t) {
        var r = {};
        return null != t && (r.lastTime = t), e.get("/newretail/api/mall/store/queryList", r);
    },
    getDistributionStore: function() {
        return e.get("/newretail/api/mall/store/getDistributionStore");
    },
    getById: function(t) {
        var r = {
            id: t
        };
        return e.get("/newretail/api/mall/store/getById", r);
    },
    getFrequencyStore: function() {
        return e.get("/newretail/api/mall/store/getMemberVisitStore");
    }
};