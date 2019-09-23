var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
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
}, n = require("../../../../api/couponService.js"), a = require("../../../../api/bannerService.js"), i = require("../../../../utils/utils.js"), s = require("../../../../utils/address.js"), r = require("../../../../utils/navPage.js"), c = require("../../../../utils/authorize.js"), u = getApp();
var imageUrl = url + "/upload/wxapi/";
Page((e = {
    data: {
        imageUrl: imageUrl,
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
        // var e = this, o = !0;
        // u.globalData.configureInfo.forEach(function(t) {
        //     "showExternalCouponActivity" === t.key && null != t.value && (o = "FALSE" != t.value);
        // }), this._data.hasExternalCoupon = o, u.globalData.storeInfo ? (this.setData({
        //     currentStoreInfo: {
        //         storeId: u.globalData.storeInfo.id,
        //         storeName: u.globalData.storeInfo.name
        //     }
        // }), t.type && (e._data.hasExternalCoupon = !0, e._data.hasInternalCoupon = !1), 
        // e.getCouponList(e.data.page), e.getBannerList(e.data.currentStoreInfo.storeId)) : s.getLocation().then(function(o) {
        //     u.globalData.storeInfo = o, e.setData({
        //         currentStoreInfo: {
        //             storeId: o.id,
        //             storeName: o.name
        //         }
        //     }), t.type && (e._data.hasExternalCoupon = !0, e._data.hasInternalCoupon = !1), 
        //     e.getCouponList(e.data.page), e.getBannerList(o.id);
        // }).catch(function(t) {
        //     wx.showToast({
        //         title: t.message,
        //         icon: "none",
        //         duration: 2e3
        //     });
        // });
        // var n = getCurrentPages();
        // if (console.log(n), 1 === n.length && this.setData({
        //     homeBack: !0
        // }), this.options.mobile && "" != this.options.mobile && void 0 != this.options.mobile) {
        //     var a = this.options.mobile;
        //     try {
        //         wx.setStorageSync("wj_sharingId", a);
        //     } catch (t) {}
        // }
        // this.getSharePictures();
    },
    onReady: function() {},

    onShow: function() {
      var that = this;
      if (wx.getStorageSync("wxtoken") != "") {
        wx.request({
          url: imgurl + '/Activity/coupon_list/atype/1/wxtoken' + wx.getStorageSync('wxtoken'),
          success(res) {
            var data = res.data;
            console.log(data)
            var length = data.result.coupon_list.length;
            console.log(length)
            if (length > 0) {
              
              that.setData({
                length: parseInt(length),
                couponList: data.result.coupon_list
              });
            }else{
              wx.showToast({
                title: '暂无优惠券',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1000
        })
      }

        // var t = wx.getStorageSync("couponBack");
        // (u.globalData.storeInfo && u.globalData.storeInfo.id != this.data.currentStoreInfo.storeId || t) && (this.setData({
        //     currentStoreInfo: {
        //         storeId: u.globalData.storeInfo.id,
        //         storeName: u.globalData.storeInfo.name
        //     },
        //     couponList: []
        // }), this.getCouponList(this.data.page), wx.removeStorageSync("couponBack")), this.checkUserInfo();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        // this.resetCouponList(), setTimeout(function() {
        //     wx.stopPullDownRefresh();
        // }, 1e3);
    },
    resetCouponList: function() {
        // this.setData({
        //     couponList: [],
        //     page: 1
        // }), this.getCouponList(1);
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
            n.getCouponActivitiesByFilter(i).then(function(t) {
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
                // var a = e.data.couponList;
                // a = a.concat(n), e._data.hasExternalCoupon ? e.setData({
                //     internalCouponList: a
                // }) : e.setData({
                //     couponList: a
                // });
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
        // var e = this.data.couponList, o = t.currentTarget.dataset.couponid, n = null;
        // if (e.forEach(function(t) {
        //     t.id === o && (n = t);
        // }), n) {
        //     var a = n.isExternal;
        //     if (wx.setStorageSync("couponBack", !0), a) {
        //         var i = "?couponActivityId=" + n.dlyCouponActivityId + "&type=assign&isExternal=" + a;
        //         r.toCouponDetails(i);
        //     } else {
        //         var s = "?couponActivityId=" + n.id + "&type=assign&isExternal=" + a;
        //         u.globalData.userInfo && u.globalData.userInfo.member ? r.toCouponDetails(s) : r.toAuthorize();
        //     }
        // }
      var couponId = t.currentTarget.dataset.couponid;
        wx.navigateTo({
          url: '/pages/mallModule/coupon/couponDetails/couponDetails?id=' + couponId,
        })
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
        console.log(u.globalData.userInfo);
        var t = this;
        if (u.globalData.userInfo) {
            var e = u.globalData.userInfo;
            this.setData({
                userInfo: o({}, e.wxaUser)
            }), u.globalData.userInfo.member ? t.setData({
                hasUserInfo: !0
            }) : (t.setData({
                hasUserInfo: !1
            }), t.handlePopupPhone());
        }
    },
    handlePopupPhone: function() {
        u.globalData.userInfo.member ? this.setData({
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
        // var t = this;
        // console.log(1111111, this.data.currentStoreInfo.storeId), n.getExternalCouponActivities(this.data.currentStoreInfo.storeId).then(function(e) {
        //     var n = t.data.internalCouponList, a = [];
        //     e && e.length > 0 && e.forEach(function(t) {
        //         var e = o({}, t, {
        //             isExternal: !0
        //         });
        //         t.rate && (e = o({}, e, {
        //             rate: (10 * t.rate).toFixed(1)
        //         })), a.push(e);
        //     }), n = n.concat(a), t.setData({
        //         couponList: n
        //     });
        // }).catch(function(e) {
        //     var o = t.data.internalCouponList.concat([]);
        //     t.setData({
        //         couponList: o
        //     }), wx.showToast({
        //         title: e.message,
        //         icon: "none",
        //         duration: 2e3
        //     });
        // });
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
    if ("APP" === t.linkType) "MIAOSHA" === t.appReturnType ? r.toSeckill() : "RECHARGE" === t.appReturnType ? r.toRecharge() : "MEAL" === t.appReturnType || ("RECEIVECOUPON" === t.appReturnType ? r.toCouponCenter() : "ADVANCE_SELL_PRODUCT" === t.appReturnType ? r.toAdvanceSell() : "TEAM_BUYING" === t.appReturnType ? r.toFightGroup() : "SCOREMALL" === t.appReturnType ? r.toScoreMall() : "INVITE_MEMBER" === t.appReturnType ? r.toInvite() : "MEMBER_CARD" === t.appReturnType ? r.toMemberCard() : "MY_COUPON" === t.appReturnType ? r.toMyCoupon() : "NEWMBR" === t.appReturnType ? r.toNewmbrActivity() : "GIFTCARD" === t.appReturnType && r.toGiftCardCenter()); else if ("GRADPRODUCT" === t.linkType) {
        var o = "?productId=" + t.productId + "&storeId=" + u.globalData.storeInfo.id + "&activityId=" + t.grabActivityId + "&type=secondkill";
        r.toGoodsDetails(o);
    } else if ("PRODUCT" === t.linkType) {
        var n = "?productId=" + t.productId + "&storeId=" + u.globalData.storeInfo.id + "&type=normal";
        r.toGoodsDetails(n);
    } else if ("TEAMPRODUCT" === t.linkType) {
        var a = "?productId=" + t.teamActivityId + "&storeId=" + u.globalData.storeInfo.id + "&type=group";
        r.toGoodsDetails(a);
    } else if ("GIFTCARDACTIVITYDETAILS" === t.linkType) {
        var i = "?giftCardActivityId=" + t.giftcardActivityId;
        r.toGiftCardBuy(i);
    } else if ("COUPONACTIVITYDETAILS" === t.linkType) if (u.globalData.userInfo) if (u.globalData.userInfo.member) {
        var s = "?couponActivityId=" + t.couponActivityId + "&type=assign&isExternal=false";
        r.toCouponDetails(s);
    } else wx.showToast({
        title: "您还不是会员，请绑定手机号成为会员~",
        icon: "none",
        duration: 2e3
    }), setTimeout(function() {
        r.toAuthorize();
    }, 2e3); else r.toAuthorize(); else if ("URL" === t.linkType) {
        var c = null;
        "activity" === e ? c = t.linkUrl : "banner" === e && (c = t.link);
        var l = c;
        c.indexOf("?") > -1 && (l = l + "&storeId=" + this.data.currentStoreInfo.storeId + "&type=normal");
        var d = {
            url: encodeURIComponent(l)
        };
        console.log(l, d);
        var h = "?webUrl=" + JSON.stringify(d);
        r.toAdvertising(h);
    }
}), t(e, "handleCoupon", function(t) { //领取优惠券
    var e = this, o = t.currentTarget.dataset.couponid, n = null;
    wx.request({
      url: imgurl + '/Activity/getCoupon/coupon_id/' + o + '/wxtoken/' + wx.getStorageSync('wxtoken'),
      success (res) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2e3
        })
      }
    })

    e.data.couponList.forEach(function(t) {
        o === t.id && (n = t);
    }), u.globalData.userInfo && (u.globalData.userInfo.member ? e._data.hasAssign ? (wx.showToast({
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
    var e = this, o = "GM", a = t.id;
    "HD" === t.service && (o = "HD", a = t.dlyCouponActivityId), i.setHideLoading(!0), 
    n.createCouponOrder(a, o, e.data.currentStoreInfo.storeId).then(function(t) {
        if (console.log(t), "ACQUIRE" === t.status) e._data.hasAssign = !1, i.setHideLoading(!1), 
        wx.hideLoading(), wx.showToast({
            title: "领券成功,稍后请到我的优惠券中查看~",
            icon: "none",
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
                    duration: 2e3
                }), self.resetCouponList();
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
    u.globalData.userInfo && (this.setData({
        hasUserInfo: !0
    }), u.globalData.userInfo.member && this.setData({
        isMember: !0
    }));
}), t(e, "getUserInfo", function(t) {
    var e = this;
    c.login(t).then(function(t) {
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