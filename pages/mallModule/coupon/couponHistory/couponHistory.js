var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = require("../../../../api/couponService.js"), o = require("../../../../utils/navPage.js"), a = getApp();

Page({
    data: {
        type: "DISCOUNT",
        couponList: [],
        allCouponsList: [],
        page: 1,
        externalPage: 0,
        pageSize: 10,
        member: {},
        noCouponData: !1,
        load: !1
    },
    toHome: function() {
        o.toHome();
    },
    toCouponDetails: function(t) {
        console.log(t.currentTarget.dataset.activityid, t.currentTarget.dataset.type);
        var e = t.currentTarget.dataset.external, a = t.currentTarget.dataset.activityid, n = t.currentTarget.dataset.type, i = this.data.allCouponsList, s = t.currentTarget.dataset.id;
        if (e) {
            var r = null;
            i.forEach(function(t) {
                t.externalCardNum === s && (r = t);
            });
            var u = JSON.stringify(r), l = "?couponActivityId=" + a + "&type=" + n + "&couponId=" + s + "&isExternal=" + e + "&coupon=" + u;
            o.toCouponDetails(l);
        } else {
            var c = "?couponActivityId=" + a + "&type=" + n + "&couponId=" + s + "&isExternal=" + e;
            o.toCouponDetails(c);
        }
    },
    queryHistoryCoupons: function(o, a, n, i) {
        var s = this, r = {
            page: o,
            pageSize: a,
            memberMobileEquals: n,
            statusEquals: "HISTORY",
            searchCount: !0,
            orderDirection: "desc",
            orderField: "assign_time"
        };
        r = "FREESHIP" === i ? t({}, r, {
            functionEquals: i
        }) : t({}, r, {
            functionEquals: [ "CASH", "DISCOUNT", "GIFT" ]
        }), console.log(r.functionEquals);
        var u = [];
        return e.query(r).then(function(e) {
            if (e.records && e.records.length > 0) {
                s.data.couponsList = [], e.records.forEach(function(e) {
                    var o = {
                        id: e.id,
                        faceValue: e.faceValue,
                        balance: e.balance,
                        couponTypeName: e.couponTypeName,
                        couponActivityName: e.couponActivityName,
                        bytimeStart: e.bytimeStart,
                        bytimeEnd: e.bytimeEnd,
                        status: e.status,
                        statusDesc: s.handleCouponStatus(e.status),
                        rate: e.rate || 0 === e.rate ? (10 * e.rate).toFixed(1) : "",
                        function: e.function,
                        name: s.handleCouponName(e.function),
                        couponActivityId: e.couponActivityId,
                        isExternal: !1
                    };
                    if (e.bytimeStart) {
                        var a = e.bytimeStart.slice(0, 16), n = e.bytimeEnd.slice(0, 16);
                        o = t({}, o, {
                            effectiveTime: a + " ~ " + n
                        });
                    } else o = t({}, o, {
                        effectiveTime: ""
                    });
                    "DISCOUNT" === i ? "FREESHIP" !== e.function && u.push(o) : u.push(o);
                });
                var o = [];
                o = (o = [].concat(s.data.allCouponsList)).concat(e.records), s.setData({
                    allCouponsList: o
                });
            }
            return u;
        }).catch(function(t) {
            return wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), [];
        });
    },
    handleCouponName: function(t) {
        return "FREESHIP" === t ? "运费券" : "DISCOUNT" === t ? "折扣券" : "CASH" === t ? "现金券" : "GIFT" === t ? "礼品券" : "优惠券";
    },
    handleCouponStatus: function(t) {
        return "OPEN" === t ? "已发放" : "USED" === t ? "已使用" : "EXPIRE" === t ? "已过期" : "CANCEL" === t ? "已作废" : "MADE" === t ? "已生成" : "已领取";
    },
    setCoupons: function(t) {
        var e = this, o = e.data.couponList;
        o = o.concat(t), e.setData({
            couponList: o,
            load: !1
        });
    },
    queryExternalCoupons: function() {
        var o = this, a = [], n = o.data.externalPage, i = o.data.member.id, s = o.data.pageSize, r = {
            memberId: i,
            page: n,
            pageSize: s,
            state: "HISTORY"
        }, u = e.queryExternalCoupons(r).then(function(e) {
            if (wx.hideToast(), console.log(e), e && e.length > 0) {
                var n = [];
                e.forEach(function(e) {
                    n.push(e);
                    var i = {
                        id: e.externalCardNum,
                        faceValue: e.faceValue,
                        balance: e.balance,
                        couponTypeName: e.couponTypeName,
                        couponActivityName: e.couponActivityName,
                        bytimeStart: e.bytimeStart,
                        bytimeEnd: e.bytimeEnd,
                        status: e.status,
                        statusDesc: o.handleCouponStatus(e.status),
                        rate: e.rate || 0 === e.rate ? (10 * e.rate).toFixed(1) : "",
                        function: e.function,
                        name: o.handleCouponName(e.function),
                        couponActivityId: e.couponActivityId,
                        isExternal: !0
                    };
                    if (e.bytimeStart) {
                        var s = e.bytimeStart.split(" ")[0], r = e.bytimeEnd.split(" ")[0];
                        i = t({}, i, {
                            effectiveTime: s + " 至 " + r
                        });
                    } else i = t({}, i, {
                        effectiveTime: ""
                    });
                    "DISCOUNT" === o.data.type && "FREESHIP" !== e.function && a.push(i);
                });
                var i = [];
                i = (i = [].concat(o.data.allCouponsList)).concat(n), o.setData({
                    allCouponsList: i
                });
            }
            return a;
        }).catch(function(t) {
            return wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), [];
        });
        Promise.all([ u ]).then(function(t) {
            console.log(t), t[0] && t[0].length > 0 ? (console.log(t[0]), o.setCoupons(t[0]), 
            n++, o.setData({
                externalPage: n
            })) : o.setData({
                load: !1,
                noCouponData: !0
            });
        });
    },
    onLoad: function(t) {
        wx.hideShareMenu();
        var e = this;
        if (console.log(t), t.type && e.setData({
            type: t.type
        }), a.globalData.userInfo && a.globalData.userInfo.member) {
            var o = a.globalData.userInfo.member.mobile;
            e.setData({
                member: a.globalData.userInfo.member
            });
            var n = e.data.type, i = e.queryHistoryCoupons(1, 10, o, n);
            Promise.all([ i ]).then(function(t) {
                console.log(t[0]), t[0] && t[0].length > 0 ? (e.setData({
                    couponList: t[0]
                }), t[0].length < e.data.limit && (console.log("内部券数量不够，查询外部券"), e.queryExternalCoupons())) : (e.setData({
                    couponList: []
                }), e.queryExternalCoupons());
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        console.log("onPullDownRefresh");
        var t = this;
        if (t.setData({
            page: 1,
            externalPage: 0
        }), a.globalData.userInfo && a.globalData.userInfo.member) {
            var e = a.globalData.userInfo.member.mobile, o = t.data.type, n = t.queryHistoryCoupons(1, 10, e, o);
            Promise.all([ n ]).then(function(e) {
                console.log(e[0]), e[0] && e[0].length > 0 ? (t.setData({
                    couponList: e[0]
                }), e[0].length < t.data.limit && (console.log("内部券数量不够，查询外部券"), t.queryExternalCoupons())) : (t.setData({
                    couponList: []
                }), t.queryExternalCoupons()), wx.stopPullDownRefresh();
            });
        }
    },
    onReachBottom: function() {
        console.log("onReachBottom"), this.loadingCoupon();
    },
    loadingCoupon: function() {
        var t = this;
        t.setData({
            load: !0
        });
        var e = t.data.page;
        e++;
        var o = t.data.type, a = t.queryHistoryCoupons(e, t.data.pageSize, t.data.member.mobile, o);
        Promise.all([ a ]).then(function(o) {
            o[0] && o[0].length > 0 ? (console.log(o[0]), t.setCoupons(o[0]), t.setData({
                page: e
            }), o[0].length < t.data.limit && (console.log("内部券数量不够，查询外部券"), t.queryExternalCoupons())) : (console.log("123"), 
            t.queryExternalCoupons()), wx.stopPullDownRefresh();
        });
    },
    onShareAppMessage: function() {}
});