var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl; 
var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (t[o] = a[o]);
    }
    return t;
}, e = require("../../../../api/commentService.js"), a = getApp();

Page({
    data: {
        commentList: [],
        page: 1,
        mobile: "",
        pageSize: 10,
        pageCount: 1,
        noMore: !1,
        loading: !1,
        allMyComment: !1,
        productId: "",
        memberId: "",
        goods_id:0
    },


    comment: function (id) { //评价列表
      var that = this;
      var wxtoken = wx.getStorageSync('wxtoken');
      var str='&goods_id='+id
      wx.request({
        url: imgurl + '/goods/ajaxComment?wxtoken=' + wxtoken + str,
        success (res) {
          var data = res.data;
          console.log(data)
          that.setData({
            commentList: data.result.list,
          })
        }
      })
      
    },
    onLoad: function(t) {
      var that = this;
      
      that.comment(t.goods_id);


        // t.form ? (this.setData({
        //     allMyComment: !0
        // }), a.globalData.userInfo.member ? a.globalData.userInfo.member ? (this.setData({
        //     memberId: a.globalData.userInfo.member.id
        // }), this.getProductsComment(this.data.page)) : wx.showToast({
        //     title: "您还不是会员，请绑定手机号成为会员~",
        //     icon: "none"
        // }) : wx.showToast({
        //     title: "您还没有登陆，请点击头像授权登陆哦~",
        //     icon: "none"
        // })) : (this.setData({
        //     productId: t.productId
        // }), this.getProductsComment(this.data.page));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            commentList: [],
            mobile: "",
            page: 1,
            pageCount: 1,
            noMore: !1
        }), this.onLoad(this.options), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        if (this.data.page < this.data.pageCount) {
            this.setData({
                loading: !0
            });
            var t = this.data.page;
            ++t, this.getProductsComment(t);
        } else this.data.commentList.length > 0 ? this.setData({
            noMore: !0
        }) : wx.showToast({
            title: "没有更多数据~",
            icon: "none",
            duration: 2e3
        });
    },
    onShareAppMessage: function() {},
    getProductsComment: function() {
        var a = this, o = this, n = {
            page: 1,
            pageSize: 10,
            status: "NORMAL"
        };
        n = this.data.allMyComment ? t({}, n, {
            memberId: this.data.memberId
        }) : t({}, n, {
            productId: this.data.productId
        }), e.query(n).then(function(e) {
            var n = [];
            if (e.records && e.records.length > 0) {
                e.records.forEach(function(e) {
                    var a = t({}, e, {
                        mobile: o.hideTel(e.mobile),
                        avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wxapp/boy-cm.png"
                    });
                    e.createTime && (a = t({}, a, {
                        time: e.createTime
                    })), n.push(a);
                });
                var i = parseInt(e.recordCount / e.pageSize) + 1;
                o.setData({
                    page: e.page,
                    pageCount: i,
                    commentList: n
                });
            }
            a.data.loading && that.setData({
                loading: !1
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), a.data.loading && that.setData({
                loading: !1
            });
        });
    },
    hideTel: function(t) {
        var e = /^(\d{3})\d{4}(\d{4})$/;
        return t = t.replace(e, "$1****$2");
    },
    previewImage: function(t) {
        var e = t.currentTarget.dataset.commentid, a = t.currentTarget.dataset.urlid, o = [];
        this.data.commentList.forEach(function(t) {
            t.id === e && t.pictures.forEach(function(t) {
                o.push(t.url);
            });
        }), wx.previewImage({
            current: o[a],
            urls: o
        });
    }
});