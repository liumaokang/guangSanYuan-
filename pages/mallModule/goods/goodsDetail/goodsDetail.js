var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
var WxParse = require('../../../../wxParse/wxParse.js');
function e(e) {
  if (Array.isArray(e)) {
    for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
    return a;
  }
  return Array.from(e);
}

function t(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var a = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t];
    for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
  }
  return e;
}, 
// o = require("../../../../api/productService.js"), 
i = require("../../../../api/shopcartService.js"), n = require("../../../../api/teamBuyService.js"), r = require("../../../../api/memberService.js"), s = require("../../../../utils/utils.js"), c = s.getPx, l = require("../../../../api/storeService.js"), d = require("../../../../api/seckillService.js"), u = (require("../../../../api/wxaUserService.js"),
  require("../../../../api/advanceSellService.js")), m = require("../../../../api/commentService.js"), h = require("../../../../utils/auth.js"), p = require("../../../../api/request.js"), g = require("../../../../utils/navPage.js"), f = require("../../../../utils/address.js"), T = require("../../../../utils/fly.js"), v = require("../../../../utils/authorize.js"), I = getApp();
  var server=h = require("../../../../utils/server.js");
  var app=getApp();



Page({
  data: {
    id: '',
    goods_type: '', // 0-普通 1-团购  2-限时抢购 3-预售
    url: url,
    imgurl: imgurl,
    productPictures: [],
    name: "",
    goodsLabels: [],
    description: "",
    grabDescribe: "",
    labels: [],
    productProperties: [],
    soldCount: "",
    sellPrice: "",
    hide:true,
    originalPrice: "",
    productDetails: [],
    isTeam: !1,
    addresss:'请选择门店',
    cantGroupModel: !1,
    teamBuyList: [],
    countDownList: [],
    teamBuyTimeList: [],
    teamLeaderPrice: "",
    teamMemberPrice: "",
    teamLeaderRecordId: "",
    teamMemberCount: 0,
    goodsList: [],
    commentListCount: 0,
    storeProductState: "ON",
    shopCartNum: "0",
    balance: "999",
    secKillInfo: {},
    isSecKill: !1,
    time: {},
    hasUserInfo: !1,
    isMember: !1,
    advanceSell: !1,
    advanceSellInfo: {},
    storeId: "",
    activityId: "",
    frontPrice: "",
    advanceSellTime: {},
    endTime: "",
    modal: !1,
    productNum: 1,
    groupModal: !1,
    groupInfo: {},
    goodScore: "0",
    exchangeScores: "2000",
    groupSharePicture: "",
    countDownTime: {},
    specifications: "",
    memberLimit: 9999,
    timeId: 0,
    groupTimeId: 0,
    groupListTime: 0,
    secKillTime: 0,
    orderNumber: 0,
    current: 1,
    goodType: "normal",
    scoreInfo: {},
    member: {},
    score: 0,
    groupNumber: "零",
    commissionTotal: 0,
    phone: !1,
    orderSelfScope: "",
    teamBuyingType: "COMMON",
    x: 0,
    y: 0,
    scale: 2,
    homeBack: !1,
    showSharePop: !0,
    animationData: {},
    showPoster: !1,
    isCateringMeals: !1,
    meals: {
      show: !1,
      productId: "",
      storeId: ""
    },
    hide_good_box: !0,
    animation: {},
    time_h:0,
    time_m:0,
    time_s:0,
    shopCart: {},
    shopCartGoodsId: [],
    commentList: [],
    list: [],
    team:[],
    team_id:0,
    user:[],
    pickup_id:0,
    saleid:0,
    team_id:0,
    addnum:0
  },
  toHome: function () {
    g.toHome();
  },
  toShopCart: function () { //前去购物车
    // g.toShopcart("", !1);
    if (wx.getStorageSync('wxtoken')) {
      wx.reLaunch({
        url: '/pages/mallModule/goods/shopcart/shopcart',
      })
    } else {
      wx.showToast({
        title: '您还未登录哦~',
        icon: 'none',
        duration: 1000
      })
    }
  },
  openshadow:function(){
    this.setData({
      hide:false
    })
  },
  closepopup: function () {
    var that = this;
    that.setData({
      hide: true
    })
  },
  swiperChange: function (e) {
    this.setData({
      current: e.detail.current + 1
    });
  },
  checkQualification: function () {
    var e = this, t = {
      activityId: e.data.activityId,
      productId: e.options.productId,
      storeId: e.data.storeId
    };
    console.log(t), d.checkQualification(t).then(function (e) {
      console.log(e);
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  getMemberScore: function () {
    var e = this;
    I.globalData.userInfo && I.globalData.userInfo.member && (this.setData({
      member: I.globalData.userInfo.member,
      isMember: !0
    }), r.getBalance(e.data.member.mobile).then(function (t) {
      console.log(t), e.setData({
        score: t
      });
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    }));
  },
  getGoodsDetails: function (e, t, a) {
    var o = this;
    if (console.log(e, t, a), t) {
      if ("normal" === a ? (console.log("----------普通商品----------"), o.getDetails(e, t),
        o.getProductsComment(t)) : "group" === a ? (o.setData({
          goodType: "group"
        }), console.log("----------团购商品----------"), o.getTeamBuyGoodsDetails(e, t)) : "secondkill" === a ? (o.setData({
          goodType: "secondkill"
        }), console.log("----------抢购商品----------"), o.getSecKillGoodsDetails(o.options.activityId, t, e),
          o.getProductsComment(t)) : "advanceSell" === a ? (o.setData({
            goodType: "advanceSell"
          }), console.log("----------预售商品----------", o.options), o.getAdvanceSellDetails(o.options.advanceId, t),
            o.getProductsComment(t)) : "score" === a ? (o.setData({
              goodType: "score"
            }), o.getDetails(e, t), o.getProductsComment(t), o.getMemberScore()) : o.getDetails(e, t),
        o.options.mobile && "" != o.options.mobile && void 0 != o.options.mobile) {
        var i = o.options.mobile;
        try {
          wx.setStorageSync("wj_sharingId", i);
        } catch (e) { }
      }
      I.globalData.userInfo && I.globalData.userInfo.member && this.queryShopcart();
    }
  },
  recordVisitStore: function (e) {
    r.visitStore(e).then(function (e) {
      console.log(e);
    }).catch(function (e) {
      console.log(e.message);
    });
  },
  flashTime: function (e) { //倒计时
    var that = this
    var over_time_nk = e;
    console.log(over_time_nk)
    var totalSecond = over_time_nk;
    var interval = setInterval(function () {
      var second = totalSecond;
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      // console.log(dayStr + '-' + hrStr + '-' + minStr + '-' + secStr)
      that.setData({
        time_d: dayStr,
        time_h: hrStr,
        time_m: minStr,
        time_s: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        that.setData({
          time_d: '00',
          time_h: '00',
          time_m: '00',
          time_s: '00',
        });
      }
    }.bind(this), 1000);
  },

  pintuan: function (e) {
    console.log(e)
    let that=this
    wx.request({
      url: imgurl + '/LoginApi/group_goods?id=' + e+ '&wxtoken=' + wx.getStorageSync('wxtoken'),
      success(res) {
       
        var data = res.data;
        var list = data.list;
        var share = data.share;
        var team = data.team;   
        console.log(list);
        that.setData({
          team:list,
          teamBuyList:team
          // time_d: list.cha.day,
          // time_h: list.cha.hour,
          // time_m: list.cha.min,
          // time_s: list.cha.sec,
        });
        if(that.data.goods_type==1){
           that.flashTime(list.miao);
        }
       
      }

    });
    
  },
  onLoad: function (e) {
    console.log(e)
    var that = this;
    var team_id = e.team_id;  
    var id=e.goodsid;

    
    var goods_type = e.goods_type; // 0-普通 1-团购  2-限时抢购 3-预售
  
    var wxtoken = wx.getStorageSync('wxtoken')
    if(goods_type==1){
       this.pintuan(team_id);
    }
    // 限时抢购商品
  var saleid=e.saleid;
    that.setData({
      id:id,
      goods_type: goods_type,
      team_id:team_id,
      saleid:saleid
    });

    wx.request({
      url: imgurl + '/Goods/goodsInfo?id=' + id + '&wxtoken=' + wxtoken+'&saleid='+that.data.saleid+'&team_id='+team_id,
      success(res) {
        console.log('商品详情');
        console.log(res.data)
        var data = res.data.result;
        var list = data.list;
        console.log(list)
        var img = data.img;
        var collect = data.collect;
        var commentStatistics = data.commentStatistics;
        var commentrate = data.commentrate;
        var filter_spec = data.filter_spec;
        var goods_images_nk = data.goods_images_nk;
        var goods_type = data.goods_type;
        var identity = data.identity;
        var info = data.info;
        var is_show = data.is_show;
        var spec_goods_price = data.spec_goods_price;
        var address = res.data.result.pick_up;
        console.log(address[0].pickup_id)
        that.setData({
          img: img,
          goods_images_nk: goods_images_nk,
          end_time: list.end_time,
          start_time:list.start_time,
          commentnum: commentStatistics.c0,
          address:address,
          addresss:address[0].pickup_address,
          pickup_id:address[0].pickup_id
        });

        if(that.data.goods_type==0 || that.data.goods_type==4 || that.data.goods_type==2 || that.data.goods_type==1){
           that.setData({
             list: list,
           })
        }

       
        if(that.data.goods_type==2){
           that.flashTime(list.end_time);
        }
       

        WxParse.wxParse('article', 'html', that.data.list.goods_content, that, 5);
      }

    });
    // console.log(e)
    if (e.scene) {
      var t = decodeURIComponent(e.scene);
      if (t.indexOf(",") > 0) {
        var a = t.split(",");
        e.productId = a[0], this.options.productId = a[0], "sec" === a[1] ? (e.type = "secondkill",
          this.options.type = "secondkill", this.options.activityId = a[2]) : (e.type = a[1],
            this.options.type = a[1]);
      }
    }
    1 === getCurrentPages().length && this.setData({
      homeBack: !0
    });
    var o = this;
    // o.getMemberUserInfo(), o.checkMobile();
    try {
      wx.getStorage({
        key: "wj_member",
        success: function (e) {
          return o.setData({
            teamLeaderRecordId: e.data.id
          }), e.data.id;
        }
      });
    } catch (e) {
      console.log(e.message);
    }
    I.globalData.storeInfo ? (o.setData({
      storeId: I.globalData.storeInfo.id
    }), o.getGoodsDetails(I.globalData.storeInfo.id, e.productId, e.type)) : f.getLocation().then(function (t) {
      console.log(t.id)
      I.globalData.storeInfo = t, o.setData({
        storeId: t.id
      }), o.getGoodsDetails(t.id, e.productId, e.type);
    }).catch(function (e) {
      console.log(e);
    });
  },
  onReady: function () { },
  onShow: function () {
    // this.checkUserInfo();
    this.userInfo();
     this.getCartNum();
     this.address();
  },


  radioChange: function (e) {
    console.log(e);
    var that = this;
    that.setData({
      addresss: e.detail.value
    })
  },

   radio:function(e){
        var that=this
        var pickup_id=e.currentTarget.dataset.id;
        console.log('pickup_id');
        console.log(pickup_id);

        that.setData({pickup_id:pickup_id})
    },





  selected: function () {
    var that = this;
    that.setData({
      hide: false
    })
  },  
  onHide: function () { },
  onUnload: function () {
    clearTimeout(this.data.groupTimeId), clearTimeout(this.data.groupListTime), clearTimeout(this.data.secKillTime),
      clearTimeout(this.data.timeId);
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    var e = this;
    // this.handleSharePopCancel();
    var t = this.data.sharePicture;
    t = e.data.secKillInfo.sharePicture ? e.data.secKillInfo.sharePicture.replace("http://", "https://") : "" !== e.data.groupSharePicture ? e.data.groupSharePicture.replace("http://", "https://") : e.data.productPictures[0].url.replace("http://", "https://");
    var a = this.data.sellPrice + "元-" + this.data.name + ">>快来购买";
    if (e.data.isTeam ? a = this.data.teamLeaderPrice + "元-" + this.data.shareName + ">>快来购买" : e.data.isSecKill && (a = this.data.secKillInfo.price + "元-" + this.data.name + ">>快来购买"),
      I.globalData.userInfo && I.globalData.userInfo.member) {
      var o = I.globalData.userInfo.member.id, i = getCurrentPages(), n = i[i.length - 1], r = n.route, s = n.options, c = r + "?mobile=" + o;
      for (var l in s) if (s.hasOwnProperty(l)) {
        var d = s[l];
        "mobile" !== l && (c = c + "&" + l + "=" + d);
      }
      return console.log("分享的path信息：", s), {
        title: a,
        path: c,
        imageUrl: t,
        success: function (e) {
          wx.showShareMenu({
            withShareTicket: !0
          });
        }
      };
    }
    return {
      title: "鲜丰水果，新鲜才好吃！",
      imageUrl: t,
      success: function (e) {
        wx.showShareMenu({
          withShareTicket: !0
        });
      }
    };
  },
  getSharePictures: function () {
    I.globalData.sharePictures && this.setData({
      sharePictures: I.globalData.sharePictures
    });
  },
  addShopcartCatch: function (e) {
    console.log(e)//, this.addShopCartData = e;
  },
  addShopCarts: function (e) { //加入购物车
    console.log('加入购物车');
    var t = this;
    var that = this;
    var wxtoken = wx.getStorageSync('wxtoken')
    var list = that.data.list;
    console.log(list)
    var goodsId = list.goods_id;
    // var suppliers_id = list.suppliers_id;
    // var item_id = that.data.item_id;
    // var goods_type = that.data.goods_type;
    // var identity = that.data.identity;
    // var goods_num = that.data.goods_num;
    var goods_type=that.data.goods_type
    var saleid=that.data.saleid
    console.log(saleid);
    if (wxtoken != '') {
      wx.request({
        url: imgurl + '/Cart/ajaxAddCart?goods_id=' + goodsId + '&goods_num=1' + '&wxtoken=' + wxtoken+'&team_id='+that.data.team_id+'&goods_type='+goods_type+'&saleid='+saleid,
        success(res) {
          var data = res.data;
          console.log(data)
          if (data.msg == '成功加入购物车') {
            wx.showToast({
              title: data.msg,
              icon: 'success',
              duration: 1000
            });
            that.setData({
              shopCartNum: data.result
            });
          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2e3
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请先登录哦',
        icon: 'none',
        duration: 1000
      })
    }
    // if (this.checkAuth() && t.data.isMember) if (t.data.isSecKill) {
    //     var a = {
    //         activityId: t.data.activityId,
    //         productId: t.options.productId,
    //         storeId: t.data.storeId
    //     };
    //     t.data.secKillInfo.limitCount;
    //     d.checkQualification(a).then(function(a) {
    //         s.setHideLoading(!0), t.addShopCartNew(e);
    //     }).catch(function(e) {
    //         console.log(e), -99999 !== e.code ? wx.showToast({
    //             title: e.message,
    //             icon: "none",
    //             duration: 2e3
    //         }) : g.toAuthorize();
    //     });
    // } else t.addShopCartNew(e); else g.toAuthorize();
  },
  addShopCartNew: function (e) {
    var t = this;
    if (t.data.balance > 0) {
      console.log(e), t.addShopCartData = e;
      var a = e.detail.target.dataset.id, o = {
        storeId: t.data.storeId,
        lists: [{
          count: 1,
          productId: a
        }]
      };
      "newmbr" === t.data.goodType ? o.lists[0].newmbrActivityId = t.data.goodsDetail.activityId : "secondkill" === t.data.goodType && (o.lists[0].grabActivityId = t.data.activityId),
        I.globalData.userInfo.member ? t.data.isCateringMeals ? t.setData({
          meals: {
            show: !0,
            productId: a,
            storeId: t.data.storeId
          }
        }) : function (a) {
          try {
            wx.setStorageSync("wj_wxa_formId", e.detail.formId);
          } catch (e) { }
          i.cateringAdd(a).then(function (e) {
            console.log(e), s.isHideLoading() || s.setHideLoading(!0), t.queryShopcart(), t.handleTouchOnGoods(t.addShopCartData);
          }).catch(function (e) {
            console.log(e), "newmbr" === t.data.goodType && 39008 === e.code ? wx.showToast({
              title: "您已购买过专享商品~",
              icon: "none",
              duration: 2e3
            }) : wx.showToast({
              title: e.message,
              icon: "none",
              duration: 2e3
            });
          });
        }(o) : g.toAuthorize();
    } else wx.showToast({
      title: "门店库存不足，换家门店试试吧~",
      icon: "none",
      duration: 2e3
    });
  },

    // 购物车商品数量
    getCartNum: function() {
        var that = this;
        var wxtoken = wx.getStorageSync('wxtoken');
        server.getJSON('/Cart/header_cart_list/wxtoken/' + wxtoken, function(res) {
            if (res.data.status == 1) {
                that.setData({
                   shopCartNum: res.data.cartPriceInfo.goods_num
                })
            }
        })
    },





  queryShopcart: function () {
    var e = this;
    i.getProductsCount().then(function (t) {
      wx.hideLoading(), console.log(t);
      var a = t;
      try {
        var o = wx.getStorageSync("wj_distributionStore");
        o ? i.getCatering(o.id).then(function (t) {
          console.log(t), s.isHideLoading() && s.setHideLoading(!1);
          var o = 0;
          t.items && t.items.length > 0 && t.items.forEach(function (e) {
            o += e.productNum;
          }), e.setData({
            shopCartNum: a - o
          });
        }).catch(function (t) {
          e.setData({
            shopCartNum: a
          }), s.isHideLoading() && s.setHideLoading(!1);
        }) : (l.getDistributionStore().then(function (t) {
          console.log(t), t && (wx.setStorage({
            key: "wj_distributionStore",
            data: t
          }), i.getCatering(o.id).then(function (t) {
            console.log(t);
            var o = 0;
            t.items && t.items.length > 0 && t.items.forEach(function (e) {
              o += e.productNum;
            }), e.setData({
              shopCartNum: a - o
            }), s.isHideLoading() && s.setHideLoading(!1);
          }).catch(function (t) {
            e.setData({
              shopCartNum: a
            }), s.isHideLoading() && s.setHideLoading(!1);
          }));
        }), e.setData({
          shopCartNum: a
        }));
      } catch (e) { }
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  hideTel: function (e) {
    var t = /^(\d{3})\d{4}(\d{4})$/;
    return e = e.replace(t, "$1****$2");
  },
  handleToTeamBuying: function (e) {
    var t = "?teamBuyId=" + e.target.dataset.teambuyid + "&teamLeaderRecordId=" + e.target.dataset.teamleaderrecordid;
    g.toGroupPurchase(t);
  },
  toAllTeamList: function () {
    var e = "?goodsId=" + this.data.goodsId + "&storeId=" + this.data.storeId + "&teamBuyId=" + this.options.productId + "&balance=" + this.data.balance + "&sellPrice=" + this.data.sellPrice;
    g.toTeamList(e);
  },
  clickBlank: function (e) {
    console.log('fsdgfdgvdfgbbfgbfgb')
    "goods" === e.currentTarget.dataset.type ? this.setData({
      modal: !1
    }) : "group" === e.currentTarget.dataset.type && this.setData({
      groupModal: !1
    });
  },
  clickBody: function () {
    console.log("eeeeeeee");
  },
  clickBody2: function () {
    console.log("eeeeeeee2");
  },
  handleReduce: function (e) {
    var t = this, a = t.data.productNum;
    a > 1 && (a-- , t.setData({
      productNum: a
    }));
  },
  handleAdd: function (e) {
    var t = this, a = t.data.productNum, o = t.data.memberLimit, i = t.data.orderNumber;
    t.data.name;
    a < t.data.balance ? t.data.advanceSell ? a < o ? (a++ , t.setData({
      productNum: a
    })) : wx.showToast({
      title: "该商品预售活动最多只能购买" + o + "件~",
      icon: "none",
      duration: 2e3
    }) : t.data.isTeam && (a < i ? (a++ , t.setData({
      productNum: a
    })) : wx.showToast({
      title: "该商品团购活动最多只能购买" + i + "件~",
      icon: "none",
      duration: 2e3
    })) : wx.showToast({
      title: "我们只有这么多了~",
      icon: "none",
      duration: 2e3
    });
  },
  handleInput: function (e) {
    var t = this, a = 999, o = e.detail.value, i = t.data.balance;
    t.data.advanceSell ? a = t.data.memberLimit : t.data.isTeam && (a = t.data.orderNumber),
      o < i ? o < a ? t.setData({
        productNum: o
      }) : (t.setData({
        productNum: a
      }), t.data.isTeam ? wx.showToast({
        title: "该商品团购活动最多只能购买" + a + "件~",
        icon: "none",
        duration: 2e3
      }) : wx.showToast({
        title: "该商品预售活动最多只能购买" + a + "件~",
        icon: "none",
        duration: 2e3
      })) : o < a ? (this.setData({
        productNum: i
      }), wx.showToast({
        title: "我们只有这么多了~",
        icon: "none",
        duration: 2e3
      })) : i < a ? (this.setData({
        productNum: i
      }), wx.showToast({
        title: "我们只有这么多了~",
        icon: "none",
        duration: 2e3
      })) : (this.setData({
        productNum: a
      }), t.data.isTeam ? wx.showToast({
        title: "该商品团购活动最多只能购买" + a + "件~",
        icon: "none",
        duration: 2e3
      }) : wx.showToast({
        title: "该商品预售活动最多只能购买" + a + "件~",
        icon: "none",
        duration: 2e3
      }));
  },
  scoreExchange: function (e) {
    var t = this, o = t.data.scoreInfo;
    if (console.log(o), t.data.balance > 0) if (t.data.score >= o.exchangeScores) {
      try {
        var i = {
          allPrice: o.sellPrice,
          storeId: this.data.storeId,
          goodsList: [],
          orderType: "scoreMall",
          score: o.exchangeScores,
          scource: "BUYNOW"
        }, n = a({}, o, {
          productId: o.id,
          productNum: 1,
          sellPrice: o.sellPrice
        });
        i.goodsList.push(n), wx.setStorageSync("wj_shopcart", i);
      } catch (e) {
        console.log(e);
      }
      I.globalData.userInfo.member ? g.toPerfectOrder() : g.toAuthorize();
    } else wx.showToast({
      title: "积分不足",
      icon: "none",
      duration: 2e3
    }); else wx.showToast({
      title: "您来晚了，商品已售空",
      icon: "none",
      duration: 2e3
    });
  },
  handleNext: function () {
    var e = this;
    I.globalData.userInfo && (I.globalData.userInfo.member ? e.setData({
      modal: !0
    }) : g.toAuthorize());
  },
  joinThousandGroup: function () {
    var e = this, t = this.data.teamBuyList;
    if (t.length > 0) {
      var o = [];
      (o = [].concat(t)).sort(function (e) {
        return function (t, a) {
          var o = t[e];
          return a[e] - o;
        };
      }("overplusJoinCount"));
      var i = o[0], n = e.data.groupInfo;
      n = a({}, n, {
        teamLeaderRecordId: i.teamLeaderRecordId
      }), e.setData({
        groupInfo: n
      }), this.data.balance > 0 ? this.joinGroup() : wx.showToast({
        title: "门店正在补货中，去看看别的吧~",
        icon: "none"
      });
    } else wx.showToast({
      title: "没有进行中的团购活动~",
      icon: "none"
    });
  },
  closeCantGroupModel: function () {
    this.setData({
      cantGroupModel: !1
    });
  },
  openTeamBuyModal: function (e) {
    function t() {
      if (a.data.balance > 0) {
        var t = e.currentTarget.dataset.teambuyid, o = e.currentTarget.dataset.teamleaderrecordid;
        a.getOpenTeamBuyData(t, o);
      } else wx.showToast({
        title: "门店正在补货中，去看看别的吧~",
        icon: "none"
      });
    }
    var a = this;
    "OLDBELTNEW" != this.data.teamBuyingType ? t() : r.isNewMbr().then(function (e) {
      console.log("新用户：", e), e ? t() : a.setData({
        cantGroupModel: !0
      });
    }).catch(function (e) {
      a.closeCantGroupModel(), wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  getOpenTeamBuyData: function (e, t) {
    var o = this, i = this;
    n.getDetails(e, t).then(function (e) {
      console.log(e);
      var t = a({}, e, {
        teamLeaderPrice: e.teamLeaderPrice ? e.teamLeaderPrice : e.teamMemberPrice,
        joinMemberCount: e.joinMemberCount,
        teamMemberCount: e.teamMemberCount,
        joinPeopleCount: e.joinMemberCount > 12 ? 12 : e.joinMemberCount,
        teamPeopleCount: e.teamMemberCount > 12 ? 12 : e.teamMemberCount,
        leaderImageUrl: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png",
        teamMemberImageUrl: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png",
        teamBuyEnd: !1
      }), n = [];
      if (e.joinMbrs.length > 0) {
        if ("THOUSAND" !== e.teamBuyingType && "匿名" !== e.mobile) {
          var r = {
            avatar: e.avatar ? e.avatar : "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png"
          };
          n.push(r);
        }
        e.joinMbrs.forEach(function (e) {
          var t = a({}, e, {
            avatar: e.avatar ? e.avatar : "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png"
          });
          e.mobile && n.push(t);
        });
      } else if (1 === e.joinMemberCount) {
        var c = {
          avatar: e.avatar ? e.avatar : "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png"
        };
        n.push(c);
      }
      t = a({}, t, {
        joinMbrs: n
      }), i.setData({
        groupInfo: t
      });
      var l = new Date(), d = new Date().getTime(), u = 0;
      if (i.data.groupInfo.openTeamTime ? u = new Date(i.data.groupInfo.openTeamTime.replace(/-/g, "/")).getTime() : (u = d,
        i.setData({
          openTeamTime: s.formatTime(l).replace(/\//g, "-")
        })), (d - u) / 1e3 >= i.data.groupInfo.duration) {
        var m = a({}, t, {
          teamBuyEnd: !0
        });
        i.setData({
          groupInfo: m
        });
      }
      if (!1 === i.data.groupInfo.teamBuyEnd) {
        var h = [], p = {
          openTeamTime: o.data.groupInfo.openTeamTime,
          duration: o.data.groupInfo.duration
        };
        h.push(p), o.setData({
          teamBuyTimeList: h
        }), clearTimeout(i.data.timeId), function e() {
          if (clearTimeout(i.data.timeId), i.setData({
            countDownTime: s.countDown(h)[0]
          }), "00" == i.data.countDownTime.hou && "00" == i.data.countDownTime.min && "00" == i.data.countDownTime.sec) {
            var o = a({}, t, {
              teamBuyEnd: !0
            });
            i.setData({
              groupInfo: o
            });
          }
          var n = setTimeout(function () {
            e(h);
          }, 1e3);
          i.setData({
            timeId: n
          });
        }();
      }
    }), this.setData({
      groupModal: !0
    });
  },
  joinGroup: function () {
    var e = this;
    if (this.checkAuth()) {
      var t = [];
      t.push(e.data.groupInfo.productDetails);
      var o = {
        allPrice: e.data.groupInfo.teamMemberPrice,
        storeId: e.data.storeId,
        storeName: e.data.storeName,
        goodsList: [],
        teamBuyId: e.data.groupInfo.id,
        teamLeaderRecordId: e.data.groupInfo.teamLeaderRecordId,
        orderType: "group",
        teamBuyInfo: {
          endTime: e.data.groupInfo.endTime,
          orderSelfScope: e.data.groupInfo.orderSelfScope,
          selfStartTime: e.data.groupInfo.selfStartTime,
          selfEndTime: e.data.groupInfo.selfEndTime
        },
        scource: "BUYNOW"
      };
      t.forEach(function (t) {
        t = a({}, t, {
          productId: t.id,
          productNum: 1,
          sellPrice: e.data.sellPrice
        }), console.log(t), o.goodsList.push(t);
      }), wx.setStorageSync("wj_shopcart", o), e.data.teamMemberCount - e.data.joinMemberCount == 0 || (I.globalData.userInfo.member ? g.toPerfectOrder() : g.toAuthorize());
    }
  },


  toPayTeamBuying: function (e) {
        console.log(e);
        var type=e.currentTarget.dataset.type;
        var id=e.currentTarget.dataset.id;
         var team_id=this.data.team_id;
         console.log(e.currentTarget.dataset);
         console.log('team_id');
         console.log(team_id);
     wx.navigateTo({
       url: '../../../mallModule/order/perfectOrder/perfectOrder?goods_type='+type+'&id='+id+'&team_id='+team_id,
     })
      
  },


  toPaySecKill: function (e) {
    var t = this, o = this;
    if (0 !== o.data.secKillInfo.availableStockAmount) {
      var i = {
        activityId: o.data.activityId,
        productId: o.options.productId,
        storeId: o.data.storeId
      };
      this.checkAuth() && o.data.isMember ? d.checkQualification(i).then(function (e) {
        if (console.log(e), o.data.balance > 0) if (o.data.secKillInfo.availableStockAmount > 0) {
          try {
            var i = {
              allPrice: t.data.secKillInfo.price,
              storeId: t.data.storeId,
              goodsList: [],
              orderType: "secondkill",
              scource: "BUYNOW"
            };
            t.data.goodsList.forEach(function (e) {
              e = a({}, e, {
                productId: e.id,
                productNum: 1,
                sellPrice: t.data.secKillInfo.price,
                activityId: t.data.activityId
              }), i.goodsList.push(e);
            }), wx.setStorageSync("wj_shopcart", i);
          } catch (e) { }
          g.toPerfectOrder();
        } else wx.showToast({
          title: "您来晚了，已经被抢光了~",
          icon: "none",
          duration: 2e3
        }); else wx.showToast({
          title: "门店正在努力补货中~",
          icon: "none",
          duration: 2e3
        });
      }).catch(function (e) {
        wx.showToast({
          title: e.message,
          icon: "none",
          duration: 2e3
        });
      }) : g.toAuthorize();
    }
  },
  checkMobile: function () {
    var e = this;
    wx.getStorage({
      key: "wj_member",
      success: function (t) {
        e.setData({
          hasUserInfo: !0
        });
      },
      fail: function (t) {
        t && e.setData({
          hasUserInfo: !1
        });
      }
    });
  },
  checkAuthStatus: function () {
    return !!I.globalData.userInfo;
  },
  // checkAuth: function () {
  //   var e = this;
  //   return !!I.globalData.userInfo || (wx.showModal({
  //     title: "提示",
  //     content: "请同意授权获取用户信息",
  //     success: function (t) {
  //       if (t.confirm) {
  //         console.log("用户点击确定");
  //         try {
  //           var a = "../../goods/goodsDetail/goodsDetail?productId=" + e.options.productId + "&type=" + e.options.type;
  //           e.options.activityId && (a = a + "&goodsList=" + e.options.goodsList + "&timeData=" + e.options.timeData + "&activityId=" + e.options.activityId),
  //             e.options.mobile && (a = a + "&mobile=" + e.options.mobile), wx.setStorageSync("wj_pageUrl", a);
  //         } catch (e) {
  //           console.log(e.message);
  //         }
  //         g.toMy();
  //       } else t.cancel && console.log("用户点击取消");
  //     }
  //   }), !1);
  // },
  getTeamBuyGoodsDetails: function (e, a) {
    var i = this, r = this;
    console.log(e, a), n.getGoodsDetails(a).then(function (n) {
      if (console.log("==========>", n), n) {
        var c, l = [];
        l.push(n.productDetails), i.setData((c = {
          isTeam: !0,
          teamLeaderPrice: n.teamLeaderPrice ? n.teamLeaderPrice : n.teamMemberPrice,
          teamMemberPrice: n.teamMemberPrice,
          teamMemberCount: n.teamMemberCount,
          goodsList: l,
          name: n.productDetails.name,
          shareName: n.name,
          balance: n.productDetails.balance ? n.productDetails.balance : 999,
          description: n.productDetails.description ? n.productDetails.description : "",
          shareDescription: n.description,
          teamBuyingType: n.teamBuyingType,
          soldCount: n.productDetails.soldCount,
          originalPrice: n.productDetails.originalPrice ? n.productDetails.originalPrice : "",
          labels: n.productDetails.labels,
          productProperties: n.productDetails.productProperties,
          productDetails: n.productDetails.productDetails,
          productPictures: n.productDetails.productPictures.map(function (e) {
            return e.url += "?x-oss-process=image/resize,h_500/quality,Q_95", e;
          }),
          imageUrl: n.productDetails.imageUrl,
          goodsId: n.productDetails.id,
          endTime: n.endTime,
          storeProductState: n.storeProductState,
          orderNumber: n.teamMemberJoinCount ? n.teamMemberJoinCount : 999,
          groupNumber: s.numberConversion.numberToChinese(n.teamMemberCount),
          orderSelfScope: n.orderSelfScope,
          selfStartTime: n.selfStartTime ? n.selfStartTime : "",
          selfEndTime: n.selfEndTime ? n.selfEndTime : ""
        }, t(c, "teamBuyingType", n.teamBuyingType), t(c, "groupSharePicture", n.sharePicture ? n.sharePicture : ""),
          c)), "THOUSAND" === n.teamBuyingType && i.setData({
            groupInfo: n
          }), "CATERING" === n.productDetails.business && "MEALS" == n.productDetails.style && r.setData({
            isCateringMeals: !0
          });
        var d = n.startTime, u = n.endTime, m = new Date(d.replace(/-/g, "/")).getTime(), h = (new Date(u.replace(/-/g, "/")).getTime() - m) / 1e3, p = [];
        p.push({
          openTeamTime: d,
          duration: h
        }), function e() {
          clearTimeout(r.data.groupTimeId), r.setData({
            groupTime: s.countDownDay(p)[0]
          });
          var t = setTimeout(function () {
            e(p);
          }, 1e3);
          r.setData({
            groupTimeId: t
          });
        }();
        var g = n.productDetails.id;
        r.getProductsComment(g), o.getDetails(r.data.storeId, g).then(function (e) {
          if (console.log(e), r.setData({
            balance: e.balance,
            sellPrice: e.sellPrice
          }), e.productProperties.length > 0) for (var t = 0; t < e.productProperties.length; t++) {
            var a = e.productProperties[t];
            if ("规格" === a.propertyName) {
              r.setData({
                specifications: a.propertyValue
              });
              break;
            }
          }
        }), r.getTeamBuyInfo(e, g, a);
      } else r.getDetails(e, a);
    }).catch(function (e) {
      /已下架|不存在/gi.test(e.message) ? wx.showModal({
        title: "提示",
        content: "当前商品活动已结束",
        showCancel: !1,
        success: function (e) {
          wx.navigateBack();
        }
      }) : wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  getTeamBuyInfo: function (t, o, i) {
    var r = this, c = this;
    n.getOpenTeamBuyings(t, o, i).then(function (t) {
      if ("" != t) {
        var o = function (e, t) {
          for (var a = e.length, o = 0; o < a; o++) if (e[o] == t) return 0 == o ? (e.shift(),
            e) : o == a - 1 ? (e.pop(), e) : (e.splice(o, 1), e);
        }, i = [];
        t.forEach(function (t) {
          if ("STARTED" === t.teamBuyingStatus) {
            var o = {
              teamBuyId: t.id,
              teamLeaderRecordId: t.teamLeaderRecordId,
              headPortrait: t.avatar ? t.avatar : "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png",
              creatorName: t.creatorName ? t.creatorName : "",
              mobile: r.hideTel(t.mobile),
              openTeamTime: t.openTeamTime,
              duration: t.duration,
              joinMemberCount: t.joinMemberCount,
              status: t.status,
              teamLeaderPrice: t.teamLeaderPrice,
              teamMemberCount: t.teamMemberCount,
              overplusJoinCount: t.teamMemberCount - t.joinMemberCount,
              teamMemberJoinCount: t.teamMemberJoinCount,
              teamMemberPrice: t.teamMemberPrice
            }, n = null;
            n = "匿名" != t.mobile && t.avatar ? t.avatar : "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorDefault.png",
              o = a({}, o, {
                headPortrait: n,
                members: [n].concat(e(t.joinMbrs.filter(function (e, t) {
                  return t < 1;
                }).map(function (e) {
                  return e.avatar;
                })))
              }), t.joinMbrs.length >= 2 && o.members.push("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/avatorOther.png"),
              t.joinMemberCount >= 0 && t.joinMemberCount < t.teamMemberCount && i.push(o);
          }
        }), r.setData({
          teamBuyList: i
        });
        var n = [];
        r.data.teamBuyList.forEach(function (e) {
          var t = {
            openTeamTime: e.openTeamTime,
            duration: e.duration,
            id: e.teamLeaderRecordId
          };
          n.push(t);
        }), r.setData({
          teamBuyTimeList: n
        }), function e() {
          if (clearTimeout(c.data.groupListTime), c.data.teamBuyList.length > 0) {
            var t = c.data.teamBuyTimeList, a = s.countDown(n), i = 0, r = c.data.teamBuyList, l = [], d = [], u = !1;
            a.forEach(function (e) {
              r[i].time = e, i++;
            }), r.forEach(function (e, a) {
              if (0 == e.time.hou && 0 == e.time.min && 0 == e.time.sec) for (var i = 0; i < t.length; i++) {
                var n = t[i];
                if (n.id === e.teamLeaderRecordId) {
                  d = o(t, n), u = !0;
                  break;
                }
              } else l.push(e);
            }), u && (n = d, c.setData({
              teamBuyList: l,
              teamBuyTimeList: d
            })), c.setData({
              teamBuyList: l
            });
            var m = setTimeout(function () {
              e();
            }, 1e3);
            c.setData({
              groupListTime: m
            });
          }
        }();
      }
    }).catch(function (e) {
      console.log(e.message);
    });
  },
  getDetails: function (e, t) { //获取商品信息
    var a = this, i = this;
    o.getDetails(e, t).then(function (e) {
      if (e) {
        var n = [];
        if (n.push(e), a.setData({
          goodsList: n,
          name: e.name,
          balance: e.balance,
          description: e.description ? e.description : "",
          soldCount: e.soldCount,
          sellPrice: e.sellPrice ? e.sellPrice : "",
          originalPrice: e.originalPrice ? e.originalPrice : "",
          labels: e.labels,
          productProperties: e.productProperties,
          productDetails: e.productDetails,
          productPictures: e.productPictures.map(function (e) {
            return e.url += "?x-oss-process=image/resize,h_500/quality,Q_95", e;
          }),
          goodsId: e.id,
          commissionTotal: e.backCashRate ? parseFloat(e.sellPrice * e.backCashRate).toFixed(2) : 0
        }), "SCORE" === e.business ? a.setData({
          scoreInfo: e
        }) : "CATERING" === e.business && "MEALS" == e.style && "normal" == i.data.goodType && i.setData({
          isCateringMeals: !0
        }), "DISTRIBUTION" === e.business && l.getDistributionStore().then(function (e) {
          return console.log(e), o.getDetails(e.id, i.options.productId);
        }).then(function (e) {
          console.log(e), e && i.setData({
            balance: e.balance
          });
        }).catch(function (e) {
          console.log(e);
        }), "secondkill" === i.options.type && i.options.goodsList) {
          var r = JSON.parse(i.options.goodsList);
          console.log(r), r.forEach(function (a) {
            if (t === a.productId) {
              var o = a.availableStockAmount, n = e.balance;
              n < o ? i.setData({
                balance: n
              }) : i.setData({
                balance: o
              });
            }
          });
        }
        if (e.productProperties.length > 0) for (var s = 0; s < e.productProperties.length; s++) {
          var c = e.productProperties[s];
          if ("规格" === c.propertyName) {
            i.setData({
              specifications: c.propertyValue
            });
            break;
          }
        }
        var d = [];
        if (e.labels.length > 0) for (var u = 0; u < e.labels.length; u++) {
          var m = e.labels[u];
          "PROMOTIONLABEL" === m.type && d.push(m);
        }
        if (i.setData({
          goodsLabels: d
        }), "newmbr" === i.options.type && i.options.goodsDetail) {
          var h = JSON.parse(i.options.goodsDetail);
          i.setData({
            goodsDetail: h,
            sellPrice: h.price,
            goodType: "newmbr"
          });
        }
      }
    });
  },
  getNearestStore: function (e, t, a) {
    var o = [];
    e.forEach(function (e) {
      var i = s.distance(t, a, e.latitude, e.longitude);
      o.push(i);
    });
    for (var i = Math.min.apply(Math, o), n = 0, r = 0; r < o.length; r++) if (i === o[r]) {
      n = r;
      break;
    }
    return this.setData({
      storeId: e[n].id
    }), n;
  },
  getSecKillGoodsDetails: function (e, t, a) {
    var o = this;
    o.getDetails(a, t), d.getActivityStoreProduct(e, t, a).then(function (e) {
      console.log(e), o.setData({
        activityId: e.activityId,
        grabDescribe: e.product.grabDescribe || ""
      });
      var i = e.product, n = {
        startTime: e.startTime,
        endTime: e.endTime
      };
      o.getSecKillInfo(a, t, i, n);
    }).catch(function (e) {
      console.log(e);
    });
  },
  getSecKillList: function (e, t) {
    console.log(this.options);
    var a = this;
    a.getDetails(e, t);
    var o = [];
    if (a.options.goodsList && (o = JSON.parse(a.options.goodsList)), o.length > 0) {
      console.log(o);
      var i = null, n = null;
      o.forEach(function (e) {
        t === e.productId && (i = e, n = e.activityId, a.setData({
          activityId: e.activityId
        }));
      });
      var r = {
        page: 1,
        pageSize: 0,
        stateIn: "STARTED",
        storeIdEquals: e
      };
      d.query(r).then(function (o) {
        for (var r = "", s = 0; s < o.records.length; s++) if ("" != n) for (var c = 0; c < o.records.length; c++) {
          var l = o.records[c];
          l.id === n && (r = {
            startTime: l.startTime,
            endTime: l.endTime
          });
        }
        a.getSecKillInfo(e, t, i, r);
      });
    } else {
      var s = {
        page: 1,
        pageSize: 0,
        stateIn: "STARTED",
        storeIdEquals: e
      };
      d.query(s).then(function (o) {
        console.log(o);
        for (var i = "", n = "", r = "", s = 0; s < o.records.length; s++) {
          for (var c = 0; c < o.records[s].products.length; c++) {
            var l = o.records[s].products[c];
            l.productId == t && (console.log(l), r = l, i = l.activityId, a.setData({
              activityId: i
            }));
          }
          if ("" != i) for (var d = 0; d < o.records.length; d++) {
            var u = o.records[d];
            u.id === i && (n = {
              startTime: u.startTime,
              endTime: u.endTime
            });
          }
        }
        console.log(n), console.log(r), "" !== n && "" !== r && a.getSecKillInfo(e, t, r, n);
      }).catch(function (e) {
        console.log(e.message);
      });
    }
  },
  getSecKillInfo: function (e, t, o, i) {
    function n() {
      clearTimeout(r.data.secKillTime);
      var e = s.countDown(g);
      if (r.setData({
        time: {
          hour: e[0].hou,
          minute: e[0].min,
          second: e[0].sec
        },
        isSecKill: !0
      }), "00" == r.data.time.hour && "00" == r.data.time.minute && "00" == r.data.time.second) {
        var t = a({}, r.data.secKillInfo, {
          secKillStatus: "end"
        });
        r.setData({
          secKillInfo: t
        });
      }
      var o = setTimeout(function () {
        n();
      }, 1e3);
      r.setData({
        secKillTime: o
      });
    }
    var r = this;
    console.log(r.options);
    r.checkAuthStatus();
    var c = {}, l = i;
    r.setData({
      secKillInfo: o
    }), console.log(c);
    var d = new Date(l.startTime.replace(/-/g, "/")).getTime(), u = new Date(l.endTime.replace(/-/g, "/")).getTime(), m = (u - d) / 1e3;
    if ((new Date().getTime() - u) / 1e3 >= 0) {
      var h = a({}, r.data.secKillInfo, {
        secKillStatus: "end"
      });
      r.setData({
        secKillInfo: h
      });
    } else {
      var p = a({}, r.data.secKillInfo, {
        secKillStatus: "normal"
      });
      r.setData({
        secKillInfo: p
      });
    }
    var g = [], f = {
      openTeamTime: l.startTime,
      duration: m
    };
    g.push(f), n(), console.log(r.data.secKillInfo);
  },
  getAdvanceSellDetails: function (e, t) {
    var o = this, i = this;
    u.getByIds(e, t).then(function (t) {
      function n(e) {
        var t = e.split(" ")[0].split("-");
        return t[1] + "月" + t[2] + "日";
      }
      var r = a({}, t, {
        advanceAmount: t.advanceAmount ? t.advanceAmount : 999,
        advanceId: e
      }), c = t.balancePrice;
      i.setData({
        advanceSell: !0,
        balance: t.advanceAmount ? t.advanceAmount : 999,
        sellPrice: t.sellPrice,
        frontPrice: t.frontPrice
      });
      var l = [];
      l.push(t.product), o.setData({
        goodsList: l,
        name: t.product.name,
        description: t.product.description ? t.product.description : "",
        labels: t.product.labels,
        productProperties: t.product.productProperties,
        productDetails: t.product.productDetails,
        productPictures: t.product.productPictures.map(function (e) {
          return e.url += "?x-oss-process=image/resize,h_500/quality,Q_95", e;
        }),
        originalPrice: t.product.originalPrice,
        soldCount: t.product.soldCount,
        goodsId: t.product.id,
        imageUrl: t.product.imageUrl ? t.product.imageUrl : "",
        memberLimit: t.memberLimit ? t.memberLimit : 9999
      });
      var d = n(r.frontStartTime), u = n(r.frontEndTime), m = "", h = "", p = "";
      if ("PARTIAL" === r.payType) {
        m = n(r.balanceStartTime), h = n(r.balanceEndTime);
        var g = new Date(r.balanceEndTime.replace(/-/g, "/")).getTime();
        p = n(s.formatTime(function (e, t) {
          return new Date(1e3 * (e / 1e3 + 86400 * t));
        }(g, r.deliveryTime)).replace(/\//g, "-"));
      } else r = a({}, r, {
        balancePrice: 0
      }), c = 0;
      console.log(d, u, m, h), i.setData({
        advanceSellInfo: r,
        advanceSellTime: {
          frontStartTime: d,
          frontEndTime: u,
          balanceStartTime: m,
          balanceEndTime: h,
          deliverDate: p,
          deliverTime: r.deliveryTime
        },
        balancePrice: c
      });
    });
  },
  toPayAdvanceSell: function () {
    var e = this, t = this;
    if (0 !== t.data.advanceSellInfo.advanceAmount) {
      if (this.checkAuth() && "" != t.data.productNum && 0 != t.data.productNum) {
        try {
          var o = {
            allPrice: (this.data.advanceSellInfo.frontPrice * t.data.productNum).toFixed(2),
            storeId: this.data.storeId,
            goodsList: [],
            orderType: "advanceSell",
            balanceEndTime: t.data.advanceSellInfo.balanceEndTime,
            deliveryTime: t.data.advanceSellInfo.deliveryTime,
            payType: t.data.advanceSellInfo.payType,
            shipmentType: t.data.advanceSellInfo.shipmentType,
            scource: "BUYNOW"
          }, i = this.data.goodsList;
          console.log(this.data.goodsList), i.forEach(function (i) {
            i = a({}, i, {
              productId: i.id,
              productNum: t.data.productNum,
              advanceId: t.data.advanceSellInfo.advanceId,
              balanceTotal: t.data.advanceSellInfo.balancePrice,
              sellPrice: e.data.advanceSellInfo.frontPrice
            }), o.goodsList.push(i);
          }), wx.setStorageSync("wj_shopcart", o);
        } catch (e) { }
        I.globalData.userInfo.member ? g.toPerfectOrder() : g.toAuthorize();
      }
    } else wx.showToast({
      title: "您来晚了，已经卖完了~",
      icon: "none",
      duration: 2e3
    });
  },
  getMemberUserInfo: function () {
    var e = this;
    if (I.globalData.userInfo) try {
      var t = h.getTokens();
      if (new Date().getTime() < t.refreshExpiresTo) {
        var a = I.globalData.userInfo;
        e.setData({
          userInfo: a.wxaUser,
          hasUserInfo: !0
        });
      } else e.setData({
        hasUserInfo: !1
      });
    } catch (e) { } else wx.showToast({
      title: "您还未授权，请登陆授权",
      icon: "none",
      duration: 2e3
    });
  },
  handleUserLogin: function () {
    var e = this;
    if (I.globalData.userInfo) {
      var t = I.globalData.userInfo;
      this.setData({
        userInfo: a({}, t.wxaUser)
      }), I.globalData.userInfo.member ? e.setData({
        hasUserInfo: !0
      }) : e.setData({
        userInfo: t.wxaUser,
        hasUserInfo: !0
      });
    }
  },
  handleTabbar: function (e) {
    e.detail.showTabbar, this.setData({
      showTabbar: e.detail.showTabbar
    });
  },
  handlePopupPhone: function () {
    I.globalData.userInfo.member ? this.setData({
      phone: !1
    }) : this.setData({
      phone: !0
    });
  },
  handleBindPhone: function (e) {
    !0 === e.detail.bindMobile && this.handlePopupPhone();
  },
  handleClickShare: function (e) {
    this.setData({
      showSharePop: !1
    });
    var t = wx.createAnimation({
      duration: 300
    });
    t.translateY(-200).step(), this.setData({
      animationData: t
    });
  },
  catchSharePopCancel: function () { },
  handleSharePopCancel: function (e) {

    var t = wx.createAnimation({
      duration: 300
    });
    t.translateY(0).step(), this.setData({
      animationData: t
    }), setTimeout(function () {
      this.setData({
        showSharePop: !0
      });
    }.bind(this), 300);
  },
  handleShareTimeline: function (e) { //生成分享图
    function t(e, t, a, o, n) {
      return new Promise(function (r, s) {
        console.log(e)
        console.log(t)
        console.log(a)
        wx.getImageInfo({ //获取图片
          src: e,
          success: function (e) {
            i.drawImage(e.path, 0, 0, e.width, e.height, c(t), c(a), c(o), c(n)), i.draw(!0),
              r();
          },
          fail: function (e) {
            s("图片获取失败");
          }
        });
      });
    }
    var a = this, o = this, i = wx.createCanvasContext("pictureQRCanvas");
    this.setData({
      showPoster: !0
    }), this.handleSharePopCancel(), wx.showLoading({
      title: "生成中。。",
      mask: !0
    }), t("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/share_bg.png", 0, 0, 540, 890).then(function (e) {
      i.setFillStyle("#999999"), i.font = "normal 20px sans-serif", i.setFontSize(c(20)),
        i.fillText("长按识别图中“鲜丰水果”小程序", c(40), c(772)), i.draw(!0), t("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/share_logo.png", 40, 787, 280, 40).then(function (e) {
          i.draw(!0);
        }).catch(function (e) {
          wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
            title: "生成分享图失败请重试",
            icon: "none",
            duration: 2e3
          });
        });
      var n = "";

      n = o.data.secKillInfo.sharePicture ? o.data.secKillInfo.sharePicture.replace("http://", "https://") : "" !== o.data.groupSharePicture ? o.data.groupSharePicture.replace("http://", "https://") : o.data.productPictures[0].url.replace("http://", "https://");
      var r = 390;
      (o.data.isSecKill || o.data.isTeam || o.data.advanceSell) && (r = 480), t(n, 30, 30, 480, r).then(function (e) {
        if (o.data.isSecKill || o.data.isTeam || o.data.advanceSell) {
          i.setFillStyle("#333333"), i.font = "bold 20px sans-serif", i.setFontSize(c(40));
          var n = void 0;
          n = o.data.isTeam ? o.data.shareName.length > 12 ? o.data.shareName.slice(0, 12) + "..." : o.data.shareName : o.data.name.length > 12 ? o.data.name.slice(0, 12) + "..." : o.data.name,
            i.setTextAlign("center"), i.fillText(n, c(540) / 2, c(590)), i.setFillStyle("#999999"),
            i.font = "normal 12px sans-serif", i.setFontSize(c(24));
          var r = void 0;
          r = o.data.isTeam ? o.data.shareDescription.length > 16 ? o.data.shareDescription.slice(0, 16) + "..." : o.data.shareDescription : o.data.description.length > 16 ? o.data.description.slice(0, 16) + "..." : o.data.description,
            i.fillText(r, c(540) / 2, c(636)), i.draw(!0);
        } else {
          i.setFillStyle("#333333"), i.font = "bold 20px sans-serif", i.setFontSize(c(40)),
            i.setTextAlign("center");
          var s = o.data.name.length > 12 ? o.data.name.slice(0, 12) + "..." : o.data.name;
          i.fillText(s, c(540) / 2, c(506)), i.setFillStyle("#999999"), i.font = "normal 12px sans-serif",
            i.setFontSize(c(24));
          var l = o.data.description.length > 16 ? o.data.description.slice(0, 16) + "..." : o.data.description;
          i.fillText(l, c(540) / 2, c(544)), i.draw(!0);
        }
        var d = p.APP_ID, u = "pages/mallModule/goods/goodsDetail/goodsDetail", m = o.options.productId;
        "secondkill" === o.options.type ? (u = "pages/mallModule/activity/seckill/seckill",
          m = m + "," + o.options.type) : "advanceSell" === o.options.type ? (u = "pages/mallModule/activity/advanceSell/advanceSell",
            m = m + "," + o.options.type) : m = m + "," + o.options.type;
        if (t(p.BASE_URL + "/newretail/api/wxa/qrcode/create?appid=" + d + "&page=" + u + "&scene=" + m + "&size=150", 350, 710, 150, 150).then(function (e) {
          wx.hideLoading(), i.draw(!0);
        }).catch(function (e) {
          wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
            title: "生成分享图失败请重试",
            icon: "none",
            duration: 2e3
          });
        }), o.data.isSecKill) t("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/share_skill.png", 30, 397, 480, 113).then(function (e) {
          i.setFillStyle("#ffffff"), i.setTextAlign("left"), i.setTextBaseline("bottom"),
            i.font = "bold 14px sans-serif", i.setFontSize(c(28)), i.fillText("￥", c(50), c(486)),
            i.draw(!0), i.fillText("限时抢购", c(370), c(480)), i.setFontSize(c(56)), i.fillText(o.data.secKillInfo.price, c(75), c(492)),
            i.draw(!0), i.setFontSize(c(24));
          var t = 16 * o.data.secKillInfo.originalPrice.toString().length, a = 28 * o.data.secKillInfo.price.toString().length;
          i.fillText("￥" + o.data.secKillInfo.originalPrice, c(a + 86), c(485)), i.draw(!0),
            i.beginPath(), i.setLineWidth(1), i.moveTo(c(80 + a), c(471)), i.lineTo(c(t + a + 96), c(471)),
            i.setStrokeStyle("white"), i.stroke(), i.draw(!0);
        }).catch(function (e) {
          wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
            title: "生成分享图失败请重试",
            icon: "none",
            duration: 2e3
          });
        }); else if (o.data.isTeam) t("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/shoare_label_group.png", 30, 397, 480, 113).then(function (e) {
          i.setFillStyle("#ffffff"), i.setTextAlign("left"), i.setTextBaseline("bottom"),
            i.font = "bold 14px sans-serif", i.setFontSize(c(28)), i.fillText("￥", c(50), c(486)),
            i.draw(!0), i.fillText(o.data.groupNumber + "人团", c(398), c(480)), i.setFontSize(c(56)),
            i.fillText(o.data.teamLeaderPrice, c(75), c(492));
          var t = 28 * o.data.teamLeaderPrice.toString().length;
          i.draw(!0), i.setFontSize(c(24));
          var a = 16 * o.data.sellPrice.toString().length;
          i.fillText("￥" + o.data.sellPrice, c(86 + t), c(485)), i.draw(!0), i.beginPath(),
            i.setLineWidth(1), i.moveTo(c(80 + t), c(471)), i.lineTo(c(96 + a + t), c(471)),
            i.setStrokeStyle("white"), i.stroke(), i.draw(!0);
        }).catch(function (e) {
          wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
            title: "生成分享图失败请重试",
            icon: "none",
            duration: 2e3
          });
        }); else if (o.data.advanceSell) t("https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/share_advance.png", 30, 397, 480, 113).then(function (e) {
          i.setFillStyle("#ffffff"), i.setTextAlign("left"), i.setTextBaseline("bottom"),
            i.font = "normal 14px sans-serif", i.setFontSize(c(24)), i.fillText("￥", c(50), c(486)),
            i.draw(!0);
          o.data.advanceSellInfo.payType, o.data.advanceSellInfo.frontPrice;
          i.fillText("定金：" + o.data.advanceSellInfo.frontPrice, c(348), c(485)), i.font = "bold 14px sans-serif",
            i.setFontSize(c(56)), i.fillText(o.data.advanceSellInfo.sellPrice, c(75), c(492));
          var t = 28 * o.data.advanceSellInfo.sellPrice.toString().length;
          i.draw(!0), i.font = "normal 14px sans-serif", i.setFontSize(c(24));
          o.data.sellPrice.toString().length;
          i.fillText("预售价", c(86 + t), c(485)), i.draw(!0);
        }).catch(function (e) {
          wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
            title: "生成分享图失败请重试",
            icon: "none",
            duration: 2e3
          });
        }); else {
          i.setFillStyle("#FF4E53"), i.setTextAlign("left"), i.setTextBaseline("bottom"),
            i.font = "bold 14px sans-serif", i.setFontSize(c(28)), i.fillText("￥", c(152), c(630)),
            i.draw(!0), i.setFontSize(c(56)), i.fillText(o.data.sellPrice, c(178), c(637)),
            i.draw(!0);
          var h = 28 * o.data.sellPrice.toString().length;
          i.setFillStyle("#999999"), i.setFontSize(c(24));
          var g = 16 * o.data.originalPrice.toString().length;
          i.fillText("￥" + o.data.originalPrice, c(h + 184), c(630)), i.draw(!0), i.beginPath(),
            i.setLineWidth(1), i.moveTo(c(182 + h), c(619)), i.lineTo(c(189 + h + g), c(619)),
            i.setStrokeStyle("#999999"), i.stroke(), i.draw(!0);
        }
      }).catch(function (e) {
        wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
          title: "生成分享图失败请重试",
          icon: "none",
          duration: 2e3
        });
      });
    }).catch(function (e) {
      wx.hideLoading(), a.handlePosterCancel(), wx.showToast({
        title: "生成分享图失败请重试",
        icon: "none",
        duration: 2e3
      });
    });
  },
  handleSaveToImg: function (e) {
    var t = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: c(540),
      height: c(890),
      destWidth: 1080,
      destHeight: 1780,
      fileType: "jpg",
      quality: 1,
      canvasId: "pictureQRCanvas",
      success: function (e) {
        wx.saveImageToPhotosAlbum({
          filePath: e.tempFilePath,
          success: function (e) {
            t.setData({
              showPoster: !1
            }), wx.showToast({
              title: "已保存到手机相册"
            });
          }
        });
      }
    });
  },
  handlePosterCancel: function (e) {
    this.setData({
      showPoster: !1
    });
  },
  preventTouchMove: function (e) { },
  chooseOutcome: function (e) {
    !0 === e.detail.outcome && (this.setData({
      meals: {
        show: !1,
        productId: "",
        storeId: ""
      }
    }), this.handleTouchOnGoods(this.addShopCartData));
  },
  getShopCart: function (e) {
    var t = this;
    if (I.globalData.userInfo && I.globalData.userInfo.member) {
      i.getCatering(e).then(function (e) {
        var a = {}, o = [];
        e.items && e.items.length > 0 && e.items.forEach(function (e) {
          if (!e.grabActivityId && !e.newmbrActivityId) {
            for (var t = -1, i = 0; i < o.length; i++) e.productId == o[i] && (t = i);
            t > -1 ? a[e.productId] = a[e.productId] + e.productNum : (a[e.productId] = e.productNum,
              o.push(e.productId));
          }
        }), t.setData({
          shopCart: a,
          shopCartGoodsId: o
        });
        var i = {
          goodsId: o,
          items: a
        };
        try {
          wx.setStorageSync("wj_shopCartStorage", i);
        } catch (e) { }
      }).catch(function (e) {
        wx.showToast({
          title: e.message,
          icon: "none",
          duration: 2e3
        });
      });
      var a = wx.getStorageSync("wj_userProductsCount"), o = String(a);
      o && I.setTabBarBadge("shopping_cart", o), i.getProductsCount().then(function (e) {
        I.setTabBarBadge("shopping_cart", String(e));
        try {
          wx.setStorageSync("wj_userProductsCount", e);
        } catch (e) { }
      }).catch(function (e) {
        wx.showToast({
          title: e.message,
          icon: "none",
          duration: 2e3
        });
      });
    }
  },
  addLocalGoods: function (e) {
    try {
      var t = wx.getStorageSync("wj_shopCartStorage"), a = wx.getStorageSync("wj_userProductsCount");
      if (a = Number(a), a++ , a = String(a), I.setTabBarBadge("shopping_cart", a), t) {
        var o = t.goodsId, i = t.items, n = [], r = e, s = -1;
        if (o.length > 0) for (var c = 0; c < o.length; c++) n.push(o[c]), r == o[c] && (s = c);
        s > -1 ? i[r] = Number(i[r]) + 1 : (n.push(r), i[r] = 1), this.setData({
          shopCart: i,
          shopCartGoodsId: n
        });
        var l = {
          goodsId: n,
          items: i
        };
        wx.setStorageSync("wj_shopCartStorage", l);
      }
      wx.setStorageSync("wj_userProductsCount", a);
    } catch (e) { }
  },
  reduceLocalGoods: function (e) {
    try {
      var t = wx.getStorageSync("wj_shopCartStorage"), a = wx.getStorageSync("wj_userProductsCount");
      if (a = Number(a), a-- , a = String(a), I.setTabBarBadge("shopping_cart", a), t) {
        var o = t.goodsId, i = t.items, n = [], r = e, s = -1;
        if (o.length > 0) for (var c = 0; c < o.length; c++) n.push(o[c]), r == o[c] && (s = c);
        s > -1 && (i[r] = Number(i[r]) - 1, i[r] <= 0 && n.splice(s, 1)), this.setData({
          shopCart: i,
          shopCartGoodsId: n
        });
        var l = {
          goodsId: n,
          items: i
        };
        wx.setStorageSync("wj_shopCartStorage", l);
      }
      wx.setStorageSync("wj_userProductsCount", a);
    } catch (e) { }
  },
  handleTouchOnGoods: function (e) {
    var t = this, a = this, o = "";
    this.setData({
      goodsBoxImage: ""
    });
    var i = e.detail.target.dataset.addtype, n = {
      clientX: 0,
      clientY: 0,
      force: 1,
      identifier: 0,
      pageX: 0,
      pageY: 0
    }, r = this.data.goodType;
    T.touchOnGoods(i, n, e.detail.target.dataset.id, r).then(function (i) {
      o = a.data.productPictures[a.data.current - 1].url, t.setData({
        goodsBoxImage: o
      });
      var n = i;
      a.setData({
        hide_good_box: !1,
        bus_x: n.finger.x,
        bus_y: n.finger.y
      }), a.setData({
        animation: n.animation
      }), setTimeout(function () {
        a.setData({
          hide_good_box: !0
        }), a.addLocalGoods(e.detail.target.dataset.id);
      }, n.duration);
    });
  },
  getProductsComment: function (e) {
    var t = this, o = {
      page: 1,
      pageSize: 0,
      productId: e,
      status: "NORMAL"
    };
    m.query(o).then(function (e) {
      var o = [];
      e.records && e.records.length > 0 && (e.records.forEach(function (e) {
        var i = a({}, e, {
          mobile: t.hideTel(e.mobile),
          avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wxapp/boy-cm.png"
        });
        e.createTime && (i = a({}, i, {
          time: e.createTime
        })), o.push(i);
      }), t.setData({
        commentListCount: e.records.length,
        commentList: [o[0]]
      }));
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  toGoodsComment: function () {
    var that=this;
      var goods_id=that.data.id;
    wx.navigateTo({
      url:'../../../mallModule/goods/goodsComment/goodsComment?goods_id='+goods_id
    })

  },
  previewImage: function (e) {
    var t = e.currentTarget.dataset.commentid, a = e.currentTarget.dataset.urlid, o = [];
    this.data.commentList.forEach(function (e) {
      e.id === t && e.pictures.forEach(function (e) {
        o.push(e.url);
      });
    }), wx.previewImage({
      current: o[a],
      urls: o
    });
  },
  // checkUserInfo: function () {
  //   I.globalData.userInfo && (this.setData({
  //     hasUserInfo: !0
  //   }), I.globalData.userInfo.member && this.setData({
  //     isMember: !0
  //   }));
  // },

 userInfo: function () {
        var that = this;
        server.getJSON('/User/userinfo/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
            console.log('userInfo')
            console.log(res);
            if (res.data.status == 1) {
                var info = res.data.result.info;             
                that.setData({
                   user:info
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


    // 跳转到订单兑换 未完成
  toAuthorize1: function (e) {
     console.log('立即兑换');
     var that=this
     var goods_type=that.data.goods_type
     var saleid=that.data.saleid
     var  addnum=that.data.addnum
     if(addnum==0){
         // wx.showToast({
         //    title:'请填写收货地址',

         // })
         wx.navigateTo({
            url:"../../../mallModule/member/address/addAddress/addAddress?cart=1"
         })
     }else{
         wx.navigateTo({
           url: '../../../mallModule/order/perfectOrder/perfectOrder?goods_type='+goods_type+'&id='+that.data.list.goods_id+'&saleid='+saleid,
         })
     }
      

    
  },

   //收货地址判断
  address:function(){
    var wxtoken=wx.getStorageSync('wxtoken');
    var that=this
    server.getJSON('/user/address_list/wxtoken/' + wxtoken,function(res){
        console.log('收货地址判断');
        console.log(res);
        var num=res.data.list.length
        that.setData({addnum:num})
    })
  },







    //积分当前页面直接兑换
  toAuthorize: function () {
    var that=this
    var user=that.data.user;
    var address_id=user.address_id
    var pay_points=user.pay_points

    console.log(that.data.pickup_id);

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
                    team_id:0,
                    pay_points:pay_points,
                    total_fee: that.data.shop_price,
                    goods_type:that.data.goods_type,
                    pickup_id:that.data.pickup_id
                },
                method: 'POST',
                success(res) {
                  console.log('res');
                  console.log(res);
                    if (res.data.status == 1) {
                        if (res.data.amount == 0) {
                            wx.showToast({
                                title: '支付成功',
                                duration: 3000,
                                success: function() {
                                    setTimeout(function() {
                                        wx.switchTab({
                                            url: '../../../mallModule/index/index/index',
                                        })
                                    }, 2000) //延迟时间
                                }
                            })
                        } else {
                            wx.navigateTo({
                                url: '../../../mallModule/pay/pay/pay?order_id=' + res.data.id + '&amount=' + res.data.amount + '&payurl=1',
                            })
                        }
                    } else {
                        wx.showToast({
                            title: res.data.msg
                        })
                      wx.navigateTo({
                        url: '../../../mallModule/order/order/order'
                      })
                    }
                  }
            });
  }

  
});