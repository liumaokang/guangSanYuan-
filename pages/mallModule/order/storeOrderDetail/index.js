var o = require("../../../../utils/navPage.js");

Page({
    data: {
        showDetail: !1,
        goods: [ {
            productName: "--",
            num: "--",
            priceUnit: "--",
            standard: "--",
            discountAmount: "--",
            actualPaymentAmount: "--"
        } ],
        order: {
            storeName: "--",
            payMethod: "--",
            createTime: "--",
            shouldPaymentAmount: "--",
            discountAmount: "--",
            actualPaymentAmount: "--",
            orderNo: "--",
            flowNo: "--",
            more: !0,
            products: [ {
                productName: "--",
                num: "--",
                priceUnit: "--",
                standard: "--",
                price: "--"
            } ]
        }
    },
    onLoad: function(o) {
        var t = wx.getStorageSync("offOrderDetail");
        t.payMethod = t.payInfos.reduce(function(o, t) {
            return "" + o + t.payMethod + "(￥" + t.payAmount + ")";
        }, ""), this.setData({
            order: t,
            goods: t.goods
        }), console.log(getApp());
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    showOrderDetail: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.item.code;
        o.toStoreOrderDeatil(e);
    },
    toggleGoods: function() {
        this.setData({
            showDetail: !this.data.showDetail
        });
    },
    copy: function(o) {
        console.log(o), wx.setClipboardData({
            data: o.currentTarget.dataset.no
        });
    },
    callPhone: function() {
        var o = getApp().globalData.servicePhone;
        wx.showModal({
            title: "提示",
            content: "确认要拨打此电话" + o + " ？",
            success: function(t) {
                t.confirm ? wx.makePhoneCall({
                    phoneNumber: o
                }) : t.cancel;
            }
        });
    }
});