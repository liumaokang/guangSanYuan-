var t = require("./request.js");

require("../utils/utils.js");

module.exports = {
    getCatering: function(e) {
        var r = {
            storeId: e
        };
        return t.get("/newretail/api/catering/shoppingCart/get", r);
    },
    cateringAdd: function(e) {
        return t.post("/newretail/api/catering/shoppingCart/create", e);
    },
    update: function(e) {
        return t.put("/newretail/api/catering/shoppingCart/update", e);
    },
    remove: function(e) {
        return t.delete("/newretail/api/catering/shoppingCart/remove?shoppingItems=" + e);
    },
    get: function(e) {
        var r = {
            storeId: e
        };
        return t.get("/newretail/api/mall/product/shoppingcart/get", r);
    },
    add: function(e) {
        return t.post("/newretail/api/mall/product/shoppingcart/add", e);
    },
    sync: function(e) {
        return t.post("/newretail/api/mall/product/shoppingcart/sync", e);
    },
    removeByProductIds: function(e) {
        return t.delete("/newretail/api/mall/product/shoppingcart/removeByProductIds?productIds=" + e);
    },
    getProductsCount: function() {
        return t.get("/newretail/api/mall/product/shoppingcart/getProductsCount");
    },
    calcDiscount: function(e) {
        return t.post("/newretail/api/promotion/calcDiscount", e);
    }
};