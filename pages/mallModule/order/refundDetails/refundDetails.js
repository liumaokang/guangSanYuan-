var n = Object.assign || function(n) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
    }
    return n;
}, e = require("../../../../api/orderService.js");

Page({
    data: {
        
        refundList: [
          {
            applyTime:"2016-10-20",
            status:"已退款",
            refundDetails:[
              {
                url:'/image/icon09.png',
                descriptionImageUrlsArray: '/image/icon09.png'
              }
            ],
            applyReason: '购买的商品缺货',
          },
          {
            applyTime: "2016-10-20",
            status: "已退款",
            refundDetails: [
              {
                url: '/image/icon09.png',
                descriptionImageUrlsArray: '/image/icon09.png'
              }
            ],
            applyReason: '购买的商品缺货',
          },
          {
            applyTime: "2016-10-20",
            status: "已退款",
            refundDetails: [
              {
                url: '/image/icon09.png',
                descriptionImageUrlsArray: '/image/icon09.png'
              }
            ],
            applyReason: '购买的商品缺货',
          },
        ],
        imglist:[
          {
            url: '/image/icon09.png',
          },
          {
            url: '/image/icon09.png',
          },
          {
            url: '/image/icon09.png',
          }
        ]
    },
    onLoad: function(n) {
        wx.hideShareMenu(), n.orderId && this.getRefundOrderDetails(n.orderId);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getRefundOrderDetails: function(r) {
        var o = this;
        e.queryRefund(1, 0, r).then(function(e) {
            if (console.log(e), e.records && e.records.length > 0) {
                var r = [];
                e.records.forEach(function(e) {
                    var o = e;
                    if (null != e.descriptionImageUrls && "" != e.descriptionImageUrls) {
                        var t = e.descriptionImageUrls.split(",");
                        o = n({}, o, {
                            descriptionImageUrlsArray: t
                        });
                    }
                    r.push(o);
                }), o.setData({
                    refundList: r
                });
            }
        }).catch(function(n) {
            console.log(n);
        });
    }
});