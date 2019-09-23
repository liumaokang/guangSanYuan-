var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
}, n = require("../../../../api/wxaUserService.js"), o = require("../../../../api/orderService.js"), r = require("../../../../api/couponService.js"), i = require("../../../../api/memberService.js"), s = require("../../../../api/redPacketService.js"), u = require("../../../../api/giftCardService.js"), c = require("../../../../utils/auth.js"), m = require("../../../../utils/utils.js"), l = require("../../../../utils/navPage.js"), h = require("../../../../utils/authorize.js"), f = getApp();

var server = require("../../../../utils/server.js");
var image_Url = url + "/upload/wxapi/";
Page((t = {
    data: {
        image_Url: image_Url,
        score: '0',
        user_money: '0.00',
        codeImg: "",
        loading: !0,
        tabbar: {},
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        // member: {
        //     couponNum: "*"
        // },
         couponNum:0,
               memberRight: !0,
        isMember: !1,
        unPayNum: "",
        unGroupNum: "",
        unSelftakeNum: "",
        sendingNum: "",
        unEvaluateNum: "",
        waitPayBalance: "",
        rejectedNum: "",
        tabSelected: 0,
        serviceTel: "",
       
        reserveBalance: "0.00",
        memberScoreBalabce: "0",
        redPacketBalance: "0.00",
        APP_VERSION: "1.0.0.3",
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        overlayStyle: "background: rgba(255, 255, 255, 0.9)",
        showTabbar: !0,
        systemOptions: {
            hasRedPacket: !0,
            isGiftCard: !0,
            hasDistributionCenter: !1
        },
        giftcardNum: "",
        showPhone: !1,
        score:0
    },
    personInfo: function (e) { //跳转个人信息
      wx.navigateTo({
        url: '/pages/mallModule/member/memberInfo/memberInfo',
      })
    },
    handleLoginStatus: function(e) {
        20 !== e.code && wx.showToast({
            title: e.message,
            icon: "none",
            duration: 2e3
        });
    },
    onLoad: function(e) {     
     
      var that = this;   
      if(wx.getStorageSync("wxtoken")!=""){
        app.geuserMessage();
        var user = wx.getStorageSync('user');
        var user_money = user.user_money;
        var score = wx.getStorageSync('score');
        that.setData({
          user:wx.getStorageSync("user"),
          score: score,
          user_money: user_money
        })

      }              
        // f.editTabbar();
        var t = this;
        if (this.setData({
            // serviceTel: f.globalData.servicePhone
        }), t.options.mobile && "" != t.options.mobile && void 0 != t.options.mobile) {
            var a = t.options.mobile;
            try {
                wx.setStorageSync("wj_sharingId", a);
            } catch (e) {}
        }
        var n = {
            hasRedPacket: !0,
            isGiftCard: !0,
            hasDistributionCenter: !1
        };
        f.globalData.configureInfo.forEach(function(e) {
            "hasRedPacket" === e.key && e.value ? n.hasRedPacket = e.value : "isGiftCard" === e.key && e.value && (n.isGiftCard = e.value);
        }), this.setData({
            systemOptions: n
        }), this.getSharePictures();
    },

    coupon:function(){
             var that=this;
           server.getJSON('/User/coupon/type/' + 0 + '/wxtoken/' + wx.getStorageSync('wxtoken'), function(res) {
               
                var num=res.data.result.list.length;
              
                 that.setData({
                     couponNum:num,
                });

           })
    },






    getUserInfoNologin: function(e) {
        var t = this;
        h.login(e).then(function(e) {
             e.member ? t.setData({
                isMember: !0
            }) : l.toAuthorize();
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toVip: function() {
        l.toVip();
    },
    toModifyPassword: function() {
        l.toCheckMobile();
    },
    getUserInfo: function(e) { //点击登录

        var that  = this;
      var openid = app.globalData.openid;
  
        // console.log(e)
      //此处授权得到userInfo
        var userInfo = e.detail.userInfo;
        var avatarUrl = userInfo.avatarUrl;
        var nickName = userInfo.nickName;
  
        that.setData({
          userInfo: userInfo,
          nickName: nickName,
          avatarUrl: avatarUrl,
        });
        wx.request({
          url: imgurl + '/LoginApi/new_login',
          data: {
            oauth: 'wxxcx',
            nickname: userInfo.nickName,
            head_pic: userInfo.avatarUrl,  
            openid:openid          
          },
          method: 'POST',
          success: function (res) {
       
            if (res.data.status == 1) {
              if (res.data.code == 200) {
                
              } else if (res.data.code == 100) {
                // app.globalData.login = true;//登录成功
                wx.setStorageSync('app_send_user_id', res.data.user_id);
                wx.setStorageSync('wxtoken', res.data.result.wxtoken);//緩存--wxtoken       
                
                wx.showToast({
                  title: '登录成功',
                  duration: 3000
                })
                that.userInfo();
                app.globalData.user_id = res.data.user_id
                // wx.switchTab({
                //   url: '../../mine/mine',
                // })
              }
            }
          }
        })

        // var t = this, o = this;
        // wx.setStorage({
        //     key: "wj_userInfo",
        //     data: e.detail.userInfo
        // }), n.login().then(function(t) {
        //     c.setUser(t), f.globalData.userInfo = t, t.member ? (o.setData({
        //         member: a({}, o.data.member, t.member, {
        //             nickName: t.member.nickName ? t.member.nickName : t.wxaUser.nickName
        //         }),
        //         isMember: !0,
        //         userInfo: a({}, e.detail.userInfo),
        //         hasUserInfo: !0
        //     }), wx.setStorage({
        //         key: "wj_member",
        //         data: t.member
        //     }), o.getOrderStatusCount(), o.getMemberInfo()) : (o.setData({
        //         isMember: !1,
        //         userInfo: e.detail.userInfo,
        //         hasUserInfo: !0,
        //         member: {
        //             couponNum: "*"
        //         }
        //     }), l.toAuthorize()), o.handlePageSkip();
        // }).catch(function(e) {
        //     console.log(e);
        //     var a = e.message;
        //     t.setData({
        //         isMember: !1,
        //         hasUserInfo: !1
        //     }), a.indexOf("meet frequency limit") > -1 ? wx.showToast({
        //         title: "登陆超时，请小憩片刻再来登陆吧~",
        //         icon: "none",
        //         duration: 2e3
        //     }) : a.indexOf("auth deny") > -1 ? wx.showToast({
        //         title: "授权失败，请点击头像重新登录~",
        //         icon: "none",
        //         duration: 2e3
        //     }) : wx.showToast({
        //         title: "登陆失败，请点击头像重新登录~",
        //         icon: "none",
        //         duration: 2e3
        //     });
        // });
    },

 userInfo: function () {
        var that = this;
        server.getJSON('/User/userinfo/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
           
            if (res.data.status == 1) {
              var sendPrice = Number(res.data.result.dispatching.value);
              wx.setStorageSync('sendPrice', sendPrice)
                var info = res.data.result.info;             
                that.setData({
                    user           : info,
                    nickname       : info.nickname,
                    head_pic       : info.head_pic,
                    couponNum      : info.coupon_count,
                    score          : info.pay_points,
                    user_money     : info.user_money,
                    user_cash      : info.user_cash,
                    waitPay        : info.waitPay,
                    waitSend       : info.waitSend,
                    waitReceive    : info.waitReceive,
                    return_count   : info.return_count,
                    uncomment_count: info.uncomment_count,
                    identity       : info.identity,
                    partner        : info.partner,
                    levelimg       : info.levelimg,
                    login          : true,
                    onteam         : info.onteam,
                    serviceTel     : res.data.result.phone.value
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

phoneCall: function (e) { //拨打电话
  var phone = app.globalData.servicePhone;
    wx.showModal({
    title:'将拨打电话'+phone,
    success:function(res){
        if(res.confirm){
            wx.makePhoneCall({
            phoneNumber: phone,
                success() {
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





















    checkAuth: function(e) {
        var t = this;
        return !!f.globalData.userInfo || (wx.showModal({
            title: "提示",
            content: "请同意授权获取用户信息",
            success: function(a) {
                a.confirm ? (console.log("用户点击确定"), t.getUserInfo(e)) : a.cancel && console.log("用户点击取消");
            }
        }), !1);
    },
    getMemberInfo: function() {
        this.queryCoupon(), this.queryScore(), this.queryBalance();
    },
    onReady: function() {},
    onShow: function() {
         this.userInfo();
         app.getOpenId();
        var e = c.getUser(), t = this;
        if (f.globalData.userInfo) if (!0 === t.data.hasUserInfo && t.data.member.mobile) t.setData({
            member: a({}, t.data.member, e.member, {
                nickName: e.member.nickName ? e.member.nickName : e.wxaUser.nickName
            }),
            userInfo: a({}, e.wxaUser)
        }), t.getOrderStatusCount(), t.getMemberInfo(), t.handelRedPacketBalance(); else if (f.globalData.userInfo.member) {
            // if (!e.member) return this.setData({
            //     loading: !1
            // }), void wx.showToast({
            //     title: "您还未授权，请点击头像授权",
            //     icon: "none",
            //     duration: 2e3
            // });
            t.setData({
                member: a({}, t.data.member, e.member, {
                    nickName: e.member.nickName ? e.member.nickName : e.wxaUser.nickName
                }),
                userInfo: e.wxaUser,
                hasUserInfo: !0,
                isMember: !0
            }), t.getOrderStatusCount(), t.getMemberInfo(), t.handelRedPacketBalance();
        } else this.setData({
            isMember: !1,
            userInfo: a({}, e.wxaUser),
            member: a({}, t.data.member, {
                nickName: e.wxaUser.nickName
            })
        }), wx.showToast({
            title: "您还不是会员，请绑定手机号成为会员",
            icon: "none",
            duration: 2e3
        }); else t.setData({
            hasUserInfo: !1,
            isMember: !1,
            loading: !1,
            userInfo: {},
            member: {}
        });
         this.coupon();
    },
    toScoreOrder: function() { //积分订单
      var wxtoken = wx.getStorageSync('wxtoken');
      if (wxtoken) {
        l.toScoreOrder();
        // (this.data.isMember ? l.toScoreOrder() : l.toAuthorize());
      }else {
        wx.showToast({
          title: '请先登录哦~',
          icon: "none",
          duration: 2e3
        })
      }
    },
    toStoreOrder: function () { //到店订单
      var wxtoken = wx.getStorageSync('wxtoken');
      if (wxtoken) {
        l.toStoreOrder();
      } else {
        wx.showToast({
          title: '请先登录哦~',
          icon: "none",
          duration: 2e3
        })
      }
        // this.data.hasUserInfo && (this.data.isMember ? l.toStoreOrder() : l.toAuthorize());
    },
    queryGiftCard: function() {
        var e = this;
        m.setHideLoading(!0), u.queryMyGiftCard(this.data.member.id, "ACTIVED").then(function(t) {
            t && e.setData({
                giftcardNum: t.length
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    queryScore: function() {
        var e = this;
        m.setHideLoading(!0), i.getBalance(this.data.member.mobile).then(function(t) {
            console.log(t), e.setData({
                memberScoreBalance: t
            });
        }).catch(function(t) {
            e.setData({
                memberRight: !1
            }), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    queryBalance: function() {
        var e = this;
        m.setHideLoading(!0), i.getMbrBalance().then(function(t) {
            e.setData({
                loading: !1
            }), t && e.setData({
                reserveBalance: t.toFixed(2)
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), e.setData({
                loading: !1
            });
        });
    },
    queryCoupon: function() {
        var e = this;
        m.setHideLoading(!0), r.getMbrUnUseCouponCount().then(function(t) {
            var n = e.data.member;
            n = a({}, n, {
                couponNum: t
            }), e.setData({
                member: n
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    getOrderStatusCount: function() {
        var e = this;
        m.setHideLoading(!0), o.getStatusCount().then(function(t) {
            e.setData({
                unSelftakeNum: t.find(function(e) {
                    return "PENDING" === e.status;
                }).num,
                unGroupNum: t.find(function(e) {
                    return "PAID" === e.status;
                }).num,
                sendingNum: t.find(function(e) {
                    return "SHIPPED" === e.status;
                }).num,
                unEvaluateNum: t.find(function(e) {
                    return "RECEIVED" === e.status;
                }).num,
                waitPayBalance: t.find(function(e) {
                    return "WAITPAYBALANCE" === e.status;
                }).num,
                rejectedNum: t.find(function(e) {
                    return "REJECTED" === e.status;
                }).num,
                unPayNum: t.find(function(e) {
                    return "CREATED" === e.status;
                }).num
            });
        }).catch(function(e) {
            // "Access Token没有设置" != e.message && that.handleLoginStatus(e);
        });
    },
    handelRedPacketBalance: function() {
        var e = this;
        s.getBalance().then(function(t) {
         e.setData({
                redPacketBalance: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this.data.sharePictures;
        return f.globalData.userInfo && f.globalData.userInfo.member ? {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/member/my/my?mobile=" + f.globalData.userInfo.member.id,
            imageUrl: e,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        } : {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/member/my/my",
            imageUrl: e,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    getSharePictures: function() {
        f.globalData.sharePictures && this.setData({
            sharePictures: f.globalData.sharePictures
        });
    },
    toMemberInfo: function() { //点击登录

        // f.globalData.userInfo.member ? l.toMemberInfo() : wx.showToast({
        //     title: "您还不是会员，请绑定手机号成为会员",
        //     icon: "none",
        //     duration: 2e3
        // });
    },
    toMyDistribution: function() {
        this.data.hasUserInfo && l.toMyDistribution();
    },
  toCoupon: function () { //优惠券
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toMyCoupon();
    };
    // this.data.hasUserInfo && l.toMyCoupon();
  },
  toScoreMall: function () { //积分商城
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toScoreMall();
    };
    // this.data.hasUserInfo && l.toScoreMall();
  },
  toCouponCenter: function () { //优惠券中心
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toCouponCenter();
    };
    // this.data.hasUserInfo && l.toCouponCenter();
  },
  toScore: function () { //我的积分
    // this.data.hasUserInfo && l.toScoreDetails();
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toScoreDetails();
    }
  },
  toRedPacket: function () { //我的红包
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toRedPacket();
    }
    // this.data.hasUserInfo && l.toRedPacket();
  }
}, e(t, "toRedPacket", function() {
    wx.navigateTo({
        url: "../redPacket/redPacket"
    });
  }), e(t, "toRecharge", function () { //钱包余额
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toRecharge();
    };
  }),

   e(t, "toAddress", function () { //收货地址
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toAddressList();
    };


    
}), e(t, "toSystem", function() {
    l.toSystem();
}), e(t, "toInvite", function() {
    this.data.hasUserInfo && l.toInvite();
}), e(t, "toMemberCard", function(e) {
    try {
        wx.setStorageSync("wj_wxa_formId", e.detail.formId);
    } catch (e) {}
    l.toMemberCard();
  }), e(t, "toGoodsComment", function () { //我的评价
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken) {
          l.toGoodsComment("?form=my");
    } else {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    };
}), e(t, "toGiftCardCenter", function() {
    this.data.hasUserInfo && l.toGiftCardCenter();
}), e(t, "toMyGiftCard", function() {
    this.data.hasUserInfo && l.toBuyHistory();
  }), e(t, "toCustomerService", function () { }), e(t, "toAllOrder", function () { //查看全部订单
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      l.toOrderList();
    };
}), e(t, "toBalance", function() {
    this.data.hasUserInfo && l.toBalance();
}), e(t, "toFeedback", function() {
    l.toFeedback();
  }), e(t, "toOrderMenu", function (e) { //五个订单状态
    var wxtoken = wx.getStorageSync('wxtoken');
    if (wxtoken == '' || wxtoken == undefined) {
      wx.showToast({
        title: '请先登录哦~',
        icon: "none",
        duration: 2e3
      })
    } else {
      var t = "?selected=" + e.currentTarget.dataset.inx;
      l.toOrderList(t);
    };
}), e(t, "toWaitPayedTailOrder", function() {
    l.toOrderList("?type=payedTail");
}), e(t, "handlePageSkip", function() {
    try {
        var e = wx.getStorageSync("wj_pageUrl");
        e && ( wx.navigateTo({
            url: e
        })), wx.removeStorageSync("wj_pageUrl");
    } catch (e) {}
}), e(t, "handelRedPacketBalance", function() {
    var e = this;
    s.getBalance().then(function(t) {
      e.setData({
            redPacketBalance: t
        });
    }).catch(function(e) {
        wx.showToast({
            title: e.message,
            icon: "none",
            duration: 2e3
        });
    });
}), e(t, "recorderPopup", function() {
    this.toggleBottomPopup();
}), e(t, "toggleBottomPopup", function() {
    this.toggle("middle");
}), e(t, "toggle", function(t) {
    var a;
    this.setData((a = {}, e(a, "show." + t, !this.data.show[t]), e(a, "overlayStyle", this.data.overlayStyle), 
    a));
}), e(t, "handleUserLogin", function() {
    console.log(f.globalData.userInfo);
    var e = this;
    if (f.globalData.userInfo) {
        var t = f.globalData.userInfo;
        this.setData({
            userInfo: a({}, t.wxaUser)
        }), f.globalData.userInfo.member ? (e.setData({
            member: a({}, e.data.member, t.member, {
                nickName: t.member.nickName ? t.member.nickName : t.wxaUser.nickName
            }),
            hasUserInfo: !0,
            isMember: !0
        }), e.getOrderStatusCount(), e.getMemberInfo()) : this.setData({
            isMember: !1,
            member: a({}, e.data.member, {
                nickName: t.wxaUser.nickName
            })
        });
    }
}), e(t, "handleTabbar", function(e) {
    console.log(e.detail), e.detail.showTabbar, this.setData({
        showTabbar: e.detail.showTabbar
    });
}), e(t, "handlePopupPhone", function() {
    f.globalData.userInfo.member ? this.setData({
        showPhone: !1
    }) : this.setData({
        showPhone: !0
    });
}), e(t, "handleBindPhone", function(e) {
    !0 === e.detail.bindMobile && this.handlePopupPhone();
}), t));