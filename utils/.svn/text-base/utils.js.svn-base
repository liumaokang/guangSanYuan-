function e(e) {
    return e < 10 ? "0" + e : e;
}

var t, n, r = require("../libs/qqmap-wx-jssdk.min.js"), a = function(e) {
    var t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), a = e.getHours(), o = e.getMinutes(), s = e.getSeconds();
    return [ t, n, r ].map(i).join("/") + " " + [ a, o, s ].map(i).join(":");
}, i = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, o = {
    units: "个十百千万@#%亿^&~",
    chars: "零一二三四五六七八九",
    numberToChinese: function(e) {
        if (e > 9999) return "万";
        if (e > 999) return "千";
        var t = (e + "").split(""), n = [], r = this;
        if (t.length > 12) throw new Error("too big");
        for (var a = 0, i = t.length - 1; a <= i; a++) (1 == i || 5 == i || 9 == i) && 0 == a ? "1" != t[a] && n.push(r.chars.charAt(t[a])) : n.push(r.chars.charAt(t[a])), 
        a != i && n.push(r.units.charAt(i - a));
        return n.join("").replace(/零([十百千万亿@#%^&~])/g, function(e, n, a) {
            if (-1 != (a = r.units.indexOf(n))) {
                if ("亿" == n) return n;
                if ("万" == n) return n;
                if ("0" == t[i - a]) return "零";
            }
            return "";
        }).replace(/零+/g, "零").replace(/零([万亿])/g, function(e, t) {
            return t;
        }).replace(/亿[万千百]/g, "亿").replace(/[零]$/, "").replace(/[@#%^&~]/g, function(e) {
            return {
                "@": "十",
                "#": "百",
                "%": "千",
                "^": "十",
                "&": "百",
                "~": "千"
            }[e];
        }).replace(/([亿万])([一-九])/g, function(e, n, a, o) {
            return -1 != (o = r.units.indexOf(n)) && "0" == t[i - o] ? n + "零" + a : e;
        });
    }
}, s = wx.getSystemInfoSync().windowWidth;

module.exports = {
    setHideLoading: function(e) {
        n = e;
    },
    isHideLoading: function() {
        return n;
    },
    sleep: function(e) {
        for (var t = new Date().getTime(); new Date().getTime() - t < e; ) ;
    },
    formatTime: a,
    distance: function(e, t, n, r) {
        var a = e * Math.PI / 180, i = n * Math.PI / 180, o = a - i, s = t * Math.PI / 180 - r * Math.PI / 180, u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(o / 2), 2) + Math.cos(a) * Math.cos(i) * Math.pow(Math.sin(s / 2), 2)));
        return u *= 6378.137, u = Math.round(1e4 * u) / 1e4;
    },
    calculateDistance: function(e, n, a, i) {
        return t = new r({
            key: "M4TBZ-4KSRI-DQPGJ-54BUF-UUJX5-YKFH3"
        }), new Promise(function(r, o) {
            t.calculateDistance({
                mode: "driving",
                from: {
                    latitude: a,
                    longitude: i
                },
                to: [ {
                    latitude: e,
                    longitude: n
                } ],
                success: function(e) {
                    r(e);
                },
                fail: function(e) {
                    o(e);
                },
                complete: function(e) {}
            });
        });
    },
    timeFormat: e,
    countDown: function(t) {
        var n = this, r = new Date().getTime() / 1e3, a = [];
        return t.forEach(function(t) {
            var i = t.openTeamTime.substr(0, 10), o = "00" == t.openTeamTime.substr(11, 2) ? 0 : t.openTeamTime.substr(11, 2).replace(/\b(0+)/gi, ""), s = "00" == t.openTeamTime.substr(14, 2) ? 0 : t.openTeamTime.substr(14, 2).replace(/\b(0+)/gi, ""), u = "00" == t.openTeamTime.substr(17, 2) ? 0 : t.openTeamTime.substr(17, 2).replace(/\b(0+)/gi, ""), c = parseInt(new Date(i).getTime() / 1e3) + parseInt(t.duration) + 3600 * parseInt(o) + 60 * parseInt(s) + parseInt(u) - 28800, l = null;
            if (c - r > 0) {
                var p = c - r, h = parseInt(p / 86400), m = parseInt(p % 86400 / 3600) + parseInt(24 * h), f = parseInt(p % 86400 % 3600 / 60), g = parseInt(p % 86400 % 3600 % 60);
                l = {
                    day: n.timeFormat(h),
                    hou: e(m + 24 * h),
                    min: e(f),
                    sec: e(g)
                };
            } else l = {
                hou: "00",
                min: "00",
                sec: "00"
            };
            a.push(l);
        }), a;
    },
    countDownDay: function(t) {
        var n = new Date().getTime() / 1e3, r = [];
        return t.forEach(function(t) {
            var a = t.openTeamTime.substr(0, 10), i = "00" == t.openTeamTime.substr(11, 2) ? 0 : t.openTeamTime.substr(11, 2).replace(/\b(0+)/gi, ""), o = "00" == t.openTeamTime.substr(14, 2) ? 0 : t.openTeamTime.substr(14, 2).replace(/\b(0+)/gi, ""), s = "00" == t.openTeamTime.substr(17, 2) ? 0 : t.openTeamTime.substr(17, 2).replace(/\b(0+)/gi, ""), u = parseInt(new Date(a).getTime() / 1e3) + parseInt(t.duration) + 3600 * parseInt(i) + 60 * parseInt(o) + parseInt(s) - 28800, c = null;
            if (u - n > 0) {
                var l = u - n, p = parseInt(l / 86400), h = parseInt(l % 86400 / 3600), m = parseInt(l % 86400 % 3600 / 60), f = parseInt(l % 86400 % 3600 % 60);
                c = {
                    day: p,
                    hou: e(h + 24 * p),
                    min: e(m),
                    sec: e(f)
                };
            } else c = {
                day: "00",
                hou: "00",
                min: "00",
                sec: "00"
            };
            r.push(c);
        }), r;
    },
    handleLoginStatus: function(e) {
        20 !== e.code && wx.showToast({
            title: e.message,
            icon: "none",
            duration: 2e3
        });
    },
    numberConversion: o,
    timestampToTime: function(e) {
        var t = new Date(e);
        return t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + i(t.getDate());
    },
    dealWords: function(e) {
        e.ctx.setFontSize(e.fontSize);
        for (var t = Math.ceil(e.ctx.measureText(e.word).width / e.maxWidth), n = t >= e.maxLine ? e.maxLine : t, r = 0, a = 0; a < n; a++) {
            var i = e.word.slice(r), o = 0;
            if (e.ctx.measureText(i).width > e.maxWidth) {
                for (var s = 0; s < i.length; s++) if ((o += e.ctx.measureText(i[s]).width) > e.maxWidth) {
                    a === e.maxLine - 1 ? e.ctx.fillText(i.slice(0, s - 1) + "...", e.x, e.y + 18 * (a + 1)) : e.ctx.fillText(i.slice(0, s), e.x, e.y + 18 * (a + 1)), 
                    r += s;
                    break;
                }
            } else e.ctx.fillText(i.slice(0), e.x, e.y + 18 * (a + 1));
        }
    },
    roundRect: function(e, t, n, r, a, i) {
        e.save(), r < 2 * i && (i = r / 2), a < 2 * i && (i = a / 2), e.beginPath(), e.setStrokeStyle("#fff"), 
        e.moveTo(t + i, n), e.arcTo(t + r, n, t + r, n + a, i), e.arcTo(t + r, n + a, t, n + a, i), 
        e.arcTo(t, n + a, t, n, i), e.arcTo(t, n, t + r, n, i), e.stroke(), e.closePath(), 
        e.draw(!0);
    },
    getSharePictures: function(e) {
        var t = getApp(), n = require("../api/sharePicturesService.js");
        return new Promise(function(r, a) {
            n.getByModelType(e).then(function(n) {
                if (n) {
                    if ("DEFAULT" === e) {
                        t.globalData.sharePictures = n.pictureUrl;
                        try {
                            wx.setStorageSync("wj_sharePictures", n.pictureUrl);
                        } catch (e) {}
                    }
                    r(n.pictureUrl);
                } else r(t.globalData.sharePictures ? t.globalData.sharePictures : "");
            }).catch(function(e) {
                a(e);
            });
        });
    },
    bezier: function(e, t) {
        for (var n, r, a, i = [], o = 0; o <= t; o++) {
            for (a = e.slice(0), r = []; n = a.shift(); ) if (a.length) r.push(function(e, t) {
                var n, r, a, i, o, s, u, c;
                return n = e[0], r = e[1], i = r.x - n.x, o = r.y - n.y, a = Math.pow(Math.pow(i, 2) + Math.pow(o, 2), .5), 
                s = o / i, u = Math.atan(s), c = a * t, {
                    x: n.x + c * Math.cos(u),
                    y: n.y + c * Math.sin(u)
                };
            }([ n, a[0] ], o / t)); else {
                if (!(r.length > 1)) break;
                a = r, r = [];
            }
            i.push(r[0]);
        }
        return {
            bezier_points: i
        };
    },
    checkIsTabBar: function(e) {
        var t = getApp(), n = !1;
        return t.globalData.tabBar.list && t.globalData.tabBar.list.length > 0 && t.globalData.tabBar.list.forEach(function(t) {
            t.pagePath === e && (n = !0);
        }), n;
    },
    getPx: function(e) {
        return e * s / 750;
    },
    getScopeTime: function(e) {
        var t = a(new Date()).split(" ")[0] + " " + e + ":00";
        return new Date(t).getTime();
    },
    getDayStartTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, r = e.getDate(), a = (e.getHours(), 
        e.getMinutes(), e.getSeconds(), [ t, n, r ].map(i).join("/") + " " + [ "00", "00", "00" ].join(":"));
        return new Date(a).getTime();
    }
};