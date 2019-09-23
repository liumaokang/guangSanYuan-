var e = require("./request.js");

module.exports = {
    query: function(r) {
        return e.get("/newretail/api/mall/product/comment/query", r);
    },
    create: function(r) {
        return e.post("/newretail/api/mall/product/comment/create", r);
    }
};