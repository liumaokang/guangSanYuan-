var e = require("./utils/auth.js"), a = require("./utils/utils.js"), t = require("./api/memberService.js"), o = require("./api/systemService.js"), n = require("./api/homepageService.js"), s = require("./api/sharePicturesService.js"), r = require("./api/shopcartService.js");
App({
    globalData: {
        userInfo: null,
        memberInfo: null,
        addressInfo: null,
        storeInfo: null,
        openid:null,
        url:"https://v.coolndns.com",
        imgurl:"https://v.coolndns.com/index.php/wxapi",
        systemConfigure: {
            hasRedPacket: !1,
            memberAscriptionStoreDistance: 1e3,
            supportPartReturn: !1,
            storeProductBalanceIsZeroShow: !0
        },
        configureInfo: [],
        systemInfo: {},
        servicePhone: "400-881-9090",
       
        scene: "normal",
        location: null,
        sharePictures: "",
        appid:'wx50a7d8768b049b6d'
    },
    show_carts: function () {
      var that = this;
      var url = that.globalData.imgurl;
      console.log(url)
      var wxtoken = wx.getStorageSync('wxtoken')
      wx.request({
        url: url + '/Cart/index/wxtoken/' + wxtoken,
        success(res) {
          var data = res.data;
          console.log(data)
          var list = data.result.list;
          var userCartGoodsTypeNum = data.result.userCartGoodsTypeNum;
          console.log(list)
          var carts_length = list.length; //购物车商品数量
          console.log('购物车商品数量');
          console.log(carts_length);
          if (carts_length == "0") {
            wx.setTabBarBadge({//移除tabbar右上角的文本
              index: 3,	//tabbar下标
              text:'0'
            })
          } else {
            wx.setTabBarBadge({//tabbar右上角添加文本
              index: 3, ////tabbar下标
              text: String(carts_length)	//显示的内容
            })
          };
        }
      })
    },
  geuserMessage: function () {
    wx.request({
      url: 'https://v.coolndns.com/index.php/wxapi/User/userinfo/wxtoken/' + wx.getStorageSync('wxtoken'),
      success(res) {
        if (res.data.status == 1) {
          var info = res.data.result.info;
          wx.setStorageSync("score", info.pay_points)
          wx.setStorageSync("user", info)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2e3
          })
        }
      }
    })
  },
  onLaunch: function () {
    var that = this;
    that.geuserMessage();
    that.show_carts();
  },
  getOpenId: function (cb) {
    wx.login({
      success: function (res) {

        if (res.code) {
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'https://v.coolndns.com/index.php/wxapi/LoginApi/sendappid?appid=wx50a7d8768b049b6d&secret=593d605c90a2c4cbb5635117daf4e621&js_code=' + res.code + '&grant_type=authorization_code',
            data: {
              code: res.code
            },
            success: function (response) {
              console.log(response)
              // 获取openId
              var openId = response.data.openid;
              console.log(openId);
              // TODO 缓存 openId
              var app = getApp();
              app.globalData.openid = openId;
              var unionId = response.data.unionid;
              app.globalData.unionId = unionId;
              //验证是否关联openid
              typeof cb == "function" && cb()
              return openId;
            }
          })
          //typeof cb == "function" && cb()
        } else { }
      }
    });
  },
  
    upload_file: function(url, filePath, name, formData, success, fail) {
        if (filePath.length === 0) {
            wx.showToast({
                title: '请上传照片！',
                icon: 'loading',
                duration: 500
            })
        } else {
            wx.uploadFile({
                url: url,
                filePath: filePath,
                name: name,
                header: {
                    'content-type': 'multipart/form-data'
                }, // 设置请求的 header
                formData: formData, // HTTP 请求中其他额外的 form data
                success: function(res) {
                    if (res.statusCode == 200 && !res.data.result_code) {
                        return typeof success == "function" && success(res);
                    } else {
                        return typeof fail == "function" && fail(res);
                    }
                },
                fail: function(res) {
                    return typeof fail == "function" && fail(res);
                }
            })
        }
    },
});