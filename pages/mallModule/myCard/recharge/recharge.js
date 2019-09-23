var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, t = require("../../../../api/rechargeService.js"), a = require("../../../../api/memberService.js"), n = (require("../../../../api/storeService.js"), 
    require("../../../../utils/utils.js")), o = require("../../../../utils/address.js"), s = require("../../../../utils/navPage.js"), r = require("../../../../utils/authorize.js"),server = require('../../../../utils/server.js'), i = getApp();
var url=i.globalData.imgurl;
var imgurl=i.globalData.url;
Page({
    data: {
        current: 0,
        rechargeList: [],
        balance: 0,
        gifts:{},
        serviceTel: "",
        goods:[],
        url:imgurl,
        phone: !1,
        money:wx.getStorageSync("user"),
        sceneType: "normal",
        stores: {
            id: ""
        },
        x: 750,
        y: 450,
        scale: 2,
        homeBack: !1,
        hasUserInfo: !1,
        isMember: !1,
        disabled: !1,
        preferenceType: "DONATE",
        user_money: '0.00'
    },
    toHomes: function() {
        wx.reLaunch({
          url: '../../index/index/index',
        })
    },
    rechargeClick: function(e) {
        var t = this, a = e.currentTarget.dataset.id;
        t.setData({
            currentItem: a
        });
    },
    checkAuth: function() {
        try {
            return !!i.globalData.userInfo;
        } catch (e) {}
    },
    getRechargeList: function() {
        var e = this, a = void 0;
        a = i.globalData.storeInfo && i.globalData.storeInfo.id ? i.globalData.storeInfo.id : "33010093", 
        t.query(a).then(function(t) {
            console.log(t);
            var a = [];
            t.forEach(function(e, t) {
                var n = {
                    amount: e.amount.toFixed(1),
                    discountAmount: e.discountAmount.toFixed(1),
                    sellPrice: (e.amount - e.discountAmount).toFixed(1),
                    discountMessage: e.discountMessage ? e.discountMessage : "",
                    donationAmount: e.donationAmount,
                    type: e.type,
                    rechangeMoneyId: e.rechangeMoneyId,
                    pictureUrl: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/recharge" + (t <= 6 ? t + 1 : 7) + ".png"
                };
                a.push(n);
            });
            var n = a[e.data.current];
            e.setData({
                rechargeList: a,
                chooseItem: n,
                currentItem: n.rechangeMoneyId
            });
        });
    },
    toPayRecharge: function() {
        var a = this, n = this.data.currentItem;
        wx.navigateTo({
          url: './refundSuccess/refundSuccess',
        })
        // if (this.setData({
        //     disabled: !0
        // }), "" !== n && void 0 !== n) {
        //     var o = {
        //         rechangeMoneyId: n,
        //         sourceType: "WX_XCX",
        //         sourceStoreId: a.data.stores.id,
        //         preferenceType: a.data.preferenceType
        //     };
        //     "underLineQrcode" == a.data.sceneType && (o = e({}, o, {
        //         sceneType: "UNDER_LINE_QRCODE"
        //     })), t.createOrder(o).then(function(e) {
        //         var n = {
        //             orderId: e.id,
        //             payMethod: "WX_MINI_APP"
        //         };
        //         t.getPaySign(n).then(function(e) {
        //             var t = JSON.parse(e), o = JSON.parse(t.sign), r = "";
        //             "SWIFTPASS" === n.payMethod ? r = o.package : "WX_MINI_APP" === n.payMethod && (r = o.packageValue), 
        //             wx.requestPayment({
        //                 timeStamp: o.timeStamp,
        //                 nonceStr: o.nonceStr,
        //                 package: r,
        //                 signType: o.signType,
        //                 paySign: o.paySign,
        //                 success: function(e) {
        //                     s.toRechargeSuccess("?type=" + a.data.preferenceType + "&storeId=" + a.data.stores.id);
        //                 },
        //                 fail: function(e) {
        //                     console.log("支付失败"), console.log(e), "requestPayment:fail cancel" === e.errMsg ? (wx.showToast({
        //                         title: "您取消了支付~",
        //                         icon: "none",
        //                         duration: 2e3
        //                     }), a.setData({
        //                         disabled: !1
        //                     })) : (wx.showToast({
        //                         title: e.errMsg,
        //                         icon: "none",
        //                         duration: 2e3
        //                     }), a.setData({
        //                         disabled: !1
        //                     }));
        //                 }
        //             });
        //         }).catch(function(e) {
        //             wx.showToast({
        //                 title: e.message,
        //                 icon: "none",
        //                 duration: 2e3
        //             }), a.setData({
        //                 disabled: !1
        //             });
        //         });
        //     }).catch(function(e) {
        //         wx.showToast({
        //             title: e.message,
        //             icon: "none",
        //             duration: 2e3
        //         }), a.setData({
        //             disabled: !1
        //         });
        //     });
        // } else wx.showToast({
        //     title: "请选择充值金额~",
        //     icon: "none",
        //     duration: 2e3
        // }), a.setData({
        //     disabled: !1
        // });
    },
    toBalances: function() {
       wx.navigateTo({
         url: '../../myCard/balance/balance',
       })
    },
    toResetPassword: function() {
        this.data.hasUserInfo && (this.data.isMember ? s.toCheckMobile() : s.toAuthorize());
    },
    getBalance: function() {
        var e = this;
        a.getMbrBalance().then(function(t) {
            e.setData({
                balance: t
            });
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
        var user = wx.getStorageSync('user');
        var user_money = user.user_money;
        console.log(user_money)
        t.setData({
          user_money: user_money
        });
        wx.request({
          url: url +'/user/getGive',
          type:"post",
          data:{
            wxtoken:wx.getStorageSync("wxtoken")
          },
          success:function(res){
            var date=res.data.data;
            console.log(date)
            t.setData({
              goods:date,
              gifts:date[0]
            })
          }
        })


        this.setData({
            serviceTel: i.globalData.servicePhone
        });
        var a = getCurrentPages();
        console.log(a), 1 === a.length && this.setData({
            homeBack: !0
        }), t.checkAuth() && (i.globalData.userInfo.member ? (this.getBalance(), this.rechangeByAddress()) : (wx.showToast({
            title: "您还不是会员，请先绑定手机号码成为会员",
            icon: "none",
            duration: 2e3
        }), setTimeout(function() {
            t.handlePopupPhone();
        }, 2e3)));
    },
    rechangeByAddress: function() {
        var e = this, t = this;
        i.globalData.storeInfo ? (t.setData({
            stores: i.globalData.storeInfo
        }), this.getRechargeList()) : o.getLocation().then(function(t) {
            i.globalData.storeInfo = t, e.getRechargeList(), e.setData({
                stores: t
            });
        }).catch(function(t) {
            e.getRechargeList();
        });
    },
    getNearestStore: function(e, t, a) {
        var o = [];
        e.forEach(function(e) {
            var s = n.distance(t, a, e.latitude, e.longitude);
            o.push(s);
        });
        for (var s = Math.min.apply(Math, o), r = 0, i = 0; i < o.length; i++) if (s === o[i]) {
            r = i;
            break;
        }
        return this.setData({
            stores: e[r]
        }), r;
    },
    getStore: function(e) {
        o.getLocation().then(function(t) {
            e.setData({
                stores: t,
                sceneType: "underLineQrcode"
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        this.checkUserInfo(), (this.data.balance || 0 !== this.data.balance) && this.getBalance();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    handleUserLogin: function() {
        console.log(i.globalData.userInfo);
        var e = this;
        if (i.globalData.userInfo) {
            i.globalData.userInfo;
            i.globalData.userInfo.member ? (e.rechangeByAddress(), e.getBalance()) : e.handlePopupPhone();
        }
    },
    handlePopupPhone: function() {
        i.globalData.userInfo.member ? (this.setData({
            phone: !1
        }), this.rechangeByAddress(), this.getBalance()) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(e) {
        console.log(e.detail), !0 === e.detail.bindMobile && this.handlePopupPhone();
    },
    checkUserInfo: function() {
        i.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), i.globalData.userInfo.member && this.setData({
            isMember: !0
        }));
    },
    getUserInfo: function(e) {
        var t = this;
        r.login(e).then(function(e) {
            t.setData({
                hasUserInfo: !0
            }), e.member ? (t.setData({
                isMember: !0
            }), t.rechangeByAddress(), t.getBalance()) : s.toAuthorize();
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    swiperChange: function(e) {
      var that=this;
      var current = e.detail.current;
      console.log(current)
      wx.request({
        url: url + '/user/getGive',
        type: "post",
        data: {
          wxtoken: wx.getStorageSync("wxtoken")
        },
        success: function (res) {
          var date = res.data.data;
          console.log(date)
          for(let i=0;i<date.length;i++){
            if (i == current){
              that.setData({
                gifts: date[i],
                current: current
              })
            }
          }
        }
      })
        // var t = this.data.rechargeList[e.detail.current], a = "DONATE";
        // "COMPOSE" !== t.type && (a = t.type), this.setData({
        //     current: e.detail.current,
        //     chooseItem: t,
        //     preferenceType: a,
        //     currentItem: t.rechangeMoneyId
        // });
    },
    chooseItem: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.type;
        this.setData({
            preferenceType: t
        });
    }
});