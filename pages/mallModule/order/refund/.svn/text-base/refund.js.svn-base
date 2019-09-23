var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = require("../../../../api/orderService.js"), 
a = require("../../../../api/request.js"), o = require("../../../../utils/utils.js"), s = getApp(),r = getApp();


var server= require("../../../../utils/server.js");

Page({
    data: {
        imgurl: imgurl,
        avatarUrl: null,
        imageUrls: [],
        goodsList: [
          {
            productId:"1",
            isTeam: 1,
            memberCount: 2,
            name: "水果",
            teamLeaderPrice: 28,
            sellPrice: 15,
            originalPrice: 18,
            teamBuyingType: "THOUSAND",
            imageUrl: '/image/icon09.png',
            description: "显现又好吃显现又好吃显现又好吃显现又好吃显现又好吃显现又好吃",
            zhekou: 39
          },
        ],
        checked:1,
        orderId: "1321541313211", //订单号
        order_id: "", //订单id
        inputText: "",
        textAreaHidden: !0,
        canRefund: !0,
        refundNumber: 0,
        allRedund: !1,
        bank: !1,
        cashTotal:18,
        postData: {},
        order_sn:'',
        labels: [ {
            id: 0,
            text: "不想要了",
            select: !1
        }, {
            id: 1,
            text: "我买错了",
            select: !1
        }, {
            id: 2,
            text: "购买的商品缺货",
            select: !1
        }, {
            id: 3,
            text: "店员态度不好",
            select: !1
        }, {
            id: 4,
            text: "果品质量不好",
            select: !1
        }, {
            id: 5,
            text: "其他",
            select: !1
        } ],
        type: "submit",
        count: 5,
        supportPartReturn: !1,
        confirmShow: !1,
        str:[],
        content:''
    },
    chooseImage: function() {
        var t = this, e = t.data.count - t.data.imageUrls.length;
        e > 0 ? wx.chooseImage({
            count: e,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var o = e.tempFilePaths;
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 2e5
                }), console.log(o);
                var s = t.data.imageUrls;
                o.forEach(function(e) {
                    wx.uploadFile({
                        url: a.BASE_URL + "/newretail/api/dfs/upload",
                        filePath: e,
                        name: "file",
                        formData: {
                            user: "test"
                        },
                        success: function(e) {
                            try {
                                var a = e.data, o = JSON.parse(a);
                                console.log(o), s.push(o.data.url), t.setData({
                                    avatarUrl: s,
                                    imageUrls: s
                                }), wx.hideToast();
                            } catch (t) {
                                console.log(t), wx.showToast({
                                    title: t.message,
                                    icon: "none",
                                    duration: 2e5
                                });
                            }
                        },
                        fail: function(t) {
                            console.log(t.message);
                        }
                    });
                });
            }
        }) : wx.showToast({
            title: "最多只能上传5张哦~",
            icon: "none",
            duration: 2e3
        });
    },

    clickLabels: function(e) {
        console.log('退款原因');
        console.log(e);
        var that=this
        var str=that.data.str;
        var ret=e.currentTarget.dataset.id;
        var labels=that.data.labels;
        var str=str.concat(labels[ret].text);
        that.setData({
            str:str
        })
      
    },



    handelTextArea: function(t) {
  
         this.setData({
            inputText: t.detail.value,
            content:t.detail.value
        }) 
    },


    handelTextAreaBlur: function() {
        this.setData({
            textAreaHidden: !0
        });
    },
    

    clickTextarea: function(e) {
        this.setData({
            textAreaHidden: !1
        });
    },




    backOrder: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    payBackApply: function() {
        
        var t = this;
        wx.navigateTo({
          url: './refundSuccess/refundSuccess',
        })
        this.setData({
            confirmShow: !1
        }), o.setHideLoading(!1), e.createRefund(this.data.postData).then(function(e) {
            console.log(e), wx.setNavigationBarTitle({
                title: "退款申请"
            }), t.setData({
                type: "success"
            });
        }).catch(function(t) {
            console.log(t), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toggleLuckConfirm: function() {
        this.setData({
            confirmShow: !this.data.confirmShow
        });
    },
    refundSubmit: function() { //申请退款提交
        var that = this;
        var wxtoken = wx.getStorageSync('wxtoken');
        var order_id = that.data.order_id;
        var str=that.data.str;
        var content=that.data.content;
      
        var str0='?order_id='+order_id+'&str='+str+'&content='+content+'&wxtoken='+wx.getStorageSync('wxtoken');
        server.getJSON('/order/retgoods'+str0,function(res){
            console.log(res);
                wx.showToast({
                    title:res.data.msg,
                   
                })
                wx.navigateTo({
                     url:'../../../mallModule/member/my/my'
                })
        })
    },
    getOrderDetails: function() { //退款信息参数
        var a = this, o = this.options.orderId;
        e.getDetailsById(o).then(function(e) {
            console.log(e);
            var o = e.payments.some(function(t) {
                return "UNIONPAY_APP" === t.payMethod;
            }), s = (e.status, []);
            e.products.forEach(function(e) {
                s.push(t({}, e, {
                    productNumber: 0
                }));
            }), a.setData({
                orderId: e.id,
                mobile: e.mobile,
                order_sn:e.order_sn,
                goodsList: s,
                address: e.province + e.city + e.district + e.address,
                storeName: e.storeName,
                createTime: e.createTime,
                cashTotal: e.cashTotal,
                orderAmount: e.orderAmount,
                cashDeductTotal: e.cashDeductTotal,
                remark: e.remark,
                storeAddress: e.storeAddress,
                shipmentType: e.shipmentType,
                // shipmentAmount: e.shipmentAmount,
                shipmentAmount:"18",
                canRefund: e.canRefund,
                bank: o
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    checkboxChange: function(t) {
        t.detail.value.length === this.data.goodsList.length ? this.setData({
            checkedAll: !0
        }) : this.setData({
            checkedAll: !1
        });
        var e = this.data.goodsList;
        e.forEach(function(t) {
            t.checked = !1, t.productNumber = 0;
        });
        var a = 0;
        t.detail.value.forEach(function(t) {
            e.forEach(function(e) {
                t === e.productId && (e.checked = !0, e.productNumber = e.productNum, a += e.productNumber);
            });
        }), this.setData({
            goodsList: e,
            refundNumber: a
        }), this.checkAllRefund();
    },
    checkboxAllChange: function(t) {
        var e = this.data.goodsList, a = 0;
        0 === t.detail.value.length ? (e.forEach(function(t, e) {
            t.checked = !1, t.productNumber = 0;
        }), this.setData({
            goodsList: e,
            refundNumber: a
        })) : (e.forEach(function(t, e) {
            t.checked = !0, t.productNumber = t.productNum, a += t.productNumber;
        }), this.setData({
            goodsList: e,
            refundNumber: a
        })), this.checkAllRefund();
    },
    handleReduce: function(t) {
        var e = this.data.goodsList, a = this.data.refundNumber, o = 0;
        e.forEach(function(e) {
            e.productId === t.currentTarget.dataset.id && e.productNumber > 0 && (e.productNumber--, 
            a--, e.productNumber > 0 ? e.checked = !0 : e.checked = !1), e.checked && o++;
        }), this.setData({
            goodsList: e,
            refundNumber: a
        }), o === this.data.goodsList.length ? this.setData({
            checkedAll: !0
        }) : this.setData({
            checkedAll: !1
        }), this.checkAllRefund();
    },
    handleAdd: function(t) {
        var e = this.data.goodsList, a = this.data.refundNumber, o = 0;
        e.forEach(function(e) {
            e.productId === t.currentTarget.dataset.id && e.productNumber < e.productNum && (e.productNumber++, 
            a++, e.productNumber > 0 ? e.checked = !0 : e.checked = !1), e.checked && o++;
        }), this.setData({
            goodsList: e,
            refundNumber: a
        }), o === this.data.goodsList.length ? this.setData({
            checkedAll: !0
        }) : this.setData({
            checkedAll: !1
        }), this.checkAllRefund();
    },
    checkAllRefund: function() {
        var t = !0;
        this.data.goodsList.forEach(function(e) {
            e.productNumber !== e.productNum && (t = !1);
        }), this.setData({
            allRedund: t
        });
    },
    onLoad: function(t) {
      // console.log(t)
        wx.hideShareMenu();
        var e = !1;
        s.globalData.configureInfo.forEach(function(t) {
            "supportPartReturn" === t.key && null != t.value && "" !== t.value && (e = "TRUE" === t.value);
        }), this.setData({
            supportPartReturn: e
        }), t.orderId && t.order_id && (this.setData({
            orderId: t.orderId,
            order_id: t.order_id
        }),  this.getOrderDetails());
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});