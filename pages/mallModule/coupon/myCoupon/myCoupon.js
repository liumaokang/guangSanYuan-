var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = require("../../../../api/couponService.js"), o = require("../../../../utils/navPage.js"), a = getApp();

var server = require("../../../../utils/server.js");
var imageUrl = url + "/upload/wxapi/";
Page({
    data: {
        imageUrl: imageUrl,
        userInfo: {},
        type: "unuse",
        page: 1,
        pageSize: 10,
        externalPage: 0,
        limit: 10,
        available: !0,
        searchCount: !0,
        pageCount: 1,
        couponsList: [],
        discountCoupon: [],
        freeshipCoupon: [],
        coupon:[],
        x: 750,
        y: 450,
        scale: 2,
        homeBack: !1,
        loading: !0,
        member: {},
        load: !1,
        loadingText: "正在加载...",
        noCouponData: !1,
        historyCouponList: [],
        historyFreeshipList: [],
        historyAllCouponsList: [],
        usedCouponList: [],
        usedFreeshipList: [],
        usedAllCouponsList: [],
        historyPage: 1,
        historyExternalPage: 0,
        historyPageSize: 10,
        historyLoad: !1,
        historyNoCouponData: !1,
        index:0
    },
    _data: {
        couponsList: [],
        discountCoupon: [],
        freeshipCoupon: []
    },
    checkAuth: function() {
        return !!a.globalData.userInfo;
    },
    clickCategory: function(t) {
        var e = t.currentTarget.dataset.type;
        var index = t.currentTarget.dataset.index;

        this.setData({
            type: e,
            index:index,
        });

        this.mycoupon()

    },
    toCouponDetails: function(t) {
        var e = t.currentTarget.dataset.external, a = t.currentTarget.dataset.activityid, n = t.currentTarget.dataset.type, i = t.currentTarget.dataset.id;
        if (e) {
            var s = t.currentTarget.dataset.item;
            console.log(s);
            var u = JSON.stringify(s.originCoupon);
            wx.setStorageSync("wr_couponDetail", s.originCoupon);
            var r = "?couponActivityId=" + a + "&type=" + n + "&couponId=" + i + "&isExternal=" + e + "&coupon=" + u;
            o.toCouponDetails(r);
        } else {
            var c = "?couponActivityId=" + a + "&type=" + n + "&couponId=" + i + "&isExternal=" + e;
            o.toCouponDetails(c);
        }
    },
    toCouponHistory: function(t) {
        var e = "?type=" + t.currentTarget.dataset.type;
        o.toCouponHistory(e);
    },
    toIndex: function() {
        o.toHome();
    },
    getCouponList: function(o, a, n, i) {



        var s = this, u = [], r = [], c = [], l = {
            page: o,
            pageSize: a,
            searchCount: n,
            memberIdEquals: i,
            memberMobileEquals: this.data.member.mobile,
            orderDirection: "desc",
            orderField: "assign_time",
            statusEquals: "OPEN"
        };
        return e.queryCoupon(l).then(function(e) {
            wx.hideToast(), s.setData({
                pageCount: e.pageCount
            });
            var o = s;
            if (e.records && e.records.length > 0) {
                e.records.forEach(function(e) {
                    console.log(new Date(e.bytimeEnd.replace(/-/gi, "/")).getTime() - Date.now());
                    var a = {
                        id: e.id,
                        faceValue: e.faceValue,
                        balance: e.balance,
                        couponTypeName: e.couponTypeName,
                        couponActivityName: e.couponActivityName,
                        bytimeStart: e.bytimeStart,
                        willTimeout: new Date(e.bytimeEnd.replace(/-/gi, "/")).getTime() - Date.now() < 2592e5,
                        bytimeEnd: e.bytimeEnd,
                        status: e.status,
                        statusDesc: o.handleCouponStatus(e.status),
                        rate: e.rate || 0 === e.rate ? (10 * e.rate).toFixed(1) : "",
                        function: e.function,
                        name: o.handleCouponName(e.function),
                        couponActivityId: e.couponActivityId,
                        isExternal: !1,
                        allProduct: e.allProduct
                    };
                    if (e.bytimeStart) {
                        var n = e.bytimeStart.slice(0, 16), i = e.bytimeEnd.slice(0, 16);
                        a = t({}, a, {
                            effectiveTime: n + " ~ " + i
                        });
                    } else a = t({}, a, {
                        effectiveTime: ""
                    });
                    "FREESHIP" === e.function ? c.push(a) : r.push(a);
                });
                var a = [];
                a = (a = [].concat(o._data.couponsList)).concat(e.records), o._data.couponsList = a, 
                o.setData({
                    couponsList: a
                });
            }
            return u.push(r, c), u;
        }).catch(function(t) {
            return wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), u.push(r, c), u;
        });
    },
    handleCouponName: function(t) {
        return "FREESHIP" === t ? "运费券" : "DISCOUNT" === t ? "折扣券" : "CASH" === t ? "现金券" : "GIFT" === t ? "礼品券" : "优惠券";
    },
    handleCouponStatus: function(t) {
        return "OPEN" === t ? "已发放" : "USED" === t ? "已使用" : "EXPIRE" === t ? "已过期" : "CANCEL" === t ? "已作废" : "MADE" === t ? "已生成" : "已领取";
    },
    queryExternalCoupons: function() {
        var o = this, a = [], n = [], i = [], s = o.data.externalPage, u = o.data.member.id, r = o.data.pageSize, c = {
            memberId: u,
            page: s,
            pageSize: r,
            state: "UNUSED"
        }, l = e.queryExternalCoupons(c).then(function(e) {
            if (wx.hideToast(), console.log(e), e && e.length > 0) {
                var s = [];
                e.forEach(function(e) {
                    if ("OPEN" === e.status) {
                        s.push(e);
                        var a = {
                            id: e.externalCardNum,
                            originCoupon: e,
                            canRefund: "HD" === e.couponServiceType && e.price && e.price > 0,
                            faceValue: e.faceValue,
                            balance: e.balance,
                            couponTypeName: e.couponTypeName,
                            couponActivityName: e.couponActivityName,
                            bytimeStart: e.bytimeStart,
                            willTimeout: new Date(e.bytimeEnd.replace(/-/gi, "/")).getTime() - Date.now() < 2592e5,
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
                            var u = e.bytimeStart.split(" ")[0] + " ~ " + e.bytimeEnd.split(" ")[0];
                            e.couponActivityName.indexOf("双十二") >= 0 && (u = "2018-12-12 00:00 ~ 2018-12-12 23:59"), 
                            a = t({}, a, {
                                effectiveTime: u
                            });
                        } else a = t({}, a, {
                            effectiveTime: ""
                        });
                        "FREESHIP" === e.function ? i.push(a) : n.push(a);
                    }
                }), console.log(o.data.couponsList);
                var u = [];
                u = (u = [].concat(o._data.couponsList)).concat(s), o.setData({
                    couponsList: u
                });
            }
            return a.push(n, i), a;
        }).catch(function(t) {
            return wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), a.push(n, i), a;
        });
        Promise.all([ l ]).then(function(t) {
            console.log(t), t[0] && (t[0][0].length > 0 || t[0][1].length > 0) ? (console.log(t[0]), 
            o.setCoupons(t[0]), s++, o.setData({
                externalPage: s
            })) : o.setData({
                load: !1,
                noCouponData: !0
            });
        });
    },
    toHome: function() {
        wx.navigateTo({
          url: '../../goods/shopcart/shopcart',
        })
    },

    mycoupon: function () {
         console.log('优惠券');
      var that = this;
      var tab=that.data.index
      var wxtoken = wx.getStorageSync('wxtoken')
        server.getJSON('/User/coupon/type/' + tab + '/wxtoken/' + wx.getStorageSync('wxtoken'), function(res) {
            if (res.data.status == 1) {
                var coupon_list = res.data.result.list;
                that.setData({
                    coupon: coupon_list,
                });
            } else if (res.data.status == -1) {
                wx.switchTab({
                    url: '../../wode/choice/choice',
                })
            }
        });

    },
    onLoad: function(t) {
        wx.hideShareMenu();
        var e = this, o = getCurrentPages();
        console.log(o), 1 === o.length && this.setData({
            homeBack: !0
        });
        // try {
        //     var n = wx.getStorageSync("wj_member");
        //     if (n) {
        //         var i = e.checkAuth();
        //         if (e.setData({
        //             member: n
        //         }), i) if (a.globalData.userInfo.member) {
        //             this.historyLoad(a.globalData.userInfo.member.mobile);
        //             var s = e.getCouponList(e.data.page, e.data.pageSize, e.data.searchCount, n.id);
        //             Promise.all([ s ]).then(function(t) {
        //                 console.log(t), t[0][0].length > 0 || t[0][1].length > 0 ? (e._data.discountCoupon = t[0][0], 
        //                 e._data.freeshipCoupon = t[0][1], e.setData({
        //                     discountCoupon: t[0][0],
        //                     freeshipCoupon: t[0][1]
        //                 }), t[0][0] && t[0][0].length < e.data.limit && e.queryExternalCoupons()) : e.queryExternalCoupons(), 
        //                 e.setData({
        //                     loading: !1
        //                 });
        //             });
        //         } else wx.showToast({
        //             title: "您还不是会员，请先绑定手机号码成为会员",
        //             icon: "none",
        //             duration: 2e3
        //         }), e.setData({
        //             loading: !1
        //         }); else wx.showToast({
        //             title: "您还未授权，请点击头像授权",
        //             icon: "none",
        //             duration: 2e3
        //         }), e.setData({
        //             loading: !1
        //         });
        //     } else wx.showToast({
        //         title: "您还不是会员，请先绑定手机号码成为会员",
        //         icon: "none",
        //         duration: 2e3
        //     }), e.setData({
        //         loading: !1
        //     });
        // } catch (t) {}
    },
    onReady: function() {},
    onShow: function() {
      var that = this;
      that.mycoupon()
       
    
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        if ("unuse" == t.data.type) if (t.setData({
            page: 1,
            externalPage: 0,
            couponsList: [],
            discountCoupon: [],
            freeshipCoupon: []
        }), t._data.couponsList = [], t._data.discountCoupon = [], t._data.freeshipCoupon = [], 
        a.globalData.userInfo && a.globalData.userInfo.member) {
            var e = this.getCouponList(1, t.data.pageSize, t.data.searchCount, t.data.member.id);
            Promise.all([ e ]).then(function(e) {
                console.log(e[0]), e[0] && (e[0][0].length > 0 || e[0][1].length > 0) ? (t._data.discountCoupon = e[0][0], 
                t._data.freeshipCoupon = e[0][1], t.setData({
                    discountCoupon: e[0][0],
                    freeshipCoupon: e[0][1]
                }), e[0][0] && e[0][0].length < t.data.limit && t.queryExternalCoupons()) : t.queryExternalCoupons(), 
                wx.stopPullDownRefresh();
            });
        } else wx.showToast({
            title: "您还不是会员，请绑定手机号成为会员~",
            icon: "none",
            duration: 2e3
        }); else if (t.setData({
            historyPage: 1,
            historyExternalPage: 0
        }), a.globalData.userInfo && a.globalData.userInfo.member) {
            var o = a.globalData.userInfo.member.mobile, n = t.queryHistoryCoupons(1, 10, o);
            Promise.all([ n ]).then(function(e) {
                console.log(e[0]), e[0] && e[0].length > 0 ? (t.setData({
                    historyCouponList: e[0].filter(function(t) {
                        return "USED" !== t.status;
                    }),
                    usedCouponList: e[0].filter(function(t) {
                        return "USED" === t.status;
                    })
                }), e[0].length < 5 && (console.log("内部券数量不够，查询外部券"), t.historyQueryExternalCoupons())) : (t.setData({
                    historyCouponList: [],
                    usedCouponList: []
                }), t.historyQueryExternalCoupons()), wx.stopPullDownRefresh();
            });
        }
    },
    onReachBottom: function() {
        console.log("onReachBottom"), this.loadingCoupon(), this.historyLoadingCoupon();
    },
    loadingCoupon: function() {
        var t = this;
        t.setData({
            load: !0
        }), this._data.couponsList = this.data.couponsList, this._data.discountCoupon = this.data.discountCoupon, 
        this._data.freeshipCoupon = this.data.freeshipCoupon;
        var e = t.data.page;
        t.data.member.id;
        e++;
        var o = this.getCouponList(e, t.data.pageSize, t.data.searchCount, t.data.member.id);
        Promise.all([ o ]).then(function(o) {
            o[0] && (o[0][0].length > 0 || o[0][1].length > 0) ? (console.log(o[0]), t.setCoupons(o[0]), 
            t.setData({
                page: e
            }), o[0].length < t.data.limit && (console.log("内部券数量不够，查询外部券"), t.queryExternalCoupons())) : t.queryExternalCoupons(), 
            wx.stopPullDownRefresh();
        });
    },
    setCoupons: function(t) {
        var e = this, o = e._data.discountCoupon, a = e._data.freeshipCoupon;
        o = o.concat(t[0]), a = a.concat(t[1]), e.setData({
            discountCoupon: o,
            freeshipCoupon: a,
            load: !1
        });
    },
    onShareAppMessage: function() {},
    payBack: function(t) {
        var o = t.currentTarget.dataset.item, a = this;
        wx.showModal({
            title: "提示",
            content: "是否确认退款？",
            success: function(t) {
                t.confirm && e.backExternalCoupon(o.originCoupon.externalCardNum).then(function(t) {
                    console.log(t), wx.showToast({
                        title: t.message,
                        icon: "none",
                        duration: 1500
                    }), a.onPullDownRefresh();
                }).catch(function(t) {
                    wx.showToast({
                        title: t.message,
                        icon: "none",
                        duration: 2e3
                    });
                });
            }
        });
    },
    historyLoad: function(t) {
        var e = this, o = this.queryHistoryCoupons(1, 10, t);
        Promise.all([ o ]).then(function(t) {
            console.log("===>>historyOnload", t[0]), t[0] && t[0].length > 0 ? (e.setData({
                historyCouponList: t[0].filter(function(t) {
                    return "USED" !== t.status;
                }),
                usedCouponList: t[0].filter(function(t) {
                    return "USED" === t.status;
                })
            }), t[0].length < 5 && (console.log("内部券数量不够，查询外部券"), e.historyQueryExternalCoupons())) : (e.setData({
                historyCouponList: [],
                usedCouponList: []
            }), e.historyQueryExternalCoupons());
        });
    },
    queryHistoryCoupons: function(o, a, n) {
        var i = this, s = "HISTORY";
        "used" == i.data.type && (s = "USED");
        var u = {
            page: o,
            pageSize: a,
            memberMobileEquals: n,
            statusEquals: s,
            searchCount: !0,
            orderDirection: "desc",
            orderField: "assign_time"
        };
        u = t({}, u, {
            functionEquals: [ "CASH", "DISCOUNT", "GIFT", "FREESHIP" ]
        });
        var r = [];
        return e.query(u).then(function(e) {
            if (e.records && e.records.length > 0) {
                e.records.forEach(function(e) {
                    var o = {
                        id: e.id,
                        faceValue: e.faceValue,
                        balance: e.balance,
                        couponTypeName: e.couponTypeName,
                        couponActivityName: e.couponActivityName,
                        bytimeStart: e.bytimeStart,
                        bytimeEnd: e.bytimeEnd,
                        status: e.status,
                        statusDesc: i.handleCouponStatus(e.status),
                        rate: e.rate || 0 === e.rate ? (10 * e.rate).toFixed(1) : "",
                        function: e.function,
                        name: i.handleCouponName(e.function),
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
                    r.push(o);
                });
                var o = [];
                o = (o = [].concat(i.data.historyAllCouponsList)).concat(e.records), i.setData({
                    historyAllCouponsList: o
                });
            }
            return r;
        }).catch(function(t) {
            return wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), [];
        });
    },
    historyQueryExternalCoupons: function() {
        var o = this, a = [], n = o.data.historyExternalPage, i = o.data.member.id, s = o.data.historyPageSize, u = {
            memberId: i,
            page: n,
            pageSize: s,
            state: "HISTORY"
        }, r = e.queryExternalCoupons(u).then(function(e) {
            if (wx.hideToast(), e && e.length > 0) {
                var n = [];
                e.forEach(function(e) {
                    n.push(e);
                    var i = {
                        id: e.externalCardNum,
                        faceValue: e.faceValue,
                        balance: e.balance,
                        originCoupon: e,
                        canRefund: "HD" === e.couponServiceType && "EXPIRE" === e.status && e.price && e.price > 0,
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
                        var s = e.bytimeStart.split(" ")[0], u = e.bytimeEnd.split(" ")[0];
                        i = t({}, i, {
                            effectiveTime: s + " 至 " + u
                        });
                    } else i = t({}, i, {
                        effectiveTime: ""
                    });
                    a.push(i);
                });
                var i = [];
                i = (i = [].concat(o.data.historyAllCouponsList)).concat(n), o.setData({
                    historyAllCouponsList: i
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
        Promise.all([ r ]).then(function(t) {
            console.log(t), t[0] && t[0].length > 0 ? (console.log("external====>>>", t[0]), 
            o.historySetCoupons(t[0]), n++, o.setData({
                historyExternalPage: n
            })) : o.setData({
                historyLoad: !1,
                historyNoCouponData: !0
            });
        });
    },
    historySetCoupons: function(t) {
        var e = this, o = e.data.historyCouponList, a = e.data.usedCouponList;
        o = o.concat(t), a = a.concat(t), e.setData({
            historyCouponList: o.filter(function(t) {
                return "USED" !== t.status;
            }),
            usedCouponList: a.filter(function(t) {
                return "USED" === t.status;
            }),
            historyLoad: !1
        });
    },
    historyLoadingCoupon: function() {
        var t = this;
        t.setData({
            historyLoad: !0
        });
        var e = t.data.historyPage;
        e++;
        var o = t.queryHistoryCoupons(e, t.data.historyPageSize, t.data.member.mobile);
        Promise.all([ o ]).then(function(o) {
            o[0] && o[0].length > 0 ? (console.log(o[0]), t.historySetCoupons(o[0]), t.setData({
                historyPage: e
            }), o[0].length < 5 && (console.log("内部券数量不够，查询外部券"), t.historyQueryExternalCoupons())) : (console.log("123"), 
            t.historyQueryExternalCoupons()), wx.stopPullDownRefresh();
        });
    }
});