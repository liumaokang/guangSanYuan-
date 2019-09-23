var app = getApp();
var server = require('../../../../utils/server')
Page({
  data: {
    url: app.globalData.url,
    group_goods: [],
  },
  onLoad: function (e) {
      var that=this;
      that.group()

  },

  group: function () {
    var that = this
    server.getJSON('/index/retuenPay/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
      console.log('res拼团商品');
      console.log(res);
      that.setData({
        group_goods: res.data.group
      })

    })
  },
  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
});