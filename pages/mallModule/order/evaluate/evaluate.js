var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, o = require("../../../../api/orderService.js"), s = require("../../../../api/commentService.js"), n = require("../../../../api/request.js");
var server = require("../../../../utils/server.js");
Page({
    data: (e = {
        url: url,
        imgurl: imgurl,
        orderId: '',
        avatarUrl: [],
        imageUrls: [],
        labels: [ {
            id: 0,
            text: "很新鲜",
            select: !1
        }, {
            id: 1,
            text: "服务好",
            select: !1
        }, {
            id: 2,
            text: "分量足",
            select: !1
        }, {
            id: 3,
            text: "干净",
            select: !1
        } ],
        submit: !0,
        goodsid:0,
        start:0,
        content:'',
        unSelect: url + "/upload/wxapi/star_icon01.png",
        selected: url + "/upload/wxapi/star_icon02.png",
        // unSelect: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/iconUnevaluate.png",
        // selected: "https://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/sprite3/iconEvaluate.png"

    }, t(e, "submit", !1), t(e, "inputText", ""), t(e, "goodsList", []), t(e, "count", 5), 
    e),
    choiceStars: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.index, a = this.data.goodsList, o = t.currentTarget.dataset.goodsnum;
        a[o].score !== e + 1 ? a[o].score = parseInt(e + 1) : a[o].score = 0, console.log(a);
        var s = !0;
        a.forEach(function(t) {
            0 !== t.score && "" !== t.inputText || (s = !1);
        }), this.setData({
            goodsList: a,
            submit: s,
            start:e
        });
    },
    bindTextAreaInput: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.goodsnum, a = this.data.goodsList;
        a[e].inputText = t.detail.value;
        var o = !0;
        a.forEach(function(t) {
            0 !== t.score && "" !== t.inputText || (o = !1);
        }), this.setData({
            goodsList: a,
            submit: o,
            content:t.detail.value
        });
    },
    bindTextAreaBlur: function(t) {},
    chooseImage: function(t) {
      var that=this;
      let chooseimg = that.data.chooseimg;
      let addnum = that.data.addnum;
      wx.chooseImage({
        count: 9 - addnum, // 默认9,减去已选择的张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let tempFilePaths = res.tempFilePaths;
          // console.log(tempFilePaths);
          // chooseimg = chooseimg.concat(tempFilePaths);
          // console.log(chooseimg);
          let leng = tempFilePaths.length + addnum;
          console.log(tempFilePaths)
          that.setData({
            avatarUrl: tempFilePaths,
            addnum: leng
          })
        }
      })
    },
    deleteImg: function(t) {
      let that = this;
      let id = t.currentTarget.dataset.id;
      console.log(id)
      let chooseimg = that.data.avatarUrl;
      chooseimg.splice(id, 1);
      that.setData({
        avatarUrl: chooseimg
      })
    },
    clickLabels: function(t) {
        var e = this, o = this.data.goodsList, s = t.currentTarget.dataset.id, n = t.currentTarget.dataset.goodsnum;
        o[n].labels.forEach(function(t, r) {
            t.id === s && (t = !1 === t.select ? a({}, t, {
                select: !0
            }) : a({}, t, {
                select: !1
            }), o[n].labels[r] = t, e.setData({
                goodsList: o
            }));
        });
    },
    getProductComments: function(e) { //商品信息      
        console.log(e)  
        var that = this;
        wx.request({
          url: imgurl + '/Order/comment/wxtoken/' + wx.getStorageSync('wxtoken') + '/rec_id/' + e,
          success (res) {
            if (res.data.status == 1) {
              var comment_list = res.data.list;
              console.log(comment_list)
              that.setData({
                goodsList: comment_list
              })
            }
          }
        })

        var t = this, e = [];
        return t.data.goodsList.forEach(function(o) {
            var s = o.avatarUrl, n = o.labels, r = o.inputText, i = "";
            n.forEach(function(t) {
                t.select && (i = "" === i ? t.text : i + "," + t.text);
            });
            var c = {
                content: r,
                orderId: t.data.orderId,
                productId: o.productId,
                star: o.score
            };
            "" !== i && (c = a({}, c, {
                content: i + ";" + c.content
            })), o.avatarUrl.length > 0 && (c = a({}, c, {
                pictures: s
            })), e.push(c);
        }), e;
    },



    submitComment: function() { //提交评价
          console.log(app.globalData.url);
        var that =this;
        var thumb = this.data.avatarUrl;
        var content = that.data.content;
        console.log('品论内容');
        console.log(content);
        var star = that.data.start;
        var noname = that.data.noname;
        var goods_id = that.data.goodsid;
        var order_id = that.data.orderId;
        console.log('thumb');
        console.log(thumb);
        console.log('goodsid');
        console.log(goods_id);
        if (content == '') {
          wx.showToast({
            title: '请填写评价！',
          })
          return;
        }
        if (star == 0) {
          wx.showToast({
            title: '请选择评星！',
          })
          return;
        }
        wx.uploadFile({
          url: app.globalData.url + '/index.php/wxapi/Order/add_comment/wxtoken/' + wx.getStorageSync('wxtoken') + '/goods_id/' + goods_id + '/order_id/' + order_id + '/content/' + content + '/rec_id/' + that.data.rec_id + '/service_rank/' + star ,
          filePath:thumb[0],
          // name: 'image1',
          success(res) {
            console.log(res);
            wx.showToast({
              title: '已评价',
            })
            wx.navigateTo({
              url: '../../../mallModule/member/my/my',
            })
          },
          // fail(res) {
          //   console.log(res);
          //   wx.showToast({
          //     title: '请选择图片',
          //   })
          // }
          
        })
    },




    getOrderDetails: function() {
        var t = this, e = this.options.orderId;
        o.getDetailsById(e).then(function(e) {
            var o = t.data.labels, s = [];
            e.products && e.products.length > 0 && e.products.forEach(function(t) {
                for (var e = a({}, t, {
                    labels: [],
                    score: 5,
                    avatarUrl: [],
                    imageUrls: [],
                    inputText: ""
                }), n = 0; n < o.length; n++) {
                    var r = o[n];
                    e.labels[n] = r;
                }
                s.push(e);
            }), t.setData({
                goodsList: s
            });
        });
    },
    onLoad: function(t) {
      console.log(t)
      var that=this;
      var orderId = t.order_sn; //订单号
      var order_id = t.goods_sn; //商品号
      var recid = t.rec_id;
      var img = t.img
      var goodsid=t.goodsid
      console.log(t)
      that.getProductComments(recid);
      wx.hideShareMenu(), t.orderId && (that.setData({
          orderId: t.orderId,
          recid: t.rec_id,
          goods_sn: t.goods_sn,
          order_sn: t.order_sn,
          img:t.img,
          goodsid:goodsid
        }), that.getOrderDetails());
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});