var e = Object.assign || function (e) {
  for (var a = 1; a < arguments.length; a++) {
    var t = arguments[a];
    for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
  }
  return e;
}, a = require("../../../../api/memberService.js"), t = getApp();


  var server= require("../../../../utils/server.js");



Page({
  data: {
    scoreList: [],
    memberScoreBalabce: 0,
    mobile: "",
    page: 1,
    pageSize: 10,
    pageCount: 1,
    noMore: !1,
    loading: !1,
    loadingText: "正在加载...",

  },
  checkAuth: function () {
    try {
      return !!t.globalData.userInfo;
    } catch (e) { }
  },
  getScoreBalance: function () {
    var e = this;
    a.getBalance(this.data.mobile).then(function (a) {
      console.log(a), e.setData({
        memberScoreBalabce: a
      });
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  handleAction: function (e) {
    return "recharge" === e ? "充值" : "consume" === e ? "消费" : "adjust" === e ? "调整" : "checkIn" === e ? "签到" : "refund" === e ? "退款" : e;
  },
  onLoad: function (e) {
    wx.hideShareMenu();
    var a = this;
  
    // t.globalData.userInfo ? t.globalData.userInfo.member ? (a.setData({
    //   mobile: t.globalData.userInfo.member.mobile
    // }), this.getScoreBalance(), a.handelQueryList(this.data.page)) : wx.showToast({
    //   title: "您还不是会员哦，请绑定手机号成为会员~",
    //   icon: "none",
    //   duration: 2e3
    // }) : wx.showToast({
    //   title: "您还没有登陆，请登录后查询积分明细~",
    //   icon: "none",
    //   duration: 2e3
    // });
  },
  onReady: function () { },
  onShow: function () { this.getAccountList();this.userInfo();},
  onHide: function () { },
  onUnload: function () { },

  
    getAccountList: function() {
        var that = this
        server.getJSON('/User/points/wxtoken/' + wx.getStorageSync('wxtoken') + '/type/points' , function(res) {
             console.log('积分明细');
             console.log(res);
                var account_list = res.data;
                  
                // var title = res.data.result.title;
                // var button = res.data.result.button;
                // var rate = res.data.result.rate;
                that.setData({
                    scoreList: account_list,
                    // title: title,
                    // button: button,
                    // rate: rate
                });
        });
    },






   //下拉刷新
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading() //在标题栏中显示加载  
        //模拟加载
        setTimeout(function() {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000);

        this.setData({
            p: 1
        })
        this.getAccountList();
    },
     //上拉刷新
    onReachBottom: function() {
        var that = this
        wx.showNavigationBarLoading() //在标题栏中显示加载  
        //模拟加载
        setTimeout(function() {
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1000);
        var p = that.data.p + 1;
        that.setData({
            p: p
        })
        server.getJSON('/User/points_list/wxtoken/' + wx.getStorageSync('wxtoken') + '/type/' + that.data.type + '/p/' + that.data.p, function(res) {
            var len = res.data.result.list.length;

            if (len > 0) {
                that.setData({
                    scoreList: that.data.account_list.concat(res.data.result.list),
                });
            }
        })
    },


  

userInfo: function () {
        var that = this;
        server.getJSON('/User/userinfo/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
            var sendPrice = Number(res.data.result.dispatching.value);
            wx.setStorageSync('sendPrice', sendPrice)
            if (res.data.status == 1) {
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





  onShareAppMessage: function () { },
  // handelQueryList: function (t) {
  //   var o = this, n = this;
  //   a.queryHst(t, this.data.pageSize, this.data.mobile).then(function (a) {
  //     console.log(a);
  //     var t = o.data.scoreList;
  //     if (a.records && a.records.length > 0) {
  //       a.records.forEach(function (a) {
  //         var o = {};
  //         if (a.occur > 0) {
  //           var n = "+" + a.occur;
  //           o = e({}, a, {
  //             occur: n,
  //             increase: !0
  //           });
  //         } else if (a.occur < 0) {
  //           var i = 0 - a.occur;
  //           o = e({}, a, {
  //             occur: i = "-" + i,
  //             increase: !1
  //           });
  //         } else o = e({}, a, {
  //           occur: "-0.00",
  //           increase: !1
  //         });
  //         o = e({}, o, {
  //           action: a.remark
  //         }), t.push(o);
  //       });
  //       var i = parseInt(a.recordCount / a.pageSize) + 1;
  //       o.setData({
  //         page: a.page,
  //         pageCount: i,
  //         scoreList: t
  //       });
  //     }
  //     o.data.loading && n.setData({
  //       loading: !1
  //     });
  //   }).catch(function (e) {
  //     wx.showToast({
  //       title: e.message,
  //       icon: "none",
  //       duration: 2e3
  //     }), o.data.loading && n.setData({
  //       loading: !1
  //     });
  //   });
  // }
});