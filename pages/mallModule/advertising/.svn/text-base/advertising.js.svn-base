var e = require("../../../utils/utils.js"), t = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
var url = t.globalData.imgurl;
var imgurl = t.globalData.imgurl; 
Page({
    data: {
        webUrl: "",
        ads: "",
        JSONEncodeURI: ""
    },
    about: function () {
      var that = this;
      wx.request({
        url: imgurl + '/article/detail',
        data: {
          id: 6
        },
        success(res) {
          var data = res.data;
          console.log(data)
          that.setData({
            info: data.info.content
          })
          WxParse.wxParse('article', 'html', data.info.content, that, 5);
        }
      })
    },
    onLoad: function(e) {
        var t = this;
        if (console.log(e), e.ads) this.shareIn(e.ads); else {
            if (e.webUrl) {
                console.log(e.webUrl), this.setData({
                    JSONEncodeURI: e.webUrl
                });
                var a = JSON.parse(e.webUrl), i = decodeURIComponent(a.url);
                console.log(i);
                o = "?";
                i.indexOf(o) > -1 ? t.setData({
                    webUrl: i + "#wechat_redirect"
                }) : t.setData({
                    webUrl: i
                });
            }
            try {
                var s = wx.getStorageSync("webUrl");
                if (console.log(s), s) {
                    if ("bindMobile" === t.options.from) t.setData({
                        webUrl: s
                    }); else {
                        var o = "?";
                        s.indexOf(o) > -1 ? t.setData({
                            webUrl: s + "#wechat_redirect"
                        }) : t.setData({
                            webUrl: s
                        });
                    }
                    wx.removeStorage({
                        key: "webUrl",
                        success: function(e) {}
                    });
                }
            } catch (e) {}
            if (this.options.mobile && "" != this.options.mobile && void 0 != this.options.mobile) {
                var n = this.options.mobile;
                try {
                    wx.setStorageSync("wj_sharingId", n);
                } catch (e) {}
            }
            this.getSharePictures();
        }
    },
    shareIn: function(e) {
        this.setData({
            ads: e,
            webUrl: "https://newretail.xianfengsg.com/newretail-admin/#/advertShow?id=" + e
        });
    },
    onShow: function () {
      var that = this;
      that.about();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        if (this.options.ads) return {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/advertising/advertising?ads=" + this.data.ads,
            success: function(e) {}
        };
        var a = this.data.sharePictures;
        if (t.globalData.userInfo && t.globalData.userInfo.member) {
            var i = t.globalData.userInfo.member.id;
            return {
                title: "鲜丰水果，新鲜才好吃！",
                path: "/pages/mallModule/advertising/advertising?webUrl=" + this.data.JSONEncodeURI + "&mobile=" + i,
                imageUrl: a,
                success: function(e) {}
            };
        }
        return {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/mallModule/advertising/advertising?webUrl=" + this.data.JSONEncodeURI,
            imageUrl: a,
            success: function(e) {}
        };
    },
    getSharePictures: function() {
        var t = this;
        e.getSharePictures("H5").then(function(e) {
            t.setData({
                sharePictures: e
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});