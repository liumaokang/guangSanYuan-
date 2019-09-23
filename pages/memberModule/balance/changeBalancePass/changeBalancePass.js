var o = require("../../../../api/memberService.js");

Page({
    data: {
        password: "",
        password1: ""
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    handelChangePassword: function() {
        if (this.data.password) if (this.data.password1) if (this.data.password === this.data.password1) {
            var n = {
                newPassword: this.data.password
            };
            o.resetCardPassword(n).then(function(o) {
                console.log(o), wx.showToast({
                    title: "修改密码成功",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3);
            }).catch(function(o) {
                wx.showToast({
                    title: o.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        } else wx.showToast({
            title: "两次密码不一致，请重新输入",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请再次输入新密码",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入新密码",
            icon: "none",
            duration: 2e3
        });
    },
    handelPassInput: function(o) {
        this.setData({
            password: o.detail.value
        });
    },
    handelPass1Input: function(o) {
        console.log(o), this.setData({
            password1: o.detail.value
        });
    }
});