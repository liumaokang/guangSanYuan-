var e = require("./request.js");

module.exports = {
    refreshToken: function(r) {
        return e.post("/newretail/api/mbr/member/refreshToken", {
            refreshToken: r
        });
    },
    getMbrBalance: function() {
        return e.get("/newretail/api/mbr/member/getMbrBalance");
    },
    resetCardPassword: function(r) {
        return e.post("/newretail/api/mbr/member/resetCardPassword", r);
    },
    visitStore: function(r) {
        return e.put("/newretail/api/mbr/member/visitStore?storeId=" + r);
    },
    query: function(r) {
        return e.get("/newretail/api/mbr/cardPay/query", r);
    },
    getBalance: function(r) {
        var t = {
            memberMobile: r
        };
        return e.get("/newretail/api/mbr/score/getBalance", t);
    },
    queryHst: function(r, t, n) {
        var i = {
            memberMobileEquals: n,
            page: r,
            pageSize: t,
            orderDirection: "desc",
            orderField: "tranTime"
        };
        return e.get("/newretail/api/mbr/score/queryHst", i);
    },
    getScoreDeutible: function(r, t, n) {
        var i = {
            memberScore: r,
            orderPrice: t,
            orderScore: n
        };
        return e.get("/newretail/api/mbr/score/getScoreDeutible", i);
    },
    invite: function(r) {
        return e.post("/newretail/api/mbr/member/invite", r);
    },
    getPayCode: function(r) {
        return e.get("/newretail/api/mbr/member/getPayCode", r);
    },
    getMbrCode: function(r) {
        return e.get("/newretail/api/mbr/member/getMbrCode", r);
    },
    signin: function() {
        return e.post("/newretail/api/mbr/signin");
    },
    querySignin: function(r) {
        return e.get("/newretail/api/mbr/signin/query", r);
    },
    update: function(r) {
        return e.put("/newretail/api/mbr/member/update", r);
    },
    queryGrade: function() {
        return e.get("/newretail/api/mbr/member/grade/query");
    },
    queryMember: function(r) {
        return e.get("/newretail/api/mbr/member/queryMember", r);
    },
    queryMemberDetail: function(r) {
        return e.get("/newretail/api/mbr/member/grade/getById", r);
    },
    isNewMbr: function() {
        return e.get("/newretail/api/mbr/member/isNewMbr");
    },
    getOfflinePaySign: function() {
        return e.get("/newretail/api/payment/wx/getOfflinePaySign");
    }
};