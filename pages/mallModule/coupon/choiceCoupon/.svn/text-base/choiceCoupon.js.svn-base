var o = Object.assign || function(o) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (o[e] = n[e]);
    }
    return o;
}, t = require("../../../../api/couponService.js");
var app=getApp();
var server = require("../../../../utils/server.js");
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
var imageUrl = url + "/upload/wxapi/"
Page({
    data: {
         imageUrl: imageUrl,
        couponList: [],
        unableCouponList: [],
        allCouponList: [],
        freeshipCoupon: [],
        unableFreeshipCoupon: [],
        allDiscount: [],
        allFreeship: [],
        loading: !0,
        couponType: "discount",
        // 使用优惠券提交订单信息
        sale_id:0,
        type:'',
        address_id:0,
    },

    // type=selftake&address_id=117&sale_id=0

    couponClick: function(o) {
        console.log(o);
        var that=this
        var coupon=o.currentTarget.dataset.id
        var type=that.data.type
        var address_id=that.data.address_id
        var sale_id=that.data.sale_id
        var str='&type='+type+'&address_id='+address_id+'&saleid='+sale_id
       wx.navigateTo({
        url:"../../../mallModule/order/perfectOrder/perfectOrder?coupon="+coupon+str
       })
     
    },
    toPerfectOrder: function() {
        var o = this, t = this.data.currentItem, n = this.data.current, e = [];
        JSON.stringify(this.options.type);
        if (console.log(this.data.couponList), this.data.couponList.forEach(function(o) {
            o.coupon.id === t && e.push(o);
        }), this.data.freeshipCoupon.forEach(function(o) {
            o.coupon.id === n && e.push(o);
        }), console.log(e), e) {
            try {
                var a = {
                    coupons: e,
                    couponType: o.data.couponType
                };
                wx.setStorageSync("wj_chooseCoupon", a);
            } catch (o) {}
            wx.navigateBack({
                delta: 1
            });
        } else wx.navigateBack({
            delta: 1
        });
    },
    getAvailableCoupon: function(n) {
        var e = this, a = {}, i = this.options.orderType;
        a = "normal" === i ? {
            order: n
        } : "secondkill" === i ? {
            grabOrder: n
        } : {
            order: n
        }, t.getAvailableCoupon(a).then(function(t) {
            console.log(t), wx.hideLoading();
            var n = [], a = [], i = [], u = [], s = [], c = [], r = [];
            t.forEach(function(t) {
                if (t.coupon = o({}, t.coupon), t.coupon.bytimeStart) {
                    var e = t.coupon.bytimeStart.split(" ")[0] + " " + t.coupon.bytimeStart.split(" ")[1].slice(0, 5) + " ~ " + (t.coupon.bytimeEnd.split(" ")[0] + " " + t.coupon.bytimeEnd.split(" ")[1].slice(0, 5));
                    t.coupon = o({}, t.coupon, {
                        effectiveTime: e
                    });
                } else t.coupon = o({}, t.coupon, {
                    effectiveTime: ""
                });
                "FREESHIP" === t.coupon.function ? (t.coupon = o({}, t.coupon, {
                    name: "运费券"
                }), t.usable ? u.push(t) : s.push(t), c.push(t)) : (t.usable ? a.push(t) : i.push(t), 
                r.push(t)), n.push(t);
            }), e.setData({
                allCouponList: n,
                couponList: a,
                unableCouponList: i,
                freeshipCoupon: u,
                unableFreeshipCoupon: s,
                allDiscount: r,
                allFreeship: c,
                loading: !1
            });
        }).catch(function(o) {
            wx.showToast({
                title: o.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    // type=selftake&address_id=117&sale_id=0

    onLoad: function(o) {

       this.mycoupon();
        this.setData({
            type:o.type,
            address_id:o.address_id,
            sale_id:o.sale_id
        })


    },


      mycoupon: function () {
      console.log('优惠券');
      var that = this;
      var tab=that.data.index
      var wxtoken = wx.getStorageSync('wxtoken')
        server.getJSON('/User/coupon/type/' + tab + '/wxtoken/' + wx.getStorageSync('wxtoken'), function(res) {
            if (res.data.status == 1) {
                var coupon_list = res.data.result.list;
                that.setData({
                    couponList: coupon_list,
                });
            } else if (res.data.status == -1) {
                wx.switchTab({
                    url: '../../wode/choice/choice',
                })
            }
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