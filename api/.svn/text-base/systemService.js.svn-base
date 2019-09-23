var e = require("./request.js");

module.exports = {
    query: function(r) {
        var t = {};
        return r && (t = {
            key: r
        }), e.get("/newretail/api/sys/options/query", t);
    },
    queryAll: function() {
        return e.get("/newretail/api/sys/options/query");
    }
};