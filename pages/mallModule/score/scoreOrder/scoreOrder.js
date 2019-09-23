var e = require("../../../../api/orderService.js"), a = require("../../../../utils/navPage.js"), t = getApp();

Page({
    data: {
        orderLists: [],
        member: {},
        noMore: !1,
        loading: !1,
        page: 1,
        pageSize: 15,
        pageCount: 1
    },
    toOrderDetails: function(e) {
        console.log(e);
        var t = "?orderId=" + e.currentTarget.dataset.id;
        a.toOrderDetails(t);
    },
    onLoad: function(e) {
        var that=this;
        var url=t.globalData.imgurl;
        wx.request({
          url: url+'/order/order_list',
          type:"get",
          data:{
            wxtoken:wx.getStorageSync("wxtoken"),
            type:"integral"
          },
          success:function(res){
            console.log('积分订单');
            console.log(res);
            var date=res.data;
            that.setData({
              orderLists: date.list
            })
          }
        })
        wx.hideShareMenu(), t.globalData.userInfo && (console.log(t.globalData.userInfo), 
        t.globalData.userInfo.member && (this.setData({
            member: t.globalData.userInfo.member
        }), this.getOrderData(this.data.page)));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            orderList: [],
            member: {},
            page: 1,
            pageCount: 1,
            noMore: !1
        }), this.onLoad(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (this.data.page < this.data.pageCount) {
            this.setData({
                loading: !0
            });
            var e = this.data.page;
            ++e, this.getOrderData(e);
        } else this.setData({
            noMore: !0
        });
    },
    onShareAppMessage: function() {},
    getOrderData: function(a) {
        var t = this, o = this, s = {
            page: a,
            pageSize: this.data.pageSize,
            memberIdEquals: this.data.member.id,
            businessEquals: "SCORE",
            searchCount: !0
        };
        e.query(s).then(function(e) {
            console.log(e);
            var a = o.data.orderList;
            if (e.records && e.records.length > 0) {
                e.records.forEach(function(e) {
                    var t = {
                        orderNum: e.id,
                        status: e.status,
                        business: e.business,
                        storeName: e.storeName,
                        storeId: e.storeId,
                        shipmentAmount: e.shipmentAmount >= 0 ? e.shipmentAmount.toFixed(2) : 0,
                        details: [],
                        buyNumber: e.buyNumber ? e.buyNumber : 0,
                        totalPrice: e.cashTotal,
                        exchangeScores: e.images.length > 0 ? e.images[0].exchangeScores : ""
                    };
                    e.images ? e.images.forEach(function(e) {
                        t.count += parseInt(e.goodsNum), t.details.push({
                            id: e.productId,
                            img: e.url,
                            goodsName: e.goodsName,
                            goodsNum: e.productNum
                        });
                    }) : t.count = 0, a.push(t);
                });
                var s = parseInt(e.recordCount / e.pageSize) + 1;
                e.recordCount % e.pageSize == 0 && (s = parseInt(e.recordCount / e.pageSize)), o.setData({
                    page: e.page,
                    pageCount: s,
                    orderList: a
                });
            }
            t.data.loading && o.setData({
                loading: !1
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            }), t.data.loading && o.setData({
                loading: !1
            });
        });
    }
});