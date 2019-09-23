var e = require("./request.js");

module.exports = {
    getById: function(r) {
        var t = {
            id: r
        };
        return e.get("/newretail/api/sys/user/getById", t);
    },
    phoneUnbind: function() {
        return e.post("/newretail/api/mbr/member/weChatUntying");
    }
};