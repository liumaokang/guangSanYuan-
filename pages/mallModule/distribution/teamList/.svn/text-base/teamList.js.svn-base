require("../../../../api/backCashService.js");

var e = require("../../../../api/distributionService.js"), o = (require("../../../../utils/utils.js"), 
require("../../../../utils/navPage.js")), n = getApp();

Page({
    data: {
        groupList: []
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        var t = this;
        if (n.globalData.userInfo) n.globalData.userInfo.member ? (t.setData({
            member: n.globalData.userInfo.member,
            mobile: n.globalData.userInfo.member.mobile
        }), t.handelQueryList()) : wx.showToast({
            title: "您还不是会员，请先绑定手机号码成为会员",
            icon: "none",
            duration: 2e3
        }); else try {
            wx.showModal({
                title: "提示",
                content: "请登录后查看",
                success: function(e) {
                    e.confirm ? (console.log("用户点击确定"), o.toMy()) : e.cancel && console.log("用户点击取消");
                }
            });
        } catch (e) {}
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    handelQueryList: function(o) {
        var t = this, a = this, i = n.globalData.userInfo.member.id;
        e.queryGroup(i).then(function(e) {
            if (console.log(e), e && e.length >= 0) {
                var o = e;
                t.setData({
                    groupList: o
                });
            }
            t.data.loading && a.setData({
                loading: !1
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            }), t.data.loading && a.setData({
                loading: !1
            });
        });
    }
});