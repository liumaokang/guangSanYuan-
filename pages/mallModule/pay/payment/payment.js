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
}, a = require("../../../../api/orderService.js"), o = require("../../../../api/advanceSellService.js"), s = require("../../../../api/raffleService.js"), i = require("../../../../api/teamBuyService.js"), n = require("../../../../api/productService.js"), r = require("../../../../utils/self.js"), d = require("../../../../utils/utils.js"), l = require("../../../../utils/address.js"), c = require("../../../../utils/navPage.js"),server = require('../../../../utils/server');
var app = getApp();





Page({
    data: {
        url:app.globalData.url,
        orderId: "",
        orderIds:"",
        showCode: !1,
        codeText: "",
        marginTop: "554rpx",
        successIconTop: "204rpx",
        type: "",
        orderType: "normal",
        deliveryTime: "",
        orderStatus: "",
        button: !1,
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
        group_goods:[],
        onUnload: !0,
        barcodeImageUrl: "",
        hasRaffleCoupon: !0,
        activeState: "start",
        raffleResult: "UNSTART",
        raffleActivityId: "",
        order_id:0,
        luckDrawImageBg: "background-image: url('https://app-1256684088.cos.ap-beijing.myqcloud.com/tinfide/newYearBg.png') !important;background-size: 100% 100%;"
    },
    _data: {
        hasUserDraw: !1
    },
    toIndex: function() {
        this.setData({
            button: !0
        }), c.toHome();
    },
    toOrderDetails: function() {
      
      var that=this;
      console.log(that.data.orderId)
       wx.navigateTo({
         url: '../../../mallModule/order/orderDetails/orderDetails?orderId=' + that.data.order_id,
       })
    },
    codeTextPartition: function(e) {
        return console.log(e), e = e.replace(/\s/g, "").replace(/(\w{4})(?=\w)/g, "$1 "), 
        console.log(e), e;
    },
    handleRaffleOutcome: function(e) {
        var t = this;
        console.log(e.detail.outcome);
        var a = e.detail.outcome;
        this.setData({
            raffleId: a
        });
        var o = this;
        if (e.detail.status) if (e.detail.raffleInfo) this.setData({
            raffleInfo: e.detail.raffleInfo
        }), this.toggleLuckDrawPopup(!0), this.toggleMiddlePopup(); else {
            var i = null;
            s.getById(a).then(function(e) {
                if (e && e.records.length > 0) for (var a = 0; a < e.records.length; a++) {
                    var o = e.records[a];
                    if (o.creatorId == e.creatorId) {
                        i = o;
                        break;
                    }
                }
                console.log(i), t.setData({
                    raffleInfo: i
                }), t.toggleLuckDrawPopup(!0), t.toggleMiddlePopup();
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        } else if (e.detail.error) {
            var n = e.detail.error;
            41004 === n.code || 41010 === n.code ? (o.setData({
                hasRaffleCoupon: !1
            }), this.toggleLuckDrawPopup(!0), this.toggleMiddlePopup()) : 41007 === n.code ? (o.setData({
                hasRaffleCoupon: !1,
                activeState: "end"
            }), this.toggleLuckDrawPopup(!0), this.toggleMiddlePopup()) : this.toggleLuckDrawPopup(!0);
        }
    },
    handleRaffleCash: function() {
        var e = this, t = this.data.raffleInfo.id;
        s.cash(t).then(function(t) {
            console.log(t), e.toggleMiddlePopup();
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    onLoad: function(e) {
     
        var t = this;
        // t.group();
        t.setData({
            order_id:e.order_id
        })
      server.getJSON("/Index/index", function (res) {
        var category_goods = res.data.result.hot;
        console.log(category_goods)
        t.setData({
          group_goods: category_goods,
        });
      });
      //   t.setData({
      //     orderIds: e.order_id
      //   })
      // console.log(e.order_id)
      //   wx.hideShareMenu(), console.log(e);
      //   var a = this;
      //   if (e && (a.setData({
      //       orderId: e.orderId,
      //       codeText: e.orderId
      //   }), a.getOrderDetails(e.orderId)), u.globalData.storeInfo) {
      //       var o = u.globalData.storeInfo.id;
      //       this.getRecommendingGoods(o);
      //   } else l.getLocation().then(function(e) {
      //       t.getRecommendingGoods(e.id);
      //   }).catch(function(e) {
      //       wx.showToast({
      //           title: e.message,
      //           icon: "none",
      //           duration: 2e3
      //       });
      //   });
      //   this.getSharePictures();
    },

      //  group:function(){
      //   var that=this
      //   server.getJSON('/index/retuenPay/wxtoken/'+wx.getStorageSync('wxtoken'),function(res){
      //       console.log('res拼团商品');
      //       console.log(res);
      //       that.setData({
      //           group_goods:res.data.group
      //       })

      //   })  
      // },

 go_pingtuan: function (e) { //去拼团
    var id = e.currentTarget.dataset.id;
    var goodsid=e.currentTarget.dataset.goodsid;
    // console.log(goodsid)
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&goods_type=0',
    })
  },










    getAdvanceSellDetails: function(e) {
        var t = this, a = e.advanceId, s = e.products, i = null;
        s.length > 0 && (i = s[0].productId), o.getByIds(a, i).then(function(e) {
            console.log(e), t.setData({
                deliveryTime: e.deliveryTime
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        this.data.onUnload && (this.data.button ? c.toHome() : "shopCart" === this.options.from ? c.toHome() : wx.navigateBack({
            delta: 2
        }));
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        var t = this, a = this.data.sharePictures;
        if ("button" === e.from) return t.handleRaffleCash(), t.setData({
            onUnload: !1
        }), {
            title: "优惠券大抽奖",
            path: "/pages/mallModule/activity/luckDraw/luckDraw?raffleId=" + t.data.raffleId + "&type=order",
            imageUrl: a,
            success: function(e) {
                e.errMsg;
            }
        };
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
    getRecommendingGoods: function(e) {
        var a = this;
        i.getStartedTeamBuyingByStoreId(e).then(function(o) {
            var s = [];
            if (o && o.length > 0) {
                for (var i = 0; i < o.length; i++) if (i < 16) {
                    var r = o[i], l = t({}, r, {
                        teamLeaderPrice: r.teamLeaderPrice ? r.teamLeaderPrice : r.teamMemberPrice,
                        isTeam: !0,
                        memberCount: d.numberConversion.numberToChinese(r.teamMemberCount)
                    });
                    n.getDetails(e, r.productId).then(function(e) {
                        var o = a.data.recommendingList;
                        if (e) for (var s = 0; s < o.length; s++) {
                            var i = o[s], n = t({}, i, {
                                productUrl: e.imageUrl,
                                sellPrice: e.sellPrice
                            });
                            i.productId && i.productId === e.id && (o[s] = n);
                        }
                        a.setData({
                            recommendingList: o
                        });
                    }), s.push(l);
                }
                a.setData({
                    recommendingList: s,
                    marginTop: "66rpx"
                });
            }
            if (s.length < 16) {
                var c = 16 - s.length;
                n.getStoreHotProduct(e).then(function(e) {
                    if (e && e.length > 0) {
                        for (var o = 0; o < e.length; o++) if (o < c) {
                            var s = e[o], i = t({}, s, {
                                isTeam: !1,
                                productUrl: s.imageUrl
                            });
                            a.data.recommendingList.push(i);
                        }
                        a.setData({
                            recommendingList: a.data.recommendingList
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
        this.setData({
            onUnload: !1
        });
        var t = e.currentTarget.dataset.productid, a = e.currentTarget.dataset.type;
        wx.redirectTo({
            url: "/pages/mallModule/goods/goodsDetail/goodsDetail?productId=" + t + "&type=" + a
        });
    },
    toHome: function () {
      wx.reLaunch({
        url: '/pages/mallModule/index/index/index',
      })
    },
    getUserClickDraw: function(e) {
        var t = this;
        if (e.detail.userDraw) if (this._data.hasUserDraw = !0, d.setHideLoading(!0), this.data.isActive) wx.showToast({
            title: "您已经在抽奖了~",
            icon: "none"
        }); else {
            this.setData({
                isActive: !0
            });
            var a = {
                orderId: t.data.orderId,
                activityId: t.data.raffleActivityId,
                wxaOpenid: u.globalData.userInfo.wxaUser.openId
            };
            u.globalData.userInfo && function(e) {
                s.create(e).then(function(e) {
                    t.handleDraw(e);
                }).catch(function(e) {
                    d.setHideLoading(!1), t.setData({
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
            wxaOpenid: u.globalData.userInfo.wxaUser.openId
        };
        t.setData({
            raffleId: e
        }), s.draw(a).then(function(e) {
            d.setHideLoading(!1);
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
            d.setHideLoading(!1), t.setData({
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
    getSharePictures: function() {
        var e = this;
        d.getSharePictures("RAFFLE_ACTIVITY").then(function(t) {
            e.setData({
                sharePictures: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getBarcodeCode: function(e) {
        var t = this;
        this.ctxCanvas || (this.ctxCanvas = wx.createCanvasContext("barcode")), r.barcode(this.ctxCanvas, e, 535, 130), 
        setTimeout(function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 535,
                height: 130,
                destWidth: 535,
                destHeight: 130,
                canvasId: "barcode",
                success: function(e) {
                    t.setData({
                        barcodeImageUrl: e.tempFilePath
                    });
                }
            });
        }, 500), this.setData({
            codeText: this.codeTextPartition(e)
        });
    },
    getOrderDetails: function(e) {
        var t = this, o = this;
        o.business = "", a.getDetailsById(e).then(function(e) {
            if (o.business = e.business, "ADVANCE_SELL" == e.business && t.setData({
                orderType: "advanceSell"
            }), "SELF" === e.shipmentType && "PENDING" === e.status) if (null != e.teamId && null != e.teamLeaderRecordId) o.setData({
                showCode: !1,
                orderStatus: e.status
            }); else if (o.setData({
                successIconTop: "75rpx",
                orderStatus: e.status
            }), 0 == o.data.recommendingList.length && "66rpx" !== o.data.marginTop && o.setData({
                marginTop: "420rpx"
            }), "ADVANCE_SELL" === e.business && null !== e.advanceId && "" !== e.advanceId || "CATERING" === e.business) {
                var a = new Date().getTime();
                if (/^([1-2]{1}\d{3})\-(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\-(([0]{1}[1-9]{1})|([1-2]{1}\d{1})|([3]{1}[0-1]{1}))\s(([0-1]{1}\d{1})|([2]{1}[0-3]))\:([0-5]{1}\d{1}):([0-5]{1}\d{1})\~([1-2]{1}\d{3})\-(([0]{1}[1-9]{1})|([1]{1}[0-2]{1}))\-(([0]{1}[1-9]{1})|([1-2]{1}\d{1})|([3]{1}[0-1]{1}))\s(([0-1]{1}\d{1})|([2]{1}[0-3]))\:([0-5]{1}\d{1}):([0-5]{1}\d{1})$/.test(e.selfTimeScope)) {
                    var i = e.selfTimeScope.split("~")[0].replace(/-/g, "/");
                    a >= new Date(i).getTime() ? o.getBarcodeCode(e.ladingCode) : o.setData({
                        showCode: !1,
                        type: "SELF"
                    });
                } else o.setData({
                    showCode: !0
                }), o.getBarcodeCode(e.ladingCode);
            } else o.setData({
                showCode: !0
            }), o.getBarcodeCode(e.ladingCode); else "SELF" === e.shipmentType && "WAITPAYBALANCE" === e.status ? (o.setData({
                type: "SELF",
                orderStatus: e.status
            }), 0 == o.data.recommendingList.length && o.setData({
                marginTop: "160rpx"
            }), o.getAdvanceSellDetails(e)) : "EXPRESS" === e.shipmentType && "WAITPAYBALANCE" === e.status ? (o.setData({
                type: "EXPRESS",
                orderStatus: e.status
            }), 0 == o.data.recommendingList.length && o.setData({
                marginTop: "160rpx"
            }), o.getAdvanceSellDetails(e)) : "EXPRESS" === e.shipmentType && "ADVANCE_SELL" === e.business && "PAID" === e.status ? (o.setData({
                type: "EXPRESS",
                orderStatus: e.status
            }), 0 == o.data.recommendingList.length && o.setData({
                marginTop: "160rpx"
            }), o.getAdvanceSellDetails(e)) : o.setData({
                orderStatus: e.status
            });
            return s.getByType("ORDER_RAFFLE");
        }).then(function(e) {
            "WAITPAYBALANCE" !== o.data.orderStatus && "SCORE" !== o.business && e && (o.setData({
                raffleActivityId: e.id
            }), u.globalData.userInfo && u.globalData.userInfo.member && o.toggleLuckDrawPopup(!0));
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});