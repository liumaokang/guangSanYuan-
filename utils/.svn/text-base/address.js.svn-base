var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (t[r] = o[r]);
    }
    return t;
}, e = require("../api/storeService.js"), o = require("./utils.js"), r = getApp();

module.exports = {
    storeInfo: "",
    getAllStore: function() {
        var t = this, o = getApp();
        e.queryList().then(function(e) {
            var r = [];
            e.forEach(function(t) {
                "OPEN" === t.status && r.push(t);
            });
            try {
                wx.setStorageSync("wj_allStores", r), wx.getLocation({
                    type: "gcj02",
                    success: function(e) {
                        var a = e.latitude, n = e.longitude;
                        if (o.globalData.storeInfo) r.forEach(function(t) {
                            t.id == o.globalData.storeInfo.id && (o.globalData.storeInfo = t);
                        }); else {
                            var s = t.getNearestStore(r, a, n);
                            o.globalData.storeInfo = r[s];
                        }
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            } catch (t) {
                console.log(t);
            }
        });
    },
    getLocation: function() {
        var o = this;
        return new Promise(function(a, n) {
            wx.getLocation({
                type: "gcj02",
                success: function(s) {
                    var i = s.latitude, u = s.longitude;
                    s.speed, s.accuracy;
                    r.globalData.location = {
                        latitude: s.latitude,
                        longitude: s.longitude
                    };
                    try {
                        var l = wx.getStorageSync("wj_allStores");
                        if (l) {
                            var c = o.getNearestStore(l, i, u);
                            o.storeInfo = l[c], o.storeInfo = t({}, o.storeInfo, {
                                userLatitude: i,
                                userLongitude: u
                            }), a(o.storeInfo);
                        } else e.queryList().then(function(e) {
                            var r = [];
                            e.forEach(function(t) {
                                "OPEN" === t.status && r.push(t);
                            });
                            try {
                                wx.setStorageSync("wj_allStores", r);
                            } catch (t) {
                                n("wj_allStores存储异常"), console.log(t);
                            }
                            var s = o.getNearestStore(r, i, u);
                            o.storeInfo = r[s], o.storeInfo = t({}, o.storeInfo, {
                                userLatitude: i,
                                userLongitude: u
                            }), a(o.storeInfo);
                        }).catch(function(t) {
                            n(t);
                        });
                    } catch (t) {
                        n("wj_allStores存储异常");
                    }
                },
                fail: function(t) {
                    n(t);
                }
            });
        });
    },
    getNearestStore: function(t, e, r) {
        var a = [];
        t.forEach(function(t) {
            if (null != t.latitude && null != t.longitude && "" !== t.latitud && "" !== t.longitude) {
                var n = o.distance(e, r, t.latitude, t.longitude);
                a.push(n);
            } else {
                var s = Number.POSITIVE_INFINITY;
                a.push(s);
            }
        });
        for (var n = Math.min.apply(Math, a), s = 0, i = 0; i < a.length; i++) if (n === a[i]) {
            s = i;
            break;
        }
        return s;
    }
};