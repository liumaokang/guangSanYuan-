var e = require("./request.js");

require("../utils/utils.js");

module.exports = {
    //banner图展示
    getBannerList: function(t) {
        var n = {
            bannerType: t
        };
        return e.get("/newretail/api/mall/banner/getBannerList", n);
    },
    getStoreBannerList: function(t, n) {
        var r = {
            bannerType: t,
            storeId: n
        };
        return e.get("/newretail/api/mall/banner/getBannerList", r);
    },
    getAdsenseList: function(t) {
        var n = {
            storeId: t
        };
        return e.get("/newretail/api/mall/adsense/getAdsenseList", n);
    }
};