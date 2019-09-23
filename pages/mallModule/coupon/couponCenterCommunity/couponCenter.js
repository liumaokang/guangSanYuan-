function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e, o = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
    }
    return t;
}, n = require("../../../../api/couponService.js"), a = require("../../../../api/bannerService.js"), i = require("../../../../utils/utils.js"), s = require("../../../../utils/address.js"), r = require("../../../../utils/navPage.js"), u = require("../../../../utils/authorize.js"), c = getApp();

Page((e = {
    data: {
        currentStoreInfo: {
            storeId: "",
            storeName: "未获取到门店信息"
        },
        couponList: [],
        internalCouponList: [],
        loading: !1,
        loadText: "正在加载中...",
        page: 1,
        pageSize: 10,
        x: 750,
        y: 450,
        scale: 2,
        homeBack: !1,
        phone: !1,
        banners: [],
        sharePictures: "",
        hdCouponCanBuy: !0,
        hasUserInfo: !1
    },
    _data: {
        hasExternalCoupon: !0,
        hasInternalCoupon: !0,
        hasAssign: !1
    },
    onLoad: function(t) {
        var e = this, o = !0;
        c.globalData.configureInfo.forEach(function(t) {
            "showExternalCouponActivity" === t.key && null != t.value && (o = "FALSE" != t.value);
        }), this._data.hasExternalCoupon = o, c.globalData.storeInfo ? (this.setData({
            currentStoreInfo: {
                storeId: c.globalData.storeInfo.id,
                storeName: c.globalData.storeInfo.name
            }
        }), t.type && (e._data.hasExternalCoupon = !0, e._data.hasInternalCoupon = !1), 
        e.getCouponList(e.data.page), e.getBannerList(e.data.currentStoreInfo.storeId)) : s.getLocation().then(function(o) {
            c.globalData.storeInfo = o, e.setData({
                currentStoreInfo: {
                    storeId: o.id,
                    storeName: o.name
                }
            }), t.type && (e._data.hasExternalCoupon = !0, e._data.hasInternalCoupon = !1), 
            e.getCouponList(e.data.page), e.getBannerList(o.id);
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
        var n = getCurrentPages();
        if (console.log(n), 1 === n.length && this.setData({
            homeBack: !0
        }), this.options.mobile && "" != this.options.mobile && void 0 != this.options.mobile) {
            var a = this.options.mobile;
            try {
                wx.setStorageSync("wj_sharingId", a);
            } catch (t) {}
        }
        this.getSharePictures();
    },
    onReady: function() {},
    onShow: function() {
        var t = wx.getStorageSync("couponBack");
        (c.globalData.storeInfo && c.globalData.storeInfo.id != this.data.currentStoreInfo.storeId || t) && (this.setData({
            currentStoreInfo: {
                storeId: c.globalData.storeInfo.id,
                storeName: c.globalData.storeInfo.name
            },
            couponList: []
        }), this.getCouponList(this.data.page), wx.removeStorageSync("couponBack")), this.checkUserInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.resetCouponList(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    resetCouponList: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                couponList: [],
                page: 1
            }), t.getCouponList(1);
        }, 2e3);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "鲜丰水果，新鲜才好吃！",
            imageUrl: this.data.sharePictures,
            success: function(t) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    getCouponList: function(t) {
        wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var e = this;
        if (e._data.hasInternalCoupon) {
            var a = e.data.currentStoreInfo.storeId, i = {
                page: t,
                pageSize: this.data.pageSize,
                storeIdEquals: a
            };
            n.getCboCouponActivitiesByFilter(i).then(function(t) {
                wx.hideLoading();
                var n = [];
                t.records && t.records.length > 0 && t.records.forEach(function(t) {
                    if ("COMMIT" === t.status) {
                        var e = o({}, t, {
                            isExternal: !1
                        });
                        t.rate && (e = o({}, e, {
                            rate: (10 * t.rate).toFixed(1)
                        })), n.push(e);
                    }
                });
                var a = e.data.couponList;
                a = a.concat(n), e._data.hasExternalCoupon ? e.setData({
                    internalCouponList: a
                }) : e.setData({
                    couponList: a
                });
            }).catch(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
        e._data.hasExternalCoupon && e.getExternalCouponActivities();
    },
    toCouponDetails: function(t) {
        var e = this, o = e.data.couponList, n = t.currentTarget.dataset.couponid, a = null;
        if (o.forEach(function(t) {
            t.id === n && (a = t);
        }), a) {
            var i = a.isExternal;
            if (wx.setStorageSync("couponBack", !0), wx.setStorageSync("tempCoupon", a), i) {
                var s = "?couponActivityId=" + a.dlyCouponActivityId + "&storeId=" + e.data.currentStoreInfo.storeId + "&type=assign&isExternal=" + i;
                r.toCouponDetails(s);
            } else {
                var u = "?couponActivityId=" + a.id + "&type=assign&storeId=" + e.data.currentStoreInfo.storeId + "&isExternal=" + i;
                c.globalData.userInfo && c.globalData.userInfo.member ? r.toCouponDetails(u) : r.toAuthorize();
            }
        }
    },
    toHome: function() {
        r.toHome();
    },
    getBannerList: function(t) {
        var e = this;
        a.getStoreBannerList("COUPON_ACTIVITY", t).then(function(t) {
            e.setData({
                banners: t
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toSelectStore: function() {
        r.toSelectStore();
    },
    handleUserLogin: function() {
        console.log(c.globalData.userInfo);
        var t = this;
        if (c.globalData.userInfo) {
            var e = c.globalData.userInfo;
            this.setData({
                userInfo: o({}, e.wxaUser)
            }), c.globalData.userInfo.member ? t.setData({
                hasUserInfo: !0
            }) : (t.setData({
                hasUserInfo: !1
            }), t.handlePopupPhone());
        }
    },
    handlePopupPhone: function() {
        c.globalData.userInfo.member ? this.setData({
            phone: !1
        }) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(t) {
        console.log(t.detail), !0 === t.detail.bindMobile && this.handlePopupPhone();
    },
    getSharePictures: function() {
        var t = this;
        i.getSharePictures("COUPON_ACTIVITY").then(function(e) {
            t.setData({
                sharePictures: e
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getExternalCouponActivities: function() {
        var t = this;
        n.getCboExternalCouponActivities(this.data.currentStoreInfo.storeId).then(function(e) {
            var n = t.data.internalCouponList, a = [];
            e && e.length > 0 && e.forEach(function(t) {
                var e = o({}, t, {
                    isExternal: !0
                });
                t.rate && (e = o({}, e, {
                    rate: (10 * t.rate).toFixed(1)
                })), a.push(e);
            }), n = n.concat(a), t.setData({
                couponList: n
            });
        }).catch(function(e) {
            var o = t.data.internalCouponList.concat([]);
            t.setData({
                couponList: o
            }), wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
}, t(e, "getBannerList", function(t) {
    var e = this;
    a.getStoreBannerList("COUPON_ACTIVITY", t).then(function(t) {
        e.setData({
            banners: t
        });
    }).catch(function(t) {
        wx.showToast({
            title: t.message,
            icon: "none",
            duration: 2e3
        });
    });
}), t(e, "bannerJumping", function(t) {
    var e = this, o = t.currentTarget.dataset.id, n = null;
    e.data.banners.forEach(function(t) {
        t.id === o && (n = t);
    }), e.toAdPage(n, "banner");
}), t(e, "toAdPage", function(t, e) {
    var o = this;
    if ("APP" === t.linkType) "MIAOSHA" === t.appReturnType ? r.toSeckill() : "RECHARGE" === t.appReturnType ? r.toRecharge() : "MEAL" === t.appReturnType || ("RECEIVECOUPON" === t.appReturnType ? r.toCouponCenter() : "ADVANCE_SELL_PRODUCT" === t.appReturnType ? r.toAdvanceSell() : "TEAM_BUYING" === t.appReturnType ? r.toFightGroup() : "SCOREMALL" === t.appReturnType ? r.toScoreMall() : "INVITE_MEMBER" === t.appReturnType ? r.toInvite() : "MEMBER_CARD" === t.appReturnType ? r.toMemberCard() : "MY_COUPON" === t.appReturnType ? r.toMyCoupon() : "NEWMBR" === t.appReturnType ? r.toNewmbrActivity() : "GIFTCARD" === t.appReturnType && r.toGiftCardCenter()); else if ("GRADPRODUCT" === t.linkType) {
        var n = "?productId=" + t.productId + "&storeId=" + c.globalData.storeInfo.id + "&activityId=" + t.grabActivityId + "&type=secondkill";
        r.toGoodsDetails(n);
    } else if ("PRODUCT" === t.linkType) {
        var a = "?productId=" + t.productId + "&storeId=" + c.globalData.storeInfo.id + "&type=normal";
        r.toGoodsDetails(a);
    } else if ("TEAMPRODUCT" === t.linkType) {
        var i = "?productId=" + t.teamActivityId + "&storeId=" + c.globalData.storeInfo.id + "&type=group";
        r.toGoodsDetails(i);
    } else if ("GIFTCARDACTIVITYDETAILS" === t.linkType) {
        var s = "?giftCardActivityId=" + t.giftcardActivityId;
        r.toGiftCardBuy(s);
    } else if ("COUPONACTIVITYDETAILS" === t.linkType) if (c.globalData.userInfo) if (c.globalData.userInfo.member) {
        var u = "?couponActivityId=" + t.couponActivityId + "&storeId=" + o.data.currentStoreInfo.storeId + "&type=assign&isExternal=false";
        r.toCouponDetails(u);
    } else wx.showToast({
        title: "您还不是会员，请绑定手机号成为会员~",
        icon: "none",
        duration: 2e3
    }), setTimeout(function() {
        r.toAuthorize();
    }, 2e3); else r.toAuthorize(); else if ("URL" === t.linkType) {
        var l = null;
        "activity" === e ? l = t.linkUrl : "banner" === e && (l = t.link);
        var d = l;
        l.indexOf("?") > -1 && (d = d + "&storeId=" + this.data.currentStoreInfo.storeId + "&type=normal");
        var p = {
            url: encodeURIComponent(d)
        };
        console.log(d, p);
        var h = "?webUrl=" + JSON.stringify(p);
        r.toAdvertising(h);
    }
}), t(e, "handleCoupon", function(t) {
    var e = this, o = t.currentTarget.dataset.couponid, n = null;
    e.data.couponList.forEach(function(t) {
        o === t.id && (n = t);
    }), c.globalData.userInfo && (c.globalData.userInfo.member ? e._data.hasAssign ? (wx.showToast({
        title: "您已经在领取中了,请稍等片刻~",
        icon: "none",
        duration: 2e3
    }), setTimeout(function() {
        wx.showLoading({
            title: "领取中...",
            mask: !0
        });
    }, 2e3)) : (e._data.hasAssign = !0, n.price && n.price > 0 ? wx.showModal({
        title: "提示",
        content: "您需要花费" + n.price + "元购买该劵，是否确认购买",
        confirmColor: "#576B95",
        success: function(t) {
            console.log(t), t.confirm ? (wx.showLoading({
                title: "抢购中...",
                mask: !0
            }), e.createCouponOrder(n)) : e._data.hasAssign = !1;
        }
    }) : (wx.showLoading({
        title: "领取中...",
        mask: !0
    }), "HD" === n.service ? e.createCouponOrder(n) : e.couponAssign(n.id))) : r.toAuthorize());
}), t(e, "createCouponOrder", function(t) {
    console.log(t);
    var e = this, o = "GM", a = t.id;
    "HD" === t.service && (o = "HD", a = t.dlyCouponActivityId), i.setHideLoading(!0), 
    n.createCouponOrder(a, o, e.data.currentStoreInfo.storeId).then(function(t) {
        if (console.log(t), "ACQUIRE" === t.status) e._data.hasAssign = !1, i.setHideLoading(!1), 
        wx.hideLoading(), wx.showToast({
            title: "领券成功,稍后请到我的优惠券中查看~",
            icon: "none",
            mask: !0,
            duration: 2e3
        }), e.resetCouponList(); else if ("CREATED" === t.status) {
            var o = {
                orderId: t.id,
                payMethod: "WX_MINI_APP"
            };
            e.couponWXPay(o);
        } else e._data.hasAssign = !1, wx.showToast({
            title: t.acquireFailedReason,
            icon: "none",
            duration: 2e3
        });
    }).catch(function(t) {
        e._data.hasAssign = !1, wx.showToast({
            title: t.message,
            icon: "none",
            duration: 2e3
        });
    });
}), t(e, "couponAssign", function(t) {
    var e = this, o = {
        activityId: t,
        storeCode: e.data.currentStoreInfo.storeId
    };
    wx.showLoading({
        title: "领取中",
        mask: !0
    }), n.assign(o).then(function(t) {
        e._data.hasAssign = !1, wx.hideLoading(), wx.showToast({
            title: "领券成功,稍后请到我的优惠券中查看~",
            icon: "none",
            mask: !0,
            duration: 2e3
        }), e.resetCouponList();
    }).catch(function(t) {
        e._data.hasAssign = !1, wx.hideLoading(), 17005 === t.code ? wx.showToast({
            title: "券活动指定的有效期已经过期，不能领取~",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: t.message,
            icon: "none",
            duration: 2e3
        });
    });
}), t(e, "couponWXPay", function(t) {
    var e = this;
    n.getCouponPaySign(t).then(function(o) {
        console.log(o), i.isHideLoading() && (i.setHideLoading(!1), wx.hideLoading()), e._data.hasAssign = !1;
        var n = JSON.parse(o), a = JSON.parse(n.sign), s = "";
        "SWIFTPASS" === t.payMethod ? s = a.package : "WX_MINI_APP" === t.payMethod && (s = a.packageValue), 
        wx.requestPayment({
            timeStamp: a.timeStamp,
            nonceStr: a.nonceStr,
            package: s,
            signType: a.signType,
            paySign: a.paySign,
            success: function(t) {
                wx.showToast({
                    title: "领券成功,稍后请到我的优惠券中查看~",
                    icon: "none",
                    mask: !0,
                    duration: 2e3
                }), e.resetCouponList();
            },
            fail: function(t) {
                console.log(t), "requestPayment:fail cancel" === t.errMsg ? wx.showToast({
                    title: "您取消了订单支付~",
                    icon: "none",
                    duration: 2e3
                }) : wx.showToast({
                    title: t.errMsg,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    }).catch(function(t) {
        i.isHideLoading() && (i.setHideLoading(!1), wx.hideLoading()), e._data.hasAssign = !1, 
        1 === t.code ? wx.showToast({
            title: "领券失败，请稍后再试~",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: t.message,
            icon: "none",
            duration: 2e3
        });
    });
}), t(e, "checkUserInfo", function() {
    c.globalData.userInfo && (this.setData({
        hasUserInfo: !0
    }), c.globalData.userInfo.member && this.setData({
        isMember: !0
    }));
}), t(e, "getUserInfo", function(t) {
    var e = this;
    u.login(t).then(function(t) {
        e.setData({
            hasUserInfo: !0
        }), t.member ? e.setData({
            isMember: !0
        }) : r.toAuthorize();
    }).catch(function(t) {
        wx.showToast({
            title: t.message,
            icon: "none",
            duration: 2e3
        });
    });
}), t(e, "catchCoupon", function() {
    console.log("catchCoupon");
}), e));