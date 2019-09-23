require("../../../../api/memberService.js"), require("../../../../api/smsService.js"), 
require("../../../../api/storeService.js"), require("../../../../utils/auth.js"), 
require("../../../../utils/utils.js");
var WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp();
var url = app.globalData.imgurl;
var imgurl = app.globalData.imgurl; 
var e = require("../../../../utils/navPage.js");

require("../../../../utils/address.js"), getApp();

Page({
    data: {
      
        vipImgs: [ "", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vip1.png", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vip2.png", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vip3.png", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vip4.png" ],
        vipDesImgs: [ "", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vipdes1.png", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vipdes2.png", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vipdes3.png", "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/vipdes4.png" ],
        gradeNo: 1
    },
    getMemberUserInfo: function() {
        console.log(wx.getStorageSync("wj_member"));
        var e = wx.getStorageSync("wj_member").gradeNo || 1;
        this.setData({
            gradeNo: e
        });
    },
  about: function () {
    var that = this;
    wx.request({
      url: imgurl + '/article/detail',
      data: {
        id: 5
      },
      success(res) {
        var data = res.data;
        // console.log(data)
        that.setData({
          info: data.info.content
        })
        WxParse.wxParse('article', 'html', data.info.content, that, 5);
      }
    })
  },
    showAllRight: function() {
        e.toAdvertising('?webUrl={"url":"https://newretail2.xianfengsg.com/newretail-admin/#/classDiscription"}');
    },
    onLoad: function(e) {
        wx.hideShareMenu(), this.getMemberUserInfo();
    },
    onShow: function () {
      var that = this;
      that.about();
    }
});