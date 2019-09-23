var server = require('../../../../utils/server');
var app = getApp();
var imgurl = app.globalData.imgurl;
var url= app.globalData.url
Page({
  data: {
    banners: [],
    open:false,
    moren:'rgba(255,255,255,0.5)',
    active_color:"#FDA8AB",
    url: app.globalData.url,
    over_time: '',
    time_h: '00',
    time_m: '00',
    time_s: '00',
    flash_sale: [],
    category_goods: [],
    showTabbar: !1,
    address: "",
    show: false,
    show1: true,
    false1: false,
    memberScore: {
      daysCount: "0",
      score: "0"
    },
    hotgoods: [],
    bannerimg: '',
    current: 0,
    tan:''
  },
  addShopCarts: function (e) { //加入购物车
      app.show_carts()
     var wxtoken=wx.getStorageSync('wxtoken');
    
      if(wxtoken==''){
        wx.switchTab({
          url: '../../../mallModule/member/my/my'
        })
      }
    var that = this;
    var wxtoken = wx.getStorageSync('wxtoken')
    var goodsId = e.currentTarget.dataset.id;
    if (wxtoken != '') {
      wx.request({
        url: imgurl + '/Cart/ajaxAddCart/goods_id/' + goodsId + '/goods_num/1/' + 'wxtoken/' + wxtoken,
        success(res) {
          var data = res.data;
          if (data.msg == '成功加入购物车') {
            wx.showToast({
              title: data.msg,
              icon: 'success',
              duration: 1000
            });
            app.show_carts();
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
  sendgoods: function () {
    wx.reLaunch({
      url: '/pages/mallModule/goods/category/category',
    })
  },
  money: function () {
    wx.navigateTo({
      url: "/pages/mallModule/myCard/recharge/recharge",
    })
  },
  pintuan: function () {
    wx.reLaunch({
      url: '/pages/mallModule/fightGroup/fightGroup/fightGroup',
    })
  },
  jifenshop: function () {
    wx.navigateTo({
      url: "/pages/mallModule/score/scoreMall/scoreMall",
    })
  },
  clickFunctionEntry: function () {
    var that = this;
    // 获取时间
    var t = new Date();
    var time = t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + (t.getDate());
    wx.request({
      url: 'https://v.coolndns.com/index.php/wxapi/user/user_sign',
      type: "post",
      data: {
        wxtoken: wx.getStorageSync("wxtoken"),
        date: time
      },
      success: function (res) {
        if (res.data.status == false) {
          that.setData({
            show1: false,
            false1: true,
            show: true,
            memberScore: {
              daysCount: res.data.result.day,
            }
          })
        } else if (res.data.status == -1) {
          wx.showToast({
            title: '请先登录',
            icon: "none"
          })
        } else {
          that.setData({
            show: true,
            memberScore: {
              daysCount: 1,
              score: res.data.result.integral
            }
          })
        }
      }
    })
  },
  clickBlank: function () {
    var that = this;
    that.setData({
      show: false,
    })
  },

  toGoodsDetail: function (e) { //普通商品
    var goodsid = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&&goods_type=0',
    })
  },
  flash_Goods_Detail: function (e) { //限时抢购
    var goodsid = e.currentTarget.dataset.productid;
    var id=e.currentTarget.dataset.saleid;
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&&goods_type=2'+'&saleid='+id,
    })
  },

  
  close_modal:function(){
    var that=this;
    that.setData({
      open:true
    })
  },
  countime:function(){
    var that=this
    server.getJSON("/Activity/ajax_flash_sale",function(res){
      var flash_sale=res.data.result.flash_sale_goods;
      var endtime=res.data.result.cha;
      that.setData({
        flash_sale: flash_sale,
      })
      var over_time_nk = endtime;
      var totalSecond = over_time_nk;
      var interval = setInterval(function () {
        var second = totalSecond;
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;
        var hr = Math.floor((second - day * 3600 * 24) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;
        var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;
        var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;
        that.setData({
          time_h: hrStr,
          time_m: minStr,
          time_s: secStr,
        });
        totalSecond--;
        if (totalSecond < 0) {
          clearInterval(interval);
          that.setData({
            time_d: '00',
            time_h: '00',
            time_m: '00',
            time_s: '00',
          });
          
        }

      }.bind(this), 1000);
    })
  },
  onLoad: function (t) {
    var that = this;    
    server.getJSON("/Index/index", function (res) {
      
      var banner = res.data.result.banner;
      var prom_goods = res.data.result.prom;
      var over_time = res.data.result.over_time;
      var category_goods = res.data.result.category_goods;
      var hotgoods = res.data.result.hot;
      var imgs = url + res.data.result.zho.ad_code;
      that.setData({
        bannerimg: imgs,
        hotgoods: hotgoods,
        banners: banner,
        category_goods: category_goods,
        over_time: over_time,
        tan:res.data.result.ran
      });
    });
    server.getJSON("/Activity/ajax_flash_sale",function(res){
      var flash_sale=res.data.result.flash_sale_goods;
      var endtime=res.data.result.cha;
      that.setData({
        flash_sale: flash_sale,
      })
      var over_time_nk = endtime;
      var totalSecond = over_time_nk;
      var interval = setInterval(function () {
        var second = totalSecond;
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;
        var hr = Math.floor((second - day * 3600 * 24) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;
        var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;
        var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;
        that.setData({
          time_h: hrStr,
          time_m: minStr,
          time_s: secStr,
        });
        totalSecond--;
        if (totalSecond < 0) {
          clearInterval(interval);
          that.setData({
            time_d: '00',
            time_h: '00',
            time_m: '00',
            time_s: '00',
          });
          that.countime();
        }

      }.bind(this), 1000);
    })
    if(!wx.getStorageSync("wxtoken")){
      that.setData({
        open:false
      })
    }else{
      that.setData({
        open: true
      })
    }
    //  获取地理位置信息
    // 获取地理位置
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var accuracy = res.accuracy;
        that.setData({
          lat: latitude,
          lng: longitude
        });
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=6CxKU80V187Rlm3vLpeQIBTKItGXVRUz&location=' + latitude + ',' + longitude + '&output=json&coordtype=wgs84ll',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            var address = res.data.result.formatted_address;
            wx.setStorageSync('address', address); //储存地址 登录需要
            var city = res.data.result.addressComponent.city;
            that.setData({
              address: city
            })
          }
        });
      }
    });
  },
  // 搜索
  handleConfirm: function () {
    wx.navigateTo({
      url: "../../goods/search/search",
      fail: function (t) {
      }
    });
  },
  toSeckill: function () {
    wx.navigateTo({
      url: "/pages/mallModule/activity/seckill/seckill",
    })
  },
  // 首页倒计时
  flashTime: function () {
    var that = this;
    var over_time_nk = that.data.over_time;
    var totalSecond = over_time_nk - Date.parse(new Date()) / 1000;
    var interval = setInterval(function () {
      var second = totalSecond;
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      that.setData({
        time_d: dayStr,
        time_h: hrStr,
        time_m: minStr,
        time_s: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        that.setData({
          time_d: '00',
          time_h: '00',
          time_m: '00',
          time_s: '00',
        });
      }
    }.bind(this), 1000);
  },
  // 轮播图
  swiperChange: function (t) {
    this.setData({
      current: t.detail.current
    });
  },
   onShow:function(){
     
  },

  
});