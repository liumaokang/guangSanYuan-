var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, o = require("../../../../api/storeService.js"), 
// a = require("../../../../api/productService.js"),
 r = require("../../../../api/shopcartService.js"), n = (require("../../../../api/memberService.js"), 
require("../../../../api/bannerService.js")), s = require("../../../../utils/utils.js"), i = require("../../../../utils/navPage.js"), c = require("../../../../utils/address.js"), l = require("../../../../utils/fly.js"), u = require("../../../../utils/authorize.js"), d = getApp();
var server = require('../../../../utils/server')
var url=d.globalData.url
Page({
      data: {
      url: url,
        currentTab: 0,
        list_show: true,
        id: '',

        storeId: "",
        store: "",
        imgurl: imgurl,
        urls:"https://v.coolndns.com/index.php",
        category: [],
        tabSelected:"0",
        current: 0,
        titleSearch: !0,
        goodsList: [],
        goodsLists:[],
        scrollList: [],
        banners: [],
        device: {},
        cartlist:[],
        p: 1,
        id: 0,
        sort: '', //价格
        sort_asc: '', //销量
        sel: '',
        q: '', //关键字
        maxNum: 0,
        scrollTop: 0,
        isScrollTo: !1,
        loading: !0,
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        overlayStyle: "background: rgba(255, 255, 255, 0.9)",
        tabbar: {},
        showTabbar: !1,
        phone: !1,
        meals: {
            show: !1,
            productId: "",
            storeId: ""
        },
        hide_good_box: !0,
        animation: {},
        shopCart: {},
        shopCartGoodsId: [],
        hasUserInfo: !1,
        isMember: !1
    },


  go_pingtuan: function (e) { //去拼团

    var goodsid=e.currentTarget.dataset.goodsid;
    // console.log(goodsid)
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&goods_type=0',
    })
  },


  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      // console.log(e.target.dataset.current)
      var id = e.target.dataset.current;
      that.setData({
        currentTab: e.target.dataset.current
      })

        wx.request({
          url: imgurl + '/Goods/goods_list',
          method: "POST",
          data: {
            wxtoken: wx.getStorageSync("wxtoken"),
            id: id,
          },
          success: function (res) {
            var data = res.data;
            console.log(data)
            var list = data.result.list;
            that.setData({
              goodsLists: list
            })
            // if (data.data.title == "该类暂无商品") {
            //   that.setData({
            //     list_show: false
            //   });
            //   wx.showToast({
            //     title: data.data.title,
            //     icon: 'loading',
            //     duration: 1000
            //   })
            // } else {
            //   that.setData({
            //     goodsCategory: data.data,
            //     list_show: true
            //   })
            // }

          }
        });
      

    }
  },

  //商品列表
  clickTabs: function (cateId) {
    var that = this;
    var cateIds = cateId.currentTarget.dataset.idx; //分类id
    var index = cateId.currentTarget.dataset.index //分类下标
    var sort = that.data.sort;
    var sort_asc = that.data.sort_asc;
    var q = that.data.q;
    var sel = that.data.sel;
    var page = that.data.p;
    var index = cateId.currentTarget.dataset.index
    that.setData({
      tabSelected: index
    })
    console.log(cateIds)
    wx.request({
      url: that.data.urls + '/wxapi/Goods/goods_list',
      method: 'POST',
      data: {
        wxtoken: wx.getStorageSync("wxtoken"),
        // p: page,
        id: cateIds,
        // sort: sort,
        // sort_asc: sort_asc,
        // sel: sel,
        // q: q
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var goodlist = res.data.result.list;
        that.setData({
          goodsList: goodlist
        })
        console.log(that.data.goodsList);
      }
    })
  },





    toHome: function() {
        i.toHome();
    },
    handleConfirm: function(t) {
        var e = this.data.searchText;
        wx.navigateTo({
            url: "../../goods/search/search?keyword=" + e + "&type=wait",
            fail: function(t) {
                console.log(t);
            }
        });
    },
    toMemberCard: function(t) {
        try {
            wx.setStorageSync("wj_wxa_formId", t.detail.formId);
        } catch (t) {}
        this.data.hasUserInfo && this.data.isMember ? i.toMemberCard() : i.toAuthorize();
    },
    getBannerList: function() {
        var t = this;
        s.setHideLoading(!0), n.getStoreBannerList("CATEGORY", this.data.storeId).then(function(e) {
            console.log(e), t.setData({
                banners: e.map(function(t) {
                    return t.pictureUrl += "?x-oss-process=image/resize,h_300/quality,Q_95", t;
                })
            });
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toAdPage: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "banner", o = t.currentTarget.dataset.item;
        if ("APP" === o.linkType) "MIAOSHA" === o.appReturnType ? i.toSeckill() : "RECHARGE" === o.appReturnType ? i.toRecharge() : "MEAL" === o.appReturnType || ("RECEIVECOUPON" === o.appReturnType ? i.toCouponCenter() : "ADVANCE_SELL_PRODUCT" === o.appReturnType ? i.toAdvanceSell() : "TEAM_BUYING" === o.appReturnType ? i.toFightGroup() : "SCOREMALL" === o.appReturnType ? i.toScoreMall() : "INVITE_MEMBER" === o.appReturnType ? i.toInvite() : "MEMBER_CARD" === o.appReturnType ? i.toMemberCard() : "MY_COUPON" === o.appReturnType ? i.toMyCoupon() : "NEWMBR" === o.appReturnType && i.toNewmbrActivity()); else if ("GRADPRODUCT" === o.linkType) {
            var a = "?productId=" + o.productId + "&storeId=" + d.globalData.storeInfo.id + "&activityId=" + o.grabActivityId + "&type=secondkill";
            i.toGoodsDetails(a);
        } else if ("PRODUCT" === o.linkType) {
            var r = "?productId=" + o.productId + "&storeId=" + d.globalData.storeInfo.id + "&type=normal";
            i.toGoodsDetails(r);
        } else if ("TEAMPRODUCT" === o.linkType) {
            var n = "?productId=" + o.teamActivityId + "&storeId=" + d.globalData.storeInfo.id + "&type=group";
            i.toGoodsDetails(n);
        } else if ("COUPONACTIVITYDETAILS" === o.linkType) if (d.globalData.userInfo) if (d.globalData.userInfo.member) {
            var s = "?couponActivityId=" + o.couponActivityId + "&type=assign&isExternal=false";
            i.toCouponDetails(s);
        } else wx.showToast({
            title: "您还不是会员，请绑定手机号成为会员~",
            icon: "none",
            duration: 2e3
        }), setTimeout(function() {
            i.toAuthorize();
        }, 2e3); else i.toAuthorize(); else if ("URL" === o.linkType) {
            var c = null;
            "activity" === e ? c = o.linkUrl : "banner" === e && (c = o.link);
            var l = c;
            c.indexOf("?") > -1 && (l = l + "&storeId=" + this.data.storeId + "&type=normal");
            var u = {
                url: encodeURIComponent(l)
            }, h = "?webUrl=" + JSON.stringify(u);
            i.toAdvertising(h);
        }
    },
    swiperChange: function(t) {
        this.setData({
            current: t.detail.current
        });
    },
    getMenuProduct: function(t) {
        function o(o) {
            return s.setHideLoading(!0), a.getMenuProduct(t, o).then(function(t) {
                wx.hideLoading();
                var a = [];
                return t.forEach(function(t) {
                    var r = e({}, t, {
                        business: o
                    });
                    a.push(r);
                }), a;
            }).catch(function(t) {
                return wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                }), [];
            });
        }
        var r = this, n = (s.setHideLoading(!0), a.getAllCategory().then(function(t) {
            return t;
        }).catch(function(t) {
            return wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            }), [];
        })), i = o("RETAIL"), c = o("CATERING");
        Promise.all([ i, c, n ]).then(function(t) {
            var o = t[0].concat(t[1]), a = [], n = [];
            t[2].length > 0 && t[2].forEach(function(t) {
                "RETAIL" === t.business ? a = a.concat(t.children) : "CATERING" === t.business && (n = n.concat(t.children));
            });
            var s = a.concat(n), i = [], c = [], l = [];
            if (s && s.length > 0 && o && o.length > 0) {
                s.forEach(function(t) {
                    o.forEach(function(o) {
                        if (t.id === o.categoryId && t.business === o.business) {
                            var a = {
                                categoryId: o.categoryId,
                                menuName: o.menuName
                            }, n = r.productsSort(o.products), s = [];
                            n.length > 0 && (n.forEach(function(t) {
                                var o = [], a = [], r = null;
                                if (t.labels && t.labels.length > 0 && t.labels.forEach(function(t) {
                                    "GOODSLABEL" === t.type ? o.push(t) : "PROMOTIONLABEL" === t.type && a.push(t);
                                }), t.productProperties && t.productProperties.length > 0) for (var n = 0; n < t.productProperties.length; n++) {
                                    var i = t.productProperties[n];
                                    if ("规格" === i.propertyName) {
                                        r = i.propertyValue;
                                        break;
                                    }
                                }
                                var c = {};
                                a = a.reduce(function(t, e) {
                                    return c[e.labelName] || (c[e.labelName] = t.push(e)), t;
                                }, []);
                                var u = e({}, t, {
                                    produtlabel: o,
                                    promotions: a,
                                    specifications: r || ""
                                });
                                s.push(u), l.push(u);
                            }), i.push(s), c.push(a));
                        }
                    });
                }), wx.hideToast(), r.setData({
                    category: c,
                    goodsList: i.map(function(t) {
                        return t.map(function(t) {
                            return t.imageUrl = t.imageUrl + "?x-oss-process=image/resize,h_250/quality,Q_95", 
                            t;
                        });
                    }),
                    allGoodsList: l
                }), r.setData({
                    loading: !1
                });
                var u = wx.createSelectorQuery();
                setTimeout(function() {
                    u.selectAll(".goods-content").boundingClientRect(), u.exec(function(t) {
                        console.log(t), r.setData({
                            scrollList: t[0]
                        });
                        try {
                            for (var e = wx.getSystemInfoSync(), o = 0, a = t[0].length, n = t[0].length - 1; n > 0; n--) {
                                var s = t[0][n];
                                o < e.windowHeight && (o += s.height, a = n);
                            }
                            r.setData({
                                maxNum: a,
                                device: e
                            });
                        } catch (t) {}
                    });
                }, 100);
            } else r.setData({
                category: c,
                goodsList: i.map(function(t) {
                    return t.map(function(t) {
                        return t.imageUrl = t.imageUrl + "?x-oss-process=image/resize,h_250/quality,Q_95", 
                        t;
                    });
                })
            }), r.setData({
                loading: !1
            });
        });
    },
    productsSort: function(t) {
        var e = [], o = [];
        return t.forEach(function(t) {
            0 === t.balance ? e.push(t) : o.push(t);
        }), d.globalData.systemConfigure.storeProductBalanceIsZeroShow ? o.concat(e) : o;
    },
    toGoodsDetail: function(t) { //前去详情
      var e = "?goodsid=" + t.currentTarget.dataset.productid + "&storeId=" + this.data.storeId + "&type=normal" + "&goods_type=0";
        i.toGoodsDetails(e);
    },
    clickCategory: function(t) {
        this.setData({
            tabSelected: t.currentTarget.dataset.idx,
            isScrollTo: !0
        });
        var e = this, o = t.currentTarget.dataset.idx, a = e.data.scrollList;
        wx.pageScrollTo({
            scrollTop: a[o].top - a[0].top,
            duration: 0
        });
    },
    onPageScroll: function(t) {
        var e = this, o = e.data.scrollList, a = e.data.isScrollTo, r = t.scrollTop, n = e.data.tabSelected;
        e.data.maxNum;
        if (a) e.setData({
            isScrollTo: !1
        }); else for (var s = 0; s < o.length; s++) {
            var i = o[s].top - o[0].top, c = o[s].top + o[s].height - o[0].top;
            r >= i && r < c && (n = s) !== e.data.tabSelected && e.setData({
                tabSelected: n,
                isScrollTo: !1
            });
        }
    },
    queryGoodsInventory: function(t) {
        var e = d.globalData.storeInfo.id, o = 0;
        return a.getDetails(e, t).then(function(t) {
            o = t.balance;
        }), o;
    },
    checkAuth: function() {
        return !!d.globalData.userInfo;
    },
    bindscrolltolower: function(t) {},
  
    // onPageScroll: function(t) {
        
    //     var e = this, o = e.data.scrollList, a = e.data.isScrollTo, r = t.scrollTop, n = e.data.tabSelected;
    //     e.data.maxNum;
    //     console.log(n)
    //     if (a) e.setData({
    //         isScrollTo: !1
    //     }); else for (var s = 0; s < o.length; s++) {
    //         var i = o[s].top - o[0].top, c = o[s].top + o[s].height - o[0].top;
    //         r >= i && r < c && (n = s) !== e.data.tabSelected && e.setData({
    //             tabSelected: n,
    //             isScrollTo: !1
    //         });
    //     }
    // },
    onLoad: function(t) {
        var e = this;
        // 商品分类
        
      server.getJSON("/Goods/category_first",function(res){
        var cate_list = res.data.result.cate_list;
        console.log(cate_list)
        var first_id = cate_list[0].id
        console.log(first_id)
        e.setData({
          cartlist: cate_list,
          currentTab: first_id
        })
        //商品列表类
        var cateId = cate_list[0].id;
        var sort = e.data.sort;
        var sort_asc = e.data.sort_asc;
        var q = e.data.q;
        var sel = e.data.sel;
        var page = e.data.p;
        wx.request({
          url: e.data.urls + '/wxapi/Goods/goods_list',
          method: 'POST',
          data: {
            wxtoken: wx.getStorageSync("wxtoken"),
            p: page,
            id: cateId,
            sort: sort,
            sort_asc: sort_asc,
            sel: sel,
            q: q
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

            var goodlist = res.data.result.list;
            var goodsBanner = res.data.result.goodsBanner.ad_code;
            console.log(goodlist)
            e.setData({
              goodsLists: goodlist,
              goodsBanner: goodsBanner
            })
            // console.log(e.data.goodsList)
          }
        })
      })
      


      // this.checkUserInfo(), d.globalData.tabBar.list && d.globalData.tabBar.list.length > 0 && d.globalData.tabBar.list.forEach(function(t) {
      //       "sort" === t.linkModel && (wx.hideTabBar(), d.editTabbar(), e.setData({
      //           showTabbar: !0
      //       }));
      //   });
        var a = this;
        if (s.setHideLoading(!0), o.getDistributionStore().then(function(t) {
            if (console.log(t), t) {
                var e = t;
                try {
                    wx.setStorageSync("wj_distributionStore", e);
                } catch (t) {
                    console.log(t);
                }
            }
        }).catch(function(t) {}), d.globalData.storeInfo) {
            var r = d.globalData.storeInfo.id;
            this.setData({
                store: d.globalData.storeInfo.name,
                storeId: r,
                searchText: d.globalData.searchHotWord
            }), this.getMenuProduct(r), this.getShopCart(r), this.getBannerList(r);
        } else c.getLocation().then(function(t) {
            d.globalData.storeInfo = t, e.setData({
                store: t.name,
                storeId: t.id,
                searchText: d.globalData.searchHotWord
            }), a.getMenuProduct(t.id), a.getShopCart(t.id), a.getBannerList(t.id);
        }).catch(function(t) {
            console.log(t);
        });
        if (t.scene) {
            var n = decodeURIComponent(t.scene);
            if ("isfromQR" !== n) try {
                wx.setStorageSync("wj_sharingId", n);
            } catch (t) {}
        }
        if (this.options.mobile && "" != this.options.mobile && void 0 != this.options.mobile) {
            var i = this.options.mobile;
            try {
                wx.setStorageSync("wj_sharingId", i);
            } catch (t) {}
        }
        this.getSharePictures();
    },
    onReady: function() {},
    onShow: function() {
        this.data.storeId && d.globalData.storeInfo && this.data.storeId !== d.globalData.storeInfo.id && (this.setData({
            storeId: d.globalData.storeInfo.id,
            store: d.globalData.storeInfo.name
        }), this.getMenuProduct(id), this.getShopCart(id), this.getBannerList(id));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getMenuProduct(d.globalData.storeInfo.id), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    changeStore: function() {
        i.toSelectStore();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.data.sharePictures;
        return d.globalData.userInfo && d.globalData.userInfo.member ? {
            title: "",
            path: "/pages/mallModule/goods/category/category?mobile=" + d.globalData.userInfo.member.id,
            imageUrl: t,
            success: function(t) {}
        } : {
            title: "",
            path: "/pages/mallModule/goods/category/category",
            imageUrl: t,
            success: function(t) {}
        };
    },
    getSharePictures: function() {
        d.globalData.sharePictures && this.setData({
            sharePictures: d.globalData.sharePictures
        });
    },
    addShopcartCatch: function(t) {
        console.log(t), this.addShopCartData = t;
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
    // addShopcart: function(t) {
    //     var e = this, o = t.detail.target.dataset.id, n = t.detail.target.dataset.business, c = t.detail.target.dataset.style, l = t.detail.target.dataset.type, u = "", h = this.checkAuth(), g = t.detail.target.dataset.balance;
    //     if (h) {
    //         var f = function(a) {
    //             if (d.globalData.userInfo.member) if (0 === a || null === a || "" === a) wx.showToast({
    //                 title: "门店中该商品库存不足，请选购其他商品~",
    //                 icon: "none",
    //                 duration: 2e3
    //             }); else {
    //                 try {
    //                     wx.setStorageSync("wj_wxa_formId", t.detail.formId);
    //                 } catch (t) {}
    //                 s.setHideLoading(!1), r.cateringAdd(b).then(function(t) {
    //                     console.log(t), "reduce" === l ? e.reduceLocalGoods(o) : e.handleTouchOnGoods(e.addShopCartData);
    //                 }).catch(function(t) {
    //                     wx.showToast({
    //                         title: t.message,
    //                         icon: "none",
    //                         duration: 2e3
    //                     });
    //                 });
    //             } else i.toAuthorize();
    //         };
    //         if ("DISTRIBUTION" === n) try {
    //             var p = wx.getStorageSync("wj_distributionStore");
    //             p && (u = p.id);
    //         } catch (t) {} else u = d.globalData.storeInfo.id;
    //         var b = {
    //             storeId: u,
    //             lists: [ {
    //                 count: 1,
    //                 productId: o
    //             } ]
    //         };
    //         if ("reduce" === l && (b = {
    //             storeId: u,
    //             lists: [ {
    //                 count: -1,
    //                 productId: o
    //             } ]
    //         }), "DISTRIBUTION" === n) g = 0, a.getDetails(u, o).then(function(t) {
    //             t && (g = t.balance), f(g);
    //         }); else if ("CATERING" === n && "MEALS" === c) {
    //             var m = {
    //                 show: !0,
    //                 productId: o,
    //                 storeId: u
    //             };
    //             e.setData({
    //                 meals: m
    //             });
    //         } else f(g);
    //     } else wx.showToast({
    //         title: "请先点击头像授权登录后添加哦~",
    //         icon: "none",
    //         duration: 2e3
    //     });
    // },
    recorderPopup: function() {
        this.toggleBottomPopup();
    },
    chooseOutcome: function(t) {
        !0 === t.detail.outcome && (this.setData({
            meals: {
                show: !1,
                productId: "",
                storeId: ""
            }
        }), this.handleTouchOnGoods(this.addShopCartData));
    },
    toggleBottomPopup: function() {
        this.toggle("middle");
    },
    toggle: function(e) {
        var o;
        this.setData((o = {}, t(o, "show." + e, !this.data.show[e]), t(o, "overlayStyle", this.data.overlayStyle), 
        o));
    },
    handleUserLogin: function() {
        console.log(d.globalData.userInfo);
        var t = this;
        if (d.globalData.userInfo) {
            var o = d.globalData.userInfo;
            this.setData({
                userInfo: e({}, o.wxaUser)
            }), d.globalData.userInfo.member ? t.setData({
                hasUserInfo: !0
            }) : t.setData({
                userInfo: o.wxaUser,
                hasUserInfo: !0
            });
        }
    },
    handleTabbar: function(t) {
        console.log(t.detail), t.detail.showTabbar, this.setData({
            showTabbar: t.detail.showTabbar
        });
    },
    handlePopupPhone: function() {
        d.globalData.userInfo.member ? this.setData({
            phone: !1
        }) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(t) {
        console.log(t.detail), !0 === t.detail.bindMobile && this.handlePopupPhone();
    },
    getShopCart: function(t) {
        var e = this;
        if (d.globalData.userInfo && d.globalData.userInfo.member) {
            s.setHideLoading(!0), r.getCatering(t).then(function(t) {
                var o = {}, a = [];
                t.items && t.items.length > 0 && t.items.forEach(function(t) {
                    if (!t.grabActivityId && !t.newmbrActivityId) {
                        for (var e = -1, r = 0; r < a.length; r++) t.productId == a[r] && (e = r);
                        e > -1 ? o[t.productId] = o[t.productId] + t.productNum : (o[t.productId] = t.productNum, 
                        a.push(t.productId));
                    }
                }), e.setData({
                    shopCart: o,
                    shopCartGoodsId: a
                });
                var r = {
                    goodsId: a,
                    items: o
                };
                try {
                    wx.setStorageSync("wj_shopCartStorage", r);
                } catch (t) {}
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
            var o = wx.getStorageSync("wj_userProductsCount"), a = String(o);
            a && d.setTabBarBadge("shopping_cart", a), r.getProductsCount().then(function(t) {
                d.setTabBarBadge("shopping_cart", String(t));
                try {
                    wx.setStorageSync("wj_userProductsCount", t);
                } catch (t) {}
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    },
    addLocalGoods: function(t) {
        try {
            var e = wx.getStorageSync("wj_shopCartStorage"), o = wx.getStorageSync("wj_userProductsCount");
            if (o = Number(o), o++, o = String(o), d.setTabBarBadge("shopping_cart", o), e) {
                var a = e.goodsId, r = e.items, n = [], s = t, i = -1;
                if (a.length > 0) for (var c = 0; c < a.length; c++) n.push(a[c]), s == a[c] && (i = c);
                i > -1 ? r[s] = Number(r[s]) + 1 : (n.push(s), r[s] = 1), this.setData({
                    shopCart: r,
                    shopCartGoodsId: n
                });
                var l = {
                    goodsId: n,
                    items: r
                };
                wx.setStorageSync("wj_shopCartStorage", l);
            }
            wx.setStorageSync("wj_userProductsCount", o);
        } catch (t) {}
    },
    reduceLocalGoods: function(t) {
        try {
            var e = wx.getStorageSync("wj_shopCartStorage"), o = wx.getStorageSync("wj_userProductsCount");
            if (o = Number(o), o--, o = String(o), d.setTabBarBadge("shopping_cart", o), e) {
                var a = e.goodsId, r = e.items, n = [], s = t, i = -1;
                if (a.length > 0) for (var c = 0; c < a.length; c++) n.push(a[c]), s == a[c] && (i = c);
                i > -1 && (r[s] = Number(r[s]) - 1, r[s] <= 0 && n.splice(i, 1)), this.setData({
                    shopCart: r,
                    shopCartGoodsId: n
                });
                var l = {
                    goodsId: n,
                    items: r
                };
                wx.setStorageSync("wj_shopCartStorage", l);
            }
            wx.setStorageSync("wj_userProductsCount", o);
        } catch (t) {}
    },
    handleTouchOnGoods: function(t) {
        var e = this, o = "";
        this.setData({
            goodsBoxImage: ""
        }), "normal" === t.target.dataset.addtype && this.data.allGoodsList.forEach(function(e) {
            e.id === t.target.dataset.id && (o = e.imageUrl);
        }), this.setData({
            goodsBoxImage: o
        });
        var a = t.touches[0];
        l.touchOnGoods(t.target.dataset.addtype, a, t.target.dataset.id).then(function(o) {
            var a = o;
            e.setData({
                hide_good_box: !1,
                bus_x: a.finger.x,
                bus_y: a.finger.y
            }), e.setData({
                animation: a.animation
            }), setTimeout(function() {
                e.setData({
                    hide_good_box: !0
                }), e.addLocalGoods(t.target.dataset.id);
            }, a.duration);
        });
    },
    checkUserInfo: function() {
        d.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), d.globalData.userInfo.member && this.setData({
            isMember: !0
        }));
    },
    getUserInfo: function(t) {
        var e = this;
        u.login(t).then(function(t) {
            e.setData({
                hasUserInfo: !0
            }), t.member ? e.setData({
                isMember: !0
            }) : i.toAuthorize();
        }).catch(function(t) {
            wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    }
});