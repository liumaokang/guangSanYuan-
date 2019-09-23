var e = require("./request.js");

module.exports = {
    create: function(r) {
        return e.post("/newretail/api/mbr/feedback/create", r);
    }
};