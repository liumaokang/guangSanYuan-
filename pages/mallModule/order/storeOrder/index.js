function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
        return o;
    }
    return Array.from(e);
}

var t = require("../../../../utils/navPage.js"), o = require("../../../../api/orderService.js"), r = getApp();

Page({
    data: {
        member: {},
        orders: [ {
            flowNo: "--",
            storeName: "--",
            createTime: "--",
            shouldPaymentAmount: "--",
            more: !0,
            goods: [ {
                productName: "--",
                shouldPaymentAmount: "--"
            } ]
        } ],
        pageNo: 1,
        hasMore: !0
    },
    onLoad: function(e) {
        this.setData({
            member: Object.assign({}, r.globalData.userInfo.member)
        }), this.getOrderList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("offOrderDetail");
    },
    getOrderList: function() {
        var t = this;
        this.data.hasMore ? o.getStoreOff(t.data.pageNo, t.data.member.hdMbrId).then(function(o) {
            console.log(o), 1 == o.page ? t.setData({
                orders: o.resultList.map(function(e) {
                    return e.more = e.products.length > 3, e.goods = e.products.slice(0, 3), e;
                })
            }) : t.setData({
                orders: [].concat(e(t.data.orders), e(o.resultList.map(function(e) {
                    return e.more = e.products.length > 3, e.goods = e.products.slice(0, 3), e;
                })))
            }), o.totalSize <= o.page * o.pageSize ? t.setData({
                hasMore: !1
            }) : t.setData({
                pageNo: o.page + 1,
                hasMore: !0
            }), wx.stopPullDownRefresh();
        }).catch(function(e) {
            console.log(e);
        }) : wx.showToast({
            title: "无更多数据",
            icon: "none"
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNo: 1,
            hasMore: !0
        }), this.getOrderList();
    },
    onReachBottom: function() {
        this.getOrderList();
    },
    onShareAppMessage: function() {},
    showOrderDetail: function(e) {
        console.log(e);
        var o = e.currentTarget.dataset.item;
        wx.setStorageSync("offOrderDetail", o), t.toStoreOrderDeatil(o.flowNo);
    }
});