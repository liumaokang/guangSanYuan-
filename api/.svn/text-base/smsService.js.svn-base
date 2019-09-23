var e = require("./request.js");

require("../utils/utils.js");

module.exports = {
    sendSms: function(s) {
        var r = {
            mobile: s
        };
        return e.post("/newretail/api/sms/sendSms", r);
    }
};