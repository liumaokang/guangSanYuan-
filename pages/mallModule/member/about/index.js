var n = require("../../../../utils/navPage.js");
var WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp();
var url = app.globalData.imgurl;
var imgurl = app.globalData.imgurl; 
Page({
    data: {
      url:url,
    },
    about: function () {
      var that = this;
      wx.request({
        url: imgurl + '/article/detail',
        data: {
          id: 1
        },
        success (res) {
          var data = res.data;
          console.log(data)
          that.setData({
            info: data.info.content
          })
          WxParse.wxParse('article', 'html', data.info.content, that, 5);
        }
      })
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
      var that = this;
      that.about();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    navCoupon: function() {
        n.toCouponCenterCommunity();
    }
});