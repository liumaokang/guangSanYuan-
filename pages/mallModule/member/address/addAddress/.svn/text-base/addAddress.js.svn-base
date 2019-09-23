var app = getApp();
var url = app.globalData.url;
var imgurl = app.globalData.imgurl;
var e, t = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t];
    for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
  }
  return e;
}, a = require("../../../../../api/addressService.js"), o = require("../../../../../libs/qqmap-wx-jssdk.min.js");

Page({
  data: {
    region: ["省", "市", "区"],
    name: "",
    phone: "",
    details: "",
    houseNumber: "",
    addressInfo: {},
    defaultColor: "#3CDBC0",
    isDefault: !1,
    orderid:"",
    detailedLabelShow: !1,
    id: 0,
      order_id:0,
      goods_type:0,
      saleid:0,
    genders: [{
      name: "先生",
      value: "MALE",
      id: 0
    }, {
      name: "女士",
      value: "FEMALE",
      id: 1
    }],
    labels: [{
      name: "家",
      id: 0
    }, {
      name: "公司",
      id: 1
    }, {
      name: "学校",
      id: 2
    }],
    // currentLabel: -1,
    currentLabel: 0,
    userGenders: -1,
    systemDetail: !1,
    pageType: "normal",
    sex: [], //性别 0-女 1-男
    doEditAddress: '',
    order_id:0,
      goods_type:0,
      saleid:0,
      coupon:0,
      cart:0,

  },
  handleClick: function (e) {
    var t = this, a = e.currentTarget.dataset.index, o = e.currentTarget.dataset.type;
    "gender" === o ? t.data.userGenders !== a ? t.setData({
      userGenders: a
    }) : t.setData({
      userGenders: -1
    }) : "label" === o && (t.data.currentLabel !== a ? t.setData({
      currentLabel: a
    }) : t.setData({
      currentLabel: -1
    }));

  },
  doDeleteAddress: function () { //删除收货地址
    var address_id = wx.getStorageSync('wj_editAddress').id; //获取地址id
    wx.request({
      url: imgurl + '/user/delete/wxtoken/' + wx.getStorageSync('wxtoken'),
      data: {
        id: address_id
      },
      success(res) {
        var data = res.data;
        console.log(data)
        if (data.data == '删除成功') {
          wx.showToast({
            title: data.data,
            icon: 'success',
            duration: 1500
          });
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/mallModule/member/address/addressList/addressList',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: data.title,
            icon: "none",
            duration: 2e3
          });
        }
      }
    })
    var e = this.data.addressInfo.id;
    e && "" != e && wx.showModal({
      title: "提示",
      content: "请确认要删除地址？",
      success: function (t) {
        t.confirm ? a.removeById(e).then(function (t) {
          console.log(t), wx.showToast({
            title: "删除成功~",
            icon: "none",
            duration: 2e3
          });
          try {
            var a = wx.getStorageSync("wj_chooseAddressInfo");
            a && a.id === e && wx.removeStorageSync("wj_chooseAddressInfo");
          } catch (e) { }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 2e3);
        }).catch(function (e) {
          wx.showToast({
            title: "删除失败~",
            icon: "none",
            duration: 2e3
          });
        }) : t.cancel && console.log("用户点击取消");
      }
    });
  },
  handleFocus: function (e) {
    this.setData({
      detailedLabelShow: !0
    });
  },
  handleBlur: function (e) {
    this.setData({
      detailedLabelShow: !1
    });
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
  },
  handleDetails: function (e) {
    this.setData({
      details: e.detail.value
    });
  },
  handleHouseNumber: function (e) {
    console.log(e.detail), e.detail.cursor < 40 ? this.setData({
      houseNumber: e.detail.value
    }) : 40 === e.detail.cursor && (this.setData({
      houseNumber: e.detail.value
    }), wx.showToast({
      title: "详细地址最大不能超50个字符哦~",
      icon: "none",
      duration: 2e3
    }));
  },
  handleName: function (e) {
    e.detail.cursor < 10 ? this.setData({
      name: e.detail.value
    }) : 10 === e.detail.cursor && (this.setData({
      name: e.detail.value
    }), wx.showToast({
      title: "联系人昵称最大不能超10个字符哦~",
      icon: "none",
      duration: 2e3
    }));
  },
  handlePhone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  handleDefault: function (e) {
    this.setData({
      isDefault: e.detail.value
    });
  },


  handleSave: function (o) { //修改和新增地址
    var that = this;
    var data = o.detail.value;
    var wxtoken = wx.getStorageSync('wxtoken')
    var address_id = wx.getStorageSync('wj_editAddress').id; //获取地址id
    // console.log(data);
    var labels = that.data.currentLabel; //0=家 1=公司 2=学校
    var genders = that.data.userGenders;
    // console.log(labels)
    if (genders == '1') {
      that.setData({
        sex: {
          'id': 0,
          'gender': '女'
        }
      })
    } else {
      that.setData({
        sex: {
          'id': 1,
          'gender': '男'
        }
      })
    };
    var sex = that.data.sex.id; //0-女 1-男
    // console.log(sex)
    if (data.name == '') {
      wx.showToast({
        title: '请填写联系人',
        icon: 'loading',
        duration: 1000
      })
    } else if (data.phone == '') {
      wx.showToast({
        title: '请填写电话',
        icon: 'loading',
        duration: 1000
      })
    } else if (data.address == '') {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'loading',
        duration: 1000
      })
    } else {
      if (that.data.doEditAddress == '') { //姓名为空则是新增地址
        wx.request({ //新增收货地址提交
          url: imgurl + '/user/add_Address/wxtoken/' + wxtoken,
          method: 'POST',
          data: {
            'consignee': data.name,
            'sex': sex,
            'mobile': data.phone,
            'province': data.region[0],
            'city': data.region[1],
            'district': data.region[2],
            'address': data.details,
            'door_num': data.houseNumber,
            'type': labels
          },
          success(res) {
            var data = res.data;
                if (res.data.status!=1){
                  wx.showToast({
                    title:data.msg,
                    icon: 'loading',
                    duration: 4000
                  })
                }else{
                  var sale_id=that.data.saleid
                  var goods_type=that.data.goods_type
                  var coupon=that.data.coupon
                  var str=+'&goods_type='+goods_type+'&coupon='+coupon;
                  var cart=that.data.cart
                       if(cart==1){
                            //没有添加收货地址判断 
                        //  wx.switchTab({
                        //       // pages/mallModule/index/index/index
                        //       url: "../../mallModule/index/index/index",
                        //     })
                          wx.navigateBack({
                            delta:3
                          })

                         
                       }else{
                           wx.navigateTo({
                                url: "/pages/mallModule/member/address/addressList/addressList?sendType=配送&sale_id="+sale_id+str,
                              })
                       }
               // if(sale_id>0){
                     // pages/mallModule/member/member/address/addAddress/addAddress
                    //  wx.navigateTo({
                    //   url: "/pages/mallModule/member/address/addressList/addressList?sendType=配送&sale_id="+sale_id+str,
                    // })
                // }else{
                //  wx.navigateTo({
                //       url: "/pages/mallModule/member/address/addressList/addressList?sendType=配送&goods_type="+0+'&coupon='+coupon,
                //     })
                // }



                }
          }
        })
      } else {
        wx.request({ //修改收货地址
          url: imgurl + '/user/edit_address/wxtoken/' + wxtoken,
          method: 'POST',
          data: {
            'id': address_id,
            'consignee': data.name,
            'sex': sex,
            'mobile': data.phone,
            'province': data.region[0],
            'city': data.region[1],
            'district': data.region[2],
            'address': data.details,
            'door_num': data.houseNumber,
            'type': labels
          },
          success(res) {
            var data = res.data;
            console.log(res)
          
              
              setTimeout(function () {
                if (res.data.msg =='手机号码格式有误'){
                  wx.showToast({
                    title: '手机号错误',
                    icon: 'none',
                    duration: 1000
                  });
                }else{
                   var sale_id=that.data.saleid
                  var goods_type=that.data.goods_type
                   if(sale_id>0){
                         // pages/mallModule/member/member/address/addAddress/addAddress
                         wx.navigateTo({
                          url: "/pages/mallModule/member/address/addressList/addressList?sendType=配送&sale_id="+sale_id+'&goods_type='+goods_type,
                        })
                    }else{
                     wx.navigateTo({
                          url: "/pages/mallModule/member/address/addressList/addressList?sendType=配送&goods_type="+0,
                        })
                    }

                }
              }, 1000)
          }
        })
      }

    }


  },
  chooseAddress: function () {
    var t = this, a = t.data.region;
    wx.chooseLocation({
      success: function (o) {
        function n(e, t) {
          var a = (s = /^(.*?[市]|.*?地区|.*?特别行政区|.*?盟|.*?自治州)(.*?[市区县旗])(.*?)$/g).exec(e);
          console.log(a), t.city = a[1], t.country = a[2], t.address = a[3];
        }
        console.log(o, "location");
        var s = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/, i = [], l = {
          province: null,
          country: null,
          city: null,
          address: null
        }, d = o.name;
        if (i = s.exec(o.address)) if (l.province = i[1], o.poiid && "City" === o.poiid) {
          var r = /^(.*?)\((.+?)\)$/g, c = r.exec(o.name);
          console.log(c);
          var u = o.latitude, f = o.longitude;
          e.reverseGeocoder({
            location: {
              latitude: u,
              longitude: f
            },
            success: function (e) {
              console.log(e), l.province = e.result.address_component.province, l.city = e.result.address_component.city,
                l.country = e.result.address_component.district, t.setData({
                  region: [l.province, l.city, l.country]
                });
            },
            fail: function (e) {
              console.log(e);
            }
          }), l.address = c[2], d = c[1];
        } else n(o.address, l); else if (s = /^(.*?(省|自治区))(.*?)$/, i = s.exec(o.address)) l.province = i[1],
          n(i[3], l); else {
          c = (r = /^(.*?)\((.+?)\)$/g).exec(o.address);
          console.log(c), console.log(a);
          var u = o.latitude, f = o.longitude;
          e.reverseGeocoder({
            location: {
              latitude: u,
              longitude: f
            },
            success: function (e) {
              console.log(e), l.province = e.result.address_component.province, l.city = e.result.address_component.city,
                l.country = e.result.address_component.district, t.setData({
                  region: [l.province, l.city, l.country]
                });
            },
            fail: function (e) {
              console.log(e);
            }
          }), l.address = c[2], d = c[1];
        }
        console.log(l), "" !== l.address && t.setData({
          detailedLabelShow: !0
        }), t.setData({
          details: d,
          houseNumber: l.address,
          region: [l.province, l.city, l.country]
        });
      },
      fail: function () { },
      complete: function () { }
    });
  },
  address_info: function () { //获取修改的地址等信息
    var that = this;
    var address_id = wx.getStorageSync('wj_editAddress').id; //获取地址id
    wx.request({
      url: imgurl + '/user/edit_Address/wxtoken/' + wx.getStorageSync('wxtoken'),
      data: {
        id: address_id
      },
      success(res) {
        var data = res.data.data;
        console.log(data)
        if (data.sex == 0) {
          that.setData({
            userGenders: 1
          })
        };
        if (data.sex == 1) {
          that.setData({
            userGenders: 0
          })
        }
        that.setData({
          name: data.consignee,
          phone: data.mobile,
          region: [data.province, data.city, data.district],
          details: data.address,
          houseNumber: data.door_num,
          currentLabel: data.type
        })
      }
    })
  },
  onLoad: function (t) {
    console.log(t)
    this.setData({
      order:t,
      order_id:t.order_id,
      goods_type:t.goods_type,
      saleid:t.sale_id,
      coupon:t.coupon,
      cart:t.cart
    })


    var doEditAddress = t.doEditAddress;
    if (doEditAddress == 'edit') {
      var that = this;
      that.address_info();
      that.setData({
        doEditAddress: doEditAddress
      });
    } else {
      console.log('新增收货地址')
    };
    var n = this;
    n.setData({
      id: t.id
    })
    wx.hideShareMenu();
    var s = wx.getSystemInfoSync(), i = null;
    "ios" == s.platform ? i = !0 : "android" == s.platform && (i = !1), this.setData({
      systemDetail: i
    }), e = new o({
      key: "M4TBZ-4KSRI-DQPGJ-54BUF-UUJX5-YKFH3"
    });
    var l = this;
    if ("edit" === t.doEditAddress) {
      wx.setNavigationBarTitle({
        title: "修改收货地址"
      }), l.setData({
        pageType: "edit"
      });
      try {
        var d = wx.getStorageSync("wj_editAddress").id;
        a.query().then(function (e) {
          e.forEach(function (e) {
            if (e.id === d) {
              l.data.addressInfo = e;
              var t = l.data.addressInfo;
              n.setData({
                region: [t.province, t.city, t.county],
                name: t.contacts,
                phone: t.contactsMobile,
                details: t.detailedAddress,
                houseNumber: t.houseNum,
                isDefault: t.defaultAddress
              }), "UNKNOWN" === e.gender ? n.setData({
                userGenders: -1
              }) : "MALE" === e.gender ? n.setData({
                userGenders: 0
              }) : "FEMALE" === e.gender && n.setData({
                userGenders: 1
              });
              var a = e.label;
              l.data.labels.forEach(function (e) {
                e.name == a && l.setData({
                  currentLabel: e.id
                });
              });
            }
          });
        }).catch(function (e) {
          // wx.showToast({
          //     title: e.message,
          //     icon: "none",
          //     duration: 2e3
          // });
        });
      } catch (e) { }
    } else try {
      var r = wx.getStorageSync("wj_locationInfo");
      r ? (console.log(r), l.setData({
        region: [r.ad_info.province, r.ad_info.city, r.ad_info.district],
        details: r.title,
        houseNumber: r.address
      }), wx.removeStorageSync("wj_locationInfo"), this.getUserAddress()) : this.getUserAddress();
    } catch (e) { }
  },
  getUserAddress: function () {
    var t = this;
    wx.getLocation({
      type: "gcj02",
      success: function (a) {
        console.log(a);
        var o = a.latitude, n = a.longitude;
        e.reverseGeocoder({
          location: {
            latitude: o,
            longitude: n
          },
          success: function (e) {
            console.log(e), t.setData({
              region: [e.result.address_component.province, e.result.address_component.city, e.result.address_component.district]
            });
          },
          fail: function (e) {
            console.log(e);
          }
        });
      }
    });
  },
  onReady: function () { },
  onShow: function () {

  },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
});