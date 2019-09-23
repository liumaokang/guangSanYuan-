var n = require("../../../../api/orderService.js");

Page({
    data: {
        trackingInfo: {},
        com: "暂无",
        num: "暂无",
        phoneNum: "暂无",
        shipdetails: [],
        distributionPhone: ""
    },
    onLoad: function(n) {
        wx.hideShareMenu();
        var o = JSON.parse(this.options.trackData);
        console.log(o), this.setData({
            trackingInfo: {
                name: o.trackingCompany,
                trackId: o.trackingNumber
            }
        }), this.getOrderShipDetails();
    },
    getOrderShipDetails: function() {
        var o = this, a = o.data.trackingInfo;
        a.name && a.trackId && n.getOrderShipDetails(a.name, a.trackId).then(function(n) {
            if (console.log(n), n) {
                var a = [];
                n.shipdetails.forEach(function(n) {
                    a.push(n);
                });
                var t = "", i = "";
                "shunfeng" === n.com ? (t = "顺丰", i = "95338") : "shentong" === n.com ? (t = "申通", 
                i = "95543") : "yuantong" === n.com ? (t = "圆通", i = "95554") : "zhongtong" === n.com ? (t = "中通", 
                i = "95311") : "huitongkuaidi" === n.com ? (t = "汇通", i = "95320") : "yunda" === n.com ? (t = "韵达", 
                i = "95546") : "zhaijisong" === n.com ? (t = "宅急送", i = "400-6789-000") : "debangwuliu" === n.com ? (t = "德邦物流", 
                i = "95353") : (t = "其他", i = "无"), o.setData({
                    com: t,
                    num: n.num,
                    phoneNum: i,
                    shipdetails: a
                });
            }
        }).catch(function(n) {
            wx.showToast({
                title: n.message,
                icon: "none",
                duration: 2e3
            });
        });
        var t = /((((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147))\d{8})|((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}))?/g;
        console.log("a15112250161c0755-2451454c18926057890111放0755-4554444分".match(t));
    },
    callTrackingPhone: function() {
        var n = this.data.phoneNum;
        "暂无" !== n && this.handleCallPhone(n);
    },
    callDistributionPhone: function() {
        var n = this.data.distributionPhone;
        this.handleCallPhone(n);
    },
    handleCallPhone: function(n) {
        wx.makePhoneCall({
            phoneNumber: n
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});