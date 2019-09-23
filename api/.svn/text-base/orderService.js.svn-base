function e(e, r, t) {
    return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}

// var r = require("./request.js"), t = "https://newretail2.xianfengsg.com" === r.DEF_APP_CONFIG.baseUrl, a = require("../utils/auth.js");

module.exports = {
    getStatusCount: function() {
        return r.get("/newretail/api/mall/order/getStatusCount");
    },
    query: function(e) {
        return r.get("/newretail/api/mall/order/query", e);
    },
    create: function(e) {
        return r.post("/newretail/api/mall/order/create", e);
    },
    createCatering: function(e) {
        return r.post("/newretail/api/catering/order/create", e);
    },
    createSecKill: function(e) {
        return r.post("/newretail/api/mall/order/grab/create", e);
    },
    getPaySign: function(e) {
        // return t ? r.post("/gateway/api/mall/order/getPaySign", e) : r.post("http://122.112.215.181/gateway/api/mall/order/getPaySign", e);
    },
    getDetailsById: function(e) {
        var t = {
            orderId: e
        };
        return r.get("/newretail/api/mall/order/getDetailsById", t);
    },
    getOrderStatusById: function(e) {
        var a = {
            orderId: e,
            nums: (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0) + 1
        };
        // return t ? r.post("/gateway/api/mall/order/getPayRound", a) : r.post("http://122.112.215.181/gateway/api/mall/order/getPayRound", a);
    },
    cancel: function(e) {
        return r.put("/newretail/api/mall/order/cancel?orderId=" + e);
    },
    confirm: function(e) {
        return r.put("/newretail/api/mall/order/confirm?orderId=" + e);
    },
    createRefund: function(e) {
        return r.post("/newretail/api/mall/refund/create", e);
    },
    getByOrder: function(e) {
        var t = {
            orderId: e
        };
        return r.get("/newretail/api/mall/refund/getByOrder", t);
    },
    queryRefund: function(e, t, a) {
        var n = {
            page: e,
            pageSize: t,
            orderId: a
        };
        return r.get("/newretail/api/mall/refund/query", n);
    },
    getOrderShipDetails: function(t, a) {
        var n = e({
            trackingCompany: t
        }, "trackingCompany", a);
        return r.get("/api/newretail/api/mall/order/getOrderShipDetails", n);
    },
    createScoreOrder: function(e) {
        return r.post("/newretail/api/mall/order/createScoreOrder", e);
    },
    cardPay: function(e) {
        return r.post("/newretail/api/mall/order/cardPay", e);
    },
    prepareCardPay: function(e) {
        // return t ? r.post("/gateway/api/mall/order/prepareCardPay", e) : r.post("http://122.112.215.181/gateway/api/mall/order/prepareCardPay", e);
    },
    orderLock: function(e) {
        var a = {
            orderId: e
        };
        // return t ? r.post("/gateway/api/mall/order/orderLock", a) : r.post("http://122.112.215.181/gateway/api/mall/order/orderLock", a);
    },
    getRideLocation: function(e) {
        var t = {
            orderId: e
        };
        return r.get("/newretail/api/mall/delivery/getRideLocation", t);
    },
    getAutoCancelPeriod: function() {
        return r.get("/newretail/api/mall/order/getAutoCancelPeriod");
    },
    getProductsByOrderId: function(e) {
        var t = {
            orderId: e
        };
        return r.get("/newretail/api/mall/order/getProductsByOrderId", t);
    },
    calculateCard: function(e) {
        return r.post("/newretail/api/mall/order/calculateCard", e);
    },
    getStoreOff: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments[1];
        return r.post("/erp-proxy/erp/offline/order", {
            page: e,
            pageSize: 10,
            memberId: t
        });
    },
    getBarcode: function(e) {
        return new Promise(function(t, n) {
            var o = a.getTokens(), i = {};
            o && o.accessToken && (i["access-token"] = o.accessToken), wx.request({
                method: "GET",
                url: r.DEF_APP_CONFIG.baseUrl + "/newretail/api/mall/order/getBarCodeById?orderId=" + e,
                header: i,
                responseType: "arraybuffer",
                success: function(e) {
                    t(e.data);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    }
};