var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;

var e, t = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var s = arguments[t];
    for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (e[n] = s[n]);
  }
  return e;
}, s = require("../../../../../api/addressService.js"), n = require("../../../../../utils/navPage.js"), r = require("../../../../../libs/qqmap-wx-jssdk.min.js"), a = getApp();
var server = require('../../../../../utils/server');
Page(function (e, t, s) {
  return t in e ? Object.defineProperty(e, t, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = s, e;
}({
  data: {
    addressList: [],
    isDelete: !1,
    isDeleteId: "",
    order:'',
    isDeleteText: "删除地址",
    currentItem: -1,
    searchLabelShow: !1,
    currentAddress: "",
    nearbyAddress: [],
    chooseAddress: !1,
    searchText: "搜索收货地址",
    e:[],
    order_id:0,
    goods_type:0,
    saleid:0,
    coupon:0,
    cart:0,
  },
  handleFocus: function (e) {
    this.setData({
      searchLabelShow: !0
    });
  },
  handleBlur: function (e) {
    this.setData({
      searchLabelShow: !1
    });
  },
  // 删除地址
  delAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.addressId;
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success: function (res) {
        if (res.confirm) {
          server.getJSON('/User/del_address/wxtoken/' + wx.getStorageSync('wxtoken') + '/id/' + id, function (res) {
            if (res.data.status == 1) {
              that.onShow();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
              })
            }
          })
        }
      }
    })
  },

  handleRefresh: function () {
    this.getAddressList(this);
  },
  getAddressList: function (t) {
    wx.showLoading({
      title: "加载中",
      mask: !0
    }), wx.getLocation({
      type: "gcj02",
      success: function (s) {
        var n = s.latitude, r = s.longitude;
        e.reverseGeocoder({
          location: {
            latitude: n,
            longitude: r
          },
          get_poi: 1,
          success: function (e) {
            t.setData({
              currentAddress: e.result.formatted_addresses.recommend,
              nearbyAddress: e.result.pois
            }), wx.hideLoading();
          },
          fail: function (e) {
            console.log(e);
          }
        });
      }
    });
  },
  handleInput: function (e) {
    e.detail.value || this.handleRefresh();
  },
  clickAddress: function (e) {
    var s = e.currentTarget.dataset.id, r = this.data.nearbyAddress, a = {};
    r.length > 0 && r.forEach(function (e) {
      e.id === s && (a = t({}, e));
    });
    try {
      wx.setStorageSync("wj_locationInfo", a);
    } catch (e) { }
    n.toAddAddress();
  },
  handleConfirm: function (t) {
    var s = this;
    t.detail.value ? e.search({
      keyword: t.detail.value,
      success: function (e) {
        console.log(e), s.setData({
          nearbyAddress: e.data
        });
      },
      fail: function (e) {
        console.log(e);
      }
    }) : s.handleRefresh();
  },
  toAddAddress: function () { //跳转新增收货地址
    var wxtoken = wx.getStorageSync('wxtoken')
    var that=this
    var t = this.data.order;
    console.log(this.data.order)
    var sale_id=that.data.saleid
    var goods_type=that.data.goods_type
    var coupon=that.data.coupon
    var cart=that.data.cart
    var str='&goods_type='+goods_type+'&coupon='+coupon+'&cart='+cart
    if (wxtoken != '') {
         // if(sale_id>0){
          // pages/mallModule/member/member/address/addAddress/addAddress
                     wx.navigateTo({
                      url: "../../../../mallModule/member/address/addAddress/addAddress?sendType=配送&sale_id="+sale_id+str,
                    })
                // }else{
                //  wx.navigateTo({
                //       url: "../../../../mallModule/member/address/addAddress/addAddress?sendType=配送&goods_type="+0+'&coupon='+coupon,
                //     })
                // }
    } else {
      wx.showToast({
        title: '请登录后再添加地址哦~',
        icon: "none",
        duration: 2e3
      })
    };
    // this.checkAuth() ? n.toAddAddress() : wx.showToast({
    //     title: "请登录后再添加地址哦~",
    //     icon: "none",
    //     duration: 2e3
    // });
  },
  checkAuth: function () {
    return !!a.globalData.userInfo;
  },

  editAddress: function (e) { //编辑地址
    console.log(e);
    var t = e.currentTarget.id;
    try {
      var s = {
        id: t
      };
      wx.setStorageSync("wj_editAddress", s); //存储id
    } catch (e) {
      // console.log(1);
    }
    n.toAddAddress("?doEditAddress=edit");
  },



  handleChoose: function (data) {
    var that=this
    var t = this.data.order;
    var address_id=data.currentTarget.dataset.id
    var goods_type=that.data.goods_type;
    var saleid=that.data.saleid;
    var coupon=that.data.coupon;
    var str='&address_id='+address_id+'&saleid='+saleid+'&coupon='+coupon;
 
    if (t.sendType =='配送'){
      // if(saleid>0){
         wx.navigateTo({
          url: '../../../order/perfectOrder/perfectOrder?goods_type='+goods_type+str,
        })
      // }else{
      //      wx.navigateTo({
      //       url: '../../../order/perfectOrder/perfectOrder?goods_type='+goods_type+'&address_id='+address_id ,
      //    })
      // }
       
    }
  },
  bindDelete: function () {
    0 == this.data.isDelete ? this.setData({
      isDelete: !0,
      isDeleteText: "取消",
      currentItem: -1
    }) : this.setData({
      isDelete: !1,
      isDeleteText: "删除地址"
    });
  },
  doDeleteAddress: function () {
    var e = this, t = this.data.isDeleteId;
    t && "" != t ? s.removeById(t).then(function (s) {
      console.log(s), e.queryAddress(), e.setData({
        isDeleteId: "",
        currentItem: -1
      }), wx.showToast({
        title: "删除成功~",
        icon: "none",
        duration: 2e3
      });
      try {
        var n = wx.getStorageSync("wj_chooseAddressInfo");
        n && n.id === t && wx.removeStorageSync("wj_chooseAddressInfo");
      } catch (e) { }
    }) : wx.showToast({
      title: "请选择要删除的地址~",
      icon: "none",
      duration: 2e3
    });
  },
  queryAddress: function () {
    var e = this;
    this.checkAuth() && s.query().then(function (s) {
      console.log(s);
      var n = [];
      s && s.length > 0 && s.forEach(function (e) {
        var s = t({}, e, {
          gender: "MALE" === e.gender
        });
        if (s = "MALE" === e.gender ? t({}, e, {
          gender: "先生"
        }) : "FEMALE" === e.gender ? t({}, e, {
          gender: "女士"
        }) : t({}, e, {
          gender: ""
        }), n.push(s), e.defaultAddress) {
          var r = s;
          try {
            wx.setStorageSync("wj_chooseAddressInfo", r);
          } catch (e) { }
        }
      }), e.setData({
        addressList: n
      });
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  },
  onLoad: function (t) {
    console.log(t)
    this.setData({
      order: t,
      order_id:t.order_id,
      goods_type:t.goods_type,
      saleid:t.sale_id,
      coupon:t.coupon,
      cart:t.cart
    })
    wx.hideShareMenu(), e = new r({
      key: "M4TBZ-4KSRI-DQPGJ-54BUF-UUJX5-YKFH3"
    }), "perfectOrder" === t.from && (wx.setNavigationBarTitle({
      title: "地址选择"
    }), a.globalData.userInfo.member && (this.getAddressList(this), this.setData({
      chooseAddress: !0
    })));
  },
  onReady: function () { },
  onShow: function () {
    var that = this;
    var wxtoken = wx.getStorageSync('wxtoken');
    wx.request({
      url: imgurl + '/user/address_list/wxtoken/' + wxtoken,
      success(res) {
        var data = res.data;
        console.log(data)
        for (var i = 0; i < data.list.length; i++) {
          if (data.list[i].type != '') {
            if (data.list[i].type == '0') {
              data.list[i].type = '家'
            };
            if (data.list[i].type == '1') {
              data.list[i].type = '公司'
            };
            if (data.list[i].type == '2') {
              data.list[i].type = '学校'
            };
          };
        }
        that.setData({
          addressList: data.list
        })
      }
    })
    // wx.hideShareMenu(), a.globalData.userInfo.member ? this.queryAddress() : wx.showToast({
    //     title: "您还不是会员，请先绑定手机号码成为会员",
    //     icon: "none",
    //     duration: 2e3
    // });
  },
  onHide: function () { },


  onUnload: function () { 
       wx.reLaunch({
        url: '../../../mallModule/index/index/index'
      })
  },
  tohome:function(){
    wx.navigateBack({
      delta:2
    })
  },


  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
}, "checkAuth", function () {
  return !!a.globalData.userInfo;
}));