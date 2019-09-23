var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, e = require("../../../../api/couponService.js"), o = (require("../../../../api/orderService.js"), 
require("../../../../utils/self.js")), a = require("../../../../utils/address.js"),
 i = require("../../../../utils/navPage.js"), n = require("../../../../utils/utils.js"),
  s = require("../../../../utils/authorize.js"), r = getApp();
var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
var imageUrl = url + "/upload/wxapi/";
var server=  require("../../../../utils/server.js");
Page({
    data: {
        imageUrl: imageUrl,
        coupon: {},
        type: "",
        loading: !0,
        showCode: !1,
        codeText: "",
        x: 750,
        y: 450,
        scale: 2,
        homeBack: !1,
        phone: !1,
        isAssign: !1,
        isExternal: !1,
        hasAssign: !1,
        hdCouponCanBuy: !0,
        storeId: "",
        hasUserInfo: !1,
        isMember: !1,
        barcodeImageUrl: "",
        coupon:[]
    },
    getCouponDetails: function(o, a) {
        var i = this;
        if ("false" === i.options.isExternal) e.getById(o).then(function(o) {
            if (o) {
                var a = t({}, o, {
                    rate: o.rate || 0 === o.rate ? (10 * o.rate).toFixed(1) : ""
                });
                if ("assign" === i.data.type) if ("PACKAGE" === o.function) i.getCouponPackageDetails(o.id); else {
                    if (o.startDate) {
                        var n = o.startDate.split(" ")[0], s = o.endDate.split(" ")[0], r = n + " ~ " + s, c = n + " —— " + s, u = o.status;
                        a = t({}, a, {
                            effectiveTime: r,
                            validityTime: c,
                            status: u
                        });
                    } else a = t({}, a, {
                        effectiveTime: "",
                        validityTime: ""
                    });
                    "FREESHIP" === o.function && (a = t({}, a, {
                        name: "运费券"
                    })), i.setData({
                        coupon: a,
                        loading: !1
                    });
                } else {
                    var l = i.options.couponId, d = {
                        cardNumEquals: l,
                        pages: 1,
                        pageSize: 10
                    };
                    e.query(d).then(function(e) {
                        e.records.length > 0 && (e.records.forEach(function(e) {
                            if (e.id === l) if (e.bytimeStart) {
                                var o = e.bytimeStart.slice(0, 16), i = e.bytimeEnd.slice(0, 16), n = o + " ~ " + i, s = o + " —— " + i, r = e.status;
                                a = t({}, a, {
                                    effectiveTime: n,
                                    validityTime: s,
                                    status: r
                                });
                            } else a = t({}, a, {
                                effectiveTime: "",
                                validityTime: ""
                            });
                        }), i.setData({
                            coupon: a,
                            loading: !1
                        }));
                    }).catch(function(t) {
                        wx.showToast({
                            title: t.message,
                            icon: "none",
                            duration: 2e3
                        }), i.setData({
                            loading: !1
                        });
                    });
                }
            } else i.setData({
                loading: !1
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), i.setData({
                loading: !1
            });
        }); else if ("assign" === i.options.type) e.getCboExternalCouponActivities(this.data.storeId).then(function(e) {
            e && e.length > 0 && e.forEach(function(e) {
                if (e.dlyCouponActivityId == o) {
                    console.log(e);
                    var a = e, n = t({}, a, {
                        name: a.name,
                        useRule: a.useRule,
                        description: a.description
                    });
                    if (n.startDate) {
                        var s = n.startDate.slice(0, 16), r = n.endDate.slice(0, 16), c = s + " ~ " + r, u = s + " —— " + r, l = n.status;
                        n = t({}, n, {
                            effectiveTime: c,
                            validityTime: u,
                            status: l
                        });
                    } else n = t({}, n, {
                        effectiveTime: "",
                        validityTime: ""
                    });
                    "OPEN" === n.status && n.externalCardNum && i.showCode(n.externalCardNum), i.setData({
                        coupon: n,
                        loading: !1
                    });
                }
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        }); else {
            console.log(i.options.coupon);
            var n = wx.getStorageSync("wr_couponDetail"), s = t({}, n, {
                name: n.couponActivityName,
                useRule: n.useRule,
                description: n.activityRemark
            });
            if (s.bytimeStart) {
                var r = s.bytimeStart.slice(0, 16), c = s.bytimeEnd.slice(0, 16), u = r + " ~ " + c, l = r + " —— " + c, d = s.status;
                n.couponActivityName.indexOf("双十二") >= 0 && (u = "2018-12-12 00:00 ~ 2018-12-12 23:59", 
                l = "2018-12-12 00:00 —— 2018-12-12 23:59"), s = t({}, s, {
                    effectiveTime: u,
                    validityTime: l,
                    status: d
                });
            } else s = t({}, s, {
                effectiveTime: "",
                validityTime: ""
            });
            "OPEN" === s.status && s.externalCardNum && i.showCode(s.externalCardNum), i.setData({
                coupon: s,
                loading: !1
            });
        }
    },
    reShowCode: function() {
        this.showCode(this.data.codeText);
    },
    showCode: function(t) {
        t && (this.ctxCanvas || (this.ctxCanvas = wx.createCanvasContext("couponbarcode")), 
        o.barcode(this.ctxCanvas, t, 586, 144), this.setData({
            codeText: this.codeTextPartition(t),
            showCode: !0
        }));
    },
    codeTextPartition: function(t) {
        return console.log(t), t = t.replace(/\s/g, "").replace(/(\w{4})(?=\w)/g, "$1 "), 
        console.log(t), t;
    },
    toIndex: function() {
        i.toHome();
    },
    onLoad: function(t) {
      var id = t.id;
      console.log("优惠券id:"+id)
      this.couponDet(id);

        // function e() {
        //     "assign" === t.type && "true" === t.isExternal ? (i.getCouponDetails(t.couponActivityId, t.couponId), 
        //     console.log(tempCoupon)) : r.globalData.userInfo && r.globalData.userInfo.member ? i.getCouponDetails(t.couponActivityId, t.couponId) : i.setData({
        //         loading: !1
        //     });
        // }
        // var o = this, i = this;
        // if ("assign" !== t.type ? wx.hideShareMenu() : this.setData({
        //     isExternal: t.isExternal
        // }), "freeship" === t.type && wx.setNavigationBarTitle({
        //     title: "运费优惠券"
        // }), this.setData({
        //     type: t.type
        // }), this.getSharePictures(), 1 === getCurrentPages().length) {
        //     if (this.setData({
        //         homeBack: !0
        //     }), t.storeId) return this.setData({
        //         storeId: t.storeId
        //     }), void e();
        //     r.globalData.storeInfo ? (this.setData({
        //         storeId: r.globalData.storeInfo.id
        //     }), e()) : a.getLocation().then(function(t) {
        //         r.globalData.storeInfo = t, o.setData({
        //             storeId: t.id
        //         }), e();
        //     }).catch(function(t) {
        //         wx.showToast({
        //             title: t.message,
        //             icon: "icon",
        //             duration: 2e3
        //         });
        //     });
        // } else {
        //     if (t.storeId) return this.setData({
        //         storeId: t.storeId
        //     }), void e();
        //     "assign" == t.type ? r.globalData.storeInfo ? (this.setData({
        //         storeId: r.globalData.storeInfo.id
        //     }), e()) : a.getLocation().then(function(t) {
        //         r.globalData.storeInfo = t, o.setData({
        //             storeId: t.id
        //         }), e();
        //     }).catch(function(t) {
        //         wx.showToast({
        //             title: t.message,
        //             icon: "icon",
        //             duration: 2e3
        //         });
        //     }) : e();
        // }
        // if (this.options.mobile && "" != this.options.mobile && void 0 != this.options.mobile) {
        //     var n = this.options.mobile;
        //     try {
        //         wx.setStorageSync("wj_sharingId", n);
        //     } catch (t) {}
        // }
        // r.globalData.userInfo && r.globalData.userInfo.member && this.setData({
        //     hasUserInfo: !0,
        //     member: r.globalData.userInfo.member
        // });
    },
    couponDet:function(id){
        var that=this;
        var str='?wxtoken='+wx.getStorageSync('wxtoken')+'&id='+id;
        server.getJSON('/Activity/couponDet'+str,function(res){
            console.log('优惠券详情');
            console.log(res);
            that.setData({coupon:res.data.det})

        })
    },



    onReady: function() {},
    onShow: function() {
        this.checkUserInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.data.sharePictures;
        console.log(this.options);
        var e = "?" + Object.entries(this.options).map(function(t) {
            return t.join("=");
        }).join("&");
        return console.log(e), {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/coupon/couponDetails/couponDetails" + e,
            imageUrl: t,
            success: function(t) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    getSharePictures: function() {
        var t = this;
        n.getSharePictures("COUPON_ACTIVITY").then(function(e) {
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
    toAssign: function(t) {
        var e = this, o = e.data.coupon;
        r.globalData.userInfo ? r.globalData.userInfo.member ? e.data.hasAssign ? (wx.showToast({
            title: "您已经在领取中了,请稍等片刻~",
            icon: "none",
            duration: 2e3
        }), setTimeout(function() {
            wx.showLoading({
                title: "领取中...",
                mask: !0
            });
        }, 2e3)) : (e.setData({
            hasAssign: !0
        }), o.price && o.price > 0 ? wx.showModal({
            title: "提示",
            content: "您需要花费" + o.price + "元购买该劵，是否确认购买",
            confirmColor: "#576B95",
            success: function(t) {
                console.log(t), t.confirm ? (wx.showLoading({
                    title: "抢购中...",
                    mask: !0
                }), e.createCouponOrder(o)) : e.setData({
                    hasAssign: !1
                });
            }
        }) : (wx.showLoading({
            title: "领取中...",
            mask: !0
        }), "HD" === o.service ? e.createCouponOrder(o) : e.couponAssign(o.id))) : e.handlePopupPhone() : wx.showToast({
            title: "您还没有登录，请点击头像授权登陆~",
            icon: "icon",
            duration: 2e3
        });
    },
    createCouponOrder: function(t) {
        var o = this, a = "GM", i = t.id;
        "HD" === t.service && (a = "HD", i = t.dlyCouponActivityId), n.setHideLoading(!0), 
        e.createCouponOrder(i, a, o.data.storeId).then(function(t) {
            if (console.log(t), "ACQUIRE" === t.status) o.setData({
                hasAssign: !1
            }), n.setHideLoading(!1), wx.hideLoading(), "GM" === a ? wx.showToast({
                title: "领券成功,稍后请到我的优惠券中查看~",
                icon: "none",
                duration: 2e3
            }) : o.queryExternalCoupons(); else if ("CREATED" === t.status) {
                var e = {
                    orderId: t.id,
                    payMethod: "WX_MINI_APP"
                };
                o.couponWXPay(e);
            } else o.setData({
                hasAssign: !1
            }), wx.showToast({
                title: t.acquireFailedReason,
                icon: "none",
                duration: 2e3
            });
        }).catch(function(t) {
            o.setData({
                hasAssign: !1
            }), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    couponAssign: function(t) {
        var o = this, a = {
            activityId: t,
            storeCode: o.data.storeId
        };
        wx.showLoading({
            title: "领取中",
            mask: !0
        }), e.assign(a).then(function(t) {
            o.setData({
                hasAssign: !1
            }), wx.hideLoading(), wx.showToast({
                title: "领券成功,稍后请到我的优惠券中查看~",
                icon: "none",
                duration: 2e3
            });
        }).catch(function(t) {
            o.setData({
                hasAssign: !1
            }), wx.hideLoading(), 17005 === t.code ? wx.showToast({
                title: "券活动指定的有效期已经过期，不能领取~",
                icon: "none",
                duration: 2e3
            }) : wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    couponWXPay: function(t) {
        var o = this;
        e.getCouponPaySign(t).then(function(e) {
            console.log(e), n.isHideLoading() && (n.setHideLoading(!1), wx.hideLoading()), o.data.hasAssign = !1;
            var a = JSON.parse(e), i = JSON.parse(a.sign), s = "";
            "SWIFTPASS" === t.payMethod ? s = i.package : "WX_MINI_APP" === t.payMethod && (s = i.packageValue), 
            wx.requestPayment({
                timeStamp: i.timeStamp,
                nonceStr: i.nonceStr,
                package: s,
                signType: i.signType,
                paySign: i.paySign,
                success: function(t) {
                    wx.showToast({
                        title: "领券成功,稍后请到我的优惠券中查看~",
                        icon: "none",
                        duration: 2e3
                    });
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
            n.isHideLoading() && (n.setHideLoading(!1), wx.hideLoading()), o.data.hasAssign = !1, 
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
    },
    getCouponPackageDetails: function(o) {
        var a = this;
        e.getPackageById(o).then(function(e) {
            console.log(e);
            var o = e;
            if (e.startDate) {
                var i = e.startDate.slice(0, 16), n = e.endDate.slice(0, 16), s = i + " ~ " + n, r = i + " —— " + n, c = e.status;
                o = t({}, o, {
                    effectiveTime: s,
                    validityTime: r,
                    status: c
                });
            } else o = t({}, o, {
                effectiveTime: "",
                validityTime: ""
            });
            var u = [];
            e.childCouponActivity && e.childCouponActivity.length > 0 && e.childCouponActivity.forEach(function(e) {
                var o = t({}, e);
                if (e.startDate) {
                    var a = e.startDate.slice(0, 16) + " ~ " + e.endDate.slice(0, 16), i = e.status;
                    o = t({}, o, {
                        effectiveTime: a,
                        status: i
                    });
                } else o = t({}, o, {
                    effectiveTime: "",
                    validityTime: ""
                });
                u.push(o);
            }), "FREESHIP" === e.function && (o = t({}, o, {
                name: "运费券"
            })), o = t({}, o, {
                childCouponActivity: u
            }), a.setData({
                coupon: o,
                loading: !1
            });
        }).catch(function(t) {
            a.setData({
                loading: !1
            }), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    handleUserLogin: function() {
        console.log(r.globalData.userInfo);
        var e = this;
        if (r.globalData.userInfo) {
            var o = r.globalData.userInfo;
            this.setData({
                userInfo: t({}, o.wxaUser)
            }), r.globalData.userInfo.member ? e.setData({
                hasUserInfo: !0,
                member: r.globalData.userInfo.member
            }) : (e.setData({
                hasUserInfo: !1
            }), e.handlePopupPhone());
        }
    },
    handlePopupPhone: function() {
        r.globalData.userInfo.member ? this.setData({
            phone: !1
        }) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(t) {
        console.log(t.detail);
        var e = this;
        !0 === t.detail.bindMobile && (this.handlePopupPhone(), this.getCouponDetails(e.options.couponActivityId, e.options.couponId), 
        r.globalData.userInfo.member && e.setData({
            hasUserInfo: !0,
            member: r.globalData.userInfo.member
        }));
    },
    queryExternalCoupons: function() {
        var t = this, o = {
            memberId: t.data.member.id,
            state: "UNUSED"
        };
        e.queryExternalCoupons(o).then(function(e) {
            console.log(e), n.setHideLoading(!1), wx.hideLoading(), e && e.length > 0 && e.forEach(function(e) {
                "OPEN" === e.status && e.couponActivityId == t.options.couponActivityId && (wx.showToast({
                    title: "领券成功",
                    icon: "none",
                    duration: 2e3
                }), t.setData({
                    hasAssign: !1,
                    isAssign: !0
                }), t.showCode(e.externalCardNum));
            });
        }).catch(function(e) {
            n.setHideLoading(!1), wx.hideLoading(), t.setData({
                hasAssign: !1
            }), wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    checkUserInfo: function() {
        r.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), r.globalData.userInfo.member && this.setData({
            isMember: !0
        }));
    },
    queryDetailsData: function() {
        var t = this.options, e = this;
        "assign" === t.type && "true" === t.isExternal ? (e.getCouponDetails(t.couponActivityId, t.couponId), 
        console.log(tempCoupon)) : r.globalData.userInfo && r.globalData.userInfo.member ? e.getCouponDetails(t.couponActivityId, t.couponId) : e.setData({
            loading: !1
        });
    },
    getUserInfo: function(t) {
        var e = this;
        s.login(t).then(function(t) {
            e.setData({
                hasUserInfo: !0
            }), t.member ? (e.setData({
                isMember: !0
            }), e.queryDetailsData()) : i.toAuthorize();
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});