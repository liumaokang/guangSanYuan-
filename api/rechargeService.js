// var e = require("./request.js"), r = "https://newretail2.xianfengsg.com" === e.DEF_APP_CONFIG.baseUrl;

module.exports = {
    query: function(r) {
        return e.get("/newretail/api/mbr/recharge/query?storeId=" + r);
    },
    createOrder: function(r) {
        return e.post("/newretail/api/mbr/recharge/createOrder", r);
    },
    getPaySign: function(t) {
        // return r ? e.post("/gateway/api/mbr/recharge/getPaySign", t) : e.post("http://122.112.215.181/gateway/api/mbr/recharge/getPaySign", t);
    }
};