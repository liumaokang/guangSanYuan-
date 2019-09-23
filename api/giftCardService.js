var r = require("./request.js");

module.exports = {
    queryActivityGroup: function() {
        return r.get("/newretail/api/mbr/giftCard/queryActivityGroup");
    },
    queryActivityDetails: function(t) {
        var e = {
            giftCardActivityId: t
        };
        return r.get("/newretail/api/mbr/giftCard/queryActivityDetails", e);
    },
    queryMyGiftCard: function(t, e) {
        var a = {
            memberIdEquals: t,
            stateEquals: e || ""
        };
        return r.get("/newretail/api/mbr/giftCard/queryMyGiftCard", a);
    },
    createOrder: function(t) {
        return r.post("/newretail/api/mbr/giftCard/order/create", t);
    },
    getPaySign: function(t) {
        return r.post("/newretail/api/mbr/giftCard/order/getPaySign", t);
    },
    getStatusById: function(t, e) {
        var a = {
            orderId: t
        };
        return r.get("/newretail/api/mbr/giftCard/order/getStatusById", a);
    },
    queryMyGiftCardDetails: function(t) {
        var e = {
            cardNo: t
        };
        return r.get("/newretail/api/mbr/giftCard/queryMyGiftCardDetails", e);
    },
    active: function(t) {
        return r.put("/newretail/api/mbr/giftCard/active?cardNo=" + t);
    },
    donate: function(t) {
        return r.put("/newretail/api/mbr/giftCard/donate?cardNo=" + t);
    },
    acquireDonate: function(t) {
        var e = {
            cardNo: t
        };
        return r.get("/newretail/api/mbr/giftCard/acquireDonate", e);
    },
    queryGiftCardInfo: function(t) {
        var e = {
            cardNo: t
        };
        return r.get("/newretail/api/mbr/giftCard/queryGiftCardInfo", e);
    },
    getPayCode: function(t) {
        var e = {
            giftCardNo: t
        };
        return r.get("/newretail/api/mbr/giftCard/getPayCode", e);
    },
    getById: function(t) {
        var e = {
            id: t
        };
        return r.get("/newretail/api/mbr/giftCard/activity/getById", e);
    }
};