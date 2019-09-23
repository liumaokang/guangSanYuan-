var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
function e(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

function t(e, t) {
  wx.showToast({
    icon: "loading",
    title: "正在搜索...",
    duration: 2e4
  });
  var a = {
    url: "https://dev.gomoretech.com/demo/newretail-search/api/search/product/queryByVoice",
    filePath: e,
    name: "file",
    header: {
      "Content-Type": "application/json"
    },
    formData: {
      storeId: t
    },
    success: function (e) {
      var t = JSON.parse(e.data), a = null;
      getCurrentPages().forEach(function (e) {
        "pages/search/search" === e.route && (a = e);
      }), wx.hideToast(), t.data ? a.setProduct(t.data) : wx.showToast({
        title: "未检测到语音",
        icon: "none",
        duration: 2e3
      });
    },
    fail: function (e) {
      console.log(e), wx.hideToast();
    }
  };
  wx.uploadFile(a);
}

var a, o = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t];
    for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
  }
  return e;
}, r = (require("../../../../api/storeService.js"), require("../../../../api/productService.js")), s = require("../../../../api/shopcartService.js"), c = (require("../../../../utils/utils.js"),
  require("../../../../utils/navPage.js")), n = require("../../../../utils/address.js"), i = require("../../../../utils/authorize.js"), h = getApp(), l = wx.getRecorderManager();

