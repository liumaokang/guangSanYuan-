var a = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (a[o] = t[o]);
    }
    return a;
}, e = require("../../../../api/memberService.js"), t = (require("../../../../utils/auth.js"));
var b = getApp();
var url=b.globalData.imgurl;
var server = (require("../../../../utils/server.js"));
Page({
    data: {
        balanceList: [],
        page: 1,
        mobile: "",
        pageSize: 20,
        pageCount: 1,
        noMore: !1,
        loading: !1
    },
    onLoad: function() {
    
    },

       getAccountList: function() {
        var that = this
        server.getJSON('/User/points/wxtoken/' + wx.getStorageSync('wxtoken') + '/type/user_money' , function(res) {
             console.log('积分明细');
             console.log(res);
                var account_list = res.data;
                  
                // var title = res.data.result.title;
                // var button = res.data.result.button;
                // var rate = res.data.result.rate;
                that.setData({
                    balanceList: account_list,
                    // title: title,
                    // button: button,
                    // rate: rate
                });
        });
    },
    onShow:function(){
      console.log('余额明细');
      this.getAccountList();
    }




});