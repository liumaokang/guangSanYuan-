var app = getApp();
var server = require('../../../../../utils/server')
Page({
  data: {
    url:app.globalData.url,
    group_goods: [],
  },
  onLoad: function (e) {
    var that = this;
    that.group()

  },
  toHome:function(){
    wx.reLaunch({
      url: '/pages/mallModule/index/index/index'
    })
  },
  toOrderDetails:function(){
    wx.navigateBack({
      delta:1
    })
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
  go_pingtuan: function (e) { //去拼团
    var id = e.currentTarget.dataset.id;
    var goodsid = e.currentTarget.dataset.goodsid;
    // console.log(goodsid)
    wx.navigateTo({
      url: '../../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&goods_type=1' + '&team_id=' + id,
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