l.onStart(function () {
  console.log("recorder start");
}), l.onPause(function () {
  console.log("recorder pause");
}), l.onStop(function (e) {
  console.log("recorder stop", e);
  e.tempFilePath;
}), l.onFrameRecorded(function (e) {
  var t = e.frameBuffer;
  console.log("frameBuffer.byteLength", t.byteLength);
}), l.onError(function (e) {
  console.log("error", e);
}), Page((a = {
  data: {
    userInfo: {},
    storeId: "",
    store: "",
    page: 1,
    pageSize: 0,
    url: url,
    searchCount: !0,
    searchLabelShow: !1,
    searchFocus: !0,
    searchText: "请输入搜索内容",
    searchItem: "",
    goodsList: [],
    goodlist: [],
    show: true,
    searchHistory: [],
    nameLikes: "",
    placeholderText: "",
    keyboardHeight: 0,
    recorderType: "normal",
    toast: {
      show: !1,
      title: "向上滑动取消",
      image: "../../../../image/iconMicrophoneWhite.png"
    },
    phone: !1,
    meals: {
      show: !1,
      productId: "",
      storeId: ""
    },
    hasUserInfo: !1
  },
  handleFocus: function (e) {
    this.setData({
      searchLabelShow: !0,
      goodsList: [],
      searchItem: ""
    });
  },
  handleInputFocus: function () {
    this.setData({
      goodlist: []
    })
  },
  handleBlur: function (e) {
    // console.log(1)
  },
  handleInput: function (e) {
    this.setData({
      nameLikes: e.detail.value,
      placeholderText: ""
    });
  },
  toSearch: function () {
    var that = this;
    var value = this.data.nameLikes;
    that.setSearchHistory(value)
    var url = h.globalData.imgurl;
    var imgurl = h.globalData.url;
    wx.request({
      url: url + '/goods/goods_list',
      data: {
        goodsName: value,
      },
      type: "get",
      success: function (res) {
        if (res.data.status == 1) {
          var goodlist = res.data.result.list;
          that.setData({
            goodlist: goodlist,
            url: imgurl,
          })
        } else {
          wx.showToast({
            title: '暂无商品',
            icon: "none"
          })
        }
      }
    })
  },
  handleConfirm: function (e) {
    var that = this;
    var value = e.detail.value
    that.setSearchHistory(value)
    that.toSearch()
  },
  getSearchProduct: function (e) {
    var t = this.data.storeId, a = this, s = this.data.page, c = this.data.pageSize, n = this.data.searchCount;
    r.getSearchProduct(t, s, c, e, n).then(function (e) {
      console.log(e);
      var t = [];
      if (e.records && e.records.length > 0) {
        e.records.forEach(function (e) {
          var a = [], r = [], s = "";
          if (e.labels && e.labels.length > 0 && e.labels.forEach(function (e) {
            "GOODSLABEL" === e.type ? a.push(e) : "PROMOTIONLABEL" === e.type && r.push(e);
          }), e.productProperties && e.productProperties.length > 0) for (var c = 0; c < e.productProperties.length; c++) {
            var n = e.productProperties[c];
            if ("规格" === n.propertyName) {
              s = n.propertyValue;
              break;
            }
          }
          var i = o({}, e, {
            produtlabel: a,
            promotions: r,
            specifications: s
          });
          t.push(i);
        });
        var r = a.productsSort(t);
        a.setData({
          goodsList: r,
          searchLabelShow: !0
        });
      } else wx.showToast({
        title: "没有您想搜索的商品！",
        icon: "none",
        duration: 2e3
      });
    }), this.setSearchHistory(e);
  },
  setSearchHistory: function (e) {
    var t = this.data.searchHistory;
    t.unshift(e);
    var a = new Set(t), o = Array.from(a);
    wx.setStorageSync("searchDataLog", o);
    var r = o.slice(0, 10);
    this.setData({
      searchHistory: r
    });
  },

toGoodsDetail: function (e) { //普通商品
    var goodsid = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&&goods_type=0',
    })
  },


  clickSearchItem: function (e) {
    var t = this;
    t.handleFocus(), t.setData({
      searchItem: e.currentTarget.dataset.value,
      nameLikes: e.currentTarget.dataset.value
    });
    t.toSearch();
  },
  clearSearchHistory: function () {
    var e = this;
    wx.removeStorageSync("searchDataLog"), e.setData({
      searchHistory: []
    });
  },
  showGMToast: function (e) {
    var t = e.title, a = e.image;
    this.setData({
      toast: {
        show: !0,
        title: t,
        image: a
      }
    });
  },
  hideGMToast: function () {
    this.setData({
      toast: o({}, this.data.toast, {
        show: !1
      })
    });
  },
  setProduct: function (e) {
    var t = this, a = [];
    if (e.voiceName && t.setData({
      searchItem: e.voiceName,
      nameLikes: e.voiceName,
      placeholderText: e.voiceName,
      searchLabelShow: !0,
      searchFocus: !1
    }), e.results.records && e.results.records.length > 0) {
      e.results.records.forEach(function (e) {
        var t = [], r = [], s = "";
        if (e.labels && e.labels.length > 0 && e.labels.forEach(function (e) {
          if ("GOODSLABEL" === e.type) {
            var a = {
              id: e.product_id,
              color: e.label_color,
              imageUrl: e.image_url,
              labelDetails: e.label_details,
              labelName: e.label_name,
              pictureHeight: e.picture_height,
              pictureWidth: e.picture_width,
              type: e.type
            };
            t.push(a);
          } else if ("PROMOTIONLABEL" === e.type) {
            var o = {
              id: e.product_id,
              color: e.label_color,
              imageUrl: e.image_url,
              labelDetails: e.label_details,
              labelName: e.label_name,
              pictureHeight: e.picture_height,
              pictureWidth: e.picture_width,
              type: e.type
            };
            r.push(o);
          }
        }), e.productProperties && e.productProperties.length > 0) for (var c = 0; c < e.productProperties.length; c++) {
          var n = e.productProperties[c];
          if ("规格" === n.propertyName) {
            s = n.propertyValue;
            break;
          }
        }
        var i = o({}, e, {
          id: e.product_id,
          soldCount: e.sold_count,
          sellPrice: e.sell_price,
          name: e.product_name,
          description: "",
          imageUrl: e.url,
          originalPrice: e.original_price,
          produtlabel: t,
          promotions: r,
          specifications: s
        });
        a.push(i);
      }), t.setData({
        goodsList: a,
        searchLabelShow: !0
      });
      try {
        wx.getStorageSync("wj_speechSearch") && wx.removeStorageSync("wj_speechSearch");
      } catch (e) { }
    } else this.getStoreProduct(this.data.storeId);
  },
  productsSort: function (e) {
    var t = [], a = [];
    return e.forEach(function (e) {
      0 === e.balance ? t.push(e) : a.push(e);
    }), h.globalData.systemConfigure.storeProductBalanceIsZeroShow ? a.concat(t) : a;
  },
  getStoreProduct: function (e) {
    var t = this, a = {
      page: 1,
      pageSize: 0,
      hot: !0,
      storeIdEquals: e,
      business: "RETAIL"
    };
    r.query(a).then(function (e) {
      console.log(e);
      var a = [];
      if (e.records && e.records.length > 0) {
        e.records.forEach(function (e) {
          var t = [], r = [], s = "";
          if (e.labels && e.labels.length > 0 && e.labels.forEach(function (e) {
            "GOODSLABEL" === e.type ? t.push(e) : "PROMOTIONLABEL" === e.type && r.push(e);
          }), e.productProperties && e.productProperties.length > 0) for (var c = 0; c < e.productProperties.length; c++) {
            var n = e.productProperties[c];
            if ("规格" === n.propertyName) {
              s = n.propertyValue;
              break;
            }
          }
          var i = o({}, e, {
            produtlabel: t,
            promotions: r,
            specifications: s
          });
          a.push(i);
        });
        var r = t.productsSort(a);
        t.setData({
          goodsList: r,
          searchFocus: !1
        });
      } else t.setData({
        goodsList: a
      });
    });
  },
  recorderStart: function (e) {
    var t = this, a = e.touches[0].pageX, o = e.touches[0].pageY, r = 0, s = setInterval(function () {
      r++;
    }, 100);
    this.setData({
      touchDotX: a,
      touchDotY: o,
      interval: s,
      time: r
    }), t.showGMToast({
      title: "向上滑动取消",
      image: "../../../../image/iconMicrophoneWhite.png"
    });
    var c = {
      duration: 1e4,
      sampleRate: 16e3,
      numberOfChannels: 1,
      encodeBitRate: 48e3,
      format: "aac",
      frameSize: 50
    };
    l.start(c), l.onStart(function () {
      console.log("录音开始"), t.setData({
        recorderType: "success"
      });
    });
  },
  recorderCancel: function (e) {
    console.log("录音取消", e), this.hideGMToast(), l.stop(), that.setData({
      recorderType: "cancel"
    });
  },
  recorderMove: function (e) {
    var t = this, a = this.data.touchDotX, o = this.data.touchDotY, r = this.data.interval, s = this.data.time, c = e.changedTouches[0].pageX - a, n = e.changedTouches[0].pageY - o;
    if (s < 20) {
      var i = Math.abs(c), h = Math.abs(n);
      i > 2 * h && (c < 0 ? console.log("左滑=====") : console.log("右滑=====")), h > 2 * i && (n < 0 ? (t.showGMToast({
        title: "取消发送",
        image: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/iconMicrophoneBack.png"
      }), l.pause(), t.setData({
        recorderType: "cancel"
      })) : (l.resume(), t.showGMToast({
        title: "向上滑动取消",
        image: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/iconMicrophoneWhite.png"
      }), t.setData({
        recorderType: "success"
      })));
    }
    clearInterval(r), this.setData({
      time: 0
    });
  },
  recorderEnd: function (e) {
    console.log("录音结束");
    var a = this, o = this.data.recorderType;
    a.hideGMToast(), l.stop(), "success" === o && (console.log("success", o), l.onStop(function (e) {
      var o = e.tempFilePath;
      console.log(o), t(o, a.data.storeId);
    }));
  },
  onLoad: function (e) {
    var t = this;
    h.globalData.storeInfo ? (t.setData({
      store: h.globalData.storeInfo.name,
      storeId: h.globalData.storeInfo.id
    }), t.getShopCart(t.data.storeId)) : n.getLocation().then(function (e) {
      h.globalData.storeInfo = e, t.getShopCart(e.id);
    }).catch(function (e) {
      console.log(e);
    }), e.keyword && "undefined" != e.keyword && "atOnce" === e.type ? ("" != wx.getStorageSync("searchDataLog") && t.setData({
      searchHistory: wx.getStorageSync("searchDataLog").slice(0, 10),
      searchItem: e.keyword,
      nameLikes: e.keyword,
      placeholderText: e.keyword,
      searchLabelShow: !0,
      searchFocus: !1
    }), t.getSearchProduct(e.keyword)) : e.keyword && "wait" === e.type ? (t.handleFocus(),
      "" != wx.getStorageSync("searchDataLog") && t.setData({
        searchHistory: wx.getStorageSync("searchDataLog").slice(0, 10)
      }), t.setData({
        nameLikes: e.keyword,
        placeholderText: e.keyword
      })) : (t.handleFocus(), "" != wx.getStorageSync("searchDataLog") && t.setData({
        searchHistory: wx.getStorageSync("searchDataLog").slice(0, 10)
      }));
    try {
      var a = wx.getStorageSync("wj_speechSearch");
      a && (console.log(a), t.setProduct(a), t.setData({
        searchFocus: !1
      }));
    } catch (e) { }
    if (t.options.mobile && "" != t.options.mobile && void 0 != t.options.mobile) {
      var o = t.options.mobile;
      try {
        wx.setStorageSync("wj_sharingId", o);
      } catch (e) { }
    }
    this.getSharePictures(), this.checkUserInfo();
  },
  onReady: function () { },
  onShow: function () {
    !0 === this.data.phone && this.handlePopupPhone();
  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () {
    var e = this.data.sharePictures;
    return h.globalData.userInfo && h.globalData.userInfo.member ? {
      title: "",
      path: "/pages/mallModule/goods/search/search?mobile=" + h.globalData.userInfo.member.id,
      imageUrl: e,
      success: function (e) { }
    } : {
        title: "",
        path: "/pages/mallModule/goods/search/search",
        imageUrl: e,
        success: function (e) { }
      };
  },
  getSharePictures: function () {
    h.globalData.sharePictures && this.setData({
      sharePictures: h.globalData.sharePictures
    });
  },
  checkAuth: function () {
    try {
      return !!h.globalData.userInfo;
    } catch (e) { }
  },
  addShopcartCatch: function (e) {
    this.addShopCartData = e;
  },

   addShopCarts: function (e) { //加入购物车
    var that = this;
    var wxtoken = wx.getStorageSync('wxtoken')
    var goodsId = e.currentTarget.dataset.id;
    console.log(goodsId)
    if (wxtoken != '') {
      wx.request({
        url: imgurl + '/Cart/ajaxAddCart/goods_id/' + goodsId + '/goods_num/1/' + 'wxtoken/' + wxtoken,
        success(res) {
          var data = res.data;
          console.log(data)
          if (data.msg == '成功加入购物车') {
            wx.showToast({
              title: data.msg,
              icon: 'success',
              duration: 1000
            });
          } else {
            wx.showToast({
              title: data.msg,
              icon: 'none',
              duration: 2e3
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请先登录哦',
        icon: 'none',
        duration: 1000
      })
    }
  },
}, e(a, "checkAuth", function () {
  try {
    return !!h.globalData.userInfo;
  } catch (e) { }
}), e(a, "handleUserLogin", function () {
  console.log(h.globalData.userInfo);
  var e = this;
  if (h.globalData.userInfo) {
    var t = h.globalData.userInfo;
    this.setData({
      userInfo: o({}, t.wxaUser)
    }), h.globalData.userInfo.member ? e.setData({
      hasUserInfo: !0
    }) : e.setData({
      userInfo: t.wxaUser,
      hasUserInfo: !0
    });
  }
}), e(a, "handlePopupPhone", function () {
  h.globalData.userInfo.member ? this.setData({
    phone: !1
  }) : this.setData({
    phone: !0
  });
}), e(a, "handleBindPhone", function (e) {
  console.log(e.detail), !0 === e.detail.bindMobile && this.handlePopupPhone();
}), e(a, "chooseOutcome", function (e) {
  !0 === e.detail.outcome && (this.setData({
    meals: {
      show: !1,
      productId: "",
      storeId: ""
    }
  }), this.handleTouchOnGoods(this.addShopCartData));
}), e(a, "getShopCart", function (e) {
  var t = this;
  if (h.globalData.userInfo && h.globalData.userInfo.member) {
    s.getCatering(e).then(function (e) {
      var a = {}, o = [];
      e.items && e.items.length > 0 && e.items.forEach(function (e) {
        if (!e.grabActivityId && !e.newmbrActivityId) {
          for (var t = -1, r = 0; r < o.length; r++) e.productId == o[r] && (t = r);
          t > -1 ? a[e.productId] = a[e.productId] + e.productNum : (a[e.productId] = e.productNum,
            o.push(e.productId));
        }
      }), t.setData({
        shopCart: a,
        shopCartGoodsId: o
      });
      var r = {
        goodsId: o,
        items: a
      };
      try {
        wx.setStorageSync("wj_shopCartStorage", r);
      } catch (e) { }
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
    var a = wx.getStorageSync("wj_userProductsCount"), o = String(a);
    o && h.setTabBarBadge("shopping_cart", o), s.getProductsCount().then(function (e) {
      h.setTabBarBadge("shopping_cart", String(e));
      try {
        wx.setStorageSync("wj_userProductsCount", e);
      } catch (e) { }
    }).catch(function (e) {
      wx.showToast({
        title: e.message,
        icon: "none",
        duration: 2e3
      });
    });
  }
}), e(a, "addLocalGoods", function (e) {
  try {
    var t = wx.getStorageSync("wj_shopCartStorage"), a = wx.getStorageSync("wj_userProductsCount");
    if (a = Number(a), a++ , a = String(a), h.setTabBarBadge("shopping_cart", a), t) {
      var o = t.goodsId, r = t.items, s = [], c = e, n = -1;
      if (o.length > 0) for (var i = 0; i < o.length; i++) s.push(o[i]), c == o[i] && (n = i);
      n > -1 ? r[c] = Number(r[c]) + 1 : (s.push(c), r[c] = 1), this.setData({
        shopCart: r,
        shopCartGoodsId: s
      });
      var l = {
        goodsId: s,
        items: r
      };
      wx.setStorageSync("wj_shopCartStorage", l);
    }
    wx.setStorageSync("wj_userProductsCount", a);
  } catch (e) { }
}), e(a, "reduceLocalGoods", function (e) {
  try {
    var t = wx.getStorageSync("wj_shopCartStorage"), a = wx.getStorageSync("wj_userProductsCount");
    if (a = Number(a), a-- , a = String(a), h.setTabBarBadge("shopping_cart", a), t) {
      var o = t.goodsId, r = t.items, s = [], c = e, n = -1;
      if (o.length > 0) for (var i = 0; i < o.length; i++) s.push(o[i]), c == o[i] && (n = i);
      n > -1 && (r[c] = Number(r[c]) - 1, r[c] <= 0 && s.splice(n, 1)), this.setData({
        shopCart: r,
        shopCartGoodsId: s
      });
      var l = {
        goodsId: s,
        items: r
      };
      wx.setStorageSync("wj_shopCartStorage", l);
    }
    wx.setStorageSync("wj_userProductsCount", a);
  } catch (e) { }
}), e(a, "handleTouchOnGoods", function (e) {
  this.addLocalGoods(e.target.dataset.id);
}), e(a, "checkUserInfo", function () {
  h.globalData.userInfo && (this.setData({
    hasUserInfo: !0
  }), h.globalData.userInfo.member && this.setData({
    isMember: !0
  }));
}), e(a, "getUserInfo", function (e) {
  var t = this;
  i.login(e).then(function (e) {
    t.setData({
      hasUserInfo: !0
    }), e.member ? t.setData({
      isMember: !0
    }) : c.toAuthorize();
  }).catch(function (e) {
    wx.showToast({
      title: e.message,
      icon: "none",
      duration: 2e3
    });
  });
}), a));