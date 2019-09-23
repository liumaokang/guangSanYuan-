function t(t) {
    if ((r = n.globalData.tabBar.list.length) > 0) {
        var i = 0;
        n.globalData.tabBar.list.forEach(function(t, e) {
            "/pages/mallModule/goods/shopcart/shopcart" === t.pagePath && (i = e);
        });
        var e = {};
        return e.x = o.windowWidth - o.windowWidth / r * (r - i), e.y = o.windowHeight - 98 / 750 * o.windowWidth, 
        "right" === t && (e.x = o.windowWidth - o.windowWidth / r * (r - i - 1)), e;
    }
}

var i = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var e = arguments[i];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, e = require("./utils.js"), n = getApp(), o = n.globalData.systemInfo, r = 0, d = {}, a = wx.createAnimation({
    duration: 1500,
    timingFunction: "ease-in"
});

module.exports = {
    touchOnGoods: function(n, r, a, w) {
        function l(t) {
            var a = x.x;
            Object.keys(t).length > 0 ? t.x > a && (c = "right") : "normal" === n ? (t.x = 20, 
            t.y = r.clientY - 190 / 750 * o.windowWidth) : "three" === n ? (t.x = r.clientX - 190 / 750 * o.windowWidth, 
            t.y = r.clientY - 380 / 750 * o.windowWidth, t.x < a || (t.x = r.clientX - .28 * o.windowWidth, 
            t.y = r.clientY - 380 / 750 * o.windowWidth, c = "right")) : "detail" === n ? (t.x = 0, 
            t.y = 0) : (t.x = 20, t.y = r.clientY - 190 / 750 * o.windowWidth);
            var l = {}, s = {};
            s.x = t.x, s.y = t.y, s.y < d.y ? l.y = s.y + .2 * o.windowWidth : l.y = d.y + .2 * o.windowWidth, 
            l.x = Math.abs(s.x - d.x) / 2, s.x > d.x ? l.x = (s.x - d.x) / 2 + d.x : l.x = (d.x - s.x) / 2 + s.x, 
            h.linePos = "left" === c ? e.bezier([ s, l, d ], 30) : e.bezier([ d, l, s ], 30);
            var u = h.startAnimation(c, h, w);
            return u = i({}, u, {
                finger: t
            });
        }
        var h = this, s = {}, c = "left";
        d = t(c);
        var x = t("right");
        return "secondkill" == w ? (d.x = .08 * o.windowWidth, d.y = o.windowHeight - .16 * o.windowWidth, 
        x.x = .16 * o.windowWidth, x.y = o.windowHeight - .16 * o.windowWidth) : null != w && (d.x = .24 * o.windowWidth, 
        d.y = o.windowHeight - .16 * o.windowWidth, x.x = .32 * o.windowWidth, x.y = o.windowHeight - .16 * o.windowWidth), 
        new Promise(function(t, i) {
            if (wx.canIUse("createSelectorQuery")) {
                var e = wx.createSelectorQuery();
                e.select("#products-" + a).boundingClientRect(), e.selectViewport().scrollOffset(), 
                e.exec(function(i) {
                    if (i) {
                        console.log(i), s.x = i[0].left, s.y = i[0].top;
                        var e = l(s);
                        t(e);
                    } else {
                        var n = l(s);
                        t(n);
                    }
                });
            } else {
                var n = l(s);
                t(n);
            }
        });
    },
    startAnimation: function(t, i, e) {
        var n = i.linePos.bezier_points, r = n.length, d = 18 * r;
        if (null != e) for (var w = 0; w < n.length; w++) a.left(n[w].x).top(n[w].y).width(o.windowWidth * (1 - .03 * w)).height(o.windowWidth * (1 - .03 * w)).step({
            duration: 18
        }), w === n.length - 1 && a.left(n[w].x).top(n[w].y).width(0).height(0).step({
            duration: 0
        }); else if ("left" === t) for (var l = 0; l < n.length; l++) a.left(n[l].x).top(n[l].y).scale(1 - .03 * l).step({
            duration: 18
        }); else for (var h = r - 1; h > 0; h--) a.left(n[h].x).top(n[h].y).scale(.03 * h).step({
            duration: 18
        });
        return {
            animation: a.export(),
            duration: d
        };
    }
};