var e = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var o = arguments[t];
    for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (e[a] = o[a]);
  }
  return e;
}, t = require("../../../../api/productService.js"), o = (require("../../../../api/storeService.js"),
  require("../../../../api/bannerService.js")), a = require("../../../../api/memberService.js"),
   r = require("../../../../utils/utils.js"), n = require("../../../../utils/address.js"), 
   s = require("../../../../utils/navPage.js"), i = require("../../../../utils/authorize.js"), l = getApp();


var url = l.globalData.imgurl;
var imgurl=l.globalData.url;
var  server= require("../../../../utils/server.js");
Page({
  data: {
    banners: [],
    goodsList: [],

    goodlist:[],
    scores:"0",
    member: {},
    score: 0,
    imgurl:imgurl,
    storeName: "",
    storeId: "",
    phone: !1,
    colors:"#ffffff",
    hasUserInfo: !1,
    isMember: !1
  },
  go_goodsDetail: function (e) {
    var that = this;
    var goodsId = e.currentTarget.dataset.goodsid;
   
    var goodlist = that.data.goodlist;
    var scores = that.data.scores;
    for (let q = 0; q < goodlist.length; q++) {
      if (goodlist[q].goods_id == goodsId) {
        if (goodlist[q].shop_price <= scores) {
          wx.navigateTo({
            url: '/pages/mallModule/goods/goodsDetail/goodsDetail?goodsid=' + goodsId + '&&goods_type=4',
          })
        } else {
          wx.showToast({
            title: '积分不足',
            icon: "none"
          })
        }
      }
    };
  },
  jump1: function () {
    wx.navigateTo({
      url: '/pages/mallModule/score/scoreOrder/scoreOrder',
    })
  },
  onLoad: function (e) {
    if (wx.getStorageSync('wxtoken')) {
      l.geuserMessage();
    };
    var t = this;

    wx.request({
      url: url+"/goods/integralMall",
      type:"get",
      success:function(res){
        console.log(res)
        var scoreList=res.data.data;
        var banners=res.data.banner
        t.setData({
          goodlist:scoreList,
          banners:banners
        })
      }
    })

  },

  onShow:function(){
     var that=this
      console.log('onShow');
      that.userInfo();
  },
 userInfo: function () {
        var that = this;
        server.getJSON('/User/userinfo/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
            console.log('userInfo')
            console.log(res);
            
            if (res.data.status == 1) {
                var info = res.data.result.info;             
                that.setData({
                    nickname       : info.nickname,
                    head_pic       : info.head_pic,
                    coupon_count   : info.coupon_count,
                    pay_point      : info.pay_points,
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
                    scores         : info.pay_points
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









});