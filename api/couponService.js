var t = require("./request.js");
 // e = "https://newretail2.xianfengsg.com" === t.DEF_APP_CONFIG.baseUrl;

module.exports = {
    queryCoupon: function(e) {
        return t.get("/newretail/api/mbr/coupon/query", e);
    },
    query: function(e) {
        if (e.functionEquals && e.functionEquals.length > 1) {
            var n = "";
            return [].concat(e.functionEquals).forEach(function(t, e) {
                n = 0 === e ? n + "?functionEquals=" + t : n + "&functionEquals=" + t;
            }), delete e.functionEquals, t.get("/newretail/api/mbr/coupon/query" + n + "&page=" + e.page + "&pageSize=" + e.pageSize + "&memberMobileEquals=" + e.memberMobileEquals + "&statusEquals=" + e.statusEquals + "&searchCount=" + e.searchCount + "&orderDirection=" + e.orderDirection + "&orderField=" + e.orderField);
        }
        return t.get("/newretail/api/mbr/coupon/query", e);
    },
    queryExternalCoupons: function(e) {
        return t.get("/newretail/api/mbr/coupon/queryExternalCoupons", e);
    },
    getAvailableCoupon: function(e) {
        return t.post("/newretail/api/promotion/calcUsableCoupons", e);
    },
    calcDiscount: function(e) {
        return t.post("/newretail/api/promotion/calcDiscount", e);
    },
    getCouponActivitiesByFilter: function(e) {
        return t.get("/newretail/api/mbr/couponActivity/getCouponActivitiesByFilter", e);
    },
    getExternalCouponActivities: function(e, n) {
        return t.get("/newretail/api/mbr/couponActivity/getExternalCouponActivities?storeId=" + e, n);
    },
    createCouponOrder: function(e, n, o) {
        return "GM" === n ? t.put("/newretail/api/mbr/couponActivity/createCouponOrder?couponActivityId=" + e + "&storeId=" + o) : t.put("/newretail/api/mbr/couponActivity/createCouponOrder?externalCouponActivityId=" + e + "&storeId=" + o);
    },
    getCouponPaySign: function(n) {
        // return e ? t.post("/gateway/api/mbr/couponActivity/getCouponPaySign", n) : t.post("http://122.112.215.181/gateway/api/mbr/couponActivity/getCouponPaySign", n);
    },
    assign: function(e) {
        return t.post("/newretail/api/mbr/coupon/assign", e);
    },
    visited: function(e) {
        return t.put("/newretail/api/mbr/coupon/visited", e);
    },
    getById: function(e) {
        var n = {
            id: e
        };
        return t.get("/newretail/api/mbr/couponActivity/getById", n);
    },
    getMbrUnUseCouponCount: function() {
        return t.get("/newretail/api/mbr/coupon/getMbrUnUseCouponCount");
    },
    getPackageById: function(e) {
        var n = {
            id: e
        };
        return t.get("/newretail/api/mbr/couponActivity/getPackageById", n);
    },
    getCouponOrderById: function(e) {
        var n = {
            orderId: e
        };
        return t.get("/newretail/api/mbr/couponActivity/getCouponOrderById", n);
    },
    backExternalCoupon: function(e) {
        var n = {
            externalCardNum: e
        };
        return t.post("/newretail/api/mall/refund/createCouponOrder", n);
    },
    getNewMbrPopUp: function() {
        return t.get("/newretail/api/mbr/member/newMbrPopUp");
    },
    getCboCouponActivitiesByFilter: function(e) {
        return t.get("/newretail/api/mbr/couponActivity/getCboCouponActivitiesByFilter", e);
    },
    getCboExternalCouponActivities: function(e, n) {
        return t.get("/newretail/api/mbr/couponActivity/getCboExternalCouponActivities?storeId=" + e, n);
    }
};