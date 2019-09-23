var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
var sendPrice = wx.getStorageSync('sendPrice');
function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a, o = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
},
 r = require("../../../../api/orderService.js"),
 s = require("../../../../api/addressService.js"), 
 n = require("../../../../api/distributionService.js"), 
 i = require("../../../../api/teamBuyService.js"), 
 d = require("../../../../api/storeService.js"), 
 c = require("../../../../api/advanceSellService.js"), 
 u = require("../../../../api/couponService.js"), 
 l = require("../../../../api/productService.js"), 
 h = require("../../../../utils/utils.js"), 
 p = require("../../../../utils/navPage.js"),
  f = require("../../../../libs/qqmap-wx-jssdk.min.js"), 
  m = getApp(), 
  y = require("../../../../api/memberService.js");
  var server = require("../../../../utils/server.js");



Page((t = {
    data: {
        url: url,
        type: "selftake",
        date: "2016-09-01",
        time: "12:01",
        user:[],
        shop:[],
        can_pay_point:'',
        multiArray: [ [ "2018-06-01", "2018-06-02", "2018-06-03" ], [ "6:00-9:00", "9:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00" ] ],
        multiIndex: [ 0, 0 ],
        selfTimeDate: "",
        addressInfo: "",
        goodsList: [],
        address:[],
        addresss:'无',
        hav:'0',
        allPrice: 0,
        discount: 0,
        couponPrice: 0,
         can_use_money:0,
         userCouponNum:0,
        distance: "",
        remarks: "",
        distributionInfo: {
            distributionFee: 0
        },
        shipmentAmount: 0,
        freeshipCoupon: 0,
        shipmentDiscount: 0,
        storeName: "人民广场店",
        total:'',
        storeId: "",
        storeTime: [],
        storeInfo: {},
        couponTips: "选择优惠券",
        couponInfo: {
            description: "选择优惠券",
            data: {
                freeship: [],
                discount: []
            },
            useCoupon: !1
        },
        teamBuyId: "",
        teamLeaderRecordId: "",
        modal: !1,
        integralModal: !1,
        useReserve: !1,
        cardInfo: {
            useAmount: 0,
            balance: 0,
            password: ""
        },
        sta0:'0',
        sta1: '0',
        sta2: '0',
        cardPassword: "",
        canBuy: !0,
        chooseTime: [ [], [] ],
        memberInfo: {},
        tips: "",
        paddingTop: "0rpx",
        businessStatus: !0,
        sharingPersonId: "",
        orderType: "normal",
        integral: 0,
        scoreArray: [],
        scoreIndex: 0,
        memberScore: 0,
        total_fee:0,
        scoreInfo: {
            scoreAmount: 0
        },
        isShow: false,
        scoreUseAmount: 0,
        advanceSellInfo: {},
        teamBuyInfo: {},
        scource: "",
        orderSelfTime: "",
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        hasAvailableCoupon: !1,
        hasAvailableGiftCard: !1,
        discountNum: 0,
        freeshipNum: 0,
        useScore: !1,
        scoreAmount: 0,
        orderGiftCard: {
            maxUseTotal: 0
        },
        giftCardNum: 0,
        systemOptions: {
            orderChooseDateAllowDays: 3,
            orderChooseDateInterval: 108e5,
            daysOfSelfTimeDelay: 0
        },
        showTimeChoose: !1,
        hasStockWarning: !1,
        favourable:0,
        shop_price:0,
        prom_type:0,
        pay_points:0,
        favourable:0,
        team_id:0,
        hide:false,
        pickup_id:0,
        coupon:0,
        coupon_id:0,
        shop_id:1,
        addressed: '',
        notes: '',
        order:[],
        goods_type1:0,
        myaddress:[],
        sale_id:0,
        order_id:0,
       shipping_price:0,
       peisong:0,
       ziti:0,
       edit_adid:0,
       xAdress:[],
       sendPrice:0,
       address_id:0,
       youhui:0,
       sendPrice:sendPrice
    },

    slectShop:function(e){
          var that=this;
              that.setData({
                hide:true,
              })
    },
  closepopup:function(){
    var that = this;
    that.setData({
      hide: false
    })
  },
  selected:function(){
    var that = this;
    that.setData({
      hide: false
    })
  },
  clk() {
    this.setData({
      'isShow': !this.data.isShow
    })
  },   
  handelTextArea:function(e){
    var that=this;
    that.setData({
      remarks: e.detail.value
    })
  },
  phoneCall: function (e) { //拨打电话
    var phone =e.currentTarget.dataset.phone;
    wx.showModal({
        title:'将拨打电话'+phone,
            success:function(res){
                if(res.confirm){
                    wx.makePhoneCall({
                    phoneNumber: phone,
                        success() {
                        //console.log("成功拨打电话")
                        }
                    })
                } else if(res.cancel){
                        wx.showToast({
                        title: '您已取消',
                        })
                }
        }

    })
},


  radioChange: function (e) {
    console.log(e);
    var that = this;
    that.setData({
      addresss: e.detail.value
    })

  },





  handleClick: function (e) {
    var that = this;
    var ty = e.currentTarget.dataset.type;
    that.setData({
      type: ty,
    })
    if (ty == 'dispatch') {
      that.setData({
        sendAdress: that.data.myaddress,
        total_fee:that.data.peisong,
        pickup_id:0
      })
    }else{
       that.setData({
         total_fee:that.data.ziti
       })
    }
  },
  
   











    bindMultiPickerChange: function(e) {
        this.setData({
            multiIndex: e.detail.value
        });
    },
    bindMultiPickerColumnChange: function(e) {
        var t = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        t.multiIndex[e.detail.column] = e.detail.value;
        var a = new Date(), o = this.data.storeTime[0] + ":00", r = this.data.storeTime[1] + ":00", s = h.formatTime(a).split(" ")[0], n = new Date(s + " " + o).getTime(), i = new Date(s + " " + r).getTime(), d = new Date(h.formatTime(a)).getTime();
        switch (t.multiIndex[0]) {
          case 0:
            t.multiArray[1] = d < i && d > n ? this.data.chooseTime[1] : d >= i ? this.data.chooseTime[1] : this.data.chooseTime[0];
            break;

          case 1:
          case 2:
            t.multiArray[1] = this.data.chooseTime[0];
        }
        if ("请选择其他时间" === t.multiArray[1][0] || "不能下单" === t.multiArray[1][0] || "无法预约自提时间" === t.multiArray[1][0] ? this.setData({
            canBuy: !1
        }) : this.setData({
            canBuy: !0
        }), 0 == e.detail.column) {
            var c = t.multiArray[0][t.multiIndex[0]].split("-"), u = c[1] + "月" + c[2] + "日";
            this.setData({
                selfTimeDate: u
            });
        }
        this.setData(t);
    },
    // initializationTime: function() {
    //     var e = this, t = e.data.systemOptions, a = new Date(), o = (a.getHours(), t.orderChooseDateAllowDays), r = t.daysOfSelfTimeDelay, s = e.addDay(a, r), n = [ [], [] ], i = (e.data.teamBuyInfo.endTime, 
    //     e.data.teamBuyInfo.orderSelfScope, []);
    //     if ("advanceSell" === e.data.orderType) {
    //         var d = e.data.advanceSellInfo;
    //         if ("FULL" === d.payType) {
    //             var c = new Date(h.formatTime(a)).getTime(), u = e.addDay(c, d.deliveryTime);
    //             i = [ u.getFullYear(), u.getMonth() + 1, u.getDate() ].map(h.timeFormat).join("-");
    //         } else if ("PARTIAL" === d.payType) {
    //             var l = new Date(d.balanceEndTime.replace(/-/g, "/")).getTime(), p = e.addDay(l, d.deliveryTime);
    //             i = [ p.getFullYear(), p.getMonth() + 1, p.getDate() ].map(h.timeFormat).join("-");
    //         }
    //         n[0].push(i), n[1].push("00:00-23:59");
    //         var f = i + " 00:00-23:59";
    //         this.setData({
    //             multiArray: n,
    //             orderSelfTime: f
    //         });
    //     } else if ("group" === e.data.orderType) {
    //         var m = e.data.teamBuyInfo.selfStartTime, y = e.data.teamBuyInfo.selfEndTime;
    //         if (null != m && null != y && "" != m && "" != y) {
    //             var g = m.split(" "), v = y.split(" "), I = g[0].split("-"), T = v[0].split("-"), w = I[1] + "月" + I[2] + "日" + "-" + (T[1] + "月" + T[2] + "日");
    //             null != e.data.storeInfo.storeHours && (w = w + " " + e.data.storeInfo.storeHours), 
    //             e.setData({
    //                 orderSelfTime: w
    //             });
    //         } else {
    //             e.setData({
    //                 showTimeChoose: !0
    //             });
    //             for (var D = 0; D < o; D++) {
    //                 var S = e.addDay(s, D), b = [ S.getFullYear(), S.getMonth() + 1, S.getDate() ].map(h.timeFormat).join("-");
    //                 n[0].push(b);
    //             }
    //             n[1] = e.handleChooseTime(), e.setData({
    //                 multiArray: n
    //             }), e.setData({
    //                 multiArray: n
    //             });
    //         }
    //     } else {
    //         for (var A = 0; A < o; A++) {
    //             var x = e.addDay(s, A), C = [ x.getFullYear(), x.getMonth() + 1, x.getDate() ].map(h.timeFormat).join("-");
    //             n[0].push(C);
    //         }
    //         n[1] = e.handleChooseTime(), e.setData({
    //             multiArray: n
    //         });
    //     }
    //     if ("group" !== e.data.orderType) {
    //         var P = e.data.multiArray[0][e.data.multiIndex[0]].split("-"), F = P[1] + "月" + P[2] + "日";
    //         this.setData({
    //             selfTimeDate: F
    //         });
    //     }
    // },
    getStoreInfoById: function(e) {
        var t = this;
        d.getById(e).then(function(e) {
            var a = e, o = a.storeHours.split("-");
            t.setData({
                storeTime: o,
                storeInfo: a
            });
        });
    },
    handleChooseTime: function() {
        var e = this, t = new Date(), a = t.getHours(), o = [ a, t.getMinutes() ].map(h.timeFormat).join(":"), r = "", s = [], n = [];
        try {
            var i = wx.getStorageSync("wj_allStores"), d = new RegExp(this.data.storeId);
            i && i.forEach(function(e) {
                d.test(e.id) && (r = e.storeHours.split("-"));
            });
        } catch (e) {}
        var c = r[0] + ":00", u = r[1] + ":00", l = h.formatTime(t).split(" ")[0], p = new Date(l + " " + c).getTime(), f = new Date(l + " " + u).getTime(), m = new Date(h.formatTime(t)).getTime(), y = [];
        (n = this.splitTime(l, l, e.data.systemOptions.orderChooseDateInterval, c, u)).forEach(function(e) {
            y.push(e.slice(0, 2));
        });
        y.length;
        for (var g = [ [], [] ], v = 0; v < n.length - 1; v++) {
            var I = n[v] + "-" + n[v + 1];
            g[0].push(I);
        }
        if (e.data.systemOptions.daysOfSelfTimeDelay > 0) g[1] = [].concat(g[0]); else for (var T = 0; T < y.length; T++) if (a >= y[T] && a < y[T + 1]) {
            g[1].push(o + "-" + n[T + 1]);
            for (var w = T + 1; w < n.length - 1; w++) {
                var D = n[w] + "-" + n[w + 1];
                g[1].push(D);
            }
        }
        return e.setData({
            chooseTime: g,
            storeTime: r
        }), s = m < p || m < f ? g[1] : g[0], "advanceSell" === e.data.orderType && (s = g[0]), 
        s;
    },
    splitTime: function(e, t, a, o, r) {
        "24:00:00" === r && (r = "23:59:59");
        var s = new Date(e + " " + o), n = new Date(t + " " + r), i = a, d = Math.ceil((n - s) / i), c = [], u = [];
        if (d - (n - s) / i >= 0) {
            c.push(h.formatTime(s));
            for (l = 1; l < d; l++) s.setMilliseconds(s.getMilliseconds() + i), c[l] = h.formatTime(new Date(s.getTime()));
            c.push(h.formatTime(n));
        } else {
            c.push(h.formatTime(s));
            for (var l = 1; l < d; l++) s.setMilliseconds(s.getMilliseconds() + i), c[l] = h.formatTime(new Date(s.getTime()));
        }
        return c.forEach(function(e) {
            var t = e.split(" ")[1].slice(0, 5);
            u.push(t);
        }), u = Array.from(new Set(u));
    },
    addDay: function(e, t) {
        return new Date(1e3 * (e / 1e3 + 86400 * t));
    },


    toChooseAddress: function() {
       var that=this
       console.log(that.data);
       console.log('goods_type1');
       console.log(that.data.goods_type1);
       var goods_type= that.data.goods_type1
       var id=that.data.goods_id
       var saleid=that.data.sale_id
       var coupon=that.data.coupon
       console.log('coupon使用的优惠券id');
       console.log(coupon);
       var str='&goods_type='+goods_type+'&coupon='+coupon
        // if(saleid>0){
             wx.navigateTo({
              url: "../../member/address/addressList/addressList?sendType=配送&sale_id="+saleid+str,
            })
        // }else{
        //  wx.navigateTo({
        //       url: "../../member/address/addressList/addressList?sendType=配送&goods_type="+0+str,
        //     })
        // }
        
    },
    addRemarks:function(e) {
        var t = "?type=" + this.data.type;
        p.toAddRemarks(t);
    },


    radio:function(e){
        var that=this
        var pickup_id=e.currentTarget.dataset.id;
        console.log('pickup_id');
        console.log(pickup_id);
        that.setData({pickup_id:pickup_id,shop_id:pickup_id})
    },





    createOrder: function(e) {

       var that = this;

            var address_id=that.data.address_id;
            var pickup_id=that.data.pickup_id;
            var type=that.data.type;
           

            if(type!='selftake'){
                pickup_id=0;
            }
             console.log('收货地址');
            console.log(address_id);
            console.log(pickup_id);
       
        var order_id=that.data.order_id;
     
        // if(that.data.address!=''){
        //     var address_id=0;
        // }else{
        //      var address_id = that.data.address.address_id;
        // }
        if (address_id ==0 && pickup_id==0) {
            wx.showToast({
                title: '请设置收货地址',
            })
        } else if(that.data.team_id>0 || that.data.sale_id>0 || order_id>0){
                wx.request({
                url: app.globalData.url + '/index.php/wxapi/Cart/cartteam',
                data: {
                    wxtoken: wx.getStorageSync('wxtoken'),
                    coupon_id: that.data.coupon_id,
                    act: 'submit_order',
                    user_money: that.data.user_money,
                    address_id: that.data.address_id,
                    goods_id: that.data.goods_id,
                    goods_num: that.data.goods_num,
                    item_id: that.data.item_id,
                    action: that.data.action,
                    suppliers_id: 0,
                    total_fee: that.data.total_fee,
                    prom_type:that.data.prom_type,
                    team_id:that.data.team_id,
                    user_note:that.data.remarks,
                    pickup_id:that.data.pickup_id,
                    sale_id:that.data.sale_id,
                    order_id:that.data.order_id,
                    shipping_price:that.data.sendPrice,
                 
                },
                method: 'POST',
                success(res) {
                 
                  var ad = that.data.sendAdress;
                    
                  
                  if (res.data.status == 1 && res.data.amount != '0.00') {    
                    if (that.data.remarks == undefined) {
                      that.data.remarks = ''
                    }
                   if(order_id>0){
                        wx.navigateTo({
                          url: '../../../mallModule/order/orderDetails/orderDetails?orderId=' + order_id 
                            })
                   }else{
                     wx.navigateTo({
                          url: '../../../mallModule/order/orderDetails/orderDetails?orderId=' + res.data.order_id
                            })
                   }

                        
                     
                  } else{
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration:2e3
                      })
                    }
                }
            });
        }else {
          var ad = that.data.sendAdress;
            wx.request({
                url: app.globalData.url + '/index.php/wxapi/Cart/cart3',
                data: {
                    wxtoken: wx.getStorageSync('wxtoken'),
                    coupon_id: that.data.coupon_id,
                    act: 'submit_order',
                    user_money: that.data.user_money,
                    address_id: that.data.address_id,
                    goods_id: that.data.goods_id,
                    goods_num: that.data.goods_num,
                    item_id: that.data.item_id,
                    action: that.data.action,
                    suppliers_id: 0,
                    total_fee: that.data.total_fee,
                    prom_type:that.data.prom_type,
                    team_id:that.data.team_id,
                    address:that.data.address,
                    pickup_id:that.data.pickup_id,
                    sale_id:that.data.pickup_id,
                    shipping_price:that.data.sendPrice,
                    user_note: that.data.remarks,

                },
                method: 'POST',
                success(res) {
                  if (res.data.status == 1 && res.data.amount!='0.00') {
                    if (that.data.remarks==undefined){
                      that.data.remarks=''
                    }
                  
                            wx.navigateTo({
                              url: '../../../mallModule/order/orderDetails/orderDetails?orderId=' + res.data.id
                            })

                    } else {
                        wx.showToast({
                            title: '购物车空空如也,请重新添加购物车',
                            icon:'none',
                            duration: 2e3
                        })
                    }
                }
            });
        }
    },




    submitOrder: function(e) {
        var t = this, a = this.getPostData(), o = !0, r = !0;
        try {
            wx.removeStorageSync("wj_orderCardInfo"), wx.removeStorageSync("wj_addRemarks");
        } catch (e) {}
        "EXPRESS" === a.shipmentType ? o = !!a.deliveryAddressId : r = !!a.selfTimeScope;
        this.data.orderType;
        if (o) if (r) {
            if (t.data.canBuy) {
                this.setData({
                    canBuy: !1
                });
                try {
                    var s = {
                        data: a,
                        formId: e.detail.formId,
                        orderType: t.data.orderType
                    };
                    wx.setStorageSync("wj_orderDetails", s), t.toPayMethod("normal");
                } catch (e) {}
            }
        } else wx.showToast({
            title: "自提时间不能为空~",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "收货地址不能为空~",
            icon: "none",
            duration: 2e3
        });
    },
    toPayMethod: function(e, t) {
        wx.redirectTo({
            url: "/pages/mallModule/order/orderDetails/orderDetails?orderId=" + e + "&from=shopCart&type=" + t
        });
    },
    getAllStore: function() {
        var e = this;
        d.queryList().then(function(t) {
            var a = [];
            t.forEach(function(e) {
                "OPEN" === e.status && a.push(e);
            });
            try {
                wx.setStorageSync("wj_allStores", a), wx.getLocation({
                    type: "gcj02",
                    success: function(t) {
                        var o = t.latitude, r = t.longitude, s = e.getNearestStore(a, o, r);
                        m.globalData.storeInfo = a[s], e.setData({
                            storeName: m.globalData.storeInfo.name,
                            storeId: m.globalData.storeInfo.id,
                            storeInfo: m.globalData.storeInfo
                        });
                    },
                    fail: function(e) {}
                });
            } catch (e) {}
        });
    },
    getNearestStore: function(e, t, a) {
        var o = [];
        e.forEach(function(e) {
            var r = h.distance(t, a, e.latitude, e.longitude);
            o.push(r);
        });
        for (var r = Math.min.apply(Math, o), s = 0, n = 0; n < o.length; n++) if (r === o[n]) {
            s = n;
            break;
        }
        return this.setData({
            store: e[s].name,
            storeId: e[s].id
        }), s;
    },
    clearCacheData: function() {
        try {
            wx.removeStorageSync("wj_sharingId");
        } catch (e) {}
    },
    getPay: function(e) {
        var t = this, a = {
            orderId: e.id,
            payMethod: "WX_MINI_APP"
        };
        0 === e.cashTotal ? t.toPaymentSuccess(e.id) : r.getPaySign(a).then(function(e) {
            var o = JSON.parse(e), r = JSON.parse(o.sign), s = "";
            "SWIFTPASS" === a.payMethod ? s = r.package : "WX_MINI_APP" === a.payMethod && (s = r.packageValue), 
            wx.requestPayment({
                timeStamp: r.timeStamp,
                nonceStr: r.nonceStr,
                package: s,
                signType: r.signType,
                paySign: r.paySign,
                success: function(e) {
                    var o = a.orderId;
                    t.toPaymentSuccess(o);
                },
                fail: function(e) {
                    "requestPayment:fail cancel" === e.errMsg ? (wx.showToast({
                        title: "您取消了订单支付~",
                        icon: "none",
                        duration: 2e3
                    }), p.toShopcart()) : (wx.showToast({
                        title: e.errMsg,
                        icon: "none",
                        duration: 2e3
                    }), p.toShopcart());
                }
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
   
    toChoiceCoupon: function(e) {
        var t = this;
        var type=t.data.type
        var address_id=t.data.address_id
        var sale_id=t.data.sale_id
        console.log('提货方式');
        console.log(t.data);
        console.log(type);
        if(type==undefined){type='selftake';}
        console.log('地址id');
        console.log(address_id);
        console.log('限时抢购');
        console.log(sale_id);
        var str='?type='+type+'&address_id='+address_id+'&sale_id='+sale_id
        wx.navigateTo({
            url:'../../../mallModule/coupon/choiceCoupon/choiceCoupon'+str
        })

    },



    toPaymentSuccess: function(e) {
        var t = "?orderId=" + e;
        p.toPaymentSuccess(t);
    },
    handleReserve: function(e) {
        var t = this;
        if (e.detail.value) this.setData({
            modal: !0,
            cardInfo: o({}, t.data.cardInfo, {
                password: "",
                useAmount: 0
            })
        }), t.getMbrBalance(); else {
            this.setData({
                useReserve: !1,
                cardInfo: o({}, t.data.cardInfo, {
                    password: "",
                    useAmount: 0
                })
            });
            try {
                wx.removeStorageSync("wj_orderCardInfo");
            } catch (e) {}
        }
    },
    handleCardPassword: function(e) {
        var t = this;
        this.setData({
            cardInfo: o({}, t.data.cardInfo, {
                password: e.detail.value
            })
        });
    },
    onCancel: function() {
        if (this.data.modal) {
            this.setData({
                modal: !1,
                useReserve: !1,
                cardInfo: o({}, this.data.cardInfo, {
                    useAmount: 0
                })
            });
            try {
                wx.removeStorageSync("wj_orderCardInfo");
            } catch (e) {}
        } else this.data.integralModal && this.setData({
            integralModal: !1
        });
    },
    onConfirm: function() {
        var e = this;
        if (e.data.modal) {
            e.setData({
                modal: !1,
                useReserve: !0
            });
            try {
                var t = o({}, e.data.cardInfo, {
                    useReserve: !0
                });
                wx.setStorageSync("wj_orderCardInfo", t);
            } catch (e) {}
        } else if (e.data.integralModal) {
            var a = e.data.scoreUseAmount;
            if (0 === a) {
                var r = e.data.scoreIndex;
                a = e.data.scoreArray[r];
            }
            e.setData({
                integralModal: !1,
                integral: a,
                scoreAmount: e.data.scoreInfo.scoreAmount
            });
        }
    },
    handleResetPassword: function() {
        p.toCheckMobile();
    },
    getMbrBalance: function() {
        var e = this, t = this;
        y.getMbrBalance().then(function(a) {
            e.setData({
                cardInfo: o({}, t.data.cardInfo, {
                    balance: a
                })
            });
            var r = t.data.allPrice, s = t.data.couponPrice, n = t.data.shipmentAmount - t.data.freeshipCoupon, i = t.data.cardInfo.balance, d = parseFloat((r - s));
            "dispatch" === t.data.type && (d = parseFloat((d + n))), d >= 0 ? d > i ? e.setData({
                cardInfo: o({}, t.data.cardInfo, {
                    useAmount: i
                })
            }) : e.setData({
                cardInfo: o({}, t.data.cardInfo, {
                    useAmount: d
                })
            }) : e.setData({
                cardInfo: o({}, t.data.cardInfo, {
                    useAmount: 0
                })
            });
        });
    },
    handleCardBalance: function() {
        this.setData({
            useReserve: !1,
            cardInfo: {
                useAmount: 0,
                balance: 0,
                password: ""
            }
        });
    },
    checkDistribution: function() {
        var e = this, t = this;
        t.setData({
            tips: ""
        });
        try {
            var a = wx.getStorageSync("wj_chooseAddressInfo");
            a ? (this.setData({
                addressInfo: a
            }), "advanceSell" !== t.data.orderType && this.calcDistance(a)) : "" == t.data.addressInfo ? s.getDefaultAddress().then(function(a) {
                a ? (e.setData({
                    addressInfo: a
                }), wx.setStorage({
                    key: "wj_chooseAddressInfo",
                    data: a
                }), "advanceSell" !== t.data.orderType && e.calcDistance(a)) : wx.getLocation({
                    type: "gcj02",
                    success: function(e) {
                        var a = e.latitude, o = e.longitude;
                        s.query().then(function(e) {
                            if (e.length > 0) {
                                var r = e, s = t.getNearestAddress(r, a, o);
                                wx.setStorage({
                                    key: "wj_chooseAddressInfo",
                                    data: r[s]
                                }), t.setData({
                                    addressInfo: r[s]
                                }), "advanceSell" !== t.data.orderType && t.calcDistance(r[s]);
                            } else wx.showToast({
                                title: "请选择收货地址~",
                                icon: "none",
                                duration: 2e3
                            });
                        }).catch(function(e) {
                            wx.showToast({
                                title: e.message,
                                icon: "none",
                                duration: 2e3
                            });
                        });
                    }
                });
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            }) : s.query().then(function(e) {
                e.length > 0 ? wx.getLocation({
                    type: "gcj02",
                    success: function(a) {
                        var o = a.latitude, r = a.longitude, s = e, n = t.getNearestAddress(s, o, r);
                        wx.setStorage({
                            key: "wj_chooseAddressInfo",
                            data: s[n]
                        }), t.setData({
                            addressInfo: s[n]
                        }), "advanceSell" !== t.data.orderType && t.calcDistance(s[n]);
                    }
                }) : (t.setData({
                    addressInfo: ""
                }), wx.showToast({
                    title: "请选择收货地址~",
                    icon: "none",
                    duration: 2e3
                }));
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        } catch (e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        }
    },
    getNearestAddress: function(e, t, a) {
        var o = [];
        e.forEach(function(e) {
            var r = h.distance(t, a, e.latitude, e.longitude);
            o.push(r);
        });
        for (var r = Math.min.apply(Math, o), s = 0, n = 0; n < o.length; n++) if (r === o[n]) {
            s = n;
            break;
        }
        return s;
    },
    checkProductsSellTime: function() {
        var e = this, t = e.data.goodsList, a = e.data.type, r = e.data.storeInfo, s = e.data.systemOptions.daysOfSelfTimeDelay, n = [], i = [], d = r.storeHours.split("-"), c = d[0] + ":00", u = d[1] + ":00";
        u = "24:00:00" === u ? "23:59:59" : u;
        var l = new Date(), p = e.addDay(l, s), f = l.getHours(), m = l.getMinutes(), y = h.formatTime(p).split(" ")[0];
        s > 0 && (f = "0", m = "0");
        var g = [ f, m ].map(h.timeFormat).join(":"), v = new Date(y + " " + c).getTime(), I = new Date(y + " " + u).getTime(), T = new Date(h.formatTime(l)).getTime(), w = [ [], [] ];
        if (t.forEach(function(e) {
            if (e.startTime && e.endTime) {
                var t = e.startTime.split(" ")[1].slice(0, 5) + ":00", a = e.endTime.split(" ")[1].slice(0, 5) + ":00", r = new Date(y + " " + t).getTime(), s = new Date(y + " " + a).getTime();
                if (T >= v && T <= I && T >= r && T <= s) {
                    var d = o({}, e, {
                        newStartTime: t,
                        newEndTime: a,
                        newStartTimeStamp: r,
                        newEndTimeStamp: s,
                        businessStatus: !0
                    });
                    i.push(d);
                } else {
                    var l = o({}, e, {
                        newStartTime: t,
                        newEndTime: a,
                        newStartTimeStamp: r,
                        newEndTimeStamp: s,
                        businessStatus: !1
                    });
                    n.push(l), i.push(l);
                }
            } else {
                var h = o({}, e, {
                    newStartTime: c,
                    newEndTime: u,
                    newStartTimeStamp: v,
                    newEndTimeStamp: I,
                    businessStatus: !0
                });
                i.push(h);
            }
        }), e.setData({
            goodsList: i
        }), s > 0) ; else if (T < v || T > I) {
            e.setData({
                canBuy: !1,
                tips: "商店已打烊，不支持配送，请选择自提~",
                paddingTop: "60rpx",
                businessStatus: !1
            });
        }
        if (n.length > 0) {
            e.setData({
                canBuy: !1,
                tips: "订单中有商品超出售卖时间~",
                paddingTop: "60rpx",
                businessStatus: !0
            });
        }
        if (i.length > 0) {
            if (n.length > 0) {
                e.setData({
                    canBuy: !1,
                    tips: "订单中有商品超出售卖时间~",
                    paddingTop: "60rpx"
                });
            }
            var D = "", S = "", b = "", A = "", x = "", C = "", P = "", F = "", B = [ [], [] ];
            if (i.forEach(function(e, t) {
                0 === t ? (D = e.newStartTime, S = e.newEndTime, b = e.newStartTimeStamp, A = e.newEndTimeStamp) : (b < e.newStartTimeStamp && (D = e.newStartTime, 
                b = e.newStartTimeStamp), A > e.newEndTimeStamp && (S = e.newEndTime, A = e.newEndTimeStamp));
            }), b < A) if (v > b ? (x = c, P = v) : (x = D, P = b), I > A ? (C = S, F = A) : (C = u, 
            F = I), P < F) {
                var M = e.splitTime(y, y, e.data.systemOptions.orderChooseDateInterval, x, C), k = [];
                M.forEach(function(e) {
                    k.push(e.slice(0, 2));
                });
                for (var E = 0; E < M.length - 1; E++) {
                    var N = M[E] + "-" + M[E + 1];
                    B[0].push(N);
                }
                if (T < P) B[1] = B[0]; else if (T > F) {
                    B[1].push("无法预约自提时间"), e.setData({
                        canBuy: !1
                    });
                } else if (T >= P && T < F) {
                    for (var j = 0; j < k.length; j++) if (f >= k[j] && f < k[j + 1]) {
                        B[1].push(g + "-" + M[j + 1]);
                        for (var O = j + 1; O < M.length - 1; O++) {
                            var R = M[O] + "-" + M[O + 1];
                            B[1].push(R);
                        }
                    }
                } else {
                    B[1].push("无法预约自提时间"), e.setData({
                        canBuy: !1
                    });
                }
                if (w[0] = e.data.multiArray[0], this.data.hasStockWarning ? w[1] = B[0] : w[1] = B[1], 
                e.setData({
                    chooseTime: B,
                    multiArray: w
                }), "dispatch" !== e.data.type || e.data.businessStatus) {
                    e.setData({
                        canBuy: !0,
                        tips: "",
                        paddingTop: "0"
                    });
                } else e.setData({
                    canBuy: !1,
                    tips: "商店已打烊，不支持配送，请选择自提~",
                    paddingTop: "60rpx"
                });
            } else "selftake" === a && (wx.showToast({
                title: "订单内部分商品售卖时间冲突，无法下单~",
                icon: "none",
                duration: 2e3
            }), B[0].push("无法预约自提时间"), B[1].push("无法预约自提时间"), w[0] = e.data.multiArray[0], w[1] = B[1], 
            e.setData({
                chooseTime: B,
                multiArray: w,
                canBuy: !1
            })); else "selftake" === a && (wx.showToast({
                title: "订单内部分商品售卖时间冲突，无法下单~",
                icon: "none",
                duration: 2e3
            }), B[0].push("无法预约自提时间"), B[1].push("无法预约自提时间"), w[0] = e.data.multiArray[0], w[1] = B[1], 
            e.setData({
                chooseTime: B,
                multiArray: w
            }));
        }
    },
    handleGoodsList: function() {
        var e = this, t = [];
        e.data.goodsList.forEach(function(e) {
            var a = o({}, e, {
                businessStatus: !0
            });
            t.push(a);
        }), e.setData({
            goodsList: t
        });
    },

      // 立即购买
    buyNows: function() {

        var that = this;
        var suppliers_id = that.data.suppliers_id;
        var address_id = that.data.address_id;
        if (address_id == '') {
            wx.showToast({
                title: '请设置收货地址',
            })
        } else {
            wx.request({
                url: app.globalData.url + '/wxapi/Cart/cart3',
                data: {
                    wxtoken: wx.getStorageSync('wxtoken'),
                    coupon_id: that.data.coupon_id,
                    act: 'submit_order',
                    user_money: that.data.user_money,
                    address_id: address_id,
                    goods_id: that.data.goods_id,
                    goods_num: that.data.goods_num,
                    item_id: that.data.item_id,
                    action: that.data.action,
                    suppliers_id: suppliers_id,
                    total_fee: that.data.total_fee
                },
                method: 'POST',
                success(res) {
                    if (res.data.status == 1) {
                        if (res.data.amount == 0) {
                            wx.showToast({
                                title: '支付成功',
                                duration: 3000,
                                success: function() {
                                    setTimeout(function() {
                                        wx.switchTab({
                                            url: '../../mallModule/index/index/index',
                                        })
                                    }, 2000) //延迟时间
                                }
                            })
                        } else {
                            wx.navigateTo({
                                url: '../../other/pay/pay?order_id=' + res.data.order_id + '&amount=' + res.data.amount + '&payurl=1',
                            })
                        }
                    } else {
                        console.log(res.data.msg);
                        wx.showToast({
                            title: res.data.msg
                        })
                    }
                }
            });
        }
    },






    toScoreBox: function(e) { //积分抵扣
        var that = this;
        console.log('dvdbvd')
        var canUse = e.currentTarget.dataset.canUse;
        that.setData({
            total_fee: 0,
            user_money: canUse
        })
        that.orderPrice();
    },

     toScoreBox1: function(e) { //积分抵扣
        var that = this;
        console.log('dvdbvd')
        var canUse = e.currentTarget.dataset.canUse;
        that.setData({
            total_fee: 0,
            pay_points: canUse
        })
        that.orderPrice();
    
    },



    handleScoreChoice: function() {
        function e() {
            t.setData({
                integralModal: !0
            });
            var e = t.data.memberScore, a = .1 * parseInt(t.data.allPrice) * 100, r = 0;
            r = e < a ? e : a, y.getScoreDeutible(e, t.data.allPrice, r).then(function(e) {
                console.log(e);
                for (var a = e.scoreSpace, r = [], s = parseInt(e.orderAmount / a); s > 0; s--) {
                    var n = s * a;
                    r.push(n);
                }
                r.push(0), t.setData({
                    integral: t.data.scoreInfo.scoreSpace * t.data.scoreInfo.scoreAmount,
                    scoreAmount: t.data.scoreInfo.scoreAmount
                });
                var i = parseInt(e.orderAmount / e.scoreAmount), d = e.orderAmount > i ? e.scoreAmount : 0;
                if (t.data.scoreArray.length > 1) {
                    var c = t.data.scoreIndex, u = t.data.scoreArray[c];
                    d = parseInt(e.orderAmount * u / e.orderAmount / i);
                }
                var l = o({}, e, {
                    scoreAmount: d,
                    amount: i
                });
                t.setData({
                    scoreInfo: l
                });
            });
        }
        var t = this;
        this.data.couponInfo.useCoupon ? wx.showModal({
            title: "提示",
            content: "积分和优惠券不可同时使用",
            confirmText: "使用积分",
            success: function(a) {
                a.confirm ? (t.setData({
                    couponPrice: 0,
                    couponInfo: {
                        description: "选择优惠券",
                        data: [],
                        useCoupon: !1
                    },
                    shipmentDiscount: 0,
                    freeshipCoupon: 0
                }), e()) : a.cancel;
            }
        }) : "scoreMall" !== t.data.orderType && e();
    },
  
    bindScoreChange: function(e) {
        var t = this.data.scoreArray[e.detail.value], a = this.data.scoreInfo, r = a.scoreAmount;
        this.data.scoreArray.length > 1 && (r = parseInt(a.orderAmount * t / a.orderAmount / a.amount)), 
        a = o({}, a, {
            scoreAmount: r
        }), this.setData({
            scoreIndex: e.detail.value,
            scoreUseAmount: t,
            scoreInfo: a
        });
    },
    viewStoreLocation: function() {
        var e = this.data.storeInfo, t = parseFloat(e.latitude), a = parseFloat(e.longitude);
        wx.openLocation({
            latitude: t,
            longitude: a,
            scale: 28,
            name: e.name,
            address: e.address
        });
    },
    viewScoreWarn: function(e) {
        e.currentTarget.dataset.scorerule && wx.showModal({
            title: "提示",
            content: e.currentTarget.dataset.scorerule
        });
    },
    toggleMiddlePopup: function() {
        this.toggle("middle");
    },
    toggle: function(t) {
        this.setData(e({}, "show." + t, !this.data.show[t]));
    },
    getAvailableCouponNum: function() {
        var e = this, t = this.getPostData(), a = e.data.orderType, o = {};
        o = "normal" === a ? {
            order: t
        } : "secondkill" === a ? {
            grabOrder: t
        } : {
            order: t
        }, "group" !== a && "advanceSell" !== a && "scoreMall" !== a && u.getAvailableCoupon(o).then(function(t) {
            var a = 0, o = 0, r = 0, s = null;
            if (t && t.length > 0 && t.forEach(function(e) {
                !0 === e.usable && ("FREESHIP" !== e.coupon.function ? (a++, "CASH" === e.coupon.function && e.coupon.faceValue > r && (s = e, 
                r = e.coupon.faceValue)) : o++);
            }), s && r > 0) {
                var n = {
                    couponType: "discount",
                    coupons: [ s ]
                };
                e.calcCoupon(n);
            }
            e.setData({
                hasAvailableCoupon: !0,
                discountNum: a,
                freeshipNum: o
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getAvailableScoreNum: function(e) {
        var t = this, a = .1 * parseInt(t.data.allPrice) * 100, r = 0;
        (r = e < a ? e : a) > 500 && (r = 500), y.getScoreDeutible(e, t.data.allPrice, r).then(function(e) {
            var a = parseInt(e.scoreAmount), r = e.orderAmount, s = o({}, e, {
                orderAmount: r,
                scoreAmount: a
            });
            t.setData({
                scoreInfo: s
            });
        });
    },
    changeStore: function() {
        wx.navigateTo({
            url: "/pages/mallModule/index/selectStore/selectStore"
        });
    },
    sureCall:function(a){
      wx.showModal({
        title: "提示",
        content: "确定要拨打以下电话" + a.currentTarget.dataset.phone + "?",
        confirmText: "拨打",
      });
    },
    onUnload: function (e) {
      var pages = getCurrentPages() // 获取页面栈
      console.log(pages)
      wx.reLaunch({
      url: '/pages/mallModule/goods/shopcart/shopcart'
    })
    },


    onLoad: function(e) {
        var t = this;
        console.log('address_id');
        console.log(e.address_id);
        
        if(e.address_id>0){
            // 收货地址
            t.address_det(e.address_id);
            // t.getCart();
            t.setData({
                type:'dispatch',
                edit_adid:e.address_id,
                address_id:e.address_id
            })
        }


        t.setData({
       
          sendType:e.sendType,
        })
    if(e.order_id)
    {
        t.setData({order_id:e.order_id})
    }

     
      // if (e.sendType=='配送'){
      //   t.setData({
      //     type:'dispatch',
      //     sendAdress:e,
      //   })
      //   wx.setStorageSync('sendAdress',e)
      // }
      
      // if (e.type =='dispatch'){
      //   t.setData({
      //     type: 'dispatch',
      //     sendAdress: wx.getStorageSync('sendAdress')
      //   })
      // }
      // if (e.type == 'selftake'){
      //   t.setData({
      //     type: 'selftake',
      //     sendAdress: wx.getStorageSync('sendAdress')
      //   })
      // }
      // if(e.user_note!=''){
      //       t.setData({
      //           remarks:e.user_note,
      //       })
      // }
      var type1=e.goods_type;
      var id=e.id;
     
      
      if(type1==1){
         var team_id=e.team_id;
        t.setData({
            orderType:'group',
            goods_id:id,
            canBuy:true,
            team_id:team_id,
        })
        
      }
 
      if(type1==2){
        var sale_id=e.saleid;
            t.setData({sale_id:sale_id})  
      }
      if(e.coupon>0){
         console.log('使用优惠券');
         t.useCoupon(e.coupon);
         t.setData({coupon:e.coupon,type:e.type})
      }
      t.setData({goods_type1:type1})
      //自提 配送状态
       t.setData({type:e.type})
 




       // var user=wx.getStorageSync("user"),
       // console.log(user);
    },
    address_det:function(id){
        console.log('获取地址');
        console.log(id);
        var that=this
        server.getJSON('/user/editAddress/id/'+id+'/wxtoken/'+wx.getStorageSync('wxtoken'),function(res){
            console.log('地址');
            console.log(res);
            that.setData({
                xAdress:res.data.address,
                hav:4
            })
        })
    },
  // 使用优惠券
    useCoupon: function(e) {
        console.log('使用的优惠券');
        console.log(e);
        var that = this;
        var couponId = e;
        that.setData({
            coupon_id: couponId,
            total_fee: 0,
        });
        that.orderPrice();
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
              // that.toPay()
            }
         var sendPrice=wx.getStorageSync('sendPrice');
          var order_amount=orderdetails.order_amount;
          // if(orderdetails.subscribe>0){
             var total_fee=order_amount;
             var shop= res.data.shop;
             var order_amount = total_fee + sendPrice;

          // }else{
            // var total_fee=sendPrice+order_amount;
          // }
        
           
            that.setData({
                // order: orderdetails,
                // money: res.data.money,
                // goods: orderdetails.goods_list,
                // goods_name: orderdetails.goods_list[0].goods_name,
                // goods_id: orderdetails.goods_list[0].goods_id,
                // share_img: orderdetails.goods_list[0].share_img,
                // total_fee:total_fee,
                // sendPrice:sendPrice,
                        shop:shop,
                        total_fee: total_fee,
                       
                        addresss: shop[0].pickup_address,
                        pickup_id:shop[0].pickup_id,
                        goodsList:orderdetails.goods_list,
                        order_id:orderdetails.order_id,
                        hav:4,
                         ziti: total_fee,
                        peisong:res.data.peisong,
                        sendAdress:res.data.address,

            });
            var address_id=taht.data.address_id
            if(address_id==0){
                that.setData({ address_id:res.data.address.address_id,})
            } 
        });
    },




  pintuan: function (e) {
    console.log('拼团');
    console.log(e)
    let that=this
    wx.request({
      url: imgurl + '/LoginApi/group_goods?id=' + e+ '&wxtoken=' + wx.getStorageSync('wxtoken'),
      success(res) {
       console.log(res);
        var data = res.data;
        var list = data.list;
        var share = data.share;
        var team = data.team;
        var shop = res.data.shop;  
        var order_amount = list.team_price + sendPrice;

        that.setData({
          team:list,
          total_fee:list.team_price,
          goodsList: list,
          pickup_id:shop[0].pickup_id,
          shop:shop,
          ziti:list.team_price,
          peisong:order_amount,
          hav:2
          // addresss: shop[0].pickup_name,
        });

         if (res.data.address) {
                    var address = res.data.address;
                    that.setData({
                        type:'selftake',
                        address: address,
                        address_id: address.address_id,
                    })
                }

      }

    });
  },









         // 初始数据
    getCart: function() {

        var that = this;
        server.getJSON('/Cart/cart2/wxtoken/' + wx.getStorageSync('wxtoken') + '/action/'
                 + that.data.action + '/goods_id/' + that.data.goods_id + '/goods_num/' + that.data.goods_num + '/item_id/' + that.data.item_id, function(res) {
            if (res.data.status == 1) {
             
                var goods_list = res.data.result.cartList;
                var coupon_list = res.data.result.userCartCouponList;
                var user = res.data.result.user;
                var couponNum = res.data.result.userCouponNum;
            
                var result = res.data.result.cartPriceInfo;
                var shop = res.data.result.shop;
                var order_amount = res.data.result.order_amount + sendPrice;
                that.setData({
                    goodsList: goods_list,
                    result: result,
                    coupon_list: coupon_list,
                    user: user,
                    can_use_money: user.user_money,
                    can_pay_point:user.pay_points,
                    userCouponNum:couponNum,
                    shop:shop,
                    total_fee: res.data.result.order_amount,
                    ziti: res.data.result.order_amount,
                    peisong:order_amount,
                    // address_id:res.data.result.address.address_id,
                    addresss: shop[0].pickup_address,
                    pickup_id:shop[0].pickup_id,
                  
                    myaddress:res.data.result.address,
                    hav:4
                });

                var edit_adid=that.data.edit_adid
                var address_id=that.data.address_id
                console.log('地址id');
                console.log(address_id);

                if(address_id==0){
                    that.setData({address_id:res.data.result.address.address_id})
                }
                if(edit_adid==0){
                    that.setData({sendAdress: wx.getStorageSync('sendAdress'),})
                }
                that.orderPrice();


                // if (res.data.result.address) {
                //     var address = res.data.result.address;
                //     that.setData({
                //         address: address,
                //         address_id: address.address_id,
                //     })
                // }
              
                
            } else {
                // wx.showToast({
                //     title: '抱歉没有商品',
                // })
            }
        });
    },
  
  // 计算价格
    orderPrice: function() {
        var that = this;
        wx.request({
            url: app.globalData.url + '/index.php/wxapi/Cart/cart3',
            data: {
                wxtoken: wx.getStorageSync('wxtoken'),
                coupon_id: that.data.coupon_id,
                act: 'order_price',
                user_money: that.data.user_money,
                goods_id: that.data.goods_id,
                goods_num: that.data.goods_num,
                item_id: that.data.item_id,
                action: that.data.action,
                pay_points:that.data.pay_points,
            },
            method: 'POST',
            success(res) {
                console.log('计算价格res');
                console.log(res);
                console.log(res.data.peisong);
              var s = wx.getStorageSync('sendAdress')
              var zhekou = Number(res.data.result.coupon_price)
              var allprice = Number(res.data.result.order_amount);
              var zugou = Number(res.data.result.total_amount);
              var youhui= res.data.result.coupon_price;
              var order_amount=res.data.result.order_amount
                    that.setData({
                        total_fee: allprice,
                        ziti: allprice,
                        peisong: res.data.peisong,
                       
                    })
                if(order_amount>youhui){
                    that.setData({ youhui:res.data.result.coupon_price})
                }


                var edit_adid=that.data.edit_adid
                 if(edit_adid==0){
                    that.setData({ hav:"2", sendAdress:res.data.pick[0],})
                 }   
            }
        })
    },

    onShow:function(){
        var e = this;
        var order_id=e.data.order_id
        var goods_type=e.data.goods_type1
        var type=e.data.type
        // 限时抢购
        if(goods_type==2 || e.data.sale_id>0 ){
            console.log('限时抢购');
              e.toAuthorize();
        }else if(goods_type==1){
            console.log('拼团');
        // 拼团
            var team_id=e.data.team_id
              e.pintuan(team_id);
        }else if(order_id>0){
            // 
           e.orderdatails(order_id)
        
        }else{
            console.log('普通商品');
            // 普通商品
            this.getCart();
        }

            console.log('onshow配送');
              console.log(e.data.peisong)

        //配送自提判断
        if (type == 'dispatch') {
             
              e.setData({
                total_fee:e.data.peisong,
              })
            }else{
               e.setData({
                 total_fee:e.data.ziti
               })
            }

    },

  //限时抢购
    toAuthorize: function () {
    
    var that=this
    var user=that.data.user;
    var address_id=user.address_id
    if(user.address_id==0){
      wx.navigateTo({
        url:"../../../mallModule/member/address/addressList/addressList"
      })
    }
      wx.request({
                url: app.globalData.url + '/index.php/wxapi/Cart/cartteam',
                data: {
                    wxtoken: wx.getStorageSync('wxtoken'),
                    act: 'submit_order',
                    address_id: address_id,
                    goods_id: that.data.id,
                    goods_num: 1,
                    item_id: that.data.item_id,
                    team_id:that.data.team_id,
                    // pay_points:pay_points,
                    total_fee: that.data.shop_price,
                    goods_type:that.data.goods_type1,
                    sale_id:that.data.sale_id//抢购表商品id
                },
                method: 'POST',
                success(res) {
                    if(res.data.status==0){
                        wx.showToast({
                          title: res.data.msg,
                          duration: 5000
                        })
                        wx.navigateTo({
                          url: '../../../mallModule/order/order/order',
                        })
                    }else{
                          var shop = res.data.shop;
                          var order_amount = res.data.order.order_amount + sendPrice;
                          that.setData({
                                shop:shop,
                                total_fee: res.data.order.order_amount,
                                ziti: res.data.order.order_amount,
                                // address_id:res.data.address.address_id,
                                addresss: shop[0].pickup_address,
                                pickup_id:shop[0].pickup_id,
                                
                                goodsList:res.data.goods.goods_list,
                                order_id:res.data.order.order_id,
                                xAdress:res.data.address,
                                hav:4,
                                peisong: res.data.peisong,
                             
                            })
                          var address_id=that.data.address_id
                            if(address_id==0){
                                that.setData({ address_id:res.data.address.address_id,})
                            }
                          if(that.data.edit_adid==0){
                            that.setData({sendAdress:res.data.address})
                          }

                    }
                 


                  }
            });
  }

}))