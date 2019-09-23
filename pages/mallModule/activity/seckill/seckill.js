var t = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var a = arguments[e];
    for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
  }
  return t;
},
 e = require("../../../../api/seckillService.js"), 
 a = require("../../../../api/productService.js"),
 o = require("../../../../api/bannerService.js"), i = require("../../../../utils/utils.js"),
  n = require("../../../../utils/navPage.js"), 
 s = require("../../../../utils/address.js"),
  r = getApp();
Page({
  data: function (t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
      value: a,
      flash_sale:[],
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = a, t;
  }({
    tabbar: {},
    showTabbar: !1,
    timeList: [],
    goodsList: [],
    timeLists: [],
    timegoodlist: [],
    firstgoodlist: [],
    yin: false,
    time_h: "00",
    time_m: "00",
    time_s: "00",
    tabSelected: 0,
    time: {
      hour: "",
      minute: "",
      second: ""
    },
    current: 0,
    goodsStatus: "ahead",
    secKillTips: "",
    status: "ahead",
    banners: [],
    secKillTimeId: 0,
    phone: !1,
    x: 750,
    y: 450,
    scale: 2,
    homeBack: !1
  }, "phone", !1),
 
  clickCategory: function (t) {
    var that = this;
    var url = r.globalData.imgurl;
    var index = t.currentTarget.dataset.idx;
    that.setData({
      tabSelected: t.currentTarget.dataset.idx
    });
 

    wx.request({
      url: url + '/Activity/ajax_flash_sale',
      type: "get",
      data: {idx:index},
      success(res) {
      
        var date = res.data.result.flash_sale_goods;
        that.setData({
          goodsStatus: "ahead",
          firstgoodlist:res.data.result.flash_sale_goods,
          status:res.data.goodsstatus,
          goodsStatus:res.data.goodsstatus,
        })

       

      if(date.length>0){
        for (let i = 0; i < date.length; i++) {
          if (i == index) {
            that.setData({
              firstgoodlist: date[index].goodsList
            })
            // 当前这一场的时间
            var t = (date[i].end_time) - (date[i].start_time);
            if (i > 0) {
              // 获取上一场时间
              var t1 = (date[i - 1].end_time) - (date[i - 1].start_time)
              // 判断上一场的时间是否为0，如果为0，则当前这一场开始，上一场计时器开启。否则当前这一场是即将开始状态。
            //   if (t1 != 0) {
            //     that.setData({
            //       goodsStatus: "ahead"
            //     })
            //   }
            // } else {
            //   that.setData({
            //     goodsStatus: "start"
            //   })
            // }
            // if (t == 0) {
            //   that.setData({
            //     goodsStatus: "end"
            //   })
            }

          }
        }
        }

      }
    })
    // var e = t.currentTarget.dataset.idx, a = this.data.timeList;
    // this.setData({
    //     secKillStatus: a[e].secKillStatus,
    //     secKillTips: a[e].secKillTips,
    //     time: {
    //         hour: a[e].countDownTime.hou,
    //         minute: a[e].countDownTime.min,
    //         second: a[e].countDownTime.sec
    //     }
    // });
  },


  
   flash_Goods_Detail: function (e) { //限时抢购
    var goodsid = e.currentTarget.dataset.productid;
    var saleid=e.currentTarget.dataset.saleid
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&&goods_type=2&saleid='+saleid,
    })
  },









  getSecKillList: function (a) {
    var o = this;
    var n = {
      page: 1,
      pageSize: 100,
      stateIn: "STARTED",
      storeIdEquals: a
    };
    e.query(n).then(function (e) {
      var a = [];
      if (e.records.length > 0) {
        e.records.forEach(function (e) {
          var o = e.startTime.split(" "), n = (o.slice(0, 2), new Date().getTime()), s = new Date(e.startTime.replace(/-/g, "/")).getTime(), r = new Date(e.endTime.replace(/-/g, "/")).getTime(), l = new Date(), c = i.formatTime(l).split(" ")[0] + " 00:00:00", u = c.replace(/\//g, "-"), d = n - s, p = (r - s) / 1e3, m = (s - new Date(c).getTime()) / 1e3, h = {
            id: e.id,
            name: e.name,
            startTime: e.startTime,
            endTime: e.endTime,
            time: o[1].slice(0, 5),
            duration: p,
            countDown: d,
            newStartTime: s,
            newEndTime: r,
            products: [],
            storeId: e.storeId,
            // secKillStatus: "started",
            secKillTips: "",
            durationStart: m,
            startDate: u
          };
          e.products.forEach(function (e, a) {
            var o = {
              activityId: e.activityId,
              availableStockAmount: e.availableStockAmount ? e.availableStockAmount : 0,
              balance: e.availableStockAmount ? e.availableStockAmount : 0,
              imageUrl: e.imageUrl,
              sharePicture: e.sharePicture + "?x-oss-process=image/resize,h_250/quality,Q_95",
              limitCount: e.limitCount,
              originalPrice: e.originalPrice,
              price: e.price,
              grabDescribe: e.grabDescribe,
              productDescription: e.productDescription ? e.productDescription : "",
              productId: e.productId,
              productName: e.productName,
              storeId: e.storeId,
              totalStockAmount: e.totalStockAmount ? e.totalStockAmount : 1
            };
            e.availableStockAmount < 0 && (o = t({}, o, {
              availableStockAmount: 0
            }));
            var i = [], n = [], s = [];
            if (e.labels && e.labels.length > 0 && e.labels.forEach(function (t) {
              "GOODSLABEL" === t.type ? n.push(t) : "PROMOTIONLABEL" === t.type && s.push(t);
            }), e.propertys && e.propertys.length > 0) for (var r = 0; r < e.propertys.length; r++) {
              var l = e.propertys[r];
              if ("规格" === l.propertyName) {
                i = l.propertyValue;
                break;
              }
            }
            e.productId, e.storeId;
            var c = {};
            s = s.reduce(function (t, e) {
              return c[e.labelName] || (c[e.labelName] = t.push(e)), t;
            }, []), o = t({}, o, {
              produtlabel: n,
              specifications: i,
              promotions: s
            }), h.products.push(o);
          }), h = s > n ? t({}, h, {
            status: "即将开始",
            active: !1,
            secKillStatus: "ahead",
            secKillTips: "本场尚未开抢"
          }) : n >= r ? t({}, h, {
            status: "本场结束",
            active: !1,
            secKillStatus: "end",
            secKillTips: "本场已结束 快去赶下一场吧！"
          }) : t({}, h, {
            status: "抢购中",
            active: !1,
            secKillTips: "火热抢购ing"
          }), a.push(h);
        }), a.sort(function (t) {
          return function (e, a) {
            return e[t] - a[t];
          };
        }("newStartTime"));
        for (var n = 0, s = (Number.POSITIVE_INFINITY, 0); s < a.length; s++) {
          if ("started" === a[s].secKillStatus) {
            a[s].countDown, n = s;
            break;
          }
          if ("ahead" === a[s].secKillStatus) {
            a[s].countDown, n = s;
            break;
          }
        }
      o.setData({
          // timeList: a,
          goodsList: a[n].products,
          // tabSelected: n,
          secKillTips: a[n].secKillTips,
          secKillStatus: a[n].secKillStatus
        }),  function t() {
          clearTimeout(o.data.secKillTimeId);
          var e = new Date(), n = new Date(i.formatTime(e)).getTime(), s = [];
          a.forEach(function (t) {
            if (n < t.newStartTime) {
              var e = {
                openTeamTime: t.startDate,
                duration: t.durationStart
              };
              s.push(e);
            } else if (n > t.newEndTime) {
              var a = {
                openTeamTime: t.startTime,
                duration: t.duration
              };
              s.push(a);
            } else if (n >= t.newStartTime && n < t.newEndTime) {
              var o = {
                openTeamTime: t.startTime,
                duration: t.duration
              };
              s.push(o);
            }
          });
          // var r = i.countDown(s), l = 0, c = o.data.tabSelected;
          // r.forEach(function(t) {
          //     o.data.timeList[l].countDownTime = t, l++;
          // }), o.setData({
          //     timeList: o.data.timeList
          // }), o.setData({
          //     time: {
          //         hour: o.data.timeList[c].countDownTime.hou,
          //         minute: o.data.timeList[c].countDownTime.min,
          //         second: o.data.timeList[c].countDownTime.sec
          //     }
          // });
          var u = setTimeout(function () {
            t();
          }, 1e3);
          o.setData({
            secKillTimeId: u
          });
        }();
      }
    });
  },
  bannerJumping: function (t) {
    var e = this, a = t.currentTarget.dataset.id, o = null;
    e.data.banners.forEach(function (t) {
      t.id === a && (o = t);
    }),  e.toAdPage(o, "banner");
  },
  toAdPage: function (t, e) {
    if ("APP" === t.linkType) "MIAOSHA" === t.appReturnType ? n.toSeckill() : "RECHARGE" === t.appReturnType ? n.toRecharge() : "MEAL" === t.appReturnType || ("RECEIVECOUPON" === t.appReturnType ? n.toCouponCenter() : "ADVANCE_SELL_PRODUCT" === t.appReturnType ? n.toAdvanceSell() : "TEAM_BUYING" === t.appReturnType ? n.toFightGroup() : "SCOREMALL" === t.appReturnType ? n.toScoreMall() : "INVITE_MEMBER" === t.appReturnType ? n.toInvite() : "MEMBER_CARD" === t.appReturnType ? n.toMemberCard() : "MY_COUPON" === t.appReturnType ? n.toMyCoupon() : "NEWMBR" === t.appReturnType && n.toNewmbrActivity()); else if ("GRADPRODUCT" === t.linkType) {
      var a = "?productId=" + t.productId + "&storeId=" + r.globalData.storeInfo.id + "&activityId=" + t.grabActivityId + "&type=secondkill";
      n.toGoodsDetails(a);
    } else if ("PRODUCT" === t.linkType) {
      var o = "?productId=" + t.productId + "&storeId=" + r.globalData.storeInfo.id + "&type=normal";
      n.toGoodsDetails(o);
    } else if ("TEAMPRODUCT" === t.linkType) {
      var i = "?productId=" + t.teamActivityId + "&storeId=" + r.globalData.storeInfo.id + "&type=group";
      n.toGoodsDetails(i);
    } else if ("COUPONACTIVITYDETAILS" === t.linkType) if (r.globalData.userInfo) if (r.globalData.userInfo.member) {
      var s = "?couponActivityId=" + t.couponActivityId + "&type=assign&isExternal=false";
      n.toCouponDetails(s);
    } else wx.showToast({
      title: "您还不是会员，请绑定手机号成为会员~",
      icon: "none",
      duration: 2e3
    }), setTimeout(function () {
      n.toAuthorize();
    }, 2e3); else n.toAuthorize(); else if ("URL" === t.linkType) {
      var l = null;
      "activity" === e ? l = t.linkUrl : "banner" === e && (l = t.link);
      var c = l;
      l.indexOf("?") > -1 && (c = c + "&storeId=" + this.data.storeId + "&type=normal");
      var u = {
        url: encodeURIComponent(c)
      }, d = "?webUrl=" + JSON.stringify(u);
      n.toAdvertising(d);
    }
  },
  flashTime: function (timeds) {
   
    var that = this;
    var interval = setInterval(function () {
      var second = timeds;
      var hr = Math.floor((second) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      var min = Math.floor((second - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      var sec = second - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      that.setData({
        time_h: hrStr,
        time_m: minStr,
        time_s: secStr,
      });
      timeds--;
      if (timeds < 0) {
        clearInterval(interval);
        that.setData({
          time_h: '00',
          time_m: '00',
          time_s: '00',
        });
      }
    }.bind(this), 1000);
  },
  formatSeconds: function (value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime > 60) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    var result = "" + parseInt(secondTime) + "秒";
    var a = {
      hours: parseInt(hourTime),
      minutes: parseInt(minuteTime),
      seconds: parseInt(secondTime)
    }
    if (minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
      result = "" + parseInt(hourTime) + "小时" + result;
    }
    return a;
  },
  onLoad: function (t) {
    var e = this;
    var arra = [];
    if (wx.getStorageSync('TIME')) {
      var timedd = wx.getStorageSync('TIME')
      // e.flashTime(timedd)
    }
    var url = r.globalData.imgurl;
    e.setData({
      imgurl: r.globalData.url,
      goodsStatus: "ahead"
    })
    // 获取banner图
    wx.request({
      url: 'https://v.coolndns.com/index.php/wxapi/goods/goods_list/' + wx.getStorageSync("wxtoken"),
      type: "get",
      success: function (res) {
        var date = res.data.result.xian;
        e.setData({
          timeLists: date
        })
    
      }
    })
    wx.request({
      url: url + '/Activity/ajax_flash_sale',
      type: "get",
      data: {},
      success(res) {
       
        var date = res.data.result.flash_sale_goods;
      
          e.setData({
            yin: true,
            firstgoodlist:res.data.result.flash_sale_goods,
            tabSelected:res.data.result.xian,
            timeList:res.data.result.timelist,
            status:res.data.goodsstatus,
            goodsStatus:res.data.goodsstatus,

          })


        e.flashTime(res.data.result.cha);
       
      }
    })




    var a = this;
    if (r.globalData.storeInfo ? (a.setData({
      storeId: r.globalData.storeInfo.id
    }), this.getSecKillList(r.globalData.storeInfo.id), this.getBannerList(r.globalData.storeInfo.id)) : s.getLocation().then(function (t) {
      r.globalData.storeInfo = t, a.getSecKillList(t.id), a.getBannerList(t.id);
    }).catch(function (t) {
     
    }), a.options.mobile && "" != a.options.mobile && void 0 != a.options.mobile) {
      var o = a.options.mobile;
      try {
        wx.setStorageSync("wj_sharingId", o);
      } catch (t) { }
    }
    this.getSharePictures(), 1 === getCurrentPages().length && this.setData({
      homeBack: !0
    });
  },
  onReady: function () { },
  onShow: function () {
    var t = "";
    r.globalData.storeInfo && (t = r.globalData.storeInfo.id, this.setData({
      storeId: r.globalData.storeInfo.id
    }), this.getSecKillList(t)), !0 === this.data.phone && this.handlePopupPhone();
  },
  onHide: function () { },
  onUnload: function () {
    clearTimeout(this.data.secKillTimeId);
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    var t = this.data.sharePictures;
    return r.globalData.userInfo && r.globalData.userInfo.member ? {
      title: "鲜丰水果，新鲜才好吃！",
      path: "/pages/mallModule/activity/seckill/seckill?mobile=" + r.globalData.userInfo.member.id,
      imageUrl: t,
      success: function (t) { }
    } : {
        title: "鲜丰水果，新鲜才好吃！",
        path: "/pages/mallModule/activity/seckill/seckill",
        imageUrl: t,
        success: function (t) { }
      };
  },
  getSharePictures: function () {
    r.globalData.sharePictures && this.setData({
      sharePictures: r.globalData.sharePictures
    });
  },
  getNearestStore: function (t, e, a) {
    var o = [];
    t.forEach(function (t) {
      var n = i.distance(e, a, t.latitude, t.longitude);
      o.push(n);
    });
    for (var n = Math.min.apply(Math, o), s = 0, r = 0; r < o.length; r++) if (n === o[r]) {
      s = r;
      break;
    }
    return this.setData({
      store: t[s].name,
      storeId: t[s].id
    }), s;
  },

  toHome: function () {
    wx.navigateTo({
      url:''
    })
  },

  getMemberUserInfo: function () {
    r.globalData.userInfo || wx.showToast({
      title: "您还未授权，请登陆授权",
      icon: "none",
      duration: 2e3
    });
  },
  getBannerList: function (t) {
    var e = this;
    o.getStoreBannerList("GRABADSENSE", t).then(function (t) {
       e.setData({
        banners: t
      });
    });
  },
  handleUserLogin: function () {
    var e = this;
    if (r.globalData.userInfo) {
      var a = r.globalData.userInfo;
      this.setData({
        userInfo: t({}, a.wxaUser)
      }), r.globalData.userInfo.member ? e.setData({
        hasUserInfo: !0
      }) : e.setData({
        userInfo: a.wxaUser,
        hasUserInfo: !0
      });
    }
  },
  handlePopupPhone: function () {
    r.globalData.userInfo.member ? this.setData({
      phone: !1
    }) : this.setData({
      phone: !0
    });
  },
  handleBindPhone: function (t) {
     !0 === t.detail.bindMobile && this.handlePopupPhone();
  },
  handleTabbar: function (t) {
    t.detail.showTabbar, this.setData({
      showTabbar: t.detail.showTabbar
    });
  }
});