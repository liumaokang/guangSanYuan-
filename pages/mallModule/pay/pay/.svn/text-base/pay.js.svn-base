var e = require("../../../../utils/self.js"), t = require("../../../../api/memberService.js"), o = require("../../../../utils/navPage.js"), a = getApp();
var server = require("../../../../utils/server.js");
var app = getApp();

Page({
    data: {
         amount: 0,
         order_id: '',
         is_default: 0,
         payurl: 0
    },
    codeTextPartition: function(e) {
        return e = e.replace(/\s/g, "").replace(/(\w{4})(?=\w)/g, "$1 ");
    },
    checkAuth: function(e) {
        return console.log(e), !!a.globalData.userInfo;
    },
    refreshPayCode: function() {
        a.globalData.userInfo ? this.getPayQrCode() : wx.showToast({
            title: "",
            icon: "none",
            duration: 2e3
        });
    },
    getPayQrCode: function() {
        var o = this, a = this;
        clearTimeout(a.data.time), t.getPayCode().then(function(t) {
            o.ctxCanvas || (o.ctxCanvas = wx.createCanvasContext("barcode")), e.barcode(o.ctxCanvas, t.code, a.data.codeWidth, a.data.codeHeight), 
            e.qrcode("qrcode", t.code, 302, 302), a.setData({
                codeId: o.codeTextPartition(t.code)
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
        var n = setTimeout(function() {
            a.getPayQrCode(), console.log("刷新了");
        }, 6e4);
        a.setData({
            time: n
        });
    },
    getMbrBalance: function() {
        var e = this;
        t.getMbrBalance().then(function(t) {
            t && e.setData({
                balance: t.toFixed(2)
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toRecharge: function() {
        o.toRecharge();
    },
    onLoad: function(options) {
        var order_id = options.order_id;
        var amount = options.amount;
        var payurl = options.payurl;
        this.setData({
            order_id: order_id,
            amount: amount,
            payurl: payurl
        });
        this.getUser();
    },

      // 会员信息
    getUser: function() {
        server.getJSON('/Cart/users/wxtoken/' + wx.getStorageSync('wxtoken'), function(res) {
            if (res.data.status == 1) {
                var company = res.data.user.company;
                var identity = res.data.user.identity;
                if (company == 1 && identity == 1) {
                    this.setData({
                        is_default: 1
                    })
                }
            }
        });
    },
      // 微信支付
    wxPay: function() {
        wx.request({
            url: app.globalData.url + '/index.php/wxapi/Order/getPrePayId',
            data: {
                wxtoken: wx.getStorageSync('wxtoken'),
                openid: app.globalData.openid,
                order_id: this.data.order_id,
                appid: app.globalData.appid,
            },
            method: 'POST',
            success: function(res) {
                wx.requestPayment({
                    'timeStamp': res.data.timeStamp,
                    'nonceStr': res.data.nonceStr,
                    'package': res.data.package,
                    'signType': res.data.signType,
                    'paySign': res.data.paySign,
                    'success': function(res) {
                        wx.showToast({
                            title: '支付成功',
                            duration: 3000,
                            success: function() {
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: '../../index/index',
                                    })
                                }, 2000) //延迟时间
                            }
                        })
                    },
                    'fail': function(res) {
                        wx.showToast({
                            title: '支付失败',
                            icon: 'success',
                            duration: 2000
                        })
                    }
                })
            }
        })
    },
       // 支付成功后返回
    paySuccess: function() {
        wx.showModal({
            title: '提示',
            content: '支付成功',
            cancelText: '返回首页',
            confirmText: '订单详情',
            cancelColor: '#000000',
            confirmColor: '#3cc51f',
            success: function(res) {
                if (res.confirm) {
                    wx.switchTab({
                        url: '../../index/index',
                    })
                } else if (res.cancel) {
                    wx.switchTab({
                        url: '../../index/index',
                    })
                }
            }
        })
    },




    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearTimeout(this.data.time);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});