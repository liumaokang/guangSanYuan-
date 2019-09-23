var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (e[r] = a[r]);
    }
    return e;
}, t = require("../../../../api/orderService.js"), a = require("../../../../api/advanceSellService.js"), r = require("../../../../api/teamBuyService.js"), n = require("../../../../utils/utils.js"), o = require("../../../../utils/navPage.js"), s = getApp();
var server = require("../../../../utils/server.js");
Page({
    data: {
        imgurl: imgurl,
        url:url,
        tabType: [ "全部", "待支付", "待自提", "待评价", "已退款" ],
        tabSelected: 0, //五种订单状态默认全部
        allOrders: [],
        unpayedOrders: [],
        ungroupOrders: [],
        untakeOrders: [],
        payBack: [],
        sendPrice:"免运费",
        unPayedTailOrders: [],
        unEvaluateOrders: [],
        swiperHeight: 0,
        serviceTel: "",
        type: "normal",
        pageIndex: 1,
        pageSize: 10,
        pageCount: 1,
        allOrdersList: [],
        noMore: !1,
        loading: !1,
        homeBack: !1,
        order_status: ''
    },
    onLoad: function(e) {
      this.setData({
        sendPrice:wx.getStorageSync('sendPrice')
      })
      var that = this;
      var cateId = e.selected;
      console.log(cateId)
      if (cateId == 1) {
        that.setData({
          order_status: 'WAITPAY',
          tabSelected: 1
        })
      } else if (cateId == 2) {
        that.setData({
          order_status: 'subscribe', // 'WAITRECEIVE',
          tabSelected: 2
        })
      } else if (cateId == 3) {
        that.setData({
          order_status: 'WAITCCOMMENT', // 'WAITRECEIVE',
          tabSelected: 3
        })
      } else if (cateId == 4) {
        that.setData({
          order_status: 'FINISH',
          tabSelected: 4
        })
      }
      that.all_order();
      
        wx.hideShareMenu(), this.setData({
            serviceTel: s.globalData.servicePhone
        }), //this.getMemberUserInfo(),
         e.selected && this.setData({
            tabSelected: parseInt(e.selected)
        }), 1 === getCurrentPages().length && this.setData({
            homeBack: !0
        }), this.getOrderData(this.data.tabSelected);
    },
    onReady: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t), e.setData({
                    swiperHeight: t.windowHeight + 10
                });
            }
        });
    },
    all_order: function () {
      var that = this;
      wx.request({
        url: url + '/index.php/wxapi/Order/order_list/wxtoken/' + wx.getStorageSync('wxtoken') + '/type/' + that.data.order_status,
        success(res) {
          var goods_list = res.data.list;
          if (goods_list.length != 0) {
            var tabSelected = that.data.tabSelected;
            if (tabSelected == 0) {
              that.setData({
                allOrders: goods_list
              })
            };
            if (tabSelected == 1) {
              that.setData({
                unpayedOrders: goods_list
              })
            };
            if (tabSelected == 2) {
              that.setData({
                untakeOrders: goods_list
              })
            };
            if (tabSelected == 3) {
              that.setData({
                unPayedTailOrders: goods_list
              })
            };
            if (tabSelected == 4) {
              that.setData({
                payBack: goods_list
              })
            };

          }
        }
      })
    },
    onShow: function() {this.all_order()},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            noMore: !1,
            pageIndex: 1
        }), this.getOrderData(this.data.tabSelected), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {
        this.data.noMore ? this.setData({
            loading: !1
        }) : this.loadOrderList();
    },
    onShareAppMessage: function(e) {
        var t = this.data.allOrders, a = null;
        if ("button" === e.from) {
            var r = e.target.dataset.teamid, n = e.target.dataset.teamleaderrecordid, o = e.target.dataset.id;
            return t.length > 0 && t.forEach(function(e) {
                e.orderNum === o && (null != e.sharePicture && "" != e.sharePicture ? a = e.sharePicture : e.details.length > 0 && (a = e.details[0].img));
            }), s.globalData.userInfo && s.globalData.userInfo.member ? {
                title: "拼团有优惠",
                path: "/pages/mallModule/fightGroup/groupPurchase/groupPurchase?teamBuyId=" + r + "&teamLeaderRecordId=" + n + "&mobile=" + s.globalData.userInfo.member.id,
                imageUrl: a,
                success: function(e) {
                    wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            } : {
                title: "鲜丰水果，新鲜才好吃！",
                path: "/pages/mallModule/index/index/index",
                imageUrl: a,
                success: function(e) {
                    wx.showShareMenu({
                        withShareTicket: !0
                    });
                }
            };
        }
        return {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/index/index/index",
            imageUrl: a,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    checkAuth: function() {
        try {
            return !!s.globalData.userInfo;
        } catch (e) {}
    },
    // getMemberUserInfo: function() {
    //     s.globalData.userInfo || wx.showToast({
    //         title: "您还未授权，请登陆授权",
    //         icon: "none",
    //         duration: 2e3
    //     });
    // },
    switchTab: function(e) { //五种订单状态切换
        var that = this;
        this.setData({
            tabSelected: e.currentTarget.dataset.idx,
            loading: !1,
            noMore: !1
        }), this.checkAuth() && this.getOrderData(e.currentTarget.dataset.idx);
      var tabSelected = e.currentTarget.dataset.idx;
      if (tabSelected == 0) {
        that.setData({
          order_status: ''
        })
      } else if (tabSelected == 1) {
        that.setData({
          order_status: 'WAITPAY'
        })
      } else if (tabSelected == 2) {
        that.setData({
          order_status: 'subscribe'
        })
      } else if (tabSelected == 3) {
        that.setData({
          order_status: 'WAITCCOMMENT'
        })
      } else if (tabSelected == 4) {
        that.setData({
          order_status: 'FINISH'
        })
      }

      wx.request({
        url: url + '/index.php/wxapi/Order/order_list/wxtoken/' + wx.getStorageSync('wxtoken') + '/type/' + that.data.order_status,
        success(res) {
          var goods_list = res.data.list;
          if (goods_list.length != 0) {
            var tabSelected = that.data.tabSelected;
            if (tabSelected == 0) {
              that.setData({
                allOrders: goods_list
              })
            };
            if (tabSelected == 1) {
              that.setData({
                unpayedOrders: goods_list
              })
            };
            if (tabSelected == 2) {
              that.setData({
                untakeOrders: goods_list
              })
            };
            if (tabSelected == 3) {
              that.setData({
                unEvaluateOrders: goods_list
              })
            };
            if (tabSelected == 4) {
              that.setData({
                payBack: goods_list
              })
            };

          }
        }
      })

    },
    getOrderData: function(e) {
        var t = this, a = this;
        a.setData({
            pageIndex: 1,
            loading: !1
        });
        var r = a.queryOrderList(1, 10);
        Promise.all([ r ]).then(function(r) {
            0 == r[0].length && t.setData({
                noMore: !0
            });
            var n = e;
            "0" == n ? a.setData({
                allOrders: r[0]
            }) : "1" == n ? a.setData({
                unpayedOrders: r[0]
            }) : "4" == n ? a.setData({
                payBack: r[0]
            }) : "2" == n ? a.setData({
                untakeOrders: r[0]
            }) : "3" == n ? a.setData({
                unEvaluateOrders: r[0]
            }) : "5" == n && a.setData({
                unPayedTailOrders: r[0]
            });
        });
    },
    queryOrderList: function(a, n) {
        var o = this, d = this, i = d.data.tabSelected, u = "";
        "0" == i ? u = "" : "1" == i ? u = "CREATED" : "4" == i ? u = "REJECTED" : "2" == i ? u = "PENDING" : "3" == i ? u = "RECEIVED" : "5" == i && (u = "WAITPAYBALANCE");
        var c = u, l = {
            page: a,
            pageSize: n,
            orderStatusEquals: u,
            businessEquals: "RETAIL_CATERING"
        };
        "" !== l.orderStatusEquals && (l = e({}, l, {
            refund: !0
        })), "REJECTED" === l.orderStatusEquals && delete l.refund;
        var h = [];
        return s.globalData.userInfo && s.globalData.userInfo.member && (h = t.query(l).then(function(t) {
            var a = [];
            return t.records.forEach(function(t) {
                if ("SCORE" !== t.business) {
                    var n = t.status, s = {
                        type: "",
                        orderNum: t.id,
                        status: o.handleOrderStatus(t.status),
                        business: t.business,
                        storeName: t.storeName,
                        storeId: t.storeId,
                        shipmentAmount: t.shipmentAmount ? t.shipmentAmount : 0,
                        details: [],
                        buyNumber: t.buyNumber ? t.buyNumber : 0,
                        totalPrice: t.cashTotal,
                        teamId: t.teamId,
                        teamLeaderRecordId: t.teamLeaderRecordId
                    };
                    t.images ? t.images.forEach(function(e) {
                        s.count += parseInt(e.goodsNum), s.details.push({
                            id: e.productId,
                            img: e.url,
                            goodsName: e.goodsName,
                            goodsNum: e.productNum
                        });
                    }) : s.count = 0, t.advanceId && (s = e({}, s, {
                        advanceId: t.advanceId
                    })), "" != t.teamId && null != t.teamId ? s.type = "拼团" : s.type = "", !1 === t.canRefund && "REJECTED" !== n && "CANCELED" !== n && (s.status = "退款中"), 
                    "" === c ? "PAID" === n && "" != t.teamId && null != t.teamId && !0 === t.canRefund ? (s.status = "待拼团", 
                    a.push(s), r.getDetails(t.teamId, t.teamLeaderRecordId).then(function(e) {
                        var t = e.openTeamTime, a = new Date(t.replace(/-/g, "/")).getTime(), r = parseInt(a + 1e3 * e.duration), n = new Date().getTime(), o = "", i = s.status;
                        e.teamMemberCount === e.joinMemberCount ? (o = "success", i = "已成团") : n > r ? (o = "overdue", 
                        i = "退款中") : o = "normal";
                        var u = null;
                        e.sharePicture && (u = e.sharePicture);
                        var c = d.data.allOrders;
                        console.log(c), c.forEach(function(t, a) {
                            t.teamLeaderRecordId === e.teamLeaderRecordId && (c[a].teamStatus = o, c[a].status = i, 
                            null != u && (c[a].sharePicture = u));
                        }), d.setData({
                            allOrders: c
                        });
                    })) : a.push(s) : "CREATED" === c ? a.push(s) : "PAID" === c && "" != t.teamId && null != t.teamId && !0 === t.canRefund ? (s.status = "待拼团", 
                    a.push(s)) : "PENDING" === c && !0 === t.canRefund ? a.push(s) : "REJECTED" === c ? a.push(s) : "RECEIVED" === c && !0 === t.canRefund ? a.push(s) : "WAITPAYBALANCE" === c && !0 === t.canRefund && a.push(s);
                }
            }), a;
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        })), h;
    },
    handleOrderStatus: function(e) {
        return "CREATED" === e ? "订单待支付" : "PAID" === e ? "已付款" : "SHIPPED" === e ? "配送中" : "RECEIVED" === e ? "订单待评价" : "FINISHED" === e ? "已完成" : "CANCELED" === e ? "已取消" : "REJECTED" === e ? "订单已退款" : "RETURNING" === e ? "退换货中 " : "PENDING" === e ? "订单待自提" : "WAITSHIPPED" === e ? "待发货" : "WAITPAYBALANCE" === e ? "待付尾款" : "状态异常";
    },
    dele:function(arra){

    },
    toCancel: function(e) { //取消订单
        var a = this;
        var id = e.currentTarget.dataset.id;
        var that=this;
        wx.showModal({
            title: "提示",
            content: "确认要取消该订单？",
            success: function(e) {
              if (e.confirm) {
                wx.request({
                  url: imgurl + '/Order/cancel_order/id/' + id + '/wxtoken/' + wx.getStorageSync('wxtoken'),
                  success(res) {
                    if (res.data.status == 1) {
                      wx.showToast({
                        title: '已取消',
                        icon: 'none',
                         duration: 2000
                      })
                      that.all_order();
                    }

                  }
                })
              }
                // e.confirm ? t.cancel(r).then(function(e) {
                //     a.getOrderData(a.data.tabSelected);
                // }).catch(function(e) {
                //     wx.showToast({
                //         title: e.message,
                //         icon: "none",
                //         duration: 2e3
                //     });
                // }) : e.cancel;
            }
        });
    },
    toPay: function (e) { //立即支付
        var t = this;
        var a = e.currentTarget.dataset.id;
        t.toPayMethod(a, "normal");
    },
    toPayMethod: function(e, t) {
        var a = "?orderId=" + e + "&from=order&type=" + t;
        o.toPayMethod(a);
    },
    toPayTail: function(e) {
        var t = this;
        var r = e.currentTarget.dataset.id, o = t.data.unPayedTailOrders;
        console.log(t.data.tabSelected), 0 === t.data.tabSelected && (o = t.data.allOrders);
        var s = null, d = null;
        o.forEach(function(e) {
            e.orderNum === r && (console.log(e), s = e.advanceId, d = e.details[0].id);
        }), a.getByIds(s, d).then(function(e) {
            var a = new Date(), o = new Date(n.formatTime(a)).getTime(), s = new Date(e.balanceStartTime.replace(/-/g, "/")).getTime(), d = new Date(e.balanceEndTime.replace(/-/g, "/")).getTime(), i = e.balanceStartTime.split(" ")[0].split("-"), u = i[0] + "年" + i[1] + "月" + i[2] + "日", c = e.balanceEndTime.split(" ")[0].split("-"), l = c[0] + "年" + c[1] + "月" + c[2] + "日";
            o < s ? wx.showToast({
                title: "请于" + u + "至" + l + "期间支付尾款",
                icon: "none",
                duration: 2e3
            }) : s <= o && o <= d ? t.toPayMethod(r, "payTail") : wx.showToast({
                title: "很抱歉，您的订单已经超过支付尾款的最后期限了~",
                icon: "none",
                duration: 2e3
            });
        });
    },
    toOrderDetails: function(e) {
        var t = "?orderId=" + e.currentTarget.dataset.id;
        o.toOrderDetails(t);
    },
  // 确认收货
  makeSure: function (e) {
    var that = this;
    var order_id = e.currentTarget.dataset.id;
    server.getJSON('/Order/order_confirm/wxtoken/' + wx.getStorageSync('wxtoken') + '/id/' + order_id, function (res) {
      if (res.data.status == 1) {
        that.statusOrderList();
      } else {
             wx.showToast({
                        title: '已确认',
                        icon: 'none',
                        duration: 2000
                      })
         that.all_order();
      }
    })
  },
    handleConfirmReceipt: function(e) {
        var a = this, r = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "请确认已经收到商品？",
            success: function(e) {
                e.confirm ? t.confirm(r).then(function(e) {
                    a.getOrderData(a.data.tabSelected);
                }) : e.cancel;
            }
        });
    },
    
    toRefundGoods: function(e) { //申请退款
      var t = "?orderId=" + e.currentTarget.dataset.orderid + "&&order_id=" + e.currentTarget.dataset.id;
        o.toRefund(t);
    },
    // toEvaluate: function(e) { //评价订单
    //   var t = "?orderId=" + e.currentTarget.dataset.orderid + "&&order_id=" + e.currentTarget.dataset.id;
    //     o.toEvaluate(t);
    // },
    toHome: function() {
        wx.reLaunch({
          url: '../../index/index/index',
        })
    },
    pingjia:function(e){
      var goodsid=e.currentTarget.dataset.id;
      var order_sn = e.currentTarget.dataset.order_sn;
      var goods_sn = e.currentTarget.dataset.goods_sn;
      var rec_id = e.currentTarget.dataset.recid;
      var orderid = e.currentTarget.dataset.id;
      var goodsimg = e.currentTarget.dataset.goods_img;
      wx.navigateTo({
        url: '/pages/mallModule/order/evaluate/evaluate?order_sn=' + order_sn + '&goods_sn=' + goods_sn + '&rec_id=' + rec_id + '&orderId=' + orderid + '&img=' + goodsimg+'&goodsid='+goodsid,
      })    
    },
    toService: function(e) {
        e.currentTarget.dataset.id;
        var t = this.data.serviceTel;
        wx.showModal({
            title: "提示",
            content: "确认要拨打此电话" + t + " ？",
            success: function(e) {
                e.confirm ? wx.makePhoneCall({
                    phoneNumber: t
                }) : e.cancel;
            }
        });
    },
    getWaitPayedTail: function() {
        var e = this, a = {
            page: 1,
            pageSize: 0,
            orderStatusEquals: "WAITPAYBALANCE"
        };
        t.query(a).then(function(t) {
            var a = [];
            t.records.forEach(function(t) {
                t.status;
                var r = {
                    type: "",
                    orderNum: t.id,
                    status: e.handleOrderStatus(t.status),
                    storeName: t.storeName,
                    storeId: t.storeId,
                    shipmentAmount: t.shipmentAmount ? t.shipmentAmount : 0,
                    details: [],
                    buyNumber: t.buyNumber ? t.buyNumber : 0,
                    totalPrice: t.cashTotal,
                    teamId: t.teamId,
                    teamLeaderRecordId: t.teamLeaderRecordId,
                    advanceId: t.advanceId
                };
                t.images ? t.images.forEach(function(e) {
                    r.count += parseInt(e.goodsNum), r.details.push({
                        id: e.productId,
                        img: e.url,
                        goodsName: e.goodsName,
                        goodsNum: e.productNum
                    });
                }) : r.count = 0, a.push(r);
            }), e.setData({
                unPayedTailOrders: a
            });
        }).catch(function(e) {
        });
    },
    loadOrderList: function() {
        var e = this, t = this, a = t.data.pageIndex, r = t.data.tabSelected;
        t.setData({
            loading: !0
        });
        var n = a + 1, o = this.queryOrderList(n, 10);
        Promise.all([ o ]).then(function(o) {
            if (o[0].length > 0) {
                if ("0" == r) {
                    var s = t.data.allOrders;
                    var d = s.concat(o[0]);
                    t.setData({
                        allOrders: d,
                        pageIndex: n,
                        loading: !1
                    });
                } else if ("1" == r) {
                    var i = t.data.unpayedOrders;
                    var u = i.concat(o[0]);
                    t.setData({
                        unpayedOrders: u,
                        pageIndex: n,
                        loading: !1
                    });
                } else if ("4" == r) {
                    var c = t.data.payBack.concat(o[0]);
                    t.setData({
                        payBack: c,
                        pageIndex: n,
                        loading: !1
                    });
                } else if ("2" == r) {
                    var l = t.data.untakeOrders;
                    var h = l.concat(o[0]);
                    t.setData({
                        untakeOrders: h,
                        pageIndex: n,
                        loading: !1
                    });
                } else if ("3" == r) {
                    var g = t.data.unEvaluateOrders;
                    var m = g.concat(o[0]);
                    t.setData({
                        unEvaluateOrders: m,
                        pageIndex: n,
                        loading: !1
                    });
                } else if ("5" == r) {
                    var f = t.data.unPayedTailOrders;
                    var p = f.concat(o[0]);
                    t.setData({
                        unPayedTailOrders: p,
                        pageIndex: n,
                        loading: !1
                    });
                }
            } else console.log(e.data.noMore), t.setData({
                pageIndex: a,
                loading: !1,
                noMore: !0
            });
        });
    }
});