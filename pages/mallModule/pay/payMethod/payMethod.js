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
}, t = require("../../../../api/orderService.js"), o = require("../../../../api/memberService.js"), d = require("../../../../api/advanceSellService.js"), n = (require("../../../../api/redPacketService.js"), 
require("../../../../api/couponService.js")), r = require("../../../../utils/utils.js"), s = require("../../../../utils/navPage.js");

getApp();

Page({
    data: {
        currentItem: -1,
        balance: 0,
        order: {
            id: "",
            cashTotal: 0
        },
        password: "",
        type: "normal",
        orderType: "normal",
        from: "shopCart",
        modal: !1,
        focus: !1,
        orderPay: !1,
        orderCancel: !1,
        canBuy: !1,
        cardPay: !1,
        cardAmount: 0,
        cardPayChoose: !0,
        payments: {
            cardPay: {
                total: 0
            },
            wxPay: {
                total: 0
            }
        },
        payMethods: [ {
            id: 0,
            name: "CARDPAY",
            value: "余额支付",
            imageUrl: "http://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/iconCardPay.png",
            checked: !1,
            isShow: !0
        }, {
            id: 1,
            name: "WXPAY",
            value: "微信支付",
            imageUrl: "http://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/iconWexinPay.png",
            checked: !1,
            isShow: !0
        } ],
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        orderTimeId: 0
    },
    handleResetPassword: function() {
        s.toCheckMobile();
    },
    handlePassword: function(a) {
        a.detail.value && this.setData({
            password: a.detail.value
        });
    },
    clickBlank: function() {
        this.setData({
            modal: !1,
            canBuy: !0
        });
    },
    clickBody: function() {},
    onPayClick: function(a) {
        var e = this, t = (a.currentTarget.dataset.id, a.currentTarget.dataset.name), o = e.data.payMethods, d = e.data.payments, n = e.data.type;
        if ("advanceSell" !== e.data.orderType) "CARDPAY" === t ? this.data.cardPayChoose && (o[0].checked ? (this.setData({
            "payments.cardPay.total": 0,
            "payMethods[0].checked": !1,
            password: ""
        }), o[1].checked || this.setData({
            canBuy: !1
        })) : this.data.balance > 0 ? this.data.balance > e.data.order.cashTotal ? this.setData({
            "payments.cardPay.total": e.data.order.cashTotal,
            "payMethods[0].checked": !0,
            canBuy: !0
        }) : this.setData({
            "payments.cardPay.total": this.data.balance,
            "payMethods[0].checked": !0
        }) : (e.setData({
            "payments.cardPay.total": 0,
            "payMethods[0].checked": !1,
            password: ""
        }), o[1].checked || e.setData({
            canBuy: !1
        }))) : o[1].checked ? o[0].checked && e.data.balance >= e.data.order.cashTotal ? e.setData({
            "payMethods[1].checked": !1,
            canBuy: !0
        }) : e.setData({
            "payMethods[1].checked": !1,
            canBuy: !1
        }) : e.setData({
            "payMethods[1].checked": !0,
            canBuy: !0
        }); else {
            var r = !1;
            o.forEach(function(a) {
                "CARDPAY" === t ? a.name == t ? a.checked ? (a.checked = !a.checked, r = !1) : e.data.balance >= e.data.order.cashTotal ? (d.cardPay.total = "payTail" !== n ? e.data.order.cashTotal : e.data.order.balanceTotal, 
                a.checked = !a.checked, r = !0) : wx.showToast({
                    title: "储值余额不够支付此订单，请选择微信支付~",
                    icon: "none",
                    duration: 2e3
                }) : a.checked = !1 : a.name == t ? (a.checked = !a.checked, a.checked && (r = !0)) : a.checked = !1;
            }), e.setData({
                payMethods: o,
                canBuy: r,
                payments: d
            });
        }
    },
    getOrderDataById: function(a) {
        var d = this, n = this;
        t.getDetailsById(a).then(function(a) {
            var t = e({}, a);
            return d.setData({
                order: t
            }), a.payments && a.payments.length > 0 && a.payments.forEach(function(a) {
                "CARDPAY" !== a.payMethod || "CREATED" !== a.status && "PAID" !== a.status || n.setData({
                    "payments.cardPay.total": a.total,
                    cardAmount: a.total,
                    "payMethods[0].checked": !1,
                    "payMethods[0].isShow": !1,
                    cardPayChoose: !1
                });
            }), "ADVANCE_SELL" == a.business && d.setData({
                orderType: "advanceSell",
                "payMethods[0].checked": !1,
                "payMethods[0].isShow": !1
            }), a.teamId && d.setData({
                orderType: "group",
                groupInfo: {
                    teamId: a.teamId,
                    teamLeaderRecordId: ""
                }
            }), 0 === a.cashTotal && n.getOrderStatusById(a.id, n), o.getMbrBalance();
        }).then(function(a) {
            var e = n.data.order;
            d.setData({
                balance: a
            }), a > 0 && d.data.cardPayChoose && "payTail" !== n.data.type && "advanceSell" !== n.data.orderType ? a >= e.cashTotal ? n.setData({
                "payMethods[0].checked": !0,
                "payments.cardPay.total": e.cashTotal,
                "payMethods[1].checked": !1,
                canBuy: !0
            }) : n.setData({
                "payMethods[0].checked": !0,
                "payments.cardPay.total": a,
                currentItem: 1,
                "payMethods[1].checked": !0,
                canBuy: !0
            }) : n.setData({
                "payMethods[1].checked": !0,
                canBuy: !0
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getCouponOrderDetailsById: function(a) {
        var e = this, t = this;
        n.getCouponOrderById(a).then(function(a) {
            if (a) {
                var t = {
                    cashTotal: a.price,
                    id: a.id
                };
                e.setData({
                    order: t
                });
            }
            return o.getMbrBalance();
        }).then(function(a) {
            var o = t.data.order;
            e.setData({
                balance: a
            }), a > 0 ? a >= o.cashTotal ? t.setData({
                "payMethods[0].checked": !0,
                "payments.cardPay.total": o.cashTotal,
                canBuy: !0
            }) : t.setData({
                "payMethods[0].checked": !0,
                "payments.cardPay.total": a,
                currentItem: 1,
                "payMethods[1].checked": !0,
                canBuy: !0
            }) : t.setData({
                "payMethods[1].checked": !0,
                canBuy: !0
            });
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toPayment: function() {
        var a = this, e = this.data.order, t = a.data.type, o = !1, d = !1;
        a.data.payMethods.forEach(function(a) {
            "CARDPAY" == a.name && a.checked ? o = !0 : "WXPAY" == a.name && a.checked && (d = !0);
        }), this.data.canBuy ? (this.setData({
            canBuy: !1
        }), o ? a.setData({
            modal: !0
        }) : d ? "payTail" === t ? a.toPayTail(e) : a.getWXPay(e) : (a.setData({
            canBuy: !1
        }), wx.showToast({
            title: "请选择支付方式~",
            icon: "none",
            duration: 2e3
        }))) : wx.showToast({
            title: "请选择支付方式~",
            icon: "none",
            duration: 2e3
        });
    },
    getWXPay: function(a) {
        var e = this, o = {
            orderId: a.id,
            payMethod: "WX_MINI_APP"
        };
        0 === a.cashTotal ? e.getOrderStatusById(a.id, e) : t.getPaySign(o).then(function(a) {
            e.wxPay(a, o);
        }).catch(function(t) {
            -1001 === t.code ? (!0 === e.data.payMethods[0].checked && e.data.payments.cardPay.total > 0 && e.orderLock(a), 
            e.toggle("middle")) : (e.setData({
                canBuy: !0
            }), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }));
        });
    },
    getPay: function(a) {
        var o = this, d = {
            orderId: a.id,
            payMethod: "WX_MINI_APP"
        };
        if (0 === a.cashTotal) o.getOrderStatusById(a.id, o); else {
            var n = {
                orderId: a.id,
                cardAmount: o.data.payments.cardPay.total
            }, r = this.data.password;
            "" !== r && (n = e({}, n, {
                password: r
            })), t.prepareCardPay(n).then(function(a) {
                return console.log(a), o.setData({
                    cardAmount: o.data.payments.cardPay.total,
                    cardPayChoose: !1
                }), t.getPaySign(d);
            }).then(function(a) {
                o.wxPay(a, d);
            }).catch(function(e) {
                20005 === e.code ? (o.setData({
                    password: "",
                    canBuy: !0,
                    focus: !0,
                    modal: !0
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                })) : -1001 === e.code ? (!0 === o.data.payMethods[0].checked && o.data.payments.cardPay.total > 0 && o.orderLock(a), 
                o.toggle("middle")) : (o.setData({
                    canBuy: !0
                }), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                }));
            });
        }
    },
    toCardPay: function() {
        var a = this, e = this.data.order, t = (a.data.orderType, a.data.type), o = !1, d = !1;
        a.data.payMethods.forEach(function(a) {
            "CARDPAY" == a.name && a.checked ? o = !0 : "WXPAY" == a.name && a.checked && (d = !0);
        }), "" !== this.data.password ? (this.setData({
            modal: !1
        }), "payTail" !== t ? a.data.balance >= e.cashTotal ? a.getCardPay(e) : d ? a.data.payments.cardPay.total > 0 && 0 === a.data.cardAmount ? a.getPay(e) : a.getWXPay(e) : (a.setData({
            canBuy: !1
        }), wx.showToast({
            title: "请选择支付方式~",
            icon: "none",
            duration: 2e3
        })) : a.data.balance >= e.balanceTotal ? a.getCardPay(e) : (a.setData({
            canBuy: !1
        }), wx.showToast({
            title: "储值余额不够支付此订单，请选择微信支付~",
            icon: "none",
            duration: 2e3
        }))) : (wx.showToast({
            title: "请输入储值卡密码~",
            icon: "none",
            duration: 2e3
        }), this.setData({
            focus: !0
        }));
    },
    getCardPay: function(a) {
        var o = this, d = {
            orderId: a.id
        }, n = this.data.password;
        "" !== n && (d = e({}, d, {
            password: n
        })), t.cardPay(d).then(function(e) {
            o.getOrderStatusById(a.id, o), o.orderLock(a);
        }).catch(function(e) {
            -1001 === e.code ? (o.orderLock(a), o.toggle("middle")) : (o.setData({
                canBuy: !0
            }), wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            }));
        });
    },
    orderLock: function(a) {
        t.orderLock(a.id).then(function(a) {
            console.log(a);
        });
    },
    toPayTail: function(a) {
        var e = this, t = {
            orderId: this.data.order.id,
            payMethod: "WX_MINI_APP"
        };
        d.getBalancePaySign(t).then(function(a) {
            console.log(a), e.wxPay(a, t);
        }).catch(function(a) {
            wx.showToast({
                title: a.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toPaymentSuccess: function(a) {
        this.setData({
            orderPay: !0
        }), "group" !== this.data.orderType ? wx.redirectTo({
            url: "/pages/mallModule/pay/payment/payment?orderId=" + a + "&from=" + this.options.from
        }) : wx.redirectTo({
            url: "/pages/mallModule/fightGroup/groupPurchase/groupPurchase?orderId=" + a + "&from=orderPay"
        });
    },
    wxPay: function(a, e) {
        var t = this, o = JSON.parse(a), d = JSON.parse(o.sign), n = "";
        "SWIFTPASS" === e.payMethod ? n = d.package : "WX_MINI_APP" === e.payMethod && (n = d.packageValue), 
        wx.requestPayment({
            timeStamp: d.timeStamp,
            nonceStr: d.nonceStr,
            package: n,
            signType: d.signType,
            paySign: d.paySign,
            success: function(a) {
                t.getOrderStatusById(e.orderId, t);
                var o = {
                    id: e.orderId
                };
                t.orderLock(o);
            },
            fail: function(a) {
                console.log("支付失败-----------------"), !0 === t.data.payMethods[1].checked ? t.setData({
                    canBuy: !0
                }) : t.setData({
                    canBuy: !1
                }), "requestPayment:fail cancel" === a.errMsg ? (wx.showToast({
                    title: "您取消了支付订单~",
                    icon: "none",
                    duration: 2e3
                }), t.setData({
                    password: ""
                })) : wx.showToast({
                    title: a.errMsg,
                    icon: "none",
                    duration: 2e3
                }), "shopCart" === t.options.from && (t.setData({
                    orderCancel: !0
                }), wx.redirectTo({
                    url: "/pages/mallModule/order/orderDetails/orderDetails?orderId=" + e.orderId + "&orderFrom=shopCart"
                }));
            }
        });
    },
    handleGetOrderStatusById: function(a, e, o) {
        var d = this;
        wx.showLoading({
            title: "支付中",
            mask: !0
        }), t.getOrderStatusById(a, amuont).then(function(t) {
            if (console.log("查询交易结果-------------"), console.log(t), e++, console.log(e), e > 40) return r.setHideLoading(!1), 
            wx.hideLoading(), void d.toggle("middle");
            if ("PAID" === t.status || "WAITPAYBALANCE" === t.status || "PENDING" === t.status) r.setHideLoading(!1), 
            wx.hideLoading(), wx.showToast({
                title: "支付成功",
                icon: "none",
                duration: 2e3
            }), d.toPaymentSuccess(a); else {
                var n = setTimeout(function() {
                    r.setHideLoading(!0), o.handleGetOrderStatusById(a, e, o);
                }, 1e3);
                d.setData({
                    orderTimeId: n
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
    getOrderStatusById: function(a, e) {
        this.handleGetOrderStatusById(a, 0, e);
    },
    onLoad: function(a) {
        wx.hideShareMenu(), console.log(a), this.setData({
            type: a.type,
            from: a.from
        }), a.orderId && ("coupon" === a.from ? (console.log(a, "coupon"), this.getCouponOrderDetailsById(a.orderId)) : (console.log(a, "1"), 
        this.getOrderDataById(a.orderId)));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearTimeout(this.data.orderTimeId);
        var a = this;
        if (!this.data.orderPay && !this.data.orderCancel && "shopCart" === this.options.from) {
            var e = "?orderId=" + a.data.order.id + "&orderFrom=shopCart";
            s.toOrderDetails(e);
        }
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    toggleMiddlePopup: function() {
        this.toggle("middle"), this.setData({
            orderPay: !0
        }), wx.redirectTo({
            url: "../../order/order/order"
        });
    },
    toggle: function(e) {
        this.setData(a({}, "show." + e, !this.data.show[e]));
    }
});