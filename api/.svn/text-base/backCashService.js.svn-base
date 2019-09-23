var e = require("./request.js");

require("../utils/utils.js");

module.exports = {
    queryBackCashAccountDetails: function() {
        return e.get("/newretail/api/mbr/backCashDetails/queryBackCashAccountDetails");
    },
    query: function(a, t, r, i) {
        var s = {
            page: a,
            pageSize: t,
            backCashDetailsStatus: r,
            searchCount: i
        };
        return e.get("/newretail/api/mbr/backCashDetails/query", s);
    },
    create: function(a) {
        return e.post("/newretail/api/mbr/backCashRequisition/create", a);
    }
};