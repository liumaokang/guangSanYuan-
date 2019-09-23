var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
function a(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var e = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (a[o] = t[o]);
    }
    return a;
}, t = require("../../../../api/orderService.js"), o = (require("../../../../utils/self.js"), 
require("../../../../utils/utils.js")), n = require("../../../../utils/navPage.js"), r = require("../../../../api/teamBuyService.js"), s = require("../../../../api/advanceSellService.js"), i = require("../../../../api/storeService.js"), d = require("../../../../api/raffleService.js"), c = require("../../../../utils/address.js"), u = require("../../../../api/memberService.js"), y = (require("../../../../api/redPacketService.js"), 
require("../../../../api/couponService.js")), l = getApp(), app = getApp(),p = null;
var server = require('../../../../utils/server');


Page({
    data: {
        x: 300,
        y: 450,
        homeBack: !1,
        codeImgSuccess: !1,
        orderId: "",
        memberName: "",
        mobile: "",
        orderid:'',
        goodsList: [],
        address: "",
        addresss:'',
        storeName: "",
        storeId: "",
        amount:'0',
        createTime: "",
        cashTotal: 0,
        remark: "",
        orderStatus: "",
        shipmentType: "",
        codeText: "",
        takeType:'自提',
        locationAdress:"",
        selfTimeScope: "立即到店",
        shipmentAmount: "0",
        isTeamBuy: !1,
        isTeamShare: !1,
        countDownList: {},
        teamMemberCount: "",
        joinMemberCount: "",
        teamPeopleCount: 0,
        joinPeopleCount: 0,
        joinMbrs: [],
        leaderImageUrl: "",
        teamMemberImageUrl: "",
        couponPrice: "0",
        cardPrice: "0",
        scoreAmount: "0",
        giftCardAmount: 0,
        bank: !1,
        serviceTel: "",
        canRefund: !0,
        isDistribution: !1,
        trackingCompany: "",
        trackingNumber: "",
        teamBuyEnd: !1,
        teamStatus: "normal",
        orderType: "normal",
        balanceEnable: !0,
        balanceTotal: 0,
        business: "RETAIL",
        deductibleShipmentAmonut: 0,
        payTime: 10,
        payTimeId: 0,
        groupTimeId: 0,
        hasRefund: !1,
        order: {},
        sendPrice:0,
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1,
            pay: !1,
            payMiddle: !1
        },
        storeInfo: {},
        canRaffle: !1,
        raffleId: "",
        supportPartReturn: !0,
        showBarcode: !0,
        selfTimeText: "",
        payCurrentItem: -1,
        payBalance: 0,
        payOrder: {
            id: "",
            cashTotal: 0
        },
        payType:"钱包余额支付",
        payPassword: "",
        sele:true,
        payOrderType: "normal",
        payFrom: "shopCart",
        payModal: !1,
        payFocus: !1,
        time_h:"00",
        time_m:"00",
        time_s:"00",
        payOrderPay: !1,
        payOrderCancel: !1,
        payCanBuy: !1,
        payCardPay: !1,
        payCardAmount: 0,
        payCardPayChoose: !0,
        payPayments: {
            cardPay: {
                total: 0
            },
            wxPay: {
                total: 0
            }
        },
        payPayMethods: [ {
            id: 0,
            name: "CARDPAY",
            value: "钱包余额支付",
            imageUrl: "/image/ball.png",
            checked: 1,
            isShow: !0
        }, {
            id: 1,
            name: "WXPAY",
            value: "微信支付",
            imageUrl: "/image/wx.png",
            checked: !1,
            isShow: !0
        } ],
        payOrderTimeId: 0,
        notUseWxpay: !1
    },
    codeTextPartition: function(a) {
        return a = a.replace(/\s/g, "").replace(/(\w{4})(?=\w)/g, "$1 ");
    },
    handleOrderStatus: function(a) {
        return "CREATED" === a ? "待付款" : "PAID" === a ? "已付款" : "SHIPPED" === a ? "配送中" : "RECEIVED" === a ? "待评价" : "FINISHED" === a ? "已完成" : "CANCELED" === a ? "已取消" : "REJECTED" === a ? "已退款" : "RETURNING" === a ? "退款中 " : "PENDING" === a ? "待自提" : "WAITSHIPPED" === a ? "待发货" : "WAITPAYBALANCE" === a ? "待付尾款" : "状态异常";
    },
    refreshBarcode: function() {
        this.getBarcodeCode(this.options.orderId);
    },
    getOrderDetails: function() {
        var a = this, o = this.options.orderId, n = this;
        t.getDetailsById(o).then(function(t) {
            if (t) {
                var o = t.status;
                console.log(t);
                var r = t.payments.some(function(a) {
                    return "UNIONPAY_APP" === a.payMethod;
                }), s = e({}, t, {
                    status: n.handleOrderStatus(t.status),
                    payStatus: t.status,
                    cashTotal: t.cashTotal.toFixed(2)
                }), i = null;
                try {
                    var d = wx.getStorageSync("wj_allStores");
                    if (d && d.length > 0) {
                        for (var c = 0; c < d.length; c++) {
                            var u = d[c];
                            if (u.id == t.storeId) {
                                i = u;
                                break;
                            }
                        }
                        n.setData({
                            storeInfo: i
                        });
                    }
                } catch (a) {
                    console.log(a);
                }
                
                n.getStoreById(t.storeId), a.setData({
                    bank: r,
                    order: s,
                    orderId: t.id,
                    business: t.business,
                    memberName: t.memberName ? t.memberName : "",
                    mobile: t.receiverMobile,
                    goodsList: t.products,
                    address: t.province + t.city + t.district + t.address,
                    storeName: t.storeName,
                    storeId: t.storeId,
                    createTime: t.createTime,
                    cashTotal: t.cashTotal,
                    orderAmount: t.orderAmount,
                    cashDeductTotal: t.cashDeductTotal,
                    canRefund: t.canRefund,
                    remark: t.remark,
                    orderStatus: a.handleOrderStatus(o),
                    deductibleShipmentAmonut: t.deductibleShipmentAmonut ? t.deductibleShipmentAmonut.toFixed(2) : 0,
                    storeAddress: t.storeAddress,
                    selfTimeScope: n.getSelfScopeTime(t.selfPickBeginTime, t.selfPickEndTime),
                    shipmentType: t.shipmentType,
                    shipmentAmount: t.shipmentAmount,
                    teamId: t.teamId ? t.teamId : "",
                    teamLeaderRecordId: t.teamLeaderRecordId ? t.teamLeaderRecordId : "",
                    advanceId: t.advanceId ? t.advanceId : "",
                    hasRefund: t.hasRefund
                }), "CREATED" === t.status && n.getAutoCancelPeriod(t.createTime), t.trackingCompany && t.trackingNumber && n.setData({
                    trackingCompany: t.trackingCompany,
                    trackingNumber: t.trackingNumber
                }), t.payments && t.payments.forEach(function(a) {
                    "COUPONPAY" === a.payMethod && a.total !== t.deductibleShipmentAmonut ? n.setData({
                        couponPrice: a.total
                    }) : "CARDPAY" === a.payMethod ? n.setData({
                        cardPrice: a.total
                    }) : "SCOREPAY" === a.payMethod ? n.setData({
                        scoreAmount: a.total
                    }) : "GIFTCARDPAY" === a.payMethod && n.setData({
                        giftCardAmount: a.total
                    });
                }), t.showBarCode ? (n.setData({
                    showBarcode: !0
                }), n.getBarcodeCode(t.ladingCode)) : n.setData({
                    showBarcode: !1
                }), n.setData({
                    selfTimeScope: n.getSelfScopeTime(t.selfPickBeginTime, t.selfPickEndTime)
                }), "" != t.teamId && null != t.teamId && ("PAID" === o && t.canRefund ? (n.data.teamLeaderRecordId && n.setData({
                    isTeamBuy: !0,
                    "order.status": "待拼团",
                    isTeamShare: !0
                }), n.getTeamBuyingInfo()) : "REJECTED" === o ? (n.setData({
                    isTeamBuy: !0,
                    isTeamShare: !1
                }), n.getTeamBuyingInfo()) : n.getTeamBuyingInfo()), !1 === t.canRefund && "REJECTED" !== o && "CANCELED" !== o && n.setData({
                    isTeamBuy: !1,
                    orderStatus: "退款中",
                    "order.status": "退款中",
                    isTeamShare: !1
                });
                var y = [];
                try {
                    var l = wx.getStorageSync("wj_distributionStore");
                    l && y.push(l), y.forEach(function(a) {
                        n.data.storeId === a.id && n.setData({
                            isDistribution: !0
                        });
                    });
                } catch (a) {}
                t.advanceId && "WAITPAYBALANCE" === o && a.setData({
                    balanceEnable: t.balanceEnable,
                    balanceTotal: t.balanceTotal ? t.balanceTotal : ""
                }), "SCORE" !== t.business && "CREATED" !== t.status && "CANCELED" !== t.status && "REJECTED" !== t.status && "WAITPAYBALANCE" !== t.status && n.getRaffleStatus(t, n);
            } else wx.showToast({
                title: "未查到相关订单",
                icon: "none",
                duration: 1500
            }), setTimeout(function() {
                a.toIndex();
            }, 1500);
            a.data.onLoad && a.setData({
                onLoad: !1
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
  toCancel: function (e) { //取消订单
    var a = this;
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id), wx.showModal({
      title: "提示",
      content: "确认要取消该订单？",
      success: function (e) {
        if (e.confirm) {
          wx.request({
            url: imgurl + '/Order/cancel_order/id/' + id + '/wxtoken/' + wx.getStorageSync('wxtoken'),
            success(res) {
              console.log(res.data)
              if (res.data.status == 1) {
                wx.showToast({
                  title: '已取消',
                  icon: 'none',
                  success:function(){
                    a.orderdatails(id)
                  }
                })

              }

            }
          })
        }
        e.confirm ? t.cancel(id).then(function (e) {
          a.getOrderData(a.data.tabSelected);
        }).catch(function (e) {
          wx.showToast({
            title: e.message,
            icon: "none",
            duration: 2e3
          });
        }) : e.cancel;
      }
    });
  },
    getSelfScopeTime: function(a, e) {
        var t = a.split(" "), o = e.split(" "), n = t[0].split("-"), r = o[0].split("-"), s = n[1] + "月" + n[2] + "日", i = r[1] + "月" + r[2] + "日";
        t[1].slice(0, 5), o[1].slice(0, 5);
        return "自提时间：" + s + " " + t[1].slice(0, 5) + " ~ " + i + " " + o[1].slice(0, 5);
    },
    getOrderStatus: function() {
        var a = this.options.orderId, e = this;
        o.setHideLoading(!0), t.getDetailsById(a).then(function(a) {
            a && "PENDING" !== a.status && (clearInterval(p), o.setHideLoading(!1), e.getOrderDetails());
        });
    },
    toGoodsDetail: function(a) {
        console.log(a);
        var e = "?productId=" + a.currentTarget.dataset.item.productId + "&storeId=" + l.globalData.storeInfo.id + "&type=normal";
        n.toGoodsDetails(e);
    },
    getAutoCancelPeriod: function(a) {
        var e = this;
        t.getAutoCancelPeriod().then(function(t) {
            function n() {
                clearTimeout(e.data.payTimeId);
                var a = o.countDown(s)[0].hou + ":" + o.countDown(s)[0].min + ":" + o.countDown(s)[0].sec;
                e.setData({
                    payTime: a
                });
                var t = setTimeout(function() {
                    n(s);
                }, 1e3);
                e.setData({
                    payTimeId: t
                });
            }
            var r = new Date(), s = (new Date(a.replace(/-/g, "/")).getTime(), new Date(o.formatTime(r)).getTime(), 
            []), i = {
                openTeamTime: a,
                duration: t / 1e3
            };
            s.push(i), n();
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
  userInfo: function () {
    var that = this;
    server.getJSON('/User/userinfo/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
      console.log('userInfo')
      console.log(res);
      if (res.data.status == 1) {
        var info = res.data.result.info;
        that.setData({
          nickname: info.nickname,
          head_pic: info.head_pic,
          coupon_count: info.coupon_count,
          pay_point: info.pay_points,
          user_money: info.user_money,
          user_cash: info.user_cash,
          waitPay: info.waitPay,
          waitSend: info.waitSend,
          waitReceive: info.waitReceive,
          return_count: info.return_count,
          uncomment_count: info.uncomment_count,
          identity: info.identity,
          partner: info.partner,
          levelimg: info.levelimg,
          login: true,
          onteam: info.onteam,
        });
      } else if (res.data.status == -1) {
        that.setData({
          head_pic: '../../img/ceshi.jpg',
          nickname: '去登陆',
          user_money: 0,
          pay_point: 0,
          coupon_count: 0,
          waitPay: 0,
          waitReceive: 0,
          uncomment_count: 0,
          return_count: 0,
          waitSend: 0,
          user_cash: 0,
          identity: 0,
          partner: 0,
          levelimg: '../../image/wd_jdt.png',
          like: [],
          url: app.globalData.url,
          login: false,
          onteam: 0
        })
      }
    });
  },
    getRaffleStatus: function(a, e) {
        d.getByType("ORDER_RAFFLE").then(function(a) {
            if (a && l.globalData.userInfo) {
                var t = {
                    orderId: e.data.order.id,
                    activityId: a.id,
                    wxaOpenid: l.globalData.userInfo.wxaUser.openId
                };
                d.create(t).then(function(a) {
                    e.setData({
                        canRaffle: !0,
                        raffleId: a
                    });
                }).catch(function(a) {
                    e.setData({
                        canRaffle: !1
                    });
                });
            }
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getTeamBuyingInfo: function() {
        var a = this, t = this, n = this.data.teamId, s = this.data.teamLeaderRecordId;
        r.getDetails(n, s).then(function(n) {
            var r = [];
            if (n.joinMbrs.length > 0) {
                if ("THOUSAND" !== n.teamBuyingType && "匿名" !== n.mobile) {
                    var s = {
                        avatar: n.avatar ? n.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                    };
                    r.push(s);
                }
                n.joinMbrs.forEach(function(a) {
                    var t = e({}, a, {
                        avatar: a.avatar ? a.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                    });
                    a.mobile && r.push(t);
                });
            } else if (n.joinMemberCount === n.teamMemberCount) if ("THOUSAND" !== n.teamBuyingType && "匿名" != n.mobile) {
                var i = e({}, i, {
                    avatar: n.avatar ? n.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                });
                r.push(i);
                for (var d = n.joinMemberCount > 12 ? 12 : n.joinMemberCount, c = 0; c < d - 1; c++) {
                    var u = e({}, u, {
                        avatar: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                    });
                    r.push(u);
                }
            } else for (var y = n.joinMemberCount > 12 ? 12 : n.joinMemberCount, l = 0; l < y - 1; l++) {
                var p = e({}, p, {
                    avatar: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                });
                r.push(p);
            } else if (1 === n.joinMemberCount) {
                var h = {
                    avatar: n.avatar ? n.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                };
                r.push(h);
            }
            if (a.setData({
                leaderImageUrl: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png",
                teamMemberImageUrl: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png",
                openTeamTime: n.openTeamTime,
                duration: n.duration,
                teamMemberCount: n.teamMemberCount,
                joinMbrs: r,
                originalPrice: n.originalPrice,
                joinMemberCount: n.joinMemberCount ? n.joinMemberCount : 0,
                joinPeopleCount: n.joinMemberCount > 12 ? 12 : n.joinMemberCount,
                teamPeopleCount: n.teamMemberCount > 12 ? 12 : n.teamMemberCount,
                teamBuyingType: n.teamBuyingType,
                sharePicture: n.sharePicture ? n.sharePicture : ""
            }), n.teamMemberCount === n.joinMemberCount) {
                t.setData({
                    teamStatus: "success"
                }), "PAID" === t.data.order.payStatus && t.setData({
                    "order.status": "已成团"
                });
                var m = n.joinMemberCount;
                if (t.data.joinMbrs.length < m) {
                    var g = [].concat(t.data.joinMbrs);
                    m > 12 && (m = 12);
                    for (var f = 0; f < m - t.data.joinMbrs.length; f++) g.push({
                        avatar: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                    }), console.log(f, t.data.joinMbrs.length);
                    t.setData({
                        joinMbrs: g
                    });
                }
            } else {
                var T = new Date(), P = new Date().getTime(), I = 0;
                if (t.data.openTeamTime ? I = new Date(t.data.openTeamTime.replace(/-/g, "/")).getTime() : (I = P, 
                t.setData({
                    openTeamTime: o.formatTime(T).replace(/\//g, "-")
                })), (P - I) / 1e3 >= t.data.duration) t.setData({
                    teamBuyEnd: !0,
                    teamStatus: "fail"
                }); else if (!1 === t.data.teamBuyEnd) {
                    var D = [], w = {
                        openTeamTime: a.data.openTeamTime,
                        duration: a.data.duration
                    };
                    D.push(w), t.setData({
                        teamBuyTimeList: D
                    }), function a() {
                        clearTimeout(t.data.groupTimeId), t.setData({
                            countDownList: o.countDown(D)[0]
                        }), "00" == t.data.countDownList.hou && "00" == t.data.countDownList.min && "00" == t.data.countDownList.sec && t.getTeamBuyingInfo();
                        var e = setTimeout(function() {
                            a(D);
                        }, 1e3);
                        t.setData({
                            groupTimeId: e
                        });
                    }();
                } else wx.showToast({
                    title: "当前团购活动已过期...",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    getBarcodeCode: function(a) {
        var e = this;
        a && (t.getBarcode(a).then(function(a) {
            e.setData({
                barcodeImageUrl: "data:image/png;base64," + wx.arrayBufferToBase64(a)
            });
        }).catch(function(a) {
            e.setData({
                barcodeImageUrl: ""
            });
        }), this.setData({
            codeText: this.codeTextPartition(a)
        }));
    },
    getByOrder: function(a) {
        t.getByOrder(a).then(function(a) {
            console.log(a);
        });
    },
    toGoodsDetails: function(a) {
        var e = "?productId=" + a.currentTarget.dataset.id + "&storeId=" + this.data.storeId + "&type=normal";
        n.toGoodsDetails(e);
    },
    toPay: function() {
        var a = this.data.orderId;
        this.toPayMethod(a);
    },
    toPayMethod: function(a) {
        this.setData({
            "show.pay": !0,
            payCardPayChoose: !0
        }), this.payOnLoad({
            orderId: a,
            from: "order"
        });
    },
    toPayTail: function() {
        var a = this, e = (this.data.orderId, a.data.advanceId), t = a.data.orderId, n = a.data.goodsList, r = null;
        n.length > 0 && (r = n[0].productId), s.getByIds(e, r).then(function(e) {
            var n = new Date(), r = new Date(o.formatTime(n)).getTime(), s = new Date(e.balanceStartTime.replace(/-/g, "/")).getTime(), i = new Date(e.balanceEndTime.replace(/-/g, "/")).getTime(), d = e.balanceStartTime.split(" ")[0].split("-"), c = d[0] + "年" + d[1] + "月" + d[2] + "日", u = e.balanceEndTime.split(" ")[0].split("-"), y = u[0] + "年" + u[1] + "月" + u[2] + "日";
            r < s ? wx.showToast({
                title: "请于" + c + "至" + y + "期间支付尾款",
                icon: "none",
                duration: 2e3
            }) : s <= r && r <= i ? a.toPayMethod(t) : wx.showToast({
                title: "很抱歉，您的订单已经超过支付尾款的最后期限了~",
                icon: "none",
                duration: 2e3
            });
        });
    },
    handleConfirmReceipt: function(a) {
        var e = this;
        console.log(a);
        var o = a.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "请确认已经收到商品？",
            success: function(a) {
                a.confirm ? t.confirm(o).then(function(a) {
                    e.getOrderDetails();
                }) : a.cancel;
            }
        });
    },
    toOrderTrajectory: function() {
        var a = this, e = this.data.order, t = e.id, o = {
            user: {
                latitude: a.data.order.lat,
                longitude: a.data.order.lng
            },
            store: {
                latitude: a.data.storeInfo.latitude,
                longitude: a.data.storeInfo.longitude
            }
        }, r = JSON.stringify(a.data.storeInfo), s = "?orderId=" + t + "&location=" + JSON.stringify(o) + "&courierName=" + e.courierName + "&courierPhone=" + e.courierPhone + "&store=" + r;
        n.toOrderTrajectory(s);
    },



    //申请退款
    toRefundGoods: function(a) {
        var e = "?orderId=" + a.currentTarget.dataset.id;
        n.toRefund(e);
    },


    toRefundDetails: function(a) {
        var e = "?orderId=" + a.currentTarget.dataset.id;
        n.toRefundDetails(e);
    },
    toEvaluate: function(a) {
        var e = "?orderId=" + a.currentTarget.dataset.id;
        n.toEvaluate(e);
    },
    toService: function() {
        var a = this.data.serviceTel;
        wx.showModal({
            title: "提示",
            content: "确认要拨打此电话" + a + "？",
            success: function(e) {
                e.confirm ? wx.makePhoneCall({
                    phoneNumber: a
                }) : e.cancel;
            }
        });
    },
    toTrackingDetails: function() {
        var a = this, e = {
            trackingCompany: a.data.trackingCompany,
            trackingNumber: a.data.trackingNumber
        }, t = "?trackData=" + JSON.stringify(e);
        n.toLogisticsInfo(t);
    },
    contactStore: function(e) {
        var a = this.data.storeInfo, e = "";
        "" !== (e = null != a.tel && "" != a.tel ? a.tel : l.globalData.servicePhone) && wx.showModal({
            title: "提示",
            content: "确定要拨打以下电话" + e + "?",
            confirmText: "拨打",
            success: function(a) {
                a.confirm && wx.makePhoneCall({
                    phoneNumber: e
                }), a.cancel;
            }
        });
    },
    getStoreById: function(a) {
        var e = this, t = {
            tel: ""
        };
        i.getById(a).then(function(a) {
            t = a, e.setData({
                storeInfo: t
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: none,
                duration: 2e3
            });
        });
    },
    chooseAddress: function () {
    var t = this, a = t.data.region;
    wx.chooseLocation({
      success: function (o) {
        function n(e, t) {
          var a = (s = /^(.*?[市]|.*?地区|.*?特别行政区|.*?盟|.*?自治州)(.*?[市区县旗])(.*?)$/g).exec(e);
          console.log(a), t.city = a[1], t.country = a[2], t.address = a[3];
        }
        console.log(o, "location");
        t.setData({
          locationAdress:o
        })
        var s = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/, i = [], l = {
          province: null,
          country: null,
          city: null,
          address: null
        }, d = o.name;
        if (i = s.exec(o.address)) if (l.province = i[1], o.poiid && "City" === o.poiid) {
          var r = /^(.*?)\((.+?)\)$/g, c = r.exec(o.name);
          console.log(c);
          var u = o.latitude, f = o.longitude;
          e.reverseGeocoder({
            location: {
              latitude: u,
              longitude: f
            },
            success: function (e) {
              console.log(e), l.province = e.result.address_component.province, l.city = e.result.address_component.city,
                l.country = e.result.address_component.district, t.setData({
                  region: [l.province, l.city, l.country]
                });
            },
            fail: function (e) {
              console.log(e);
            }
          }), l.address = c[2], d = c[1];
        } else n(o.address, l); else if (s = /^(.*?(省|自治区))(.*?)$/, i = s.exec(o.address)) l.province = i[1],
          n(i[3], l); else {
          c = (r = /^(.*?)\((.+?)\)$/g).exec(o.address);
          console.log(c), console.log(a);
          var u = o.latitude, f = o.longitude;
          e.reverseGeocoder({
            location: {
              latitude: u,
              longitude: f
            },
            success: function (e) {
              console.log(e), l.province = e.result.address_component.province, l.city = e.result.address_component.city,
                l.country = e.result.address_component.district, t.setData({
                  region: [l.province, l.city, l.country]
                });
            },
            fail: function (e) {
              console.log(e);
            }
          }), l.address = c[2], d = c[1];
        }
        console.log(l), "" !== l.address && t.setData({
          detailedLabelShow: !0
        }), t.setData({
          details: d,
          houseNumber: l.address,
          region: [l.province, l.city, l.country]
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
    viewStoreLocation: function() {
        var a = this.data.storeInfo, e = parseFloat(a.latitude), t = parseFloat(a.longitude);
        wx.openLocation({
            latitude: e,
            longitude: t,
            scale: 28,
            name: a.name,
            address: a.address
        });
    },
  cancelOrder:function(id){
    // var id = this.data.order.order_id;
    // console.log(id)
    server.getJSON('/order/cancel_order'+'/wxtoken/' +wx.getStorageSync('wxtoken')+'/id/'+id,function(res){
      console.log(res)
    })
  },
  flashTime: function (over_time) {
    var that=this;
    var totalSecond = over_time;
    var interval = setInterval(function () {
      var second = totalSecond;
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      var hr = Math.floor((second) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      var sec = second- hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      that.setData({
        time_h: hrStr,
        time_m: minStr,
        time_s: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        that.cancelOrder(that.data.order.order_id);
        that.setData({
          time_h: '00',
          time_m: '00',
          time_s: '00',
        });
      }
    }.bind(this), 1000);
  },
  onLoad: function(a) {
      var that = this;
      that.setData({
        orderid: e.orderId
      })
      if (a.takeType =='selftake'){
        that.setData({
          takeType: '自提',
          beizhu: a.remark,
          addresss:a.addresss,
          amount: a.amount
        })
      } else if (a.takeType == 'dispatch'){
        that.setData({
          takeType: '配送',
          beizhu: a.remark,
          addressMessage: a,
          amount: a.amount
        })
      }
      if (a.order_id) {
        var idss=a.order_id;
        var uid = app.globalData.unionId;
        //详情请求                               
        server.getJSON('/Order/order_detail/id/' + idss+ '/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
          console.log('数据已接到')
          var orderdetails = res.data.list;
          var miao = orderdetails.cha;
          console.log(orderdetails.order_id)
          console.log(a)
          orderdetails.address=a.address;
          orderdetails.consignee=a.consignee;
          orderdetails.mobile=a.mobile;
          orderdetails.province=a.province;
          var sendPrice=wx.getStorageSync('sendPrice');
          var order_amount=orderdetails.order_amount;
          if(orderdetails.subscribe>0){
             var total_fee=order_amount;
          }else{
            var total_fee=sendPrice+order_amount;
          }
          

          that.flashTime(miao)
          that.setData({
            order: orderdetails,
            money: res.data.money,
            goods: orderdetails.goods_list,
            goods_name: orderdetails.goods_list[0].goods_name,
            goods_id: orderdetails.goods_list[0].goods_id,
            share_img: orderdetails.goods_list[0].share_img,
            sendPrice:sendPrice,
            total_fee:total_fee
          });
        });
      }else{
        var orderId = a.orderId;
        that.setData({
          orderid: orderId,
          sendPrice: Number(wx.getStorageSync('sendPrice'))
        })
        console.log(Number(wx.getStorageSync('sendPrice')))
        that.orderdatails(orderId);
      }
      that.userInfo();
    that.toCancel()
        // var e = this;
        // wx.hideShareMenu(), this.getSharePictures(), 1 === getCurrentPages().length ? (this.setData({
        //     homeBack: !0
        // }), l.globalData.storeInfo ? this.onLoadInit(a) : c.getLocation().then(function(t) {
        //     l.globalData.storeInfo = t, e.onLoadInit(a);
        // }).catch(function(a) {
        //     wx.showToast({
        //         title: a.message,
        //         icon: "icon",
        //         duration: 2e3
        //     });
        // })) : this.onLoadInit(a);
       // 限时抢购商品
    
    },

    // 订单详情
    orderdatails: function(id) {
        var that = this
        var uid = app.globalData.unionId;
        //详情请求                               
        server.getJSON('/Order/order_detail/id/' + id + '/wxtoken/' + wx.getStorageSync('wxtoken'), function(res) {
            console.log('订单x');
            console.log(res);
            var orderdetails = res.data.list;
            console.log(orderdetails)
            if (orderdetails.order_status_desc=='待支付'){
              that.toPay()
            }
         var sendPrice=wx.getStorageSync('sendPrice');
          var order_amount=orderdetails.order_amount;
          // if(orderdetails.subscribe>0){
             var total_fee=order_amount;
          // }else{
            // var total_fee=sendPrice+order_amount;
          // }
            var miao = orderdetails.cha;
            console.log(miao)
          console.log(orderdetails.order_id)
            that.flashTime(miao)
            that.setData({
                order: orderdetails,
                money: res.data.money,
                goods: orderdetails.goods_list,
                goods_name: orderdetails.goods_list[0].goods_name,
                goods_id: orderdetails.goods_list[0].goods_id,
                share_img: orderdetails.goods_list[0].share_img,
                total_fee:total_fee,
                sendPrice:sendPrice,
                peisong:res.data.peisong
            });
            
        });
    },










    onLoadInit: function(a) {
        this.setData({
            serviceTel: l.globalData.servicePhone,
            onLoad: !0
        });
        var e = !0;
        l.globalData.configureInfo.forEach(function(a) {
            "supportPartReturn" === a.key && void 0 !== a.value && (e = "TRUE" === a.value);
        }), this.setData({
            supportPartReturn: e
        }), a.orderId && this.getOrderDetails(), this.getSharePictures(), "shopCart" !== a.from && "order" !== a.from || (this.payOnLoad(a), 
        this.setData({
            "show.pay": !0
        }));
    },
    onReady: function() {},
    onShow: function() {
        // var a = this;
        // this.data.orderId && this.getOrderDetails(), clearInterval(p), p = setInterval(function() {
        //     a.getOrderStatus();
        // }, 2e3);
      
    },
    onHide: function() {
        clearInterval(p);
    },
    onUnload: function() {
        clearTimeout(this.data.payTimeId), clearTimeout(this.data.groupTimeId), this.payOnUnload(), 
        clearInterval(p);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(a) {
        var e = this, t = JSON.stringify({
            storeId: this.data.storeId,
            storeName: this.data.storeName
        }), o = e.data.goodsList, n = this.data.sharePictures, r = this.data.raffleSharePictures;
        if (o.length > 0 && (n = o[0].imageUrl), null != e.data.sharePicture && "" != e.data.sharePicture && (n = e.data.sharePicture), 
        "button" === a.from) {
            if (l.globalData.userInfo && l.globalData.userInfo.member) {
                var s = l.globalData.userInfo.member.id;
                return "raffle" === a.target.dataset.sharetype ? ("" !== r && null != r && (n = r), 
                {
                    title: "优惠券大抽奖",
                    path: "/pages/mallModule/activity/luckDraw/luckDraw?raffleId=" + e.data.raffleId + "&mobile=" + s + "&type=order",
                    imageUrl: n,
                    success: function(a) {
                        console.log(a), wx.showShareMenu({
                            withShareTicket: !0
                        });
                    }
                }) : {
                    title: "拼团有优惠",
                    path: "/pages/mallModule/fightGroup/groupPurchase/groupPurchase?teamBuyId=" + this.data.teamId + "&teamLeaderRecordId=" + this.data.teamLeaderRecordId + "&storeData=" + t + "&mobile=" + s,
                    imageUrl: n,
                    success: function(a) {
                        wx.showShareMenu({
                            withShareTicket: !0
                        });
                    }
                };
            }
            return {
                title: "鲜丰水果，新鲜才好吃！",
                path: "/pages/mallModule/index/index/index",
                imageUrl: n,
                success: function(a) {
                    wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            };
        }
        return {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/index/index/index",
            imageUrl: n,
            success: function(a) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    resetLight: function() {
        var a = this;
        setTimeout(function() {
            a.data.screenLight && wx.setScreenBrightness({
                value: a.data.screenLight
            });
        }, 100);
    },
    getSharePictures: function() {
        var a = this;
        l.globalData.sharePictures && this.setData({
            sharePictures: l.globalData.sharePictures
        }), o.getSharePictures("RAFFLE_ACTIVITY").then(function(e) {
            a.setData({
                raffleSharePictures: e
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toggleMiddlePopup: function() {
        this.toggle("middle");
    },
    toggle: function(e) {
        this.setData(a({}, "show." + e, !this.data.show[e]));
    },
    payTogglePayPopup: function() {
        this.toggle("pay");
    },
    payHandleResetPassword: function() {
        n.toCheckMobile();
    },
    payHandlePassword: function(a) {
        a.detail.value.length <= 6 && this.setData({
            payPassword: a.detail.value
        });
    },
    payClickBlank: function() {
        this.setData({
            payModal: !1,
            payPassword: "",
            payCanBuy: !0
        });
    },
    radioChange: function (e) {
      var value = e.detail.value;
      this.setData({
        payType:value
      })
    },
    payClickBody: function() {},
    payGetOrderDataById: function(a) {
        var o = this, n = this;
        t.getDetailsById(a).then(function(a) {
            var t = e({}, a);
            return "WAITPAYBALANCE" === t.status && (t.cashTotal = t.balanceTotal), o.setData({
                payOrder: t,
                payType: "WAITPAYBALANCE" === t.status ? "payTail" : "normal"
            }), "ADVANCE_SELL" == a.business && o.setData({
                payOrderType: "advanceSell"
            }), a.teamId && o.setData({
                payOrderType: "group",
                groupInfo: {
                    teamId: a.teamId,
                    teamLeaderRecordId: ""
                }
            }), 0 === a.cashTotal && n.payGetOrderStatusById(a.id, n), u.getMbrBalance();
        }).then(function(a) {
            var e = n.data.payOrder;
            o.setData({
                payBalance: a
            });
            var t = e.cashTotal - e.cardDeductTotal;
            a > 0 ? a >= t ? n.setData({
                "payPayMethods[0].checked": !0,
                "payPayments.cardPay.total": t,
                "payPayMethods[1].checked": !1,
                notUseWxpay: !0,
                payCanBuy: !0
            }) : n.setData({
                "payPayMethods[0].checked": !0,
                "payPayments.cardPay.total": a,
                payCurrentItem: 1,
                "payPayMethods[1].checked": !0,
                notUseWxpay: !1,
                payCanBuy: !0
            }) : n.setData({
                "payPayMethods[1].checked": !0,
                "payPayments.cardPay.total": 0,
                payCanBuy: !0
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    payGetCouponOrderDetailsById: function(a) {
        var e = this, t = this;
        y.getCouponOrderById(a).then(function(a) {
            if (a) {
                var t = {
                    cashTotal: a.price,
                    id: a.id
                };
                e.setData({
                    payOrder: t
                });
            }
            return u.getMbrBalance();
        }).then(function(a) {
            var o = t.data.payOrder;
            e.setData({
                payBalance: a
            });
            var n = o.cashTotal - o.cardDeductTotal;
            a > 0 ? a >= n ? t.setData({
                "payPayMethods[0].checked": !0,
                "payPayments.cardPay.total": n,
                payCanBuy: !0
            }) : t.setData({
                "payPayMethods[0].checked": !0,
                "payPayments.cardPay.total": a,
                payCurrentItem: 1,
                "payPayMethods[1].checked": !0,
                payCanBuy: !0
            }) : t.setData({
                "payPayMethods[1].checked": !0,
                payCanBuy: !0
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
     
    payToPayment: function(e) {
        var paytype=this.data.payType;
       
        if(paytype=='微信支付'){
           this.wxPay();
        }else{
        var canUse = e.currentTarget.dataset.canUse;
            this.usermoney(canUse);
        }


    },

    usermoney:function(canUse){
       var that=this
         that.setData({
            total_fee: 0,
            // user_money:canUse
        })
        that.orderPrice();
    },









 // 微信支付
    wxPay: function() {
         console.log('微信支付');
         console.log('token');
         console.log(wx.getStorageSync('wxtoken'));
         console.log('openid');
         console.log(app.globalData.openid);
         console.log('orderId');
         console.log(this.data.order.order_id);
         console.log('appId');
         console.log(app.globalData.appid);


        wx.request({
            url: app.globalData.url + '/index.php/wxapi/Order/getPrePayId',
            data: {
                wxtoken: wx.getStorageSync('wxtoken'),
                openid: app.globalData.openid,
                order_id: this.data.order.order_id,
                appid: app.globalData.appid,
            },
            method: 'POST',
            success: function(res) {
                console.log('支付返回结果');
                console.log(res);
                wx.requestPayment({
                    'timeStamp': res.data.timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': res.data.package,
                    'signType': res.data.signType,
                    'paySign': res.data.paySign,
                    'success': function(res) {
                        wx.showToast({
                            title: '支付成功',
                            duration: 3000,
                            success: function() {
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: '../../../mallModule/member/my/my',
                                    })
                                }, 2000) //延迟时间
                            }
                        })
                    },
                    'fail': function(res) {
                         console.log('支付返回结果');
                         console.log(res);
                        wx.showToast({
                            title: '支付失败',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },

  // 计算价格
    orderPrice: function() {
        var that = this;
       
        
        wx.request({
            url: app.globalData.url + '/index.php/wxapi/Cart/cart3',
            data: {
                wxtoken: wx.getStorageSync('wxtoken'),
                act: 'order_price',
                user_money: that.data.user_money,
                order_id:that.data.order.order_id,
                pay_type:2,
            },
            method: 'POST',
            success(res) {
                console.log(that.data.orderid)
                if (res.data.status == 1) {
                    wx.showToast({
                        title: res.data.msg,
                    })
                    that.userInfo();
                  wx.navigateTo({
                    url: '../../../mallModule/pay/payment/payment?order_id=' + that.data.orderid,
                  })
                } else {
                    wx.showToast({
                        title: res.data.msg
                    })
                    wx.navigateTo({
                      url: '../../../mallModule/pay/payment/payment?order_id='+that.data.orderid,
                    })
                    
                }
                console.log('res');
                console.log(res);
                 that.setData({
                    total_fee:res.data.result.total_amount
                })
            }
        })
    },
    payGetWXPay: function(a) {
        var e = this, o = {
            orderId: a.id,
            payMethod: "WX_MINI_APP"
        };
        0 === a.cashTotal ? e.payGetOrderStatusById(a.id, e) : t.getPaySign(o).then(function(a) {
            e.payWxPay(a, o);
        }).catch(function(t) {
            -1001 === t.code ? (!0 === e.data.payPayMethods[0].checked && e.data.payPayments.cardPay.total > 0 && e.payOrderLock(a), 
            e.toggle("payMiddle")) : (e.setData({
                payCanBuy: !0
            }), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }));
        });
    },
    payGetPay: function(a) {
        var n = this, r = {
            orderId: a.id,
            payMethod: "WX_MINI_APP"
        };
        if (0 === a.cashTotal) n.payGetOrderStatusById(a.id, n); else {
            var s = {
                orderId: a.id,
                cardAmount: n.data.payPayments.cardPay.total
            }, i = this.data.payPassword;
            "" !== i && (s = e({}, s, {
                password: i
            })), t.prepareCardPay(s).then(function(e) {
                return console.log(a.cardDeductTotal + s.cardAmount), n.setData({
                    payCardAmount: n.data.payPayments.cardPay.total,
                    "payOrder.cardDeductTotal": a.cardDeductTotal + s.cardAmount,
                    payBalance: 0,
                    "payPayMethods[0].checked": !1,
                    payCardPayChoose: !1
                }), o.sleep(500), t.getPaySign(r);
            }).then(function(a) {
                n.payWxPay(a, r, !0);
            }).catch(function(e) {
                20005 === e.code ? (n.setData({
                    payPassword: "",
                    payCanBuy: !0,
                    payFocus: !0,
                    payModal: !0
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                })) : -1001 === e.code ? (!0 === n.data.payPayMethods[0].checked && n.data.payPayments.cardPay.total > 0 && n.payOrderLock(a), 
                n.toggle("payMiddle")) : (n.setData({
                    payCanBuy: !0
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                }));
            });
        }
    },
    payTrailGetPay: function(a) {
        var n = this, r = {
            orderId: a.id,
            payMethod: "WX_MINI_APP"
        };
        if (0 === a.cashTotal) n.payGetOrderStatusById(a.id, n); else {
            var i = {
                orderId: a.id,
                cardAmount: n.data.payPayments.cardPay.total
            }, d = this.data.payPassword;
            "" !== d && (i = e({}, i, {
                password: d
            })), t.prepareCardPay(i).then(function(e) {
                return n.setData({
                    "payOrder.cardDeductTotal": a.cardDeductTotal + i.cardAmount,
                    payBalance: 0,
                    "payPayments.cardPay.total": 0,
                    "payPayMethods[0].checked": !1,
                    payCardPayChoose: !1
                }), o.sleep(500), s.getBalancePaySign(r);
            }).then(function(a) {
                n.payWxPay(a, r, !0);
            }).catch(function(e) {
                20005 === e.code ? (n.setData({
                    payPassword: "",
                    payCanBuy: !0,
                    payFocus: !0,
                    payModal: !0
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                })) : -1001 === e.code ? (!0 === n.data.payPayMethods[0].checked && n.data.payPayments.cardPay.total > 0 && n.payOrderLock(a), 
                n.toggle("payMiddle")) : (n.setData({
                    payCanBuy: !0
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                }));
            });
        }
    },
    payToCardPay: function() {
        var a = this, e = this.data.payOrder, t = (a.data.payOrderType, a.data.payType);
        a.data.payPayMethods;
        "" !== this.data.payPassword ? (this.setData({
            payModal: !1
        }), a.data.payBalance >= e.cashTotal - e.cardDeductTotal ? a.payGetCardPay(e) : ("payTail" == t ? a.payTrailGetPay(e) : a.payGetPay(e), 
        a.setData({
            payCanBuy: !1
        }))) : (wx.showToast({
            title: "请输入储值卡密码~",
            icon: "none",
            duration: 2e3
        }), this.setData({
            payFocus: !0
        }));
    },
    payGetCardPay: function(a) {
        var o = this, n = {
            orderId: a.id,
            cardAmount: (+a.cashTotal - a.cardDeductTotal).toFixed(2)
        }, r = this.data.payPassword;
        "" !== r && (n = e({}, n, {
            password: r
        })), t.prepareCardPay(n).then(function(e) {
            o.payOrderLock(a), o.payGetOrderStatusById(a.id, o);
        }).catch(function(e) {
            -1001 === e.code ? (o.payOrderLock(a), o.toggle("payMiddle")) : (o.setData({
                payCanBuy: !0
            }), wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            }));
        });
    },
    payOrderLock: function(a) {
        var e = this;
        t.orderLock(a.id).then(function(a) {
            console.log(a);
        }).catch(function(t) {
            e.payOrderLock(a);
        });
    },
    payToPayTail: function() {
        var a = this, e = {
            orderId: this.data.payOrder.id,
            payMethod: "WX_MINI_APP"
        };
        s.getBalancePaySign(e).then(function(t) {
            console.log(t), a.payWxPay(t, e);
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    payToPaymentSuccess: function(a) {
        this.setData({
            payOrderPay: !0
        }), "group" !== this.data.payOrderType ? wx.redirectTo({
            url: "/pages/mallModule/pay/payment/payment?orderId=" + a + "&from=" + this.options.from
        }) : wx.redirectTo({
            url: "/pages/mallModule/fightGroup/groupPurchase/groupPurchase?orderId=" + a + "&from=orderPay"
        });
    },
    payWxPay: function(a, e, t) {
        var o = this, n = JSON.parse(a), r = JSON.parse(n.sign), s = "";
        "SWIFTPASS" === e.payMethod ? s = r.package : "WX_MINI_APP" === e.payMethod && (s = r.packageValue), 
        wx.requestPayment({
            timeStamp: r.timeStamp,
            nonceStr: r.nonceStr,
            package: s,
            signType: r.signType,
            paySign: r.paySign,
            success: function(a) {
                var t = {
                    id: e.orderId
                };
                o.payOrderLock(t), o.payGetOrderStatusById(e.orderId, o);
            },
            fail: function(a) {
                console.log("支付失败-----------------"), !0 === o.data.payPayMethods[1].checked ? o.setData({
                    payCanBuy: !0
                }) : o.setData({
                    payCanBuy: !1
                }), "requestPayment:fail cancel" === a.errMsg ? (wx.showToast({
                    title: "您取消了支付订单~",
                    icon: "none",
                    duration: 2e3
                }), o.setData({
                    payPassword: ""
                }), o.toggle("pay")) : wx.showToast({
                    title: a.errMsg,
                    icon: "none",
                    duration: 2e3
                }), "shopCart" === o.options.from && (o.setData({
                    payOrderCancel: !0
                }), wx.redirectTo({
                    url: "/pages/mallModule/order/orderDetails/orderDetails?orderId=" + e.orderId + "&orderFrom=shopCart"
                }));
            }
        });
    },
  toHome: function () {
    wx.reLaunch({
      url: '../../index/index/index',
    })
  },
    payHandleGetOrderStatusById: function(a, e, n) {
        var r = this;
        wx.showLoading({
            title: "支付中",
            mask: !0
        }), t.getOrderStatusById(a, e).then(function(t) {
            if (console.log("查询交易结果-------------"), console.log(t), e++, console.log(e), e > 14) return o.setHideLoading(!1), 
            wx.hideLoading(), void r.toggle("payMiddle");
            if ("PAID" === t.status || "WAITPAYBALANCE" === t.status || "PENDING" === t.status || "WAITSHIPPED" === t.status) o.setHideLoading(!1), 
            wx.hideLoading(), wx.showToast({
                title: "支付成功",
                icon: "none",
                duration: 2e3
            }), r.payToPaymentSuccess(a); else {
                var s = setTimeout(function() {
                    o.setHideLoading(!0), n.payHandleGetOrderStatusById(a, e, n);
                }, 1e3);
                r.setData({
                    orderTimeId: s
                });
            }
        }).catch(function(a) {
            wx.showToast({
                title: a.errMsg,
                icon: "none",
                duration: 2e3
            });
        });
    },
    payGetOrderStatusById: function(a, e) {
        this.payHandleGetOrderStatusById(a, 0, e);
    },
    payOnLoad: function(a) {
        wx.hideShareMenu(), this.setData({
            payFrom: a.from
        }), a.orderId && ("coupon" === a.from ? (console.log(a, "coupon"), this.payGetCouponOrderDetailsById(a.orderId)) : (console.log(a, "1"), 
        this.payGetOrderDataById(a.orderId)));
    },
    payOnUnload: function() {
        clearTimeout(this.data.orderTimeId);
        this.data.payOrderPay || this.data.payOrderCancel || "shopCart" === this.options.from && n.toShopcart("", !0);
    },
    payToggleMiddlePopup: function() {
        this.toggle("payMiddle"), this.setData({
            payOrderPay: !0
        }), wx.redirectTo({
            url: "../../order/order/order"
        });
    },
    getFocus: function() {
        this.setData({
            payFocus: !0
        });
    },
    toIndex: function() {
        n.toHome();
    }
});