var e = require("./request.js");

require("../utils/utils.js");

module.exports = {
    getMenuProduct: function(t, r) {
        var u = {
            storeId: t,
            business: r
        };
        return e.get("/newretail/api/mall/product/store/getMenuProduct", u);
    },
    getAllCategory: function() {
        return e.get("/newretail/api/mall/product/category/getAllCategory");
    },
    query: function(t) {
        return e.get("/newretail/api/mall/product/store/query", t);
    },
    getStoreHotProduct: function(t) {
        var r = {
            storeId: t
        };
        return e.get("/newretail/api/mall/product/store/getStoreHotProduct", r);
    },
    getDetails: function(t, r) {
        var u = {
            storeId: t,
            productId: r
        };
        return e.get("/newretail/api/mall/product/store/getDetails", u);
    },
    getSearchProduct: function(t, r, u, a, o) {
        var i = {
            storeIdEquals: t,
            page: r,
            pageSize: u,
            nameLikes: a,
            searchCount: o
        };
        return e.get("/newretail/api/mall/product/store/query", i);
    },
    getDetailsById: function(t, r) {
        var u = {
            productId: t,
            storeId: r
        };
        return e.get("/newretail/api/catering/meal/getDetailsById", u);
    }
};