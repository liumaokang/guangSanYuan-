var e = require("./request.js");

require("../utils/utils.js");

module.exports = {
    query: function() {
        return e.get("/newretail/api/mall/deliveryAddress/query");
    },
    create: function(r) {
        return e.post("/newretail/api/mall/deliveryAddress/create", r);
    },
    getDefaultAddress: function() {
        return e.get("/newretail/api/mall/deliveryAddress/getDefaultAddress");
    },
    update: function(r) {
        return e.put("/newretail/api/mall/deliveryAddress/update", r);
    },
    removeById: function(r) {
        return e.delete("/newretail/api/mall/deliveryAddress/removeById?id=" + r);
    },
    checkDelivery: function(r) {
        return e.post("/newretail/api/mall/deliveryAddress/checkDelivery", r);
    }
};