function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, a = require("../../../../api/teamBuyService.js"), o = (require("../../../../api/storeService.js"), 
require("../../../../api/orderService.js")), r = require("../../../../api/raffleService.js"),
 // i = require("../../../../api/productService.js"),
  n = require("../../../../utils/utils.js"), s = require("../../../../utils/navPage.js"), u = require("../../../../utils/address.js"), c = require("../../../../utils/authorize.js"), d = getApp();

Page({
    data: {
        name: "",
        description: "",
        teamLeaderPrice: "",
        teamMemberPrice: "",
        teamMemberCount: "",
        teamMemberJoinCount: "",
        joinMemberCount: "",
        teamPeopleCount: 0,
        joinPeopleCount: 0,
        productDetails: {},
        productName: "",
        simulateJoin: "",
        stores: [],
        storeId: "",
        storeName: "",
        teamBuyingStatus: "",
        teamBuyingType: "",
        countDownList: {},
        originalPrice: "",
        teamBuyTimeList: [],
        goodsList: [],
        tabSelected: "0",
        category: [],
        leaderImageUrl: "",
        memberImageUrl: "",
        teamBuying: [],
        sellPrice: "",
        teamBuyEnd: !1,
        endTime: "",
        groupTimeId: 0,
        phone: !1,
        orderSelfScope: "",
        recommendingList: [],
        x: 750,
        y: 350,
        scale: 2,
        homeBack: !1,
        groupActivity: !0,
        teamStatus: "normal",
        pageFrom: "normal",
        show: {
            middle: !1,
            luckDraw: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        luckDrawTextImage: "./image/textYellow.png",
        overlayStyle: "",
        raffleId: "",
        raffleInfo: {},
        teamBuyId: "1",
        teamLeaderRecordId: "2",
        hasRaffleCoupon: !0,
        activeState: "start",
        raffleResult: "UNSTART",
        raffleActivityId: "",
        luckDrawImageBg: "background-image: url('https://app-1256684088.cos.ap-beijing.myqcloud.com/tinfide/newYearBg.png') !important;background-size: 100% 100%;"
    },
    _data: {
        hasUserDraw: !1
    },
    joinGroup: function() {
        var e = this;
        if (this.checkAuth()) if (e.data.balance > 0) {
            var a = [];
            a.push(e.data.productDetails);
            var o = {
                allPrice: this.data.teamBuying.teamMemberPrice,
                storeId: this.data.storeId,
                storeName: this.data.storeName,
                goodsList: [],
                teamBuyId: this.data.teamBuying.id,
                teamLeaderRecordId: this.data.teamBuying.teamLeaderRecordId,
                orderType: "group",
                teamBuyInfo: {
                    endTime: e.data.endTime,
                    orderSelfScope: e.data.orderSelfScope,
                    selfStartTime: e.data.selfStartTime,
                    selfEndTime: e.data.selfEndTime
                },
                scource: "BUYNOW"
            };
            a.forEach(function(a) {
                a = t({}, a, {
                    productId: a.id,
                    productNum: 1,
                    sellPrice: e.data.sellPrice
                }), o.goodsList.push(a);
            }), wx.setStorageSync("wj_shopcart", o), e.data.teamMemberCount - e.data.joinMemberCount == 0 || (d.globalData.userInfo.member ? s.toPerfectOrder() : s.toAuthorize());
        } else wx.showToast({
            title: "门店正在补货中，去看看别的吧~",
            icon: "none",
            duration: 2e3
        });
    },
    queryGoods: function(e) {
        var o = this, r = this;
        if (console.log(e, this.data.teamBuyId, r.data.teamLeaderRecordId), this.data.teamBuyId) {
            var u = r.data.teamBuyId, c = r.data.teamLeaderRecordId;
            a.getDetailsByStoreId(u, e, c).then(function(e) {
                if (e) {
                    var a = [];
                    if (e.joinMbrs.length > 0) {
                        if ("THOUSAND" !== e.teamBuyingType && "匿名" !== e.mobile) {
                            var u = {
                                avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                            };
                            a.push(u);
                        }
                        e.joinMbrs.forEach(function(e) {
                            var o = t({}, e, {
                                avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                            });
                            e.mobile && a.push(o);
                        });
                    } else if (e.joinMemberCount === e.teamMemberCount) if ("THOUSAND" !== e.teamBuyingType && "匿名" != e.mobile) {
                        var c = t({}, c, {
                            avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                        });
                        a.push(c);
                        for (var d = e.joinMemberCount > 12 ? 12 : e.joinMemberCount, l = 0; l < d - 1; l++) {
                            var m = t({}, m, {
                                avatar: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                            });
                            a.push(m);
                        }
                    } else for (var g = e.joinMemberCount > 12 ? 12 : e.joinMemberCount, f = 0; f < g - 1; f++) {
                        var h = t({}, h, {
                            avatar: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                        });
                        a.push(h);
                    } else if (1 === e.joinMemberCount) {
                        var p = {
                            avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                        };
                        a.push(p);
                    }
                    r.setData({
                        id: e.id,
                        name: e.name ? e.name : "",
                        description: e.description ? e.description : "",
                        leaderImageUrl: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png",
                        teamMemberImageUrl: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png",
                        teamLeaderPrice: e.teamLeaderPrice ? e.teamLeaderPrice : e.teamMemberPrice,
                        teamMemberPrice: e.teamMemberPrice ? e.teamMemberPrice : "",
                        teamMemberJoinCount: e.teamMemberJoinCount ? e.teamMemberJoinCount : "",
                        joinMemberCount: e.joinMemberCount,
                        teamMemberCount: e.teamMemberCount,
                        joinPeopleCount: e.joinMemberCount > 12 ? 12 : e.joinMemberCount,
                        teamPeopleCount: e.teamMemberCount > 12 ? 12 : e.teamMemberCount,
                        joinMbrs: a,
                        openTeamTime: e.openTeamTime,
                        duration: e.duration,
                        productDetails: e.productDetails,
                        productName: e.productName,
                        simulateJoin: e.simulateJoin,
                        originalPrice: e.productDetails.originalPrice ? e.productDetails.originalPrice : "",
                        teamBuyingStatus: e.teamBuyingStatus,
                        teamBuyingType: e.teamBuyingType,
                        teamBuying: e,
                        endTime: e.endTime,
                        orderSelfScope: e.orderSelfScope,
                        selfStartTime: e.selfStartTime ? e.selfStartTime : "",
                        selfEndTime: e.selfEndTime ? e.selfEndTime : "",
                        sharePicture: e.sharePicture ? e.sharePicture : ""
                    });
                    var I = r.data.storeId, b = r.data.productDetails.id;
                    if (i.getDetails(I, b).then(function(e) {
                        r.setData({
                            balance: e.balance,
                            sellPrice: e.sellPrice
                        });
                    }), e.teamMemberCount === e.joinMemberCount) {
                        r.setData({
                            teamStatus: "success"
                        });
                        var D = e.joinMemberCount;
                        if (r.data.joinMbrs.length < D) {
                            var w = [].concat(r.data.joinMbrs);
                            D > 12 && (D = 12);
                            for (var T = 0; T < D - r.data.joinMbrs.length; T++) w.push({
                                avatar: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                            }), console.log(T, r.data.joinMbrs.length);
                            console.log(w), r.setData({
                                joinMbrs: w
                            });
                        }
                    } else if (e.teamMemberCount < e.joinMemberCount) r.setData({
                        teamStatus: "success",
                        joinMemberCount: e.teamMemberCount
                    }); else {
                        var v = new Date(), y = new Date().getTime(), P = 0;
                        if (r.data.openTeamTime ? P = new Date(r.data.openTeamTime.replace(/-/g, "/")).getTime() : (P = y, 
                        r.setData({
                            openTeamTime: n.formatTime(v).replace(/\//g, "-")
                        }), console.log(r.data.openTeamTime)), (y - P) / 1e3 >= r.data.duration) r.setData({
                            teamBuyEnd: !0,
                            teamStatus: "fail"
                        }); else if (!1 === r.data.teamBuyEnd) {
                            var M = [], j = {
                                openTeamTime: r.data.openTeamTime,
                                duration: r.data.duration
                            };
                            M.push(j), r.setData({
                                teamBuyTimeList: M
                            }), function e() {
                                clearTimeout(r.data.groupTimeId), r.setData({
                                    countDownList: n.countDown(M)[0]
                                }), "00" == r.data.countDownList.hou && "00" == r.data.countDownList.min && "00" == r.data.countDownList.sec && r.queryGoods(I);
                                var t = setTimeout(function() {
                                    e(M);
                                }, 1e3);
                                r.setData({
                                    groupTimeId: t
                                });
                            }();
                        }
                    }
                } else o.setData({
                    groupActivity: !1
                }), wx.showModal({
                    title: "提示",
                    content: "当前门店没有该商品的团购活动，可以看看别的拼团活动哦~",
                    cancelText: "随便逛逛",
                    success: function(e) {
                        e.confirm ? s.toFightGroup() : e.cancel && s.toHome();
                    }
                });
            }).catch(function(e) {
                o.setData({
                    groupActivity: !1
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
        r.getRecommendingGoods(r.data.storeId);
    },
    onLoad: function(e) {
        var t = this, a = this;
        if (e.from && "orderPay" === e.from ? (wx.setNavigationBarTitle({
            title: "支付成功"
        }), this.setData({
            pageFrom: "orderPay",
            orderId: a.options.orderId
        })) : this.setData({
            teamBuyId: a.options.teamBuyId,
            teamLeaderRecordId: a.options.teamLeaderRecordId
        }), d.globalData.storeInfo ? (a.setData({
            storeId: d.globalData.storeInfo.id,
            storeName: d.globalData.storeInfo.name,
            stores: d.globalData.storeInfo
        }), e.from && "orderPay" === e.from ? this.getOrderById(a.options.orderId, d.globalData.storeInfo.id) : a.queryGoods(d.globalData.storeInfo.id)) : u.getLocation().then(function(o) {
            d.globalData.storeInfo = o, a.setData({
                storeId: o.id,
                storeName: o.name,
                stores: o
            }), e.from && "orderPay" === e.from ? (console.log(o.id), t.getOrderById(a.options.orderId, o.id)) : a.queryGoods(o.id);
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        }), 1 === getCurrentPages().length && this.setData({
            homeBack: !0
        }), a.options.mobile && "" != a.options.mobile && void 0 != a.options.mobile) {
            var o = a.options.mobile;
            try {
                wx.setStorageSync("wj_sharingId", o);
            } catch (e) {}
        }
        this.getSharePictures();
    },
    onReady: function() {},
    onShow: function() {
        this.checkUserInfo();
    },
    onHide: function() {},
    onUnload: function() {
        clearTimeout(this.data.groupTimeId);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this, a = this.data.sharePictures, o = this.data.raffleSharePictures;
        if (null != t.data.sharePicture && "" != t.data.sharePicture ? a = t.data.sharePicture : t.data.productDetails.imageUrl && (a = t.data.productDetails.imageUrl), 
        d.globalData.userInfo && d.globalData.userInfo.member) {
            if ("button" === e.from) return "raffle" === e.target.dataset.sharetype ? ("" !== o && null != o && (a = o), 
            {
                title: "优惠券大抽奖",
                path: "/pages/mallModule/activity/luckDraw/luckDraw?raffleId=" + t.data.raffleId + "&type=order",
                imageUrl: a,
                success: function(e) {
                    e.errMsg;
                }
            }) : {
                title: "拼团有优惠",
                path: "/pages/mallModule/fightGroup/groupPurchase/groupPurchase?teamBuyId=" + t.data.teamBuyId + "&teamLeaderRecordId=" + t.data.teamLeaderRecordId,
                imageUrl: a,
                success: function(e) {
                    wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            };
            var r = d.globalData.userInfo.member.id, i = getCurrentPages(), n = i[i.length - 1], s = n.route, u = n.options, c = s + "?mobile=" + r;
            for (var l in u) u.hasOwnProperty(l) && (c = c + "&" + l + "=" + u[l]);
            return {
                title: "拼团有优惠",
                path: "/pages/mallModule/fightGroup/groupPurchase/groupPurchase?teamBuyId=" + t.data.teamBuyId + "&teamLeaderRecordId=" + t.data.teamLeaderRecordId,
                imageUrl: a,
                success: function(e) {
                    wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            };
        }
        return {
            imageUrl: a,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    getSharePictures: function() {
        var e = this;
        d.globalData.sharePictures && this.setData({
            sharePictures: d.globalData.sharePictures
        }), n.getSharePictures("RAFFLE_ACTIVITY").then(function(t) {
            e.setData({
                raffleSharePictures: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toHome: function() {
        s.toHome();
    },
    getRecommendingGoods: function(e) {
        var o = this;
        a.getStartedTeamBuyingByStoreId(e).then(function(a) {
            var r = [];
            if (a && a.length > 0) {
                for (var s = 0; s < a.length; s++) if (s < 16) {
                    var u = a[s], c = t({}, u, {
                        teamLeaderPrice: u.teamLeaderPrice ? u.teamLeaderPrice : u.teamMemberPrice,
                        isTeam: !0,
                        memberCount: n.numberConversion.numberToChinese(u.teamMemberCount)
                    });
                    i.getDetails(e, u.productId).then(function(e) {
                        var a = o.data.recommendingList;
                        if (e) for (var r = 0; r < a.length; r++) {
                            var i = a[r], n = t({}, i, {
                                productUrl: e.imageUrl,
                                sellPrice: e.sellPrice
                            });
                            i.productId && i.productId === e.id && (a[r] = n);
                        }
                        o.setData({
                            recommendingList: a
                        });
                    }), r.push(c);
                }
                o.setData({
                    recommendingList: r
                });
            }
            if (r.length < 16) {
                var d = 16 - r.length;
                i.getStoreHotProduct(e).then(function(e) {
                    if (e && e.length > 0) {
                        for (var a = 0; a < e.length; a++) if (a < d) {
                            var r = e[a], i = t({}, r, {
                                isTeam: !1,
                                productUrl: r.imageUrl
                            });
                            o.data.recommendingList.push(i);
                        }
                        o.setData({
                            recommendingList: o.data.recommendingList
                        });
                    }
                }).catch(function(e) {
                    wx.showToast({
                        title: e.message,
                        icon: "none",
                        duration: 2e3
                    });
                });
            }
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toGoodsDetail: function(e) {
        console.log(e), this.setData({
            onUnload: !1
        });
        var t = "?productId=" + e.currentTarget.dataset.productid + "&type=" + e.currentTarget.dataset.type;
        console.log(t), s.toGoodsDetails(t);
    },
    checkAuth: function() {
        return !!d.globalData.userInfo;
    },
    handleUserLogin: function() {
        var e = this;
        if (d.globalData.userInfo) {
            var a = d.globalData.userInfo;
            this.setData({
                userInfo: t({}, a.wxaUser)
            }), d.globalData.userInfo.member ? e.setData({
                hasUserInfo: !0
            }) : e.setData({
                userInfo: a.wxaUser,
                hasUserInfo: !0
            });
        }
    },
    handlePopupPhone: function() {
        d.globalData.userInfo.member ? this.setData({
            phone: !1
        }) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(e) {
        !0 === e.detail.bindMobile && this.handlePopupPhone();
    },
    toggleLuckDrawPopup: function(e) {
        var t = this, a = this.data.raffleInfo, o = Object.keys(a);
        null != e ? t.toggle("luckDraw") : 0 == o.length && this.data.show.luckDraw && this._data.hasUserDraw && (wx.showModal({
            title: "温馨提示",
            content: "系统正在处理您的抽奖结果，如果中奖，奖品稍后将发放到您的账户，您可以在（我的->我的优惠券）中查看。",
            showCancel: !1,
            success: function(e) {
                e.confirm ? t.toggle("luckDraw") : e.cancel && console.log("用户点击取消");
            }
        }), this.userCloseRaffle = !0);
    },
    toggleMiddlePopup: function() {
        null != this.userCloseRaffle && !0 === this.userCloseRaffle || this.toggle("middle");
    },
    toggle: function(t) {
        this.setData(e({}, "show." + t, !this.data.show[t]));
    },
    getOrderById: function(e, t) {
        var a = this;
        o.getDetailsById(e).then(function(e) {
            return console.log(e), e && a.setData({
                teamBuyId: e.teamId ? e.teamId : "",
                teamLeaderRecordId: e.teamLeaderRecordId ? e.teamLeaderRecordId : ""
            }), a.queryGoods(t), r.getByType("ORDER_RAFFLE");
        }).then(function(e) {
            e && (a.setData({
                raffleActivityId: e.id
            }), d.globalData.userInfo && a.toggleLuckDrawPopup(!0));
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e5
            });
        });
    },
    toIndex: function() {
        s.toHome();
    },
    getUserClickDraw: function(e) {
        var t = this;
        if (e.detail.userDraw) if (this._data.hasUserDraw = !0, n.setHideLoading(!0), this.data.isActive) wx.showToast({
            title: "您已经在抽奖了~",
            icon: "none"
        }); else {
            this.setData({
                isActive: !0
            });
            var a = {
                orderId: t.data.orderId,
                activityId: t.data.raffleActivityId,
                wxaOpenid: d.globalData.userInfo.wxaUser.openId
            };
            d.globalData.userInfo && function(e) {
                r.create(e).then(function(e) {
                    t.handleDraw(e);
                }).catch(function(e) {
                    n.setHideLoading(!1), t.setData({
                        hasRaffleCoupon: !1,
                        raffleResult: "FALSE",
                        isActive: !1
                    }), setTimeout(function() {
                        t.toggleLuckDrawPopup(!0), wx.showToast({
                            title: e.message,
                            icon: "none",
                            duration: 2e3
                        }), t.setData({
                            raffleResult: "UNSTART"
                        });
                    }, 2400);
                });
            }(a);
        }
    },
    handleDraw: function(e) {
        var t = this, a = {
            raffleId: e,
            wxaOpenid: d.globalData.userInfo.wxaUser.openId
        };
        t.setData({
            raffleId: e
        }), r.draw(a).then(function(e) {
            n.setHideLoading(!1);
            var a = null, o = !0;
            "未中奖" == e.rafflePrizeName ? o = !1 : (a = e, o = !0), setTimeout(function() {
                t.setData({
                    raffleInfo: a,
                    hasRaffleCoupon: o,
                    raffleResult: "TRUE",
                    isActive: !1
                }), t.toggleLuckDrawPopup(!0), t.toggleMiddlePopup();
            }, 2400);
        }).catch(function(e) {
            n.setHideLoading(!1), t.setData({
                hasRaffleCoupon: !1,
                raffleResult: "FALSE",
                isActive: !1
            }), 41011 === e.code ? setTimeout(function() {
                wx.showToast({
                    title: "您今天的抽奖次数已超过上限，明天再来吧~",
                    icon: "none",
                    duration: 2e3
                }), t.toggleLuckDrawPopup(!0);
            }, 2400) : 41005 === e.code || 41007 === e.code || 41003 === e.code ? (t.setData({
                activeState: "end"
            }), setTimeout(function() {
                t.toggleLuckDrawPopup(!0), t.toggleMiddlePopup();
            }, 2400)) : 41004 === e.code || 41010 === e.code ? setTimeout(function() {
                t.toggleLuckDrawPopup(!0), t.toggleMiddlePopup();
            }, 2400) : 41014 === e.code ? setTimeout(function() {
                wx.showToast({
                    title: "您今天已经抽过了，不要贪心哦~",
                    icon: "none",
                    duration: 2e3
                }), t.toggleLuckDrawPopup(!0);
            }, 2400) : setTimeout(function() {
                wx.showToast({
                    title: "抽奖人数过多，请稍后再试哦~",
                    icon: "none",
                    duration: 2e3
                }), t.toggleLuckDrawPopup(!0);
            }, 2400), setTimeout(function() {
                t.setData({
                    raffleResult: "UNSTART"
                });
            }, 2400);
        });
    },
    checkUserInfo: function() {
        d.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), d.globalData.userInfo.member && this.setData({
            isMember: !0
        }));
    },
    getUserInfo: function(e) {
        var t = this;
        c.login(e).then(function(e) {
            t.setData({
                hasUserInfo: !0
            }), e.member ? t.setData({
                isMember: !0
            }) : s.toAuthorize();
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});